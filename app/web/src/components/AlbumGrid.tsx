import { ArrowRight } from "lucide-react";
import type { Album, AlbumType } from "../types";
import Cover from "./Cover";

interface AlbumGridProps {
  albums: Album[];
}

const TYPE_LABELS: Record<AlbumType, string> = {
  album: "Album",
  ep: "EP",
  single: "Single",
  compilation: "Compilation",
};

/** "Recently added — Albums": static browse cards (albums aren't playable yet). */
export default function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Recently added</p>
          <h2>Albums</h2>
        </div>
        <button type="button" className="see-all">
          See all <ArrowRight size={15} />
        </button>
      </div>

      <div className="track-grid">
        {albums.map((album) => (
          <article key={album.id} className="track-card">
            <div className="track-art-wrap">
              <Cover
                cover={album.cover}
                title={album.title}
                artist={album.artist}
                className="track-art"
              />
            </div>
            <div className="track-meta">
              <strong>{album.title}</strong>
              <span>{album.artist}</span>
            </div>
            <span className="track-time">{TYPE_LABELS[album.album_type]}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
