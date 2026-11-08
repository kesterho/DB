# Finder

AI-powered product finder for budget gamers. Finder helps players in Hong Kong and the US find value peripherals and hardware with live pricing signals, verified reviews, and multilingual support.

## Features

- AI-assisted search suggestions and smart hints
- Hot deals carousel, trending products, and live market changes
- Product detail pages with image carousel, price history charts, and reviews
- Dark/light mode with persisted preferences
- Multi-language UI (English, Traditional Chinese, Simplified Chinese, Spanish, French)
- HKD and USD pricing conversion

## Tech stack

- React + Vite
- React Router v6
- Recharts for charts
- Swiper for carousels
- react-i18next for localization
- Supabase for price alert storage

## Getting started

1. Install dependencies

```
npm install
```

2. Create a local env file

```
.env
```

Required variables:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_OPENROUTER_API_KEY
- VITE_OPENROUTER_MODEL (set to minimax/minimax-m2.5:free)

For the scraper Edge Function, configure the server-side secret separately:

```
supabase secrets set FIRECRAWL_API_KEY=your-key
```

3. Run the dev server

```
npm run dev
```

## Supabase table

Apply the checked-in migration with `supabase db push`. It creates the
`products`, `price_alerts`, and `wishlists` tables and their basic RLS policies.
If these tables are missing, the related features will show errors.

## Scripts

- npm run dev
- npm run build
- npm run preview

## Project structure

- src/data/mockData.js - mock products, reviews, and price history
- src/pages - Home, Search, Deals, Product Detail, Settings
- src/components - shared UI components
- src/i18n - translation files
