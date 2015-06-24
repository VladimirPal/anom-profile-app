from rest_framework import serializers, viewsets, filters
import django_filters


from .models import AnomProfile


class ProfileFilter(django_filters.FilterSet):
    class Meta:
        model = AnomProfile
        fields = ['status']


class ProfileSerializer(serializers.ModelSerializer):
    status_name = serializers.CharField(source='get_status_display')
    location_name = serializers.CharField(source='get_location_display')

    class Meta:
        model = AnomProfile
        exclude = ('user',)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = AnomProfile.objects.all()
    serializer_class = ProfileSerializer

    # filter_backends = (filters.DjangoFilterBackend,)
    # filter_filelds = ('status',)
    # filter_class = ProfileFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        statuses = self.request.QUERY_PARAMS.getlist('status[]', [])
        profiles = AnomProfile.objects.all()
        if statuses:
            profiles = profiles.filter(status__in=statuses)
        return profiles
