import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import supabase from '../lib/supabase'
import { usePreferences } from '../context/PreferencesContext'
import { formatPrice } from '../utils/formatters'

const PriceAlertForm = ({ product }) => {
  const { t } = useTranslation()
  const { currency, language } = usePreferences()
  const [email, setEmail] = useState('')
  const [target, setTarget] = useState(product.priceHKD)
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!supabase) {
      setStatus('error')
      return
    }

    setStatus('loading')
    const { error } = await supabase.from('price_alerts').insert({
      product_id: product.id,
      email: email || null,
      target_price_hkd: target,
      currency,
      created_at: new Date().toISOString()
    })

    if (error) {
      setStatus('error')
      return
    }

    setStatus('success')
  }

  return (
    <form className="price-alert" onSubmit={handleSubmit}>
      <div>
        <h4>{t('product.priceAlertTitle')}</h4>
        <p>{t('product.priceAlertDesc')}</p>
      </div>
      <label>
        {t('product.priceAlertEmail')}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
        />
      </label>
      <label>
        {t('product.priceAlertTarget')}
        <input
          type="number"
          min="0"
          value={target}
          onChange={(event) => setTarget(Number(event.target.value))}
        />
        <span className="hint">
          {formatPrice(target, currency, language)}
        </span>
      </label>
      <button className="btn primary" type="submit" disabled={status === 'loading'}>
        {status === 'success' ? t('product.priceAlertSaved') : t('product.priceAlertSubmit')}
      </button>
      {status === 'error' ? (
        <span className="error-text">{t('states.error')}</span>
      ) : null}
    </form>
  )
}

export default PriceAlertForm
