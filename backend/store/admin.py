from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name','slug','price','details','image')

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('product','descrip','discount','saletime','image')

@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = ('product','discount','saletime','image')

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1 # How many empty rows to show

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'created_at']
    list_display_links = ['id', 'user']

    inlines = [CartItemInline]

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'cart', 'product', 'quantity']
    list_display_links = ['id', 'cart']
