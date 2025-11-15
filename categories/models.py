from django.db import models


class ItemCategory(models.Model):
    name = models.CharField(
        verbose_name="Nome do tipo",
        unique=True,
        max_length=100,
    )
    description = models.TextField(verbose_name="Descrição do Tipo", max_length=200)

    class Meta:
        verbose_name_plural = "Item categories"

    def __str__(self):
        return self.name
