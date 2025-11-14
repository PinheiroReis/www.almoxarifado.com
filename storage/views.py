from django.shortcuts import HttpResponse


def index(request):
    return HttpResponse("Hello, World! You're on storage index page")
