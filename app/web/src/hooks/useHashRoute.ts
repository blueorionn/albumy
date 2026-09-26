import { useEffect, useState } from 'react'

export type Route =
  { name: 'home' } | { name: 'browse'; genreSlug: string | null }

/**
 * Tiny hash router — no dependency, and it plays nice with plain anchor
 * hrefs. "#/browse" and "#/genres/<slug>" render the browse page
 * (optionally genre-filtered); anything else renders the home dashboard.
 */
export function useHashRoute(): Route {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const path = hash.replace(/^#\/?/, '')

  if (path === 'browse') return { name: 'browse', genreSlug: null }
  if (path.startsWith('genres/')) {
    return { name: 'browse', genreSlug: path.slice('genres/'.length) || null }
  }
  return { name: 'home' }
}
