import { useState, useEffect } from 'react'
import { apiGet, mapTrack, type Paginated } from '../lib/api'
import type { ApiTrack, Track } from '../types'

export function useTracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    apiGet<Paginated<ApiTrack>>('/api/v1/catalog/tracks/')
      .then((page) => {
        if (active) setTracks(page.results.map(mapTrack))
      })
      .catch((e: unknown) => {
        if (active)
          setError(e instanceof Error ? e.message : 'Failed to load tracks')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { tracks, loading, error }
}
