from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .serializers import CustomUserSerializer, InventorySerializer, OrderSerializer,AddToCartSerializer
from .models import CustomUser, Inventory, Order, AddToCart
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
# Create your views here.

class CustomUserList(APIView):
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class InventoryList(APIView):
    def get(self, request):
        users = Inventory.objects.all()
        serializer = InventorySerializer(users, many=True)
        return Response(serializer.data)

    def post(self):
        pass