import React, { useState } from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const EVENT_TYPES = [
  'Wedding',
  'Engagement',
  'Birthday',
  'Corporate Event',
  'Reception',
  'Baby Shower',
  'Other',
];

// In production (Vercel), set VITE_API_URL to the deployed Render backend,
// e.g. https://vishesha-backend.onrender.com/api
// In local dev, this falls back to '/api', which Vite proxies to Flask.
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const INITIAL_STATE = {
  name: '',
  phone: '',
  email: '',
  event_type: '',
  event_date: '',
  guests: '',
  location: '',
  message: '',
};

const SUCCESS_MESSAGE =
  'Thank you for contacting Vishesha Event Management. Our team will get back to you shortly.';
const GENERIC_ERROR_MESSAGE =
  'Something went wrong. Please try again or contact us directly.';

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your full name.';

  if (!values.phone.trim()) {
    errors.phone = 'Please enter a phone number.';
  } else if (!/^[+]?[\d\s-]{7,15}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter an email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.event_type) errors.event_type = 'Please select an event type.';

  if (!values.event_date) {
    errors.event_date = 'Please choose a preferred event date.';
  }

  if (!values.message.trim()) {
    errors.message = 'Tell us a little about your event.';
  }

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guards against duplicate submissions from double-clicks or repeated
    // Enter presses while a request is already in flight.
    if (status === 'submitting') return;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch(`${API_BASE}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        setStatus('error');
        setStatusMessage(data.message || GENERIC_ERROR_MESSAGE);
        return;
      }

      setStatus('success');
      setStatusMessage(data.message || SUCCESS_MESSAGE);
      setValues(INITIAL_STATE);
    } catch (err) {
      setStatus('error');
      setStatusMessage(GENERIC_ERROR_MESSAGE);
    }
  };

  const handleSendAnother = () => {
    setStatus('idle');
    setStatusMessage('');
  };

  return (
    <section id="contact" className="contact">
      <div className="section-inner">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Let's Talk</p>
          <h2>Let's Create Something Unforgettable</h2>
          <OrnamentDivider />
          <p className="section-sub">
            Share a few details about your celebration and our team will get
            back to you with a tailored plan.
          </p>
        </Reveal>

        {status === 'success' ? (
          <Reveal className="contact__success" delay={100}>
            <span className="contact__success-mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="24" cy="24" r="21" />
                <path d="M15 24.5 L21 30.5 L33 17.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3>Enquiry Sent</h3>
            <OrnamentDivider />
            <p>{statusMessage}</p>
            <button type="button" className="btn btn--outline-dark" onClick={handleSendAnother}>
              Send Another Enquiry
            </button>
          </Reveal>
        ) : (
          <Reveal as="form" className="contact__form" onSubmit={handleSubmit} noValidate delay={100}>
            <div className="contact__grid">
              <div className="field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={status === 'submitting'}
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>

              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  disabled={status === 'submitting'}
                />
                {errors.phone && <span className="field__error">{errors.phone}</span>}
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={status === 'submitting'}
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="event_type">Event Type</label>
                <select
                  id="event_type"
                  name="event_type"
                  value={values.event_type}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                >
                  <option value="">Select event type</option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.event_type && <span className="field__error">{errors.event_type}</span>}
              </div>

              <div className="field">
                <label htmlFor="event_date">Event Date</label>
                <input
                  id="event_date"
                  name="event_date"
                  type="date"
                  value={values.event_date}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                />
                {errors.event_date && <span className="field__error">{errors.event_date}</span>}
              </div>

              <div className="field">
                <label htmlFor="guests">Number of Guests</label>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  value={values.guests}
                  onChange={handleChange}
                  placeholder="e.g. 250"
                  disabled={status === 'submitting'}
                />
              </div>

              <div className="field field--full">
                <label htmlFor="location">Preferred Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={values.location}
                  onChange={handleChange}
                  placeholder="City / venue, if known"
                  disabled={status === 'submitting'}
                />
              </div>

              <div className="field field--full">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event vision..."
                  disabled={status === 'submitting'}
                />
                {errors.message && <span className="field__error">{errors.message}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn--primary contact__submit"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting' && <span className="contact__spinner" aria-hidden="true" />}
              {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
            </button>

            {status === 'error' && statusMessage && (
              <p className="contact__status contact__status--error" role="status">
                {statusMessage}
              </p>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
