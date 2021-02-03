from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import PermissionsMixin

# Create your models here.


class product(models.Model):
    title=models.CharField(max_length=50)
    price=models.FloatField(default=0.00)
    discount_price=models.FloatField(null=True,blank=True)
    small_desc=models.CharField(max_length=50)
    big_desc=models.TextField()
