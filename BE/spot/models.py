from django.db import models
from django.conf import settings
# from django.contrib.auth.models import User

class Spot(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    update_time = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=20)
    event_start_time = models.TimeField()  # 행사 시작 시간
    event_end_time = models.TimeField()    # 행사 종료 시간
    people = models.IntegerField()
    is_friend = models.BooleanField()
    icon = models.IntegerField()
    post_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posted_events', on_delete=models.CASCADE)
    join_user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='joined_events')