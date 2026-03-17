import { useState } from 'react'
import api from '../utils/api'

function useRandomIdea() {
  const [randomIdea, setRandomIdea] = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)

  const fetchRandom = async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)

      const params = {}
      if (filters.difficulty) params.difficulty = filters.difficulty
      if (filters.category)   params.category   = filters.category

      const response = await api.get('/ideas/random', { params })
      setRandomIdea(response.data)

    } catch (err) {
      setError('Could not fetch a random idea.')
    } finally {
      setLoading(false)
    }
  }

  const clearRandom = () => setRandomIdea(null)

  return { randomIdea, loading, error, fetchRandom, clearRandom }
}

export default useRandomIdea