import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const FEATURES = [
  {
    title: 'Creative Planning',
    desc: 'Concepts built around your story, not a template pulled off the shelf.',
  },
  {
    title: 'Elegant Décor',
    desc: 'Refined styling, florals and lighting that feel considered in every corner.',
  },
  {
    title: 'Professional Team',
    desc: 'Experienced coordinators and vendors who know how to deliver under pressure.',
  },
  {
    title: 'Seamless Execution',
    desc: 'Detailed run-sheets and on-ground management so nothing is left to chance.',
  },
  {
    title: 'Personalized Experience',
    desc: 'Every client relationship is treated as its own celebration, start to finish.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why">
      <div className="section-inner">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Why Vishesha</p>
          <h2>Why Choose Vishesha</h2>
          <OrnamentDivider tone="cream" />
        </Reveal>

        <div className="why__grid">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 90} className="why-card">
              <span className="why-card__index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
