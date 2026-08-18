import React, { useState } from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const SERVICES = [
  {
    title: 'Wedding Events',
    short: 'Complete wedding planning, décor, coordination and execution.',
    more: 'From the first mehendi to the final send-off, we handle venue selection, styling, vendor coordination, guest logistics and a dedicated on-ground team so your wedding unfolds exactly as envisioned.',
    icon: 'ring',
  },
  {
    title: 'Engagement Events',
    short: 'Elegant engagement setups and personalized event experiences.',
    more: 'Intimate or grand, we design engagement ceremonies with thoughtful décor, curated moments and a look and feel that reflects the two of you.',
    icon: 'sparkle',
  },
  {
    title: 'Birthday Celebrations',
    short: 'Creative birthday concepts, décor and entertainment planning.',
    more: 'Themed concepts, styling and entertainment planning for every age and milestone, designed to feel personal rather than off-the-shelf.',
    icon: 'balloon',
  },
  {
    title: 'Corporate Events',
    short: 'Professional corporate event planning and execution.',
    more: 'Product launches, conferences, offsites and milestone celebrations, run with the precision and polish your brand deserves.',
    icon: 'briefcase',
  },
  {
    title: 'Reception Events',
    short: 'Luxury reception décor and complete event coordination.',
    more: 'Statement florals, lighting design and seamless coordination for a reception that feels effortless and unforgettable.',
    icon: 'crown',
  },
  {
    title: 'Customized Events',
    short: 'Tailor-made event planning according to client requirements.',
    more: "Anniversaries, house-warmings, cultural ceremonies or something entirely your own — we design a plan built around your vision and requirements.",
    icon: 'compass',
  },
];

const ICONS = {
  ring: (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="24" cy="28" r="12" />
      <path d="M24 16 L18 6 H30 L24 16Z" strokeLinejoin="round" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M24 6 L27 20 L41 24 L27 28 L24 42 L21 28 L7 24 L21 20 Z" strokeLinejoin="round" />
    </svg>
  ),
  balloon: (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6">
      <ellipse cx="24" cy="18" rx="11" ry="13" />
      <path d="M24 31 L24 42 M20 44 H28" strokeLinecap="round" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="7" y="16" width="34" height="22" rx="2" />
      <path d="M17 16 V11 a2 2 0 0 1 2-2 h10 a2 2 0 0 1 2 2 v5" />
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 34 L10 18 L19 26 L24 14 L29 26 L38 18 L40 34 Z" strokeLinejoin="round" />
      <path d="M8 34 H40" strokeLinecap="round" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="24" cy="24" r="17" />
      <path d="M30 18 L26 26 L18 30 L22 22 Z" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="services" className="services">
      <div className="section-inner">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">What We Do</p>
          <h2>Our Services</h2>
          <OrnamentDivider />
          <p className="section-sub">
            A complete suite of planning, design and execution services,
            each shaped around the celebration it serves.
          </p>
        </Reveal>

        <div className="services__grid">
          {SERVICES.map((service, i) => {
            const expanded = openIndex === i;
            return (
              <Reveal key={service.title} delay={i * 80} className="service-card">
                <div className="service-card__icon">{ICONS[service.icon]}</div>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <div className={`service-card__more ${expanded ? 'is-open' : ''}`}>
                  <p>{service.more}</p>
                </div>
                <button
                  type="button"
                  className="service-card__link"
                  onClick={() => setOpenIndex(expanded ? null : i)}
                  aria-expanded={expanded}
                >
                  {expanded ? 'Show Less' : 'Learn More'}
                  <span className={`service-card__arrow ${expanded ? 'is-open' : ''}`} aria-hidden="true">
                    &rarr;
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
