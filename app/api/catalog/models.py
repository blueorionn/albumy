import uuid

from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


def generate_unique_slug(text: str) -> str:
    """Slugify text with a random 8-char suffix; capped at 255 chars total."""
    base = slugify(text)[:246]
    return f"{base}-{uuid.uuid4().hex[:8]}"


class Artist(models.Model):
    """A music artist whose tracks appear in the catalog."""

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(
        max_length=255, verbose_name=_("Artist Name"), null=False, blank=False
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        editable=False,
        help_text=_("Auto-generated from the name with a random suffix."),
    )
    dob = models.DateField(null=True, blank=True, verbose_name=_("Date of Birth"))
    bio = models.TextField(blank=True)
    avatar = models.CharField(
        max_length=255,
        blank=True,
        default="avatar-1bs02488.jpg",
        verbose_name=_("Avatar"),
        help_text=_("A visual icon representing artist"),
    )

    class Meta:
        ordering = ["name"]
        verbose_name = _("artist")
        verbose_name_plural = _("artists")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self.name)
        super().save(*args, **kwargs)


class Genre(models.Model):
    """A music genre (e.g., Jazz, Lofi Hip-Hop, Drum & Bass)."""

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(
        max_length=255,
        unique=True,
        help_text=_("Enter the genre name (e.g., Jazz, Lofi Hip-Hop)"),
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        editable=False,
        help_text=_("Auto-generated from the name with a random suffix."),
    )

    class Meta:
        ordering = ["name"]
        verbose_name = _("genre")
        verbose_name_plural = _("genres")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self.name)
        super().save(*args, **kwargs)


class License(models.Model):
    """The copyright license a track is published under (e.g., CC0 1.0, CC BY 4.0)."""

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name=_("License Name"),
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        editable=False,
        help_text=_("Auto-generated from the name with a random suffix."),
    )
    url = models.URLField(
        null=True,
        blank=True,
        verbose_name=_("License URL"),
        help_text=_("Canonical web page with the legal text of the license."),
    )
    requires_attribution = models.BooleanField(
        default=True,
        verbose_name=_("Requires attribution"),
        help_text=_("If true, users must credit the artist when using the track."),
    )
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name = _("license")
        verbose_name_plural = _("licenses")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self.name)
        super().save(*args, **kwargs)


class Track(models.Model):
    """A single song: the audio file plus its catalog and licensing data."""

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(
        max_length=255, verbose_name=_("Track Title"), null=False, blank=False
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        editable=False,
        help_text=_("Auto-generated from the title with a random suffix."),
    )
    artist = models.ForeignKey(
        "Artist", on_delete=models.PROTECT, related_name="tracks"
    )
    genres = models.ManyToManyField("Genre", blank=False, related_name="tracks")
    license = models.ForeignKey(
        "License", on_delete=models.PROTECT, related_name="tracks"
    )
    cover = models.CharField(
        max_length=255,
        blank=True,
        default="cover-1bs02488.jpg",
        verbose_name=_("Cover art"),
    )
    audio_file = models.CharField(
        max_length=255,
        null=False,
        verbose_name=_("Audio file"),
        help_text=_(
            "Filename only (storage key); URLs are composed from CDN settings."
        ),
    )
    duration_seconds = models.PositiveIntegerField(
        null=False, blank=False, verbose_name=_("Duration (s)")
    )
    file_size = models.PositiveBigIntegerField(
        null=False, blank=False, verbose_name=_("File size (bytes)")
    )
    is_instrumental = models.BooleanField(default=False, verbose_name=_("Instrumental"))
    is_published = models.BooleanField(default=False, verbose_name=_("Published"))
    is_private = models.BooleanField(default=False, verbose_name=_("Private Track"))
    play_count = models.PositiveBigIntegerField(default=0, verbose_name=_("Plays"))
    attribution = models.TextField(
        blank=True,
        verbose_name=_("Attribution"),
        help_text=_("Must credit the artist when using the track."),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = _("track")
        verbose_name_plural = _("tracks")

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self.title)
        super().save(*args, **kwargs)
