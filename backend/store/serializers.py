from rest_framework import serializers
from .models import *

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    
class BannerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'
    
class FooterSerializers(serializers.ModelSerializer):
    class Meta:
        model =Footer
        fields = '__all__'

class SimpleProductSerializer(serializers.ModelSerializer):
    """ A simple serializer for nesting inside CartItem """
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image']



class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True) # For adding new items

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']
