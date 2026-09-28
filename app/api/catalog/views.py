from rest_framework import viewsets

from .models import Artist, Genre, License, Track
from .serializers import (
    ArtistSerializer,
    GenreSerializer,
    LicenseSerializer,
    TrackSerializer,
)


class ArtistViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing Artists.
    """

    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class GenreViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing Genres.
    """

    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class LicenseViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing Licenses.
    """

    queryset = License.objects.all()
    serializer_class = LicenseSerializer


class TrackViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing Tracks.
    """

    queryset = (
        Track.objects.filter(is_published=True)
        .select_related("artist", "license")
        .prefetch_related("genres")
    )
    serializer_class = TrackSerializer
