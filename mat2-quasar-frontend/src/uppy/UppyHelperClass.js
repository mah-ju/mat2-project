import JSONUploader from './JSONUploader'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Webcam from '@uppy/webcam'
import '@uppy/core/dist/style.css'
import '@uppy/webcam/dist/style.css'

/**
 * Handle uppy setup, config etc.
 */
export default class UppyHelperClass {
  /**
   * create a base instance
   * of an uppy uploader
   *
   * @param supportedExtensions
   * @param locale
   * @param target
   * @param uploadEndpoint
   * @param maxFileSize defaults to 16777216 = 16Mb
   * @param maxNumberOfFiles defaults to 10
   * @returns {*}
   */
  static createUppyInstance (
    supportedExtensions = [],
    locale = {},
    target = '#drag-drop-area',
    uploadEndpoint = '',
    maxFileSize = 16777216,
    maxNumberOfFiles = 10
  ) {
    return new Uppy({
      autoProceed: false,
      restrictions: {
        maxFileSize: maxFileSize,
        // the max standard for api/download/bulk endpoint
        maxNumberOfFiles: maxNumberOfFiles,
        allowedFileTypes: supportedExtensions
      },
    }).use(Dashboard, {
      inline: true,
      target: target,
      height: '40vh',
      width: '100%',
      showProgressDetails: true,
      proudlyDisplayPoweredByUppy: false,
      showLinkToFileUploadResult: false,
      locale: locale
    }).use(Webcam, {
      target: Dashboard,
      modes: ['picture'],
      preferredImageMimeType: 'image/jpeg'
    }).use(JSONUploader, {
      endpoint: uploadEndpoint
    })
  }
}
