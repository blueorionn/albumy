from django.urls import path
from rest_framework import routers

from .views import AlbumViewSet

app_name = "catalog"

router = routers.DefaultRouter()
router.register("albums", AlbumViewSet)

urlpatterns = router.urls
