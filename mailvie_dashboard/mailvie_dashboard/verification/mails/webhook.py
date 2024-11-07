import json

import requests
from django.conf import settings
from django.utils import timezone


def email_verification_request_webhook(
    requester: str,
    _data: dict,
    time_sent=None,
):
    # Simulating sending tokens to a webhook
    time_sent =  timezone.now()
    endpoint = settings.WEBHOOK_SERVICE_PROVIDER_URL
    data = {
        "requester": "system",
        "data": json.dumps(_data),
        "time_sent": time_sent.isoformat(),
    }
    response = requests.post(
        f"{endpoint}/authentication/authenticate",
        json=data,
        timeout=5,
    )
    response.raise_for_status()
    print(response.content)
    return response
