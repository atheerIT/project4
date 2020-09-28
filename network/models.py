from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    post = models.CharField(max_length=500, blank=False)
    image = models.ImageField(upload_to="postImage", null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='geek')
    date = models.CharField(max_length=64, blank=False, default="2020-09-29: now")
    like = models.IntegerField(default=0, blank=False)

class Comment(models.Model):
    comment = models.CharField(max_length=500, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commentUser')
    post = models.ManyToManyField(Post, blank=True, related_name='postComments')