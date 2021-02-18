from django.http import JsonResponse
from rest_framework.decorators import api_view

#Returns lat long

@api_view()
def geocode(request):
    config={'mapFiles': '100,100'}
    return JsonResponse(config)
