from django.shortcuts import render
from .models import Locality
from .serializers import LocalitySerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response


def save_locality(request):
    if request.method == "POST":
        pass
    else:
        pass


def home_page(request):
    response = render(request, 'home.html')

    # response.set_cookie("demo-cookie", "testing how cookies works", max_age=2147483647)

    return response

@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'List': '/location-list/',
        'Detail View': '/location-detail/<str:pk>/',
        'Create': '/location-create/',
        'Update': '/location-update/<str:pk>',
        'Delete': '/location-delete/<str:pk>',
    }

    return Response(api_urls)

@api_view(['POST'])
def createLocality(request):
    serializer = LocalitySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def readLocalities(request):
    locality = Locality.objects.all()
    serializer = LocalitySerializer(locality, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def updatePoint(request, pk):
    point = Locality.objects.get(name=pk)
    serializer = LocalitySerializer(instance=point, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deletePoint(request, pk):
    point = Locality.objects.get(name=pk)
    point.delete()
    return Response(f"{pk} Deleted sucessfully!")