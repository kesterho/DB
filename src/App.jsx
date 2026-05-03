import { useEffect } from 'react'
import LiquidChrome from './components/LiquidChrome'

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

      <main className="app">
        <section className="hero" id="top">
          <div className="container hero-inner">
            <div className="hero-card glass reveal">
              <p className="eyebrow">AI for Budget Gamers</p>
              <h1>Finder</h1>
              <p className="hero-sub">AI-Powered Deals for Budget Gamers</p>
              <p className="hero-desc">
                Smart AI search finds the best price-to-performance gaming
                products, so you can play more and spend less.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#cta">
                  Try Finder Free
                </a>
                <a className="link-ghost" href="#how">
                  See how it works <span className="arrow">&darr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal" id="problem">
          <div className="container">
            <div className="glass panel">
              <h2>Gaming Gear Shouldn't Cost Everything</h2>
              <div className="pain-grid">
                <div className="pain-item">
                  <div className="icon teal">
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M10 28c0 7 6 12 14 12s14-5 14-12c0-6-5-10-12-10h-4" />
                      <path d="M14 22h10" />
                      <path d="M18 18l-4-4" />
                      <path d="M30 12h6" />
                      <circle cx="36" cy="12" r="3" />
                      <path d="M22 28l4-4" />
                      <path d="M20 32l8-8" />
                    </svg>
                  </div>
                  <p>
                    Big brands charge too much for keyboards, mice, and headsets
                  </p>
                </div>
                <div className="pain-item">
                  <div className="icon teal">
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <circle cx="20" cy="20" r="12" />
                      <path d="M29 29l9 9" />
                      <path d="M20 14v7l5 3" />
                    </svg>
                  </div>
                  <p>Hours of searching still leads to bad deals</p>
                </div>
                <div className="pain-item">
                  <div className="icon teal">
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M14 26h20a8 8 0 0 1 0 16H14a8 8 0 0 1 0-16Z" />
                      <path d="M20 30v4" />
                      <path d="M28 30v4" />
                      <path d="M18 20c2-3 10-3 12 0" />
                      <circle cx="19" cy="16" r="2" />
                      <circle cx="29" cy="16" r="2" />
                    </svg>
                  </div>
                  <p>Many gamers miss out because setups are too expensive</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal" id="how">
          <div className="container">
            <h2>How Finder Saves You Money</h2>
            <div className="steps">
              <article className="glass step-card">
                <span className="step-number">1</span>
                <div className="icon">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <circle cx="21" cy="21" r="10" />
                    <path d="M29 29l10 10" />
                  </svg>
                </div>
                <h3>Search</h3>
                <p>Type what gaming gear you need.</p>
              </article>
              <article className="glass step-card">
                <span className="step-number">2</span>
                <div className="icon">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M24 8c6 0 12 4 14 10-2 6-8 10-14 10S12 24 10 18C12 12 18 8 24 8Z" />
                    <path d="M24 14c3 0 6 2 6 4s-3 4-6 4-6-2-6-4 3-4 6-4Z" />
                    <path d="M14 34l4-4" />
                    <path d="M34 34l-4-4" />
                  </svg>
                </div>
                <h3>Compare</h3>
                <p>AI finds the best price-to-performance match.</p>
              </article>
              <article className="glass step-card">
                <span className="step-number">3</span>
                <div className="icon">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M8 18h32v18a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V18Z" />
                    <path d="M12 18v-2a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v2" />
                    <circle cx="18" cy="30" r="3" />
                    <path d="M26 28h8" />
                    <path d="M26 34h6" />
                  </svg>
                </div>
                <h3>Save</h3>
                <p>Buy at the right time and keep more money.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section reveal" id="features">
          <div className="container">
            <h2>Everything You Need to Shop Smarter</h2>
            <div className="features-grid">
              <article className="glass feature-card">
                <div className="feature-icon blue">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M10 24c5-8 23-8 28 0-5 8-23 8-28 0Z" />
                    <circle cx="24" cy="24" r="4" />
                  </svg>
                </div>
                <h3>AI Smart Search</h3>
                <p>Natural language search finds exactly what you want.</p>
              </article>
              <article className="glass feature-card">
                <div className="feature-icon teal">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M12 16h24v20H12z" />
                    <path d="M16 12h16" />
                    <path d="M18 22h12" />
                    <path d="M18 28h8" />
                  </svg>
                </div>
                <h3>Honest Reviews</h3>
                <p>Real opinions from unsponsored creators, not fake ads.</p>
              </article>
              <article className="glass feature-card">
                <div className="feature-icon green">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M10 32c6-8 12 0 18-8 6-8 10-2 10-2" />
                    <path d="M10 36h28" />
                    <circle cx="36" cy="14" r="4" />
                  </svg>
                </div>
                <h3>Live Price Tracking</h3>
                <p>See market changes and grab deals at the right moment.</p>
              </article>
              <article className="glass feature-card">
                <div className="feature-icon purple">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M14 18a10 10 0 0 1 20 0c0 8-10 14-10 14s-10-6-10-14Z" />
                    <circle cx="24" cy="18" r="4" />
                  </svg>
                </div>
                <h3>Dark &amp; Light Mode</h3>
                <p>Easy on your eyes, day or night.</p>
              </article>
              <article className="glass feature-card">
                <div className="feature-icon orange">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M8 14h32v20H8z" />
                    <path d="M16 14v20" />
                    <path d="M32 14v20" />
                  </svg>
                </div>
                <h3>Multiple Languages</h3>
                <p>Works in English, Chinese, and more.</p>
              </article>
              <article className="glass feature-card">
                <div className="feature-icon pink">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M14 16h20v20H14z" />
                    <path d="M18 20h12" />
                    <path d="M18 26h8" />
                    <path d="M18 32h6" />
                  </svg>
                </div>
                <h3>HK &amp; US Prices</h3>
                <p>Local pricing so you know the real cost.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section reveal" id="audience">
          <div className="container">
            <h2>Made For Gamers Like You</h2>
            <div className="audience-row">
              <article className="glass audience-card">
                <div className="avatar">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <circle cx="24" cy="20" r="8" />
                    <path d="M12 40c2-8 22-8 24 0" />
                    <path d="M18 18h12" />
                  </svg>
                </div>
                <h3>Teens 12-25</h3>
                <p>Gaming gear that fits your allowance.</p>
              </article>
              <article className="glass audience-card">
                <div className="avatar">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <circle cx="18" cy="18" r="6" />
                    <circle cx="32" cy="18" r="6" />
                    <path d="M10 40c1-7 14-7 16 0" />
                    <path d="M22 40c1-7 14-7 16 0" />
                  </svg>
                </div>
                <h3>Families</h3>
                <p>Fun gaming together without money worries.</p>
              </article>
              <article className="glass audience-card">
                <div className="avatar">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <rect x="14" y="12" width="20" height="24" rx="6" />
                    <path d="M18 20h12" />
                    <path d="M18 26h10" />
                  </svg>
                </div>
                <h3>Students</h3>
                <p>Maximum performance on a student budget.</p>
              </article>
              <article className="glass audience-card">
                <div className="avatar">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <circle cx="24" cy="18" r="8" />
                    <path d="M16 36c2-6 14-6 16 0" />
                    <path d="M20 18h8" />
                  </svg>
                </div>
                <h3>New Gamers</h3>
                <p>No confusing jargon, just good recommendations.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="stats" id="stats">
          <div className="container stats-grid">
            <div className="stat">
              <div className="stat-number" data-target="500" data-suffix="+">
                0
              </div>
              <div className="stat-label">Products Tracked</div>
            </div>
            <div className="stat">
              <div className="stat-number" data-target="1" data-suffix="s">
                0
              </div>
              <div className="stat-label">Real-Time Price Updates</div>
            </div>
            <div className="stat">
              <div className="stat-number" data-target="12000" data-suffix="+">
                0
              </div>
              <div className="stat-label">Trusted by Hong Kong Gamers</div>
            </div>
            <div className="stat">
              <div className="stat-number" data-target="99" data-suffix="%">
                0
              </div>
              <div className="stat-label">AI-Powered Recommendations</div>
            </div>
          </div>
        </section>

        <section className="section reveal" id="cta">
          <div className="container">
            <div className="glass cta-card">
              <h2>Ready to Level Up Your Setup?</h2>
              <p className="cta-sub">
                Join budget gamers who find the best deals with AI. No account
                needed - start searching for free.
              </p>
              <a className="btn primary large" href="#top">
                Start Saving Now
              </a>
              <p className="cta-trust">Free to use. No credit card required.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-links">
            <a href="#top">About</a>
            <a href="#features">Features</a>
            <a href="#cta">Contact</a>
            <a href="#top">Privacy</a>
          </div>
          <div className="footer-lang">EN | 中文</div>
          <div className="footer-meta">
            <span>
              (c) 2025 Finder. Helping gamers save money, one search at a time.
            </span>
            <span>Built by Kester Ho | Student Social Impact Project</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
