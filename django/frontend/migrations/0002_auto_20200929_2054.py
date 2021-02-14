# Generated by Django 3.1.1 on 2020-09-29 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='Nvalue',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='data',
            name='SPT',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='data',
            name='gamma',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='data',
            name='samplingDepth',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='data',
            name='thickness',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='data',
            name='waterPercentage',
            field=models.FloatField(null=True),
        ),
    ]