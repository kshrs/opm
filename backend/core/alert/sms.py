import json
from twilio.rest import Client
import datetime
import os


def send_alert_message(msg):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    keys_path = os.path.join(current_dir, "keys.json")
    with open(keys_path,"r") as file:
    
        currentDateTime = datetime.datetime.now().strftime("%H:%M, %d-%b-%Y")
    
        data=json.load(file)
    
        account_sid = data["account_sid"]
        auth_token = data["auth_token"]
    
        client = Client(account_sid, auth_token)
    
        message = client.messages.create(
            body=msg,
            from_=data["twilio_number"],
            to=data["user_number"]
        )
    
    
        print("SMS Alert Sent Successfully")
        print(message.sid)


