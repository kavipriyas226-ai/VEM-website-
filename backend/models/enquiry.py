from datetime import datetime

from . import db


class Enquiry(db.Model):
    __tablename__ = "enquiries"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    event_type = db.Column(db.String(60), nullable=False)
    event_date = db.Column(db.Date, nullable=False)
    guests = db.Column(db.Integer, nullable=True)
    location = db.Column(db.String(150), nullable=True)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "event_type": self.event_type,
            "event_date": self.event_date.isoformat() if self.event_date else None,
            "guests": self.guests,
            "location": self.location,
            "message": self.message,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
