from django.urls import path
from .views import UserAllDeatailView,UserLessDeatilView
urlpatterns=[
    path('fewdata/<pk>',UserLessDeatilView.as_view()),
    path('alldata/<pk>',UserAllDeatailView.as_view())
]