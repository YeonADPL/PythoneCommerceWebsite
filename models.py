from django.db import models
from django.contrib.postgres.fields import ArrayField
# Create your models here.

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

    class Meta:
        db_table = "inventory"

    def __str__(self):
        return str(self.title)