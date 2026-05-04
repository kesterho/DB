import { useTranslation } from 'react-i18next'
import { useMarket } from '../context/MarketContext'
import DealsCarousel from '../components/DealsCarousel'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

const DealsPage = () => {
  const { t } = useTranslation()
  const { hotDeals, trending } = useMarket()

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.hotDeals')}</h2>
          </div>
          {hotDeals.length ? (
            <DealsCarousel deals={hotDeals} />
          ) : (
            <EmptyState title={t('states.noDeals')} description={t('states.empty')} />
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.trendingDeals')}</h2>
            <p className="section-subtitle">{t('home.trendingSubtitle')}</p>
          </div>
          {trending.length ? (
            <div className="product-grid">
              {trending.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState title={t('states.empty')} description={t('states.noDeals')} />
          )}
        </div>
      </section>
    </main>
  )
}

export default DealsPage
