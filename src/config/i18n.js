import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationGB from './locales/gb/translation.json'
import translationFI from './locales/fi/translation.json'

// the translations
const resources = {
  GB: {
    translation: translationGB
  },
  FI: {
    translation: translationFI
  }
}

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'FI',
    fallbackLng: 'GB', // use en if detected lng is not available
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false,
      wait: false
    }
  })

export default i18n
