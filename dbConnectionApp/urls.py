from django.urls import path, include
from .views import *

app_name = 'promol'

urlpatterns = [
    path('', home_page, name="home"),
    
    path('create-point/', createPoint, name="new-points"),
    path('list-points/', readPoints, name="list-points"),
    path('list-points/<date>', readPoints, name="list-points"),
    path('point-update/<str:pk>', updatePoint, name="update-point"),
    path('point-delete/<str:pk>', deletePoint, name="delete-point"),

    path('create-line/', createLine, name="create-line"),
    path('list-lines/', readLines, name="list-lines"),
    path('list-lines/<date>', readLines, name="list-lines"),
    path('line-update/<str:pk>', updateLine, name="update-line"),
    path('line-delete/<str:pk>', deleteLine, name="delete-line"),

    path('create-polygon/', createPolygon, name="create-polygon"),
    path('list-polygons/', readPolygons, name="list-polygons"),
    path('list-polygons/<date>', readPolygons, name="list-polygons"),
    path('polygon-update/<str:pk>', updatePolygon, name="update-polygon"),
    path('polygon-delete/<str:pk>', deletePolygon, name="delete-polygon"),
]