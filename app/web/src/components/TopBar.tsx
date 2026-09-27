import { ArrowLeft, ArrowRight } from 'lucide-react'

const SPONSOR_URL = 'https://github.com/sponsors/blueorionn'

export default function TopBar() {
  return (
    <header className='flex h-[82px] items-center justify-between px-[42px] max-sm:h-[66px] max-sm:px-[18px]'>
      <div className='flex gap-[9px]'>
        <button
          type='button'
          className='hover:text-text grid size-[30px] place-items-center rounded-full bg-[#202320] text-[#aab0aa] transition'
          aria-label='Go back'
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={17} />
        </button>
        <button
          type='button'
          className='hover:text-text grid size-[30px] place-items-center rounded-full bg-[#202320] text-[#aab0aa] transition'
          aria-label='Go forward'
          onClick={() => window.history.forward()}
        >
          <ArrowRight size={17} />
        </button>
      </div>
      <a
        className='text-accent rounded-full border border-[#495148] px-[17px] py-2 text-[11px] font-bold transition hover:bg-[#202420]'
        href={SPONSOR_URL}
        target='_blank'
        rel='noreferrer'
      >
        Sponsor
      </a>
    </header>
  )
}
