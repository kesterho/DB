const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const buildFallback = (query, products) => {
  const lower = query.toLowerCase()
  const matches = products
    .filter((product) => product.name.toLowerCase().includes(lower))
    .slice(0, 6)
    .map((product) => product.name)

  return {
    corrected: query,
    suggestions: matches
  }
}

const fetchAiHints = async (query, products) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'minimax/minimax-m2.5:free'

  if (!apiKey) {
    return buildFallback(query, products)
  }

  const shortlist = products.slice(0, 18).map((product) => {
    return `${product.name} (${product.category}, HK$${product.priceHKD})`
  })

  const prompt = `User query: "${query}"\nProducts: ${shortlist.join(' | ')}\n\nReturn JSON only with keys: corrected, suggestions. corrected is a fixed query if needed. suggestions is an array of 3-6 product names from the list that best match the query.`

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Title': 'Finder App'
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are an assistant that returns JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 200
    })
  })

  if (!response.ok) {
    return buildFallback(query, products)
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content
  if (!content) {
    return buildFallback(query, products)
  }

  try {
    const parsed = JSON.parse(content)
    return {
      corrected: parsed.corrected || query,
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : []
    }
  } catch (error) {
    return buildFallback(query, products)
  }
}

export { fetchAiHints }
