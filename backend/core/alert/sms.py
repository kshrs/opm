import json
from twilio.rest import Client
import datetime
import os


def send_alert_message(msg, phone):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    keys_path = os.path.join(current_dir, "keys.json")
    try:

        with open(keys_path,"r") as file:
        
            currentDateTime = datetime.datetime.now().strftime("%H:%M, %d-%b-%Y")
        
            data=json.load(file)
        
            account_sid = data["account_sid"]
            auth_token = data["auth_token"]
        
            client = Client(account_sid, auth_token)
        
            message = client.messages.create(
                body=msg,
                from_=data["twilio_number"],
                to=phone
            )
        
        
            print("SMS Alert Sent Successfully to:", phone, " SID:", message.sid, "Error:", message.error_message)
        
    except FileNotFoundError:
            print("Some files are not available.")
    except KeyError:
            print(f"Error: 'key.json' is missing required keys. Ensure it contains 'email' and 'email_password'.")
    except Exception as e:
            print(f"An unexpected error occurred: {e}")


