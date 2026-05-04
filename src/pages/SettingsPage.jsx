import { useTranslation } from 'react-i18next'
import { usePreferences } from '../context/PreferencesContext'
import LanguageSelector from '../components/LanguageSelector'
import CurrencyToggle from '../components/CurrencyToggle'

const SettingsPage = () => {
  const { t } = useTranslation()
  const { theme, setTheme } = usePreferences()

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>{t('settings.title')}</h2>
              <p className="section-subtitle">{t('settings.subtitle')}</p>
            </div>
          </div>

          <div className="settings-grid">
            <div className="settings-card glass">
              <h3>{t('settings.language')}</h3>
              <LanguageSelector />
            </div>

            <div className="settings-card glass">
              <h3>{t('settings.theme')}</h3>
              <div className="button-group">
                <button
                  type="button"
                  className={`btn secondary ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  {t('settings.light')}
                </button>
                <button
                  type="button"
                  className={`btn secondary ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  {t('settings.dark')}
                </button>
              </div>
            </div>

            <div className="settings-card glass">
              <h3>{t('settings.currency')}</h3>
              <CurrencyToggle />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SettingsPage
