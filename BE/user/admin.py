from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'name', 'nickname', 'university', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'university')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('name', 'nickname', 'university', 'status', 'icon', 'latitude', 'longitude')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'name', 'nickname', 'university', 'is_staff', 'is_active'),
        }),
    )
    search_fields = ('username', 'email', 'name', 'nickname', 'university')
    ordering = ('username',)
    filter_horizontal = ('groups', 'user_permissions',)

admin.site.register(CustomUser, CustomUserAdmin)
