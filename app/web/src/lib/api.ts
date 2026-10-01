/**
 * API client. The backend origin comes from VITE_API_URL
 */

import type { ApiTrack, Track } from '../types'

export const API_BASE = import.meta.env.VITE_API_URL ?? ''
export const DEFAULT_TRACK_COVER =
  import.meta.env.VITE_DEFAULT_TRACK_COVER ?? ''
export const DEFAULT_ARTIST_AVATAR =
  import.meta.env.VITE_DEFAULT_ARTIST_AVATAR ?? ''

export function mapTrack(api: ApiTrack): Track {
  // The backend substitutes its own default image when the admin hasn't
  // uploaded one — detect it by storage key and let Cover show the
  // generated poster instead.
  return {
    id: api.id,
    title: api.title,
    artist: api.artist.name,
    artistAvatar:
      api.artist.avatar === DEFAULT_ARTIST_AVATAR
        ? ''
        : (api.artist.avatar_url ?? ''),
    duration: api.duration_seconds,
    cover: api.cover === DEFAULT_TRACK_COVER ? '' : (api.cover_url ?? ''),
    genre: api.genres[0]?.name,
  }
}

/** Shape returned by DRF's PageNumberPagination. */
export interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`)
  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    )
  }
  return (await response.json()) as T
}
