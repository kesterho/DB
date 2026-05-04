import { useEffect, useRef } from 'react'

const useInfiniteScroll = ({ hasMore, onLoadMore, rootMargin = '200px' }) => {
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (!hasMore) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onLoadMore()
          }
        })
      },
      { rootMargin }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, onLoadMore, rootMargin])

  return sentinelRef
}

export default useInfiniteScroll
