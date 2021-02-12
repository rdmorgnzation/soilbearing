from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("file_upload", views.file_upload),
    #path("datap/", views.data_list_posting),
    #path("dataq/", views.data_list_query),
]
