import { useState } from 'react'
import BrowsePage from './pages/BrowsePage'
import FavouritesPage from './pages/FavouritesPage'
import PlayerBar from './components/PlayerBar'
import RecentlyPlayedPage from './pages/RecentlyPlayedPage'
import SearchPage from './pages/SearchPage'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import { useHashRoute } from './hooks/useHashRoute'
import { cx } from './lib/cx'
import type { Track } from './types'
import HomePage from './pages/HomePage'

export default function App() {
  const route = useHashRoute()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [queue, setQueue] = useState<Track[]>([])
  const [queueIndex, setQueueIndex] = useState(0)
  const [current, setCurrent] = useState<Track | null>(null)
  const [playing, setPlaying] = useState(false)

  /** Play a track, optionally within a list that becomes the queue. */
  const playTrack = (track: Track, list?: Track[]) => {
    if (list) {
      setQueue(list)
      setQueueIndex(
        Math.max(
          0,
          list.findIndex((t) => t.id === track.id)
        )
      )
    }
    setCurrent(track)
    setPlaying(true)
  }

  /** Play a list from the top — the "Play all" action. */
  const playAll = (list: Track[]) => {
    setQueue(list)
    setQueueIndex(0)
    setCurrent(list[0])
    setPlaying(true)
  }

  const playNext = () => {
    const next = Math.min(queueIndex + 1, queue.length - 1)
    setQueueIndex(next)
    setCurrent(queue[next])
  }

  const playPrev = () => {
    const prev = Math.max(queueIndex - 1, 0)
    setQueueIndex(prev)
    setCurrent(queue[prev])
  }

  return (
    <div
      className={cx(
        'bg-bg min-h-screen pl-[clamp(190px,20vw,244px)] max-sm:pl-0',
        // Reserve space for the fixed player only while it's visible
        current && 'pb-28 max-sm:pb-22'
      )}
    >
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
          ) : route.name === 'favourites' ? (
            <FavouritesPage onPlay={playTrack} onPlayAll={playAll} />
          ) : route.name === 'recent' ? (
            <RecentlyPlayedPage onPlay={playTrack} onPlayAll={playAll} />
          ) : route.name === 'browse' ? (
            <BrowsePage genreSlug={route.genreSlug} onPlay={playTrack} />
          ) : (
            <SearchPage />
          )}
        </div>
      </section>

      {current && (
        <PlayerBar
          track={current}
          playing={playing}
          onToggle={() => setPlaying((v) => !v)}
          onNext={playNext}
          onPrev={playPrev}
        />
      )}
    </div>
  )
}
