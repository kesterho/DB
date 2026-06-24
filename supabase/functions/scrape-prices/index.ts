import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

// This is a Supabase Edge Function (written in Deno/TypeScript).
// It runs securely on the backend, so your API keys are safe.

serve(async (req) => {
  try {
    // 1. Initialize Supabase Client to talk to your database
    // These variables are automatically injected by Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Used for bypassing row level security in the backend
    )

    // 2. Get the Firecrawl API key from secret storage
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!firecrawlKey) {
      throw new Error("Missing FIRECRAWL_API_KEY secret");
    }

    // 3. For this example, let's say we receive the product URL from the request
    // (Later, you can change this to query your database for ALL products and loop through them)
    // We expect a JSON payload like: { "url": "https://amazon.com/example", "productId": "123" }
    const { url, productId } = await req.json()

    console.log(`Starting to scrape: ${url}`);

    // 4. Call Firecrawl
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        formats: ['extract'],
        extract: {
          prompt: "Extract the exact product price as a number, and the currency code.",
          schema: {
            type: "object",
            properties: {
              price: { type: "number" },
              currency: { type: "string" }
            },
            required: ["price", "currency"]
          }
        }
      })
    });

    const firecrawlData = await firecrawlResponse.json();

    if (!firecrawlData.success) {
      throw new Error("Firecrawl failed to scrape the page.");
    }

    const { price, currency } = firecrawlData.data.extract;

    // 5. Update the product's price in your Supabase database
    const { error: dbError } = await supabaseClient
      .from('products')    // Assuming your table is named 'products'
      .update({ 
        current_price: price, 
        currency: currency,
        last_checked_at: new Date().toISOString()
      })
      .eq('id', productId);

    if (dbError) throw dbError;

    // 6. Return success!
    return new Response(
      JSON.stringify({ success: true, price, currency }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    )
  }
})
