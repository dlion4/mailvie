from datetime import datetime

from fastapi import APIRouter, Depends

from app.config.dependency import authorize_requester_user
from app.schemas.mails import EmailValidationModel, EmailVerificationResponse

sandbox_mail_callback_router = APIRouter()


@sandbox_mail_callback_router.post(
    "/mails/validate")
def invoice_notification(
    data: EmailValidationModel, headers: dict = Depends(authorize_requester_user)
):
    # process the incoming email validation request
    print(data.email)
    # once done broadcast to the websocket interface
    return {"message": "request received"}


@sandbox_mail_callback_router.post("/mails/verify", response_model=EmailVerificationResponse)
async def verify_email_address(data:EmailValidationModel, headers:dict=Depends(authorize_requester_user)):
    return {
    "email":str(data.email),
    "is_verified":True,
    "verification_status":"Success",
    "error_message":None,
    "verification_timestamp":datetime.utcnow(),
    "user_status":"Active",
    "verification_code":None,
    "is_valid_format":True,
    "domain":"example.com",
    "is_temp_email":False,
    "is_blacklisted":False,
    "retries_left":None
    }
