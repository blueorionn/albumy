"""
Settings for albumy project.

For the full list of settings and their values, see
https://docs.djangoproject.com/en/6.1/ref/settings/
"""

import os
from pathlib import Path
import dj_database_url
from importlib import import_module

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "catalog",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "albumy.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "albumy.wsgi.application"


# Database
# https://docs.djangoproject.com/en/6.1/ref/settings/#databases

DATABASES = {
    "default": dj_database_url.config(
        conn_max_age=600,
    )
}


# Password validation
# https://docs.djangoproject.com/en/6.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.1/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# Media CDN (S3 + CloudFront)
# Models store bare storage keys (no path); URLs are composed from these.
AWS_CLOUDFRONT_DOMAIN = os.environ.get("AWS_CLOUDFRONT_DOMAIN", "")

MEDIA_PREFIXES = {
    "artist_avatar": "artists/covers",
    "track_cover": "tracks/covers",
    "track_audio": "tracks/tracks",
}


# Django Rest Framework Configuration
# https://www.django-rest-framework.org/api-guide/settings/

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly"
    ],
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 25,
}


# Setting Project Environment

PROJECT_ENVIRONMENT = os.getenv("PROJECT_ENVIRONMENT", "production").lower()

ENVIRONMENT_MODULES = {
    "development": "albumy.config.development",
    "production": "albumy.config.production",
}

try:
    module_name = ENVIRONMENT_MODULES[PROJECT_ENVIRONMENT]
except KeyError:
    raise RuntimeError(
        f"Invalid PROJECT_ENVIRONMENT: {PROJECT_ENVIRONMENT!r}. "
        f"Expected one of: {', '.join(ENVIRONMENT_MODULES)}"
    )

environment_settings = import_module(module_name)

# Import uppercase settings from the environment module
for setting_name in dir(environment_settings):
    if setting_name.isupper():
        globals()[setting_name] = getattr(environment_settings, setting_name)
