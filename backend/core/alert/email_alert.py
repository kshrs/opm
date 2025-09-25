import aiosmtplib
import os
#from email.mime.multipart import MIMEMultipart
#from email.mime.text import MIMEText
from typing import List
import asyncio
import json
from email.message import EmailMessage
current_dir = os.path.dirname(os.path.abspath(__file__))
keys_path = os.path.join(current_dir, "keys.json")




async def send_email_alert(recipient_email, subject, body):
    try:
        with open(keys_path,"r") as file:
            data=json.load(file)
            
            SENDER_EMAIL = data["email"]
            EMAIL_PASSWORD = data["email_password"]
            SMTP_SERVER = "smtp.gmail.com"
            SMTP_PORT = 587 
            msg = EmailMessage()
            msg['From'] = SENDER_EMAIL
            msg['To'] = recipient_email
            msg['Subject'] = subject

            msg.set_content(body)

            server = None 
            try:
                print(f"[Email Process]: Connecting to SMTP server at {SMTP_SERVER}:{SMTP_PORT}...")
                server = aiosmtplib.SMTP(hostname=SMTP_SERVER, port=SMTP_PORT, start_tls=True)
                await server.connect()
                print(f"[Email Process]: Logging in as {SENDER_EMAIL}...")
                await server.login(SENDER_EMAIL, EMAIL_PASSWORD)
                await server.sendmail(SENDER_EMAIL, recipient_email, msg.as_string())
                print("[Email Process]: Email Sent Successfully to:", recipient_email)  
            finally:
                if server:
                    print("[Email Process]: Closing connection to the SMTP server.")
                    await server.quit()
    except FileNotFoundError:
            print(f"Error: Configuration file 'key.json' not found at '{keys_path}'.")
            print("Please create the file and add your email credentials to it.")
    except KeyError:
            print(f"Error: 'key.json' is missing required keys. Ensure it contains 'email' and 'email_password'.")
    except Exception as e:
            print(f"An unexpected error occurred: {e}")
