# Generated by Django 5.1.2 on 2024-12-20 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_user_user_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ebook',
            name='bood_Image',
        ),
        migrations.RemoveField(
            model_name='ebook',
            name='book_Content',
        ),
        migrations.AddField(
            model_name='ebook',
            name='book_Image',
            field=models.CharField(default='defaultImage', max_length=50),
        ),
        migrations.AddField(
            model_name='ebook',
            name='book_Intro',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='ebook',
            name='book_Location',
            field=models.CharField(default='type your book location name here', max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='ebook',
            name='book_Name',
            field=models.CharField(default='type your book name here', max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='film',
            name='film_Image',
            field=models.CharField(default='defaultImage', max_length=50),
        ),
        migrations.AlterField(
            model_name='music',
            name='music_Image',
            field=models.CharField(default='defaultImage', max_length=50),
        ),
    ]
