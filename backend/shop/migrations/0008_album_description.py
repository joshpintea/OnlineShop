# Generated by Django 2.2 on 2019-11-17 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0007_remove_album_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='description',
            field=models.CharField(default='Hello', max_length=1000),
        ),
    ]
