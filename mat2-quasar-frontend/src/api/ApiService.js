import axios from 'axios'

/**
 * Handles the network calls between
 * the API and the frontend
 * except for file uploading!
 * Uploading is done by an Uppy plugin
 */
export default class ApiService {
  constructor (apiUrl) {
    this.apiUrl = apiUrl
  }

  getUploadUri () {
    return this.apiUrl + 'api/upload'
  }

  /**
   * fetch a list of the supported file extensions
   * @returns {Promise<AxiosResponse<[]>>}
   */
  loadSupportedFileExtensions () {
    return axios.get(this.apiUrl + 'api/extension')
  }

  triggerBulkDownload (body) {
    return axios.post(this.apiUrl + 'api/download/bulk', body)
  }
}
