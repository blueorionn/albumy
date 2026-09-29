import { Play } from 'lucide-react'
import { cx } from '../lib/cx'
import { eyebrow } from '../lib/ui'

interface HeroProps {
  onPlay: () => void
}

function greeting(): string {
  const hour = new Date().getHours()
  if (hour < 5) return 'Good night'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

export default function Hero({ onPlay }: HeroProps) {
  return (
    <>
      <section className='mb-6.5 flex items-end justify-between max-sm:block'>
        <div>
          <p className={cx(eyebrow, 'mb-2.5 ml-0')}>
            {dateFormatter.format(new Date())}
          </p>
          <h1 className='m-0 text-[clamp(30px,3vw,42px)] leading-none font-semibold tracking-[-0.055em]'>
            {greeting()}
            <span className='text-accent'>.</span>
          </h1>
        </div>
        <div className='flex items-center gap-2 pb-1.5 text-[13px] text-[#a9b1a8] max-sm:mt-4.5'>
          <span className='bg-accent size-1.75 rounded-full shadow-[0_0_0_4px_rgba(196,245,45,0.11)]' />
          Every track is free to stream
        </div>
      </section>

      <section className='relative mb-11.75 min-h-66.25 overflow-hidden rounded-[14px] bg-[linear-gradient(108deg,#353c27_0%,#3b4525_46%,#20251e_100%)] p-[32px_36px] max-sm:min-h-77.5 max-sm:p-[26px_23px]'>
        <div className='relative z-1 max-w-95'>
          <p className={cx(eyebrow, 'mb-3.25 ml-0 text-[#aeb9a4]')}>
            Curated for you
          </p>
          <h2 className='m-0 text-[45px] leading-[0.93] font-medium tracking-[-0.07em] max-sm:text-[39px]'>
            Find your
            <br />
            <em className='text-accent not-italic'>frequency.</em>
          </h2>
          <p className='my-5 max-w-65 text-xs leading-[1.6] text-[#bbc0b4]'>
            A handpicked library of freely licensed music for late nights, long
            drives, and everything in between.
          </p>
          <button
            type='button'
            className='bg-accent text-accent-ink hover:bg-accent-hover inline-flex items-center gap-2.25 rounded-full px-4.5 py-2.75 text-xs font-extrabold transition'
            onClick={onPlay}
          >
            <Play size={16} fill='currentColor' /> Shuffle play
          </button>
        </div>
        <div className='absolute top-0 right-0 h-full w-[53%] mask-[linear-gradient(90deg,transparent,black_28%)] bg-cover bg-center opacity-70 mix-blend-screen max-sm:bottom-0 max-sm:h-[55%] max-sm:w-full max-sm:mask-[linear-gradient(0deg,black,transparent)]' />
      </section>
    </>
  )
}
