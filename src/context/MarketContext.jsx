import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products as seedProducts, reviews as seedReviews } from '../data/mockData'
import { applyMarketTick } from '../utils/marketUtils'

const MarketContext = createContext(null)

export const MarketProvider = ({ children }) => {
  const [products, setProducts] = useState(seedProducts)
  const [reviews] = useState(seedReviews)
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString())

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProducts((prev) => applyMarketTick(prev))
      setLastUpdated(new Date().toISOString())
    }, 30000)

    return () => window.clearInterval(interval)
  }, [])

  const value = useMemo(() => {
    const hotDeals = products.filter((product) => {
      const discount =
        ((product.originalPriceHKD - product.priceHKD) / product.originalPriceHKD) * 100
      return discount >= 15
    })

    const trending = [...products]
      .sort((a, b) => Math.abs(b.trend.change24h) - Math.abs(a.trend.change24h))
      .slice(0, 8)

    const getProductById = (id) => products.find((product) => product.id === id)

    return {
      products,
      reviews,
      hotDeals,
      trending,
      lastUpdated,
      getProductById
    }
  }, [products, reviews, lastUpdated])

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
}

export const useMarket = () => {
  const context = useContext(MarketContext)
  if (!context) {
    throw new Error('useMarket must be used within MarketProvider')
  }
  return context
}
