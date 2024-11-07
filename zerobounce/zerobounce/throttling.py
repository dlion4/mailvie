from rest_framework.throttling import BaseThrottle
from django.core.cache import cache


class HandleRateLimitThrottle(BaseThrottle):
    THROTTLE_RATE = "11/minute"

    def get_cache_key(self, request, view):
        # Use the IP address and request path as the key
        return f"{request.META['REMOTE_ADDR']}-{request.path}"

    def allow_request(self, request, view):
        # Get the cache key
        cache_key = self.get_cache_key(request, view)
        requests = cache.get(cache_key, 0)
        # If requests exceed the limit, deny the request
        if requests >= 11:
            return False
        # Increment the count in the cache
        cache.set(cache_key, requests + 1, timeout=60)
        return True
