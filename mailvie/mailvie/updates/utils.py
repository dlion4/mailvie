from django.utils.timezone import now


def upload_directory_path(instance, filename):
    return f"updates/blog/{now().year}/{now().month}/{filename}"
