from django.contrib import admin
from myapp.models import User , Music , Film , Ebook

admin.site.register(User)
admin.site.register(Music)
admin.site.register(Film)
admin.site.register(Ebook)