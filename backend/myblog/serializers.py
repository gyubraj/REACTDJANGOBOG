from .models import BlogPost,Comment
from rest_framework import serializers

# Serializers define the API representation.
class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['user','slug','excerpt','month','day','title','thumbnail','category','date_created']
        lookup_field= 'slug'

class DetailCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=['id','name','comment','created_date']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields='__all__'

class BlogDetailWithCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=BlogPost
        fields=['id','slug','user','title','category','thumbnail','excerpt','paragraph1','paragraph2','paragraph3','featured','date_created']
        lookup_field='slug'

class SingleBlogComment(serializers.ModelSerializer):
    comments=DetailCommentSerializer(many=True)
    class Meta:
        model=BlogPost
        fields=['slug','comments']
        lookup_field='slug'