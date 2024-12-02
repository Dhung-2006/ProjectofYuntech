from django.db import models

class user(models.Model):
    user_ID = models.IntegerField(primary_key=True , editable=False , unique=True)
    user_Name = models.CharField(max_length=50,)
    def __str__(self):
        return self

