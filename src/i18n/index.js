import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import zhHK from './locales/zh-HK.json'
import zhCN from './locales/zh-CN.json'
import es from './locales/es.json'
import fr from './locales/fr.json'

const detectLanguage = () => {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('finder_language')
  if (stored) return stored
  const browser = navigator.language || 'en'
  if (browser.startsWith('zh')) {
    return browser.toLowerCase().includes('hk') ? 'zh-HK' : 'zh-CN'
  }
  if (browser.startsWith('es')) return 'es'
  if (browser.startsWith('fr')) return 'fr'
  return 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    'zh-HK': { translation: zhHK },
    'zh-CN': { translation: zhCN },
    es: { translation: es },
    fr: { translation: fr }
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
