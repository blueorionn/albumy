/**
 * Deterministic minimal poster covers.
 *
 * Until the S3/CloudFront pipeline ships real artwork, every track gets a
 * poster generated from its own title and artist: a curated muted palette
 * and one of three layouts (italic initial, soundwave bars, disc ring),
 * chosen by a stable hash — same track, same poster, every render.
 */

const PALETTES = [
  { bg: '#e9e5d8', ink: '#20221c', sub: '#6f6d60' }, // paper
  { bg: '#39422f', ink: '#eef1e4', sub: '#a9b39a' }, // olive
  { bg: '#2e3742', ink: '#e8edf4', sub: '#93a1b4' }, // slate
  { bg: '#4a3a35', ink: '#f3e9e2', sub: '#c2a596' }, // umber
  { bg: '#23261e', ink: '#c4f52d', sub: '#8a937a' }, // charcoal + lime
  { bg: '#8d9a85', ink: '#1f2419', sub: '#3d4534' }, // sage
] as const

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

interface PosterProps {
  title: string
  artist: string
  className?: string
  /** Small sizes (player thumbnail, list rows) drop the text label. */
  compact?: boolean
}

export default function Poster({
  title,
  artist,
  className,
  compact = false,
}: PosterProps) {
  const hash = hashString(`${title} ${artist}`)
  const palette = PALETTES[hash % PALETTES.length]
  const variant = hash % 3
  const initial = title.charAt(0).toUpperCase()
  const label = artist.length > 14 ? `${artist.slice(0, 13)}…` : artist

  return (
    <svg
      className={className}
      viewBox='0 0 100 100'
      role='img'
      aria-label={`${title} by ${artist} cover`}
    >
      <rect width='100' height='100' fill={palette.bg} />

      {variant === 0 && (
        <>
          <text
            x='50'
            y='50'
            textAnchor='middle'
            dominantBaseline='central'
            fontFamily="Georgia, 'Times New Roman', serif"
            fontStyle='italic'
            fontSize={compact ? 58 : 48}
            fill={palette.ink}
          >
            {initial}
          </text>
          {!compact && (
            <text
              x='9'
              y='90'
              fontSize='6'
              letterSpacing='1.4'
              fill={palette.sub}
            >
              {label.toUpperCase()}
            </text>
          )}
        </>
      )}

      {variant === 1 && (
        <>
          {!compact && (
            <text
              x='9'
              y='16'
              fontSize='6'
              letterSpacing='1.4'
              fill={palette.sub}
            >
              {label.toUpperCase()}
            </text>
          )}
          {Array.from({ length: 5 }, (_, i) => {
            const height = 16 + ((hash >> (i * 3)) % 38)
            const opacity = 0.55 + ((hash >> i) % 4) * 0.15
            return (
              <rect
                key={i}
                x={21 + i * 13}
                y={78 - height}
                width='6'
                height={height}
                rx='1'
                fill={palette.ink}
                opacity={opacity}
              />
            )
          })}
        </>
      )}

      {variant === 2 && (
        <>
          <circle
            cx='50'
            cy={compact ? 50 : 46}
            r={compact ? 20 : 22}
            fill='none'
            stroke={palette.ink}
            strokeWidth='1.4'
          />
          <circle cx='50' cy={compact ? 50 : 46} r='2.6' fill={palette.ink} />
          {!compact && (
            <text
              x='9'
              y='90'
              fontSize='6'
              letterSpacing='1.4'
              fill={palette.sub}
            >
              {label.toUpperCase()}
            </text>
          )}
        </>
      )}
    </svg>
  )
}
