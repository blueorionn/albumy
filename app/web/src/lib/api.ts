/**
 * API client. The backend origin comes from VITE_API_URL
 */

export const API_BASE = import.meta.env.VITE_API_URL ?? ''

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
