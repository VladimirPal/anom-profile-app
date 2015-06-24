from django.conf.urls import url, include
from rest_framework import routers

from .views import ProfileViewSet

router = routers.DefaultRouter()
router.register(r'list', ProfileViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
