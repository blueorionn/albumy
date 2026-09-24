from django.contrib import admin
from .models import Album, Artist, Genre, License, Track


class AlbumAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "artist", "is_published")


admin.site.register(Album, AlbumAdmin)


class ArtistAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


admin.site.register(Artist, ArtistAdmin)


class GenreAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


admin.site.register(Genre, GenreAdmin)


class LicenseAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "requires_attribution")


admin.site.register(License, LicenseAdmin)


class TrackAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "duration_seconds",
        "file_size",
        "is_published",
        "play_count",
    )


admin.site.register(Track, TrackAdmin)
