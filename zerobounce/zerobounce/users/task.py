import threading
import time
from datetime import datetime, timezone
import logging
from typing import Tuple, Dict, Any, Callable
import requests
from django.conf import settings


# configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)


def send_tokens_to_webhook(access_token:str, refresh_token:str, email: str, time_sent:datetime=datetime.now(tz=timezone.utc)):
    # Simulating sending tokens to a webhook
    endpoint = settings.WEBHOOK_SERVICE_PROVIDER_URL
    data = {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "email": email,
        "time_sent": time_sent.isoformat(),
    }
    response = requests.post(f"{endpoint}/authentication/authenticate", json=data, timeout=5)
    response.raise_for_status()


class ThreadManager:
    def __init__(self):
        self.threads = []
    def run_function_in_thread(self, func:Callable, *args: Tuple[Any], **kwargs: Dict[str, Any]):
        # run a function in an separate thread with the given arguments
        thread = threading.Thread(target=func, args=args, kwargs=kwargs)
        thread.start()
        self.threads.append(thread)
        logger.info(f"Started thread {thread.name} for {func.__name__}")
    def join_all_threads(self):
        # wait for all threads to complete
        for thread in self.threads:
            thread.join()
            logger.info(f"Finished thread {thread.name}")

if __name__ == "__main__":
    manager = ThreadManager()
    # Run send_tokens_to_webhook in a separate thread
    manager.run_function_in_thread(
        send_tokens_to_webhook,
        access_token="access_123",
        refresh_token="refresh_456",
        email="user@example.com",
    )
    # Wait for all threads to complete before exiting
    manager.join_all_threads()
