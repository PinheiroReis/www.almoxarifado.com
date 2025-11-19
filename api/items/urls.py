from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"items", views.ItemViewSet, basename='item')
router.register(r"movements", views.StockMovementViewSet, basename='stockmovement')

urlpatterns = [
    path("", include(router.urls)),
]
