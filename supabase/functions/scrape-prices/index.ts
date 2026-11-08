import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    )
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY")

    if (!firecrawlKey) {
      throw new Error("Missing FIRECRAWL_API_KEY secret")
    }

    const body = await req.json()
    const url = typeof body?.url === "string" ? body.url.trim() : ""
    const productId = typeof body?.productId === "string" ? body.productId.trim() : ""

    if (!url || !productId) {
      throw new Error("url and productId are required")
    }

    const parsedUrl = new URL(url)
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("url must use http or https")
    }

    const firecrawlResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firecrawlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["extract"],
        extract: {
          prompt: "Extract the exact product price as a number, and the currency code.",
          schema: {
            type: "object",
            properties: {
              price: { type: "number" },
              currency: { type: "string" },
            },
            required: ["price", "currency"],
          },
        },
      }),
    })
    const firecrawlData = await firecrawlResponse.json()

    if (!firecrawlResponse.ok || !firecrawlData.success) {
      throw new Error(firecrawlData.error || "Firecrawl failed to scrape the page")
    }

    const { price, currency } = firecrawlData.data?.extract ?? {}
    if (typeof price !== "number" || !Number.isFinite(price) || typeof currency !== "string") {
      throw new Error("Firecrawl returned an invalid price")
    }

    const { error: dbError } = await supabaseClient
      .from("products")
      .update({
        current_price: price,
        currency,
        last_checked_at: new Date().toISOString(),
      })
      .eq("id", productId)

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ success: true, price, currency }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected scraper error"
    return new Response(
      JSON.stringify({ error: message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 },
    )
  }
})
