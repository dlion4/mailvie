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


class ThreadManager:
    def __init__(self):
        self.threads = []
    def run_function_in_thread(
        self, func:Callable, *args: tuple[Any], **kwargs: dict[str, Any]):
        # run a function in an separate thread with the given arguments
        thread = threading.Thread(target=func, args=args, kwargs=kwargs)
        thread.start()
        self.threads.append(thread)
        logger.info(f"Started thread {thread.name} for {func.__name__}")  # noqa: G004
    def join_all_threads(self):
        # wait for all threads to complete
        for thread in self.threads:
            thread.join()
            logger.info(f"Finished thread {thread.name}")  # noqa: G004

