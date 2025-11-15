from django.shortcuts import render, get_object_or_404
from django.http import Http404, HttpResponseRedirect

from .models import Item


def index(request):
    items = list(Item.objects.order_by("-pub_date"))
    if not items:
        raise Http404("No Item matches the given query.")

    return render(request, "items/index.html", {"items": items})


def details(request, pk):
    item = get_object_or_404(Item, pk=pk)

    return render(request, "items/details.html", {"item": item})


def delete(request, pk):
    obj = get_object_or_404(Item, pk=pk)
    obj.delete()
    return HttpResponseRedirect("items:index", args=(pk))
