from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from rest_framework.decorators import api_view

#import json
#from rest_framework.parsers import JSONParser
#from .models import data
#from rest_framework.response import Response
#from rest_framework import status
#from django.views.decorators.csrf import csrf_exempt
#import io
# Create your views here.
from . import resources
import tempfile
from blcalc.excel_load import BoreholeDataSheets
from blcalc.borehole_parser import BoreholeLog
from blcalc.soilproperty import SoilProperty
from blcalc.material import LayerSoil
from blcalc.footing import Footing, FootingType, FootingData
from blcalc.assembly import Assembly
from blcalc.solver import Solver

#Main page
@api_view()
def index(request):
    return render(request, 'index.html')

#Return parsed excel file to json
@api_view(['POST'])
def file_upload(request):
    loaded_sheets = {}
    uploaded_file = request.FILES['document']
    f = tempfile.TemporaryDirectory()
    fs = FileSystemStorage(location=f.name)
    fs.save(uploaded_file.name, uploaded_file)
    if uploaded_file.name.endswith('xls') or uploaded_file.name.endswith('xlsx'):
        sheets = BoreholeDataSheets.load_file(f.name + '/' + uploaded_file.name)
        #Load all the sheets
        for sheet_key in sheets.keys():
            sheet = sheets[sheet_key]
            borehole_log = BoreholeLog(sheet)
            if borehole_log.values:
                #Save only if values exists
                loaded_sheets[sheet_key] = {
                        'attributes': borehole_log.attributes,
                        'values': borehole_log.values
                    }
        f.cleanup()
    return JsonResponse(loaded_sheets)

def json_material_to_py(data):
    res = []
    for layer in data:
        lay = {}
        for prop in layer:
            if prop=='tableData':
                break
            lay[SoilProperty(prop)] = layer[prop]
        res.append(lay)
    return res

#Provides preview data
@api_view(['POST'])
def get_preview(request):
    data = json_material_to_py(request.data['values'])
    soil_layer = LayerSoil(data)
    return JsonResponse({'values': soil_layer.get()})

#Provides result
@api_view(['POST'])
def get_result(request):
    data = json_material_to_py(request.data['sheet']['values'])
    soil_layer = LayerSoil(data)
    footing = Footing()
    #Change to enum
    request.data['footing']['Type'] = FootingType(request.data['footing']['Type'])
    for prop in request.data['footing']:
        footing[FootingData(prop)] = request.data['footing'][prop]
    assembly = Assembly(footing, soil_layer)
    solver = Solver(assembly)
    result = solver.run()
    return JsonResponse({'results': result})

