import { useState } from 'react'
import {
  Heart,
  ListMusic,
  Maximize2,
  Mic2,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react'
import { formatDuration } from '../lib/format'
import { cx } from '../lib/cx'
import type { Track } from '../types'
import Cover from './Cover'

interface PlayerBarProps {
  track: Track
  playing: boolean
  onToggle: () => void
}

/**
 * Hand-drawn play glyph, authored so its *optical* center matches the
 * geometric center of the viewBox: a right-pointing triangle's visual
 * weight is its centroid, (2·base + apex)/3 — with the base at x=8 and
 * the apex at x=20 that lands on exactly 12. Flex centering therefore
 * looks perfectly centered, with no CSS nudging. The 2px stroke with
 * round joins matches lucide's corner softness.
 */
function PlayGlyph({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' aria-hidden='true'>
      <polygon
        points='8,4 20,12 8,20'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function PauseGlyph({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' aria-hidden='true'>
      <rect x='6' y='4' width='4' height='16' rx='1' fill='currentColor' />
      <rect x='14' y='4' width='4' height='16' rx='1' fill='currentColor' />
    </svg>
  )
}

const ghostButton =
  'grid place-items-center rounded-lg bg-transparent p-1 transition hover:text-text'

/** Player chrome — thumbnail left, controls center, sound/settings right. */
export default function PlayerBar({
  track,
  playing,
  onToggle,
}: PlayerBarProps) {
  const [liked, setLiked] = useState(false)

  return (
    <footer
      className='fixed right-0 bottom-0 left-0 z-[5] grid h-[112px] grid-cols-[1fr_1.4fr_1fr] items-center gap-[22px] border-t border-[#2c302b] bg-[#181a18f5] px-8 backdrop-blur-[18px] max-lg:grid-cols-[1fr_1.4fr] max-sm:flex max-sm:flex-col max-sm:items-stretch max-sm:gap-2.5 max-sm:px-[18px] max-sm:py-2.5'
      aria-label='Player'
    >
      <div className='flex min-w-0 items-center gap-3 max-sm:h-12'>
        <Cover
          cover={track.cover}
          title={track.title}
          artist={track.artist}
          className='block size-12 rounded-[6px]'
          compact
        />
        <div className='flex min-w-0 flex-col gap-[5px]'>
          <strong className='truncate text-xs font-bold'>{track.title}</strong>
          <span className='truncate text-[11px] text-[#7c847c]'>
            {track.artist}
          </span>
        </div>
        <button
          type='button'
          className={cx(
            'ml-[7px] transition-colors',
            liked ? 'text-accent' : 'hover:text-text text-[#7e877e]'
          )}
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className='w-full max-w-[500px] justify-self-center max-sm:max-w-none'>
        <div className='flex items-center justify-center gap-4 text-[#889088] max-sm:gap-[22px]'>
          <button type='button' className={ghostButton} aria-label='Shuffle'>
            <Shuffle size={18} />
          </button>
          <button type='button' className={ghostButton} aria-label='Previous'>
            <SkipBack size={19} fill='currentColor' />
          </button>
          <button
            type='button'
            className='flex size-[38px] items-center justify-center rounded-full bg-[#eef1eb] p-0 text-[#101210] hover:bg-white'
            onClick={onToggle}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <PauseGlyph size={23} /> : <PlayGlyph size={23} />}
          </button>
          <button type='button' className={ghostButton} aria-label='Next'>
            <SkipForward size={19} fill='currentColor' />
          </button>
          <button type='button' className={ghostButton} aria-label='Repeat'>
            <Repeat2 size={18} />
          </button>
        </div>
        <div className='mt-3 flex items-center gap-3 text-sm text-[#9aa39a] max-sm:mt-1'>
          <span>1:24</span>
          <div className='h-1 flex-1 rounded-[9px] bg-[#454b44]'>
            <i
              className='bg-accent block h-full rounded-[inherit]'
              style={{ width: playing ? '42%' : '30%' }}
            />
          </div>
          <span>{formatDuration(track.duration)}</span>
        </div>
      </div>

      <div className='flex items-center justify-end gap-3.5 text-[#879087] max-lg:hidden'>
        <button type='button' className={ghostButton} aria-label='Lyrics'>
          <Mic2 size={17} />
        </button>
        <button type='button' className={ghostButton} aria-label='Queue'>
          <ListMusic size={17} />
        </button>
        <Volume2 size={17} />
        <div className='h-1 max-w-[75px] flex-1 rounded-[9px] bg-[#454b44]'>
          <i className='bg-accent block h-full w-[70%] rounded-[inherit]' />
        </div>
        <button type='button' className={ghostButton} aria-label='Full screen'>
          <Maximize2 size={17} />
        </button>
      </div>
    </footer>
  )
}
