"""Compose public CDN URLs from bare storage keys.

Models store only the object filename (e.g. ``fade-alan-walker.mp3``).
The bucket's folder layout and the CDN domain live in settings
(``MEDIA_PREFIXES`` / ``AWS_CLOUDFRONT_DOMAIN``), so no path is ever
hardcoded on a model and the layout can change via settings alone.
"""

from django.conf import settings


def cdn_url(prefix_key: str, filename: str | None) -> str | None:
    """Return the public CDN URL for a media file, or None if unavailable.

    Returns None when the filename is empty/missing
    or when no CDN domain is configured (e.g. local dev
    without the env var) — a missing URL should degrade, not crash.
    """
    filename = (filename or "").strip()
    if not filename or not settings.AWS_CLOUDFRONT_DOMAIN:
        return None
    prefix = settings.MEDIA_PREFIXES[prefix_key]
    return f"https://{settings.AWS_CLOUDFRONT_DOMAIN}/{prefix}/{filename}"
