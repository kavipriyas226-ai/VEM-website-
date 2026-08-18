"""
Email service — builds a professionally formatted enquiry email and sends
it via SMTP. Credentials are read from environment variables only; nothing
is ever hardcoded here.
"""

import os
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class EmailConfigError(Exception):
    """Raised when required SMTP environment variables are missing."""


def _get_smtp_config():
    server = os.environ.get("MAIL_SERVER")
    port = os.environ.get("MAIL_PORT")
    username = os.environ.get("MAIL_USERNAME")
    password = os.environ.get("MAIL_PASSWORD")
    receiver = os.environ.get("MAIL_RECEIVER")

    missing = [
        name
        for name, value in [
            ("MAIL_SERVER", server),
            ("MAIL_PORT", port),
            ("MAIL_USERNAME", username),
            ("MAIL_PASSWORD", password),
            ("MAIL_RECEIVER", receiver),
        ]
        if not value
    ]
    if missing:
        raise EmailConfigError(
            f"Missing required email environment variable(s): {', '.join(missing)}"
        )

    return {
        "server": server,
        "port": int(port),
        "username": username,
        "password": password,
        "receiver": receiver,
    }


def _build_email_body(data):
    submitted_at = datetime.now().strftime("%d %b %Y, %I:%M %p")

    return (
        "New Event Enquiry\n\n"
        f"Name: {data['name']}\n"
        f"Phone: {data['phone']}\n"
        f"Email: {data['email']}\n"
        f"Event Type: {data['event_type']}\n"
        f"Event Date: {data['event_date']}\n"
        f"Number of Guests: {data.get('guests') or 'Not specified'}\n"
        f"Preferred Location: {data.get('location') or 'Not specified'}\n"
        f"Message:\n{data['message']}\n\n"
        f"Submitted Date & Time: {submitted_at}"
    )


def send_enquiry_email(data):
    """
    Sends the enquiry as a plain-text email to the configured company
    address. `data` is expected to already be validated and sanitized.

    Raises EmailConfigError if SMTP env vars are missing, or smtplib
    exceptions on send failure — callers should catch and translate these
    into the API's error response.
    """
    config = _get_smtp_config()

    message = MIMEMultipart()
    message["From"] = config["username"]
    message["To"] = config["receiver"]
    message["Reply-To"] = data["email"]
    message["Subject"] = "New Event Enquiry — Vishesha Event Management"
    message.attach(MIMEText(_build_email_body(data), "plain"))

    with smtplib.SMTP(config["server"], config["port"]) as smtp:
        smtp.starttls()
        smtp.login(config["username"], config["password"])
        smtp.sendmail(config["username"], config["receiver"], message.as_string())
