from django.db import models

class excelUpload(models.Model):
    excelFile = models.FileField(upload_to='excelFile/files/')
    
class data(models.Model):
    SPT = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    Nvalue = models.DecimalField(max_digits=5 , decimal_places=2 , null = False)
    samplingDepth = models.DecimalField(max_digits=5, decimal_places=2, null=False)  
    thickness = models.DecimalField(max_digits=5,decimal_places=2, null=True)
    classification = models.CharField(max_length=20, null=True)
    groupSymbol = models.CharField(max_length=3, null= True)
    layer = models.CharField(max_length=20, null=True)
    gamma = models.DecimalField(max_digits=10, decimal_places=4, null=True) 
    waterPercentage = models.DecimalField(max_digits=6, decimal_places=4, null =True)
    cValue = models.FloatField(null=True)
    phiValue =  models.FloatField(null=True)
    GI = models.CharField(max_length=3, null=False)
    Elasticity = models.FloatField(null=True)
    nu = models.FloatField(null=True)
    
    