export async function triggerBulkDownload (context, body) {
  context.commit('setZipCreating', true)
  const response = await context.rootGetters.apiService.triggerBulkDownload(body)
  context.commit('setBulkZipLink', response.data.download_link)
  context.commit('setZipCreating', false)
}
