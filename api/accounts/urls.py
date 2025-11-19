from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)

urlpatterns = [
    path("login/", views.CustomTokenObtainPairView.as_view(), name="login"),
    path("refresh/", views.CustomTokenRefreshView.as_view(), name="refresh"),
    path("", include(router.urls)),
]
