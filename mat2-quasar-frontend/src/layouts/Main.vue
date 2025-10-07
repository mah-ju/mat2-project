<template>
  <q-layout view="hhh lpR fff">
    <q-header>
      <q-btn
        v-show="$route.path !== '/'"
        flat
        round
        to="/"
        color="primary"
        class="back-icon"
        icon="arrow_back_ios"
        aria-label="back button"
        data-cy="main-back-button"
      />
      <div class="header-div column items-center">
        <router-link to="/">
          <img
            id="mat-logo"
            src="~/assets/logo.svg"
            alt="Logo of the mat-2 project"
          >
        </router-link>
      </div>
      <language-selector class="lang-select" />
    </q-header>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <q-footer class="text-center bg-white">
      <a
        data-cy="footer-source-link"
        class="source-link"
        target="_blank"
        rel="noreferrer"
        href="https://0xacab.org/jfriedli/mat2-quasar-frontend"
      >
        <q-icon name="code" />  source
      </a>
    </q-footer>
  </q-layout>
</template>

<script>
import LanguageSelector from '../components/language-selector'
export default {
  name: 'UploadLayout',
  components: {
    LanguageSelector
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="sass">
footer
  padding-bottom: 1rem
.q-footer
  background-color: white
  color: black
.header-div
  background-color: $light-blue
  height: 5rem
  width: 100%
#mat-logo
  margin-top: 2rem
  height: 7rem
  width: auto
main
  padding-top: 5rem
.source-link
  text-decoration: none
.back-icon
  position: absolute
  top: 1.25rem
  left: 1rem
.lang-select
  position: absolute
  top: 1.25rem
  right: 1rem
</style>
