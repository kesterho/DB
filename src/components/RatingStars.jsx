import { Star } from 'lucide-react'

const RatingStars = ({ rating = 0, size = 16 }) => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="rating-stars" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} size={size} className="star filled" />
      ))}
      {hasHalf ? <Star size={size} className="star half" /> : null}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} size={size} className="star" />
      ))}
    </div>
  )
}

export default RatingStars
