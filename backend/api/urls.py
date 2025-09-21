from django.urls import path
from .views import locations, predict, send_alert

urlpatterns = [
    path('locations/', locations),
    path('predict/', predict),
    path('send-alert/', send_alert),
]
