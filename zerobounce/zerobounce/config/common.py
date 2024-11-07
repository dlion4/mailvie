import os
from os.path import join
from configurations import Configuration
import environ
from pathlib import Path
from corsheaders.defaults import default_headers
from datetime import timedelta

env = environ.Env()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

APP_DIR = Path(__file__).resolve().parent.parent.parent

env.read_env(os.path.join(APP_DIR,".env",))


class Common(Configuration):

    INSTALLED_APPS = (
        "django.contrib.admin",
        "django.contrib.auth",
        "django.contrib.contenttypes",
        "django.contrib.sessions",
        "django.contrib.messages",
        "django.contrib.staticfiles",
        # Third party apps
        "rest_framework",  # utilities for rest apis
        "rest_framework.authtoken",  # token authentication
        "django_filters",  # for filtering rest endpoints
        "corsheaders",
        "drf_spectacular",
        # Your apps
        "zerobounce.users",
        "zerobounce.services.mails",
        "zerobounce.services.domains",
        "zerobounce.services.core",
        "zerobounce.domain_registry",
        "zerobounce.operations",
    )

    # https://docs.djangoproject.com/en/2.0/topics/http/middleware/
    MIDDLEWARE = (
        "django.middleware.security.SecurityMiddleware",
        "whitenoise.middleware.WhiteNoiseMiddleware",
        "django.contrib.sessions.middleware.SessionMiddleware",
        "corsheaders.middleware.CorsMiddleware",
        # "zerobounce.config.middleware.BasicAuthMiddleware",
        # "zerobounce.config.middleware.APIDocAuthenticationMiddleware",
        "django.middleware.common.CommonMiddleware",
        "django.middleware.csrf.CsrfViewMiddleware",
        "django.contrib.auth.middleware.AuthenticationMiddleware",
        "django.contrib.messages.middleware.MessageMiddleware",
        "django.middleware.clickjacking.XFrameOptionsMiddleware",
        "zerobounce.domain_registry.middleware.CORSAllowedOriginsMiddleware",
    )

    ALLOWED_HOSTS = ["*", ".vercel.app"]
    ROOT_URLCONF = 'zerobounce.urls'
    SECRET_KEY = env.str('DJANGO_SECRET_KEY')
    WSGI_APPLICATION = 'zerobounce.wsgi.application'

    # Email
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

    ADMINS = (('Author', 'kwasa.meckonia@zerobounce.com'),)

    DATABASES = {"default": env.db("DEFAULT_DATABASE_URL")}

    DATABASES["default"]["ATOMIC_REQUESTS"]=True

    # General
    APPEND_SLASH = False
    TIME_ZONE = 'UTC'
    LANGUAGE_CODE = 'en-us'
    # If you set this to False, Django will make some optimizations so as not
    # to load the internationalization machinery.
    USE_I18N = False
    USE_L10N = True
    USE_TZ = True
    LOGIN_REDIRECT_URL = '/'

    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/2.0/howto/static-files/
    STATIC_ROOT = os.path.normpath(join(os.path.dirname(BASE_DIR), 'static'))
    STATICFILES_DIRS = [os.path.normpath(join(os.path.dirname(BASE_DIR), "templates")),]
    STATIC_URL = '/static/'
    STATICFILES_FINDERS = (
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    )

    # Media files
    MEDIA_ROOT = join(os.path.dirname(BASE_DIR), 'media')
    MEDIA_URL = '/media/'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': STATICFILES_DIRS,
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    # Set DEBUG to False as a default for safety
    # https://docs.djangoproject.com/en/dev/ref/settings/#debug
    DEBUG = bool(env.str('DJANGO_DEBUG', '0'))

    # Password Validation
    # https://docs.djangoproject.com/en/2.0/topics/auth/passwords/#module-django.contrib.auth.password_validation
    AUTH_PASSWORD_VALIDATORS = [
        {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
        {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
        {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
        {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
    ]

    # Logging
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'django.server': {
                '()': 'django.utils.log.ServerFormatter',
                'format': '[%(server_time)s] %(message)s',
            },
            'verbose': {
                'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
            },
            'simple': {
                'format': '%(levelname)s %(message)s'
            },
        },
        'filters': {
            'require_debug_true': {
                '()': 'django.utils.log.RequireDebugTrue',
            },
        },
        'handlers': {
            'django.server': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'formatter': 'django.server',
            },
            'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'formatter': 'simple'
            },
            'mail_admins': {
                'level': 'ERROR',
                'class': 'django.utils.log.AdminEmailHandler'
            }
        },
        'loggers': {
            'django': {
                'handlers': ['console'],
                'propagate': True,
            },
            'django.server': {
                'handlers': ['django.server'],
                'level': 'DEBUG',
                'propagate': False,
            },
            'django.request': {
                'handlers': ['mail_admins', 'console'],
                'level': 'DEBUG',
                'propagate': False,
            },
            'django.db.backends': {
                'handlers': ['console'],
                'level': 'INFO'
            },
        }
    }

    # Custom user app
    AUTH_USER_MODEL = 'users.User'

    # Django Rest Framework
    REST_FRAMEWORK = {
        "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
        "PAGE_SIZE": int(os.getenv("DJANGO_PAGINATION_LIMIT", 10)),
        "DATETIME_FORMAT": "%Y-%m-%dT%H:%M:%S%z",
        "DEFAULT_RENDERER_CLASSES": (
            "rest_framework.renderers.JSONRenderer",
            "rest_framework.renderers.BrowsableAPIRenderer",
        ),
        "DEFAULT_PERMISSION_CLASSES": [
            "rest_framework.permissions.IsAuthenticated",
        ],
        "DEFAULT_AUTHENTICATION_CLASSES": (
            "rest_framework.authentication.SessionAuthentication",
            "rest_framework.authentication.TokenAuthentication",
            "zerobounce.users.services.JWTAuthentication",
        ),
        "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
        "DEFAULT_FILTER_BACKENDS": (
            "django_filters.rest_framework.DjangoFilterBackend",
            "rest_framework.filters.SearchFilter",
            "rest_framework.filters.OrderingFilter",
        ),
        "DEFAULT_THROTTLE_CLASSES": [
            "rest_framework.throttling.AnonRateThrottle",
            "rest_framework.throttling.UserRateThrottle",
            'zerobounce.throttling.HandleRateLimitThrottle',
        ],
        "DEFAULT_THROTTLE_RATES": {
            "anon": "8/minute",  # Anon rate limit | Anonymous
            "user": "21/minute",  # User rate limit | Authenticated User
            "custom": "11/second",  # Custom throttle rate
        },
    }

    API_VERSION = env.str("API_VERSION", "v1")

    SPECTACULAR_SETTINGS = {
        "TITLE": "Zero Bounce API",
        "DESCRIPTION": "Simple Rest API for Validations Purpose",
        "VERSION": API_VERSION,
        "SERVE_INCLUDE_SCHEMA": False,
        "SECURITY": [{"JWTAuth": []}],
    }
    CORS_ALLOW_HEADERS = list(default_headers) + [
        'X-Mail-API-KEY',
        "X-MAIL-SECRET-KEY",
        "X-MAIL-CLIENT-ID",
        "M-Project-Access-Key",
        "X-Use-Sandbox", # True|False
    ]
    
    CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
    
    CORS_ALLOW_METHODS = [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',  # Ensure OPTIONS is allowed for preflight requests
    ]
    # Celery settings
    CELERY_BROKER_URL = env.str("CELERY_BROKER_URL", "redis://localhost:6379/0")
    # Redis as the broker
    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_TASK_TRACK_STARTED = True
    CELERY_TASK_TIME_LIMIT = 30 * 60
    # Example for Redis
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
    # JWT settings
    SIMPLE_JWT = {
        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
        'AUTH_HEADER_TYPES': ('Bearer',),
    }
    JWT_ISSUER = env.str("JWT_ISSUER", "")
    JWT_AUDIENCE = env.str("JWT_AUDIENCE", "")
    # MAIL_SO_EMAIL_API_KEY = env.str("MAIL_SO_EMAIL_API_KEY",)
    # MAIL_CLIENT_AUTH_HEADER = env.str("MAIL_CLIENT_AUTH_HEADER",)
    # # MERCHANT PROVIDER URL
    # MAIL_MERCHANT_PROVIDER_URL = env.str("MAIL_MERCHANT_PROVIDER_URL",)
    # #
    SANDBOX_MODE = env.bool("SANDBOX_MODE", "X-Use-Sandbox")
    # EXTERNAL_URLS
    SANDBOX_BASE_ENDPOINT = env.str("SANDBOX_BASE_ENDPOINT",)
    PRODUCTION_BASE_ENDPOINT = env.str("PRODUCTION_BASE_ENDPOINT",)
    
    # Webhook services
    WEBHOOK_SERVICE_PROVIDER_URL = env.str("WEBHOOK_SERVICE_PROVIDER_URL")
    AUTH_SERVICE_PROVIDER_URL = env.str("AUTH_SERVICE_PROVIDER_URL")
