from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    profile_pic=models.ImageField(upload_to='profile/%Y/%m/%d/');
    description=models.TextField()
    contact_no=models.CharField(max_length=15)
    country=models.CharField(max_length=25)
    city=models.CharField(max_length=25)
    date_of_bith=models.DateField()
    occupation=models.CharField(max_length=100)
    excerpt=models.CharField(max_length=150)

    def __str__(self):
        return self.user.first_name
