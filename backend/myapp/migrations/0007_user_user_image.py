# Generated by Django 5.1.2 on 2024-12-07 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_ebook_bood_image_film_film_image_music_music_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_Image',
            field=models.CharField(default='defaultImage', max_length=50, null=True),
        ),
    ]
