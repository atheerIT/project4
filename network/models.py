from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Post(models.Model):
    post = models.CharField(max_length=500, blank=False)
    image = models.ImageField(upload_to="postImage", null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='geek')
    date = models.DateTimeField(blank=False)
    postLike = models.IntegerField(default=0)

class UserFollow(models.Model):
    follower = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE, default=None)
    following = models.ForeignKey(User, related_name='followres', on_delete=models.CASCADE, default=None)


class UserLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liker')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likedPosts')
    