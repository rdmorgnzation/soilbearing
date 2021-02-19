from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.http import HttpResponseNotFound
from shapely.geometry import LineString, Polygon
import geopandas as gpd
import json

from . import resources

#Return small geojson for district
@api_view()
def get_district_polygon(request):
    data = gpd.read_file("zip://"+str(resources.media_path() / "nepal_districts.zip"))
    if not 'district' in request.GET:
        return HttpResponseNotFound("District required in request")
    district = request.GET['district'].title()
    #no of sampled points
    npos = request.GET.get('npos','notadigit')
    if npos.isdigit():
        npos = int(npos)
    else:
        npos=600
    district_data = data[data['DIST_EN']==district]
    if district_data.first_valid_index() is None:
        return HttpResponseNotFound("District not found")
    coords=district_data.boundary[district_data.first_valid_index()].xy
    inc = int(len(coords[0])/npos)
    new_points = []
    for i in range(0,len(coords[0]),inc):
        new_points.append((coords[0][i],coords[1][i]))
    linestring = LineString(new_points)
    #lets save the linestring in geojson and return it
    newdata = gpd.GeoDataFrame()
    newdata['geometry'] = None
    newdata.crs = data.crs
    newdata.loc[0, 'geometry'] = Polygon(linestring)
    return JsonResponse(json.loads(newdata.to_json()))

