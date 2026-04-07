from rest_framework import serializers
from .models import Property, PropertyImage, Favorite


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'caption', 'is_primary', 'order']


class PropertyListSerializer(serializers.ModelSerializer):
    """Serializer nhẹ dùng cho danh sách (tốc độ)"""
    owner_name   = serializers.CharField(source='owner.get_full_name', read_only=True)
    primary_image = serializers.SerializerMethodField()
    listing_type_display  = serializers.CharField(source='get_listing_type_display', read_only=True)
    property_type_display = serializers.CharField(source='get_property_type_display', read_only=True)
    status_display        = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'property_type', 'property_type_display',
            'listing_type', 'listing_type_display', 'status', 'status_display',
            'price', 'area', 'bedrooms', 'bathrooms',
            'city', 'district', 'address',
            'owner_name', 'primary_image', 'views_count', 'is_featured',
            'created_at',
        ]

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        if img:
            request = self.context.get('request')
            return request.build_absolute_uri(img.image.url) if request else img.image.url
        return None


class PropertyDetailSerializer(serializers.ModelSerializer):
    """Serializer đầy đủ dùng cho chi tiết"""
    images        = PropertyImageSerializer(many=True, read_only=True)
    owner_name    = serializers.CharField(source='owner.get_full_name', read_only=True)
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    listing_type_display  = serializers.CharField(source='get_listing_type_display', read_only=True)
    property_type_display = serializers.CharField(source='get_property_type_display', read_only=True)
    status_display        = serializers.CharField(source='get_status_display', read_only=True)
    is_favorited  = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = '__all__'

    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, property=obj).exists()
        return False


class PropertyCreateUpdateSerializer(serializers.ModelSerializer):
    """Dùng khi tạo hoặc cập nhật BĐS"""
    class Meta:
        model = Property
        exclude = ['owner', 'views_count', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Gán owner từ request.user (set ở view)
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)


class PropertyImageUploadSerializer(serializers.ModelSerializer):
    """Upload ảnh cho BĐS"""
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'caption', 'is_primary', 'order']

    def create(self, validated_data):
        validated_data['property'] = self.context['property']
        # Nếu đánh dấu là primary, bỏ primary cũ
        if validated_data.get('is_primary'):
            PropertyImage.objects.filter(
                property=self.context['property'], is_primary=True
            ).update(is_primary=False)
        return super().create(validated_data)


class FavoriteSerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source='property.title', read_only=True)
    property_id    = serializers.IntegerField(source='property.id', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'property_id', 'property_title', 'created_at']
