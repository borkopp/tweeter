import { defineStore } from 'pinia';
import { ref, reactive, inject } from 'vue';
import { getJson } from '@/service/rest/restJson';

export const useI18nStore = defineStore('i18n', () => {
  const config = inject('config');

  const savedLanguage = localStorage.getItem('selectedLanguage') || config.defaultLanguage;
  const lang = ref(savedLanguage);
  const phrases = reactive({});
  const dictionary = reactive({});

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

  const changeLang = async (language = null) => {
    lang.value = language ?? config.defaultLanguage;
    await loadI18n(lang.value);
    document.documentElement.lang = lang.value;
    localStorage.setItem('selectedLanguage', lang.value);
  };

  changeLang(savedLanguage);

  const t = (key) => {
    return phrases[key] || key;
  };

  return {
    lang,
    phrases,
    dictionary,
    changeLang,
    t,
  };
});
