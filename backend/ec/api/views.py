from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .serializers import CustomUserSerializer, HotSalesInventorySerializer,InventoryCategorySerializer,InventorySerializer, OrderSerializer,AddToCartSerializer
from .models import CustomUser, Inventory, Order, AddToCart
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F, Count, Q, Sum

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
# Create your views here.

class CustomUserList(APIView):
    def get(self, request):
        user = CustomUser.objects.get(id=request.query_params.get("id"))
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("User created successfully")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Failed to create User")
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class InventoryList(APIView):
    def get(self, request):
        users = Inventory.objects.all()
        serializer = InventorySerializer(users, many=True)
        return Response(serializer.data)

    def post(self):
        pass

class InventoryDetail(APIView):
    def get(self, request):
        inventoryId = request.query_params.get("id")
        # inventoryDetail = Inventory.objects.get(id=inventoryId)
        # serializer = InventorySerializer(inventoryDetail)
        # inventoryDetailWithoutSeller = Inventory.objects.filter(id=inventoryId).defer("seller")
        inventoryDetailInstance = Inventory.objects.get(id=inventoryId)
        seller_name = inventoryDetailInstance.seller.username
        serializedInventory = InventorySerializer(inventoryDetailInstance)
        return Response({**serializedInventory.data, "seller":seller_name})

    def post(self):
        pass

class InventoryTitleList(APIView):
    def get(self, request):
        users = Inventory.objects.only("title","id")
        serializer = InventorySerializer(users, many=True)
        return Response(serializer.data)
    
class HotSalesInventoryList(APIView):
    def get(self, request):
        inventory = Inventory.objects.order_by("-hotSalesScore").values("title","id","name", "price","imageUrl","rating","category","color")[:5]
        # serializer = HotSalesInventorySerializer(inventory, many=True)
        # return Response(serializer.data)
        return Response(inventory)
    
class InventoryCategory(APIView):
    def get(self, request):
        category = Inventory.objects.values("category").distinct()
        print(category)
        # serializer = InventoryCategorySerializer(category, many=True)
        # print("InventoryCategory Serializer",serializer.data)
        # return Response(serializer.data)
        return Response(category)
    

class SearchInventory(APIView):
    def get(self, request):
        query_params = request.query_params
        # print("Query Params are ",query_params)
        category = query_params.get("category")
        title = query_params.get("title")
        print("Category is ",category)
        print("Title is ",title)

        if title == "" and category == "":
            inventory = Inventory.objects.values("title","id","name", "price","imageUrl","rating","category","quantity","color")
            return Response(inventory)
        elif category != "":
            inventory = Inventory.objects.filter(category__iexact=category).values("title","id","name", "price","imageUrl","rating","category","quantity","color")
            return Response(inventory)
        elif title != "":
            inventory = Inventory.objects.filter(title__icontains=title).values("title","id","name", "price","imageUrl","rating","category","quantity","color")
            return Response(inventory)
        else:
            inventory = Inventory.objects.filter(title__icontains=title,category__iexact=category).values("title","id","name", "price","imageUrl","rating","category","quantity","color")
            return Response(inventory)

