import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import LanguageSelector from './LanguageSelector'
import CurrencyToggle from './CurrencyToggle'

const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  return (
    <header className="top-nav">
      <div className="container nav-inner">
        <NavLink to="/" className="logo">
          <span>{t('app.name')}</span>
          <small>{t('app.tagline')}</small>
        </NavLink>

        <div className="nav-search">
          <SearchBar onSubmit={handleSearch} compact />
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <LanguageSelector />
          <CurrencyToggle />
          <button
            className="icon-button mobile-only"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/search" onClick={() => setOpen(false)}>
          {t('nav.search')}
        </NavLink>
        <NavLink to="/deals" onClick={() => setOpen(false)}>
          {t('nav.deals')}
        </NavLink>
        <NavLink to="/settings" onClick={() => setOpen(false)}>
          {t('nav.settings')}
        </NavLink>
        <div className="nav-search mobile-only">
          <SearchBar onSubmit={handleSearch} />
        </div>
      </nav>
    </header>
  )
}

export default Header
