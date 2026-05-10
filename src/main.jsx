import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import './index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import App from './App.jsx'
import { PreferencesProvider } from './context/PreferencesContext'
import { MarketProvider } from './context/MarketContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <PreferencesProvider>
          <MarketProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MarketProvider>
        </PreferencesProvider>
      </WishlistProvider>
    </AuthProvider>
  </StrictMode>
)
