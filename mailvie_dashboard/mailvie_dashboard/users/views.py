from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.http import JsonResponse
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView
from django.contrib.auth import login, logout
from django.views.generic import RedirectView
from django.views.generic import UpdateView, View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from mailvie_dashboard.users.models import User


class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    slug_field = "id"
    slug_url_kwarg = "id"


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ["name"]
    success_message = _("Information successfully updated")

    def get_success_url(self):
        # for mypy to know that the user is authenticated
        assert self.request.user.is_authenticated
        return self.request.user.get_absolute_url()

    def get_object(self):
        return self.request.user


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"pk": self.request.user.pk})


user_redirect_view = UserRedirectView.as_view()

class AuthenticateUserView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        data = request.POST
        user = User.objects.filter(email=data["email"]).first()
        try:
            if user.check_password(data["password"]):
                login(request, user)
                return JsonResponse({"success": True}, status=200)
            return JsonResponse({"success": False}, status=404)
        except User.DoesNotExist:
            return JsonResponse(
                {"success": False, "error": "Invalid email or password"}, status=404)
