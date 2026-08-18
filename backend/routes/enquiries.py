import re
from datetime import datetime

from flask import Blueprint, jsonify, request

from models import db
from models.enquiry import Enquiry

enquiries_bp = Blueprint("enquiries", __name__)

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
PHONE_RE = re.compile(r"^[+]?[\d\s-]{7,15}$")

REQUIRED_FIELDS = ["name", "phone", "email", "event_type", "event_date", "message"]


def validate_payload(data):
    errors = {}

    for field in REQUIRED_FIELDS:
        if not str(data.get(field, "")).strip():
            errors[field] = f"{field.replace('_', ' ').title()} is required."

    email = str(data.get("email", "")).strip()
    if email and not EMAIL_RE.match(email):
        errors["email"] = "Please provide a valid email address."

    phone = str(data.get("phone", "")).strip()
    if phone and not PHONE_RE.match(phone):
        errors["phone"] = "Please provide a valid phone number."

    event_date_raw = str(data.get("event_date", "")).strip()
    parsed_date = None
    if event_date_raw:
        try:
            parsed_date = datetime.strptime(event_date_raw, "%Y-%m-%d").date()
        except ValueError:
            errors["event_date"] = "Event date must be in YYYY-MM-DD format."

    guests_raw = data.get("guests")
    parsed_guests = None
    if guests_raw not in (None, ""):
        try:
            parsed_guests = int(guests_raw)
            if parsed_guests < 1:
                errors["guests"] = "Number of guests must be a positive number."
        except (TypeError, ValueError):
            errors["guests"] = "Number of guests must be a valid number."

    return errors, parsed_date, parsed_guests


@enquiries_bp.post("/enquiries")
def create_enquiry():
    data = request.get_json(silent=True) or {}

    errors, parsed_date, parsed_guests = validate_payload(data)
    if errors:
        return jsonify({"message": "Validation failed.", "errors": errors}), 400

    enquiry = Enquiry(
        name=str(data["name"]).strip(),
        phone=str(data["phone"]).strip(),
        email=str(data["email"]).strip().lower(),
        event_type=str(data["event_type"]).strip(),
        event_date=parsed_date,
        guests=parsed_guests,
        location=str(data.get("location", "")).strip() or None,
        message=str(data["message"]).strip(),
    )

    db.session.add(enquiry)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Enquiry received successfully. Our team will be in touch shortly.",
                "enquiry": enquiry.to_dict(),
            }
        ),
        201,
    )


@enquiries_bp.get("/enquiries")
def list_enquiries():
    page = request.args.get("page", default=1, type=int)
    per_page = min(request.args.get("per_page", default=20, type=int), 100)

    query = Enquiry.query.order_by(Enquiry.created_at.desc())
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify(
        {
            "results": [item.to_dict() for item in pagination.items],
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total": pagination.total,
            "total_pages": pagination.pages,
        }
    )
