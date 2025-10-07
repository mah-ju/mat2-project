<template>
  <q-page padding>
    <div v-if="cleanedFiles">
      <section class="row full-height full-width text-center">
        <h1
          v-if="cleanedFiles.successful.length > 0"
          data-cy="removed-metadata-title"
          class="col-12"
        >
          {{ $t('metadata_removed') }}
        </h1>
        <p
          v-if="cleanedFiles.successful.length > 0"
          data-cy="removed-metadata-paragraph"
          class="col-12"
        >
          {{ $t('metadata_managed_to_remove') }}
        </p>
        <div
          class="col-12 standard-padding"
          v-if="cleanedFiles.successful.length > 0"
        >
          <!-- bulk download button -->
          <q-btn
            v-if="cleanedFiles.successful.length > 4"
            color="accent"
            :label="$t('bulk_download')"
            type="a"
            :href="bulkZipLink"
            icon="done_all"
            :loading="zipCreating"
            data-cy="zip-download-button"
            aria-label="bulk download button"
          />
          <!-- downloadable cleaned files cards -->
          <div
            class="row justify-center"
            v-if="cleanedFiles.successful.length <= 4"
          >
            <div
              v-for="file of cleanedFiles.successful"
              :key="file.id"
              class="download-card col col-xs-12 col-sm-6 col-md-6 col-lg-3"
            >
              <q-card
                data-cy="download-card"
                class="q-ma-md"
                :class="{
                  'inactive': deactivatedMap[file.response.data.key]
                }"
              >
                <a
                  target="_blank"
                  :href="file.response.data.download_link"
                  :download="file.response.data.output_filename"
                  data-cy="card-download-link"
                  rel="noreferrer"
                  @click="deactivate(file.response.data.key)"
                >
                  <q-badge
                    data-cy="success-badge"
                    class="badge-style justify-center"
                    color="green"
                    floating
                  >
                    <q-icon name="done" />
                  </q-badge>
                  <div
                    class="download-card-img flex justify-center items-center"
                    :style="'background-color: ' + getIcon(file.response.data.mime).bgColor"
                  >
                    <q-icon
                      :color="getIcon(file.response.data.mime).iconColor"
                      :name="getIcon(file.response.data.mime).icon"
                      style="font-size: 3rem"
                      data-cy="download-icon"
                    />
                  </div>
                </a>
                <q-card-actions>
                  <q-btn
                    target="_blank"
                    icon="save"
                    type="a"
                    :href="file.response.data.download_link"
                    class="ellipsis download-btn w80"
                    data-cy="download-link"
                    :aria-label="'download ' + file.response.data.output_filename + 'button'"
                  >
                    {{ truncate(file.response.data.output_filename) }}
                  </q-btn>
                  <q-btn
                    color="primary"
                    class="metadata-btn"
                    icon="more_vert"
                    data-cy="metadata-menu-button"
                  >
                    <metadata-visualizer
                      :deleted-metadata="file.response.data.meta"
                      :remaining-metadata="file.response.data.meta_after"
                    />
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
        <!-- Failed files list -->
        <div
          v-if="cleanedFiles.failed.length > 0"
          class="error-box col-xs-10 offset-xs-1
          col-sm-6 offset-sm-3 col-md-8 offset-md-2
          col-lg-6 offset-lg-3 border-top"
        >
          <div class="col col-12">
            <h5 class="text-red">
              <q-icon name="error_outline" /> {{ $t('removal_failed') }}
            </h5>
            <p>
              {{ $t('could_not_clean_files') }}
            </p>
            <p v-if="cleanedFiles.successful.length < 1">
              <q-btn
                data-cy="failed-back-button"
                to="/"
                color="primary"
                :label="$t('back')"
                aria-label="back to home button"
              />
            </p>
            <ul
              class="failed-list q-pl-none"
              data-cy="failed-items-list"
            >
              <li
                v-for="file of cleanedFiles.failed"
                :key="file.id"
                data-cy="failed-file-name"
              >
                {{ truncate(file.data.name, 25) }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script>
import getIconByMime from '../uppy/getFileTypeIcon'
import MetadataVisualizer from '../components/metadata-visualizer'

export default {
  name: 'DownloadPage',
  components: {
    MetadataVisualizer
  },
  data: function () {
    return {
      deactivatedMap: {},
      activeMetadataModal: '',
      downloadTimeSeconds: 0,
      maxDownloadTimeSeconds: null,
      downloadTimer: null
    }
  },
  computed: {
    cleanedFiles() {
      return this.$store.getters['Download/getCleanedFiles']
    },
    bulkZipLink () {
      return this.$store.getters['Download/getBulkZipLink']
    },
    zipCreating () {
      return this.$store.getters['Download/getZipCreating']
    }
  },
  mounted () {
    if (!this.cleanedFiles) {
      this.$router.push('/')
    } else if (this.cleanedFiles?.successful?.length > 1) {
      this.triggerBulkDownload()
    }
    this.initRemainingDownloadTimer()
  },
  beforeRouteLeave (to, from, next) {
    this.resetDownloadTimer()
    this.$store.commit('Download/setCleanedFiles', null)
    next()
  },
  methods: {
    deactivate (key) {
      this.deactivatedMap[key] = true
    },
    getIcon: function (mime) {
      return getIconByMime(mime)
    },
    async triggerBulkDownload () {
      this.$store.commit('Download/setBulkZipLink', '')
      // needs at least more than 4 files to be downloadable as zip
      if (this.cleanedFiles?.successful?.length > 4) {
        const body = {
          download_list: []
        }
        for (let ctr = 0; ctr < this.cleanedFiles?.successful?.length; ctr++) {
          const data = this.cleanedFiles.successful[ctr].response.data
          body.download_list.push({
            file_name: data.output_filename,
            key: data.key,
            secret: data.secret
          })
        }
        try {
          await this.$store.dispatch('Download/triggerBulkDownload', body)
        } catch (e) {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: this.$t('error_bulk_download_creation'),
            icon: 'report_problem'
          })
          this.$router.push('/error')
        }
      }
    },
    resetDownloadTimer () {
      if (this.downloadTimer) {
        clearInterval(this.downloadTimer)
      }
      this.downloadTimer = null
    },
    incrementSeconds () {
      this.downloadTimeSeconds += 1
      if (this.downloadTimeSeconds > this.maxDownloadTimeSeconds) {
        this.resetDownloadTimer()
        this.$q.notify({
          color: 'warning',
          position: 'top',
          message: this.$t('timed_out'),
          icon: 'report_problem'
        })
        this.$router.push('/')
      }
    },
    initRemainingDownloadTimer () {
      if (this.cleanedFiles?.successful?.length > 0) {
        let min = this.cleanedFiles.successful[0].response?.data['inactive_after_sec']
        this.cleanedFiles.successful.forEach((cleanedFile) => {
          if (min > cleanedFile.inactive_after_sec) {
            min = cleanedFile.inactive_after_sec
          }
        })
        this.maxDownloadTimeSeconds = min
        this.downloadTimeSeconds = 0
        this.downloadTimer = setInterval(this.incrementSeconds, 1000)
      }
    },
    truncate(fullStr, strLen = 35) {
      if (fullStr?.length <= strLen) return fullStr
      const separator = '...'
      const sepLen = separator.length, charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2)
      return fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
    }
  }
}
</script>

