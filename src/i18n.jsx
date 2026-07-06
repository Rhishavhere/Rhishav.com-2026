import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import tr from './locales/tr.json';
import en from './locales/en.json';

const resources = {
  en: { translation: en },
  tr: { translation: tr }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', 
    supportedLngs: ['en', 'tr'],
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'lng',
      checkWhitelist: true
    },
    interpolation: {
      escapeValue: false 
    },
    debug: import.meta.env.DEV,
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
    }
  });
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
});

export default i18n;
