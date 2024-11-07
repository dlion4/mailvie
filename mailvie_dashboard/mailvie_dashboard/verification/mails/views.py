import requests
from django.conf import settings
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework.response import Response

from mailvie_dashboard.verification.threads import ThreadManager

from .webhook import email_verification_request_webhook


class SingleEmailAddressValidationAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]
    thread = ThreadManager()
    def post(self, request, *args, **kwargs):
        _email=request.data.get("email", None)
        # send this to a webhook
        self.thread.run_function_in_thread(
            email_verification_request_webhook,
            requester="system",
            _data={"email": str(_email)},
        )
        # prepare the verification content and then request verification
        headers = {
            "X-Main-Req-security": "valid-token",
            "X-SSH-Certificate": "valid-ssh-cert",
        }
        response = requests.post(
            f"{settings.EMAIL_VALIDATION_ENDPOINT}/sandbox/mails/verify",
            json={"email": request.data.get("email")},
            timeout=10,
            headers=headers,
        )
        content = response.json()
        if isinstance(content, dict):
            content["is_email_valid"]=True
            return Response(content, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
