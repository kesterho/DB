import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { usePreferences } from '../context/PreferencesContext'
import { formatPrice } from '../utils/formatters'
import LazyImage from './LazyImage'

const DealsCarousel = ({ deals }) => {
  const { currency, language } = usePreferences()

  return (
    <div className="deals-carousel">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1.1}
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 }
        }}
      >
        {deals.map((product) => (
          <SwiperSlide key={product.id}>
            <Link to={`/product/${product.id}`} className="deal-card glass">
              <LazyImage
                src={product.images?.[0]}
                alt={product.name}
                placeholder={product.name.slice(0, 1)}
              />
              <div className="deal-meta">
                <h3 title={product.name}>{product.name}</h3>
                <span className="deal-price">
                  {formatPrice(product.priceHKD, currency, language)}
                </span>
                <span className="deal-brand">{product.brand}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default DealsCarousel
