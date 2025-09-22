from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from xgboost import XGBRegressor

@api_view(['GET'])
def locations(request):
    data = {
        'timestamp': datetime.now().isoformat(),
        'locations': [
            {
                'name': 'Open Pit North',
                'coordinates': [25.821024, 74.727852],
                'stability_status': 'WARNING',
                'safety_factor': 0.95,
                'alert_priority': 2,
                'elevation': 390,
                'slope_angle': 35.5,
                'sensors_online': 5,
                'sensors_count': 5,
                'mine_type': 'Open Pit',
            },
            {
                'name': 'Open Pit South',
                'coordinates': [25.818024, 74.725852],
                'stability_status': 'CAUTION',
                'safety_factor': 1.15,
                'alert_priority': 1,
                'elevation': 385,
                'slope_angle': 32.0,
                'sensors_online': 5,
                'sensors_count': 5,
                'mine_type': 'Open Pit',
            },
            {
                'name': 'Underground Access',
                'coordinates': [25.824024, 74.730852],
                'stability_status': 'STABLE',
                'safety_factor': 1.45,
                'alert_priority': 0,
                'elevation': 395,
                'slope_angle': 28.5,
                'sensors_online': 5,
                'sensors_count': 5,
                'mine_type': 'Underground',
            }
        ]
    }
    return Response(data)

model = XGBRegressor()
model.load_model('./core/model.bin')


@api_view(['POST'])
def predict(request):
    payload = request.data
    strain = float(payload.get('strain', 0))
    pore = float(payload.get('porePressure', 0))
    incl = float(payload.get('inclination', 0))
    vib = float(payload.get('vibration', 0))
    print(payload)
    sf = max(0.3, 2.0 - strain/100 - pore/100 - incl/2 - vib*10)
    if sf < 0.8:
        status, risk = 'CRITICAL', 95
    elif sf < 1.0:
        status, risk = 'WARNING', 75
    elif sf < 1.2:
        status, risk = 'CAUTION', 45
    else:
        status, risk = 'STABLE', 10
    return Response({'status':status, 'safety_factor':round(sf,3), 'risk_percentage':risk})

@api_view(['POST'])
def send_alert(request):
    message = request.data.get('message','')
    methods = request.data.get('method',[])
    # Stub—integrate SMS/email here
    return Response({'sent_via': methods, 'message': message})

