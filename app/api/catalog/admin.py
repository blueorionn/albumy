from django.contrib import admin
from .models import Album, Artist, Genre, License, Track


class AlbumAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "artist", "is_published")
    list_filter = ("is_published",)
    search_fields = ("title",)


admin.site.register(Album, AlbumAdmin)


class ArtistAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


admin.site.register(Artist, ArtistAdmin)


class GenreAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
    ordering = ("name",)


admin.site.register(Genre, GenreAdmin)


class LicenseAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "requires_attribution")
    list_filter = ("requires_attribution",)
    search_fields = ("name",)


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
    list_filter = ("is_published",)
    search_fields = ("title",)
    list_per_page = 25
    ordering = ("-created_at",)


admin.site.register(Track, TrackAdmin)
