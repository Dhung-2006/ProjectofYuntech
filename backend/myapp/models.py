from django.db import models

class User(models.Model):
    user_ID = models.IntegerField(primary_key=True , editable=False , unique=True)
    user_Name = models.CharField(max_length=50)
    user_Email =  models.EmailField(max_length=254 , blank= True)
    user_Account = models.CharField(max_length=50 , unique= True , default="type your account here")
    user_Password  = models.CharField(max_length=50 ,null=False , default= "type your password here")
    user_Image = models.CharField(max_length=50 , null = True , default="defaultImage")
    def __str__(self):
        return str(self.user_ID)

class Music(models.Model):
    music_ID = models.IntegerField(primary_key=True , editable=False , unique=True)
    user_ID = models.IntegerField()    
    music_Name = models.CharField(max_length=50 , unique= True , default="type your music name here")
    music_Intro = models.TextField()
    music_Location = models.CharField(max_length=50 , unique= True , default="type your music location name here")
    music_Image = models.CharField(max_length=50  , default="defaultImage")
    def __str__(self):
        return str(self.music_ID)

class Film(models.Model):
    film_ID = models.IntegerField(primary_key=True , editable=False, unique=True)
    user_ID = models.IntegerField() 
    film_Name = models.CharField(max_length=50 , unique= True , default="type your film name here")
    film_Intro = models.TextField()
    film_Location = models.CharField(max_length=50 , unique= True , default="type your film location name here")
    film_Image = models.CharField(max_length=50  , default="defaultImage")
    def __str__(self):
        return str(self.film_ID)

class Ebook(models.Model):
    book_ID = models.IntegerField(primary_key=True,editable= False , unique=True )
    user_ID = models.IntegerField()
    book_Name = models.CharField(max_length=50 , unique= True , default="type your book name here")
    book_Intro = models.TextField(blank=True)
    book_Location = models.CharField(max_length=50 , unique= True , default="type your book location name here")
    book_Image = models.CharField(max_length=50  , default="defaultImage")
    def __str__(self):
        return self.book_Name 