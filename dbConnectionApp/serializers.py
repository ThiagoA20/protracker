from .models import Point, Line, Polygon
from rest_framework import serializers

class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
        fields = '__all__'


class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = '__all__'


class PolygonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Polygon
        fields = '__all__'