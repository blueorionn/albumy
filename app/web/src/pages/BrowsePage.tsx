import { slugify } from '../lib/format'
import { cx } from '../lib/cx'
import { chip, eyebrow, sectionHeading, sectionTitle } from '../lib/ui'
import { useTracks } from '../hooks/useTracks'
import type { Track } from '../types'
import TrackList from '../components/TrackList'

interface BrowsePageProps {
  /** Active genre slug from the route, or null for all tracks. */
  genreSlug: string | null
  onPlay: (track: Track) => void
}

/** Browse page: genre chips above a numbered list of every track. */
export default function BrowsePage({ genreSlug, onPlay }: BrowsePageProps) {
  const { tracks, loading, error } = useTracks()

  const genres = [
    ...new Set(
      tracks
        .map((track) => track.genre)
        .filter((genre): genre is string => Boolean(genre))
    ),
  ].sort((a, b) => a.localeCompare(b))

  const activeGenre =
    genres.find((genre) => slugify(genre) === genreSlug) ?? null
  const visible = activeGenre
    ? tracks.filter((track) => track.genre === activeGenre)
    : tracks

  return (
    <section className='mb-11.25'>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Discover</p>
          <h2 className={sectionTitle}>Browse</h2>
        </div>
      </div>

      <div className='mt-0.5 mb-6 flex flex-wrap gap-2'>
        <a
          className={cx(
            chip,
            activeGenre === null
              ? 'border-accent bg-accent text-accent-ink hover:bg-accent-hover'
              : 'border-line text-muted hover:bg-[#1b1e1b]'
          )}
          href='#/browse'
        >
          All
        </a>
        {genres.map((genre) => (
          <a
            key={genre}
            className={cx(
              chip,
              genre === activeGenre
                ? 'border-accent bg-accent text-accent-ink hover:bg-accent-hover'
                : 'border-line text-muted hover:bg-[#1b1e1b]'
            )}
            href={`#/genres/${slugify(genre)}`}
          >
            {genre}
          </a>
        ))}
      </div>

      {loading ? (
        <p className='text-muted-2 text-sm'>Loading tracks…</p>
      ) : error ? (
        <p className='text-sm text-[#e0685b]'>{error}</p>
      ) : visible.length === 0 ? (
        <p className='text-muted-2 text-sm'>
          No tracks here yet{activeGenre ? ` for ${activeGenre}` : ''}.
        </p>
      ) : (
        <TrackList tracks={visible} onPlay={onPlay} />
      )}
    </section>
  )
}
