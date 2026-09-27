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
    <section className='mb-[45px]'>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Recently added</p>
          <h2 className={sectionTitle}>Tracks</h2>
        </div>
        <button type='button' className={seeAll}>
          See all <ArrowRight size={15} />
        </button>
      </div>

      <div className='grid grid-cols-4 gap-[18px] max-lg:grid-cols-2 max-sm:gap-[11px]'>
        {tracks.map((track) => (
          <button
            type='button'
            key={track.id}
            className='group bg-elevated hover:bg-elevated-hover relative rounded-[11px] border border-[#252825] p-2.5 text-left transition duration-200 hover:-translate-y-[3px]'
            onClick={() => onPlay(track)}
          >
            <div className='relative aspect-square overflow-hidden rounded-[7px]'>
              <Cover
                cover={track.cover}
                title={track.title}
                artist={track.artist}
                className='block h-full w-full'
              />
              <span className='bg-accent absolute right-[9px] bottom-[9px] grid size-[35px] translate-y-[5px] place-items-center rounded-full text-[#11150f] opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100'>
                <Play size={17} fill='currentColor' />
              </span>
            </div>
            <div className='flex flex-col gap-[5px] px-[3px] pt-[13px] pb-[5px]'>
              <strong className='text-xs font-bold'>{track.title}</strong>
              <span className='text-[11px] text-[#7c847c]'>{track.artist}</span>
            </div>
            <span className='absolute right-[13px] bottom-[17px] text-[10px] text-[#6d756d] max-sm:hidden'>
              {formatDuration(track.duration)}
            </span>
            <MoreHorizontal
              className='absolute top-2.5 right-2.5 hidden rounded-full bg-[#101110]/70 p-1 text-white group-hover:block'
              size={17}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
