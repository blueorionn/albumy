import { useState } from "react";
import {
  Heart,
  ListMusic,
  Maximize2,
  Mic2,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { formatDuration } from "../lib/format";
import type { Track } from "../types";
import Cover from "./Cover";

interface PlayerBarProps {
  track: Track;
  playing: boolean;
  onToggle: () => void;
}

/** Player chrome — thumbnail left, controls center, sound/settings right. */
export default function PlayerBar({ track, playing, onToggle }: PlayerBarProps) {
  const [liked, setLiked] = useState(false);

  return (
    <footer className="player" aria-label="Player">
      <div className="now-playing">
        <Cover
          cover={track.cover}
          title={track.title}
          artist={track.artist}
          className="now-art"
          compact
        />
        <div>
          <strong>{track.title}</strong>
          <span>{track.artist}</span>
        </div>
        <button
          type="button"
          className={`heart-button${liked ? " liked" : ""}`}
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button type="button" aria-label="Shuffle">
            <Shuffle size={18} />
          </button>
          <button type="button" aria-label="Previous">
            <SkipBack size={19} fill="currentColor" />
          </button>
          <button
            type="button"
            className="play-button"
            onClick={onToggle}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause size={21} fill="currentColor" />
            ) : (
              <Play size={21} fill="currentColor" />
            )}
          </button>
          <button type="button" aria-label="Next">
            <SkipForward size={19} fill="currentColor" />
          </button>
          <button type="button" aria-label="Repeat">
            <Repeat2 size={20} />
          </button>
        </div>
        <div className="progress-row">
          <span>1:24</span>
          <div className="progress-line">
            <i style={{ width: playing ? "42%" : "30%" }} />
          </div>
          <span>{formatDuration(track.duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <button type="button" aria-label="Lyrics">
          <Mic2 size={17} />
        </button>
        <button type="button" aria-label="Queue">
          <ListMusic size={17} />
        </button>
        <Volume2 size={17} />
        <div className="volume-line">
          <i />
        </div>
        <button type="button" aria-label="Full screen">
          <Maximize2 size={17} />
        </button>
      </div>
    </footer>
  );
}
