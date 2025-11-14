from django.shortcuts import render, get_object_or_404
from django.http import Http404

from .models import ItemCategory, Item


def index(request):
    categories = ItemCategory.objects.order_by("-name")
    items = Item.objects.order_by("-category")
    context = {"categories": categories, "items": items}

    return render(request, "storage/index.html", context)


def items(request):
    items = list(Item.objects.order_by("-pub_date"))
    if not items:
        raise Http404("No Item matches the given query.")

    return render(request, "storage/items.html", {"items": items})


def item(request, item_id):
    item = get_object_or_404(Item, pk=item_id)

    return render(request, "storage/item.html", {"item": item})


def categories(request):
    categories = list(ItemCategory.objects.order_by("-name"))
    if not categories:
        raise Http404("No ItemCategory matches the given query.")

    return render(request, "storage/categories.html", {"categories": categories})


def category(request, category_id):
    category = get_object_or_404(ItemCategory, pk=category_id)

    return render(request, "storage/category.html", {"category": category})
