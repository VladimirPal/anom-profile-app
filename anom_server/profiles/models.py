from django.db import models
from django.contrib.auth.models import User


class AnomProfile(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, verbose_name='user')

    ACTIVITY_LOOKING = 1
    OPEN_TO_OPPORTUNITIES = 2
    STATUS_CHOICES = (
        (ACTIVITY_LOOKING, 'Activity looking'),
        (OPEN_TO_OPPORTUNITIES, 'Open to opportunities'),
    )
    status = models.IntegerField(choices=STATUS_CHOICES,
                                 default=ACTIVITY_LOOKING)
    current_title = models.CharField(max_length=255, blank=False, null=False)

    # Three cities for test app
    CHICAGO = 1
    DETROIT = 2
    NEW_YORK = 3
    CITY_CHOICES = (
        (CHICAGO, 'Chicago'),
        (DETROIT, 'Detroit'),
        (NEW_YORK, 'New York')
    )
    location = models.IntegerField(choices=CITY_CHOICES)

    years_in_media = models.IntegerField()
    years_selling = models.IntegerField()

    description = models.TextField()

    compensation_range_from = models.IntegerField(blank=True, null=True)
    compensation_range_to = models.IntegerField(blank=True, null=True)

    class Meta:
        ordering = ('-created',)
