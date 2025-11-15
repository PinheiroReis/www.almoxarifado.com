from django.db import models


class Item(models.Model):
    category = models.ForeignKey(
        to="categories.ItemCategory",
        to_field="name",
        related_name="item",
        on_delete=models.CASCADE,
    )
    description = models.TextField(verbose_name="Descrição do item", max_length=200)
    pub_date = models.DateTimeField(verbose_name="Data de publicação")

    def __str__(self):
        return f"{self.category.name}_ID_{self.id}"
