from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

import os


class Song(models.Model):
    artist_name = models.CharField(max_length=100, default="Guta")
    title = models.CharField(max_length=100, null=False)
    length = models.FloatField()

    def __str__(self):
        return '%s %s' % (self.title, self.artist_name)


def get_image_path(instance, filename):
    return os.path.join(settings.MEDIA_ROOT, 'albums_image', filename)


ALBUM_CHOICES = (
    ('cd', 'CD'),
    ('vinil', 'VINIL')
)


class Album(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    songs = models.ManyToManyField(Song)
    description = models.CharField(max_length=1000, default="Hello")
    album_type = models.CharField(max_length=200, choices=ALBUM_CHOICES, default=ALBUM_CHOICES[0])
    album_image = models.ImageField(upload_to=get_image_path, default=os.path.join(settings.MEDIA_ROOT, 'albums_image', 'default.jpg'))

    def __str__(self):
        return '%s' % self.title


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)


class AlbumToCart(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
    cart = models.ForeignKey(Cart, related_name='albums_and_quantity', on_delete=models.CASCADE, default=None)

    def __str__(self):
        return '%s - %s' % (self.quantity, self.album.title)


class Order(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    date = models.DateTimeField()
