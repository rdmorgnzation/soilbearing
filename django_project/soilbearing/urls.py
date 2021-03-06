from django.urls import path
from .views import borehole_calculation
from .views import index_page
from .views import district_shapefile
from .views import config
from .views import geocode

urlpatterns = [
    path("", index_page.index),
    path("file_upload", borehole_calculation.file_upload),
    path("get_preview", borehole_calculation.get_preview),
    path("get_result", borehole_calculation.get_result),
    path("get_district_polygon", district_shapefile.get_district_polygon),
    path("get_config", config.get_config),
    path("geocode", geocode.geocode),
]
