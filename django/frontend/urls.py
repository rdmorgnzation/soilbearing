from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("datap/", views.data_list_posting),
    path("dataq/", views.data_list_query),
]
