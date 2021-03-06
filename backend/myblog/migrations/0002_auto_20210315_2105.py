# Generated by Django 3.1.7 on 2021-03-15 15:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myblog', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogpost',
            old_name='content',
            new_name='paragraph1',
        ),
        migrations.AddField(
            model_name='blogpost',
            name='paragraph2',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blogpost',
            name='paragraph3',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blogpost',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=50)),
                ('blog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myblog.blogpost')),
            ],
        ),
    ]
