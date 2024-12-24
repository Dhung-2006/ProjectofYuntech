from django.shortcuts import render , redirect
from django.http import HttpResponse, HttpResponseRedirect , JsonResponse , FileResponse
import smtplib
import random
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import json
from django.conf import settings
import os
#------------------------------------------------------------------
def test(request):
    media_root = settings.MEDIA_ROOT
    music_path = os.path.join(media_root,'musics_folder')
    musics_files = os.listdir(music_path) 
    data = {
        'music' : [f"{settings.MEDIA_URL}music/{file}" for file in musics_files]
    }
    return JsonResponse(data)
def start_view(request):
    musics_id = Music.objects.values_list('music_ID',flat=True)  # id list -- music
    films_id = Film.objects.values_list('film_ID',flat=True)  # id list -- film
    ebooks_id = [book.book_ID for book in Ebook.objects.all()]
    music_random_list = []
    return_json = {
        'music_recommand' :[],
        'film_recommand':[],
        'book_recommand':[]
    }
    while len(music_random_list) < 8 :
        random_id =  random.randint(0,len(musics_id)-1)
        if random_id not in music_random_list:
            music_random_list.append(musics_id[random_id])
    film_random_list = []
    while len(film_random_list) <8:
        random_id = random.randint(0,len(films_id)-1)
        if random_id not in film_random_list:
            film_random_list.append(films_id[random_id])
    ebook_random_list = []
    while len(ebook_random_list)<8:
        random_id = random.randint(0,len(ebooks_id)-1)
        if random_id not in ebook_random_list:
            ebook_random_list.append(ebooks_id[random_id])
    recommand_json = {
        'music_locations' :123, #music_random_list,
        'film_locations' : 123456#film_random_list
    }
    for music_id in music_random_list:
        music = Music.objects.get(music_ID = music_id)
        music_json = {
            'music_ID' : music.music_ID,
            'Author_name' : User.objects.get(user_ID = music.user_ID).user_Name,
            'music_Name' : music.music_Name,
            'music_Intro' : music.music_Intro,
            'music_Location':music.music_Location,
            'music_Image' :music.music_Image 
        }
        return_json['music_recommand'].append(music_json)
    for film_id in film_random_list:
        film = Film.objects.get(film_ID = film_id)
        film_json = {
            'film_ID' : film.film_ID,
            'Author_name' : User.objects.get(user_ID = film.user_ID).user_Name,
            'film_Name' : film.film_Name,
            'film_Intro' : film.film_Intro,
            'film_Location':film.film_Location,
            'film_Image' :film.film_Image 
        }
        return_json['film_recommand'].append(film_json)
    for book_id in ebook_random_list:
        book = Ebook.objects.get(book_ID = book_id)
        book_json = {
            'book_ID' : book.book_ID,
            'Author_name' : User.objects.get(user_ID = book.user_ID).user_Name,
            'book_Name' : book.book_Name,
            'book_Intro' : book.book_Intro,
            'book_Location':book.book_Location,
            'book_Image' :book.book_Image 
        }
        return_json['book_recommand'].append(book_json)
    return JsonResponse(recommand_json , safe=False)

