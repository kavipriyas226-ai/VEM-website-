import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const CONTACT_DETAILS = [
  { label: 'Visit Us', value: '64, 3rd cross narayana nagar, kitchipalayam, salem, 636015, Tamil Nadu, India' },
  { label: 'Call Us', value: '+91 63858 29303', href: 'tel:+916385829303' },
  { label: 'Call Us', value: '+91 90253 79428', href: 'tel:+919025379428' },
  { label: 'Email Us', value: 'md.visheshaweddingandevents@gmail.com', href: 'mailto:md.visheshaweddingandevents@gmail.com' },
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