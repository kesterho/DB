const createPriceHistory = (basePrice, days = 30) => {
  const history = []
  let current = Math.max(80, basePrice * (0.92 + Math.random() * 0.1))
  const today = new Date()

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const drift = 1 + (Math.random() - 0.48) * 0.04
    current = Math.max(60, current * drift)
    history.push({
      date: date.toISOString(),
      priceHKD: Math.round(current)
    })
  }

  return history
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

const baseProducts = [
  {
    id: 'mouse-logitech-g-pro-x2-superstrike',
    name: 'Logitech G Pro X2 Superstrike',
    brand: 'Logitech',
    category: 'Mice',
    priceHKD: 1240,
    originalPriceHKD: 1240,
    rating: 5.0,
    ratingsCount: 1476,
    description: 'S-Tier (boardzy), "Generational leap with analog switches" (PCGamer), "New competitive standard" (Optimum)',
    specs: [
      'HERO 2 44K',
      '60g',
      '8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $159.00 (New Release)'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-01T08:00:00Z'
  },
  {
    id: 'mouse-razer-viper-v4-pro',
    name: 'Razer Viper V4 Pro',
    brand: 'Razer',
    category: 'Mice',
    priceHKD: 1318,
    originalPriceHKD: 1318,
    rating: 5.0,
    ratingsCount: 1464,
    description: 'S-Tier (boardzy), "Unrivalled build quality" (PCGamer), "Best for pure performance" (Optimum)',
    specs: [
      'Focus Pro 50K Gen-3',
      '49g',
      '8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $169.00 (New Release)'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-02T08:00:00Z'
  },
  {
    id: 'mouse-razer-deathadder-v3-pro',
    name: 'Razer DeathAdder V3 Pro',
    brand: 'Razer',
    category: 'Mice',
    priceHKD: 1162,
    originalPriceHKD: 1162,
    rating: 5.0,
    ratingsCount: 1440,
    description: 'A-Tier (boardzy), "Best ergonomic shape" (RJN), "Flawless performance" (Optimum)',
    specs: [
      'Focus Pro 30K',
      '63g',
      '4000Hz (w/ dongle)',
      '2.4GHz/Wired',
      '12-mo price: $129.00 - $149.00 (Sales down to $119)'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-03T08:00:00Z'
  },
  {
    id: 'mouse-logitech-g-pro-x-superlight-2',
    name: 'Logitech G Pro X Superlight 2',
    brand: 'Logitech',
    category: 'Mice',
    priceHKD: 1162,
    originalPriceHKD: 1240,
    rating: 4.5,
    ratingsCount: 1428,
    description: 'S-Tier (boardzy), "Safe shape, amazing battery" (Optimum), "Top tier for FPS" (Tom\'s Hardware)',
    specs: [
      'HERO 2',
      '60g',
      '8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $129.00 - $159.00'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-04T08:00:00Z'
  },
  {
    id: 'mouse-endgame-gear-op1-8k',
    name: 'Endgame Gear OP1 8k',
    brand: 'Endgame Gear',
    category: 'Mice',
    priceHKD: 585,
    originalPriceHKD: 585,
    rating: 5.0,
    ratingsCount: 1476,
    description: 'S-Tier (boardzy), "Absolute best overall right now for claw" (Reddit/Community consensus), "Flawless clicks" (Optimum)',
    specs: [
      'PAW3395',
      '50.5g',
      '8000Hz',
      'Wired',
      '12-mo price: $74.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-05T08:00:00Z'
  },
  {
    id: 'mouse-ninjutso-sora-v2',
    name: 'Ninjutso Sora V2',
    brand: 'Ninjutso',
    category: 'Mice',
    priceHKD: 780,
    originalPriceHKD: 780,
    rating: 4.5,
    ratingsCount: 1428,
    description: 'A-Tier (boardzy), "Incredible weight for no holes" (Optimum), "Amazing for claw grip" (RJN)',
    specs: [
      'PAW3395',
      '39g',
      'up to 8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $99.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-06T08:00:00Z'
  },
  {
    id: 'mouse-wlmouse-beastx',
    name: 'WLMouse BeastX',
    brand: 'WLMouse',
    category: 'Mice',
    priceHKD: 1084,
    originalPriceHKD: 1084,
    rating: 5.0,
    ratingsCount: 1440,
    description: 'S-Tier (boardzy), "Magnesium king, beats Starlight" (Optimum), "Premium unboxing and feel"',
    specs: [
      'PAW3395',
      '39g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $139.00 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-07T08:00:00Z'
  },
  {
    id: 'mouse-lamzu-maya-x',
    name: 'Lamzu Maya X',
    brand: 'Lamzu',
    category: 'Mice',
    priceHKD: 936,
    originalPriceHKD: 936,
    rating: 5.0,
    ratingsCount: 1440,
    description: 'S-Tier (boardzy), "Perfect shape for fingertip/claw" (Optimum), "Great value and build"',
    specs: [
      'PAW3395',
      '45g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $119.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-08T08:00:00Z'
  },
  {
    id: 'mouse-razer-viper-v3-pro',
    name: 'Razer Viper V3 Pro',
    brand: 'Razer',
    category: 'Mice',
    priceHKD: 1248,
    originalPriceHKD: 1248,
    rating: 5.0,
    ratingsCount: 1452,
    description: 'S-Tier (boardzy), "Safe symmetrical shape, top tech" (Optimum), "Excellent click latency"',
    specs: [
      'Focus Pro 35K',
      '54g',
      '8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $149.99 - $159.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-09T08:00:00Z'
  },
  {
    id: 'mouse-vaxee-np-01s-wireless',
    name: 'Vaxee NP-01S Wireless',
    brand: 'Vaxee',
    category: 'Mice',
    priceHKD: 936,
    originalPriceHKD: 936,
    rating: 4.5,
    ratingsCount: 1416,
    description: 'S-Tier (boardzy), "Best build quality, unique ergo-sym shape" (Optimum), "Top tier CS/Val mouse"',
    specs: [
      'PAW3395',
      '68g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $119.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-10T08:00:00Z'
  },
  {
    id: 'mouse-zowie-u2',
    name: 'Zowie U2',
    brand: 'Zowie',
    category: 'Mice',
    priceHKD: 1014,
    originalPriceHKD: 1014,
    rating: 4.5,
    ratingsCount: 1404,
    description: 'A-Tier (boardzy), "Great side curves for claw" (Optimum), "Zowie finally goes modern"',
    specs: [
      'PAW3395',
      '60g',
      '1000Hz',
      '2.4GHz/Wired (Enhanced Receiver)',
      '12-mo price: $129.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-11T08:00:00Z'
  },
  {
    id: 'mouse-pulsar-xlite-v3',
    name: 'Pulsar Xlite V3',
    brand: 'Pulsar',
    category: 'Mice',
    priceHKD: 780,
    originalPriceHKD: 780,
    rating: 4.5,
    ratingsCount: 1404,
    description: 'A-Tier (boardzy), "Excellent EC clone, great coating" (Optimum), "Solid ergo choice"',
    specs: [
      'PAW3395',
      '55g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $99.95 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-12T08:00:00Z'
  },
  {
    id: 'mouse-vaxee-outset-ax-wireless',
    name: 'Vaxee Outset AX Wireless',
    brand: 'Vaxee',
    category: 'Mice',
    priceHKD: 936,
    originalPriceHKD: 936,
    rating: 4.5,
    ratingsCount: 1392,
    description: 'B-Tier (boardzy), "Incredible for tilt-grip ergo" (Optimum), "Built like a tank"',
    specs: [
      'PAW3395',
      '73g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $119.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-13T08:00:00Z'
  },
  {
    id: 'mouse-scyrox-v8',
    name: 'Scyrox V8',
    brand: 'Scyrox',
    category: 'Mice',
    priceHKD: 546,
    originalPriceHKD: 546,
    rating: 4.5,
    ratingsCount: 1428,
    description: 'S-Tier (boardzy), "Crazy specs for the price" (Community), "Insane lightweight performance"',
    specs: [
      'PAW3395',
      '36g',
      '8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $65.00 - $69.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-14T08:00:00Z'
  },
  {
    id: 'mouse-finalmouse-ultralightx',
    name: 'Finalmouse UltralightX',
    brand: 'Finalmouse',
    category: 'Mice',
    priceHKD: 1474,
    originalPriceHKD: 1474,
    rating: 4.5,
    ratingsCount: 1416,
    description: 'S-Tier (boardzy), "Lightest solid feel" (Optimum), "Availability issues hinder it" (RJN)',
    specs: [
      'PAW3950',
      '40g',
      '8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $189.00 (Often scalped higher)'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-15T08:00:00Z'
  },
  {
    id: 'mouse-lamzu-atlantis-mini-pro',
    name: 'Lamzu Atlantis Mini Pro',
    brand: 'Lamzu',
    category: 'Mice',
    priceHKD: 780,
    originalPriceHKD: 780,
    rating: 4.5,
    ratingsCount: 1416,
    description: 'A-Tier (boardzy), "God tier for claw grip" (Optimum), "Amazing aesthetic and clicks"',
    specs: [
      'PAW3395',
      '51g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $89.99 - $99.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-16T08:00:00Z'
  },
  {
    id: 'mouse-endgame-gear-xm2we',
    name: 'Endgame Gear XM2we',
    brand: 'Endgame Gear',
    category: 'Mice',
    priceHKD: 624,
    originalPriceHKD: 624,
    rating: 4.5,
    ratingsCount: 1380,
    description: 'B-Tier (boardzy), "Best coating, perfect claw shape" (Optimum), "Optical switches are stiff"',
    specs: [
      'PAW3370',
      '63g',
      '1000Hz',
      '2.4GHz/Wired',
      '12-mo price: $79.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-17T08:00:00Z'
  },
  {
    id: 'mouse-asus-rog-keris-ii-ace',
    name: 'Asus ROG Keris II Ace',
    brand: 'Asus ROG',
    category: 'Mice',
    priceHKD: 1248,
    originalPriceHKD: 1248,
    rating: 4.5,
    ratingsCount: 1392,
    description: 'B-Tier (boardzy), "Specs pro gamers need" (PCMag), "Great optical switches"',
    specs: [
      'AimPoint Pro 42K',
      '54g',
      '8000Hz/4000Hz',
      'Tri-mode',
      '12-mo price: $149.99 - $159.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-18T08:00:00Z'
  },
  {
    id: 'mouse-angry-miao-am-infinity-97',
    name: 'Angry Miao AM Infinity .97',
    brand: 'Angry Miao',
    category: 'Mice',
    priceHKD: 1318,
    originalPriceHKD: 1318,
    rating: 4.5,
    ratingsCount: 1404,
    description: '"Premium magnesium without holes" (Reviews), "Hot-swap battery is genius"',
    specs: [
      'PAW3950 30K',
      '47g',
      '8000Hz',
      'Tri-mode',
      '12-mo price: $169.00 (New Release)'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-19T08:00:00Z'
  },
  {
    id: 'mouse-razer-basilisk-v3-pro-35k',
    name: 'Razer Basilisk V3 Pro 35K',
    brand: 'Razer',
    category: 'Mice',
    priceHKD: 1248,
    originalPriceHKD: 1248,
    rating: 4.5,
    ratingsCount: 1380,
    description: '"Best Overall non-FPS" (Tom\'s Hardware), "Heavy but feature-packed"',
    specs: [
      'Focus Pro 35K',
      '112g',
      '8000Hz',
      'Tri-mode',
      '12-mo price: $159.99 (New Release)'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-20T08:00:00Z'
  },
  {
    id: 'mouse-corsair-katar-pro-xt',
    name: 'Corsair Katar Pro XT',
    brand: 'Corsair',
    category: 'Mice',
    priceHKD: 273,
    originalPriceHKD: 312,
    rating: 4.0,
    ratingsCount: 1236,
    description: '"Best lightweight budget options" (Addictive Tips), "Cheap but effective"',
    specs: [
      'PMW3391',
      '73g',
      '1000Hz',
      'Wired',
      '12-mo price: $29.99 - $39.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-21T08:00:00Z'
  },
  {
    id: 'mouse-g-wolves-hts-plus-4k',
    name: 'G-Wolves HTS Plus 4K',
    brand: 'G-Wolves',
    category: 'Mice',
    priceHKD: 1240,
    originalPriceHKD: 1240,
    rating: 4.5,
    ratingsCount: 1392,
    description: 'B-Tier (boardzy), "Amazing shape but expensive" (Optimum), "QC can be hit or miss"',
    specs: [
      'PAW3395',
      '49g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $139.00 - $159.00'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-22T08:00:00Z'
  },
  {
    id: 'mouse-razer-deathadder-v3-hyperspeed',
    name: 'Razer DeathAdder V3 Hyperspeed',
    brand: 'Razer',
    category: 'Mice',
    priceHKD: 780,
    originalPriceHKD: 780,
    rating: 4.5,
    ratingsCount: 1404,
    description: 'A-Tier (boardzy), "More affordable V3 Pro" (PCMag), "Great battery life"',
    specs: [
      'Focus Pro 26K',
      '55g',
      '1000Hz',
      '2.4GHz',
      '12-mo price: $89.99 - $99.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-23T08:00:00Z'
  },
  {
    id: 'mouse-vaxee-xe-wireless',
    name: 'Vaxee XE Wireless',
    brand: 'Vaxee',
    category: 'Mice',
    priceHKD: 936,
    originalPriceHKD: 936,
    rating: 4.5,
    ratingsCount: 1380,
    description: 'B-Tier (boardzy), "Jack of all trades shape" (Optimum), "Impeccable QC"',
    specs: [
      'PAW3395',
      '76g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $119.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-24T08:00:00Z'
  },
  {
    id: 'mouse-pulsar-x2v2',
    name: 'Pulsar X2V2',
    brand: 'Pulsar',
    category: 'Mice',
    priceHKD: 780,
    originalPriceHKD: 780,
    rating: 4.5,
    ratingsCount: 1392,
    description: 'A-Tier (boardzy), "Optical switches fix double clicking" (Optimum), "Safe symm shape"',
    specs: [
      'PAW3395',
      '53g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $99.95 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-25T08:00:00Z'
  },
  {
    id: 'mouse-pulsar-x2h',
    name: 'Pulsar X2H',
    brand: 'Pulsar',
    category: 'Mice',
    priceHKD: 780,
    originalPriceHKD: 780,
    rating: 4.5,
    ratingsCount: 1392,
    description: 'A-Tier (boardzy), "High hump for aggressive claw" (Optimum), "Great coating"',
    specs: [
      'PAW3395',
      '54g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $99.95 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-26T08:00:00Z'
  },
  {
    id: 'mouse-pwnage-stormbreaker',
    name: 'Pwnage Stormbreaker',
    brand: 'Pwnage',
    category: 'Mice',
    priceHKD: 1318,
    originalPriceHKD: 1318,
    rating: 4.5,
    ratingsCount: 1356,
    description: 'B-Tier (boardzy), "Magnesium ergo is rare" (Optimum), "Sensor position adjustment is neat"',
    specs: [
      'PAW3395',
      '51g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $149.00 - $169.00'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-27T08:00:00Z'
  },
  {
    id: 'mouse-zowie-ec2-cw',
    name: 'Zowie EC2-CW',
    brand: 'Zowie',
    category: 'Mice',
    priceHKD: 936,
    originalPriceHKD: 1170,
    rating: 4.5,
    ratingsCount: 1368,
    description: 'B-Tier (boardzy), "The king of ergo shapes" (RJN), "Tech is outdated for the price"',
    specs: [
      'PAW3370',
      '77g',
      '1000Hz',
      '2.4GHz/Wired (Enhanced Receiver)',
      '12-mo price: $119.99 - $149.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-28T08:00:00Z'
  },
  {
    id: 'mouse-logitech-g502-x-plus',
    name: 'Logitech G502 X Plus',
    brand: 'Logitech',
    category: 'Mice',
    priceHKD: 1248,
    originalPriceHKD: 1248,
    rating: 4.5,
    ratingsCount: 1356,
    description: '"Best RGB Gaming Mouse" (Tom\'s Hardware), "Impeccable ergonomics for productivity/casual"',
    specs: [
      'HERO 25K',
      '106g',
      '1000Hz',
      '2.4GHz/Wired',
      '12-mo price: $129.99 - $159.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-29T08:00:00Z'
  },
  {
    id: 'mouse-zaopin-z1-pro',
    name: 'Zaopin Z1 Pro',
    brand: 'Zaopin',
    category: 'Mice',
    priceHKD: 390,
    originalPriceHKD: 390,
    rating: 4.5,
    ratingsCount: 1368,
    description: 'B-Tier (boardzy), "Incredible budget egg shape" (Optimum), "Orochi V2 killer"',
    specs: [
      'PAW3395',
      '46g',
      '1000Hz',
      '2.4GHz/Wired',
      '12-mo price: $46.99 - $49.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-30T08:00:00Z'
  },
  {
    id: 'mouse-mchose-g3-v2-pro',
    name: 'Mchose G3 V2 Pro',
    brand: 'Mchose',
    category: 'Mice',
    priceHKD: 359,
    originalPriceHKD: 390,
    rating: 4.5,
    ratingsCount: 1356,
    description: '"Best budget wireless" (PCGamer), "Worthy successor to G305"',
    specs: [
      'PAW3395',
      '59g',
      '1000Hz',
      'Tri-mode',
      '12-mo price: $39.99 - $49.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-03-31T08:00:00Z'
  },
  {
    id: 'mouse-glorious-model-o-eternal',
    name: 'Glorious Model O Eternal',
    brand: 'Glorious',
    category: 'Mice',
    priceHKD: 312,
    originalPriceHKD: 312,
    rating: 4.0,
    ratingsCount: 1260,
    description: '"Best budget wired" (PCGamer), "Lightweight, comfortable frame"',
    specs: [
      'PAW3311',
      '55g',
      '1000Hz',
      'Wired',
      '12-mo price: $39.99 (New Release)'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-01T08:00:00Z'
  },
  {
    id: 'mouse-redragon-m686-vampire-elite',
    name: 'Redragon M686 Vampire Elite',
    brand: 'Redragon',
    category: 'Mice',
    priceHKD: 351,
    originalPriceHKD: 390,
    rating: 4.0,
    ratingsCount: 1200,
    description: '"Best budget wireless" (Tom\'s Hardware), "Heavy but cheap"',
    specs: [
      'PMW3335',
      '120g',
      '1000Hz',
      '2.4GHz/Wired',
      '12-mo price: $39.99 - $49.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-02T08:00:00Z'
  },
  {
    id: 'mouse-razer-naga-v2-pro',
    name: 'Razer Naga V2 Pro',
    brand: 'Razer',
    category: 'Mice',
    priceHKD: 1404,
    originalPriceHKD: 1404,
    rating: 4.5,
    ratingsCount: 1344,
    description: '"Best MMO Mouse" (Tom\'s Hardware), "Swappable side panels are unmatched"',
    specs: [
      'Focus Pro 30K',
      '134g',
      '1000Hz',
      'Tri-mode',
      '12-mo price: $159.99 - $179.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-03T08:00:00Z'
  },
  {
    id: 'mouse-razer-cobra-pro',
    name: 'Razer Cobra Pro',
    brand: 'Razer',
    category: 'Mice',
    priceHKD: 1014,
    originalPriceHKD: 1014,
    rating: 4.0,
    ratingsCount: 1320,
    description: '"Best compact" (Tom\'s Hardware), "Viper Mini replacement but heavier and pricey"',
    specs: [
      'Focus Pro 30K',
      '77g',
      '4000Hz',
      'Tri-mode',
      '12-mo price: $119.99 - $129.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-04T08:00:00Z'
  },
  {
    id: 'mouse-wlmouse-sword-x',
    name: 'WLMouse Sword X',
    brand: 'WLMouse',
    category: 'Mice',
    priceHKD: 1084,
    originalPriceHKD: 1084,
    rating: 4.5,
    ratingsCount: 1380,
    description: 'B-Tier (boardzy), "Premium alloy build" (Optimum), "Slightly controversial shape"',
    specs: [
      'PAW3395',
      '47g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $139.00 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-05T08:00:00Z'
  },
  {
    id: 'mouse-atk-f1-extreme',
    name: 'ATK F1 Extreme',
    brand: 'ATK',
    category: 'Mice',
    priceHKD: 585,
    originalPriceHKD: 616,
    rating: 4.5,
    ratingsCount: 1416,
    description: 'S-Tier (boardzy), "Insane value for top tier specs", "Viper Mini shape perfected"',
    specs: [
      'PAW3950',
      '38g',
      '8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $69.00 - $79.00'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-06T08:00:00Z'
  },
  {
    id: 'mouse-g-wolves-hati-s-ultra',
    name: 'G-Wolves Hati S Ultra',
    brand: 'G-Wolves',
    category: 'Mice',
    priceHKD: 1084,
    originalPriceHKD: 1162,
    rating: 4.5,
    ratingsCount: 1404,
    description: 'S-Tier (boardzy), "Fingertip endgame for many", "Software still clunky"',
    specs: [
      'PAW3395',
      '48g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $129.00 - $149.00'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-07T08:00:00Z'
  },
  {
    id: 'mouse-roccat-kone-xp-air',
    name: 'Roccat Kone XP Air',
    brand: 'Roccat',
    category: 'Mice',
    priceHKD: 1014,
    originalPriceHKD: 1326,
    rating: 4.0,
    ratingsCount: 1296,
    description: '"Best for Comfort" (Addictive Tips), "Great dock and RGB, heavy for competitive"',
    specs: [
      'Owl-Eye 19K',
      '99g',
      '1000Hz',
      'Tri-mode',
      '12-mo price: $99.99 - $169.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-08T08:00:00Z'
  },
  {
    id: 'mouse-steelseries-aerox-5-wireless',
    name: 'SteelSeries Aerox 5 Wireless',
    brand: 'SteelSeries',
    category: 'Mice',
    priceHKD: 1092,
    originalPriceHKD: 1092,
    rating: 4.0,
    ratingsCount: 1272,
    description: '"Best RGB Gaming Mouse" (Addictive Tips), "Good shape, switches could be better"',
    specs: [
      'TrueMove Air',
      '74g',
      '1000Hz',
      'Tri-mode',
      '12-mo price: $99.99 - $139.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-09T08:00:00Z'
  },
  {
    id: 'mouse-fantech-helios-2-pro-s',
    name: 'Fantech Helios 2 Pro S',
    brand: 'Fantech',
    category: 'Mice',
    priceHKD: 702,
    originalPriceHKD: 702,
    rating: 4.5,
    ratingsCount: 1380,
    description: 'A-Tier (boardzy), "Great S2 clone, excellent opticals", "Sleeper hit"',
    specs: [
      'PAW3395',
      '55g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $79.99 - $89.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-10T08:00:00Z'
  },
  {
    id: 'mouse-hyperx-pulsefire-haste-2',
    name: 'HyperX Pulsefire Haste 2',
    brand: 'HyperX',
    category: 'Mice',
    priceHKD: 390,
    originalPriceHKD: 468,
    rating: 4.0,
    ratingsCount: 1320,
    description: '"Excellent budget wired" (PCMag), "Great value, flat shape"',
    specs: [
      'Custom 26K',
      '53g',
      '8000Hz',
      'Wired',
      '12-mo price: $39.99 - $59.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-11T08:00:00Z'
  },
  {
    id: 'mouse-8bitdo-retro-r8',
    name: '8BitDo Retro R8',
    brand: '8BitDo',
    category: 'Mice',
    priceHKD: 390,
    originalPriceHKD: 390,
    rating: 4.0,
    ratingsCount: 1260,
    description: '"Nostalgic shape, surprisingly good tech" (PCMag), "Fun but not competitive"',
    specs: [
      'PAW3395',
      '76.5g',
      '1000Hz',
      'Tri-mode',
      '12-mo price: $49.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-12T08:00:00Z'
  },
  {
    id: 'mouse-turtle-beach-kone-ii',
    name: 'Turtle Beach Kone II',
    brand: 'Turtle Beach',
    category: 'Mice',
    priceHKD: 546,
    originalPriceHKD: 546,
    rating: 4.0,
    ratingsCount: 1272,
    description: '"Comfortable mid-range mouse" (PCMag), "Hefty but feature-rich"',
    specs: [
      'Owl-Eye 26K',
      '89g',
      '1000Hz',
      'Wired',
      '12-mo price: $69.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-13T08:00:00Z'
  },
  {
    id: 'mouse-zowie-s2-dw',
    name: 'Zowie S2 DW',
    brand: 'Zowie',
    category: 'Mice',
    priceHKD: 1014,
    originalPriceHKD: 1014,
    rating: 4.5,
    ratingsCount: 1416,
    description: 'S-Tier (boardzy), "The legendary shape finally wireless", "Heavy compared to modern mice but perfect balance"',
    specs: [
      'PAW3395',
      '65g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $129.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-14T08:00:00Z'
  },
  {
    id: 'mouse-logitech-g203-lightsync',
    name: 'Logitech G203 Lightsync',
    brand: 'Logitech',
    category: 'Mice',
    priceHKD: 234,
    originalPriceHKD: 312,
    rating: 4.0,
    ratingsCount: 1284,
    description: '"Best Budget Alternative" (Addictive Tips), "Classic egg shape, wire is stiff"',
    specs: [
      'Mercury',
      '85g',
      '1000Hz',
      'Wired',
      '12-mo price: $19.99 - $39.99'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-15T08:00:00Z'
  },
  {
    id: 'mouse-asus-rog-harpe-ace-extreme',
    name: 'Asus ROG Harpe Ace Extreme',
    brand: 'Asus ROG',
    category: 'Mice',
    priceHKD: 1950,
    originalPriceHKD: 1950,
    rating: 4.5,
    ratingsCount: 1380,
    description: 'B-Tier (boardzy), "Carbon-fiber ultra-light, extremely expensive" (Tom\'s), "Niche luxury"',
    specs: [
      'AimPoint Pro 42K',
      '47g',
      '8000Hz',
      'Tri-mode',
      '12-mo price: $249.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-16T08:00:00Z'
  },
  {
    id: 'mouse-xtrfy-m64-pro',
    name: 'Xtrfy M64 Pro',
    brand: 'Xtrfy',
    category: 'Mice',
    priceHKD: 928,
    originalPriceHKD: 928,
    rating: 4.5,
    ratingsCount: 1356,
    description: 'B-Tier (boardzy), "Unique ergo approach", "Front-heavy feeling"',
    specs: [
      'PAW3395',
      '55g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $119.00 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-17T08:00:00Z'
  },
  {
    id: 'mouse-zowie-za13-dw',
    name: 'Zowie ZA13 DW',
    brand: 'Zowie',
    category: 'Mice',
    priceHKD: 1014,
    originalPriceHKD: 1014,
    rating: 4.5,
    ratingsCount: 1404,
    description: 'A-Tier (boardzy), "Unmatched high rear hump", "Claw grip paradise"',
    specs: [
      'PAW3395',
      '65g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $129.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-18T08:00:00Z'
  },
  {
    id: 'mouse-pulsar-crazylight-x2',
    name: 'Pulsar Crazylight X2',
    brand: 'Pulsar',
    category: 'Mice',
    priceHKD: 936,
    originalPriceHKD: 936,
    rating: 4.5,
    ratingsCount: 1428,
    description: 'S-Tier (boardzy), "Pulsar\'s best coating and weight reduction", "Premium feel"',
    specs: [
      'PAW3395',
      '48g',
      '4000Hz',
      '2.4GHz/Wired',
      '12-mo price: $119.95 (New Release)'
    ],
    images: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-19T08:00:00Z'
  },
  {
    id: 'mouse-hitscan-hyperlight',
    name: 'Hitscan Hyperlight',
    brand: 'Hitscan',
    category: 'Mice',
    priceHKD: 858,
    originalPriceHKD: 858,
    rating: 4.5,
    ratingsCount: 1416,
    description: 'S-Tier (boardzy), "Incredible Starlight alternative", "Top tier performance"',
    specs: [
      'PAW3395',
      '39g',
      '8000Hz',
      '2.4GHz/Wired',
      '12-mo price: $109.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-20T08:00:00Z'
  },
  {
    id: 'mouse-waizowl-ogm-pro',
    name: 'Waizowl OGM Pro',
    brand: 'Waizowl',
    category: 'Mice',
    priceHKD: 780,
    originalPriceHKD: 780,
    rating: 4.5,
    ratingsCount: 1380,
    description: 'A-Tier (boardzy), "Incredibly comfortable soft ergo", "Unique coating"',
    specs: [
      'PAW3395',
      '68g',
      '1000Hz',
      'Tri-mode',
      '12-mo price: $99.99 (Stable)'
    ],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-04-21T08:00:00Z'
  },
  {
    id: 'keyboard-neon-tkl',
    name: 'Neon TKL Mechanical Keyboard',
    brand: 'KeyNova',
    category: 'Keyboards',
    priceHKD: 699,
    originalPriceHKD: 899,
    rating: 4.7,
    ratingsCount: 2040,
    description: 'Hot-swappable TKL board with foam dampening and bright PBT caps.',
    specs: ['Hot-swappable', 'PBT caps', 'USB-C', 'RGB per-key'],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK 2000Fun', url: 'https://www.2000fun.com' }
    ],
    createdAt: '2025-10-23T08:00:00Z'
  },
  {
    id: 'keyboard-wave-65',
    name: 'Wave 65 Aluminum Keyboard',
    brand: 'NovaType',
    category: 'Keyboards',
    priceHKD: 1199,
    originalPriceHKD: 1499,
    rating: 4.5,
    ratingsCount: 730,
    description: 'Compact 65% layout with gasket mount for quieter typing.',
    specs: ['Gasket mount', 'Bluetooth 5.1', 'Aluminum frame', 'Rotary knob'],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527434006405-3316ea2b1e74?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Price.com.hk', url: 'https://www.price.com.hk' }
    ],
    createdAt: '2026-02-03T08:00:00Z'
  },
  {
    id: 'headset-pulse-7',
    name: 'Pulse 7 Surround Headset',
    brand: 'SonicEdge',
    category: 'Headsets',
    priceHKD: 459,
    originalPriceHKD: 599,
    rating: 4.3,
    ratingsCount: 1110,
    description: 'Immersive 7.1 surround sound with breathable cushions.',
    specs: ['7.1 surround', 'Detachable mic', 'Multi-platform', 'Memory foam'],
    images: [
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518441988670-0f0f6107a5ed?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Broadway', url: 'https://www.broadwaylifestyle.com' }
    ],
    createdAt: '2026-01-15T08:00:00Z'
  },
  {
    id: 'headset-cloud-lite',
    name: 'Cloud Lite Wireless Headset',
    brand: 'Nimbus',
    category: 'Headsets',
    priceHKD: 899,
    originalPriceHKD: 1099,
    rating: 4.6,
    ratingsCount: 890,
    description: 'Low-latency wireless with 35-hour battery and balanced sound.',
    specs: ['35h battery', 'USB-C', 'Swivel cups', 'Noise cancelling mic'],
    images: [
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527443224154-9a70a7d2c14b?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-02-18T08:00:00Z'
  },
  {
    id: 'monitor-zen-27',
    name: 'Zen 27 165Hz Monitor',
    brand: 'HyperView',
    category: 'Monitors',
    priceHKD: 2199,
    originalPriceHKD: 2699,
    rating: 4.5,
    ratingsCount: 540,
    description: 'Fast IPS panel with 165Hz refresh and crisp 2K resolution.',
    specs: ['27-inch', '165Hz', '1ms response', '2K QHD'],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Price.com.hk', url: 'https://www.price.com.hk' }
    ],
    createdAt: '2025-12-01T08:00:00Z'
  },
  {
    id: 'monitor-arc-24',
    name: 'Arc 24 144Hz Curved Monitor',
    brand: 'ViewArc',
    category: 'Monitors',
    priceHKD: 1599,
    originalPriceHKD: 1999,
    rating: 4.2,
    ratingsCount: 690,
    description: 'Curved 24-inch display with smooth 144Hz refresh.',
    specs: ['24-inch', '144Hz', '1080p', '1500R curve'],
    images: [
      'https://images.unsplash.com/photo-1527443224154-9a70a7d2c14b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487015307662-049f8f0fbc0e?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Broadway', url: 'https://www.broadwaylifestyle.com' }
    ],
    createdAt: '2025-11-19T08:00:00Z'
  },
  {
    id: 'mousepad-glide-xl',
    name: 'Glide XL Mousepad',
    brand: 'Flux',
    category: 'Mousepads',
    priceHKD: 199,
    originalPriceHKD: 259,
    rating: 4.4,
    ratingsCount: 780,
    description: 'Smooth micro-texture surface with stitched edges.',
    specs: ['900x400mm', 'Stitched edges', 'Water resistant'],
    images: [
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Golden', url: 'https://www.goldenshop.com.hk' }
    ],
    createdAt: '2026-01-21T08:00:00Z'
  },
  {
    id: 'mousepad-precision-mini',
    name: 'Precision Mini Mousepad',
    brand: 'Flux',
    category: 'Mousepads',
    priceHKD: 119,
    originalPriceHKD: 169,
    rating: 4.1,
    ratingsCount: 390,
    description: 'Compact pad for smaller desks with balanced glide.',
    specs: ['320x250mm', 'Rubber base', 'Matte texture'],
    images: [
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2025-12-10T08:00:00Z'
  },
  {
    id: 'gpu-eclipse-4060',
    name: 'Eclipse 4060 Graphics Card',
    brand: 'Nightforge',
    category: 'PC Components',
    priceHKD: 2699,
    originalPriceHKD: 3299,
    rating: 4.5,
    ratingsCount: 480,
    description: 'Efficient GPU with quiet cooling for 1080p and 1440p gaming.',
    specs: ['8GB VRAM', 'Dual fan', 'OC ready', 'HDMI 2.1'],
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be8901?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK 2000Fun', url: 'https://www.2000fun.com' }
    ],
    createdAt: '2026-02-11T08:00:00Z'
  },
  {
    id: 'cpu-zen-5x',
    name: 'Zen 5X Budget CPU',
    brand: 'Quartz',
    category: 'PC Components',
    priceHKD: 1499,
    originalPriceHKD: 1899,
    rating: 4.3,
    ratingsCount: 620,
    description: 'Great price-to-performance CPU for streaming and esports.',
    specs: ['6 cores', '12 threads', '4.6GHz boost', '65W'],
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Golden', url: 'https://www.goldenshop.com.hk' }
    ],
    createdAt: '2026-02-22T08:00:00Z'
  },
  {
    id: 'ram-volt-16',
    name: 'Volt 16GB RAM Kit',
    brand: 'Pulse',
    category: 'PC Components',
    priceHKD: 499,
    originalPriceHKD: 649,
    rating: 4.4,
    ratingsCount: 980,
    description: 'Dual-channel DDR4 kit with clean heat spreaders.',
    specs: ['16GB (2x8)', '3200MHz', 'CL16', 'Low profile'],
    images: [
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2025-12-20T08:00:00Z'
  },
  {
    id: 'controller-surge',
    name: 'Surge Wireless Controller',
    brand: 'Orbit',
    category: 'Controllers',
    priceHKD: 329,
    originalPriceHKD: 429,
    rating: 4.2,
    ratingsCount: 520,
    description: 'Comfortable layout with responsive triggers and gyro support.',
    specs: ['Bluetooth', 'Hall triggers', 'Gyro support', '12h battery'],
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Broadway', url: 'https://www.broadwaylifestyle.com' }
    ],
    createdAt: '2026-01-04T08:00:00Z'
  },
  {
    id: 'controller-arcade-mini',
    name: 'Arcade Mini Controller',
    brand: 'Orbit',
    category: 'Controllers',
    priceHKD: 239,
    originalPriceHKD: 299,
    rating: 4.0,
    ratingsCount: 210,
    description: 'Compact wired controller for fighting games and retro play.',
    specs: ['Wired USB', 'Turbo button', 'Compact shell'],
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK 2000Fun', url: 'https://www.2000fun.com' }
    ],
    createdAt: '2025-12-27T08:00:00Z'
  },
  {
    id: 'keyboard-storm-lite',
    name: 'Storm Lite RGB Keyboard',
    brand: 'KeyNova',
    category: 'Keyboards',
    priceHKD: 399,
    originalPriceHKD: 549,
    rating: 4.1,
    ratingsCount: 640,
    description: 'Budget-friendly full-size board with quiet linear switches.',
    specs: ['Full size', 'RGB zones', 'Detachable cable', 'ABS caps'],
    images: [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Golden', url: 'https://www.goldenshop.com.hk' }
    ],
    createdAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'headset-echo-lite',
    name: 'Echo Lite Headset',
    brand: 'SonicEdge',
    category: 'Headsets',
    priceHKD: 299,
    originalPriceHKD: 399,
    rating: 4.0,
    ratingsCount: 430,
    description: 'Lightweight headset with crisp chat mic for squad play.',
    specs: ['3.5mm', 'Swivel mic', 'On-ear', 'Lightweight'],
    images: [
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-01-27T08:00:00Z'
  },
  {
    id: 'monitor-luma-32',
    name: 'Luma 32 UltraWide Monitor',
    brand: 'HyperView',
    category: 'Monitors',
    priceHKD: 2999,
    originalPriceHKD: 3499,
    rating: 4.6,
    ratingsCount: 370,
    description: 'UltraWide 32-inch screen for immersive sims and productivity.',
    specs: ['32-inch', '144Hz', '21:9', 'HDR ready'],
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Price.com.hk', url: 'https://www.price.com.hk' }
    ],
    createdAt: '2026-02-12T08:00:00Z'
  },
  {
    id: 'keyboard-pulse-75',
    name: 'Pulse 75 Wireless Keyboard',
    brand: 'NovaType',
    category: 'Keyboards',
    priceHKD: 899,
    originalPriceHKD: 1099,
    rating: 4.5,
    ratingsCount: 810,
    description: '75% layout with tri-mode connectivity and bright LEDs.',
    specs: ['Tri-mode', 'PBT caps', 'Hot-swap', 'Battery 4000mAh'],
    images: [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK 2000Fun', url: 'https://www.2000fun.com' }
    ],
    createdAt: '2026-02-19T08:00:00Z'
  },
  {
    id: 'gpu-spark-3050',
    name: 'Spark 3050 Graphics Card',
    brand: 'Nightforge',
    category: 'PC Components',
    priceHKD: 1699,
    originalPriceHKD: 2099,
    rating: 4.1,
    ratingsCount: 520,
    description: 'Entry GPU for esports and budget builds.',
    specs: ['6GB VRAM', 'Dual fan', 'Low power', 'HDMI 2.0'],
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Golden', url: 'https://www.goldenshop.com.hk' }
    ],
    createdAt: '2026-02-24T08:00:00Z'
  },
  {
    id: 'monitor-sage-24',
    name: 'Sage 24 IPS Monitor',
    brand: 'ViewArc',
    category: 'Monitors',
    priceHKD: 1299,
    originalPriceHKD: 1699,
    rating: 4.2,
    ratingsCount: 440,
    description: 'Accurate color IPS panel for gaming and school work.',
    specs: ['24-inch', '120Hz', 'IPS', 'Adaptive sync'],
    images: [
      'https://images.unsplash.com/photo-1487015307662-049f8f0fbc0e?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Broadway', url: 'https://www.broadwaylifestyle.com' }
    ],
    createdAt: '2026-01-18T08:00:00Z'
  },
  {
    id: 'headset-zenith-air',
    name: 'Zenith Air Wireless Headset',
    brand: 'Nimbus',
    category: 'Headsets',
    priceHKD: 1099,
    originalPriceHKD: 1399,
    rating: 4.7,
    ratingsCount: 520,
    description: 'Noise-cancelling wireless headset for long sessions.',
    specs: ['ANC', '40h battery', 'USB-C', 'Carry case'],
    images: [
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2026-02-20T08:00:00Z'
  },
  {
    id: 'keyboard-lumen-mini',
    name: 'Lumen Mini 60% Keyboard',
    brand: 'KeyNova',
    category: 'Keyboards',
    priceHKD: 549,
    originalPriceHKD: 749,
    rating: 4.3,
    ratingsCount: 510,
    description: 'Compact 60% board with smooth stabilizers and bright RGB.',
    specs: ['60% layout', 'RGB', 'Hot-swap', 'USB-C'],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Golden', url: 'https://www.goldenshop.com.hk' }
    ],
    createdAt: '2026-02-04T08:00:00Z'
  }
]

const products = baseProducts.map((product) => {
  const history = createPriceHistory(product.priceHKD)
  return {
    ...product,
    priceHistory: history,
    trend: computeTrend(history)
  }
})

const reviews = [
  {
    id: 'review-01',
    productId: 'mouse-logitech-g-pro-x2-superstrike',
    creator: 'PixelHunt',
    avatar: 'https://i.pravatar.cc/80?img=12',
    rating: 5,
    createdAt: '2026-03-10T12:00:00Z',
    verified: true,
    text: 'Super light and the clicks feel premium. Tracking is rock solid in aim routines, and the coating stays grippy through long sessions.'
  },
  {
    id: 'review-02',
    productId: 'keyboard-neon-tkl',
    creator: 'LanPartyJay',
    avatar: 'https://i.pravatar.cc/80?img=32',
    rating: 4,
    createdAt: '2026-03-02T09:30:00Z',
    verified: true,
    text: 'Great stock stabilizers for the price. I swapped to tactile switches and the board still feels solid. The RGB is bright but not distracting, and the case foam keeps it from sounding hollow.'
  },
  {
    id: 'review-03',
    productId: 'headset-pulse-7',
    creator: 'SoraStreams',
    avatar: 'https://i.pravatar.cc/80?img=47',
    rating: 3,
    createdAt: '2026-02-28T16:20:00Z',
    verified: false,
    text: 'Sound is decent but the mic picks up my keyboard. Good for the price, but I would invest in a stand-alone mic if you stream often.'
  },
  {
    id: 'review-04',
    productId: 'monitor-zen-27',
    creator: 'FrameChaser',
    avatar: 'https://i.pravatar.cc/80?img=7',
    rating: 5,
    createdAt: '2026-03-04T18:10:00Z',
    verified: true,
    text: 'Smooth motion and perfect size for my tiny desk. Colors are vibrant after quick calibration. The stand is sturdy and the OSD is easy to navigate.'
  },
  {
    id: 'review-05',
    productId: 'mousepad-glide-xl',
    creator: 'AimTheory',
    avatar: 'https://i.pravatar.cc/80?img=18',
    rating: 4,
    createdAt: '2026-02-24T11:15:00Z',
    verified: true,
    text: 'Huge surface, consistent glide. It lays flat right away and the stitched edges are holding up.'
  },
  {
    id: 'review-06',
    productId: 'gpu-eclipse-4060',
    creator: 'BudgetBuilds',
    avatar: 'https://i.pravatar.cc/80?img=52',
    rating: 4,
    createdAt: '2026-03-08T08:45:00Z',
    verified: true,
    text: 'Performance per dollar is solid. Fans stay quiet after undervolt. Works well with 144Hz esports titles.'
  },
  {
    id: 'review-07',
    productId: 'controller-surge',
    creator: 'RetroPulse',
    avatar: 'https://i.pravatar.cc/80?img=22',
    rating: 4,
    createdAt: '2026-03-11T13:40:00Z',
    verified: false,
    text: 'Feels good in hand and the battery lasted a full weekend. Slightly stiff triggers but easy to adjust.'
  },
  {
    id: 'review-08',
    productId: 'keyboard-wave-65',
    creator: 'KeySwitchKai',
    avatar: 'https://i.pravatar.cc/80?img=58',
    rating: 5,
    createdAt: '2026-02-26T17:05:00Z',
    verified: true,
    text: 'This board sounds premium without mods. The knob is perfect for volume and the Bluetooth is stable.'
  },
  {
    id: 'review-09',
    productId: 'headset-cloud-lite',
    creator: 'AudioEdge',
    avatar: 'https://i.pravatar.cc/80?img=9',
    rating: 4,
    createdAt: '2026-03-06T15:25:00Z',
    verified: true,
    text: 'Comfortable for hours. Mic clarity is good and the wireless range is more than my room needs.'
  },
  {
    id: 'review-10',
    productId: 'monitor-arc-24',
    creator: 'DeskSetupHQ',
    avatar: 'https://i.pravatar.cc/80?img=35',
    rating: 3,
    createdAt: '2026-02-18T10:40:00Z',
    verified: false,
    text: 'Curve is nice but colors need some tweaking. Still a good entry option.'
  },
  {
    id: 'review-11',
    productId: 'gpu-spark-3050',
    creator: 'BudgetBuilds',
    avatar: 'https://i.pravatar.cc/80?img=52',
    rating: 4,
    createdAt: '2026-02-20T08:00:00Z',
    verified: true,
    text: 'Great for 1080p on a tight budget. Runs cool and the drivers are stable.'
  },
  {
    id: 'review-12',
    productId: 'ram-volt-16',
    creator: 'TechShift',
    avatar: 'https://i.pravatar.cc/80?img=16',
    rating: 4,
    createdAt: '2026-02-22T08:00:00Z',
    verified: true,
    text: 'Easy XMP setup and stable in my build. No complaints for the price.'
  },
  {
    id: 'review-13',
    productId: 'keyboard-storm-lite',
    creator: 'QuietClicks',
    avatar: 'https://i.pravatar.cc/80?img=26',
    rating: 3,
    createdAt: '2026-03-01T09:15:00Z',
    verified: false,
    text: 'Good starter board but keycaps shine quickly. Still good value.'
  },
  {
    id: 'review-14',
    productId: 'mouse-razer-viper-v4-pro',
    creator: 'AimTheory',
    avatar: 'https://i.pravatar.cc/80?img=18',
    rating: 5,
    createdAt: '2026-03-12T12:00:00Z',
    verified: true,
    text: 'The sensor tracking is locked in and the build quality feels top tier. Best pure performance wireless I have tried.'
  },
  {
    id: 'review-15',
    productId: 'headset-zenith-air',
    creator: 'AudioEdge',
    avatar: 'https://i.pravatar.cc/80?img=9',
    rating: 5,
    createdAt: '2026-03-09T16:10:00Z',
    verified: true,
    text: 'ANC is surprisingly strong for the price. The mic works well for classes and raids.'
  },
  {
    id: 'review-16',
    productId: 'monitor-luma-32',
    creator: 'FrameChaser',
    avatar: 'https://i.pravatar.cc/80?img=7',
    rating: 5,
    createdAt: '2026-03-13T11:10:00Z',
    verified: true,
    text: 'UltraWide is immersive and perfect for racing sims. Good HDR for this tier.'
  },
  {
    id: 'review-17',
    productId: 'controller-arcade-mini',
    creator: 'RetroPulse',
    avatar: 'https://i.pravatar.cc/80?img=22',
    rating: 4,
    createdAt: '2026-02-25T09:30:00Z',
    verified: false,
    text: 'Fun compact option. Buttons are clicky and the size fits my bag.'
  },
  {
    id: 'review-18',
    productId: 'monitor-sage-24',
    creator: 'DeskSetupHQ',
    avatar: 'https://i.pravatar.cc/80?img=35',
    rating: 4,
    createdAt: '2026-03-03T08:00:00Z',
    verified: true,
    text: 'Great IPS panel for the price. Works well for editing and gaming.'
  }
]

const categories = [
  'Mice',
  'Keyboards',
  'Headsets',
  'Monitors',
  'Mousepads',
  'PC Components',
  'Controllers'
]

const hotDeals = products.filter((product) => {
  const discount = ((product.originalPriceHKD - product.priceHKD) / product.originalPriceHKD) * 100
  return discount >= 15
})

export { products, reviews, categories, hotDeals }
