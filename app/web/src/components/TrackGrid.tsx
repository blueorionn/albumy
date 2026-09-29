import { ArrowRight, MoreHorizontal, Play } from 'lucide-react'
import { formatDuration } from '../lib/format'
import { cx } from '../lib/cx'
import { eyebrow, sectionHeading, sectionTitle, seeAll } from '../lib/ui'
import type { Track } from '../types'
import Cover from './Cover'

interface TrackGridProps {
  tracks: Track[]
  onPlay: (track: Track) => void
}

export default function TrackGrid({ tracks, onPlay }: TrackGridProps) {
  return (
    <section className='mb-11.25'>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Curated for you</p>
          <h2 className={sectionTitle}>Recently added</h2>
        </div>
        <button type='button' className={seeAll}>
          See all <ArrowRight size={15} />
        </button>
      </div>

      <div className='grid grid-cols-1 gap-[clamp(11px,2vw,18px)] min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {tracks.map((track) => (
          <button
            type='button'
            key={track.id}
            className='group bg-elevated hover:bg-elevated-hover relative rounded-[11px] border border-[#252825] p-2.5 text-left transition duration-200 hover:-translate-y-0.75'
            onClick={() => onPlay(track)}
          >
            <div className='relative aspect-square overflow-hidden rounded-[7px]'>
              <Cover
                cover={track.cover}
                title={track.title}
                artist={track.artist}
                className='block h-full w-full'
              />
              <span className='bg-accent absolute right-2.25 bottom-2.25 grid size-8.75 translate-y-1.25 place-items-center rounded-full text-[#11150f] opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100'>
                <Play size={17} fill='currentColor' />
              </span>
            </div>
            <div className='flex flex-col gap-1.25 px-0.75 pt-3.25 pb-1.25'>
              <strong className='text-xs font-bold'>{track.title}</strong>
              <span className='text-[11px] text-[#7c847c]'>{track.artist}</span>
            </div>
            <span className='absolute right-3.25 bottom-4.25 text-[10px] text-[#6d756d] max-sm:hidden'>
              {formatDuration(track.duration)}
            </span>
            <MoreHorizontal
              className='bg-bg/70 absolute top-2.5 right-2.5 hidden rounded-full p-1 text-white group-hover:block'
              size={17}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
