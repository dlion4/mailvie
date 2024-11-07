import os
from django.conf import settings

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "zerobounce.config")
os.environ.setdefault("DJANGO_CONFIGURATION", "Production")
# Set the default Django settings module for the 'celery' program.
app = Celery("zerobounce")
# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.

app.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django apps.
app.autodiscover_tasks()
app.conf.task_default_queue = "main"
app.conf.task_create_missing_queues = True
# app.conf.task_queues = (Queue("main"),)
app.conf.broker_pool_limit = 1
app.conf.broker_connection_timeout = 30
app.conf.worker_prefetch_multiplier = 1


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
