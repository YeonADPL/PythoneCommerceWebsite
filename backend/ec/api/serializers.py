from .models import CustomUser,Inventory,Order,AddToCart
from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username","password"]
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        # user.set_password(validated_data["password"])
        # user.save()
        return user


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddToCart
        fields = "__all__"