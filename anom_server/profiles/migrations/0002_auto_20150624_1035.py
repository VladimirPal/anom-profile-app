# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='anomprofile',
            name='compensation_range_from',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='anomprofile',
            name='compensation_range_to',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='anomprofile',
            name='description',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='anomprofile',
            name='user',
            field=models.ForeignKey(default=1, verbose_name=b'user', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='anomprofile',
            name='years_in_media',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='anomprofile',
            name='years_selling',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='anomprofile',
            name='statuses',
            field=models.IntegerField(choices=[(1, b'Chicago'), (2, b'Detroit'), (3, b'New York')]),
        ),
    ]
