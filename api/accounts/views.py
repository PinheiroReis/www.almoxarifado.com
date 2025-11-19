from django.contrib.auth.models import Group, User
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions


from .serializers import GroupSerializer, UserSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]


class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by("name")
    serializer_class = GroupSerializer
