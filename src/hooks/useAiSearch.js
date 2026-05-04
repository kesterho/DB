import { useCallback, useState } from 'react'
import { fetchAiHints } from '../utils/aiSearch'

const useAiSearch = (products) => {
  const [status, setStatus] = useState('idle')
  const [hints, setHints] = useState({ corrected: '', suggestions: [] })

  const runAiSearch = useCallback(
    async (query) => {
      if (!query) return
      setStatus('loading')
      try {
        const result = await fetchAiHints(query, products)
        setHints(result)
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    },
    [products]
  )

  return { status, hints, runAiSearch }
}

export default useAiSearch
