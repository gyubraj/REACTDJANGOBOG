from django.contrib import admin

from .models import BlogPost,Comment

# Apply summernote to all TextField in model.
class BlogPostAdmin(admin.ModelAdmin):
    exclude=('slug',)
    list_display=('id','title','category','date_created')
    list_display_links=('id','title')
    list_per_page=25

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Comment)
