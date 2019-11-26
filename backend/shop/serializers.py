from rest_framework import serializers

from django.contrib.auth.models import User
from shop.models import Album, Song, Cart, Order, AlbumToCart


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'artist_name', 'title', 'length']


class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True)

    class Meta:
        model = Album
        fields = ['id', 'title', 'price', 'songs', 'description', 'album_type', 'album_image']


class AlbumToCartSerializer(serializers.ModelSerializer):
    album = AlbumSerializer()

    class Meta:
        model = AlbumToCart
        fields = ['id', 'album', 'quantity']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)

        if 'password' in validated_data:
            user.set_password(raw_password=validated_data['password'])
            user.save()

        return user


class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    albums_and_quantity = AlbumToCartSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['user', 'active', 'albums_and_quantity']


class OrderSerializer(serializers.ModelSerializer):
    cart = CartSerializer()

    class Meta:
        model = Order
        fields = ['date', 'cart']
