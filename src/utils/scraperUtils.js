import supabase from '../lib/supabase'

export const scrapePrice = async (productUrl, productId) => {
  if (!supabase) {
    throw new Error('Supabase client is not configured')
  }

  try {
    // Invoke backend scraper so API keys stay server-side.
    const { data, error } = await supabase.functions.invoke('scrape-prices', {
      body: {
        url: productUrl,
        productId
      }
    })

    if (error) {
      throw new Error(`Edge Function error: ${error.message}`)
    }

    return data
  } catch (err) {
    console.error('Failed to trigger scrape-prices function:', err)
    throw err
  }
}
