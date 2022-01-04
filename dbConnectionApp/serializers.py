from .models import Locality
from rest_framework import serializers

class LocalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Locality
        fields = '__all__'