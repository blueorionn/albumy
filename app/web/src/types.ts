/**
 * Types mirroring the albumy DRF catalog serializers.
 */

export interface Track {
  id: string
  title: string
  artist: string
  duration: number // seconds
  cover: string
  genre?: string // display name in the mock; the API returns genre ids
}
