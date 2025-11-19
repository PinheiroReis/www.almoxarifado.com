from rest_framework import serializers

from .models import Item


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = Item
        fields = ["url", "id", "categories", "description", "status"]
