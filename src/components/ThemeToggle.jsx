import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePreferences } from '../context/PreferencesContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = usePreferences()
  const { t } = useTranslation()

  return (
    <button
      className="icon-button"
      type="button"
      onClick={toggleTheme}
      aria-label={t('nav.toggleTheme')}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}

export default ThemeToggle
