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
  X,
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
  onClick,
}: {
  icon: LucideIcon
  label: string
  /** When absent the item renders as a no-op button (page not built yet). */
  href?: string
  active?: boolean
  onClick?: () => void
}) {
  const className = cx(
    'flex w-full items-center gap-3.5 rounded-[9px] px-3 py-2.5 text-left text-[13px] font-semibold transition',
    active
      ? 'bg-[#252b21] text-accent'
      : 'text-muted hover:bg-[#222622] hover:text-[#eef0eb]'
  )
  const children = (
    <>
      <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
      <span>{label}</span>
    </>
  )

  return href ? (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button type='button' className={className} onClick={onClick}>
      {children}
    </button>
  )
}

interface SidebarProps {
  page: 'home' | 'favourites' | 'browse' | 'search'
  /** Mobile drawer state — ignored on desktop (always visible). */
  open: boolean
  onClose: () => void
}

export default function Sidebar({ page, open, onClose }: SidebarProps) {
  const [playlistsOpen, setPlaylistsOpen] = useState(true)

  return (
    <>
      {/* Mobile backdrop — desktop never shows it */}
      <div
        className={cx(
          'fixed inset-0 z-15 hidden bg-black/60',
          open && 'max-sm:block'
        )}
        onClick={onClose}
        aria-hidden='true'
      />

      <aside
        className={cx(
          'border-line bg-panel fixed top-0 bottom-28 left-0 z-20 flex w-[clamp(190px,20vw,244px)] flex-col overflow-x-hidden overflow-y-auto border-r px-4.5 pt-7 pb-5.5 transition-transform duration-200',
          // ≤639px: off-canvas drawer, toggled by the hamburger
          'max-sm:inset-y-0 max-sm:bottom-0 max-sm:w-61 max-sm:shadow-2xl',
          open ? 'max-sm:translate-x-0' : 'max-sm:-translate-x-full'
        )}
      >
        <div className='flex items-center gap-2.5 px-3 pb-10.25 text-[19px] font-bold tracking-[-0.04em] text-[#f7f8f4]'>
          <span
            className='bg-accent flex h-6.5 w-6.5 rotate-[-8deg] items-center justify-center gap-0.75 rounded-lg'
            aria-hidden='true'
          >
            <span className='bg-panel block h-2 w-0.75 rounded-[3px]' />
            <span className='bg-panel block h-3.75 w-0.75 rounded-[3px]' />
            <span className='bg-panel block h-2.75 w-0.75 rounded-[3px]' />
          </span>
          <span>albumy</span>
          <button
            type='button'
            className='text-muted hover:text-text ml-auto hidden size-8 place-items-center rounded-full transition hover:bg-[#222622] max-sm:grid'
            aria-label='Close menu'
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className='pb-7.5'>
          <p className={cx(eyebrow, 'mb-3.25 ml-3')}>Discover</p>
          <nav aria-label='Discover'>
            <NavItem
              icon={Home}
              label='Home'
              href='#/'
              active={page === 'home'}
              onClick={onClose}
            />
            <NavItem
              icon={Search}
              label='Search'
              href='#/search'
              active={page === 'search'}
              onClick={onClose}
            />
            <NavItem
              icon={Compass}
              label='Browse'
              href='#/browse'
              active={page === 'browse'}
              onClick={onClose}
            />
          </nav>
        </div>

        <div className='border-line-soft border-t pt-6.75 pb-7.5'>
          <div className='flex items-center justify-between'>
            <p className={cx(eyebrow, 'mb-3.25 ml-3')}>Your Library</p>
            <button
              type='button'
              className='text-muted hover:text-text inline-flex items-center justify-center p-1 transition'
              aria-label='Create playlist'
            >
              <CirclePlus size={18} />
            </button>
          </div>
          <nav aria-label='Your library'>
            <NavItem
              icon={Heart}
              label='Favourites'
              href='#/favourites'
              active={page === 'favourites'}
            />
            <NavItem icon={Clock3} label='Recently played' />
          </nav>

          <div className='pt-1.5'>
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
                className='m-0 flex list-none flex-col gap-0.5 pt-0.5 pl-6.5'
                id='playlists-list'
              >
                {PLAYLISTS.map((playlist) => (
                  <li key={playlist.name}>
                    <button
                      type='button'
                      className='text-muted flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.75 text-left text-[14px] transition hover:bg-[#222622] hover:text-[#eef0eb]'
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

        <button
          type='button'
          className='border-line-soft mt-auto flex w-full cursor-pointer items-center gap-2.5 rounded-[9px] border-t px-2.75 pt-5 pb-2 text-left text-[#ecf0ea] transition hover:bg-[#222622]'
          aria-label='Open account'
        >
          <div className='bg-accent grid h-7.5 w-7.5 place-items-center rounded-full text-[10px] font-bold text-[#141613]'>
            G
          </div>
          <div>
            <strong className='block text-xs'>Guest</strong>
            <span className='text-muted-2 mt-0.75 block text-[11px]'>
              Admin
            </span>
          </div>
        </button>
      </aside>
    </>
  )
}
