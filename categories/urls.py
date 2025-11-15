from django.urls import path
from . import views

app_name = "categories"
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:category_id>/", views.details, name="details"),
    path("delete/<int:category_id>/", views.delete, name="delete"),
]
