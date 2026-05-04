const HKD_TO_USD = 7.8

const toUsd = (valueHKD) => valueHKD / HKD_TO_USD

const formatPrice = (valueHKD, currency = 'HKD', locale = 'en') => {
  const value = currency === 'USD' ? toUsd(valueHKD) : valueHKD
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'USD' ? 2 : 0
  }).format(value)
}

const formatNumber = (value, locale = 'en') =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value)

const formatPercent = (value, locale = 'en') =>
  new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 2
  }).format(value / 100)

const formatDate = (value, locale = 'en') =>
  new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value))

export { formatPrice, formatNumber, formatPercent, formatDate, HKD_TO_USD }
