import { useEffect, useRef, useState } from 'react'
import type { Track } from '../types'

/**
 * Single-source-of-truth player state driven by a detached <audio>
 * element.
 */
export function useAudioPlayer(track: Track | null) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Set from click handlers right before a new track becomes `current`.
  // The effect reads it after load() and starts playback — this keeps
  // play() within the user-gesture activation window.
  const intentPlayRef = useRef(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = 'metadata'
    }
    const audio = audioRef.current

    const onTime = () => setProgress(audio.currentTime)
    const onMeta = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false) // also fires after 'ended'
    const onLoadStart = () => setError(null)
    const onEmptied = () => {
      // load() reset or src removed: reset the whole UI state
      setPlaying(false)
      setProgress(0)
      setDuration(0)
      setError(null)
    }
    const onErr = () => setError('This track failed to load')

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('loadstart', onLoadStart)
    audio.addEventListener('emptied', onEmptied)
    audio.addEventListener('error', onErr)

    // Sync the element with the current track. load() fires 'emptied'
    // (state reset) and 'loadstart' (error clear) — their listeners
    // above update state, so no setState happens here.
    if (track?.audioUrl) {
      audio.src = track.audioUrl
    } else {
      audio.removeAttribute('src')
    }
    audio.load() // also cancels any in-flight chunked request
    if (track?.audioUrl && intentPlayRef.current) {
      intentPlayRef.current = false
      // play() while still loading is fine: playback starts once enough
      // of the first chunk has buffered.
      void audio.play().catch(() => {})
    }

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('loadstart', onLoadStart)
      audio.removeEventListener('emptied', onEmptied)
      audio.removeEventListener('error', onErr)
    }
  }, [track])

  /** Mark autoplay intent — call from a click handler when selecting a
   *  new track (paired with setting that track as `current`). */
  const playNew = () => {
    intentPlayRef.current = true
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || !track?.audioUrl) return
    // State returns via 'play'/'pause' events. A rejected play()
    // (autoplay policy, network) simply never fires 'play', so the
    // UI stays consistent without manual compensation.
    if (audio.paused) {
      void audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  const seek = (seconds: number) => {
    const audio = audioRef.current
    if (audio && Number.isFinite(seconds)) audio.currentTime = seconds
  }

  return { playing, progress, duration, error, toggle, seek, playNew }
}
