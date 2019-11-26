from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from shop.models import Album, Song, Cart, Order, AlbumToCart
from shop.pagination import SmallPagesPagination
from shop.serializers import AlbumSerializer, SongSerializer, UserSerializer, CartSerializer, OrderSerializer, \
    AlbumToCartSerializer
from django.contrib.auth.models import User
from django.db.models import Q

import datetime


class SongList(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class SongDetail(generics.RetrieveAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class AlbumList(generics.ListAPIView):
    queryset = Album.objects.all()
    pagination_class = SmallPagesPagination
    serializer_class = AlbumSerializer

    def get_queryset(self):
        queryset = Album.objects.all()
        search_filter = self.request.query_params.get('search', None)
        if search_filter is not None:
            queryset = queryset.filter(Q(description__contains=search_filter) | Q(title__contains=search_filter)
                                       | Q(songs__artist_name__contains=search_filter)).distinct()

        return queryset


class AlbumDetail(generics.RetrieveAPIView):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        pk = self.kwargs['pk']
        obj = get_object_or_404(queryset, pk=pk)
        return obj


@api_view(['GET'])
def get_logged_user(request):
    """
    Return the logged user
    """

    logged_user = request.user
    serializer = UserSerializer(logged_user)
    return Response(serializer.data)


def get_logged_user_cart(user):
    """
        Get active cart of the user
        If he don't have one then a new cart is created.
    """
    carts = Cart.objects.filter(user__id=user.id, active=True)
    if len(carts) == 0:
        cart = Cart(user=user, active=True)
        cart.save()
    else:
        cart = carts[0]

    return cart


@api_view(['GET'])
def get_user_cart(request):
    """
    Get active cart of the logged user
    :param request:
    :return:
    """
    cart = get_logged_user_cart(request.user)
    serializer = CartSerializer(cart)

    return Response(serializer.data)


@api_view(['POST'])
def add_album_to_cart(request):
    """
    Add product to cart for the logged user
    """
    serializer = AlbumToCartSerializer(request.data)

    cart = get_logged_user_cart(request.user)
    album = Album.objects.get(pk=serializer.data['album']['id'])
    album_to_cart = cart.albums_and_quantity.filter(album=album)
    if album_to_cart.count() == 0:
        if serializer.data['quantity'] > 0:
            album_to_cart = AlbumToCart(quantity=serializer.data['quantity'], album=album)
            album_to_cart.save()
            cart.albums_and_quantity.add(album_to_cart)
            cart.save()
    else:
        if serializer.data['quantity'] > 0:
            album_to_cart = album_to_cart[0]
            album_to_cart.quantity = serializer.data['quantity']
            album_to_cart.save()
        else:
            album_to_cart = album_to_cart[0]
            album_to_cart.delete()

    return Response(CartSerializer(cart).data)


@permission_classes([AllowAny])
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['POST'])
def place_order(request):
    """
    Place order with the active cart of the logged user
    Cart will be inactive after
    """

    logged_user = request.user
    cart = get_logged_user_cart(logged_user)
    order = Order(cart=cart, date=datetime.datetime.now())
    order.save()

    cart.active = False
    cart.save()
    serializer = OrderSerializer(order)
    return Response(serializer.data)
