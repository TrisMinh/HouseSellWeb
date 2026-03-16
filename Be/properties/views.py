from rest_framework import generics, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import Property, PropertyImage, Favorite
from .serializers import (
    PropertyListSerializer, PropertyDetailSerializer,
    PropertyCreateUpdateSerializer, PropertyImageUploadSerializer,
    FavoriteSerializer,
)
from .filters import PropertyFilter
from .permissions import IsOwnerOrReadOnly


# ─────────────────────────────────────────────
# CRUD Bất động sản
# ─────────────────────────────────────────────

class PropertyListCreateView(generics.ListCreateAPIView):
    """
    GET  /properties/       → Danh sách BĐS (public, có filter/search)
    POST /properties/       → Tạo BĐS mới (yêu cầu đăng nhập)
    """
    queryset = Property.objects.filter(is_active=True).prefetch_related('images')
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = PropertyFilter
    search_fields = ['title', 'description', 'province', 'district', 'address']
    ordering_fields = ['price', 'area', 'created_at', 'views_count']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PropertyCreateUpdateSerializer
        return PropertyListSerializer


class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /properties/<id>/   → Chi tiết BĐS (tăng views_count)
    PUT    /properties/<id>/   → Cập nhật (chỉ chủ sở hữu)
    PATCH  /properties/<id>/   → Cập nhật 1 phần
    DELETE /properties/<id>/   → Xóa (chỉ chủ sở hữu)
    """
    queryset = Property.objects.filter(is_active=True).prefetch_related('images')
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return PropertyCreateUpdateSerializer
        return PropertyDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Tăng lượt xem mỗi lần truy cập
        Property.objects.filter(pk=instance.pk).update(views_count=instance.views_count + 1)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class MyPropertiesView(generics.ListAPIView):
    """GET /properties/my/ → Danh sách BĐS của tôi"""
    serializer_class = PropertyListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user).prefetch_related('images')


# ─────────────────────────────────────────────
# Ảnh BĐS
# ─────────────────────────────────────────────

class PropertyImageUploadView(APIView):
    """POST /properties/<id>/images/ → Upload ảnh cho BĐS"""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(request_body=PropertyImageUploadSerializer)
    def post(self, request, pk):
        try:
            prop = Property.objects.get(pk=pk, owner=request.user)
        except Property.DoesNotExist:
            return Response({'error': 'Không tìm thấy hoặc bạn không có quyền!'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PropertyImageUploadSerializer(
            data=request.data,
            context={'property': prop, 'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PropertyImageDeleteView(APIView):
    """DELETE /properties/images/<id>/ → Xóa ảnh"""
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            img = PropertyImage.objects.get(pk=pk, property__owner=request.user)
            img.image.delete(save=False)
            img.delete()
            return Response({'message': 'Đã xóa ảnh thành công!'})
        except PropertyImage.DoesNotExist:
            return Response({'error': 'Không tìm thấy!'}, status=status.HTTP_404_NOT_FOUND)


# ─────────────────────────────────────────────
# Yêu thích
# ─────────────────────────────────────────────

class FavoriteListView(generics.ListAPIView):
    """GET /properties/favorites/ → Danh sách BĐS yêu thích của tôi"""
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user).select_related('property')


class FavoriteToggleView(APIView):
    """POST /properties/<id>/favorite/ → Toggle thêm/xóa yêu thích"""
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            prop = Property.objects.get(pk=pk, is_active=True)
        except Property.DoesNotExist:
            return Response({'error': 'Không tìm thấy BĐS!'}, status=status.HTTP_404_NOT_FOUND)

        favorite, created = Favorite.objects.get_or_create(user=request.user, property=prop)
        if not created:
            favorite.delete()
            return Response({'message': 'Đã xóa khỏi yêu thích', 'is_favorited': False})
        return Response({'message': 'Đã thêm vào yêu thích', 'is_favorited': True}, status=status.HTTP_201_CREATED)
