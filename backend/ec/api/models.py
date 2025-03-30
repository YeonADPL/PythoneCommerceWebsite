from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
from django.db.models.functions import Now
# Create your models here.

sexList = {"Male":"Male", "Female":"Female"}

class CustomUser(AbstractUser):

    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    age = models.IntegerField(blank=True, null=True)
    sex = models.CharField(max_length=20, choices=sexList,blank=True, null=True)
    phoneNumber = models.CharField(max_length=20,blank=True, null=True)
    role = models.CharField(max_length=20,blank=True, null=True)
    date_joined = models.DateTimeField(db_default=Now())

    class Meta:
        db_table = "user"

    def __str__(self):
        return f"{self.username}'s role is {self.role}"
    

class Inventory(models.Model):
    inventoryId = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    color = ArrayField(models.CharField(max_length=50))
    material = ArrayField(models.CharField(max_length=50))
    hotSalesScore = models.DecimalField(max_digits=10, decimal_places=2)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    dimensions = models.JSONField()
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    imageUrl = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    class Meta:
        db_table = "inventory"

    def __str__(self):
        return str(self.title)
    
class Order(models.Model):
    orderId = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="buyer")
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="seller")
    orderDate = models.DateTimeField(db_default=Now())
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)

    class Meta:
        db_table = "order_info"

    def __str__(self):
        return f"Order ID : {self.orderId},  item {self.inventory.title} from {self.seller.username} by {self.buyer.username} at {self.orderDate}"
    
class AddToCart(models.Model):
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE, blank=True, null=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}'s AddToCart has {self.inventory}"
    