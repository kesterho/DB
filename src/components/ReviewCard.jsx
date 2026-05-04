import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RatingStars from './RatingStars'
import Badge from './Badge'
import { formatDate } from '../utils/formatters'
import { usePreferences } from '../context/PreferencesContext'

const ReviewCard = ({ review }) => {
  const { t } = useTranslation()
  const { language } = usePreferences()
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > 200
  const text = isLong && !expanded ? `${review.text.slice(0, 200)}...` : review.text

  return (
    <article className="review-card glass">
      <div className="review-header">
        <img className="avatar" src={review.avatar} alt={review.creator} loading="lazy" />
        <div>
          <div className="review-meta">
            <strong>{review.creator}</strong>
            {review.verified ? (
              <Badge label={t('product.nonSponsored')} variant="success" />
            ) : null}
          </div>
          <div className="review-sub">
            <RatingStars rating={review.rating} size={14} />
            <span>{formatDate(review.createdAt, language)}</span>
          </div>
        </div>
      </div>
      <p>{text}</p>
      {isLong ? (
        <button
          className="link-ghost"
          type="button"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? t('reviews.showLess') : t('reviews.showMore')}
        </button>
      ) : null}
    </article>
  )
}

export default ReviewCard
