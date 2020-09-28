from django.forms import ModelForm
from .models import excelUpload

class excelForm(ModelForm):
    class Meta:
        model = excelUpload
        fields = ('excelFile',)
    