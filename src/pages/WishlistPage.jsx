import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMarket } from '../context/MarketContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'

const WishlistPage = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { products } = useMarket()
  const { items, loading } = useWishlist()

  const wishlistProducts = useMemo(
    () =>
      items
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean),
    [items, products]
  )

  if (!user) {
    return (
      <main className="page">
        <section className="section">
          <div className="container">
            <EmptyState
              title={t('wishlist.signInTitle')}
              description={t('wishlist.signInBody')}
              action={
                <Link className="btn primary" to="/auth">
                  {t('wishlist.signInAction')}
                </Link>
              }
            />
          </div>
        </section>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="page">
        <section className="section">
          <div className="container">
            <LoadingSpinner label={t('states.loading')} />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>{t('wishlist.title')}</h2>
              <p className="section-subtitle">{t('wishlist.subtitle')}</p>
            </div>
          </div>

          {wishlistProducts.length ? (
            <div className="product-grid">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={t('wishlist.emptyTitle')}
              description={t('wishlist.emptyBody')}
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default WishlistPage
