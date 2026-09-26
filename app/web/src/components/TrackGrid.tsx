import { ArrowRight, MoreHorizontal, Play } from "lucide-react";
import { formatDuration } from "../lib/format";
import type { Track } from "../types";
import Cover from "./Cover";

interface TrackGridProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
}

export default function TrackGrid({ tracks, onPlay }: TrackGridProps) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Curated for you</p>
          <h2>Recently added</h2>
        </div>
        <button type="button" className="see-all">
          See all <ArrowRight size={15} />
        </button>
      </div>

      <div className="track-grid">
        {tracks.map((track) => (
          <button
            type="button"
            key={track.id}
            className="track-card"
            onClick={() => onPlay(track)}
          >
            <div className="track-art-wrap">
              <Cover
                cover={track.cover}
                title={track.title}
                artist={track.artist}
                className="track-art"
              />
              <span className="track-play">
                <Play size={17} fill="currentColor" />
              </span>
            </div>
            <div className="track-meta">
              <strong>{track.title}</strong>
              <span>{track.artist}</span>
            </div>
            <span className="track-time">{formatDuration(track.duration)}</span>
            <MoreHorizontal className="track-more" size={17} />
          </button>
        ))}
      </div>
    </section>
  );
}