def recommand(request):
    musics_id = [ music.music_ID for music in Music.objects.all()]
    films_id = [ film.film_ID for film in Film.objects.all()]
    ebooks_id = [ebook.book_ID for ebook in Ebook.objects.all()]
    recommand_json = {
        'music' : [],
        'film' : [],
        'ebook':[]
    }
    dataCounter = 0
    music_lst = []
    film_lst = []
    ebood_lst = []
    while dataCounter <4 :
        data_type  = random.randint(0,2)
        if data_type == 0 :
            id = random.randint(0, len(musics_id)-1)
            if musics_id[id] in music_lst:
                continue
            music_lst.append(musics_id[id])
            music_info = Music.objects.get(music_ID = musics_id[id])
            music_json = {
                'music_name':music_info.music_Name,
                'author' : User.objects.get(user_ID = music_info.user_ID).user_Name,
                'music_intro' : music_info.music_Intro,
                'music_Location':music_info.music_Location,
                'music_Image' : music_info.music_Image
            }
            recommand_json['music'].append(music_json)  
            dataCounter +=1
        elif data_type ==1 :
            id = random.randint(0,len(films_id)-1)
            if films_id[id] in film_lst:
                continue
            film_lst.append(films_id[id])
            film_info = Film.objects.get(film_ID = films_id[id])
            film_json = {
                'film_name' : film_info.film_Name,
                'author': User.objects.get(user_ID = film_info.user_ID ).user_Name,
                'film_intro':film_info.film_Intro,
                'film_Location':film_info.film_Location,
                'film_Image':film_info.film_Image,
            }    
            recommand_json['film'].append(film_json)   
            dataCounter+=1
        else:
            id = random.randint(0,len(ebooks_id)-1)
            if ebooks_id[id] in ebood_lst:
                continue
            ebood_lst.append(ebooks_id[id])
            ebook_info = Ebook.objects.get(ebooks_id[id])
            ebook_json ={
                'book_name': ebook_info.book_Name,
                'author' : User.objects.get(user_ID = ebook_info.user_ID),
                'book_intro' : ebook_info.book_Intro,
                'book_Location': ebook_info.book_Location,
                'book_Image': ebook_info.book_Image
            }
            recommand_json['ebook'].append(ebook_json)
            dataCounter+=1
            print('ebook')
    return JsonResponse(recommand_json , safe=False)

def recommand_image(request):
    musics_id = [music.music_ID for music in Music.objects.all()]
    image_lst = [ ]
    recommand_json= {
        'music':[]
    }  
    while len(image_lst)>5:
        r_id =  random.randint(0,len(musics_id)-1)
        if musics_id[r_id] in image_lst:
            continue
        image_lst.append(musics_id[r_id])
        music_info = Music.objects.get(music_ID = musics_id[r_id])
        music_json = {
            'music_name':music_info.music_Name,
            'author' : User.objects.get(user_ID = music_info.user_ID).user_Name,
            'music_intro' : music_info.music_Intro,
            'music_Location':music_info.music_Location,
            'music_Image' : music_info.music_Image
        }
        recommand_json['music'].append(music_json)  
    return JsonResponse(recommand_json , safe=False)

class ReactView(APIView):
    def get(self, request):
        output = [{
            "user_ID":output.user_ID,
            "user_Name":output.user_Name,
            "user_Email":output.user_Email, 
            "user_Account":output.user_Account,
            "user_Password":output.user_Password,
            "user_Image":output.user_Image,
        }
        for output in User.objects.all()]
        return Response(output)
    def post(self , request):
        serializer = ReactSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
def all_music(request):
    musics = Music.objects.all()
    return musics        

def login(request):
    print("g")
    if request.method=="POST":
        print(request.body)
        data  = json.loads(request.body.decode('utf-8'))
        if data['logStatus'] == "sign":
            fill_account  = data['userAccount']      
            fill_password = data['userPassword']
            try:
                user_info =  User.objects.get(user_Account =fill_account )
                user_password = user_info.user_Password
                if user_password != fill_password:
                    return HttpResponse('wrong password')
            except  User.DoesNotExist: 
                print("gg")
                return HttpResponse('No account', status = 111)
            user_json = {
                "user_name":user_info.user_Name,
                "user_Email":user_info.user_Email,
                "user_Image":user_info.user_Image
            }
            print(user_json)
            return JsonResponse(user_json , safe=False)
        elif data['logStatus'] == "regist":
            cUser_Name = data['userCreateName']
            cUser_Email = data['userCreateEmail']
            verify_code = send_email(cUser_Email , cUser_Name)
            verify_json  = {
                'verify_code': verify_code,
                'user_name':cUser_Name,
                'user_email':cUser_Email
            }
            # cUser_Account = data['userCreateAccount']
            # cUser_Password  = data['userCreatePasswrod']
            # add_user = User.objects.create(
            # user_Name = cUser_Name,
            # user_Email = cUser_Email,
            # user_Account = cUser_Account,
            # user_Password = cUser_Password
            # )
            # add_user.save()
            return JsonResponse(verify_json,safe=False)
