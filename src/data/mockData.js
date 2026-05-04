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
    id: 'mouse-aurora-x1',
    name: 'Aurora X1 Lightweight Gaming Mouse',
    brand: 'Vexel',
    category: 'Mice',
    priceHKD: 289,
    originalPriceHKD: 399,
    rating: 4.6,
    ratingsCount: 1420,
    description: 'Ultra-light honeycomb shell with 26K sensor and crisp clicks.',
    specs: ['58g weight', '26K DPI sensor', 'Paracord cable', '6 buttons'],
    images: [
      'https://images.unsplash.com/photo-1611734828917-718c8465f2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Fortress', url: 'https://www.fortress.com.hk' }
    ],
    createdAt: '2025-11-12T08:00:00Z'
  },
  {
    id: 'mouse-ignite-pro',
    name: 'Ignite Pro Wireless Mouse',
    brand: 'Helix',
    category: 'Mice',
    priceHKD: 529,
    originalPriceHKD: 699,
    rating: 4.4,
    ratingsCount: 960,
    description: 'Low-latency wireless mouse with adjustable RGB and grippy sides.',
    specs: ['2.4GHz wireless', '24K DPI', '70-hour battery', 'Charging dock'],
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Golden', url: 'https://www.goldenshop.com.hk' }
    ],
    createdAt: '2026-01-08T08:00:00Z'
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
    id: 'mouse-shadow-mini',
    name: 'Shadow Mini Travel Mouse',
    brand: 'Vexel',
    category: 'Mice',
    priceHKD: 159,
    originalPriceHKD: 219,
    rating: 4.0,
    ratingsCount: 300,
    description: 'Compact mouse for laptop setups and LAN travel.',
    specs: ['Compact', 'Silent clicks', 'Bluetooth', 'Battery saver'],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK Golden', url: 'https://www.goldenshop.com.hk' }
    ],
    createdAt: '2025-12-05T08:00:00Z'
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
    id: 'mouse-vertex-elite',
    name: 'Vertex Elite Esports Mouse',
    brand: 'Helix',
    category: 'Mice',
    priceHKD: 799,
    originalPriceHKD: 999,
    rating: 4.8,
    ratingsCount: 1640,
    description: 'Tournament-ready mouse with elite sensor and balanced weight.',
    specs: ['63g weight', '26K DPI', 'Optical switches', 'PTFE feet'],
    images: [
      'https://images.unsplash.com/photo-1556400764-0b420855b0f0?auto=format&fit=crop&w=900&q=80'
    ],
    buyLinks: [
      { label: 'Amazon US', url: 'https://www.amazon.com' },
      { label: 'HK 2000Fun', url: 'https://www.2000fun.com' }
    ],
    createdAt: '2025-11-30T08:00:00Z'
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
    productId: 'mouse-aurora-x1',
    creator: 'PixelHunt',
    avatar: 'https://i.pravatar.cc/80?img=12',
    rating: 5,
    createdAt: '2026-03-10T12:00:00Z',
    verified: true,
    text: 'Super light and the clicks feel premium. I have been using it for two weeks and tracking aim routines daily. Battery life is great and the cable is flexible enough for quick flicks. The coating has stayed grippy even with long sessions.'
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
    productId: 'mouse-ignite-pro',
    creator: 'AimTheory',
    avatar: 'https://i.pravatar.cc/80?img=18',
    rating: 5,
    createdAt: '2026-03-12T12:00:00Z',
    verified: true,
    text: 'The sensor tracking is solid and I love the dock. Best wireless value I have tried.'
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
