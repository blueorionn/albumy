from rest_framework import serializers

from .models import Album, Artist, Genre, License, Track


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "slug",
            "album_type",
            "artist",
            "genres",
            "release_date",
            "cover",
            "description",
            "is_published",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "created_at",
            "updated_at",
        ]


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ["id", "name", "slug", "dob", "bio", "avatar"]
        read_only_fields = ["id", "slug"]


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name", "slug"]
        read_only_fields = ["id", "slug"]


class LicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = License
        fields = ["id", "name", "slug", "url", "requires_attribution", "description"]
        read_only_fields = ["id", "slug"]


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = [
            "id",
            "title",
            "slug",
            "artist",
            "album",
            "track_number",
            "genres",
            "license",
            "audio_file",
            "duration_seconds",
            "file_size",
            "is_instrumental",
            "is_published",
            "play_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]
