<template>
  <div class="fixed-center text-center">
    <p data-cy="kitty-p">
      <img
        src="~assets/kitty.svg"
        class="crypto-kittie"
      >
    </p>
    <p
      class="text-faded"
      data-cy="four-o-four-text"
    >
      {{ $t('four_o_four') }} <strong>(404)</strong>
    </p>
    <q-btn
      data-cy="404-btn"
      to="/"
      :label="$t('go_home')"
      color="primary"
      aria-label="back to home button"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404Page'
}
</script>

<style scoped lang="stylus">
</style>
