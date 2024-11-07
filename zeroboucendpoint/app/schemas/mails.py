from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional
from datetime import datetime
import datetime as dtime


class EmailValidationModel(BaseModel):
    email: str


class EmailVerificationResponse(BaseModel):
    email: EmailStr  # The email being verified
    username: str|None=None  # Username associated with the email (optional)
    is_verified: bool  # True if the email is verified
    verification_status: str  # Status message (e.g., "Success", "Pending", "Failed")
    error_message: str | None = None  # Any error message if verification failed
    verification_timestamp: datetime | None = None  # When the verification happened
    user_status: str | None = (
        None  # User status (e.g., "Active", "Pending", "Suspended")
    )
    verification_code: str | None = (
        None  # The code used for verification, if applicable
    )
    is_valid_format: bool  # Whether the email format is valid or not
    domain: str|None = (
        None  # The domain part of the email address (if you need it)
    )
    is_temp_email: bool  # Whether this email is a temporary/throwaway email
    is_blacklisted: bool  # Whether this email is blacklisted

    @model_validator(mode="after")
    @classmethod
    def extract_username_and_domain(cls, instance):
        """
        Automatically extract username and domain from the email.
        This will set the `username` and `domain` attributes based on the `email` value.
        """
        email = instance.email
        if email:
            username, domain = email.split("@", 1)
            instance.username = username
            instance.domain = domain
        return instance

    class Config:
        # Ensure that the datetime object is serialized as ISO format string
        json_encoders = {datetime: lambda v: v.isoformat() if v else None}
