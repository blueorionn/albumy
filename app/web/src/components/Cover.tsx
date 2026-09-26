import Poster from "./Poster";

interface CoverProps {
  cover: string;
  title: string;
  artist: string;
  className?: string;
  /** Small sizes (player thumbnail, list rows) drop the poster label. */
  compact?: boolean;
}

/**
 * Artwork with a generated fallback: renders the cover image when a URL is
 * provided (the API will compose CDN URLs from storage keys), otherwise a
 * deterministic minimal poster built from the track's title and artist.
 */
export default function Cover({
  cover,
  title,
  artist,
  className,
  compact = false,
}: CoverProps) {
  if (cover) {
    return (
      <img
        src={cover}
        alt={`${title} cover`}
        loading="lazy"
        className={className}
      />
    );
  }

  return (
    <Poster title={title} artist={artist} className={className} compact={compact} />
  );
}
