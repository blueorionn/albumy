import Hero from '../components/Hero'
import TrackGrid from '../components/TrackGrid'
import FavouritesList from '../components/FavouritesList'
import TopGenre from '../components/TopGenre'
import { FAVOURITES } from '../data/catalog'
import { useTracks } from '../hooks/useTracks'
import type { Track } from '../types'

interface HomePageProps {
  onPlayHero: () => void
  onPlayTrack: (track: Track) => void
}

export default function HomePage({ onPlayHero, onPlayTrack }: HomePageProps) {
  const { tracks, loading, error } = useTracks()
  const MAX_TRACKS_ON_HOME_PAGE = 8

  return (
    <>
      <Hero onPlay={onPlayHero} />

      {loading ? (
        <p className='text-muted-2 mb-11.25 text-sm'>Loading tracks…</p>
      ) : error ? (
        <p className='mb-11.25 text-sm text-[#e0685b]'>{error}</p>
      ) : tracks.length === 0 ? (
        <p className='text-muted-2 mb-11.25 text-sm'>
          No tracks in the catalog yet.
        </p>
      ) : (
        <TrackGrid
          tracks={tracks?.slice(0, MAX_TRACKS_ON_HOME_PAGE)}
          onPlay={onPlayTrack}
        />
      )}

      <div className='mb-11.25 grid grid-cols-2 gap-[clamp(30px,5vw,44px)] max-lg:grid-cols-1'>
        <FavouritesList tracks={FAVOURITES} onPlay={onPlayTrack} />
        <TopGenre />
      </div>
    </>
  )
}
