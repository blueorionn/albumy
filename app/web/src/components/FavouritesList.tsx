import { ArrowRight, Heart } from 'lucide-react'
import { cx } from '../lib/cx'
import { eyebrow, sectionHeading, sectionTitle, seeAll } from '../lib/ui'
import type { Track } from '../types'
import Cover from './Cover'

interface FavouritesListProps {
  tracks: Track[]
  onPlay: (track: Track) => void
}

export default function FavouritesList({
  tracks,
  onPlay,
}: FavouritesListProps) {
  return (
    <div>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Your collection</p>
          <h2 className={sectionTitle}>Your favourites</h2>
        </div>
        <button type='button' className={seeAll}>
          See all <ArrowRight size={15} />
        </button>
      </div>

      <div className='flex flex-col gap-0.5'>
        {tracks.map((track) => (
          <button
            type='button'
            key={track.id}
            className='flex w-full items-center gap-3.25 rounded-lg px-2 py-2.5 text-left transition hover:bg-[#1b1e1b]'
            onClick={() => onPlay(track)}
          >
            <Cover
              cover={track.cover}
              title={track.title}
              artist={track.artist}
              className='block size-12 rounded-md'
              compact
            />
            <div className='flex min-w-0 flex-1 flex-col gap-1'>
              <strong className='text-sm font-bold'>{track.title}</strong>
              <span className='text-xs text-[#7c847c]'>{track.artist}</span>
            </div>
            <Heart size={18} fill='currentColor' className='text-accent' />
          </button>
        ))}
      </div>
    </div>
  )
}
