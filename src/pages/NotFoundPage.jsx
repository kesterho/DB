import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="glass cta-card">
            <h2>{t('states.empty')}</h2>
            <p>{t('search.noResults')}</p>
            <Link className="btn primary" to="/">
              {t('nav.home')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
