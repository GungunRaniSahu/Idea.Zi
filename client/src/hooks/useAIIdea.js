import { useState } from 'react'
import api from '../utils/api'

function useAIIdea() {
  const [aiIdea, setAiIdea]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const generateIdea = async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)

      const params = {}
      if (filters.difficulty) params.difficulty = filters.difficulty
      if (filters.category)   params.category   = filters.category
      if (filters.stack)      params.stack       = filters.stack

      const response = await api.get('/ideas/ai', { params })
      setAiIdea(response.data)

    } catch (err) {
      setError('Failed to generate AI idea. Try again!')
    } finally {
      setLoading(false)
    }
  }

  const clearAI = () => setAiIdea(null)

  return { aiIdea, loading, error, generateIdea, clearAI }
}

export default useAIIdea