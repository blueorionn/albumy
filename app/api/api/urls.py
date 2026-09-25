"""
URL configuration for global api.
"""

from django.urls import path, include

urlpatterns = [
    path("catalog/", include('catalog.urls')),
]