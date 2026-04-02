from django.db import models

# Create your models here.


class TodoApp(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    status = models.CharField(
        max_length=100,
        choices=(("completed", "completed"), ("incompleted", "incompleted")),
    )
    

    #  transaction_type = models.CharField(
    #     max_length=100, choices=(("CREDIT", "CREDIT"), ("DEBIT", "DEBIT"))
    # )
