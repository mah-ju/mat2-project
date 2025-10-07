import { BasePlugin } from '@uppy/core'
import { createId } from '@paralleldrive/cuid2';
import Translator from '@uppy/utils/lib/Translator'
import EventTracker from '@uppy/utils/lib/EventTracker'
import ProgressTimeout from '@uppy/utils/lib/ProgressTimeout'
import { RateLimitedQueue, internalRateLimitedQueue } from '@uppy/utils/lib/RateLimitedQueue'
import axios from 'axios'

export default class JSONUploader extends BasePlugin {
  constructor (uppy, opts) {
    super(uppy, opts)
    this.type = 'uploader'
    this.id = this.opts.id || 'JSONUpload'
    this.title = 'JSONUpload'

    this.defaultLocale = {
      strings: {
        timedOut: 'Upload stalled for %{seconds} seconds, aborting.'
      }
    }

    // Default options
    const defaultOptions = {
      headers: {},
      limit: 0
    }

    // Merge default options with the ones set by user
    this.opts = Object.assign({}, defaultOptions, opts)

    // i18n
    this.translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale])
    this.i18n = this.translator.translate.bind(this.translator)

    this.handleUpload = this.handleUpload.bind(this)

    // Simultaneous upload limiting is shared across all uploads with this plugin.
    if (internalRateLimitedQueue in this.opts) {
      this.requests = this.opts[internalRateLimitedQueue]
    } else {
      this.requests = new RateLimitedQueue(this.opts.limit)
    }
    this.uploaderEvents = Object.create(null)
  }

  getOptions (file) {
    const overrides = this.uppy.getState().xhrUpload
    const opts = {
      ...this.opts,
      ...(overrides || {}),
      ...(file.xhrUpload || {}),
      headers: {}
    }
    Object.assign(opts.headers, this.opts.headers)
    if (overrides) {
      Object.assign(opts.headers, overrides.headers)
    }
    if (file.xhrUpload) {
      Object.assign(opts.headers, file.xhrUpload.headers)
    }

    return opts
  }

  upload (file, current, total) {
    const opts = this.getOptions(file)
    this.uploaderEvents[file.id] = new EventTracker(this.uppy)
    this.uppy.log(`uploading ${current} of ${total}`)
    return new Promise((resolve, reject) => {
      const id = createId()
      const reader = new FileReader()
      reader.readAsDataURL(file.data)
      const self = this
      const CancelToken = axios.CancelToken
      let cancel
      reader.onloadend = function () {
        const base64result = reader.result.split(',')[1]
        const config = {
          cancelToken: new CancelToken(function executor (c) {
            // An executor function receives a cancel function as a parameter
            cancel = c
          }),
          onUploadProgress: function (event) {
            if (event.lengthComputable) {
              console.log("uppp")
                self.uppy.emit('upload-progress', file, {
                  uploadStarted: file.progress.uploadStarted ?? 0,
                  bytesUploaded: (event.loaded / event.total) * file.size,
                  bytesTotal: file.size,
                })
            }
          }
        }
        const timer = new ProgressTimeout(opts.timeout, () => {
          cancel()
          const error = new Error(this.i18n('timedOut', { seconds: Math.ceil(opts.timeout / 1000) }))
          self.uppy.emit('upload-error', file, error)
          reject(error)
        })
        self.uppy.log(`[XHRUpload] ${id} started`)
        self.uppy.emit('upload-start', [file])
        axios.post(opts.endpoint, {
          file: base64result,
          file_name: file.meta.name
        }, config).then(function (response) {
          self.uppy.log(`[XHRUpload] ${id} finished`)
          self.uppy.emit('upload-success', file, response)
          if (self.uploaderEvents[file.id]) {
            self.uploaderEvents[file.id].remove()
            self.uploaderEvents[file.id] = null
          }
          return resolve(file)
        }).catch(function (error) {
          if (axios.isCancel(error)) {
            self.uppy.log(`[XHRUpload] ${id} request cacellation failed ${error.message}`)
          } else {
            self.uppy.log(`[XHRUpload] ${id} errored`)
            reject(new Error(error.message))
            self.uppy.emit('upload-error', file, error)
          }
        }).finally(function () {
          timer.done()
          self.uppy.log(`[XHRUpload] ${id} done`)
          if (self.uploaderEvents[file.id]) {
            self.uploaderEvents[file.id].remove()
            self.uploaderEvents[file.id] = null
          }
        })
      }
      this.uppy.on('file-removed', (removedFile) => {
        if (removedFile.id === file.id) {
          cancel('Operation canceled by the user.')
          reject(new Error('File removed'))
        }
      })
      this.uppy.on('cancel-all', () => {
        cancel('Operation canceled by the user.')
        reject(new Error('Upload cancelled'))
      })
    })
  }

  uploadFiles (files) {
    const promises = files.map((file, i) => {
      const current = parseInt(i, 10) + 1
      const total = files.length

      if (file.error) {
        return Promise.reject(new Error(file.error))
      } else {
        this.uppy.emit('upload-started', file)
        return this.upload(file, current, total)
      }
    })
    return  Promise.allSettled(promises)
  }

  handleUpload (fileIDs) {
    if (fileIDs.length === 0) {
      this.uppy.log('[XHRUpload] No files to upload!')
      return Promise.resolve()
    }

    this.uppy.log('[XHRUpload] Uploading...')
    const files = fileIDs.map((fileID) => this.uppy.getFile(fileID))
    return this.uploadFiles(files).then(() => null)
  }

  install () {
    this.uppy.addUploader(this.handleUpload)
  }

  uninstall () {
    this.uppy.removeUploader(this.handleUpload)
  }
}
