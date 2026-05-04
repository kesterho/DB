import { useEffect, useMemo, useState } from 'react'
import { Sparkles, Mic, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import useDebouncedValue from '../hooks/useDebouncedValue'
import { useMarket } from '../context/MarketContext'

const SearchBar = ({ initialValue = '', onSubmit, compact = false }) => {
  const { t } = useTranslation()
  const { products } = useMarket()
  const [value, setValue] = useState(initialValue)
  const [listening, setListening] = useState(false)
  const debounced = useDebouncedValue(value, 150)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const suggestions = useMemo(() => {
    const query = debounced.trim().toLowerCase()
    if (!query) return []
    return products
      .filter((product) => product.name.toLowerCase().includes(query))
      .slice(0, 6)
  }, [debounced, products])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!value.trim()) return
    onSubmit?.(value.trim())
  }

  const handleSuggestion = (name) => {
    setValue(name)
    onSubmit?.(name)
  }

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setValue(transcript)
      onSubmit?.(transcript)
    }
    recognition.start()
  }

  return (
    <form className={`search-bar ${compact ? 'compact' : ''}`} onSubmit={handleSubmit}>
      <Sparkles size={18} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t('search.placeholder')}
        aria-label={t('search.placeholder')}
      />
      <div className="search-actions">
        <button
          className={`icon-button ${listening ? 'active' : ''}`}
          type="button"
          onClick={handleVoice}
          aria-label={t('search.voiceSearch')}
        >
          <Mic size={16} />
        </button>
        <button className="icon-button" type="submit" aria-label={t('nav.search')}>
          <Search size={16} />
        </button>
      </div>
      {suggestions.length > 0 ? (
        <div className="search-suggestions">
          {suggestions.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => handleSuggestion(product.name)}
            >
              {product.name}
            </button>
          ))}
        </div>
      ) : null}
    </form>
  )
}

export default SearchBar
