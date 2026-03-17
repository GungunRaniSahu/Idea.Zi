import { useState, useEffect } from 'react'
import api from '../utils/api'

function useIdeas(filters) {
  const [ideas, setIdeas]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true)
        setError(null)

        // Build query string from filters
        // e.g. { difficulty: 'Beginner', category: 'Web' }
        // becomes → ?difficulty=Beginner&category=Web
        const params = {}
        if (filters.difficulty) params.difficulty = filters.difficulty
        if (filters.category)   params.category   = filters.category
        if (filters.stack)      params.stack       = filters.stack

        const response = await api.get('/ideas', { params })
        setIdeas(response.data)

      } catch (err) {
        setError('Failed to fetch ideas. Is your server running?')
      } finally {
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [filters.difficulty, filters.category, filters.stack])
  // ↑ Re-runs whenever any filter changes

  return { ideas, loading, error }
}

export default useIdeas