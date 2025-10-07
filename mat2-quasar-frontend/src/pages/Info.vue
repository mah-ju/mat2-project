<template>
  <q-page>
    <section class="row">
      <div
        class="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 col-md-5 offset-md-1"
      >
        <h1 data-cy="mat-locally-title">
          {{ $t('MAT2_metadata') }}
        </h1>
        <p
          data-cy="mat-locally-info"
          class="word-wrapping"
        >
          {{ $t('mat_what_is_metadata_1') }}<br>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://0xacab.org/jvoisin/mat2/blob/master/README.md"
          >
            https://0xacab.org/jvoisin/mat2/blob/master/README.md (09.2019)
          </a>
        </p>
        <p>
          {{ $t('mat_what_is_metadata_2') }}
        </p>
        <p>
          {{ $t('mat_what_is_metadata_3') }}
        </p>
        <h1 data-cy="mat-locally-title">
          {{ $t('mat_locally') }}
        </h1>
        <p data-cy="mat-locally-info">
          {{ $t('mat_locally_info') }}
        </p>
        <h4 data-cy="mat-pip-title">
          {{ $t('mat_pip') }}
        </h4>
        <ssh-pre
          class="code-box"
          language="shell"
          dark
          data-cy="mat-pip-code"
        >
          pip3 install mat2
        </ssh-pre>

        <h4 data-cy="mat-debian-title">
          {{ $t('mat_debian') }}
        </h4>
        <p data-cy="mat-debian-p">
          {{ $t('mat_debian_available') }}.
        </p>
        <ssh-pre
          class="code-box"
          language="shell"
          dark
          data-cy="mat-debian-code"
        >
          sudo apt install mat2
        </ssh-pre>
        <p>
          {{ $t('more_info') }}
          <a
            data-cy="debian-link"
            rel="noreferrer"
            href="https://packages.debian.org/sid/mat2"
          >
            https://packages.debian.org/sid/mat2
          </a>
        </p>
      </div>
      <div
        class="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 col-md-5 offset-md-0"
      >
        <h3 data-cy="supp-formats">
          {{ $t('supported_formats') }}
        </h3>
        <q-chip
          v-for="ext of supportedExtensions"
          :key="ext"
          data-cy="supp-formats-chip"
          text-color="white"
          color="secondary"
        >
          {{ ext }}
        </q-chip>
      </div>
    </section>
  </q-page>
</template>

<script>
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'

export default {
  name: 'InfoPage',
  components: {
    SshPre
  },
  data: function () {
    return {
      supportedExtensions: [],
      apiUrl: process.env.API_URL ? process.env.API_URL : 'http://localhost:5000/'
    }
  },
  mounted () {
    this.$axios.get(this.apiUrl + 'api/extension').then((extensions) => {
      this.supportedExtensions = extensions.data
    })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading extensions failed',
          icon: 'report_problem'
        })
      })
  }
}
</script>

<style scoped lang="sass">
.word-wrapping
  /* These are technically the same, but use both */
  overflow-wrap: break-word
  word-wrap: break-word
  -ms-word-break: break-all
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all
  /* Instead use this non-standard one: */
  word-break: break-word
  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto
  -moz-hyphens: auto
  -webkit-hyphens: auto
  hyphens: auto
</style>
