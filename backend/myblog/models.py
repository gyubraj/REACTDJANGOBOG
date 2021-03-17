from django.db import models
from datetime import datetime,date
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

class Category(models.TextChoices):
    WORLD='world'
    ENVIRONMENT = 'environment'
    TECHNOLOGY = 'technology'
    DESIGN = 'design'
    CULTURE = 'culture'
    BUSINESS = 'business'
    POLITICS = 'politics'
    OPINION = 'opinion'
    SCIENCE = 'science'
    HEALTH = 'health'
    STYLE = 'style'
    TRAVEL = 'travel'
    SPORT = 'sport'




class BlogPost(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=50)
    slug=models.SlugField()
    category=models.CharField(max_length=50,choices=Category.choices,default=Category.WORLD)
    thumbnail=models.ImageField(upload_to='photos/%Y/%m/%d/')
    excerpt= models.CharField(max_length=150)
    month=models.CharField(max_length=3)
    day=models.CharField(max_length=2)
    paragraph1=models.TextField()
    paragraph2=models.TextField()
    paragraph3=models.TextField()
    featured=models.BooleanField(default=False)
    date_created=models.DateTimeField(default=datetime.now,blank=True)

    @property
    def comments(self):
        return self.comment_set.all().order_by('-created_date')

    def save(self,*args,**kwargs):
        orginal_slug=slugify(self.title)
        queryset=BlogPost.objects.filter(slug__iexact=orginal_slug).count()
        if queryset is 0:
            self.slug=orginal_slug
        else:
            self.slug=orginal_slug+'-'+str(datetime.now())

        if self.featured:
            try:
                temp=BlogPost.objects.get(featured=True)
                if self!=temp:
                    temp.featured=False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass
        super(BlogPost,self).save(*args,**kwargs)

    def __str__(self):
        return self.title

class Comment(models.Model):
    blog=models.ForeignKey(BlogPost,on_delete=models.CASCADE)
    comment=models.CharField(max_length=255)
    name=models.CharField(max_length=50)
    email=models.EmailField(max_length=50)

    created_date=models.DateTimeField(default=datetime.now,null=True,blank=True)