from zerobounce.users.models import User, Profile
from django.core.management import BaseCommand
from django.db import IntegrityError

class Command(BaseCommand):
    help = 'Sync user data to the sandbox database'

    def add_arguments(self, parser):
        parser.add_argument('user_id', type=int)

    def handle(self, *args, **kwargs):
        user_id = kwargs['user_id']
        try:
            user = User.objects.get(id=user_id)
            user.save(using='sandbox')  # Adjust logic to copy necessary fields to the sandbox
            self.stdout.write(self.style.SUCCESS(f'Successfully synced user {user_id} to sandbox'))
        except IntegrityError:
            self.stdout.write(self.style.ERROR(f'User {user_id} already exists in sandbox'))
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'User {user_id} does not exist'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error syncing user: {str(e)}'))
