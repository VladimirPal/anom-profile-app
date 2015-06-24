# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnomProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('statuses', models.IntegerField(default=1, choices=[(1, b'Activity looking'), (2, b'Open to opportunities')])),
                ('current_title', models.CharField(max_length=255)),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
