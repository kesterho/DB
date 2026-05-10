import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

const AuthPage = () => {
  const { t } = useTranslation()
  const { user, loading, signIn, signUp, signOut } = useAuth()
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const isRegister = mode === 'register'

  const resetStatus = () => {
    if (status !== 'idle' || message) {
      setStatus('idle')
      setMessage('')
    }
  }

  const formatError = (error) => {
    if (!error) return t('states.error')
    if (error.message === 'Supabase is not configured yet.') {
      return t('auth.errorConfig')
    }
    return error.message
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      setStatus('error')
      setMessage(t('auth.errorMissing'))
      return
    }

    if (isRegister) {
      if (!username.trim()) {
        setStatus('error')
        setMessage(t('auth.errorUsername'))
        return
      }

      if (password.length < 6) {
        setStatus('error')
        setMessage(t('auth.errorShortPassword'))
        return
      }

      if (password !== confirm) {
        setStatus('error')
        setMessage(t('auth.errorMismatch'))
        return
      }
    }

    setStatus('loading')
    setMessage('')

    const result = isRegister
      ? await signUp(email, password, username.trim())
      : await signIn(email, password)

    if (result?.error) {
      setStatus('error')
      setMessage(formatError(result.error))
      return
    }

    if (isRegister && !result?.data?.session) {
      setStatus('success')
      setMessage(t('auth.checkEmail'))
      return
    }

    setStatus('success')
    setMessage(isRegister ? t('auth.successRegister') : t('auth.successLogin'))
  }

  const handleSignOut = async () => {
    setStatus('loading')
    setMessage('')

    const result = await signOut()
    if (result?.error) {
      setStatus('error')
      setMessage(formatError(result.error))
      return
    }

    setStatus('success')
    setMessage(t('auth.statusSignedOut'))
  }

  const toggleMode = () => {
    setMode((current) => (current === 'login' ? 'register' : 'login'))
    setUsername('')
    setConfirm('')
    resetStatus()
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>{t('auth.title')}</h2>
              <p className="section-subtitle">{t('auth.subtitle')}</p>
            </div>
          </div>

          <div className="auth-wrapper">
            <div className="auth-card glass">
              {loading ? (
                <LoadingSpinner label={t('states.loading')} />
              ) : user ? (
                <div className="auth-signed-in">
                  <p className="auth-status">
                    {t('auth.statusSignedIn', {
                      email: user.email || t('auth.unknownUser')
                    })}
                  </p>
                  <button
                    className="btn secondary"
                    type="button"
                    onClick={handleSignOut}
                    disabled={status === 'loading'}
                  >
                    {t('auth.signOut')}
                  </button>
                </div>
              ) : (
                <>
                  <div className="auth-tabs" role="tablist">
                    <button
                      className={`auth-tab ${!isRegister ? 'active' : ''}`}
                      type="button"
                      onClick={() => {
                        setMode('login')
                        setUsername('')
                        setConfirm('')
                        resetStatus()
                      }}
                    >
                      {t('auth.loginTitle')}
                    </button>
                    <button
                      className={`auth-tab ${isRegister ? 'active' : ''}`}
                      type="button"
                      onClick={() => {
                        setMode('register')
                        setUsername('')
                        setConfirm('')
                        resetStatus()
                      }}
                    >
                      {t('auth.registerTitle')}
                    </button>
                  </div>

                  <form className="auth-form" onSubmit={handleSubmit}>
                    {isRegister ? (
                      <label>
                        <span>{t('auth.usernameLabel')}</span>
                        <input
                          type="text"
                          value={username}
                          onChange={(event) => {
                            setUsername(event.target.value)
                            resetStatus()
                          }}
                          placeholder={t('auth.usernamePlaceholder')}
                          autoComplete="username"
                          required
                        />
                      </label>
                    ) : null}
                    <label>
                      <span>{t('auth.emailLabel')}</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value)
                          resetStatus()
                        }}
                        placeholder={t('auth.emailPlaceholder')}
                        autoComplete="email"
                        required
                      />
                    </label>

                    <label>
                      <span>{t('auth.passwordLabel')}</span>
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value)
                          resetStatus()
                        }}
                        placeholder={t('auth.passwordPlaceholder')}
                        autoComplete={isRegister ? 'new-password' : 'current-password'}
                        required
                      />
                    </label>

                    {isRegister ? (
                      <label>
                        <span>{t('auth.confirmPasswordLabel')}</span>
                        <input
                          type="password"
                          value={confirm}
                          onChange={(event) => {
                            setConfirm(event.target.value)
                            resetStatus()
                          }}
                          placeholder={t('auth.passwordPlaceholder')}
                          autoComplete="new-password"
                          required
                        />
                      </label>
                    ) : null}

                    <div className="auth-actions">
                      <button
                        className="btn primary"
                        type="submit"
                        disabled={status === 'loading'}
                      >
                        {isRegister ? t('auth.registerAction') : t('auth.loginAction')}
                      </button>
                      <button
                        className="link-ghost auth-switch"
                        type="button"
                        onClick={toggleMode}
                      >
                        {isRegister ? t('auth.switchToLogin') : t('auth.switchToRegister')}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {message ? (
                <div className={`auth-message ${status}`}>{message}</div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AuthPage
