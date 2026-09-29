import { Play } from 'lucide-react'
import { formatDuration, slugify } from '../lib/format'
import { cx } from '../lib/cx'
import { chip, eyebrow, sectionHeading, sectionTitle } from '../lib/ui'
import { TRACKS } from '../data/catalog'
import type { Track } from '../types'
import Cover from '../components/Cover'

interface BrowsePageProps {
  /** Active genre slug from the route, or null for all tracks. */
  genreSlug: string | null
  onPlay: (track: Track) => void
}

const listGrid =
  'grid grid-cols-[30px_minmax(0,1fr)_140px_56px] items-center gap-3.5 max-sm:grid-cols-[30px_minmax(0,1fr)_56px]'

/** Browse page: genre chips above a numbered list of every track. */
export default function BrowsePage({ genreSlug, onPlay }: BrowsePageProps) {
  const genres = [
    ...new Set(
      TRACKS.map((track) => track.genre).filter((genre): genre is string =>
        Boolean(genre)
      )
    ),
  ].sort((a, b) => a.localeCompare(b))

  const activeGenre =
    genres.find((genre) => slugify(genre) === genreSlug) ?? null
  const visible = activeGenre
    ? TRACKS.filter((track) => track.genre === activeGenre)
    : TRACKS

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

      <div className='flex flex-col gap-0.5'>
        <div
          className={cx(
            listGrid,
            'border-line-soft text-muted-2 border-b px-3 pb-2.5 text-[10px] font-bold tracking-[0.12em] uppercase'
          )}
          aria-hidden='true'
        >
          <span>#</span>
          <span>Title</span>
          <span className='max-sm:hidden'>Genre</span>
          <span>Time</span>
        </div>

        {visible.map((track, index) => (
          <button
            type='button'
            key={track.id}
            className={cx(
              listGrid,
              'group rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#1b1e1b]'
            )}
            onClick={() => onPlay(track)}
          >
            <span className='text-muted-2 flex items-center justify-center text-xs'>
              <span className='group-hover:hidden'>{index + 1}</span>
              <Play
                size={16}
                fill='currentColor'
                className='text-text hidden group-hover:block'
              />
            </span>
            <span className='flex min-w-0 items-center gap-3'>
              <Cover
                cover={track.cover}
                title={track.title}
                artist={track.artist}
                className='size-11 shrink-0 rounded-md'
                compact
              />
              <span className='flex min-w-0 flex-col gap-1'>
                <strong className='truncate text-xs font-bold'>
                  {track.title}
                </strong>
                <span className='text-[11px] text-[#7c847c]'>
                  {track.artist}
                </span>
              </span>
            </span>
            <span className='text-muted-2 text-[11px] max-sm:hidden'>
              {track.genre}
            </span>
            <span className='text-xs text-[#9aa39a]'>
              {formatDuration(track.duration)}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
