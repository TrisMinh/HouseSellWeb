from django.contrib import admin

from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "phone", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("user__username", "user__email", "phone")
