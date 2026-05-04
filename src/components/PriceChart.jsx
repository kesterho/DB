import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTranslation } from 'react-i18next'
import { formatDate, formatPrice } from '../utils/formatters'
import { usePreferences } from '../context/PreferencesContext'
import LoadingSpinner from './LoadingSpinner'

const PriceChart = ({ history = [] }) => {
  const { currency, language } = usePreferences()
  const { t } = useTranslation()

  if (!history.length) {
    return <LoadingSpinner label={t('states.loading')} />
  }

  return (
    <div className="price-chart">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={history} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatDate(value, language)}
            hide
          />
          <YAxis
            dataKey="priceHKD"
            tickFormatter={(value) => formatPrice(value, currency, language)}
            width={0}
          />
          <Tooltip
            formatter={(value) => formatPrice(value, currency, language)}
            labelFormatter={(value) => formatDate(value, language)}
          />
          <Line
            type="monotone"
            dataKey="priceHKD"
            stroke="var(--accent-blue)"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart
