import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const CONTACT_DETAILS = [
  { label: 'Visit Us', value: 'Chennai Road, Madurai, Tamil Nadu, India' },
  { label: 'Call Us', value: '+91 12345 67890', href: 'tel:+911234567890' },
  { label: 'Email Us', value: 'hello@vishesha.events', href: 'mailto:hello@vishesha.events' },
  { label: 'Working Hours', value: 'Monday - Saturday, 10am - 7pm' },
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-inner">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Get In Touch</p>
          <h2>Contact Vishesha</h2>
          <OrnamentDivider />
          <p className="section-sub">
            We are here to help you plan a celebration worth remembering.
          </p>
        </Reveal>

        <Reveal className="contact__details" delay={100}>
          {CONTACT_DETAILS.map((detail) => (
            <div className="contact__detail" key={detail.label}>
              <span className="contact__detail-label">{detail.label}</span>
              {detail.href ? (
                <a href={detail.href} className="contact__detail-value">
                  {detail.value}
                </a>
              ) : (
                <span className="contact__detail-value">{detail.value}</span>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}