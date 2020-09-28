from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from .forms import excelForm

def index(request):
    form = excelForm()
    return render(request, 'home.htm' , {
        "form": form
    })

# Create your views here.
