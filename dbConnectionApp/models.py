from django.db import models
from django.contrib.postgres.operations import CreateExtension
from django.db import migrations
from django.contrib.gis.db import models

class Migration(migrations.Migration):

    operations = [
        CreateExtension('postgis'),
        ...
    ]

class Locality(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    date = models.DateTimeField()

    def __str__(self):
        return self.name
