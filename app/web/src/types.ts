/**
 * Types mirroring the albumy DRF catalog serializers (app/api/catalog).
 * Kept in the API's shape so mock data can later be swapped for real
 * responses without touching component props.
 *
 * Note: the live API currently returns bare FK ids for `artist`/`genres`;
 * the homepage needs display names, so the mock uses strings. When the
 * backend gains nested serializers, update these types to match.
 */

export interface Track {
  id: string
  title: string
  artist: string
  duration: number // seconds
  cover: string // CDN URL once the storage pipeline exists, empty otherwise
  genre?: string // display name in the mock; the API returns genre ids
}
