from django.urls import path
from .views import BlogPostListView,BlogPostFeaturedView,BlogPostCategoryView,BlogPostDetailView,BlogSearch,CommentView,LatestThreeBlogPost,BlogPostCommentDetailView

urlpatterns=[
    path('',BlogPostListView.as_view()),
    path('featured',BlogPostFeaturedView.as_view()),
    path('category',BlogPostCategoryView.as_view()),
    path('<slug>',BlogPostDetailView.as_view()),
    path('search/',BlogSearch.as_view()),
    path('comment/',CommentView.as_view({
        'post':'create'
    })),
    path('latest3blog/',LatestThreeBlogPost.as_view()),
    path('comments/<slug>',BlogPostCommentDetailView.as_view())
]