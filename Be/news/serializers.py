from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    author_fullname = serializers.CharField(source='author.get_full_name', read_only=True)
    
    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'thumbnail', 'author', 
            'author_name', 'author_fullname', 'views_count', 'is_published', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['author', 'views_count']

    def create(self, validated_data):
        # Additional creation logic (like author injection) is handled in the Service Layer
        return super().create(validated_data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Ensure the thumbnail has the full URL
        if ret.get('thumbnail'):
            request = self.context.get('request', None)
            if request is not None:
                ret['thumbnail'] = request.build_absolute_uri(ret['thumbnail'])
            else:
                ret['thumbnail'] = f"http://127.0.0.1:8000{ret['thumbnail']}"
        return ret
