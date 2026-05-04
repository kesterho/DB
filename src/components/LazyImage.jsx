import { useEffect, useRef, useState } from 'react'

const LazyImage = ({ src, alt, className = '', placeholder, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`image-wrapper ${className}`.trim()}>
      {!isVisible && (
        <div className="image-placeholder">{placeholder}</div>
      )}
      {isVisible && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`image ${isLoaded ? 'loaded' : ''}`.trim()}
          {...props}
        />
      ) : null}
      {isVisible && !src ? (
        <div className="image-placeholder">{placeholder}</div>
      ) : null}
    </div>
  )
}

export default LazyImage
