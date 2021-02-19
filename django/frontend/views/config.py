from django.http import JsonResponse
from rest_framework.decorators import api_view

#Returns config as json
file_list = [
    {
       'text': 'DEFAULT',
       'description': '2x2 foundation, Bearing Capacities(*old)',
       'file': '/static/old.json',
       },
]

@api_view()
def get_config(request):
    config={'mapFiles': file_list}
    return JsonResponse(config)
