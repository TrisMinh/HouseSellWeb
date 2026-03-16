from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .repositories import NewsRepository
from .serializers import NewsSerializer
from .services import NewsService

class NewsListView(generics.ListCreateAPIView):
    """
    GET: Lấy danh sách tin tức đã xuất bản (cho khách xem)
    POST: Đăng tin tức mới (Admin/Nhân viên)
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = NewsSerializer

    def get_queryset(self):
        # Người dùng thường chỉ thấy bài đăng public
        return NewsRepository.get_published_news()

    def post(self, request, *args, **kwargs):
        # Đăng bài viết (Cần login)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        news_item = NewsService.create_news(
            user=request.user, 
            validated_data=serializer.validated_data
        )
        return Response(NewsSerializer(news_item).data, status=status.HTTP_201_CREATED)


class NewsDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Xem chi tiết bài báo (Sẽ tăng lượt view)
    PUT/PATCH: Cập nhật nội dung (Chỉ tác giả / admin)
    DELETE: Xóa bài báo (Chỉ tác giả / admin)
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = NewsSerializer

    def get_queryset(self):
        # Tự động lấy bài viết public nếu khách, cho phép tác giả xem bài chưa publish
        return NewsRepository.get_all_news()

    def get_object(self):
        obj = super().get_object()
        # Nếu GET, tăng view count
        if self.request.method == 'GET':
            NewsService.increment_view_count(obj.id)
            # Fetch again since view count was updated
            obj = super().get_object()
        return obj

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        news_item = NewsService.update_news(
            user=request.user, 
            news_id=self.kwargs['pk'], 
            validated_data=serializer.validated_data
        )
        return Response(NewsSerializer(news_item).data)

    def delete(self, request, *args, **kwargs):
        NewsService.delete_news(user=request.user, news_id=self.kwargs['pk'])
        return Response({'message': 'Đã xóa bài viết thành công'}, status=status.HTTP_200_OK)
