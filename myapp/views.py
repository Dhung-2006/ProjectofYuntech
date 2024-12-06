from django.shortcuts import render
from .models import User
from django.http import HttpResponse
import smtplib
import random

def index(request):
    return render(request , "test.html" , locals())

def produce_randomcode():
    global code
    code =  random.randint(1000,9999)
    return code

def add_user(request):
    if request.method == "POST":
        if request.POST.get('registBtn'):
            Username = request.POST.get("RegistUsername")   
            Account = request.POST.get("RegistAccount")
            Password = request.POST.get("RegistPassword")
            email = request.POST.get("RegistEmail")
            send_email(email,Username)

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
    masage =f"Subject:YuntechSystem 驗證碼\n{receiver_name}您的驗證碼為：{verify_code}"
    status = smtp.sendmail(my_email,receiver,masage.encode('utf-8'))
    smtp.quit()