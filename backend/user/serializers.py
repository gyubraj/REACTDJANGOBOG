from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User



class ProfileFewDataSerializer(serializers.ModelSerializer):
    user=serializers.SerializerMethodField('get_full_name')
    class Meta:
        model=Profile
        fields=['excerpt','user','profile_pic']

    def get_full_name(self,obj):
        return obj.user.first_name+" "+obj.user.last_name

class ProfileAllDataSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_full_name')
    class Meta:
        model=Profile
        fields=['user','profile_pic','description','contact_no','country','city','date_of_bith','occupation','excerpt']

    def get_full_name(self,obj):
        return obj.user.first_name+" "+obj.user.last_name
