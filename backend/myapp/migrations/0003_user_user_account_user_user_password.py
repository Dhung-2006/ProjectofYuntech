# Generated by Django 5.1.2 on 2024-12-02 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_delete_all_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_Account',
            field=models.CharField(default='type your account here', max_length=50, unique=True),
        ),
        migrations.AddField(
            model_name='user',
            name='user_Password',
            field=models.CharField(default='type your password here', max_length=50),
        ),
    ]
