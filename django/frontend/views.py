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

    return render(request, 'index.html')


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
