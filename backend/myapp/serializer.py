from rest_framework import serializers
from . models import *
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field =  ['user_ID' , 
                  "user_Name" , 
                  "user_Email" , 
                  "user_Account" , 
                  "user_Password" , 
                  "user_Image"]