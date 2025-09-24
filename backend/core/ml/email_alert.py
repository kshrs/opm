import aiosmtplib
import os
#from email.mime.multipart import MIMEMultipart
#from email.mime.text import MIMEText
from typing import List
import asyncio
from email.message import EmailMessage
SENDER_EMAIL = "gashwinbalaji1@gmail.com"
EMAIL_PASSWORD = "kjpe gjco gltn nsmz" 
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587 
async def send_email_alert(recipient_emails: List[str], subject: str, body: str):
    msg = EmailMessage()
    msg['From'] = SENDER_EMAIL
    msg['To'] = ", ".join(recipient_emails)
    msg['Subject'] = subject

    msg.set_content(body)

    server = None 
    try:
        print(f"Connecting to SMTP server at {SMTP_SERVER}:{SMTP_PORT}...")
        server = aiosmtplib.SMTP(hostname=SMTP_SERVER, port=SMTP_PORT, start_tls=True)
        await server.connect()
        print(f"Logging in as {SENDER_EMAIL}...")
        await server.login(SENDER_EMAIL, EMAIL_PASSWORD)
        await server.sendmail(SENDER_EMAIL, recipient_emails, msg.as_string())
        print("Email sent ")  
    finally:
        if server:
            print("Closing connection to the SMTP server.")
            await server.quit()
if __name__ == "__main__":
    worker_emails = ["gashwinbalaji1@gmail.com"]
    alert_subject = "CRITICAL ALERT: Rockfall Detected in Open Pit Mine Sector 4"
    alert_body = """
    This is an automated emergency alert.
    
    A potential rockfall has been detected by the monitoring system in Sector 4.
    
    Please evacuate the area immediately and proceed to the designated safety zone. Await further instructions from the site supervisor.
    
    Stay safe.
    """
    send_email_alert(
        recipient_emails=worker_emails,
        subject=alert_subject,
        body=alert_body
    )

