
/**
 * little helper class to import the languages from uppy
 */
export default class LanguageHelper {
  de = require('@uppy/locales/lib/de_DE')
  en = require('@uppy/locales/lib/en_US')
  fr = require('@uppy/locales/lib/fr_FR')
  es = require('@uppy/locales/lib/es_ES')
  it = require('@uppy/locales/lib/it_IT')

  /**
   * return the uppy translations object for a given lang
   * @param lang
   */
  getUppyTranslations (lang) {
    switch (lang) {
      case 'de':
        return this.de
      case 'fr':
        return this.fr
      case 'es':
        return this.es
      case 'it':
        return this.it
      default:
        return this.en
    }
  }
}
