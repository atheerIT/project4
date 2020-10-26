from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from datetime import datetime
from django.core.paginator import Paginator

from .models import User, Post, UserFollow, UserLikes


def index(request):
    posts = Post.objects.all().order_by('-id')
    paginator = Paginator(posts, 2)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "network/index.html", {
        'page_obj': page_obj,
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        avatar = request.FILES.get("userPhoto", None)

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password, avatar= avatar)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def newPost(request):
    if request.method =='POST':
        post = request.POST['newPost']
        img = request.FILES.get('image')
        now = datetime.now()
        if not img:
            img = None
        user = request.user
        newPost = Post(post=post, image=img, user=user, date= now)
        newPost.save()
        return HttpResponseRedirect(reverse('index'))

def profile(request, profileUser):
    user1 = User.objects.get(username=profileUser)
    following= user1.following.all().count()
    followers = user1.followres.all().count()
    if request.user.is_authenticated:
        isFollowed= request.user.following.filter(following=user1.id).exists()
    else:
        isFollowed=False
    posts = user1.geek.all().order_by('-id')
    if request.user.id == user1.id:
        owner = True
    else:
        owner = False
    return render(request, 'network/profile.html', {
        'user1': user1,
        'following': following,
        'followers': followers,
        'posts': posts,
        'owner': owner,
        'isFollowed': isFollowed,
    })

def editFollow(request, profileUser):
    follower = User.objects.get(pk=request.user.id)
    profileUser = User.objects.get(username=profileUser)
    print(profileUser)
    if follower.following.filter(following=profileUser).exists():
        follower.following.filter(following=profileUser).delete()
    else:
        UserFollow.objects.create(follower=follower, following=profileUser) 
    return HttpResponseRedirect(reverse('profile', args=(profileUser,)))

def following(request):
    follows = request.user.following.all()
    users = User.objects.filter(followres__in=follows)
    posts = Post.objects.filter(user__in=users).order_by('-date')
    paginator = Paginator(posts, 2)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "network/index.html", {
        'page_obj': page_obj,
    })

def editPost(request):
    post = Post.objects.get(pk=request.GET['id'])
    post.post = request.GET['newPost']
    post.save()
    return JsonResponse({
        'response': 'true',
        'post':post.post
        })

def like(request):
    post = Post.objects.get(pk=request.GET['id'])
    if post.likedPosts.filter(user=request.user).exists():
        post.likedPosts.filter(user=request.user).delete()
        post.postLike = post.postLike -1
        if post.postLike < 0:
            post.postLike = 0
        post.save()
        return JsonResponse({
            'likes':post.postLike
        })
    else:
        UserLikes.objects.create(user=request.user, post=post)
        post.postLike= post.postLike +1
        post.save()
        return JsonResponse({
            'likes':post.postLike
        })

def isLiked(request):
    post = Post.objects.get(pk=request.GET['id'])
    if post.likedPosts.filter(user=request.user).exists():
        return JsonResponse({
            'isLiked': True,
        })
    else:
        return JsonResponse({
            'isLiked': False,
        })