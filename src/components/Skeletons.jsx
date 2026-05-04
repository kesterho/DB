const SkeletonBlock = ({ className = '' }) => (
  <div className={`skeleton-block ${className}`.trim()}></div>
)

export const SkeletonCard = () => (
  <div className="skeleton-card glass">
    <SkeletonBlock className="skeleton-media" />
    <SkeletonBlock className="skeleton-line short" />
    <SkeletonBlock className="skeleton-line" />
    <SkeletonBlock className="skeleton-line" />
  </div>
)

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="product-grid">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={`skeleton-${index}`} />
    ))}
  </div>
)

export const SkeletonText = () => (
  <div className="skeleton-text">
    <SkeletonBlock className="skeleton-line" />
    <SkeletonBlock className="skeleton-line" />
  </div>
)
