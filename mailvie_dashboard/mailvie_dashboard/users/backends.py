from django.contrib.auth.backends import ModelBackend


class TokenUserAuthentication(ModelBackend):
    def authenticate(self, request, username = ..., password = ..., **kwargs):
        return super().authenticate(request, username, password, **kwargs)
    def get_user(self, user_id):
        return super().get_user(user_id)
