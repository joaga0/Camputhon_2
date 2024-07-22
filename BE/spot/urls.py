from django.urls import path, include
from rest_framework import routers
from .views import *

app_name="spot"

spot_router =routers.SimpleRouter(trailing_slash=False)
spot_router.register("home",SpotViewSet,basename="home")

newspot_router =routers.SimpleRouter(trailing_slash=False)
newspot_router.register("new_spot",NewSpotViewSet,basename="home")

urlpatterns = [
    path("<int:user_id>/",include(spot_router.urls)),
    path("home/<int:user_id>/",include(newspot_router.urls)),
]
