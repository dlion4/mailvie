from django.core.management import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = """
    Starts the Django development server with migrations and optional
    port and collectstatic.
    """

    def add_arguments(self, parser):
        # Add an optional port argument, defaulting to 8004 if not provided
        parser.add_argument(
            "--port",
            type=int,
            default=8004,
            help="Specify the port to run the development server on (default: 8000)",
        )

        # Add an optional --collectstatic flag to collect static files
        parser.add_argument(
            "--collectstatic",
            action="store_true",
            help="Collect static files into the webpack file",
        )

    def handle(self, *args, **options):
        # Retrieve the port and collectstatic options from the command line arguments
        port = options["port"]
        collectstatic = options["collectstatic"]

        # Run makemigrations to generate migration files
        self.stdout.write(
            self.style.NOTICE("Running makemigrations..."))
        call_command("makemigrations")

        # Run migrate to apply migrations
        self.stdout.write(
            self.style.NOTICE("Applying migrations..."))
        call_command("migrate")

        # If --collectstatic was provided, run collectstatic
        if collectstatic:
            self.stdout.write(
                self.style.NOTICE("Collecting static files..."))
            call_command("collectstatic", interactive=False)

        # Start the development server on the specified port
        self.stdout.write(
            self.style.NOTICE(
                f"Starting development server on port {port}..."),
        )
        call_command("runserver", addrport=f"127.0.0.1:{port}")
