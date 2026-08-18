from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Imported after `db` is defined so the model can register itself against it.
from .enquiry import Enquiry  # noqa: E402,F401
