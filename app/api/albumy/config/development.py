"""Development Settings"""

import os
from django.core.management.utils import get_random_secret_key

DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

SECRET_KEY = os.environ.get("SECRET_KEY", get_random_secret_key())

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.1/howto/static-files/

STATIC_URL = "static/"
