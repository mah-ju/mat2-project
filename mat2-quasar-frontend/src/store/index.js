import Vuex from 'vuex'
import { createStore } from 'vuex'

import Download from './download'
import Upload from './upload'
import ApiService from '../api/ApiService'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      Download,
      Upload
    },
    state: {
      apiService: new ApiService(
        process.env.API_URL ? process.env.API_URL : 'http://localhost:5000/'
      )
    },
    getters: {
      apiService: state => {
        return state.apiService
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
