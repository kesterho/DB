import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ExternalLink } from 'lucide-react'
import { useMarket } from '../context/MarketContext'
import { usePreferences } from '../context/PreferencesContext'
import { formatPrice } from '../utils/formatters'
import ImageCarousel from '../components/ImageCarousel'
import PriceChart from '../components/PriceChart'
import RatingStars from '../components/RatingStars'
import ReviewCard from '../components/ReviewCard'
import ProductCard from '../components/ProductCard'
import PriceAlertForm from '../components/PriceAlertForm'
import EmptyState from '../components/EmptyState'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const { t } = useTranslation()
  const { language, currency } = usePreferences()
  const { getProductById, reviews, products } = useMarket()
  const product = getProductById(productId)

  const [sort, setSort] = useState('relevance')
  const [visibleCount, setVisibleCount] = useState(6)

  const productReviews = useMemo(() => {
    if (!product) return []
    let list = reviews.filter((review) => review.productId === product.id)

    if (sort === 'date') {
      list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sort === 'rating') {
      list = list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [product, reviews, sort])

  const hasMore = visibleCount < productReviews.length
  const sentinelRef = useInfiniteScroll({
    hasMore,
    onLoadMore: () => setVisibleCount((count) => count + 4)
  })

  const similarProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4)
  }, [product, products])

  if (!product) {
    return (
      <main className="page">
        <div className="container">
          <EmptyState title={t('states.empty')} description={t('search.noResults')} />
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="section product-hero">
        <div className="container product-layout">
          <ImageCarousel images={product.images} name={product.name} />

          <div className="product-details glass">
            <div>
              <h2>{product.name}</h2>
              <p className="product-brand">{product.brand}</p>
              <RatingStars rating={product.rating} size={16} />
              <p className="product-description">{product.description}</p>
            </div>

            <div className="product-pricing">
              <div className="price-row">
                <span className="price-current">
                  {formatPrice(product.priceHKD, currency, language)}
                </span>
                <span className="price-original">
                  {formatPrice(product.originalPriceHKD, currency, language)}
                </span>
              </div>
              <div className="trend-row">
                <span>{t('product.marketChange')}</span>
                <strong>{product.trend.change24h}%</strong>
              </div>
            </div>

            <div className="specs">
              <h4>{t('product.specs')}</h4>
              <ul>
                {product.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="buy-links">
              {product.buyLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                  <ExternalLink size={14} /> {t('product.buyNow')} {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('product.priceHistory')}</h2>
          </div>
          <PriceChart history={product.priceHistory} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PriceAlertForm product={product} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('product.reviews')}</h2>
            <label className="select-field">
              <span>{t('reviews.filter')}</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="relevance">{t('reviews.sortRelevance')}</option>
                <option value="date">{t('reviews.sortDate')}</option>
                <option value="rating">{t('reviews.sortRating')}</option>
              </select>
            </label>
          </div>

          {productReviews.length === 0 ? (
            <EmptyState title={t('reviews.noReviews')} description={t('states.empty')} />
          ) : (
            <div className="reviews-grid">
              {productReviews.slice(0, visibleCount).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {hasMore ? (
            <div className="load-more">
              <button
                className="btn secondary"
                type="button"
                onClick={() => setVisibleCount((count) => count + 4)}
              >
                {t('search.loadMore')}
              </button>
              <span ref={sentinelRef} aria-hidden="true"></span>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('product.similar')}</h2>
          </div>
          <div className="product-grid">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetailPage
