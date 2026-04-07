from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile


class RegisterSerializer(serializers.ModelSerializer):
    """Validate dữ liệu đăng ký từ FE"""
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Mật khẩu không khớp!")
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email này đã được dùng!")
        return data


class LoginSerializer(serializers.Serializer):
    """Validate dữ liệu đăng nhập"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class UserProfileSerializer(serializers.ModelSerializer):
    """Đọc/ghi thông tin profile người dùng"""
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'first_name', 'last_name',
                  'phone', 'avatar', 'address', 'bio']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        instance.user.first_name = user_data.get('first_name', instance.user.first_name)
        instance.user.last_name = user_data.get('last_name', instance.user.last_name)
        instance.user.save()
        return super().update(instance, validated_data)


class ChangePasswordSerializer(serializers.Serializer):
    """Validate đổi mật khẩu"""
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=6)
    new_password_confirm = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['new_password_confirm']:
            raise serializers.ValidationError("Mật khẩu mới không khớp!")
        return data
