import { Play } from 'lucide-react'
import { FAVOURITES } from '../data/catalog'
import { cx } from '../lib/cx'
import { eyebrow, sectionHeading, sectionTitle } from '../lib/ui'
import type { Track } from '../types'
import FavouritesList from '../components/FavouritesList'

interface FavouritesPageProps {
  onPlay: (track: Track, list?: Track[]) => void
  onPlayAll: (tracks: Track[]) => void
}

export default function FavouritesPage({
  onPlay,
  onPlayAll,
}: FavouritesPageProps) {
  return (
    <section className='mb-[45px]'>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Your Library</p>
          <h2 className={sectionTitle}>Favourites</h2>
          <p className='text-muted-2 mt-1 text-[11px]'>
            {FAVOURITES.length} tracks
          </p>
        </div>
        <button
          type='button'
          className='bg-accent text-accent-ink hover:bg-accent-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition'
          onClick={() => onPlayAll(FAVOURITES)}
        >
          <Play size={14} fill='currentColor' /> Play all
        </button>
      </div>

      <FavouritesList
        tracks={FAVOURITES}
        onPlay={(track) => onPlay(track, FAVOURITES)}
        showHeading={false}
      />
    </section>
  )
}
