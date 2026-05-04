const updateHistory = (history, nextPrice) => {
  const next = [...history]
  next.push({ date: new Date().toISOString(), priceHKD: Math.round(nextPrice) })
  if (next.length > 30) {
    next.shift()
  }
  return next
}

const computeTrend = (history) => {
  const lastIndex = history.length - 1
  const latest = history[lastIndex]?.priceHKD ?? 0
  const previous = history[lastIndex - 1]?.priceHKD ?? latest
  const weekIndex = Math.max(0, lastIndex - 7)
  const weekAgo = history[weekIndex]?.priceHKD ?? latest

  const change24h = previous ? ((latest - previous) / previous) * 100 : 0
  const change7d = weekAgo ? ((latest - weekAgo) / weekAgo) * 100 : 0

  return {
    change24h: Number(change24h.toFixed(2)),
    change7d: Number(change7d.toFixed(2)),
    direction: latest >= previous ? 'up' : 'down',
    updatedAt: new Date().toISOString()
  }
}

const applyMarketTick = (products) =>
  products.map((product) => {
    const drift = 1 + (Math.random() - 0.5) * 0.03
    const nextPrice = Math.max(60, product.priceHKD * drift)
    const nextHistory = updateHistory(product.priceHistory, nextPrice)
    return {
      ...product,
      priceHKD: Math.round(nextPrice),
      trend: computeTrend(nextHistory),
      priceHistory: nextHistory
    }
  })

export { applyMarketTick }
