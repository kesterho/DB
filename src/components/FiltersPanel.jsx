import { useTranslation } from 'react-i18next'

const FiltersPanel = ({
  categories,
  filters,
  onChange,
  minPrice,
  maxPrice,
  onClear,
  className = ''
}) => {
  const { t } = useTranslation()

  const toggleCategory = (category) => {
    const next = filters.categories.includes(category)
      ? filters.categories.filter((item) => item !== category)
      : [...filters.categories, category]
    onChange({ ...filters, categories: next })
  }

  return (
    <div className={`filters-panel glass ${className}`.trim()}>
      <div className="filters-group">
        <h4>{t('filters.categories')}</h4>
        <div className="filters-list">
          {categories.map((category) => (
            <label key={category} className="checkbox-pill">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-group">
        <h4>{t('filters.priceRange')}</h4>
        <div className="range-fields">
          <input
            type="number"
            min={minPrice}
            max={filters.priceMax}
            value={filters.priceMin}
            onChange={(event) =>
              onChange({ ...filters, priceMin: Number(event.target.value) })
            }
          />
          <input
            type="number"
            min={filters.priceMin}
            max={maxPrice}
            value={filters.priceMax}
            onChange={(event) =>
              onChange({ ...filters, priceMax: Number(event.target.value) })
            }
          />
        </div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={filters.priceMax}
          onChange={(event) =>
            onChange({ ...filters, priceMax: Number(event.target.value) })
          }
        />
      </div>

      <div className="filters-group">
        <h4>{t('filters.rating')}</h4>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={filters.rating}
          onChange={(event) =>
            onChange({ ...filters, rating: Number(event.target.value) })
          }
        />
        <div className="range-caption">{filters.rating}+</div>
      </div>

      <button className="btn secondary" type="button" onClick={onClear}>
        {t('filters.clear')}
      </button>
    </div>
  )
}

export default FiltersPanel
