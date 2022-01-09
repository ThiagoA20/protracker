from django.shortcuts import render
from .models import Point, Line, Polygon
from .serializers import PointSerializer, LineSerializer, PolygonSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.gis import geos


def save_locality(request):
    if request.method == "POST":
        pass
    else:
        pass


def home_page(request):
    response = render(request, 'home.html')
    return response


@api_view(['POST'])
def createPoint(request):
    point_coords = request.data['point']
    formated_point = geos.Point(float(point_coords[1]), float(point_coords[0]))
    formated_data = {"name": request.data["name"], "parentID": request.data["name"].replace(" ", ""), "point": formated_point, "date": request.data["date"]}

    serializer = PointSerializer(data=formated_data)
    if serializer.is_valid():
        point_name = serializer.validated_data["name"]
        if point_name !=  '':
            point_list = Point.objects.filter(name=point_name)
            if not point_list:
                point = serializer.save()
            else:
                point = point_list[0]
                serializer = PointSerializer(point)
            return Response(serializer.data)
        else:
            return Response(data={'message': 'Empty point name'},
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def readPoints(request, date=""):
    if date == "":
        point = Point.objects.all()
    elif date == "newfirst":
        point = Point.objects.order_by('date')
    else:
        point = Point.objects.order_by('date')[::-1]
    serializer = PointSerializer(point, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def updatePoint(request, pk):
    point = Point.objects.get(name=pk)
    serializer = PointSerializer(instance=point, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deletePoint(request, pk):
    point = Point.objects.get(parentID=pk)
    point.delete()
    return Response(f"{pk} Deleted sucessfully!")


@api_view(['POST'])
def createLine(request):
    formated_line = geos.LineString(request.data["geometry"]['coordinates'])
    formated_data = {"name": request.data["properties"]["name"], "parentID": request.data["properties"]["name"].replace(" ", ""), "points": formated_line, "date": request.data["properties"]["date"]}
    
    serializer = LineSerializer(data=formated_data)
    if serializer.is_valid():
        line_list = Line.objects.filter(name=formated_data["name"])
        if not line_list:
            serializer.save()
        else:
            line = line_list[0]
            serializer = LineSerializer(line)
        return Response(serializer.data)
    else:
        return Response(data={'message': "Can't create line, invalid options"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def readLines(request, date=""):
    if date == "":
        lines = Line.objects.all()
    elif date == "newfirst":
        lines = Line.objects.order_by('date')
    else:
        lines = Line.objects.order_by('date')[::-1]
    serializer = LineSerializer(lines, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def updateLine(request, pk):
    line = Line.objects.get(name=pk)
    serializer = LineSerializer(instance=line, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteLine(request, pk):
    line = Line.objects.get(parentID=pk)
    line.delete()
    return Response(f"{pk} Deleted sucessfully")


@api_view(['POST'])
def createPolygon(request):

    formated_polygon = geos.Polygon(request.data["geometry"]['coordinates'][0])
    formated_data = {"name": request.data["properties"]["name"], "parentID": request.data["properties"]["name"].replace(" ", ""), "polygon": formated_polygon, "date": request.data["properties"]["date"]}
    
    serializer = PolygonSerializer(data=formated_data)
    if serializer.is_valid():
        polygon_list = Polygon.objects.filter(name=formated_data["name"])
        if not polygon_list:
            serializer.save()
        else:
            polygon = polygon_list[0]
            serializer = PolygonSerializer(polygon)
        return Response(serializer.data)
    else:
        return Response(data={'message': "Can't create polygon, invalid options"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def readPolygons(request, date=""):
    if date == "":
        polygons = Polygon.objects.all()
    elif date == "newfirst":
        polygons = Polygon.objects.order_by("date")
    else:
        polygons = Polygon.objects.order_by("date")[::-1]
    serializer = PolygonSerializer(polygons, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def updatePolygon(request, pk):
    polygon = Polygon.objects.get(name=pk)
    serializer = PolygonSerializer(instance=polygon, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deletePolygon(request, pk):
    polygon = Polygon.objects.get(parentID=pk)
    polygon.delete()
    return Response(f"{pk} Deleted sucessfully!")