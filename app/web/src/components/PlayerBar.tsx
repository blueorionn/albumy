import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
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
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <footer
        className='bg-elevated fixed right-0 bottom-0 left-0 z-5 grid h-28 grid-cols-[1fr_1.4fr_1fr] items-center gap-[clamp(10px,2vw,22px)] border-t border-[#2c302b] px-[clamp(18px,3vw,32px)] max-sm:flex max-sm:h-16 max-sm:items-center max-sm:gap-3 max-sm:py-0'
        aria-label='Player'
      >
        {/* Mobile: thin progress line pinned to the player's top edge */}
        <div
          className='absolute top-0 right-0 left-0 hidden h-0.75 bg-[#454b44] max-sm:block'
          aria-hidden='true'
        >
          <i
            className='bg-accent block h-full'
            style={{ width: playing ? '42%' : '30%' }}
          />
        </div>

        {/* Desktop / tablet zones */}
        <div className='flex min-w-0 items-center gap-3 max-sm:hidden'>
          <button
            type='button'
            className='shrink-0'
            aria-label='Expand player'
            onClick={() => setExpanded(true)}
          >
            <Cover
              cover={track.cover}
              title={track.title}
              artist={track.artist}
              className='block size-12 rounded-md'
              compact
            />
          </button>
          <div className='flex min-w-0 flex-col gap-1.25'>
            <strong className='truncate text-xs font-bold'>
              {track.title}
            </strong>
            <span className='truncate text-[11px] text-[#7c847c]'>
              {track.artist}
            </span>
          </div>
          <button
            type='button'
            className={cx(
              'ml-1.75 transition-colors',
              liked ? 'text-accent' : 'hover:text-text text-[#7e877e]'
            )}
            onClick={() => setLiked((v) => !v)}
            aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className='w-full max-w-125 justify-self-center max-sm:hidden'>
          <div className='flex items-center justify-center gap-4 text-[#889088]'>
            <button type='button' className={ghostButton} aria-label='Shuffle'>
              <Shuffle size={18} />
            </button>
            <button type='button' className={ghostButton} aria-label='Previous'>
              <SkipBack size={19} fill='currentColor' />
            </button>
            <button
              type='button'
              className='flex size-9.5 items-center justify-center rounded-full bg-[#eef1eb] p-0 text-[#101210] hover:bg-white'
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
          <div className='mt-3 flex items-center gap-3 text-sm text-[#9aa39a]'>
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

        <div className='flex items-center justify-end gap-2.5 text-[#879087] max-sm:hidden md:gap-3.5'>
          <Volume2 size={17} />
          <div className='h-1 max-w-18.75 min-w-8 flex-1 rounded-[9px] bg-[#454b44]'>
            <i className='bg-accent block h-full w-[70%] rounded-[inherit]' />
          </div>
          <button
            type='button'
            className={ghostButton}
            aria-label='Expand player'
            onClick={() => setExpanded(true)}
          >
            <Maximize2 size={17} />
          </button>
        </div>

        {/* Mobile mini bar: cover | title + artist | play/pause | expand */}
        <div className='hidden w-full items-center gap-3 max-sm:flex'>
          <button
            type='button'
            className='flex min-w-0 flex-1 items-center gap-3 text-left'
            onClick={() => setExpanded(true)}
            aria-label='Open player'
          >
            <Cover
              cover={track.cover}
              title={track.title}
              artist={track.artist}
              className='block size-11 shrink-0 rounded-md'
              compact
            />
            <span className='flex min-w-0 flex-col gap-0.5'>
              <strong className='truncate text-xs font-bold'>
                {track.title}
              </strong>
              <span className='truncate text-[11px] text-[#7c847c]'>
                {track.artist}
              </span>
            </span>
          </button>
          <button
            type='button'
            className='flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eef1eb] text-[#101210]'
            onClick={onToggle}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <PauseGlyph size={20} /> : <PlayGlyph size={20} />}
          </button>
          <button
            type='button'
            className='text-muted hover:text-text grid size-9 shrink-0 place-items-center rounded-full transition hover:bg-[#222622]'
            onClick={() => setExpanded(true)}
            aria-label='Expand player'
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </footer>

      {/* Mobile expanded "Now playing" sheet */}
      {expanded && (
        <div className='bg-bg fixed inset-0 z-30 flex flex-col px-5.5 pt-5 pb-10'>
          <div className='mx-auto flex min-h-0 w-full max-w-140 flex-1 flex-col'>
            <div className='flex items-center justify-between'>
              <button
                type='button'
                className='text-muted hover:text-text grid size-9 place-items-center rounded-full transition hover:bg-[#222622]'
                aria-label='Collapse player'
                onClick={() => setExpanded(false)}
              >
                <ChevronDown size={22} />
              </button>
              <span className='text-muted-2 text-[10px] font-bold tracking-[0.14em] uppercase'>
                Now playing
              </span>
              <div className='flex items-center gap-1'>
                <button
                  type='button'
                  className='text-muted hover:text-text grid size-9 place-items-center rounded-full transition hover:bg-[#222622]'
                  aria-label='Lyrics'
                >
                  <Mic2 size={18} />
                </button>
                <button
                  type='button'
                  className='text-muted hover:text-text grid size-9 place-items-center rounded-full transition hover:bg-[#222622]'
                  aria-label='Queue'
                >
                  <ListMusic size={18} />
                </button>
              </div>
            </div>

            <div className='flex flex-1 items-center justify-center py-6'>
              <Cover
                cover={track.cover}
                title={track.title}
                artist={track.artist}
                className='aspect-square w-[min(78vw,320px,45vh)] rounded-xl'
              />
            </div>

            <div className='flex items-center gap-3'>
              <div className='min-w-0 flex-1'>
                <strong className='block truncate text-lg font-bold'>
                  {track.title}
                </strong>
                <span className='mt-1 block truncate text-sm text-[#7c847c]'>
                  {track.artist}
                </span>
              </div>
              <button
                type='button'
                className={cx(
                  'grid size-9 place-items-center rounded-full transition-colors',
                  liked ? 'text-accent' : 'hover:text-text text-[#7e877e]'
                )}
                onClick={() => setLiked((v) => !v)}
                aria-label={
                  liked ? 'Remove from favourites' : 'Add to favourites'
                }
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className='mt-6 flex items-center gap-3 text-sm text-[#9aa39a]'>
              <span>1:24</span>
              <div className='h-1 flex-1 rounded-[9px] bg-[#454b44]'>
                <i
                  className='bg-accent block h-full rounded-[inherit]'
                  style={{ width: playing ? '42%' : '30%' }}
                />
              </div>
              <span>{formatDuration(track.duration)}</span>
            </div>

            <div className='mt-5 flex items-center justify-center gap-6 text-[#889088]'>
              <button
                type='button'
                className={ghostButton}
                aria-label='Shuffle'
              >
                <Shuffle size={20} />
              </button>
              <button
                type='button'
                className={ghostButton}
                aria-label='Previous'
              >
                <SkipBack size={24} fill='currentColor' />
              </button>
              <button
                type='button'
                className='flex size-14 items-center justify-center rounded-full bg-[#eef1eb] p-0 text-[#101210]'
                onClick={onToggle}
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <PauseGlyph size={26} /> : <PlayGlyph size={26} />}
              </button>
              <button type='button' className={ghostButton} aria-label='Next'>
                <SkipForward size={24} fill='currentColor' />
              </button>
              <button type='button' className={ghostButton} aria-label='Repeat'>
                <Repeat2 size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
