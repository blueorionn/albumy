"""Seed the catalog with demo data.

Usage:
    python manage.py seed_catalog           # create missing records only
    python manage.py seed_catalog --fresh   # wipe catalog tables first

Licenses and genres are real reference data; artists, albums and tracks are
fictional (no rights issues). A fixed random seed keeps runs reproducible.
"""

import random
from datetime import date, timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from catalog.models import Album, Artist, Genre, License, Track, generate_unique_slug

LICENSES = [
    (
        "CC0 1.0",
        "https://creativecommons.org/publicdomain/zero/1.0/",
        False,
        "No rights reserved. Free to use for any purpose, no attribution required.",
    ),
    (
        "CC BY 4.0",
        "https://creativecommons.org/licenses/by/4.0/",
        True,
        "Free to use for any purpose, attribution required.",
    ),
    (
        "CC BY-SA 4.0",
        "https://creativecommons.org/licenses/by-sa/4.0/",
        True,
        "Free to use with attribution; derivatives must use the same license.",
    ),
    (
        "CC BY-NC 4.0",
        "https://creativecommons.org/licenses/by-nc/4.0/",
        True,
        "Free to use non-commercially with attribution.",
    ),
]
# License weights for random assignment: mostly permissive, like a real
# copyright-free library would be.
LICENSE_WEIGHTS = [45, 40, 10, 5]

GENRES = [
    "Ambient",
    "Chill",
    "Classical",
    "Drum & Bass",
    "Electronic",
    "Hip-Hop",
    "House",
    "Jazz",
    "Lo-Fi Hip-Hop",
    "Pop",
    "Rock",
    "Synthwave",
    "Techno",
    "Trap",
]

# name -> (bio, dob, genres)
ARTISTS = [
    (
        "Neon Drift",
        "Synthwave producer from Lisbon chasing 1985 through analog synths.",
        date(1991, 6, 3),
        ["Synthwave", "Electronic"],
    ),
    (
        "Kaya Sound",
        "Lo-fi beatmaker; tape hiss is a feature, not a bug.",
        None,
        ["Lo-Fi Hip-Hop", "Chill"],
    ),
    (
        "Static Bloom",
        "Ambient electronics built from field recordings and granular textures.",
        date(1988, 11, 17),
        ["Electronic", "Ambient"],
    ),
    (
        "Miro Lake",
        "Pianist and composer blending minimalism with ambient noise.",
        None,
        ["Ambient", "Classical"],
    ),
    (
        "Bitwave Collective",
        "A rotating crew of house and DnB producers.",
        None,
        ["House", "Drum & Bass"],
    ),
    (
        "Luna Vale",
        "Dream-pop songwriter for slow evenings.",
        date(1996, 2, 28),
        ["Pop", "Chill"],
    ),
    (
        "Otto Gray",
        "Jazz guitarist sampling dusty records.",
        None,
        ["Jazz", "Lo-Fi Hip-Hop"],
    ),
    (
        "Vela Nine",
        "Techno engineer; hypnotic loops, relentless kick drums.",
        None,
        ["Techno", "Electronic"],
    ),
    (
        "Rue Mirage",
        "Hip-hop producer with a taste for vintage soul samples.",
        None,
        ["Hip-Hop", "Trap"],
    ),
    (
        "Juno Theory",
        "Indie rock four-piece that never met a chorus they didn't like.",
        None,
        ["Rock", "Pop"],
    ),
]

# title, artist, genres, album_type, release_date, tracks
ALBUMS = [
    (
        "Midnight Circuit",
        "Neon Drift",
        ["Synthwave", "Electronic"],
        "album",
        date(2025, 6, 13),
        [
            "Chrome Heart",
            "Midnight Circuit",
            "Neon Rain",
            "Afterhour Drive",
            "Signal Lost",
            "Turbo Dusk",
        ],
    ),
    (
        "Paper Rooms",
        "Kaya Sound",
        ["Lo-Fi Hip-Hop", "Chill"],
        "ep",
        date(2026, 1, 30),
        [
            "Paper Rooms",
            "Sunday Static",
            "Cold Coffee",
            "Window Seat",
            "Paper Rooms (Instrumental)",
        ],
    ),
    (
        "Tidal Static",
        "Static Bloom",
        ["Electronic", "Ambient"],
        "album",
        date(2025, 11, 2),
        [
            "Undertow",
            "Tidal Static",
            "Floodplain",
            "Salt Air",
            "Driftglass",
            "Ebb",
            "Undertow (Instrumental)",
        ],
    ),
    (
        "Northbound",
        "Miro Lake",
        ["Ambient", "Classical"],
        "ep",
        date(2024, 9, 21),
        ["First Light", "Northbound", "Pine & Snow", "Harbor"],
    ),
    (
        "Voltage Bloom",
        "Bitwave Collective",
        ["House", "Drum & Bass"],
        "album",
        date(2026, 3, 14),
        [
            "Voltage Bloom",
            "Circuitry",
            "Overclock",
            "Mainline",
            "Bright Machines",
            "Halfstep",
        ],
    ),
    (
        "Afterglow",
        "Luna Vale",
        ["Chill", "Pop"],
        "ep",
        date(2026, 5, 8),
        ["Afterglow", "Slow Tide", "Golden Hour", "Call It Even"],
    ),
]

