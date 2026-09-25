"""Production Settings"""

import os
from albumy.config.env import validate_hostname, validate_csrf_origins

DEBUG = False

ALLOWED_HOSTS = validate_hostname(
    [host.strip() for host in os.environ.get("ALLOWED_HOSTS", "").split(",")]
)

SECRET_KEY = os.environ["SECRET_KEY"]

SECURE_SSL_REDIRECT = True

# TLS terminates at the proxy/load balancer; this header tells Django the
# client's original scheme. The proxy must actually set X-Forwarded-Proto.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Send session and CSRF cookies over HTTPS only.
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Hide the session cookie from JavaScript.
SESSION_COOKIE_HTTPONLY = True
# keep the CSRF cookie readable so the SPA can echo the token in a header.
CSRF_COOKIE_HTTPONLY = False

# HSTS: browsers must use HTTPS for one year, domain-wide.
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Stop browsers from MIME-sniffing responses.
SECURE_CONTENT_TYPE_NOSNIFF = True

# Never allow this site to be embedded in an iframe.
X_FRAME_OPTIONS = "DENY"

# Send the Referer header only for same-origin requests.
SECURE_REFERRER_POLICY = "same-origin"

# Origins allowed to make state-changing requests (POST/PUT/PATCH/DELETE);
# each must include the scheme, e.g. https://albumy.functionbasket.com.
CSRF_TRUSTED_ORIGINS = validate_csrf_origins(
    [
        origin.strip()
        for origin in os.environ["DJANGO_CSRF_TRUSTED_ORIGINS"].split(",")
        if origin.strip()
    ]
)
