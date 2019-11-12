from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from shop.models import Album, Song, Cart
from shop.serializers import AlbumSerializer, SongSerializer, UserSerializer, CartSerializer
from django.contrib.auth.models import User


class SongList(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class SongDetail(generics.RetrieveAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class AlbumList(generics.ListAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


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

@api_view(['GET'])
def get_user_cart(request):
    """
    Get active cart of the logged user
    :param request:
    :return:
    """

    logged_user = request.user
    carts = Cart.objects.filter(user__id=logged_user.id, active=True)
    if len(carts) == 0:
        cart = Cart(user=logged_user, active=True)
        cart.save()
    else:
        cart = carts[0]

    serializer = CartSerializer(cart)
    return Response(serializer.data)


@permission_classes([AllowAny])
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
