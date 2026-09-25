"""Helpers that turn environment variables into validated Django settings values."""

import os
import re
from urllib.parse import urlparse


def parse_postgres_database_url():
    """Build a Django database setting from the ``DB_CONNECTION_URL`` env variable."""

    url = os.environ.get("DB_CONNECTION_URL", "").strip()

    if not url:
        raise ValueError(
            "The URL connection string cannot be empty or contain only whitespace."
        )

    try:
        conn = urlparse(url)

        # Validate database type
        if conn.scheme not in ("postgresql", "postgres"):
            raise ValueError(
                f"Unsupported database URL scheme: '{conn.scheme}'. "
                "Expected 'postgresql://' or 'postgres://'."
            )

        # Validate required PostgreSQL components
        if not conn.path or conn.path == "/":
            raise ValueError(
                "PostgreSQL database name is missing from DB_CONNECTION_URL."
            )

        if not conn.hostname:
            raise ValueError("PostgreSQL host is missing from DB_CONNECTION_URL.")

        return {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": conn.path.lstrip("/"),
            "USER": conn.username,
            "PASSWORD": conn.password,
            "HOST": conn.hostname,
            "PORT": conn.port,
        }
    except ValueError:
        raise
    except Exception as e:
        raise ValueError(f"Invalid database connection URL: {e}") from e


def is_valid_hostname(hostname: str) -> bool:
    """Check whether ``hostname`` is a valid hostname or subdomain wildcard."""

    if not hostname or len(hostname) > 255:
        return False

    if hostname.endswith("."):
        hostname = hostname[:-1]

    labels = hostname.split(".")

    # Allow one leading "*" as a subdomain wildcard (e.g. "*.example.com"),
    # but never a bare "*" or a "*" in any other position.
    if labels[0] == "*":
        labels = labels[1:]
        if not labels:
            return False

    # - (?!-) ensures label doesn't start with a hyphen
    # - (?<!-) ensures label doesn't end with a hyphen
    label_pattern = re.compile(r"^(?!-)[A-Z\d-]{1,63}(?<!-)$", re.IGNORECASE)

    return all(label_pattern.match(label) for label in labels)


def validate_hostname(hosts: list[str]):
    """Validate a list of hostnames as a unit, e.g. ``ALLOWED_HOSTS``."""

    invalid = [host for host in hosts if not is_valid_hostname(host)]
    if invalid:
        raise ValueError(
            f"Invalid hostname(s): {', '.join(repr(host) for host in invalid)}"
        )
    return hosts


def validate_csrf_origins(origins: list[str]) -> list[str]:
    """Validate CSRF_TRUSTED_ORIGINS entries, e.g. ``DJANGO_CSRF_TRUSTED_ORIGINS``"""
    invalid = [
        origin for origin in origins if not origin.startswith(("http://", "https://"))
    ]
    if invalid:
        raise ValueError(
            "CSRF origins must include a scheme, e.g. https://api.example.com: "
            f"{', '.join(repr(origin) for origin in invalid)}"
        )

    return origins
