import type { Album, Track } from "../types";

/**
 * Demo data in the spirit of the backend's `seed_catalog` command:
 * fictional artists and titles, real genre names. Covers are empty so the
 * shared placeholder artwork renders; set `cover` to a CDN URL once the
 * storage pipeline exists and it will be used instead.
 */

export const TRACKS: Track[] = [
  { id: "t-1", title: "Neon Run", artist: "Neon Drift", duration: 222, cover: "" },
  { id: "t-2", title: "Midnight Arcade", artist: "Neon Drift", duration: 258, cover: "" },
  { id: "t-3", title: "Slow Signal", artist: "Lowlight", duration: 236, cover: "" },
  { id: "t-4", title: "Paper Planes", artist: "Marisol Vega", duration: 201, cover: "" },
  { id: "t-5", title: "Voltage", artist: "Kilowatt Kings", duration: 185, cover: "" },
  { id: "t-6", title: "Dust & Tape", artist: "Lowlight", duration: 168, cover: "" },
  { id: "t-7", title: "Rooftop Blues", artist: "Marisol Vega", duration: 242, cover: "" },
  { id: "t-8", title: "Lace & Static", artist: "Kilowatt Kings", duration: 213, cover: "" },
];

export const FAVOURITES: Track[] = [
  { id: "f-1", title: "Velvet Morning", artist: "Lowlight", duration: 214, cover: "" },
  { id: "f-2", title: "Bloom", artist: "Neon Drift", duration: 195, cover: "" },
  { id: "f-3", title: "High Tide", artist: "The Coastline", duration: 227, cover: "" },
  { id: "f-4", title: "Afterglow", artist: "Marisol Vega", duration: 249, cover: "" },
];

export const ALBUMS: Album[] = [
  {
    id: "alb-1",
    title: "Midnight Arcade",
    slug: "midnight-arcade",
    album_type: "album",
    artist: "Neon Drift",
    genres: ["Synthwave", "Electronic"],
    release_date: "2026-03-14",
    cover: "",
    description: "Analog synths chasing 1985 through neon-lit corridors.",
    is_published: true,
  },
  {
    id: "alb-2",
    title: "Slow Signal",
    slug: "slow-signal",
    album_type: "ep",
    artist: "Lowlight",
    genres: ["Ambient", "Chill"],
    release_date: "2026-01-30",
    cover: "",
    description: "Dusty tape loops for rain against the window.",
    is_published: true,
  },
  {
    id: "alb-3",
    title: "Voltage & Lace",
    slug: "voltage-and-lace",
    album_type: "album",
    artist: "Kilowatt Kings",
    genres: ["Drum & Bass", "Electronic"],
    release_date: "2025-11-08",
    cover: "",
    description: "Breakbeats stitched with silk.",
    is_published: true,
  },
  {
    id: "alb-4",
    title: "Paper Planes Over Lisbon",
    slug: "paper-planes-over-lisbon",
    album_type: "album",
    artist: "Marisol Vega",
    genres: ["Pop", "Jazz"],
    release_date: "2025-10-19",
    cover: "",
    description: "Sun-bleached melodies recorded on a rooftop in Alfama.",
    is_published: true,
  },
  {
    id: "alb-5",
    title: "Coastlines",
    slug: "coastlines",
    album_type: "single",
    artist: "The Coastline",
    genres: ["Chill"],
    release_date: "2025-09-02",
    cover: "",
    description: "A two-sided single for long drives home.",
    is_published: true,
  },
  {
    id: "alb-6",
    title: "Free Culture, Vol. 1",
    slug: "free-culture-vol-1",
    album_type: "compilation",
    artist: "Various Artists",
    genres: ["Electronic", "House"],
    release_date: "2025-08-15",
    cover: "",
    description: "A community compilation of freely licensed club tracks.",
    is_published: true,
  },
  {
    id: "alb-7",
    title: "Rooftop Sessions",
    slug: "rooftop-sessions",
    album_type: "ep",
    artist: "Marisol Vega",
    genres: ["Jazz"],
    release_date: "2025-06-27",
    cover: "",
    description: "Live takes above the Alfama rooftops.",
    is_published: true,
  },
  {
    id: "alb-8",
    title: "Analog Dreams",
    slug: "analog-dreams",
    album_type: "album",
    artist: "Neon Drift",
    genres: ["Synthwave"],
    release_date: "2025-04-11",
    cover: "",
    description: "Tape saturation and midnight drives.",
    is_published: true,
  },
];

export const PLAYLISTS = [
  { name: "Night drive", tracks: 24 },
  { name: "Lo-fi study", tracks: 31 },
  { name: "Deep focus", tracks: 18 },
  { name: "Synth sunset", tracks: 12 },
] as const;

export const TOP_GENRES = [
  {
    number: "01",
    kicker: "Most played this month",
    name: ["Lo-Fi", "Hip-Hop"],
    meta: "18 hours listening time",
    bars: [29, 47, 68, 39, 54],
  },
  {
    number: "02",
    kicker: "Rising with you",
    name: ["Synth", "wave"],
    meta: "11 hours listening time",
    bars: [18, 34, 44, 61, 38],
  },
  {
    number: "03",
    kicker: "Back in rotation",
    name: ["Drum &", "Bass"],
    meta: "7 hours listening time",
    bars: [40, 22, 55, 30, 46],
  },
] as const;
