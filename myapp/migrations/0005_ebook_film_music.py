# Generated by Django 5.1.2 on 2024-12-03 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_user_user_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ebook',
            fields=[
                ('book_ID', models.IntegerField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('user_ID', models.IntegerField()),
                ('book_Name', models.CharField(default='type your film name here', max_length=50, unique=True)),
                ('book_Content', models.CharField(blank=True, max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='Film',
            fields=[
                ('film_ID', models.IntegerField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('user_ID', models.IntegerField()),
                ('film_Name', models.CharField(default='type your film name here', max_length=50, unique=True)),
                ('film_Intro', models.TextField()),
                ('film_Location', models.CharField(default='type your film location name here', max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Music',
            fields=[
                ('music_ID', models.IntegerField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('user_ID', models.IntegerField()),
                ('music_Name', models.CharField(default='type your music name here', max_length=50, unique=True)),
                ('music_Intro', models.TextField()),
                ('music_Location', models.CharField(default='type your music location name here', max_length=50, unique=True)),
            ],
        ),
    ]
