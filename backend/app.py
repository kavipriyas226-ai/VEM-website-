"""
Vishesha Event Management — Flask backend entry point.

This backend has a single job: receive enquiry submissions from the React
contact form and email them to the company. There is no database — nothing
is persisted anywhere.

Run with:
    python app.py
or, for production:
    gunicorn app:app
"""

import os

from dotenv import load_dotenv

load_dotenv()

from flask import Flask, jsonify  # noqa: E402
from flask_cors import CORS  # noqa: E402

from routes.enquiry import enquiry_bp  # noqa: E402


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-change-me")

    cors_origins = os.environ.get("CORS_ORIGINS", "*")
    CORS(app, resources={r"/api/*": {"origins": cors_origins}})

    app.register_blueprint(enquiry_bp, url_prefix="/api")

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "vishesha-event-management-api"})

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "true").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
