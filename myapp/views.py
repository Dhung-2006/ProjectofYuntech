from django.shortcuts import render
from .models import User
from django.http import HttpResponse

def add_user(request):
    if request.method == "POST":
        print(request.POST)
        if request.POST.get('registBtn'):
            Username = request.POST.get("RegistUsername")
            Account = request.POST.get("RegistAccount")
            print(Account)
            Password = request.POST.get("RegistPassword")
            email = request.POST.get("RegistEmail")
            add_user = User.objects.create(
                user_Name = Username,
                user_Email = email,
                user_Account = Account,
                user_Password = Password
            )
            add_user.save()
   
        return HttpResponse("correct" , status ="200")

def index(request):
    return render(request , "test.html" , locals())
