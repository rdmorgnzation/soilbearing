from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import JSONParser
from .models import data
from .serializers import dataSerializer
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
import io
# Create your views here.


def index(request):
    if request.method == 'POST':
        uploaded_file = request.FILES['document']
        fs = FileSystemStorage(location="../media/Excelfiles/")
        fs.save(uploaded_file.name, uploaded_file)

    return render(request, 'frontend/index.html')


@api_view(('POST',))
@csrf_exempt
def data_list_posting(request):
    if request.method == 'POST':
        newdata = data(SPT=request.data['SPT'], Nvalue=request.data['Nvalue'], samplingDepth=request.data['samplingDepth'],
                       thickness=request.data['thickness'], classification=request.data['classification'],
                       groupSymbol=request.data['groupSymbol'], layer=request.data['layer'], gamma=request.data['gamma'],
                       waterPercentage=request.data['waterPercentage'], cValue=request.data['cValue'],
                       phiValue=request.data['phiValue'], GI=request.data['GI'], Elasticity=request.data['Elasticity'],
                       nu=request.data['nu']
                       )
        # deletedata = data.objects.get(pk=2)
        # deletedata.delete()
        # olddata = data.objects.get(pk=3)
        newdata.save()
        print(request.data)

        return Response(status=status.HTTP_201_CREATED)


@ api_view(('GET',))
def data_list_query(request):
    if request.method == 'GET':
        values = data.objects.all()
        serializer = dataSerializer(values, many=True)
        return JsonResponse(serializer.data, safe=False)
