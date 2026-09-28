from rest_framework import routers

from .views import (
    GenreViewSet,
    LicenseViewSet,
    ArtistViewSet,
    TrackViewSet,
)

app_name = "catalog"

router = routers.DefaultRouter()
router.register("genres", GenreViewSet)
router.register("licenses", LicenseViewSet)
router.register("artists", ArtistViewSet)
router.register("tracks", TrackViewSet)

urlpatterns = router.urls
