from django.urls import path
from . import views

urlpatterns = [
    path('', views.base, name='user-home'),
    path('register/', views.register, name='register'),
    path('profile/', views.profile, name='profile'),
]
