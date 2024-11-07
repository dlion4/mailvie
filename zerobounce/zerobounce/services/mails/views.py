from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
import requests

# Create your views here.
from .serializers import EmailValidationSerializer  # Adjust the import based on your s
from .decorators import check_project_and_deduct_credits
from django.utils.decorators import method_decorator


class EmailValidationView(views.APIView):
    serializer_class = EmailValidationSerializer
    permission_classes = [permissions.AllowAny]

    @method_decorator(check_project_and_deduct_credits)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        # call the api endpoint from here
        print(request.endpoint)
        # Set the headers with security token and SSH certificate
        headers = {
            "X-Main-Req-security": "valid-token",
            "X-SSH-Certificate": "valid-ssh-cert",
        }
        # Call the API endpoint with headers
        try:
            response = requests.post(
                str(request.endpoint),
                json={"email": serializer.validated_data.get("email")},
                headers=headers,
                timeout=5,
            )
            response.raise_for_status()
            print(response.json())
            return Response({"valid": True}, status=status.HTTP_200_OK)
        except requests.RequestException as e:
            print(f"Error occurred while sending request: {e}")
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)
