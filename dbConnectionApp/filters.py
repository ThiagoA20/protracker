import django_filters
from django_filters import DateFilter, CharFilter

from .models import *

class PointFilter(django_filters.FilterSet):
    # name = CharFilter(field_name="name", lookup_expr="icontains")

    class Meta:
        model = Locality
        fields = '__all__'
        # exclude = ['field_example']

