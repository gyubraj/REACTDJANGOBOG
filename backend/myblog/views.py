from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView
from .models import BlogPost,Comment
from rest_framework import viewsets
from .serializers import BlogPostSerializer,CommentSerializer,BlogDetailWithCommentSerializer,SingleBlogComment

class BlogPostListView(ListAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)

class CommentView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class BlogPostDetailView(RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogDetailWithCommentSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)

class BlogPostFeaturedView(ListAPIView):
    queryset = BlogPost.objects.filter(featured=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)

class BlogPostCategoryView(APIView):
    serializer_class=BlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self,request,format=None):
        data=self.request.data
        category=data['category']
        queryset=BlogPost.objects.order_by('-date_created').filter(category__iexact=category)
        serializer=BlogPostSerializer(queryset,context={'request': request},many=True)
        return Response(serializer.data)

class BlogSearch(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request,format=None):

        data=self.request.data
        queryset=BlogPost.objects.order_by('-date_created').filter(title__icontains=data['search'])
        serializer=BlogPostSerializer(queryset,context={'request': request},many=True)

        return Response(serializer.data)



class LatestThreeBlogPost(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request,format=None):
        data=self.request.data
        slug=data['slug']
        queryset=BlogPost.objects.exclude(slug__iexact=slug)[:3]
        serializer=BlogPostSerializer(queryset,context={'request':request},many=True)

        return  Response(serializer.data)

class BlogPostCommentDetailView(RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = SingleBlogComment
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)