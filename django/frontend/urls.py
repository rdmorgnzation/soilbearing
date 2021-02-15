from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("file_upload", views.file_upload),
    path("get_preview", views.get_preview),
    path("get_result", views.get_result),
]
