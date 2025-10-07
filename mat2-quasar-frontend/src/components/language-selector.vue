<template>
  <q-btn-dropdown
    color="primary"
    :label="capitalize(language)"
    flat
    remove-shadow
    data-cy="locale-select"
  >
    <q-list>
      <q-item
        v-for="(lang, i) in $i18n.availableLocales"
        :key="`Lang${i}`"
        v-close-popup
        clickable
        data-cy="locale-select-item"
        @click="language = lang"
      >
        <q-item-section>
          <q-item-label>{{ capitalize(lang) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script>

export default {
  name: 'LanguageSelector',
  data: function () {
    return {
      language: this.$i18n.locale
    }
  },
  methods: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  },
  watch: {
    language (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
