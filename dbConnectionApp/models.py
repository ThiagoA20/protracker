from django.db import models
from django.contrib.postgres.operations import CreateExtension
from django.db import migrations
from django.contrib.gis.db.models import PointField, LineStringField, PolygonField


class Migration(migrations.Migration):

    operations = [
        CreateExtension('postgis'),
        ...
    ]


class Point(models.Model):
    name = models.CharField(max_length=150)
    parentID = models.CharField(max_length=150)
    point = PointField()
    date = models.DateTimeField()

    @property
    def lat_lng(self):
        return list(getattr(self.point, 'coords', [])[::-1])

    def __str__(self):
        return self.name


class Line(models.Model):
    name = models.CharField(max_length=150)
    parentID = models.CharField(max_length=150)
    points = LineStringField()
    date = models.DateTimeField()

    def __str__(self):
        return self.name


class Polygon(models.Model):
    name = models.CharField(max_length=150)
    parentID = models.CharField(max_length=150)
    polygon = PolygonField()
    date = models.DateTimeField()

    def __str__(self):
        return self.name