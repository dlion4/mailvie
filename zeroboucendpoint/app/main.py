from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.main import sandbox_mail_callback_router
from app.config.main import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
)
# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.all_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sandbox_mail_callback_router, prefix="/sandbox")
