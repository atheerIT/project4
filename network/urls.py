
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('newPost', views.newPost, name='newPost'),
    path('profile/<str:profileUser>', views.profile, name='profile'),
    path('follow/<str:profileUser>', views.editFollow, name='editFollow'),
    path('following', views.following, name='following'),
    path('editPost', views.editPost, name='editPost'),
    path('isLiked', views.isLiked, name='isLiked'),
    path('like', views.like, name='like')
]
