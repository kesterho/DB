import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LayoutGrid, List } from 'lucide-react'
import { useMarket } from '../context/MarketContext'
import SearchBar from '../components/SearchBar'
import FiltersPanel from '../components/FiltersPanel'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'
import { SkeletonGrid } from '../components/Skeletons'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import useDebouncedValue from '../hooks/useDebouncedValue'
import useAiSearch from '../hooks/useAiSearch'
import { categories as categoryList } from '../data/mockData'

const SearchResultsPage = () => {
  const { t } = useTranslation()
  const { products } = useMarket()
  const [params, setParams] = useSearchParams()
  const queryParam = params.get('q') || ''
  const categoryParam = params.get('category') || ''
  const [query, setQuery] = useState(queryParam)
  const [sort, setSort] = useState('relevance')
  const [view, setView] = useState('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    priceMin: 100,
    priceMax: 3000,
    rating: 0
  })
  const [visibleCount, setVisibleCount] = useState(9)

  const debouncedQuery = useDebouncedValue(query, 250)
  const { status, hints, runAiSearch } = useAiSearch(products)

  useEffect(() => {
    setQuery(queryParam)
  }, [queryParam])

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: categoryParam ? [categoryParam] : []
    }))
  }, [categoryParam])

  useEffect(() => {
    if (debouncedQuery) {
      runAiSearch(debouncedQuery)
    }
  }, [debouncedQuery, runAiSearch])

  const minPrice = useMemo(
    () =>
      products.length
        ? Math.min(...products.map((product) => product.priceHKD))
        : 0,
    [products]
  )
  const maxPrice = useMemo(
    () =>
      products.length
        ? Math.max(...products.map((product) => product.priceHKD))
        : 0,
    [products]
  )

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceMin: minPrice,
      priceMax: maxPrice
    }))
  }, [minPrice, maxPrice])

  const filtered = useMemo(() => {
    let result = [...products]

    if (query) {
      const lower = query.toLowerCase()
      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(lower) ||
          product.brand.toLowerCase().includes(lower) ||
          product.category.toLowerCase().includes(lower)
        )
      })
    }

    if (filters.categories.length) {
      result = result.filter((product) => filters.categories.includes(product.category))
    }

    result = result.filter(
      (product) =>
        product.priceHKD >= filters.priceMin && product.priceHKD <= filters.priceMax
    )

    if (filters.rating > 0) {
      result = result.filter((product) => product.rating >= filters.rating)
    }

    if (sort === 'date') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [products, query, filters, sort])

  useEffect(() => {
    setVisibleCount(9)
  }, [query, filters, sort])

  const visibleProducts = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const sentinelRef = useInfiniteScroll({
    hasMore,
    onLoadMore: () => setVisibleCount((count) => count + 6)
  })

  const handleSearch = (nextQuery) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      if (nextQuery) {
        next.set('q', nextQuery)
      } else {
        next.delete('q')
      }
      return next
    })
  }

  return (
    <main className="page search-page">
      <section className="search-header">
        <div className="container">
          <div className="search-headline">
            <div>
              <h2>{t('search.results')}</h2>
              <p>
                {filtered.length} {t('search.resultsCount')}
              </p>
            </div>
            <div className="view-toggle">
              <button
                className={`icon-button ${view === 'grid' ? 'active' : ''}`}
                type="button"
                onClick={() => setView('grid')}
                aria-label={t('search.gridView')}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`icon-button ${view === 'list' ? 'active' : ''}`}
                type="button"
                onClick={() => setView('list')}
                aria-label={t('search.listView')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          <SearchBar initialValue={query} onSubmit={handleSearch} />

          {status === 'loading' ? (
            <LoadingSpinner label={t('search.loading')} />
          ) : hints.suggestions.length ? (
            <div className="ai-hint">
              <span>{t('search.hint')}</span>
              {hints.corrected && hints.corrected !== query ? (
                <button
                  type="button"
                  onClick={() => handleSearch(hints.corrected)}
                >
                  {t('search.didYouMean')} "{hints.corrected}"?
                </button>
              ) : null}
              <div className="ai-suggestions">
                {hints.suggestions.map((item) => (
                  <button key={item} type="button" onClick={() => handleSearch(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="search-content">
        <div className="container search-grid">
          <button
            className="btn secondary filters-toggle"
            type="button"
            onClick={() => setFiltersOpen((value) => !value)}
          >
            {t('search.filters')}
          </button>
          <FiltersPanel
            categories={categoryList}
            filters={filters}
            onChange={setFilters}
            onClear={() =>
              setFilters({ categories: [], priceMin: minPrice, priceMax: maxPrice, rating: 0 })
            }
            minPrice={minPrice}
            maxPrice={maxPrice}
            className={filtersOpen ? 'open' : ''}
          />

          <div>
            <div className="search-toolbar">
              <label className="select-field">
                <span>{t('search.sort')}</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="relevance">{t('search.sortRelevance')}</option>
                  <option value="date">{t('search.sortDate')}</option>
                  <option value="rating">{t('search.sortRating')}</option>
                </select>
              </label>
            </div>

            {products.length === 0 ? (
              <SkeletonGrid count={6} />
            ) : filtered.length === 0 ? (
              <EmptyState
                title={t('search.noResults')}
                description={t('search.placeholder')}
              />
            ) : (
              <div className={`product-grid ${view}`}>
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout={view} />
                ))}
              </div>
            )}

            {hasMore ? (
              <div className="load-more">
                <button
                  className="btn secondary"
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 6)}
                >
                  {t('search.loadMore')}
                </button>
                <span ref={sentinelRef} aria-hidden="true"></span>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}

export default SearchResultsPage
