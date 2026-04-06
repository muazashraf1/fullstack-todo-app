from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class TodoApp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # main issy add kr rha hon taak mai todos ko user k sath link kr skon
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    status = models.CharField(
        max_length=100,
        choices=(("completed", "completed"), ("incompleted", "incompleted")),
    )
    

    #  transaction_type = models.CharField(
    #     max_length=100, choices=(("CREDIT", "CREDIT"), ("DEBIT", "DEBIT"))
    # )
