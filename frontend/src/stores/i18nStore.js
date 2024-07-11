import { defineStore } from 'pinia';
import { ref, reactive, inject } from 'vue';
import { getJson } from '@/service/rest/restJson';

export const useI18nStore = defineStore('i18n', () => {
  const config = inject('config');

  const savedLanguage = localStorage.getItem('selectedLanguage') || config.defaultLanguage;
  const lang = ref(savedLanguage);
  const phrases = reactive({});
  const dictionary = reactive({});

  /**
   * Asynchronously loads the internationalization (i18n) data for the specified language.
   *
   * @param {string} language - The language code to load the i18n data for.
   * @returns {Promise<void>} - A Promise that resolves when the i18n data has been loaded.
   * @throws {Error} - If there is an error loading the i18n data.
   */
  const loadI18n = async (language) => {
    try {
      const url = config.apiRoot.replace('$1', language ?? lang.value);
      const response = await getJson(url);
      const i18nData = response.data;
      Object.assign(phrases, i18nData.phrases);
      Object.assign(dictionary, i18nData.dictionary);
    } catch (error) {
      console.error('Error loading i18n data:', error);
    }
  };

  /**
   * Changes the current language and updates the i18n data accordingly.
   *
   * @param {string} [language=null] - The language code to switch to. If not provided, it will use the default language from the config.
   * @returns {Promise<void>} - A Promise that resolves when the i18n data has been loaded for the new language.
   */
  const changeLang = async (language = null) => {
    lang.value = language ?? config.defaultLanguage;
    await loadI18n(lang.value);
    document.documentElement.lang = lang.value;
    localStorage.setItem('selectedLanguage', lang.value);
  };

  
  /**
   * Translates the provided key to the corresponding phrase in the current language.
  *
  * @param {string} key - The key to look up in the phrases dictionary.
  * @returns {string} The translated phrase, or the original key if no translation is found.
  */
 const t = (key) => {
   return phrases[key] || key;
  };
  
  changeLang(savedLanguage);
  
  return {
    lang,
    phrases,
    dictionary,
    changeLang,
    t,
  };
});
