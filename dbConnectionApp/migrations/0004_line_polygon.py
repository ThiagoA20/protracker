# Generated by Django 4.0 on 2022-01-06 08:40

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbConnectionApp', '0003_rename_latlng_point_point'),
    ]

    operations = [
        migrations.CreateModel(
            name='Line',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('points', django.contrib.gis.db.models.fields.LineStringField(srid=4326)),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Polygon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('polygon', django.contrib.gis.db.models.fields.PolygonField(srid=4326)),
                ('date', models.DateTimeField()),
            ],
        ),
    ]
