import { Coins } from 'lucide-react'
import { usePreferences } from '../context/PreferencesContext'

const CurrencyToggle = () => {
  const { currency, setCurrency } = usePreferences()

  return (
    <label className="select-field">
      <Coins size={16} aria-hidden="true" />
      <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
        <option value="HKD">HKD</option>
        <option value="USD">USD</option>
      </select>
    </label>
  )
}

export default CurrencyToggle
