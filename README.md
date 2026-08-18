# Vishesha Event Management — Website

A premium event-management website built with **React (JavaScript, no TypeScript)**
on the frontend and **Python + Flask** on the backend. The Contact/Enquiry
form sends submissions by **email only** — there is no database anywhere in
this project.

## Architecture

```
vishesha/
├── frontend/                  React + Vite (JavaScript / JSX only)
│   ├── index.html
│   ├── vite.config.js         Dev server + /api proxy to Flask
│   ├── .env.example           VITE_API_URL for production deploys
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── pages/Home.jsx     Assembles all sections
│       ├── components/        Navbar, Hero, About, Services, Gallery,
│       │                      Packages, WhyChooseUs, FAQ, Contact, Footer,
│       │                      FloatingActions, Reveal, OrnamentDivider, Counter
│       ├── hooks/useReveal.js Scroll-reveal IntersectionObserver hook
│       └── styles/global.css  Design tokens + all component styles
│
└── backend/                   Flask REST API — email only, no database
    ├── app.py                 App factory, blueprint registration, /api/health
    ├── routes/
    │   └── enquiry.py         POST /api/enquiry — validates input, triggers email
    ├── services/
    │   └── email_service.py   Builds the enquiry email and sends it via SMTP
    ├── requirements.txt
    └── .env.example           Copy to .env and fill in SMTP credentials
```

**Flow:** `React → Flask → SMTP → company inbox`. The Contact section posts
JSON to `POST /api/enquiry`. Flask validates and sanitizes the fields, builds
a plain-text email, and sends it via SMTP to the address in `MAIL_RECEIVER`.
Nothing is persisted — if the email send fails, the visitor gets a friendly
error and nothing is stored anywhere.

Note: the **Testimonials** section from the original brief has been left out
of this build, per request — everything else (Home, About, Services,
Gallery, Packages, Why Choose Us, FAQ, Contact, Footer, floating actions) is
included.

---

## 1. Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- An SMTP-capable email account (e.g. Gmail with an App Password, or any
  transactional email provider — SendGrid, Mailgun, Zoho Mail, etc.)

---

## 2. Backend setup (Flask + Email)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env
# then edit .env with your real SMTP credentials
```

`.env` variables:

| Variable        | Description                                             |
|-----------------|-----------------------------------------------------------|
| `FLASK_ENV`     | `development` or `production`                             |
| `SECRET_KEY`    | Flask secret key                                           |
| `CORS_ORIGINS`  | Allowed origin(s) for the API                              |
| `MAIL_SERVER`   | SMTP server, e.g. `smtp.gmail.com`                          |
| `MAIL_PORT`     | SMTP port, e.g. `587`                                       |
| `MAIL_USERNAME` | The email account used to send                              |
| `MAIL_PASSWORD` | App password / SMTP password (never your normal login pw)   |
| `MAIL_RECEIVER` | Where enquiry emails should land — the company inbox         |

**Using Gmail:** you cannot use your normal Gmail password over SMTP.
Generate an **App Password** from your Google Account → Security → 2-Step
Verification → App Passwords, and use that 16-character value as
`MAIL_PASSWORD`.

Run the API:

```bash
python app.py
```

The API starts on `http://localhost:5000`. Check it with:

```bash
curl http://localhost:5000/api/health
```

Test the enquiry endpoint directly:

```bash
curl -X POST http://localhost:5000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Priya Sharma","phone":"+91 98765 43210","email":"priya@example.com","event_type":"Wedding","event_date":"2026-12-10","guests":250,"location":"Madurai","message":"Looking for full wedding planning."}'
```

You should get back `{"success": true, "message": "Your enquiry has been sent successfully."}`
and an email should land in the `MAIL_RECEIVER` inbox.

---

## 3. Frontend setup (React + Vite)

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The site runs on `http://localhost:5173` and proxies `/api` calls to the
Flask server automatically.

---

## 4. Production build

```bash
cd frontend
npm run build      # outputs static files to frontend/dist
npm run preview    # optional local preview of the production build
```

For the backend in production, run behind a WSGI server:

```bash
pip install gunicorn   # already in requirements.txt
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

---

## 5. API reference

### `POST /api/enquiry`

Request body (all fields except `guests` and `location` are required):

```json
{
  "name": "Priya Sharma",
  "phone": "+91 98765 43210",
  "email": "priya@example.com",
  "event_type": "Wedding",
  "event_date": "2026-12-10",
  "guests": 250,
  "location": "Madurai",
  "message": "Looking for full wedding planning."
}
```

Success response (`200`):

```json
{ "success": true, "message": "Your enquiry has been sent successfully." }
```

Validation error response (`400`):

```json
{
  "success": false,
  "message": "Please check the highlighted fields and try again.",
  "errors": { "email": "Please provide a valid email address." }
}
```

Email/server error response (`500` / `502`):

```json
{ "success": false, "message": "Unable to send your enquiry. Please try again." }
```

### `GET /api/health`

Simple liveness check, returns `{"status": "ok", ...}`.

---

## 6. Deploying (Vercel + Render)

**Backend (Render):**
- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`
- Environment variables: `FLASK_ENV=production`, `SECRET_KEY`,
  `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`,
  `MAIL_RECEIVER`, and `CORS_ORIGINS` set to your Vercel domain once you
  know it.

**Frontend (Vercel):**
- Root directory: `frontend`
- Framework preset: Vite (auto-detected)
- Environment variable: `VITE_API_URL` = `https://your-backend.onrender.com/api`

The Contact form reads `VITE_API_URL` at build time (see
`frontend/.env.example`) and falls back to `/api` for local development,
where Vite's dev proxy forwards it to Flask.

## 7. Notes on images

Gallery, hero and category images currently use Unsplash placeholder URLs so
the site is fully functional out of the box. To use real client photography,
replace the `img` / `src` URLs in `Hero.jsx`, `Categories.jsx`, `About.jsx`
and `Gallery.jsx` with your own asset paths (e.g. files placed in
`frontend/src/assets/`).
