from rest_framework import serializers

from .models import Item, StockMovement


class ItemSerializer(serializers.ModelSerializer):
    categories = serializers.StringRelatedField(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=__import__('categories.models', fromlist=['Category']).Category.objects.all(),
        source='categories',
        write_only=True,
        required=False
    )
    is_low_stock = serializers.ReadOnlyField()

    class Meta:
        model = Item
        fields = [
            "id", "name", "code", "manufacturer", "price", "description",
            "quantity", "minimum_stock", "processor", "ram", "storage",
            "screen_size", "camera_resolution", "operating_system", "color",
            "voltage", "dimensions", "resolution", "connectivity", "ports",
            "material", "weight", "categories", "category_ids", "status",
            "is_low_stock", "created_at", "updated_at"
        ]
        read_only_fields = ["created_at", "updated_at", "is_low_stock"]


class StockMovementSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.name', read_only=True)
    
    class Meta:
        model = StockMovement
        fields = ["id", "item", "item_name", "movement_type", "quantity", "date", "notes", "created_at"]
        read_only_fields = ["created_at"]
    
    def validate(self, data):
        if data.get('movement_type') == 'SAIDA':
            item = data.get('item')
            quantity = data.get('quantity')
            if item and item.quantity < quantity:
                raise serializers.ValidationError(
                    f"Quantidade insuficiente em estoque. Disponível: {item.quantity}"
                )
        return data
