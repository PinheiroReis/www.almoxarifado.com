from django.db import models


class Status(models.TextChoices):
    IN_USE = "IN_USE", "In Use"
    MAINTENANCE = "MAINTENANCE", "Maintenance"
    AVAILABLE = "AVAILABLE", "Available"
    BROKEN = "BROKEN", "Broken"


class Item(models.Model):
    categories = models.ManyToManyField("categories.Category", related_name="items")
    description = models.CharField(max_length=100)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.AVAILABLE,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Item-{self.id}"