class AddToCartAPIView(APIView):
    def get(self, request):
        AddToCartInstance = AddToCart.objects.filter(user__exact=request.query_params.get("id")).values("inventory","user","quantity","selectedColor")
        print("Get Method to AddToCart : ", AddToCartInstance)
        # serializer = InventoryCategorySerializer(category, many=True)
        # print("InventoryCategory Serializer",serializer.data)
        # return Response(serializer.data)
        responseData = []
        for cart in AddToCartInstance:
            inventoryId = cart["inventory"]
            quantity = cart["quantity"]
            selectedColor = cart["selectedColor"]
            try:
                inventoryData = Inventory.objects.filter(id=inventoryId).values("title","id","name", "price","imageUrl","rating","category","color")
                responseData.append({"inventory":inventoryData,"quantity":quantity,"selectedColor":selectedColor})
            except Exception as e:
                print("Something wrong with Get Inventory for AddToCart : ",e)
        print("Response Data for GET Method AddToCart : ",responseData)
        return Response(responseData)
    
    def post(self, request):
        targetUser = request.data["user"]
        print("AddToCart POST Method Request Data : ", request.data)
        serializer = AddToCartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("AddToCart created successfully")
            # To summarize duplicate entries if any
            AddToCartWithTotal = AddToCart.objects.values("inventory","user","selectedColor").annotate(total=Sum("quantity"))
            print("AddToCartWithTotal",AddToCartWithTotal)
            for cart in AddToCartWithTotal:
                inventory = cart["inventory"]
                user = cart["user"]
                total = cart["total"]
                selectedColor = cart["selectedColor"]
                updatedInventory= AddToCart.objects.filter(inventory=inventory,user=user,selectedColor=selectedColor).first()
                print(AddToCart.objects.values_list("selectedColor", flat=True))
                print("Inside Loop, updatedInventory is ", updatedInventory)
                if updatedInventory:
                    print("Need to Update AddToCart to new Total")
                    updatedInventory.quantity = total
                    updatedInventory.save()
                else:
                    print("Create a new AddToCart because it does not exist, something wrong with the filter")
                    raise Exception("Create a new AddToCart because it does not exist, something wrong with the filter")
                    # Look for inventory and User instance
                    # InventoryInstance = Inventory.objects.get(id=inventory)
                    # UserInstance = CustomUser.objects.get(id=user)
                    # AddToCart.objects.create(inventory=InventoryInstance,user=UserInstance,selectedColor=selectedColor, quantity = total)
                # Delete all other duplicate entries
                AddToCart.objects.filter(inventory=inventory,user=user,selectedColor=selectedColor).exclude(id=updatedInventory.id).delete()
            print("Updated AddToCart : ", AddToCart.objects.values("inventory","user","quantity").filter(user=targetUser))
            return Response(AddToCart.objects.values(), status=status.HTTP_201_CREATED)

        else:
            print("Failed to create AddToCart")
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
class OrderAPI(APIView):
    def post(self, request):
        print("Request Data for makeOrder : ",request.data)
        buyer = request.data["user"]
        buyerInstance = CustomUser.objects.get(id=buyer)
        orderList = request.data["orderList"]
        totalPrice = request.data["totalPrice"]
        print("Order List : ",orderList)

        # Check if Seller's Inventory has enough quantity
        notEnoughQuantityResponse = []
        for order in orderList:
            inventoryId = order["id"]
            quantity = order["quantity"]
            try:
                inventory = Inventory.objects.get(id=inventoryId)
                if inventory.quantity < quantity:
                    notEnoughQuantityMessage = f"Inventory {inventory.title} has only left Quantity ({inventory.quantity}) in Seller's Inventory"
                    notEnoughQuantityResponse.append(notEnoughQuantityMessage)
            except Exception as e:
                print("Error in MakeOrder : ",e)
                return Response({"message":"Error in MakeOrder with Quantity issue"},status=status.HTTP_400_BAD_REQUEST)
        
        if len(notEnoughQuantityResponse) > 0:
            return Response({"message": ", ".join(notEnoughQuantityResponse)},status=status.HTTP_400_BAD_REQUEST)
            
        # Create Order
        for order in orderList:
            inventoryId = order["id"]
            quantity = order["quantity"]
            selectedColor = order["selectedColor"]
            try:
                inventory = Inventory.objects.get(id=inventoryId)
                seller = inventory.seller
                print("Seller is ",seller)
                # Update Inventory Quantity
                inventory.quantity = F("quantity") - quantity
                inventory.save()
                # Create Order
                Order.objects.create(inventory=inventory, buyer=buyerInstance, seller=seller, status="Pending Seller's Confirmation", quantity=quantity,selectedColor=selectedColor)
            except Exception as e:
                print("Error in MakeOrder : ",e)
                return Response({"message":"Error in MakeOrder"},status=status.HTTP_400_BAD_REQUEST)
            
        # Delete AddToCart Entries
        AddToCart.objects.filter(user=buyer).delete()
        return Response({"message":"Order Created Successfully"},status=status.HTTP_201_CREATED)
    
    def get(self, request):
        try:
            role = request.query_params.get("role")
            userId = request.query_params.get("userId")
            print("Inside Pending CurrentOrder API GET Method")
            print("Role is ",role)
            print("UserId is ",userId)
            orderList = Order.objects.filter(Q(buyer=request.query_params.get("userId")) | Q(seller=request.query_params.get("userId"))).exclude(Q(status__icontains="Cancelled")).exclude(Q(status="Received by Buyer")).values("id","inventory","buyer","seller","status","orderDate","quantity","selectedColor")
            print("Current Pending Order List is ",orderList)
            orderResponse = []
            for order in orderList:
                inventoryId = order["inventory"]
                inventory = Inventory.objects.get(id=inventoryId)
                order["inventory"] = inventory.title
                orderResponse.append({
                    "orderId":order["id"],
                    "inventory":{
                        "title":inventory.title,
                        "id":inventory.id,
                        "name":inventory.name,
                        "price":inventory.price,
                        "imageUrl":inventory.imageUrl,
                        "rating":inventory.rating,
                        "category":inventory.category
                    },
                    "buyer":CustomUser.objects.get(id=order["buyer"]).username,
                    "seller":CustomUser.objects.get(id=order["seller"]).username,
                    "status":order["status"],
                    "orderDate":order["orderDate"],
                    "quantity":order["quantity"],
                    "selectedColor": order["selectedColor"]
                })
            orderResponse.sort(key= lambda order: order["orderDate"], reverse=True)
            print("Sorted Order Response is ", orderResponse)
            return Response(orderResponse)
        except Exception as e:
            print("Error in viewOrder : ",e)
            return Response({"message": f"Error in viewOrder : {e}"},status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        # Cancel Order
        try:
            orderId = request.data["orderId"]
            role = request.data["role"]
            if role == "Buyer":
                cancelOrder = Order.objects.get(id=orderId)
                cancelOrder.status = "Cancelled by Buyer"
                cancelOrder.save()
                return Response({"message":"Order Cancelled Successfully by Buyer"},status=status.HTTP_200_OK)
            elif role == "Seller":
                cancelOrder = Order.objects.get(id=orderId)
                cancelOrder.status = "Cancelled by Seller"
                cancelOrder.save()  
                return Response({"message":"Order Cancelled Successfully by Seller"},status=status.HTTP_200_OK)
        except Exception as e:
            print("Error in viewOrder : ",e)
            return Response({"message": f"Error in viewOrder : {e}"},status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        # Update Order Status
        try:
            print("Patch OrderAPI Request Data is ", request.data)
            requestData = request.data["data"]
            orderId = requestData["orderId"]
            role = requestData["role"]
            updatedStatus = requestData["updatedStatus"]
            print(f"orderId is {orderId}, role is {role}, updatedStatus is {updatedStatus}")
            updatedOrder = Order.objects.get(id=orderId)
            print("updatedOrder Instance is ", updatedOrder)
            updatedOrder.status = updatedStatus
            updatedOrder.save()
            print(f"Updated Order Status : orderId : {orderId}, role : {role}, updatedStatus : {updatedStatus}")
            return Response({"message":"Order Status Updated Successfully"},status=status.HTTP_200_OK)
        except Exception as e:
            print("Error in Patch ViewOrder : ",e)
            return Response({"message": f"Error in viewOrder : {e}"},status=status.HTTP_400_BAD_REQUEST)
        
class HistoricalOrderAPI(APIView):
    def get(self, request):
        try:
            orderList = Order.objects.filter(Q(buyer=request.query_params.get("userId")) | Q(seller=request.query_params.get("userId")),Q(status__icontains="Cancelled") | (Q(status="Received by Buyer"))).values("id","inventory","buyer","seller","status","orderDate","quantity","selectedColor")
            print("Historical Order List is ",orderList)
            orderResponse = []
            for order in orderList:
                inventoryId = order["inventory"]
                inventory = Inventory.objects.get(id=inventoryId)
                order["inventory"] = inventory.title
                orderResponse.append({
                    "orderId":order["id"],
                    "inventory":{
                        "title":inventory.title,
                        "id":inventory.id,
                        "name":inventory.name,
                        "price":inventory.price,
                        "imageUrl":inventory.imageUrl,
                        "rating":inventory.rating,
                        "category":inventory.category
                    },
                    "buyer":CustomUser.objects.get(id=order["buyer"]).username,
                    "seller":CustomUser.objects.get(id=order["seller"]).username,
                    "status":order["status"],
                    "orderDate":order["orderDate"],
                    "quantity":order["quantity"],
                    "selectedColor": order["selectedColor"]
                })
            orderResponse.sort(key= lambda order: order["orderDate"], reverse=True)
            print("Sorted Order Response is ", orderResponse)
            return Response(orderResponse)
        except Exception as e:
            print("Error in viewOrder : ",e)
            return Response({"message": f"Error in viewOrder : {e}"},status=status.HTTP_400_BAD_REQUEST)