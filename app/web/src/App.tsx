import { useState } from 'react'
import './App.css'
import AlbumGrid from './components/AlbumGrid'
import BrowsePage from './components/BrowsePage'
import FavouritesList from './components/FavouritesList'
import Hero from './components/Hero'
import PlayerBar from './components/PlayerBar'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import TopGenre from './components/TopGenre'
import TrackGrid from './components/TrackGrid'
import { ALBUMS, FAVOURITES, TRACKS } from './data/catalog'
import { useHashRoute } from './hooks/useHashRoute'
import type { Track } from './types'

export default function App() {
  const route = useHashRoute()
  const [current, setCurrent] = useState<Track>(TRACKS[0])
  const [playing, setPlaying] = useState(false)

  const playTrack = (track: Track) => {
    setCurrent(track)
    setPlaying(true)
  }

  return (
    <div className='app'>
      <Sidebar page={route.name} />

      <section className='main-column'>
        <TopBar />

        <div className='content-scroll'>
          {route.name === 'home' ? (
            <>
              <Hero onPlay={() => setPlaying(true)} />
              <AlbumGrid albums={ALBUMS} />
              <TrackGrid tracks={TRACKS} onPlay={playTrack} />

              <div className='lower-grid'>
                <FavouritesList tracks={FAVOURITES} onPlay={playTrack} />
                <TopGenre />
              </div>
            </>
          ) : (
            <BrowsePage
              tracks={TRACKS}
              genreSlug={route.genreSlug}
              onPlay={playTrack}
            />
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
