import logging
import time
from typing import Any
import requests
from django.utils.http import  urlsafe_base64_encode, urlsafe_base64_decode
import uuid
from django.contrib.auth.models import User as UserObject
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.utils.http import base36_to_int
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import int_to_base36
from .common import env

MAIL_GUN_API_KEY = env.str("MAIL_GUN_API_KEY", "")


logger = logging.getLogger(__name__)


def send_background_email(sender: UserObject | None = None,  template_name: str = "", context: dict[str, Any] | None = None,recipients: list[str] | list | None = None,
    ):
    """By default we are the main sending the email but what if contact then the client become the sender"""
    if recipients is None:
        recipients = []
    if context is None:
        context = {}
    if context is not None:
        context.update({"team": "Zerobounce"})
    try:
        html_message = render_to_string(template_name, context)
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        subject = context.get("subject", None)
        to = recipients or [context.get("email")]

        logger.info(f'Sending email from {from_email} to {to} with subject "{subject}"')
        
        message = EmailMultiAlternatives(
            subject=subject, body=plain_message,
            from_email=from_email, to=to,
        )
        message.attach_alternative(html_message, "text/html")
        message.send()
    except Exception as e:
        logger.exception(str(e))


def send_email_with_attachment(
    mailgun_api_key:str,
    default_from_email:str,
    to:list[str],
    subject:str, html_content: str):
    response = requests.post(
        "https://api.mailgun.net/v3/earnkraft.com/messages",
        auth=("api", mailgun_api_key),
        data={
            "from": default_from_email,
            "to": to,
            "subject": subject,
            "html": html_content,
        },
        timeout=50,
    )
    response.raise_for_status()
    return response


class ExpiringTokenGenerator(PasswordResetTokenGenerator):
    TOKEN_EXPIRY_TIMEOUT: int = 30000

    def base64_encode_uuid(self, uuid):
        """Encodes UUID to base64 without padding"""
        return urlsafe_base64_encode(uuid)

    def base64_decode_uuid(self, encoded_uuid):
        """Decodes base64-encoded UUID"""
        return str(uuid.UUID(bytes=urlsafe_base64_decode(encoded_uuid)))

    def make_token(self, user):
        timestamp = int(time.time())
        encoded_uuid = self.base64_encode_uuid(user.id.bytes)
        return f"{encoded_uuid}-{super().make_token(user)}-{int_to_base36(timestamp)}"

    def check_token(self, user, token):
        try:
            # Split into encoded UUID, token, and timestamp
            encoded_uuid, _user_token, _user_token_timestamp, timestamp = token.rsplit("-", 3)
            timestamp = base36_to_int(timestamp)
            user_token = "-".join([_user_token, _user_token_timestamp])
        except (ValueError, TypeError):
            return False

        # Decode the UUID and check if it matches the user
        try:
            decoded_uuid = self.base64_decode_uuid(encoded_uuid)
        except (TypeError, ValueError):
            return False

        if str(user.id) != str(decoded_uuid):
            return False

        # Check if token has expired
        if int(time.time() - timestamp) > self.TOKEN_EXPIRY_TIMEOUT:
            return False
        return super().check_token(user, user_token)


expiring_token_generator = ExpiringTokenGenerator()
