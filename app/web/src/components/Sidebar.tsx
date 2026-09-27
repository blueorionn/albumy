import { useState } from 'react'
import {
  ChevronDown,
  CirclePlus,
  Clock3,
  Compass,
  Heart,
  Home,
  ListMusic,
  Search,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PLAYLISTS } from '../data/catalog'
import { cx } from '../lib/cx'
import { eyebrow } from '../lib/ui'

function NavItem({
  icon: Icon,
  label,
  href,
  active = false,
}: {
  icon: LucideIcon
  label: string
  /** When absent the item renders as a no-op button (page not built yet). */
  href?: string
  active?: boolean
}) {
  const className = cx(
    'flex w-full items-center gap-3.5 rounded-[9px] px-3 py-2.5 text-left text-[13px] font-semibold transition',
    'max-sm:justify-center max-sm:px-0 max-sm:py-[11px]',
    active
      ? 'bg-[#252b21] text-accent'
      : 'text-muted hover:bg-[#222622] hover:text-[#eef0eb]'
  )
  const children = (
    <>
      <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
      <span className='max-sm:hidden'>{label}</span>
    </>
  )

  return href ? (
    <a className={className} href={href}>
      {children}
    </a>
  ) : (
    <button type='button' className={className}>
      {children}
    </button>
  )
}

interface SidebarProps {
  page: 'home' | 'browse'
}

export default function Sidebar({ page }: SidebarProps) {
  const [playlistsOpen, setPlaylistsOpen] = useState(true)

  return (
    <aside className='border-line bg-panel fixed top-0 bottom-[112px] left-0 z-10 flex w-[244px] flex-col overflow-x-hidden overflow-y-auto border-r px-[18px] pt-7 pb-[22px] max-lg:w-[190px] max-sm:w-[66px] max-sm:px-[9px] max-sm:pt-[22px]'>
      <div className='flex items-center gap-2.5 px-3 pb-[42px] text-[19px] font-bold tracking-[-0.04em] text-[#f7f8f4] max-sm:px-2.5 max-sm:pb-[38px]'>
        <span
          className='bg-accent flex h-[26px] w-[26px] -rotate-[8deg] items-center justify-center gap-[3px] rounded-lg'
          aria-hidden='true'
        >
          <span className='bg-panel block h-2 w-[3px] rounded-[3px]' />
          <span className='bg-panel block h-[15px] w-[3px] rounded-[3px]' />
          <span className='bg-panel block h-[11px] w-[3px] rounded-[3px]' />
        </span>
        <span className='max-sm:hidden'>albumy</span>
      </div>

      <div className='pb-[30px]'>
        <p className={cx(eyebrow, 'mb-[13px] ml-3')}>Discover</p>
        <nav aria-label='Discover'>
          <NavItem
            icon={Home}
            label='Home'
            href='#/'
            active={page === 'home'}
          />
          <NavItem icon={Search} label='Search' />
          <NavItem
            icon={Compass}
            label='Browse'
            href='#/browse'
            active={page === 'browse'}
          />
        </nav>
      </div>

      <div className='border-line-soft border-t pt-[27px] pb-[30px] max-sm:pt-[22px]'>
        <div className='flex items-center justify-between'>
          <p className={cx(eyebrow, 'mb-[13px] ml-3')}>Your Library</p>
          <button
            type='button'
            className='text-muted hover:text-text inline-flex items-center justify-center p-1 transition max-sm:hidden'
            aria-label='Create playlist'
          >
            <CirclePlus size={18} />
          </button>
        </div>
        <nav aria-label='Your library'>
          <NavItem icon={Heart} label='Liked Songs' />
          <NavItem icon={Clock3} label='Recently played' />
        </nav>

        <div className='pt-[6px] max-sm:hidden'>
          <button
            type='button'
            className='text-muted flex w-full items-center gap-3.5 rounded-[9px] px-3 py-2.5 text-left text-[13px] font-semibold transition hover:bg-[#222622] hover:text-[#eef0eb]'
            aria-expanded={playlistsOpen}
            aria-controls='playlists-list'
            onClick={() => setPlaylistsOpen((v) => !v)}
          >
            <ListMusic size={20} strokeWidth={1.8} />
            <span>Playlists</span>
            <ChevronDown
              size={16}
              className={cx(
                'text-muted-2 ml-auto transition-transform duration-200',
                playlistsOpen ? 'rotate-0' : '-rotate-90'
              )}
            />
          </button>

          {playlistsOpen && (
            <ul
              className='m-0 flex list-none flex-col gap-0.5 pt-0.5 pl-[26px]'
              id='playlists-list'
            >
              {PLAYLISTS.map((playlist) => (
                <li key={playlist.name}>
                  <button
                    type='button'
                    className='text-muted flex w-full items-center justify-between gap-2 rounded-lg px-3 py-[7px] text-left text-[14px] transition hover:bg-[#222622] hover:text-[#eef0eb]'
                  >
                    <span className='min-w-0 flex-1 truncate'>
                      {playlist.name}
                    </span>
                    <span className='text-muted-2 shrink-0 text-[14px]'>
                      {playlist.tracks} tracks
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className='border-line-soft mt-auto flex items-center gap-2.5 border-t px-[11px] pt-5 text-[#ecf0ea] max-sm:justify-center max-sm:px-0 max-sm:pt-[18px]'>
        <div className='bg-accent grid h-[30px] w-[30px] place-items-center rounded-full text-[10px] font-bold text-[#141613]'>
          G
        </div>
        <div className='max-sm:hidden'>
          <strong className='block text-xs'>Guest</strong>
          <span className='text-muted-2 mt-[3px] block text-[10px]'>
            Free account
          </span>
        </div>
        <ChevronDown size={16} className='text-muted-2 ml-auto max-sm:hidden' />
      </div>
    </aside>
  )
}
