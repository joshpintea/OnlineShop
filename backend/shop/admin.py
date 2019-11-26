from django.contrib import admin
from shop.models import Song, Album, Cart, Order
from shop.models import AlbumToCart


admin.site.register(Song)
admin.site.register(Album)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(AlbumToCart)
