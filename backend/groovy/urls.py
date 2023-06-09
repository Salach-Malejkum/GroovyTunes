"""groovy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from groovytunes import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/users/rest/', include('users.api.urls')),
    path('search/', views.search, name='search'),
    path('search/<str:query>/', views.search_result, name='search_result'), # argument type might be changed
    path('api/playlist', views.playlist_list, name='playlist_list'),
    path('api/playlist/<int:id>', views.playlist_details, name='playlist_details'),
    path('api/user', views.user_list, name='user_list'),
    path('api/user/<int:id>', views.user_details, name='user_details'),
    path('api/comment', views.comment_playlist, name='comment_playlist'),
    path('api/comment/<int:id>', views.comment_details, name='comment_details'),
    path('api/playlist/comments/<int:p_id>', views.playlist_comments, name='playlist_comments'),
    path('api/rate_playlist', views.rate_playlist, name='rate_playlist'),
    path('api/playlist_rating/<int:p_id>/<int:u_id>', views.playlist_rating, name='playlist_rating'),
    path('api/user/playlists/<int:u_id>', views.user_playlists, name='user_playlists'),
]
