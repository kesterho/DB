import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import supabase from '../lib/supabase'

const AuthContext = createContext(null)

const makeConfigError = () => new Error('Supabase is not configured yet.')

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const hydrateSession = async () => {
      if (!supabase) {
        if (active) {
          setSession(null)
          setLoading(false)
        }
        return
      }

      const { data, error } = await supabase.auth.getSession()
      if (!active) return

      setSession(error ? null : data.session)
      setLoading(false)
    }

    hydrateSession()

    if (!supabase) {
      return () => {
        active = false
      }
    }

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      active = false
      data?.subscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email, password) => {
    if (!supabase) {
      return { data: null, error: makeConfigError() }
    }
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async (email, password) => {
    if (!supabase) {
      return { data: null, error: makeConfigError() }
    }

    const emailRedirectTo =
      typeof window === 'undefined' ? undefined : `${window.location.origin}/auth`

    return supabase.auth.signUp({
      email,
      password,
      options: emailRedirectTo ? { emailRedirectTo } : undefined
    })
  }

  const signOut = async () => {
    if (!supabase) {
      return { error: makeConfigError() }
    }
    return supabase.auth.signOut()
  }

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      signIn,
      signUp,
      signOut
    }),
    [session, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
