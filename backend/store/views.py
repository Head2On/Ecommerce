from rest_framework import viewsets
from .models import * 
from . serializers import *
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class ProductViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers

class BannerViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializers    

class FooterViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializers    

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated] # Only logged-in users can access their cart

    def get_queryset(self):
        """
        This view should return a list of all the carts
        for the currently authenticated user.
        """
        user = self.request.user
        return Cart.objects.filter(user=user)

    def perform_create(self, serializer):
        """ Associate cart with the current user """
        serializer.save(user=self.request.user)