import { ArrowLeft, ArrowRight, Menu } from 'lucide-react'

const SPONSOR_URL = 'https://github.com/sponsors/blueorionn'

interface TopBarProps {
  /** Opens the mobile sidebar drawer. */
  onMenuClick?: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className='flex h-[clamp(66px,8vw,82px)] items-center justify-between px-[clamp(18px,4vw,42px)]'>
      <div className='flex items-center gap-2.5'>
        <button
          type='button'
          className='hover:text-text hidden size-[30px] place-items-center rounded-full bg-[#202320] text-[#aab0aa] transition max-sm:grid'
          aria-label='Open menu'
          onClick={onMenuClick}
        >
          <Menu size={17} />
        </button>
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
