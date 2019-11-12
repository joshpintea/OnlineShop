from django.db import models
from django.contrib.auth.models import User


class Song(models.Model):
    artist_name = models.CharField(max_length=100, default="Guta")
    title = models.CharField(max_length=100, null=False)
    length = models.FloatField()

    def __str__(self):
        return '%s %s' % (self.title, self.artist_name)


class Album(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    songs = models.ManyToManyField(Song)

    def __str__(self):
        return '%s' % self.title


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    albums = models.ManyToManyField(Album)


class Order(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    date = models.DateTimeField()