# title, artist, genres, is_instrumental
SINGLES = [
    ("Gravity Test", "Vela Nine", ["Techno", "Electronic"], False),
    ("Painted Static", "Static Bloom", ["Ambient"], False),
    ("Late Checkout", "Otto Gray", ["Jazz", "Lo-Fi Hip-Hop"], False),
    ("Sunroom", "Kaya Sound", ["Chill"], False),
    ("Grid Runner", "Neon Drift", ["Synthwave"], False),
    ("Hold The Line", "Rue Mirage", ["Hip-Hop", "Trap"], False),
    ("Blue Hour", "Luna Vale", ["Pop", "Chill"], False),
    ("Signal Chain", "Bitwave Collective", ["House"], False),
    ("Winter Mall", "Juno Theory", ["Rock", "Pop"], False),
    ("Terrace", "Miro Lake", ["Ambient"], False),
    ("Overnight", "Vela Nine", ["Techno"], True),
    ("Pocket Change", "Rue Mirage", ["Hip-Hop"], True),
]


class Command(BaseCommand):
    help = "Seed the catalog with demo data."

    def add_arguments(self, parser):
        parser.add_argument(
            "--fresh",
            action="store_true",
            help="Delete existing catalog data before seeding.",
        )

    def handle(self, *args, **options):
        random.seed(42)

        if options["fresh"]:
            # FK-safe order: tracks reference everything, so they go first.
            Track.objects.all().delete()
            Album.objects.all().delete()
            Artist.objects.all().delete()
            Genre.objects.all().delete()
            License.objects.all().delete()
            self.stdout.write("Wiped existing catalog data.")

        licenses = self._seed_licenses()
        genres = self._seed_genres()
        artists = self._seed_artists()

        track_count = 0
        for (
            title,
            artist_name,
            album_genres,
            album_type,
            release_date,
            titles,
        ) in ALBUMS:
            album = self._seed_album(
                title,
                artists[artist_name],
                album_type,
                release_date,
                [genres[g] for g in album_genres],
            )
            for number, track_title in enumerate(titles, start=1):
                self._seed_track(
                    track_title,
                    artists[artist_name],
                    [genres[g] for g in album_genres],
                    self._pick_license(licenses),
                    album=album,
                    track_number=number,
                    instrumental=track_title.endswith("(Instrumental)"),
                )
                track_count += 1

        for title, artist_name, track_genres, instrumental in SINGLES:
            self._seed_track(
                title,
                artists[artist_name],
                [genres[g] for g in track_genres],
                self._pick_license(licenses),
                instrumental=instrumental,
            )
            track_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded: {License.objects.count()} licenses, {Genre.objects.count()} genres, "
                f"{Artist.objects.count()} artists, {Album.objects.count()} albums, "
                f"{Track.objects.count()} tracks."
            )
        )

    # -- helpers ---------------------------------------------------------

    def _seed_licenses(self):
        out = {}
        for name, url, attribution, description in LICENSES:
            obj, _ = License.objects.get_or_create(
                name=name,
                defaults={
                    "url": url,
                    "requires_attribution": attribution,
                    "description": description,
                },
            )
            out[name] = obj
        return out

    def _seed_genres(self):
        out = {}
        for name in GENRES:
            obj, _ = Genre.objects.get_or_create(name=name)
            out[name] = obj
        return out

    def _seed_artists(self):
        out = {}
        for name, bio, dob, _artist_genres in ARTISTS:
            obj, _ = Artist.objects.get_or_create(
                name=name,
                defaults={
                    "bio": bio,
                    "dob": dob,
                    "avatar": f"{generate_unique_slug(name)}.jpg",
                },
            )
            out[name] = obj
        return out

    def _seed_album(self, title, artist, album_type, release_date, genres):
        album, _ = Album.objects.get_or_create(
            artist=artist,
            title=title,
            defaults={
                "album_type": album_type,
                "release_date": release_date,
                "cover": f"{generate_unique_slug(title)}.jpg",
                "description": f"Demo seed album: {title}.",
                "is_published": True,
            },
        )
        album.genres.set(genres)
        return album

    def _seed_track(
        self,
        title,
        artist,
        genres,
        license_obj,
        album=None,
        track_number=None,
        instrumental=False,
    ):
        duration = random.randint(140, 340)  # seconds
        track, created = Track.objects.get_or_create(
            artist=artist,
            title=title,
            defaults={
                "album": album,
                "track_number": track_number,
                "license": license_obj,
                "audio_file": f"{generate_unique_slug(title)}.mp3",
                "duration_seconds": duration,
                "file_size": duration * 40_000,  # ~320 kbps MP3
                "is_instrumental": instrumental,
                "is_published": random.random() > 0.15,  # ~15% stay drafts
                "play_count": random.randint(0, 60_000),
            },
        )
        if created:
            track.genres.set(genres)
            # auto_now_add stamps "now" on insert; stagger afterwards so
            # "-created_at" ordering (Track.Meta.ordering) shows real variety.
            Track.objects.filter(pk=track.pk).update(
                created_at=timezone.now()
                - timedelta(
                    days=random.randint(0, 120),
                    hours=random.randint(0, 23),
                )
            )
        return track

    def _pick_license(self, licenses):
        names, objects = zip(*licenses.items())
        return random.choices(objects, weights=LICENSE_WEIGHTS, k=1)[0]
