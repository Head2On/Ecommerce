# store/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'products', views.ProductViewset, basename='product')
router.register(r'banners', views.BannerViewset, basename='banner')
router.register(r'footers', views.FooterViewset, basename='footer')
router.register(r'cart', views.CartViewSet, basename='cart')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]