from django.urls import path
from . import views

app_name = "items"
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:item_id>/", views.details, name="details"),
    path("delete/<int:item_id>/", views.delete, name="delete"),
]
