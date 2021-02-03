#from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status,permissions
from django.http import Http404
from .serializers import ProductSerialiser,UserSerializer
from .models import product
# Create your views here.


class Products(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        products = product.objects.all()
        serializer = ProductSerialiser(products, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProductSerialiser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ProductView(APIView):
    def get_object(self,pk):
        try:
            return product.objects.get(pk=pk)
        except product.DoesNotExist:
            return Http404

    def get(self, request,pk,format=None):
        prod=self.get_object(pk)
        serialiser=ProductSerialiser(prod ,many=False)
        return Response(serialiser.data)

    def post(self, request,pk,format=None):
        prod=self.get_object(pk)
        serializer=ProductSerialiser(prod,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)        
        return Response(status=status.HTTP_400_BAD_REQUEST)      

    def delete(self,request,pk,format=None):
        prod=self.get_object(pk)
        prod.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)      


class current_user(APIView):
    def get(self,request,format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)




class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
