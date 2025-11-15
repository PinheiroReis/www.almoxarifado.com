from django.urls import path
from . import views

app_name = "categories"
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:pk>/", views.details, name="details"),
    path("delete/<int:pk>/", views.delete, name="delete"),
]
