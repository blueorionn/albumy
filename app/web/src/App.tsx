import { useState } from 'react'
import BrowsePage from './pages/BrowsePage'
import PlayerBar from './components/PlayerBar'
import SearchPage from './pages/SearchPage'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import { TRACKS } from './data/catalog'
import { useHashRoute } from './hooks/useHashRoute'
import type { Track } from './types'
import HomePage from './pages/HomePage'

export default function App() {
  const route = useHashRoute()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [current, setCurrent] = useState<Track>(TRACKS[0])
  const [playing, setPlaying] = useState(false)

  const playTrack = (track: Track) => {
    setCurrent(track)
    setPlaying(true)
  }

  return (
    <div className='bg-bg min-h-screen pb-28 pl-[clamp(190px,20vw,244px)] max-sm:pb-22 max-sm:pl-0'>
      <Sidebar
        page={route.name}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <section className='min-w-0'>
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <div className='mx-auto w-full max-w-310 px-[clamp(18px,4vw,42px)] pt-[clamp(12px,2vw,24px)] pb-[clamp(38px,6vw,60px)]'>
          {route.name === 'home' ? (
            <>
              <HomePage
                onPlayHero={() => setPlaying(true)}
                onPlayTrack={playTrack}
              />
            </>
          ) : route.name === 'browse' ? (
            <BrowsePage genreSlug={route.genreSlug} onPlay={playTrack} />
          ) : (
            <SearchPage />
          )}
        </div>
      </section>

      <PlayerBar
        track={current}
        playing={playing}
        onToggle={() => setPlaying((v) => !v)}
      />
    </div>
  )
}
