from django.shortcuts import render

from .models import ItemCategory, Item


def index(request):
    categories_list = ItemCategory.objects.order_by("-name")
    items_list = Item.objects.order_by("-category")
    context = {"categories_list": categories_list, "items_list": items_list}

    return render(request, "storage/index.html", context)


def items(request):
    return HttpResponse("Hello! You're looking at items")


def item(request, item_id):
    return HttpResponse(f"Hello! You're looking at item number {item_id}")


def categories(request):
    return HttpResponse("Hello! You're looking at categories")


def category(request, category_id):
    return HttpResponse(f"Hello! You're looking at category number {category_id}")
