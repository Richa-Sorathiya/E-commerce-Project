from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import *
from .serializers import *

# Create your views here.

@api_view(['GET'])

def get_product(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])


def get_products(request, pk):
    try:
        product=Product.objects.get(id=pk)
        serializer=ProductSerializer(product, context={'request': request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'erroe': 'Product not dound'}, status=404)    

@api_view(['GET'])

def get_categories(request):
    categories=Category.objects.all()
    serializer=CategorySerializers(categories,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def get_cart(request):
    cart, created=Cart.objects.get_or_create(user=request.user)
    serializers=CartSerializer(cart)
    return Response(serializers.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def add_to_cart(request):
    product_id=request.data.get('product_id')
    product=Product.objects.get(id=product_id)
    cart, created= Cart.objects.get_or_create(user=request.user)
    item, created= CartItem.objects.get_or_create(cart=cart, product=product)
    
    if not created:
        item.quantity +=1
        item.save()
    serializer= CartSerializer(cart)
    return Response({"'message': 'Product added' " : CartSerializer(cart).data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def update_cart_quantity(request):
    item_id=request.data.get('item_id')
    quantity=request.data.get('quantity')
    # CartItem.objects.filter(id=item_id).delete()
    # return Response ({'message': 'Item removed from cart'})
    
    
    if not item_id or quantity is None:
        return Response({'error': 'Item Id and quantity are required'}, status=400)
    
    try:
        item=CartItem.objects.get(id=item_id)
        if int(quantity) <1:
            item.delete()
            return Response({'message':'Quantitity must be at least 1'}, status=400)
        
        item.quantity=quantity
        item.save()
        serializer=CartItemSerializer(item)
        return Response(serializer.data)
    
    
    except CartItem.DoesNotExist:
       return Response({'error': 'Cart item not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id=request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({'message':'Item removed'})

   

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def create_order(request):
    try:
        data=request.data
        
        name=data.get('name')
        address=data.get('phone')
        phone=data.get('phone')
        pyment_method=data.get('payment_metjode', 'cod')
        
        # validate Cart
        
        if not phone.isdigit() or len(phone) <10:
            return Response({'error': 'Invalid phone number'}, status=400)
        
        cart, created=Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)
        
        total = sum([item.product.price * item.quantity for item in cart.items.all()])
        
        order=Order.objects.create(user=request.user, total_amout=total)
        
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
            
        cart.items.all().delete()
        return Response({'message':'Order created successfully', 'order_id': order.id})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
   

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializers=RegisterSerializer(data=request.data)
    if serializers.is_valid():
        user=serializers.save()
        return Response({'meaage':'user created Successfully',"user":UserSerializer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

