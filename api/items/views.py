from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction

from .models import Item, StockMovement
from .serializers import ItemSerializer, StockMovementSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by("name")
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'code', 'manufacturer', 'description']
    ordering_fields = ['name', 'code', 'price', 'quantity', 'created_at']
    ordering = ['name']

    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        """Return items with low stock"""
        low_stock_items = [item for item in self.queryset if item.is_low_stock]
        serializer = self.get_serializer(low_stock_items, many=True)
        return Response(serializer.data)


class StockMovementViewSet(viewsets.ModelViewSet):
    queryset = StockMovement.objects.all()
    serializer_class = StockMovementSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['date', 'created_at']
    ordering = ['-date', '-created_at']
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        movement = serializer.save()
        item = movement.item
        
        # Update item quantity based on movement type
        if movement.movement_type == 'ENTRADA':
            item.quantity += movement.quantity
        else:  # SAIDA
            item.quantity -= movement.quantity
        
        item.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
