import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const revealItems = document.querySelectorAll('.landing .reveal')
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

  const handleAccess = () => {
    navigate('/search')
  }

  return (
    <main className="app landing">
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy hero-animate">
            <p className="eyebrow">Active Market Tracking</p>
            <h1>Built for you.</h1>
            <p className="hero-sub">Do what nobody else does.</p>
            <p className="hero-desc">
              Active market tracking for teams that move before the crowd. Capture signal,
              cut noise, and keep a clean view of every move in one place.
            </p>
            <div className="hero-actions">
              <button className="btn primary" type="button" onClick={handleAccess}>
                Give me access
              </button>
              <a className="link-ghost" href="#demo">
                Watch demo
              </a>
            </div>
            <div className="hero-tags">
              <span className="tag">Private beta</span>
              <span className="tag">24/7 signal</span>
              <span className="tag">Team ready</span>
            </div>
          </div>

          <div className="hero-panel reveal">
            <div className="panel-header">
              <span className="panel-label">Live board</span>
              <span className="panel-status">Syncing</span>
            </div>
            <div className="panel-metrics">
              <div className="metric">
                <span>Coverage</span>
                <strong>122 markets</strong>
              </div>
              <div className="metric">
                <span>Latency</span>
                <strong>1.2s average</strong>
              </div>
              <div className="metric">
                <span>Alerts</span>
                <strong>Precision tier</strong>
              </div>
            </div>
            <div className="signal-strip" aria-hidden="true">
              <span className="signal-bar low"></span>
              <span className="signal-bar mid"></span>
              <span className="signal-bar tall"></span>
              <span className="signal-bar mid"></span>
              <span className="signal-bar low"></span>
              <span className="signal-bar tall"></span>
              <span className="signal-bar mid"></span>
              <span className="signal-bar low"></span>
              <span className="signal-bar mid"></span>
              <span className="signal-bar tall"></span>
              <span className="signal-bar low"></span>
              <span className="signal-bar mid"></span>
            </div>
            <div className="panel-footer">
              <span>Last sync 04:26 UTC</span>
              <span className="dot" aria-hidden="true"></span>
              <span>Confidence 96%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="section-title reveal">
            <p className="eyebrow">Feature set</p>
            <h2>Signal before noise</h2>
            <p className="section-lede">
              Active market tracking built for quiet focus, fast reactions, and clean handoffs.
            </p>
          </div>
          <div className="features-grid">
            <article className="feature-card reveal">
              <span className="feature-index">01</span>
              <h3>AI smart search</h3>
              <p>Find the right product fast with natural-language search and guided hints.</p>
            </article>
            <article className="feature-card reveal">
              <span className="feature-index">02</span>
              <h3>Deals radar</h3>
              <p>Surface trending offers and hot drops with curated deal carousels.</p>
            </article>
            <article className="feature-card reveal">
              <span className="feature-index">03</span>
              <h3>Price alerts</h3>
              <p>Set target prices and get notified the moment a match hits your range.</p>
            </article>
            <article className="feature-card reveal">
              <span className="feature-index">04</span>
              <h3>Price history charts</h3>
              <p>Track the full pricing curve with clean charts and tooltips.</p>
            </article>
            <article className="feature-card reveal">
              <span className="feature-index">05</span>
              <h3>Verified reviews</h3>
              <p>Read trusted creator feedback, ratings, and highlights in one place.</p>
            </article>
            <article className="feature-card reveal">
              <span className="feature-index">06</span>
              <h3>Multi-language + currency</h3>
              <p>Switch languages and currencies instantly without losing context.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section demo" id="demo">
        <div className="container demo-grid">
          <div className="demo-copy reveal">
            <p className="eyebrow">Demo</p>
            <h2>See the desk in motion</h2>
            <p className="section-lede">
              A single workspace for signal, narrative, and action. Designed to feel calm under
              pressure.
            </p>
            <div className="hero-actions">
              <button className="btn primary" type="button" onClick={handleAccess}>
                Give me access
              </button>
              <a className="link-ghost" href="#faq">
                Read the FAQ
              </a>
            </div>
          </div>
          <div className="demo-media reveal">
            <div className="video-frame">
              <div className="video-overlay">
                <button className="play-button" type="button" aria-label="Play demo">
                  Play
                </button>
              </div>
              <p className="video-caption">Demo video placeholder</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-title reveal">
            <p className="eyebrow">FAQ</p>
            <h2>Clear answers, no noise</h2>
          </div>
          <div className="faq-list">
            <details className="faq-item reveal">
              <summary>What markets do you track today?</summary>
              <p>We cover major equities, macro signals, and sector moves. Coverage expands by request.</p>
            </details>
            <details className="faq-item reveal">
              <summary>Is it real time?</summary>
              <p>Signals update in seconds with prioritization tuned to your watchlists.</p>
            </details>
            <details className="faq-item reveal">
              <summary>Can I invite my team?</summary>
              <p>Yes. Invite collaborators, share briefs, and assign watchlists in minutes.</p>
            </details>
            <details className="faq-item reveal">
              <summary>When will access open?</summary>
              <p>We open limited seats monthly. Request access and we will follow up with timing.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="section finale" id="cta">
        <div className="container">
          <div className="cta-card reveal">
            <p className="eyebrow">Access</p>
            <h2>Be first when the gate opens.</h2>
            <p className="cta-sub">
              Limited seats each month for teams that want calm, fast market tracking.
            </p>
            <button className="btn primary large" type="button" onClick={handleAccess}>
              Give me access
            </button>
            <p className="cta-trust">No spam. Just the invite.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
