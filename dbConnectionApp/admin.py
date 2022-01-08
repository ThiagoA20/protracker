from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Point, Line, Polygon

@admin.register(Point)
class PointAdmin(OSMGeoAdmin):
    default_lat = 7495000
    default_lon = 1400000
    default_zoom = 12

@admin.register(Line)
class LineAdmin(OSMGeoAdmin):
    default_lat = 7495000
    default_lon = 1400000
    default_zoom = 12

@admin.register(Polygon)
class PolygonAdmin(OSMGeoAdmin):
    default_lat = 7495000
    default_lon = 1400000
    default_zoom = 12