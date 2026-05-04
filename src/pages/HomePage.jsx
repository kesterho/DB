import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { categories } from '../data/mockData'
import { useMarket } from '../context/MarketContext'
import SearchBar from '../components/SearchBar'
import DealsCarousel from '../components/DealsCarousel'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { hotDeals, trending } = useMarket()

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <main className="app">
      <section className="hero" id="top">
        <div className="container hero-inner">
          <div className="hero-card glass reveal">
            <p className="eyebrow">{t('app.heroEyebrow')}</p>
            <h1>{t('app.heroTitle')}</h1>
            <p className="hero-sub">{t('app.heroSubtitle')}</p>
            <p className="hero-desc">{t('app.heroDescription')}</p>
            <SearchBar onSubmit={handleSearch} />
            <div className="hero-actions">
              <button className="btn primary" type="button" onClick={() => handleSearch('')}
              >
                {t('app.heroPrimaryCta')}
              </button>
              <a className="link-ghost" href="#how">
                {t('app.heroSecondaryCta')} <span className="arrow">&darr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="categories">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.popularCategories')}</h2>
          </div>
          <div className="pill-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="pill"
                onClick={() => navigate(`/search?category=${encodeURIComponent(category)}`)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="hot-deals">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.hotDeals')}</h2>
          </div>
          <DealsCarousel deals={hotDeals} />
        </div>
      </section>

      <section className="section reveal" id="trending">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>{t('home.trendingDeals')}</h2>
              <p className="section-subtitle">{t('home.trendingSubtitle')}</p>
            </div>
            <button className="btn secondary" type="button" onClick={() => navigate('/search')}>
              {t('nav.search')}
            </button>
          </div>
          <div className="product-grid">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="problem">
        <div className="container">
          <div className="glass panel">
            <h2>{t('home.problemTitle')}</h2>
            <div className="pain-grid">
              <div className="pain-item">
                <div className="icon teal">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M10 28c0 7 6 12 14 12s14-5 14-12c0-6-5-10-12-10h-4" />
                    <path d="M14 22h10" />
                    <path d="M18 18l-4-4" />
                    <path d="M30 12h6" />
                    <circle cx="36" cy="12" r="3" />
                    <path d="M22 28l4-4" />
                    <path d="M20 32l8-8" />
                  </svg>
                </div>
                <p>{t('home.problemOne')}</p>
              </div>
              <div className="pain-item">
                <div className="icon teal">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <circle cx="20" cy="20" r="12" />
                    <path d="M29 29l9 9" />
                    <path d="M20 14v7l5 3" />
                  </svg>
                </div>
                <p>{t('home.problemTwo')}</p>
              </div>
              <div className="pain-item">
                <div className="icon teal">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M14 26h20a8 8 0 0 1 0 16H14a8 8 0 0 1 0-16Z" />
                    <path d="M20 30v4" />
                    <path d="M28 30v4" />
                    <path d="M18 20c2-3 10-3 12 0" />
                    <circle cx="19" cy="16" r="2" />
                    <circle cx="29" cy="16" r="2" />
                  </svg>
                </div>
                <p>{t('home.problemThree')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="how">
        <div className="container">
          <h2>{t('home.howTitle')}</h2>
          <div className="steps">
            <article className="glass step-card">
              <span className="step-number">1</span>
              <div className="icon">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="21" cy="21" r="10" />
                  <path d="M29 29l10 10" />
                </svg>
              </div>
              <h3>{t('home.stepSearch')}</h3>
              <p>{t('home.stepSearchText')}</p>
            </article>
            <article className="glass step-card">
              <span className="step-number">2</span>
              <div className="icon">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M24 8c6 0 12 4 14 10-2 6-8 10-14 10S12 24 10 18C12 12 18 8 24 8Z" />
                  <path d="M24 14c3 0 6 2 6 4s-3 4-6 4-6-2-6-4 3-4 6-4Z" />
                  <path d="M14 34l4-4" />
                  <path d="M34 34l-4-4" />
                </svg>
              </div>
              <h3>{t('home.stepCompare')}</h3>
              <p>{t('home.stepCompareText')}</p>
            </article>
            <article className="glass step-card">
              <span className="step-number">3</span>
              <div className="icon">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M8 18h32v18a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V18Z" />
                  <path d="M12 18v-2a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v2" />
                  <circle cx="18" cy="30" r="3" />
                  <path d="M26 28h8" />
                  <path d="M26 34h6" />
                </svg>
              </div>
              <h3>{t('home.stepSave')}</h3>
              <p>{t('home.stepSaveText')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section reveal" id="features">
        <div className="container">
          <h2>{t('home.featuresTitle')}</h2>
          <div className="features-grid">
            <article className="glass feature-card">
              <div className="feature-icon blue">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M10 24c5-8 23-8 28 0-5 8-23 8-28 0Z" />
                  <circle cx="24" cy="24" r="4" />
                </svg>
              </div>
              <h3>{t('home.featureSearch')}</h3>
              <p>{t('home.featureSearchText')}</p>
            </article>
            <article className="glass feature-card">
              <div className="feature-icon teal">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M12 16h24v20H12z" />
                  <path d="M16 12h16" />
                  <path d="M18 22h12" />
                  <path d="M18 28h8" />
                </svg>
              </div>
              <h3>{t('home.featureReviews')}</h3>
              <p>{t('home.featureReviewsText')}</p>
            </article>
            <article className="glass feature-card">
              <div className="feature-icon green">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M10 32c6-8 12 0 18-8 6-8 10-2 10-2" />
                  <path d="M10 36h28" />
                  <circle cx="36" cy="14" r="4" />
                </svg>
              </div>
              <h3>{t('home.featureTracking')}</h3>
              <p>{t('home.featureTrackingText')}</p>
            </article>
            <article className="glass feature-card">
              <div className="feature-icon purple">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M14 18a10 10 0 0 1 20 0c0 8-10 14-10 14s-10-6-10-14Z" />
                  <circle cx="24" cy="18" r="4" />
                </svg>
              </div>
              <h3>{t('home.featureTheme')}</h3>
              <p>{t('home.featureThemeText')}</p>
            </article>
            <article className="glass feature-card">
              <div className="feature-icon orange">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M8 14h32v20H8z" />
                  <path d="M16 14v20" />
                  <path d="M32 14v20" />
                </svg>
              </div>
              <h3>{t('home.featureLanguages')}</h3>
              <p>{t('home.featureLanguagesText')}</p>
            </article>
            <article className="glass feature-card">
              <div className="feature-icon pink">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M14 16h20v20H14z" />
                  <path d="M18 20h12" />
                  <path d="M18 26h8" />
                  <path d="M18 32h6" />
                </svg>
              </div>
              <h3>{t('home.featureCurrency')}</h3>
              <p>{t('home.featureCurrencyText')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section reveal" id="audience">
        <div className="container">
          <h2>{t('home.audienceTitle')}</h2>
          <div className="audience-row">
            <article className="glass audience-card">
              <div className="avatar">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="20" r="8" />
                  <path d="M12 40c2-8 22-8 24 0" />
                  <path d="M18 18h12" />
                </svg>
              </div>
              <h3>{t('home.audienceTeens')}</h3>
              <p>{t('home.audienceTeensText')}</p>
            </article>
            <article className="glass audience-card">
              <div className="avatar">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="18" cy="18" r="6" />
                  <circle cx="32" cy="18" r="6" />
                  <path d="M10 40c1-7 14-7 16 0" />
                  <path d="M22 40c1-7 14-7 16 0" />
                </svg>
              </div>
              <h3>{t('home.audienceFamilies')}</h3>
              <p>{t('home.audienceFamiliesText')}</p>
            </article>
            <article className="glass audience-card">
              <div className="avatar">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <rect x="14" y="12" width="20" height="24" rx="6" />
                  <path d="M18 20h12" />
                  <path d="M18 26h10" />
                </svg>
              </div>
              <h3>{t('home.audienceStudents')}</h3>
              <p>{t('home.audienceStudentsText')}</p>
            </article>
            <article className="glass audience-card">
              <div className="avatar">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="18" r="8" />
                  <path d="M16 36c2-6 14-6 16 0" />
                  <path d="M20 18h8" />
                </svg>
              </div>
              <h3>{t('home.audienceNew')}</h3>
              <p>{t('home.audienceNewText')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="stats" id="stats">
        <div className="container stats-grid">
          <div className="stat">
            <div className="stat-number" data-target="500" data-suffix="+">
              0
            </div>
            <div className="stat-label">{t('home.statsProducts')}</div>
          </div>
          <div className="stat">
            <div className="stat-number" data-target="1" data-suffix="s">
              0
            </div>
            <div className="stat-label">{t('home.statsUpdates')}</div>
          </div>
          <div className="stat">
            <div className="stat-number" data-target="12000" data-suffix="+">
              0
            </div>
            <div className="stat-label">{t('home.statsTrusted')}</div>
          </div>
          <div className="stat">
            <div className="stat-number" data-target="99" data-suffix="%">
              0
            </div>
            <div className="stat-label">{t('home.statsAi')}</div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="cta">
        <div className="container">
          <div className="glass cta-card">
            <h2>{t('home.ctaTitle')}</h2>
            <p className="cta-sub">{t('home.ctaSubtitle')}</p>
            <button className="btn primary large" type="button" onClick={() => handleSearch('')}
            >
              {t('home.ctaButton')}
            </button>
            <p className="cta-trust">{t('home.ctaTrust')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
