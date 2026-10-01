/** Format a duration in seconds as `m:ss` (e.g. 222 -> "3:42"). */
export function formatDuration(seconds: number): string {
  const totalSeconds = Math.floor(seconds)
  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

/** URL-safe slug: "Drum & Bass" -> "drum-and-bass". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
