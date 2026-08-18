import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';
import Counter from './Counter.jsx';

const STATS = [
  { value: 100, suffix: '+', label: 'Events Delivered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 100, suffix: '%', label: 'Commitment' },
];

const POINTS = [
  'Creative event concepts tailored to your story',
  'Professional, detail-driven planning',
  'Elegant, bespoke décor and styling',
  'Seamless on-the-day execution',
  'Personalized experiences from first call to final farewell',
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-inner about__grid">
        <Reveal as="div" variant="left" className="about__image">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop"
            alt="Vishesha Event Management team styling a premium wedding venue"
            loading="lazy"
          />
          <div className="about__image-frame" aria-hidden="true" />
        </Reveal>

        <Reveal as="div" variant="right" className="about__content">
          <p className="eyebrow">About Vishesha</p>
          <h2>Where Every Celebration Becomes Extraordinary</h2>
          <OrnamentDivider align="left" />
          <p className="about__lede">
            Vishesha Event Management is a full-service event planning company
            devoted to crafting celebrations that feel unmistakably yours. From
            intimate gatherings to grand affairs, our team brings together
            design sensibility, meticulous coordination and genuine care for
            every detail.
          </p>

          <ul className="about__points">
            {POINTS.map((point) => (
              <li key={point}>
                <span className="about__point-mark" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <div className="about__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="about__stat">
                <Counter value={stat.value} suffix={stat.suffix} />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
