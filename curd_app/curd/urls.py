from django.urls import path,include

from . import views 
urlpatterns = [
    path('curd/current_user/', views.current_user.as_view(),name="current_user"),
    path('users/', views.UserList.as_view()),
    path('api/productslist',views.Products.as_view(),name='ListProducts'),
    path('api/productview/<int:pk>/',views.ProductView.as_view(),name='productView')
]
