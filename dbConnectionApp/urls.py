from django.urls import path, include
from .views import home_page, apiOverview, createLocality, readLocalities, updatePoint, deletePoint

app_name = 'promol'

urlpatterns = [
    path('point-update/<str:pk>', updatePoint, name="update-point"),
    path('point-delete/<str:pk>', deletePoint, name="delete-point"),
    path('', home_page, name="home"),
    path('api/', apiOverview, name="api-overview"),
    path('new-locality/', createLocality, name="new-locality"),
    path('list-locality/', readLocalities, name="list-locality"),
]