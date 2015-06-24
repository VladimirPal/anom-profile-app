# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20150624_1035'),
    ]

    operations = [
        migrations.AddField(
            model_name='anomprofile',
            name='status',
            field=models.IntegerField(default=1, choices=[(1, b'Activity looking'), (2, b'Open to opportunities')]),
        ),
    ]
