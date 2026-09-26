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
  const className = `nav-item${active ? ' active' : ''}`
  const children = (
    <>
      <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
      <span>{label}</span>
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
    <aside className='sidebar'>
      <div className='brand'>
        <span className='brand-mark' aria-hidden='true'>
          <span />
          <span />
          <span />
        </span>
        <span>albumy</span>
      </div>

      <div className='side-section'>
        <p className='side-label'>Discover</p>
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

      <div className='side-section library-section'>
        <div className='library-heading'>
          <p className='side-label'>Your Library</p>
          <button
            type='button'
            className='icon-button'
            aria-label='Create playlist'
          >
            <CirclePlus size={18} />
          </button>
        </div>
        <nav aria-label='Your library'>
          <NavItem icon={Heart} label='Liked Songs' />
          <NavItem icon={Clock3} label='Recently played' />
        </nav>

        <div className='playlists'>
          <button
            type='button'
            className='playlists-toggle'
            aria-expanded={playlistsOpen}
            aria-controls='playlists-list'
            onClick={() => setPlaylistsOpen((v) => !v)}
          >
            <ListMusic size={20} strokeWidth={1.8} />
            <span>Playlists</span>
            <ChevronDown
              size={16}
              className={`playlists-chevron${playlistsOpen ? 'open' : ''}`}
            />
          </button>

          {playlistsOpen && (
            <ul className='playlists-list' id='playlists-list'>
              {PLAYLISTS.map((playlist) => (
                <li key={playlist.name}>
                  <button type='button' className='playlists-item'>
                    <span className='playlists-item-name'>{playlist.name}</span>
                    <span className='playlists-item-count'>
                      {playlist.tracks} tracks
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className='sidebar-bottom'>
        <div className='profile-dot'>G</div>
        <div>
          <strong>Guest</strong>
          <span>Free account</span>
        </div>
        <ChevronDown size={16} />
      </div>
    </aside>
  )
}
