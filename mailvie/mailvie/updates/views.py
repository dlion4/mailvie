from django.views.generic.base import TemplateView


# Create your views here.
class BlogListView(TemplateView):
    template_name = "pages/updates/blog/list.html"
