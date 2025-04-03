from django.urls import path
from api import views
from dj_rest_auth.views import LoginView

urlpatterns = [
    path("", views.index),
    path("getInventoryTitleList", views.InventoryTitleList.as_view()),
    path("userinfo", views.CustomUserList.as_view()),
    path("login", LoginView.as_view(), name="login"),
    path("signup", views.CustomUserList.as_view(), name="signup"),
    path("getHotSalesInventory", views.HotSalesInventoryList.as_view()),
    path("getInventoryCategory", views.InventoryCategory.as_view()),
    path("searchInventory", views.SearchInventory.as_view()),
    path("addToCart", views.AddToCartAPIView.as_view()),
    path("myCart", views.AddToCartAPIView.as_view()),
    path("makeOrder", views.OrderAPI.as_view()),
    path("viewOrder", views.OrderAPI.as_view()),
    path("cancelOrder", views.OrderAPI.as_view()),
    path("updateOrderStatus", views.OrderAPI.as_view()),
    path("viewHistoricalOrder", views.HistoricalOrderAPI.as_view()),
    path("getInventoryDetail", views.InventoryDetail.as_view()),
]