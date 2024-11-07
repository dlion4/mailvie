import importlib


def get_user_domains_serializer(many=True):
    user_domains_module = importlib.import_module('zerobounce.domain_registry.api.serializers')
    UserDomains = getattr(user_domains_module, "WhiteListDomainSerializer")
    user_domains_serializer = UserDomains(many=many)
    return user_domains_serializer

def get_user_serializer(many=False):
    user_module = importlib.import_module('zerobounce.users.serializers')
    UserSerializer = getattr(user_module, "UserSerializer")
    user_serializer = UserSerializer(many=many)
    return user_serializer
