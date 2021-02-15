from django.shortcuts import render
from rest_framework.decorators import api_view

#Main page
@api_view()
def index(request):
    return render(request, 'index.html')

