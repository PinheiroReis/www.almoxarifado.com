from django.shortcuts import render
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.urls import reverse
from .models import ItemCategory


def index(request):
    categories = list(ItemCategory.objects.order_by("-name"))
    if not categories:
        raise Http404("No ItemCategory matches the given query.")

    return render(request, "categories/index.html", {"categories": categories})


def details(request, pk):
    category = get_object_or_404(ItemCategory, pk=pk)

    return render(request, "categories/details.html", {"category": category})


def delete(request, pk):
    obj = get_object_or_404(ItemCategory, pk=pk)
    obj.delete()
    return HttpResponseRedirect(reverse("categories:index"))
