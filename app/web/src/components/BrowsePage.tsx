import { Play } from 'lucide-react'
import { formatDuration, slugify } from '../lib/format'
import type { Track } from '../types'
import Cover from './Cover'

interface BrowsePageProps {
  tracks: Track[]
  /** Active genre slug from the route, or null for all tracks. */
  genreSlug: string | null
  onPlay: (track: Track) => void
}

/** Browse page: genre chips above a numbered list of every track. */
export default function BrowsePage({
  tracks,
  genreSlug,
  onPlay,
}: BrowsePageProps) {
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
    <section className='section-block'>
      <div className='section-heading'>
        <div>
          <p className='eyebrow'>Discover</p>
          <h2>Browse</h2>
        </div>
      </div>

      <div className='genre-chips'>
        <a
          className={`chip${activeGenre === null ? 'active' : ''}`}
          href='#/browse'
        >
          All
        </a>
        {genres.map((genre) => (
          <a
            key={genre}
            className={`chip${genre === activeGenre ? 'active' : ''}`}
            href={`#/genres/${slugify(genre)}`}
          >
            {genre}
          </a>
        ))}
      </div>

      <div className='track-list'>
        <div className='track-list-head' aria-hidden='true'>
          <span>#</span>
          <span>Title</span>
          <span>Genre</span>
          <span>Time</span>
        </div>

        {visible.map((track, index) => (
          <button
            type='button'
            key={track.id}
            className='track-row'
            onClick={() => onPlay(track)}
          >
            <span className='track-row-index'>
              <span className='track-row-num'>{index + 1}</span>
              <Play size={16} className='track-row-play' fill='currentColor' />
            </span>
            <span className='track-row-main'>
              <Cover
                cover={track.cover}
                title={track.title}
                artist={track.artist}
                className='track-row-art'
                compact
              />
              <span className='track-row-meta'>
                <strong>{track.title}</strong>
                <span>{track.artist}</span>
              </span>
            </span>
            <span className='track-row-genre'>{track.genre}</span>
            <span className='track-row-time'>
              {formatDuration(track.duration)}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
