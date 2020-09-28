from .models import data
from rest_framework import viewsets, permissions
from .serialzers import showsSerializer


class showsViewSet(viewsets.ModelViewSet):
    queryset = data.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = showsSerializer