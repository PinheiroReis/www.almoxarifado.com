from django.db import models


class Status(models.TextChoices):
    IN_USE = "IN_USE", "In Use"
    MAINTENANCE = "MAINTENANCE", "Maintenance"
    AVAILABLE = "AVAILABLE", "Available"
    BROKEN = "BROKEN", "Broken"


class Item(models.Model):
    # Basic product information
    name = models.CharField(max_length=200, verbose_name="Nome")
    code = models.CharField(max_length=100, unique=True, verbose_name="Código")
    manufacturer = models.CharField(max_length=100, verbose_name="Fabricante")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Preço")
    description = models.TextField(blank=True, verbose_name="Descrição")
    
    # Stock information
    quantity = models.IntegerField(default=0, verbose_name="Quantidade")
    minimum_stock = models.IntegerField(default=5, verbose_name="Estoque Mínimo")
    
    # Technical specifications
    processor = models.CharField(max_length=200, blank=True, verbose_name="Processador")
    ram = models.CharField(max_length=50, blank=True, verbose_name="Memória RAM")
    storage = models.CharField(max_length=50, blank=True, verbose_name="Armazenamento")
    screen_size = models.CharField(max_length=50, blank=True, verbose_name="Tamanho da Tela")
    camera_resolution = models.CharField(max_length=50, blank=True, verbose_name="Resolução da Câmera")
    operating_system = models.CharField(max_length=100, blank=True, verbose_name="Sistema Operacional")
    color = models.CharField(max_length=50, blank=True, verbose_name="Cor")
    
    # Common attributes
    voltage = models.CharField(max_length=20, blank=True, verbose_name="Voltagem")
    dimensions = models.CharField(max_length=100, blank=True, verbose_name="Dimensões")
    resolution = models.CharField(max_length=50, blank=True, verbose_name="Resolução")
    connectivity = models.CharField(max_length=200, blank=True, verbose_name="Conectividade")
    ports = models.CharField(max_length=200, blank=True, verbose_name="Portas")
    material = models.CharField(max_length=100, blank=True, verbose_name="Material")
    weight = models.CharField(max_length=50, blank=True, verbose_name="Peso")
    
    categories = models.ManyToManyField("categories.Category", related_name="items")
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.AVAILABLE,
        verbose_name="Status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.code})"
    
    @property
    def is_low_stock(self):
        """Check if product is below minimum stock level"""
        return self.quantity <= self.minimum_stock


class StockMovement(models.Model):
    MOVEMENT_TYPE = [
        ('ENTRADA', 'Entrada'),
        ('SAIDA', 'Saída'),
    ]
    
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='movements', verbose_name="Produto")
    movement_type = models.CharField(max_length=10, choices=MOVEMENT_TYPE, verbose_name="Tipo de Movimentação")
    quantity = models.IntegerField(verbose_name="Quantidade")
    date = models.DateField(verbose_name="Data")
    notes = models.TextField(blank=True, verbose_name="Observações")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Movimentação de Estoque"
        verbose_name_plural = "Movimentações de Estoque"
        ordering = ['-date', '-created_at']
    
    def __str__(self):
        return f"{self.movement_type} - {self.item.name} - {self.quantity} unidades ({self.date})"
