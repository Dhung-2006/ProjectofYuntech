"""
URL configuration for ProjectofYuntech project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.contrib import admin
from django.urls import path , include
from myapp.views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',ReactView.as_view() ),
    path('login' , login , name="login"),
    path('all' , start_view ,name = 'all'),
    path('all/music' , get_music , name='all_music'),
    path("all/film", get_film, name="all_film"),
    path("all/book",get_ebook, name="all_Ebook"),
    # path('requestEmail' , verify_email, name='requestEmail'),
    path('verifySuccess' , verify_success , name='verifySuccess'),
    # path('editUserInfo' , edit_request , name='editUserInfo'),
    path('editSuccess' , edit_user_information , name= 'editsucess'),
    path('search' , search , name='search'),
    path('userInformation', user_information , name='userInformation'),
    # path('test', test , name = 'test'),
    path('recommand' , recommand , name='recommand'),
    path('recommand/image' , recommand_image , name='recommandImage'),
    path('delete' , deleteData , name='delete'),

]           

if settings.DEBUG:
    urlpatterns +=static(settings.MEDIA_URL , document_root = settings.MEDIA_ROOT)