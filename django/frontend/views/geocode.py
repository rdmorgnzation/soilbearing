from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.http import HttpResponseNotFound

from . import resources
from blcalc.geocode import GeoCoder

gcoder = GeoCoder()

#Returns lat long
@api_view()
def geocode(request):
    if not 'location' in request.GET:
        return HttpResponseNotFound("Location required in request")
    location = request.GET['location']
    ret={}
    ret['result'] = gcoder.fetch_geo(location)
    return JsonResponse(ret)
