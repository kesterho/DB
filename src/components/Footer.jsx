import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'
import CurrencyToggle from './CurrencyToggle'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-links">
          <a href="/#top">{t('footer.about')}</a>
          <a href="/#features">{t('footer.features')}</a>
          <a href="/#cta">{t('footer.contact')}</a>
          <a href="/#top">{t('footer.privacy')}</a>
        </div>
        <div className="footer-lang">{t('app.tagline')}</div>
        <div className="footer-controls">
          <LanguageSelector />
          <CurrencyToggle />
        </div>
        <div className="footer-meta">
          <span>{t('footer.metaOne')}</span>
          <span>{t('footer.metaTwo')}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
