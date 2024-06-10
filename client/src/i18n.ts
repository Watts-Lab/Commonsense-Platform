import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // later replace the http-backend with locize-backend
import LanguageDetector from 'i18next-browser-languagedetector';

export const supportedLngs = {
  en: "English",
  es: "Spanish (Español)",
  ar: "Arabic (العربية)",
  bn: "Bengali (বাংলা)",
  zh: "Chinese (中国人)",
  fr: "French (Français)",
  hi: "Hindi (हिंदी)",
  ja: "Japanese (日本語)",
  pt: "Portuguese (Português)",
  ru: "Russian (Русский)"
}

i18n 
  .use(initReactI18next) // pass the instance to react-i18next to make it available to all the components
  .use(Backend) // loads the translations using backend plugin
  .use(LanguageDetector) // detects the preferred language of the user --> language flag (test this)
  .init({ // config options
    supportedLngs: Object.keys(supportedLngs), // supported locales
    debug: true, // enables outputs in dev console
    fallbackLng: 'en', // fallback language when a translation is missing in the locale
    interpolation: {
      escapeValue: false, // might not be needed since we're using react
    }
  });

export default i18n;