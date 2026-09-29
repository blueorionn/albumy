import { Play } from 'lucide-react'
import { RECENTLY_PLAYED } from '../data/catalog'
import { cx } from '../lib/cx'
import { eyebrow, sectionHeading, sectionTitle } from '../lib/ui'
import type { Track } from '../types'
import TrackList from '../components/TrackList'

interface RecentlyPlayedPageProps {
  onPlay: (track: Track) => void
  onPlayAll: (tracks: Track[]) => void
}

export default function RecentlyPlayedPage({
  onPlay,
  onPlayAll,
}: RecentlyPlayedPageProps) {
  return (
    <section className='mb-11.25'>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Your Library</p>
          <h2 className={sectionTitle}>Recently played</h2>
          <p className='text-muted-2 mt-1 text-[11px]'>
            {RECENTLY_PLAYED.length} tracks
          </p>
        </div>
        <button
          type='button'
          className='bg-accent text-accent-ink hover:bg-accent-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition'
          onClick={() => onPlayAll(RECENTLY_PLAYED)}
        >
          <Play size={14} fill='currentColor' /> Play all
        </button>
      </div>

      <TrackList tracks={RECENTLY_PLAYED} onPlay={onPlay} />
    </section>
  )
}
