import { Ellipsis } from 'lucide-react'
import { TOP_GENRES } from '../data/catalog'
import { cx } from '../lib/cx'
import { eyebrow, sectionHeading, sectionTitle } from '../lib/ui'

export default function TopGenre() {
  return (
    <div>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Explore your taste</p>
          <h2 className={sectionTitle}>Top genres</h2>
        </div>
        <button
          type='button'
          className='text-muted hover:text-text inline-flex items-center justify-center p-1 transition'
          aria-label='Genre options'
        >
          <Ellipsis size={18} />
        </button>
      </div>

      <div className='flex flex-col gap-3.5'>
        {TOP_GENRES.map((genre) => {
          const [firstLine, secondLine] = genre.name
          const name = genre.name.join(' ')

          return (
            <a
              className='relative flex min-h-33 gap-5.25 overflow-hidden rounded-xl bg-[#292d25] p-[20px_22px] transition duration-200 hover:-translate-y-0.5 hover:bg-[#2f342b]'
              key={genre.number}
              href={`#/genres/${genre.slug}`}
              aria-label={`Browse ${name}`}
            >
              <div className='pt-0.75 text-[11px] text-[#858d80]'>
                {genre.number}
              </div>
              <div>
                <span className='text-[10px] tracking-widest text-[#9da699] uppercase'>
                  {genre.kicker}
                </span>
                <h3 className='mt-2.5 mb-2.25 text-[25px] leading-[0.95] font-medium tracking-[-0.06em]'>
                  {firstLine}
                  <br />
                  {secondLine}
                </h3>
                <p className='m-0 text-[11px] text-[#8e968b]'>{genre.meta}</p>
              </div>
              <div
                className='absolute right-5.75 bottom-5 flex h-17.5 items-end gap-1'
                aria-hidden='true'
              >
                {genre.bars.map((height, index) => (
                  <i
                    key={index}
                    className='bg-accent block w-1.75 rounded-t-sm opacity-85'
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
