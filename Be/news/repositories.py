from .models import News

class NewsRepository:
    """
    Repository layer for News Database queries
    """

    @staticmethod
    def get_published_news():
        return News.objects.filter(is_published=True).select_related('author')

    @staticmethod
    def get_all_news():
        # For admins to see even unpublished ones
        return News.objects.all().select_related('author')

    @staticmethod
    def get_by_id(pk: int):
        # We also want to increment view count easily when fetching details
        news_item = News.objects.get(pk=pk)
        return news_item

    @staticmethod
    def create_news(data: dict):
        return News.objects.create(**data)
