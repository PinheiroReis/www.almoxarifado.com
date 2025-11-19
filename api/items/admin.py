from django.contrib import admin
from .models import Item, StockMovement


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'manufacturer', 'price', 'quantity', 'minimum_stock', 'is_low_stock', 'status']
    list_filter = ['status', 'manufacturer', 'categories']
    search_fields = ['name', 'code', 'manufacturer', 'description']
    filter_horizontal = ['categories']
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'code', 'manufacturer', 'price', 'description', 'categories')
        }),
        ('Estoque', {
            'fields': ('quantity', 'minimum_stock', 'status')
        }),
        ('Especificações Técnicas', {
            'fields': ('processor', 'ram', 'storage', 'screen_size', 'camera_resolution', 'operating_system', 'color'),
            'classes': ('collapse',)
        }),
        ('Atributos Comuns', {
            'fields': ('voltage', 'dimensions', 'resolution', 'connectivity', 'ports', 'material', 'weight'),
            'classes': ('collapse',)
        }),
    )


@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = ['item', 'movement_type', 'quantity', 'date', 'created_at']
    list_filter = ['movement_type', 'date']
    search_fields = ['item__name', 'item__code', 'notes']
    date_hierarchy = 'date'
