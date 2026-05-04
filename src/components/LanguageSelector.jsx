import { Globe } from 'lucide-react'
import { usePreferences } from '../context/PreferencesContext'

const LANGUAGE_LABELS = {
  en: 'EN',
  'zh-HK': 'ZH-HK',
  'zh-CN': 'ZH-CN',
  es: 'ES',
  fr: 'FR'
}

const LanguageSelector = () => {
  const { language, setLanguage, supportedLanguages } = usePreferences()

  return (
    <label className="select-field">
      <Globe size={16} aria-hidden="true" />
      <select value={language} onChange={(event) => setLanguage(event.target.value)}>
        {supportedLanguages.map((code) => (
          <option key={code} value={code}>
            {LANGUAGE_LABELS[code] || code}
          </option>
        ))}
      </select>
    </label>
  )
}

export default LanguageSelector
