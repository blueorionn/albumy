"""Compose public CDN URLs from bare storage keys."""

from django.conf import settings


def cdn_url(prefix_key: str, filename: str | None) -> str | None:
    """Return the public CDN URL for a media file, or None if unavailable.

    Returns None when the filename is empty/missing
    or when no CDN domain is configured (e.g. local dev
    without the env var) — a missing URL should degrade, not crash.
    """
    filename = (filename or "").strip()
    if not filename or not settings.CDN_DOMAIN:
        return None
    prefix = settings.MEDIA_PREFIXES[prefix_key]
    return f"https://{settings.CDN_DOMAIN}/{prefix}/{filename}"
