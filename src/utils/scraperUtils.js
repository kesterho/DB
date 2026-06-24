import supabase from '../lib/supabase';

export const scrapePrice = async (productUrl, productId) => {
  try {
    // We now call your secure Supabase Edge Function instead of Firecrawl directly
    const { data, error } = await supabase.functions.invoke('scrape-prices', {
      body: { 
        url: productUrl,
        productId: productId 
      }
    });

    if (error) {
      throw new Error(`Edge Function error: ${error.message}`);
    }

    // Returns { success: true, price: 19.99, currency: 'USD' }
    return data; 
  } catch (err) {
    console.error('Failed to trigger scrape-prices function:', err);
    throw err;
  }
};
