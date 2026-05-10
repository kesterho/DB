import { Heart, Home, Search, Tag, Settings, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MobileTabBar = () => {
  const { t } = useTranslation()

  return (
    <nav className="mobile-tab-bar" aria-label="Primary">
      <NavLink to="/">
        <Home size={18} />
        <span>{t('nav.home')}</span>
      </NavLink>
      <NavLink to="/search">
        <Search size={18} />
        <span>{t('nav.search')}</span>
      </NavLink>
      <NavLink to="/deals">
        <Tag size={18} />
        <span>{t('nav.deals')}</span>
      </NavLink>
      <NavLink to="/wishlist">
        <Heart size={18} />
        <span>{t('nav.wishlist')}</span>
      </NavLink>
      <NavLink to="/settings">
        <Settings size={18} />
        <span>{t('nav.settings')}</span>
      </NavLink>
      <NavLink to="/auth">
        <User size={18} />
        <span>{t('nav.account')}</span>
      </NavLink>
    </nav>
  )
}

export default MobileTabBar
