from django.http import HttpResponse, HttpResponseRedirect
import base64
from django.utils.deprecation import MiddlewareMixin


class BasicAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Protect only the front page or specific views by URL
        if request.path == "/":  # front page or your specific path
            auth_header = request.META.get("HTTP_AUTHORIZATION")
            if auth_header is None:
                return self.unauthorized_response()

            try:
                # Decode the header
                auth_method, auth = auth_header.split(" ", 1)
                if auth_method.lower() != "basic":
                    return self.unauthorized_response()

                auth_decoded = base64.b64decode(auth).decode("utf-8")
                username, password = auth_decoded.split(":", 1)
                # Replace these with your own credentials
                if username == "admin" and password == "password":
                    # Credentials are correct, set session or cookie to avoid re-authenticating on redirect
                    request.session["authenticated"] = True
                    return HttpResponseRedirect(
                        "/api/schema/docs/"
                    )  # Redirect if successful

                return self.unauthorized_response()

            except Exception:
                return self.unauthorized_response()

    def unauthorized_response(self):
        response = HttpResponse("Unauthorized", status=401)
        response["WWW-Authenticate"] = 'Basic realm="FrontPage"'
        return response

class APIDocAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.session.get("authenticated"):
            return None  # Authentication passed, continue processing the request