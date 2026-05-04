import { Link } from 'react-router-dom'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '../utils/formatters'
import { usePreferences } from '../context/PreferencesContext'
import RatingStars from './RatingStars'
import Sparkline from './Sparkline'
import LazyImage from './LazyImage'
import Badge from './Badge'

const ProductCard = ({ product, layout = 'grid' }) => {
  const { currency, language } = usePreferences()
  const { t } = useTranslation()
  const discount =
    ((product.originalPriceHKD - product.priceHKD) / product.originalPriceHKD) * 100
  const trendDirection = product.trend.change24h >= 0 ? 'up' : 'down'
  const trendIcon = trendDirection === 'up' ? TrendingUp : TrendingDown
  const TrendIcon = trendIcon
  const trendLabel =
    trendDirection === 'up' ? t('labels.trendUp') : t('labels.trendDown')

  return (
    <Link to={`/product/${product.id}`} className={`product-card ${layout}`}>
      <div className="product-media">
        <LazyImage
          src={product.images?.[0]}
          alt={product.name}
          placeholder={product.name.slice(0, 1)}
        />
        {discount >= 15 ? (
          <Badge label={`${Math.round(discount)}%`} variant="success" />
        ) : null}
      </div>
      <div className="product-body">
        <div className="product-header">
          <h3 title={product.name}>{product.name}</h3>
          <span className="product-brand">{product.brand}</span>
        </div>
        <div className="product-rating">
          <RatingStars rating={product.rating} size={14} />
          <span>
            {product.rating} ({product.ratingsCount} {t('labels.reviewCount')})
          </span>
        </div>
        <div className="product-price">
          <span className="price-current">
            {formatPrice(product.priceHKD, currency, language)}
          </span>
          <span className="price-original">
            {formatPrice(product.originalPriceHKD, currency, language)}
          </span>
        </div>
        <div className={`product-trend ${trendDirection}`}>
          <TrendIcon size={16} />
          <span>
            {Math.abs(product.trend.change24h).toFixed(2)}% {trendLabel}
          </span>
        </div>
        <Sparkline data={product.priceHistory} />
      </div>
    </Link>
  )
}

export default ProductCard
