from django.shortcuts import HttpResponse


def home(request):
    HttpResponse("Hello, World!")
