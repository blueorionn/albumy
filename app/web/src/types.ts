/**
 * Types mirroring the albumy DRF catalog serializers.
 */

export interface ApiArtistSummary {
  id: string
  name: string
  slug: string
  avatar: string
  avatar_url: string | null
}

export interface ApiGenre {
  id: string
  name: string
  slug: string
}

export interface ApiLicenseSummary {
  id: string
  name: string
  requires_attribution: boolean
  url: string | null
}

export interface ApiTrack {
  id: string
  title: string
  slug: string
  artist: ApiArtistSummary
  genres: ApiGenre[]
  license: ApiLicenseSummary
  cover: string
  cover_url: string | null
  audio_url: string | null
  duration_seconds: number
  play_count: number
}

export interface Track {
  id: string
  title: string
  artist: string
  artistAvatar?: string // CDN URL; empty → generated fallback
  audioUrl: string | null
  duration: number // seconds
  cover: string // CDN URL; empty → generated poster
  genre?: string // primary genre display name
}
