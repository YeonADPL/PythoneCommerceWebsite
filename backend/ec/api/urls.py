from django.urls import path
from api import views

urlpatterns = [
    path("", views.index),
    path("getinventories", views.InventoryList.as_view()),
    path("userinfo", views.CustomUserList.as_view()),
]