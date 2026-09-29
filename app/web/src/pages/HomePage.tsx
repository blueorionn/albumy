import Hero from '../components/Hero'
import TrackGrid from '../components/TrackGrid'
import FavouritesList from '../components/FavouritesList'
import TopGenre from '../components/TopGenre'
import { type Track } from '../types'
import { FAVOURITES, TRACKS } from '../data/catalog'

interface HomePageProps {
  onPlayHero: () => void
  onPlayTrack: (track: Track) => void
}

export default function HomePage({ onPlayHero, onPlayTrack }: HomePageProps) {
  return (
    <>
      <Hero onPlay={onPlayHero} />
      <TrackGrid tracks={TRACKS} onPlay={onPlayTrack} />

      <div className='mb-11.25 grid grid-cols-2 gap-[clamp(30px,5vw,44px)] max-lg:grid-cols-1'>
        <FavouritesList tracks={FAVOURITES} onPlay={onPlayTrack} />
        <TopGenre />
      </div>
    </>
  )
}
