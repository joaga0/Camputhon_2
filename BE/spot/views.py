from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import SpotSerializer, NewSpotSerializer
from .models import Spot

class SpotViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    serializer_class = SpotSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Spot.objects.filter(post_user=user_id)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def join(self, request, pk=None):
        spot = self.get_object()
        spot.join_user.add(request.user)
        spot.save()
        return Response({'status': 'joined'})

class NewSpotViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Spot.objects.all()
    serializer_class = NewSpotSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(post_user=self.request.user)
