import { ArrowRight, Heart } from "lucide-react";
import type { Track } from "../types";
import Cover from "./Cover";

interface FavouritesListProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
}

export default function FavouritesList({ tracks, onPlay }: FavouritesListProps) {
  return (
    <div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your collection</p>
          <h2>Your favourites</h2>
        </div>
        <button type="button" className="see-all">
          See all <ArrowRight size={15} />
        </button>
      </div>

      <div className="favourites-list">
        {tracks.map((track) => (
          <button
            type="button"
            key={track.id}
            className="favourite-row"
            onClick={() => onPlay(track)}
          >
            <Cover
              cover={track.cover}
              title={track.title}
              artist={track.artist}
              className="favourite-art"
              compact
            />
            <div>
              <strong>{track.title}</strong>
              <span>{track.artist}</span>
            </div>
            <Heart size={18} fill="currentColor" />
          </button>
        ))}
      </div>
    </div>
  );
}
