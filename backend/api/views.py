from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from xgboost import XGBRegressor
import pandas as pd

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
model.load_model('./core/ml/model.bin')


@api_view(['POST'])
def predict(request):
    payload = request.data

    unitWeight = float(payload.get('unitWeight', 0))
    cohesion = float(payload.get('cohesion', 0))
    frictionAngle = float(payload.get('frictionAngle', 0))
    slopeAngle = float(payload.get('slopeAngle', 0))
    slopeHeight = float(payload.get('slopeHeight', 0))
    porePressure = float(payload.get('porePressure', 0))
    reinforcementType = payload.get('reinforcementType', 'Drainage')
    reinforcementNumeric = 0
    factor_of_safety = 0
    if reinforcementType == 'Soil Nailing':
        reinforcementNumeric = 1
    elif reinforcementType == 'Geosynthetics':
        reinforcementNumeric = 2
    elif reinforcementType == 'Retaining Wall':
        reinforcementNumeric = 0
    else:
        reinforcementNumeric = 3

    columnNames = ['Unit Weight (kN/m³)', 'Cohesion (kPa)','Internal Friction Angle (°)','Slope Angle (°)','Slope Height (m)','Pore Water Pressure Ratio', 'Reinforcement Numeric']
    features = [unitWeight, cohesion, frictionAngle, slopeAngle, slopeHeight, porePressure, reinforcementNumeric]
    if sum(features[:-1]) == 0:
        status, risk = "No Valid Inputs", 0
    else:

        df = pd.DataFrame([features], columns = columnNames)
        factor_of_safety = model.predict(df)[0]
        print(payload)

        if factor_of_safety < 1.0:
            status, risk = 'CRITICAL', 95
        elif factor_of_safety > 1.0 and factor_of_safety < 1.5:
            status, risk = 'WARNING', 75
        elif factor_of_safety > 1.5 and factor_of_safety < 2.0:
            status, risk = 'CAUTION', 50
        elif factor_of_safety > 2.0:
            status, risk = 'STABLE', 25
        else:
            status, risk = 'None', 0

    return Response({'status':status, 'safety_factor':round(factor_of_safety, 4), 'risk_percentage':risk})

@api_view(['POST'])
def send_alert(request):
    message = request.data.get('message','')
    methods = request.data.get('method',[])
    # Stub—integrate SMS/email here
    return Response({'sent_via': methods, 'message': message})

