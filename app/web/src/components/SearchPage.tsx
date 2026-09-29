import { Search, SlidersHorizontal } from 'lucide-react'
import { cx } from '../lib/cx'
import { eyebrow, sectionHeading, sectionTitle } from '../lib/ui'

/** Search page — bare UI for now; wiring comes later. */
export default function SearchPage() {
  return (
    <section className='mb-[45px]'>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Discover</p>
          <h2 className={sectionTitle}>Search</h2>
        </div>
      </div>

      <div className='mb-10 flex max-w-[560px] items-center gap-2'>
        <label className='relative flex-1'>
          <span className='sr-only'>Search the catalog</span>
          <Search
            size={18}
            className='text-muted-2 pointer-events-none absolute top-1/2 left-4 -translate-y-1/2'
          />
          <input
            type='search'
            placeholder='Tracks, artists, genres…'
            className='border-line bg-elevated text-text placeholder:text-muted-2 focus:border-accent h-12 w-full rounded-full border pr-4 pl-11 text-sm transition outline-none max-sm:text-base'
          />
        </label>
        <button
          type='button'
          className='border-line bg-elevated text-muted grid size-12 shrink-0 place-items-center rounded-full border transition-colors duration-150 hover:bg-[#1b1e1b]'
          aria-label='Filter results'
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className='border-line flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center'>
        <Search size={28} className='text-muted-2' strokeWidth={1.5} />
        <p className='text-muted text-sm font-semibold'>Search albumy</p>
        <p className='text-muted-2 max-w-[320px] text-xs leading-[1.6]'>
          Find tracks, artists and genres from the freely licensed catalog.
        </p>
      </div>
    </section>
  )
}