#------------------------------------------------------------------
def send_email(receive_email,receiver_name):
    smtp = smtplib.SMTP('smtp.gmail.com', 587)
    smtp.ehlo()
    smtp.starttls()
    smtp.login("systemyuntech@gmail.com" , "skyt mtvr mcxm kuai")
    my_email = "systemyuntech@gmail.com"
    receiver = receive_email
    verify_code = produce_randomcode()
    masage =f"Subject:YuntechSystem 驗證碼\n{receiver_name}您的驗證碼為：{verify_code}"
    status = smtp.sendmail(my_email,receiver,masage.encode('utf-8'))
    smtp.quit()
    return verify_code

def produce_randomcode():
    global code
    code =  random.randint(1000,9999)
    return code

# def verify_email(request):
#     if request.method =="POST":
#         data =  json.loads(request.body.decode('utf-8'))
#         email = data['userEmail']
#         name = data['userName']
#         send_email(email,name)
#         verify_code  = send_email(email, name)
#         code_json = {
#             'verify_code' :verify_code,
#         }    
#         return JsonResponse(code_json,safe=False)

def verify_success(request):
    data =  json.loads(request.body.decode('utf-8'))
    userName = data['userCreateName']
    userEmail = data['userCreateEmail']
    userAccount = data['userCreateAccount']
    userPassword = data['userCreatePassword']
    user = User.objects.create(
        user_Name = userName,
        user_Email = userEmail,
        user_Account = userAccount,
        user_Password = userPassword
        )
    user.save()
    user_json = {
        'userName':userName,
        'userEmail':userEmail
    }
    return JsonResponse(user_json , safe=False)
#------------------------------------------------------------------
# def edit_request(request):
#     if request.method =="POST":
#         re_user = json.loads(request.body.decode('utf-8'))
#         user = re_user['RequestUser']
#         user_data = User.objects.get(user_ID= user)
#         re_json = {
#             'Origin_User_name':user_data.user_Name,
#             'User_Image_location':user_data.user_Image
#         }
#     return JsonResponse(re_json ,safe= False )

def edit_user_information(request):
    if request.method=="POST":
        edit_data = json.loads(request.body.decode('utf-8'))
        Origin_User = edit_data['originUserName']
        Edit_user = edit_data['editUserName']
        Edit_Image = edit_data['editUserImage']
        User_Info = User.objects.get(user_Name = Origin_User)
        User_Info.user_Name = Edit_user
        User_Info.user_Image = Edit_Image
        New_user = {
            'user_name' : Edit_user,
            'user_Image': Edit_Image
        }
        return JsonResponse(New_user , safe=False)
#------------------------------------------------------------------
def search(request):
    if request.method =="POST":
        key_words = json.loads(request.body.decode('utf-8'))
        keyword = key_words['keyword']
    # keyword = 'Dexter'
        Musics = Music.objects.filter(music_Name__contains=keyword)   
        musics_list = [[music.music_Name , music.music_Intro , music.music_Image , music.music_Location] for music in Musics]
        Users = User.objects.filter(user_Name__contains=keyword)
        users_list =[[user.user_Name , user.user_Image] for user in Users] 
        Films = Film.objects.filter(film_Name__contains=keyword)   
        films_list = [[film.film_Name , film.film_Intro , film.film_Image , film.film_Location] for film in Films]
        Books = Ebook.objects.filter(book_Name__contains=keyword)   
        books_list = [[book.book_Name , book.book_Intro , book.book_Image , book.book_Location] for book in Books]
        return_json = {
            'user_list':users_list,
            'music_list':musics_list,
            'film_list':films_list,
            'ebood_list':books_list
        }
        return JsonResponse(return_json , safe=False)
