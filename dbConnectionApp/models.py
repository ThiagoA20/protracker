from django.db import models

class Locality(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    date = models.DateTimeField()

    def __str__(self):
        return self.name
