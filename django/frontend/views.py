from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
#from rest_framework.parsers import JSONParser
#from .models import data
#from .serializers import dataSerializer
#from rest_framework.response import Response
#from rest_framework import status
#from django.views.decorators.csrf import csrf_exempt
#from rest_framework.decorators import api_view
#import json
#import io
# Create your views here.
from . import resources
import tempfile
from blcalc.excel_load import BoreholeDataSheets
from blcalc.borehole_parser import BoreholeLog

#Main page
def index(request):
    return render(request, 'index.html')

#Return parsed excel file to json
def file_upload(request):
    loaded_sheets = {}
    if request.method == 'POST':
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
    return JsonResponse(loaded_sheets, safe=False)

#This is not handled by server
"""
@api_view(('POST',))
@csrf_exempt
def data_list_posting(request):
    if request.method == 'POST':
        edit = request.data[1]
        if edit['edit'] == 1:
            listfirst = request.data[0]
            newdata = data(SPT=listfirst['SPT'], Nvalue=listfirst['Nvalue'], samplingDepth=listfirst['samplingDepth'],
                           thickness=listfirst['thickness'], classification=listfirst['classification'],
                           groupSymbol=listfirst['groupSymbol'], layer=listfirst['layer'], gamma=listfirst['gamma'],
                           waterPercentage=listfirst['waterPercentage'], cValue=listfirst['cValue'],
                           phiValue=listfirst['phiValue'], GI=listfirst['GI'], Elasticity=listfirst['Elasticity'],
                           nu=listfirst['nu']
                           )
            newdata.save()
        elif edit['edit'] == 2:
            listfirst = request.data[0]
            pk = listfirst['id']
            newdata = data(SPT=listfirst['SPT'], Nvalue=listfirst['Nvalue'], samplingDepth=listfirst['samplingDepth'],
                           thickness=listfirst['thickness'], classification=listfirst['classification'],
                           groupSymbol=listfirst['groupSymbol'], layer=listfirst['layer'], gamma=listfirst['gamma'],
                           waterPercentage=listfirst['waterPercentage'], cValue=listfirst['cValue'],
                           phiValue=listfirst['phiValue'], GI=listfirst['GI'], Elasticity=listfirst['Elasticity'],
                           nu=listfirst['nu']
                           )
            editdata = data.objects.get(pk=pk)
            print(editdata)
            editdata = newdata
            editdata.pk = pk
            editdata.save()

        elif edit['edit'] == 3:
            listfirst = request.data[0]
            pk = listfirst['id']
            data.objects.get(pk=pk).delete()
            # deletedata = data.objects.get(pk=2)
            # deletedata.delete()
            # olddata = data.objects.get(pk=3)

        return Response(status=status.HTTP_201_CREATED)


@ api_view(('GET',))
def data_list_query(request):
    if request.method == 'GET':
        values = data.objects.all()
        serializer = dataSerializer(values, many=True)
        return JsonResponse(serializer.data, safe=False)
        
"""        
