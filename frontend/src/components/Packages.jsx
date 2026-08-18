import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const PACKAGES = [
  {
    name: 'Essential',
    tagline: 'For intimate celebrations',
    description: 'A thoughtfully curated package for close-knit gatherings that still deserve a polished, elegant touch.',
    features: [
      'Dedicated event coordinator',
      'Venue shortlisting & booking support',
      'Core décor & floral styling',
      'Vendor coordination',
      'Day-of event management',
    ],
    highlight: false,
  },
  {
    name: 'Signature',
    tagline: 'For premium celebrations',
    description: 'Our most-loved offering — a fully designed experience with elevated décor and dedicated on-ground support.',
    features: [
      'Everything in Essential',
      'Custom theme & concept design',
      'Premium décor, florals & lighting',
      'Guest experience & hospitality planning',
      'Entertainment & vendor curation',
      'Full on-site execution team',
    ],
    highlight: true,
  },
  {
    name: 'Royal',
    tagline: 'For luxury, large-scale events',
    description: 'An end-to-end luxury production for grand celebrations, crafted down to the smallest detail.',
    features: [
      'Everything in Signature',
      'Multi-day event planning',
      'Bespoke set design & installations',
      'Guest logistics & travel coordination',
      'Dedicated design & production team',
      'Personal event director on call',
    ],
    highlight: false,
  },
];

export default function Packages() {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" className="packages">
      <div className="section-inner">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Event Packages</p>
          <h2>Chosen to Fit the Scale of Your Celebration</h2>
          <OrnamentDivider />
        </Reveal>

        <div className="packages__grid">
          {PACKAGES.map((pkg, i) => (
            <Reveal
              key={pkg.name}
              delay={i * 100}
              className={`package-card ${pkg.highlight ? 'package-card--highlight' : ''}`}
            >
              {pkg.highlight && <span className="package-card__badge">Most Popular</span>}
              <h3>{pkg.name}</h3>
              <p className="package-card__tagline">{pkg.tagline}</p>
              <p className="package-card__desc">{pkg.description}</p>
              <OrnamentDivider align="left" tone={pkg.highlight ? 'cream' : 'olive'} />
              <ul className="package-card__features">
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`btn ${pkg.highlight ? 'btn--primary' : 'btn--outline'} package-card__cta`}
                onClick={scrollToContact}
              >
                Enquire Now
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
