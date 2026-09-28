from rest_framework import serializers

from .media import cdn_url
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

    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Artist
        fields = ["id", "name", "slug", "avatar", "avatar_url"]

    def get_avatar_url(self, obj: Artist) -> str | None:
        return cdn_url("artist_avatar", obj.avatar)


class ArtistSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Artist
        fields = ["id", "name", "slug", "dob", "bio", "avatar", "avatar_url"]
        read_only_fields = ["id", "slug"]

    def get_avatar_url(self, obj: Artist) -> str | None:
        return cdn_url("artist_avatar", obj.avatar)


class TrackSerializer(serializers.ModelSerializer):
    artist = ArtistSummarySerializer(read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    license = LicenseSummarySerializer(read_only=True)
    audio_url = serializers.SerializerMethodField()
    cover_url = serializers.SerializerMethodField()

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
            "cover_url",
            "audio_file",
            "audio_url",
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

    def get_audio_url(self, obj: Track) -> str | None:
        return cdn_url("track_audio", obj.audio_file)

    def get_cover_url(self, obj: Track) -> str | None:
        return cdn_url("track_cover", obj.cover)
