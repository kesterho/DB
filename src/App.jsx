import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LiquidChrome from './components/LiquidChrome'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileTabBar from './components/MobileTabBar'
import OfflineBanner from './components/OfflineBanner'
import ScrollToTop from './components/ScrollToTop'
import LoadingSpinner from './components/LoadingSpinner'
import useOffline from './hooks/useOffline'

const HomePage = lazy(() => import('./pages/HomePage'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const DealsPage = lazy(() => import('./pages/DealsPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const animateCount = (element) => {
  const targetValue = Number(element.dataset.target || 0)
  const suffix = element.dataset.suffix || ''
  const duration = 1200
  const formatter = new Intl.NumberFormat()
  const startTime = performance.now()

  const step = (timestamp) => {
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const currentValue = Math.round(progress * targetValue)
    element.textContent = `${formatter.format(currentValue)}${suffix}`
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

function App() {
  const { t } = useTranslation()
  const isOffline = useOffline()

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    if (!revealItems.length) return undefined

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observerInstance.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stats = document.querySelectorAll('.stat-number')
    if (!stats.length) return undefined

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target)
            observerInstance.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    stats.forEach((stat) => {
      stat.textContent = '0'
      observer.observe(stat)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="liquid-chrome-layer" aria-hidden="true">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.2}
          amplitude={0.3}
          frequencyX={3}
          frequencyY={3}
          interactive
        />
      </div>
      <div className="ambient-glow" aria-hidden="true"></div>

      <div className="app-shell">
        <Header />
        <OfflineBanner isOffline={isOffline} />
        <ScrollToTop />

        <Suspense fallback={<LoadingSpinner label={t('states.loading')} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <Footer />
        <MobileTabBar />
      </div>
    </>
  )
}

export default App
