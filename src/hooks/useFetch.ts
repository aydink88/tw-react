import { useEffect, useState } from 'react'
import useIsMounted from './useIsMounted'

export default function useFetch<T = any>(
  fetchOp: (...args: any[]) => Promise<T>,
  initialState: T,
  options: { dependencies?: any[]; fetchArguments?: any[] } = {
    dependencies: [],
    fetchArguments: []
  }
) {
  const isMounted = useIsMounted()
  const [state, setState] = useState<T>(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const deps = options.dependencies || []
  const fetchArgs = options.fetchArguments || []

  useEffect(() => {
    setLoading(true)
    fetchOp(...fetchArgs)
      .then((v) => {
        if (isMounted()) {
          setState(v)
        }
      })
      .catch((e) => {
        setState(initialState)
        setError(e.message)
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { state, loading, error }
}

// example:
// const { state: data, loading } = useFetch(
//   fetchSearchPeople,
//   { people: [] },
//   { dependencies: [searchTerm], fetchArguments: [searchTerm] }
// )
