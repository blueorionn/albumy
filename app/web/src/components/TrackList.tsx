import { Play } from 'lucide-react'
import { formatDuration } from '../lib/format'
import { cx } from '../lib/cx'
import type { Track } from '../types'
import Cover from './Cover'

interface TrackListProps {
  tracks: Track[]
  onPlay: (track: Track) => void
}

const listGrid =
  'grid grid-cols-[30px_minmax(0,1fr)_140px_56px] items-center gap-3.5 max-sm:grid-cols-[30px_minmax(0,1fr)_56px]'

/** Numbered track rows: # / artwork + title / genre / duration, play on hover. */
export default function TrackList({ tracks, onPlay }: TrackListProps) {
  return (
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

      {tracks.map((track, index) => (
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
              <span className='text-[11px] text-[#7c847c]'>{track.artist}</span>
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
  )
}
