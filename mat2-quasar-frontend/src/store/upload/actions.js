
export async function fetchSupportedExtensions (context) {
  const resp = await context.rootGetters.apiService.loadSupportedFileExtensions()
  context.commit('setSupportedExtensions', resp.data)
}
