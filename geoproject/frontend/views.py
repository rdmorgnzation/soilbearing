from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
# Create your views here.


def index(request):
    if request.method == 'POST':
        uploaded_file = request.FILES['document']
        fs = FileSystemStorage(location="./Excelfiles/")
        fs.save(uploaded_file.name, uploaded_file)

    return render(request, 'frontend/index.html')
