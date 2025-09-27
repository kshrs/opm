from django.urls import path
from .views import locations, predict, send_alert, getLastData

urlpatterns = [
    path('locations/', locations),
    path('predict/', predict),
    path('send-alert/', send_alert),
    path('features/<str:feature>/last', getLastData),
]
