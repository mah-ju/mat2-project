<template>
  <div class="fixed-center text-center">
    <p data-cy="kitty-p">
      <img
        src="~assets/kitty-error.png"
        class="crypto-kittie"
      >
    </p>
    <p
      class="text-faded"
      data-cy="general-error-text"
    >
      <b>{{ $t('general_error') }}</b>
    </p>
    <p
      class="text-faded"
      data-cy="general-error-report"
      v-html="$t('error_report')"
    />
    <q-btn
      data-cy="error-btn"
      to="/"
      :label="$t('go_home')"
      color="primary"
      aria-label="error to home button"
    />
  </div>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>

<style scoped lang="sass">
.crypto-kittie
  max-height: 10rem
</style>
