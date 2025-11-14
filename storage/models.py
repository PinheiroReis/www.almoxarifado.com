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


class Item(models.Model):
    category = models.ForeignKey(
        to=ItemCategory, to_field="name", related_name="item", on_delete=models.CASCADE
    )
    description = models.TextField(verbose_name="Descrição do item", max_length=200)
    pub_date = models.DateTimeField(verbose_name="Data de publicação")

    def __str__(self):
        return f"{self.category.name}-{self.id}"
