import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import i18n from '../i18n'

const STORAGE_KEYS = {
  theme: 'finder_theme',
  currency: 'finder_currency',
  language: 'finder_language'
}

const supportedLanguages = ['en', 'zh-HK', 'zh-CN', 'es', 'fr']

const detectLanguage = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.language)
  if (stored && supportedLanguages.includes(stored)) {
    return stored
  }

  const browser = navigator.language || 'en'
  if (browser.startsWith('zh')) {
    return browser.toLowerCase().includes('hk') ? 'zh-HK' : 'zh-CN'
  }
  if (browser.startsWith('es')) return 'es'
  if (browser.startsWith('fr')) return 'fr'
  return 'en'
}

const PreferencesContext = createContext(null)

export const PreferencesProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem(STORAGE_KEYS.theme) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  )
  const [currency, setCurrency] = useState(
    localStorage.getItem(STORAGE_KEYS.currency) || 'HKD'
  )
  const [language, setLanguage] = useState(detectLanguage)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEYS.theme, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language.startsWith('ar') ? 'rtl' : 'ltr'
    localStorage.setItem(STORAGE_KEYS.language, language)
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.currency, currency)
  }, [currency])

  const value = useMemo(
    () => ({
      theme,
      currency,
      language,
      setTheme,
      setCurrency,
      setLanguage,
      supportedLanguages,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
    }),
    [theme, currency, language]
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export const usePreferences = () => {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider')
  }
  return context
}
