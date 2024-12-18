from django.shortcuts import render , redirect
from django.http import HttpResponse, HttpResponseRedirect , JsonResponse
import smtplib
import random
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import json

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

def produce_randomRecommand(request):
    musics_id = Music.objects.values_list('music_ID',flat=True)  # id list -- music
    films_id = Film.objects.values_list('film_ID',flat=True)  # id list -- film
    music_random_list = []
    counter_music = 0 
    while len(music_random_list) < 10 :
        print(1)
        random_id =  random.randint(0,len(musics_id)-1)
        music = Music.objects.get(music_ID = musics_id[random_id])
        music_location = music.music_Location
        if music_location not in music_random_list:
            music_random_list.append(music_location)
            counter_music +=1
    film_random_list = []
    counter_film = 0
    while len(film_random_list) <10:
        print(1)
        random_id = random.randint(0,len(films_id)-1)
        film = Film.objects.get(film_ID = films_id[random_id])
        film_location = film.film_Location
        if film_location not in film_random_list:
            film_random_list.append(film_location)
            counter_film +=1
    recommand_json = {
        'music_locations' : music_random_list,
        'film_locations' : film_random_list
    }
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

def login(request):
    # print("g")
    if request.method=="POST":
        # print(request.body)
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
            cUser_Account = data['userCreateAccount']
            cUser_Password  = data['userCreatePasswrod']
            cUser_Email = data['userCreateEmail']
            add_user = User.objects.create(
            user_Name = cUser_Name,
            user_Email = cUser_Email,
            user_Account = cUser_Account,
            user_Password = cUser_Password
            )
            add_user.save()
            return HttpResponse("success" , status = '200')

def verify_email(request):
    if request.method =="POST":
        data =  json.loads(request.body.decode('utf-8'))
        email = data['userEmail']
        name = data['userName']
        send_email(email,name)
        verify_code  = send_email(email, name)
        code_json = {
            'verify_code' :verify_code,
        }    
        return JsonResponse(code_json,safe=False)

def verify_success(request):
    data =  json.loads(request.body.decode('utf-8'))
    userName = data['userName']
    userEmail = data['userEmail']
    user = User.objects.get(user_Name = userName)
    user.user_Email = userEmail
    user.save()
    return HttpResponse('success' , status = '200')

def edit_request(request):
    if request.method =="POST":
        re_user = json.loads(request.body.decode('utf-8'))
        user = re_user['RequestUser']
        user_data = User.objects.get(user_ID= user)
        re_json = {
            'User_name':user_data.user_Name,
            'User_Email':user_data.user_Email,
            'User_Image_location':user_data.user_Image
        }
    return JsonResponse(re_json ,safe= False )

def edit_user_information(request):
    if request.method=="POST":
        edit_data = json.loads(request.body.decode('utf-8'))
        Edit_user = edit_data['editUserName']
        Edit_Email = edit_data['editUserEmail']













# b'{"logStatus":"regist","userCreateAccount":"dexter","userCreateEmail":"dexter@dexter","userCreatePassword":"dexter","userCreatePassword_c":"dexter"}'