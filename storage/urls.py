from django.urls import path
from . import views

app_name = "storage"
urlpatterns = [
    path("", views.index, name="index"),
    path("items/", views.items, name="items"),
    path("item/<int:item_id>/", views.item, name="item"),
    path("categories/", views.categories, name="categories"),
    path("category/<int:category_id>/", views.category, name="category"),
]
