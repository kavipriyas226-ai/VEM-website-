import logging
import re
from datetime import datetime

from flask import Blueprint, jsonify, request

from services.email_service import EmailConfigError, send_enquiry_email

enquiry_bp = Blueprint("enquiry", __name__)
logger = logging.getLogger(__name__)

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
PHONE_RE = re.compile(r"^[+]?[\d\s-]{7,15}$")

REQUIRED_FIELDS = ["name", "phone", "email", "event_type", "event_date", "message"]

# Basic sanitization: strip whitespace and drop characters that have no
# business being in a name/phone/etc, without over-engineering an HTML
# sanitizer for a plain-text email body.
_STRIP_TAGS_RE = re.compile(r"<[^>]*>")


def _clean(value):
    if value is None:
        return ""
    value = str(value).strip()
    value = _STRIP_TAGS_RE.sub("", value)
    return value


def _validate(data):
    errors = {}

    for field in REQUIRED_FIELDS:
        if not _clean(data.get(field)):
            errors[field] = f"{field.replace('_', ' ').title()} is required."

    email = _clean(data.get("email"))
    if email and not EMAIL_RE.match(email):
        errors["email"] = "Please provide a valid email address."

    phone = _clean(data.get("phone"))
    if phone and not PHONE_RE.match(phone):
        errors["phone"] = "Please provide a valid phone number."

    event_date_raw = _clean(data.get("event_date"))
    if event_date_raw:
        try:
            datetime.strptime(event_date_raw, "%Y-%m-%d")
        except ValueError:
            errors["event_date"] = "Event date must be in YYYY-MM-DD format."

    guests_raw = data.get("guests")
    if guests_raw not in (None, ""):
        try:
            guests_int = int(guests_raw)
            if guests_int < 1:
                errors["guests"] = "Number of guests must be a positive number."
        except (TypeError, ValueError):
            errors["guests"] = "Number of guests must be a valid number."

    return errors


@enquiry_bp.post("/enquiry")
def submit_enquiry():
    data = request.get_json(silent=True) or {}

    errors = _validate(data)
    if errors:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Please check the highlighted fields and try again.",
                    "errors": errors,
                }
            ),
            400,
        )

    cleaned = {
        "name": _clean(data.get("name")),
        "phone": _clean(data.get("phone")),
        "email": _clean(data.get("email")).lower(),
        "event_type": _clean(data.get("event_type")),
        "event_date": _clean(data.get("event_date")),
        "guests": _clean(data.get("guests")),
        "location": _clean(data.get("location")),
        "message": _clean(data.get("message")),
    }

    try:
        send_enquiry_email(cleaned)
    except EmailConfigError as exc:
        logger.error("Email configuration error: %s", exc)
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Unable to send your enquiry. Please try again.",
                }
            ),
            500,
        )
    except Exception as exc:
        logger.error("Failed to send enquiry email: %s", exc)
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Unable to send your enquiry. Please try again.",
                }
            ),
            502,
        )

    return (
        jsonify(
            {
                "success": True,
                "message": "Your enquiry has been sent successfully.",
            }
        ),
        200,
    )
