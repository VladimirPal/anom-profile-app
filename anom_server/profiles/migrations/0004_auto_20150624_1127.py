# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_anomprofile_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='anomprofile',
            old_name='statuses',
            new_name='location',
        ),
    ]