<style scoped lang="sass">
.caption-filename
  font-size: 0.5rem
  word-wrap: break-word
.file-icon
  height: 100%
  width: 100%
.file-icon > svg
  height: 100%
  width: 100%
.icon-preview-bg
  padding: 0.5rem
.download-card-img
  min-height: 10rem
  max-height: 10rem
  border-bottom-right-radius: 0px
  border-bottom-left-radius: 0px
  border-top-right-radius: $border-radius
  border-top-left-radius: $border-radius
.q-card__actions
  padding: unset
.q-card__actions .q-btn--rectangle
  border-top-left-radius: 0px
  border-top-right-radius: 0px
.q-card > div:not(:last-child), .q-card > img:not(:last-child)
  border-bottom-left-radius: unset
  border-bottom-right-radius: unset
  border-radius: 45%
.q-card > div:not(:first-child), .q-card > img:not(:first-child)
  border-top-left-radius: inherit
  border-top-right-radius: inherit
  border-bottom-left-radius: 0px
  border-bottom-right-radius: 0px
.badge-style
  height: 1.3rem
  width: 1.3rem
  z-index: 10
.download-btn
  font-size: 0.65rem
  font-weight: bold
  padding-bottom: 0.2rem
  padding-top: 0.2rem
  width: 90%
  border-bottom-right-radius: 0px
  border-top-right-radius: 0px
.error-box
  margin-top: 2rem
.failed-list
  list-style: none
.download-card
  cursor: pointer
  a
    text-decoration: none
.inactive
  opacity: 0.5
  cursor: not-allowed
.metadata-btn
  margin-left: 0px !important
  width: 10%
  font-size: 0.5rem
  font-weight: bold
  padding-bottom: 0.4rem
  padding-top: 0.4rem
  border-bottom-left-radius: 0px
  border-top-left-radius: 0px
.mat-shadowed-box
    padding: 0px
</style>
