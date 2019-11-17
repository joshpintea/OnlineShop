"""shop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.urls import path
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns

from shop import views


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('api/albums/<int:pk>', views.AlbumDetail.as_view()),
    url(r'api/albums/$', views.AlbumList.as_view()),
    url(r'^api/songs/$', views.SongList.as_view()),
    path('api/songs/<int:pk>', views.SongDetail.as_view()),
    url('api/user/logged', views.get_logged_user),
    url('api/user/cart', views.get_user_cart),
    url('api/user/place_order', views.place_order),
    url('api/user/register', views.CreateUser.as_view()),
    url('api/cart/add_album', views.add_album_to_cart),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)