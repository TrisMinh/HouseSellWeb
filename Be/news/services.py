from django.core.exceptions import PermissionDenied
from .repositories import NewsRepository

class NewsService:
    """
    Service layer containing business logic for News
    """

    @staticmethod
    def increment_view_count(news_id: int):
        news = NewsRepository.get_by_id(news_id)
        news.views_count += 1
        news.save(update_fields=['views_count'])
        return news

    @staticmethod
    def create_news(user, validated_data: dict):
        """
        Only staff or specific roles could create news (handled by permissions in View),
        but here we explicitly inject the user as author.
        """
        validated_data['author'] = user
        return NewsRepository.create_news(validated_data)

    @staticmethod
    def update_news(user, news_id: int, validated_data: dict):
        news = NewsRepository.get_by_id(news_id)
        
        # Security Rule: Only the author or a superuser can edit
        if news.author != user and not user.is_superuser:
            raise PermissionDenied("Bạn không có quyền sửa bài viết này.")
            
        for key, value in validated_data.items():
            setattr(news, key, value)
            
        news.save()
        return news
        
    @staticmethod
    def delete_news(user, news_id: int):
        news = NewsRepository.get_by_id(news_id)
        if news.author != user and not user.is_superuser:
            raise PermissionDenied("Bạn không có quyền xóa bài viết này.")
        news.delete()
