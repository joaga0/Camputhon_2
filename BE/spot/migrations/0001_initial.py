# Generated by Django 5.0.7 on 2024-07-21 19:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Spot',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('update_time', models.DateTimeField(auto_now=True)),
                ('category', models.CharField(max_length=20)),
                ('event_start_time', models.TimeField()),
                ('event_end_time', models.TimeField()),
                ('people', models.IntegerField()),
                ('is_friend', models.BooleanField()),
                ('icon', models.IntegerField()),
                ('join_user', models.ManyToManyField(related_name='joined_events', to=settings.AUTH_USER_MODEL)),
                ('post_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posted_events', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
