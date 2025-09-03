from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255,unique=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    details = models.TextField()
    image = models.ImageField(upload_to='images/product/')

    def __str__(self):
        return self.name
    
class Banner(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, unique=True)
    descrip = models.CharField(max_length=255)
    smalltxt = models.CharField(max_length=100)
    buttontxt = models.CharField(max_length=50)
    midtxt = models.CharField(max_length=100)
    largetxt = models.CharField(max_length=100)
    largetxt2 = models.CharField(max_length=100)
    discount = models.IntegerField(choices=[(i, i) for i in range(0, 101)])
    saletime = models.DateTimeField()
    image = models.ImageField(upload_to='images/banners/')

    def __str__(self):
        return self.product.name

class Footer(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, unique=True)
    descrip = models.CharField(max_length=255)
    smalltxt = models.CharField(max_length=100)
    buttontxt = models.CharField(max_length=50)
    midtxt = models.CharField(max_length=100)
    largetxt = models.CharField(max_length=100)
    largetxt2 = models.CharField(max_length=100)
    discount = models.IntegerField(choices=[(i, i) for i in range(0, 101)])
    saletime = models.DateTimeField()
    image = models.ImageField(upload_to='images/footers/')

    def __str__(self):
        return self.product.name
    

class Cart(models.Model):
    """
    Represents a user's shopping cart.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username}"

class CartItem(models.Model):
    """
    Represents a single item within a cart.
    """
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
 