from .base import *

DEBUG = False
TEMPLATE_DEBUG = DEBUG

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'anom_server',
        'USER': 'anom_server',
        'PASSWORD': 'anom_server',
        'HOST': '',
        'PORT': '',
    }
}
