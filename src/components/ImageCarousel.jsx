import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'
import { X } from 'lucide-react'
import LazyImage from './LazyImage'

const ImageCarousel = ({ images = [], name }) => {
  const { t } = useTranslation()
  const [thumbs, setThumbs] = useState(null)
  const [modalImage, setModalImage] = useState(null)

  return (
    <div className="image-carousel">
      <Swiper
        modules={[Navigation, Thumbs, Autoplay]}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbs }}
        className="main-swiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`}>
            <button
              type="button"
              className="image-button"
              onClick={() => setModalImage(src)}
            >
              <LazyImage src={src} alt={`${name} ${index + 1}`} placeholder={name[0]} />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbs}
        modules={[FreeMode, Thumbs]}
        spaceBetween={12}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        className="thumbs-swiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={`thumb-${src}-${index}`}>
            <LazyImage src={src} alt={`${name} thumbnail ${index + 1}`} placeholder={name[0]} />
          </SwiperSlide>
        ))}
      </Swiper>

      {modalImage ? (
        <div className="image-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="icon-button close"
            onClick={() => setModalImage(null)}
            aria-label={t('nav.closeMenu')}
          >
            <X size={20} />
          </button>
          <img src={modalImage} alt={name} />
        </div>
      ) : null}
    </div>
  )
}

export default ImageCarousel
