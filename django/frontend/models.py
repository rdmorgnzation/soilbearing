from django.db import models


class excelUpload(models.Model):
    excelFile = models.FileField(upload_to='excelFile/files/')


class data(models.Model):
    SPT = models.FloatField(null=True)
    Nvalue = models.FloatField(null=False)
    samplingDepth = models.FloatField(
        null=False)
    thickness = models.FloatField(null=True)
    classification = models.CharField(max_length=20, null=True)
    groupSymbol = models.CharField(max_length=3, null=True)
    layer = models.CharField(max_length=20, null=True)
    gamma = models.FloatField(null=True)
    waterPercentage = models.FloatField(
        null=True)
    cValue = models.FloatField(null=True)
    phiValue = models.FloatField(null=True)
    GI = models.CharField(max_length=3, null=False)
    Elasticity = models.FloatField(null=True)
    nu = models.FloatField(null=True)
