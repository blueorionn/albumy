from rest_framework import routers

from .views import (
    AlbumViewSet,
    ArtistViewSet,
    GenreViewSet,
    LicenseViewSet,
    TrackViewSet,
)

app_name = "catalog"

router = routers.DefaultRouter()
router.register("albums", AlbumViewSet)
router.register("artists", ArtistViewSet)
router.register("genres", GenreViewSet)
router.register("licenses", LicenseViewSet)
router.register("tracks", TrackViewSet)

urlpatterns = router.urls
