"""Utility functions"""

import os
from urllib.parse import urlparse


def parse_postgres_database_url():
    url = os.environ.get("DB_CONN_URL", "").strip()

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
            raise ValueError("PostgreSQL database name is missing from DB_CONN_URL.")

        if not conn.hostname:
            raise ValueError("PostgreSQL host is missing from DB_CONN_URL.")

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
