import { useState } from 'react'
import BrowsePage from './components/BrowsePage'
import FavouritesList from './components/FavouritesList'
import Hero from './components/Hero'
import PlayerBar from './components/PlayerBar'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import TopGenre from './components/TopGenre'
import TrackGrid from './components/TrackGrid'
import { FAVOURITES, TRACKS } from './data/catalog'
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
    <div className='bg-bg min-h-screen pb-[112px] pl-[244px] max-lg:pl-[190px] max-sm:pb-[150px] max-sm:pl-[66px]'>
      <Sidebar page={route.name} />

      <section className='min-w-0'>
        <TopBar />

        <div className='mx-auto w-full max-w-[1240px] px-[42px] pt-6 pb-[60px] max-sm:px-[18px] max-sm:pt-3 max-sm:pb-[38px]'>
          {route.name === 'home' ? (
            <>
              <Hero onPlay={() => setPlaying(true)} />
              <TrackGrid tracks={TRACKS} onPlay={playTrack} />

              <div className='mb-[45px] grid grid-cols-2 gap-11 max-lg:grid-cols-1 max-lg:gap-[38px] max-sm:gap-[30px]'>
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
