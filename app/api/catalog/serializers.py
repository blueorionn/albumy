from rest_framework import serializers

from .models import Genre, License, Artist, Track


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name", "slug"]


class LicenseSummarySerializer(serializers.ModelSerializer):
    """License facts a client needs to attribute a track correctly."""

    class Meta:
        model = License
        fields = ["id", "name", "requires_attribution", "url"]


class LicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = License
        fields = ["id", "name", "slug", "url", "requires_attribution", "description"]
        read_only_fields = ["id", "slug"]


class ArtistSummarySerializer(serializers.ModelSerializer):
    """Compact artist data nested inside track payloads."""

    class Meta:
        model = Artist
        fields = ["id", "name", "slug", "avatar"]


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ["id", "name", "slug", "dob", "bio", "avatar"]
        read_only_fields = ["id", "slug"]


class TrackSerializer(serializers.ModelSerializer):
    artist = ArtistSummarySerializer(read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    license = LicenseSummarySerializer(read_only=True)

    class Meta:
        model = Track
        fields = [
            "id",
            "title",
            "slug",
            "artist",
            "genres",
            "license",
            "cover",
            "audio_file",
            "duration_seconds",
            "file_size",
            "is_instrumental",
            "is_published",
            "is_private",
            "play_count",
            "attribution",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]
