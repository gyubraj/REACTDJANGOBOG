from django.contrib.auth.models import User
from rest_framework.generics import RetrieveAPIView
from .serializers import ProfileAllDataSerializer
from .serializers import ProfileFewDataSerializer
from rest_framework import permissions
from .models import Profile
# Create your views here.

class UserLessDeatilView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProfileFewDataSerializer
    queryset = Profile.objects.all()

class UserAllDeatailView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProfileAllDataSerializer
    queryset = Profile.objects.all()