#------------------------------------------------------------------
def user_information(requests):
    if requests.method =="POST":
        user_data = json.loads(requests.body.decode('utf-8'))
        user = user_data['userName']
        user_id = User.objects.get(user_Name = user)
        user = "allen"
        user_id = '1'
        upload_musics = [[music.music_Name , music.music_Intro , music.music_Location, music.music_Image] for music in Music.objects.filter(user_ID = user_id)]
        upload_films = [[film.film_Name , film.film_Intro, film.film_Location , film.film_Image] for film in Film.objects.filter(user_ID = user_id)]
        upload_ebooks = [[ebook.book_Name , ebook.book_Intro, ebook.book_Location , ebook.book_Image] for ebook in Ebook.objects.filter(user_ID = user_id)]
        file_json = {
            "uploader" :user , 
            'musics' :[],
            'films':[],
            'ebooks':[]
        }
        for music in upload_musics:
            music = {
                "music_name": music[0],
                "music_Intro": music[1],
                "music_Location": music[2],
                "music_Image": music[3],
            }
            file_json['musics'].append(music)
        for film in upload_films:
            film = {
                "film_name": film[0],
                "film_Intro": film[1],
                "film_Location": film[2],
                "film_Image": film[3],
            }
            file_json['films'].append(film)
        for ebook in upload_ebooks:
            ebook = {
                "ebook_name": ebook[0], 
                "ebook_Intro": ebook[1],    
                "ebook_Location": ebook[2], 
                "ebook_Image": ebook[3],    
            }   
            file_json['ebooks'].append(ebook)   
        return JsonResponse(file_json , safe=False)
#------------------------------------------------------------------
def deleteData(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        type_lst = ['music' , 'film' , 'ebook']
        delete_type  = data['type']
        if delete_type not in type_lst:
            return HttpResponse('None of this type')
        if delete_type == 'film':
            film_name = data['filmName']
            film = Film.objects.get(film_Name = film_name)
            film.delete()
            return HttpResponse('Delete Success')
        elif delete_type == 'music':
            music_name = data['musicName']
            music = Music.objects.get(music_Name = music_name)
            music.delete()
            return HttpResponse('Delete Success')
        else:
            book_name = data['bookName']
            book = Ebook.objects.get(book_Name = book_name)
            book.delete()
            return HttpResponse('Delete Success')
#------------------------------------------------------------------
def get_music(request):
    all_music = Music.objects.all()
    music_json = {
        'musics' : []
    }
    for music in all_music:
        json_file = {
            'musicName': music.music_Name,
            'author':User.objects.get(user_ID = music.user_ID).user_Name,
            'musicIntro': music.music_Intro,
            'musicLocation':music.music_Location,
            'musicImage': music.music_Image
        }
        music_json['musics'].append(json_file)
    return JsonResponse(music_json , safe= False)

def get_film(request):
    all_film  = Film.objects.all()
    film_json = {
        'film':[]
    }
    for film in all_film:
        json_file = {
            'filmName':film.film_Name,
            'author': User.objects.get(user_ID = film.user_ID).user_Name,
            'filmIntro':film.film_Intro,
            'filmLocation':film.film_Location,
            'filmImage': film.film_Image
        }
        film_json['film'].append(json_file)
    return JsonResponse(film_json , safe=False)

def get_ebook(request):
    all_ebook = Ebook.objects.all()
    ebook_json = {
        'ebook':[]
    }
    for book in all_ebook:
        json_file = {
            'bookName':book.book_Name,
            'author':User.objects.get(user_ID = book.user_ID).user_Name,
            'bookIntro':book.book_Intro , 
            'bookLocation':book.book_Location,
            'bookImage':book.book_Image
        }
        ebook_json['ebook'].append(json_file)
    return JsonResponse(ebook_json , safe= False)
#------------------------------------------------------------------




        

















