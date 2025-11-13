from django.shortcuts import render, HttpResponse


def home(request):
    HttpResponse("Hello, World!")
