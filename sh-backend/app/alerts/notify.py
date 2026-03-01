import os
import smtplib
import requests
from email.message import EmailMessage

# ---------- EMAIL ----------

def send_email_alert(subject: str, body: str):
    smtp_host = os.getenv("ALERT_SMTP_HOST")
    smtp_port = int(os.getenv("ALERT_SMTP_PORT", "587"))
    smtp_user = os.getenv("ALERT_SMTP_USER")
    smtp_pass = os.getenv("ALERT_SMTP_PASS")
    to_email = os.getenv("ALERT_EMAIL_TO")

    if not all([smtp_host, smtp_user, smtp_pass, to_email]):
        return  # email not configured

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg.set_content(body)

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)

# ---------- SLACK ----------

def send_slack_alert(message: str):
    webhook = os.getenv("SLACK_WEBHOOK_URL")
    if not webhook:
        return  # slack not configured

    requests.post(
        webhook,
        json={"text": message},
        timeout=5,
    )

# ---------- UNIFIED ----------

def send_alert(title: str, message: str):
    send_email_alert(title, message)
    send_slack_alert(f"*{title}*\n{message}")
