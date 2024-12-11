from django.shortcuts import render , redirect
from .models import User
from django.http import HttpResponse, HttpResponseRedirect , JsonResponse
import smtplib
import random
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

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




def produce_randomcode():
    global code
    code =  random.randint(1000,9999)
    return code

def add_user(request):
    print('imentry')
    if request.method == "POST":
        if request.POST.get('registBtn'):
            Username = request.POST.get("RegistUsername")   
            Account = request.POST.get("RegistAccount")
            Password = request.POST.get("RegistPassword")
            email = request.POST.get("RegistEmail")
            send_email(email,Username)
        elif request.POST.get('submitVCode'):
            Verify_code = request.POST.get("VerifyCode")
            if Verify_code == str(code):
                add_user = User.objects.create(
                    user_Name = Username,
                    user_Email = email,
                    user_Account = Account,
                    user_Password = Password
                )
                add_user.save()
        return HttpResponse("correct" , status ="200")

def send_email(receive_email,receiver_name):
    smtp = smtplib.SMTP('smtp.gmail.com', 587)
    smtp.ehlo()
    smtp.starttls()
    smtp.login("systemyuntech@gmail.com" , "skyt mtvr mcxm kuai")
    my_email = "systemyuntech@gmail.com"
    receiver = receive_email
    verify_code = produce_randomcode()
    masage =f"Subject:YuntechSystem 驗證碼/n{receiver_name}您的驗證碼為：{verify_code}"
    status = smtp.sendmail(my_email,receiver,masage.encode('utf-8'))
    smtp.quit()

def login(request):
    print("g")
    if request.method=="POST":
        print(request.body)
        # print("good entry")
        # if request.POST.get('loginBtn'):
        # fill_account = request.POST.get('Account')
        # fill_password = request.POST.get('Password')
        # print(fill_password)
        # # try:
        # user_info =  User.objects.get(user_Account =fill_account )
        # user_password = user_info.user_Password
        
            # return HttpResponse('12312313')
            # except  User.DoesNotExist: 
            #     return HttpResponse('No account', status = 111)
        return HttpResponse("good" , status = '100')

    # return HttpResponse("coorect ", status ="200")
    # dexterplay200604