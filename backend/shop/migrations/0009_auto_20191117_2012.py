# Generated by Django 2.2 on 2019-11-17 18:12

from django.db import migrations, models
import shop.models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_album_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='album_image',
            field=models.ImageField(blank=True, null=True, upload_to=shop.models.get_image_path),
        ),
        migrations.AddField(
            model_name='album',
            name='album_type',
            field=models.CharField(choices=[('cd', 'CD'), ('vinil', 'VINIL')], default=('cd', 'CD'), max_length=200),
        ),
    ]
