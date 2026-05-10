import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import supabase from '../lib/supabase'
import { useAuth } from './AuthContext'

const WishlistContext = createContext(null)

const makeConfigError = () => new Error('Supabase is not configured yet.')
const makeAuthError = () => new Error('Sign in to use wishlist.')

export const WishlistProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pendingIds, setPendingIds] = useState(() => new Set())

  const setPending = useCallback((productId, isPending) => {
    setPendingIds((prev) => {
      const next = new Set(prev)
      if (isPending) {
        next.add(productId)
      } else {
        next.delete(productId)
      }
      return next
    })
  }, [])

  const fetchWishlist = useCallback(async () => {
    if (authLoading) {
      setLoading(true)
      return
    }

    if (!user) {
      setItems([])
      setError(null)
      setLoading(false)
      return
    }

    if (!supabase) {
      setItems([])
      setError(makeConfigError())
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('wishlists')
      .select('product_id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError)
      setItems([])
      setLoading(false)
      return
    }

    setItems((data || []).map((row) => row.product_id))
    setLoading(false)
  }, [authLoading, user])

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  const itemsSet = useMemo(() => new Set(items), [items])

  const isWishlisted = useCallback((productId) => itemsSet.has(productId), [itemsSet])

  const isPending = useCallback((productId) => pendingIds.has(productId), [pendingIds])

  const addItem = useCallback(
    async (productId) => {
      if (!user) return { error: makeAuthError() }
      if (!supabase) return { error: makeConfigError() }
      if (itemsSet.has(productId)) return { error: null }

      setPending(productId, true)
      const { error: insertError } = await supabase
        .from('wishlists')
        .insert({ user_id: user.id, product_id: productId })

      setPending(productId, false)

      if (insertError && insertError.code !== '23505') {
        setError(insertError)
        return { error: insertError }
      }

      setItems((prev) => [productId, ...prev.filter((id) => id !== productId)])
      return { error: null }
    },
    [itemsSet, setPending, user]
  )

  const removeItem = useCallback(
    async (productId) => {
      if (!user) return { error: makeAuthError() }
      if (!supabase) return { error: makeConfigError() }

      setPending(productId, true)
      const { error: deleteError } = await supabase
        .from('wishlists')
        .delete()
        .match({ user_id: user.id, product_id: productId })

      setPending(productId, false)

      if (deleteError) {
        setError(deleteError)
        return { error: deleteError }
      }

      setItems((prev) => prev.filter((id) => id !== productId))
      return { error: null }
    },
    [setPending, user]
  )

  const toggleWishlist = useCallback(
    async (productId) => {
      if (itemsSet.has(productId)) {
        return removeItem(productId)
      }
      return addItem(productId)
    },
    [addItem, itemsSet, removeItem]
  )

  const value = useMemo(
    () => ({
      items,
      loading,
      error,
      isWishlisted,
      isPending,
      addItem,
      removeItem,
      toggleWishlist,
      refresh: fetchWishlist
    }),
    [items, loading, error, isWishlisted, isPending, addItem, removeItem, toggleWishlist, fetchWishlist]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
