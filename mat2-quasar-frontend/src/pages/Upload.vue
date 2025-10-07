<template>
  <q-page padding>
    <div class="row text-center main-upload-cont justify-center">
      <div
        class="col col-12 justify-center"
      >
        <h1>{{ $t('remove_metadata') }}</h1>
      </div>
      <p class="xs-hide col-8 text-center">
        {{ $t('the_file_you_see') }}
      </p>
      <section
        v-show="supportedExtensions.length > 0"
        class="q-pa-sm q-pa-md col-xs-12
          col-sm-8 col-md-8
          col-lg-6"
      >
        <div
          id="drag-drop-area"
          class="mat-shadowed-box p-1"
        />
      </section>
      <section
        v-if="supportedExtensions.length == 0"
        class="q-pa-sm q-pa-md col-xs-12
          col-sm-8 col-md-8
          col-lg-6 mat-shadowed-box justify-center"
      >
        <q-circular-progress
          indeterminate
          size="50px"
          :thickness="0.22"
          color="primary"
          track-color="grey-3"
          class="q-ma-md"
        />
      </section>
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        color="secondary"
        size="md"
        round
        :to="{ name: 'info' }"
        aria-label="help button"
      >
        ?
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import LanguageHelper from '../i18n/LanguageHelper'
import UppyHelperClass from '../uppy/UppyHelperClass'

export default {
  name: 'UploadPage',
  data: function () {
    return {
      uppy: null,
      langHelper: new LanguageHelper()
    }
  },
  async mounted () {
    this.$watch(
      "$i18n.locale",
      (newLocale, oldLocale) => {
        if (newLocale === oldLocale) {
          return
        }
        this.updateLocale(newLocale)
      },
      { immediate: true }
    )
    try {
      await this.$store.dispatch('Upload/fetchSupportedExtensions')
      this.startUppy()
    } catch (e) {
      console.error(e)
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: this.$t('loading_failed'),
        icon: 'report_problem'
      })
      this.$router.push('/error')
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.uppy) {
      this.uppy.destroy()
    }
    next()
  },
  computed: {
    supportedExtensions () {
      return this.$store.getters['Upload/getSupportedExtensions']
    }
  },
  methods: {
    startUppy: function () {
      const uppy = UppyHelperClass.createUppyInstance(
        this.supportedExtensions,
        {
          strings: {
            dropPasteImportFiles: "help meee lo"
          }
        },
        '#drag-drop-area',
        this.$store.getters.apiService.getUploadUri(),
        process.env.MAX_UPLOAD_SIZE,
        process.env.MAX_UPLOAD_FILES,
      )
      uppy.on('complete', (result) => {
        this.$store.commit('Download/setCleanedFiles', result)
        this.$router.push({
          name: 'download'
        })
      })
      this.uppy = uppy
      this.updateLocale(this.$i18n.locale)
    },
    updateLocale (lang) {
      if (this.uppy) {
        this.uppy.getPlugin('Dashboard').setOptions({
          locale: this.getCustomLocaleStrings(lang)
        })
      }
    },
    getCustomLocaleStrings (lang) {
      const baseLang = this.langHelper.getUppyTranslations(lang).default
      baseLang.strings.dropPasteImportFiles = this.$t('simply_drag')
      return baseLang
    }
  }
}
</script>
