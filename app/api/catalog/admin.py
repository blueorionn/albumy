from django.contrib import admin
from .models import Genre, License, Artist, Track


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


class ArtistAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
    fieldsets = (
        (None, {"fields": ("name", "dob")}),
        ("Avatar & bio", {"fields": ("avatar", "bio")}),
    )


admin.site.register(Artist, ArtistAdmin)


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
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    ("artist", "is_instrumental"),
                )
            },
        ),
        (
            "Media file",
            {"fields": ("audio_file", "cover", ("duration_seconds", "file_size"))},
        ),
        ("Licensing", {"fields": ("license",)}),
        ("Genres", {"fields": ("genres",)}),
        ("Attribution", {"fields": ("attribution",)}),
        (
            "Publication & stats",
            {"fields": ("is_published", "is_private", "play_count")},
        ),
    )


admin.site.register(Track, TrackAdmin)
