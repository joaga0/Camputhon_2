from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Spot

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class SpotSerializer(serializers.ModelSerializer):
    join_user = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Spot
        fields = '__all__'

class NewSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        exclude = ['post_user', 'join_user', 'latitude', 'longitude']

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['post_user'] = request.user
        return super().create(validated_data)
