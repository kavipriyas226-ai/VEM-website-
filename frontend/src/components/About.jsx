import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';
import Counter from './Counter.jsx';

const STATS = [
  { value: 20, suffix: '+', label: 'Events Delivered' },
  { value: 15, suffix: '+', label: 'Happy Clients' },
  { value: 1, suffix: '+', label: 'Years of Experience' },
  { value: 100, suffix: '%', label: 'Commitment' },
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
          <h2>We Don&apos;t Convince You. We Understand You.</h2>
          <OrnamentDivider align="left" />
          <p className="about__lede">
            When a client chooses Vishesha, they are trusting us with one of
            their most important moments. We take that trust seriously.
          </p>

          <p className="about__body">
            We don&apos;t try to convince you to choose what we like. We listen to
            what you want, understand what you have in mind, and turn that
            vision into reality.
          </p>

          <blockquote className="about__promise">
            <p>What you imagine, we aim to create.</p>
            <p>What you expect, we aim to deliver.</p>
            <p>What you trust us with, we give our best to execute.</p>
          </blockquote>

          <p className="about__closing">
            Because for us, the goal isn&apos;t to create an event that looks good
            to us. <strong>It&apos;s to create an event that feels exactly right to you.</strong>
          </p>

          <div className="about__vision">
            <span className="about__vision-label">Our Promise</span>
            <h3>Your Vision. Our Execution. A Result You Can Trust.</h3>
            <p>
              From the smallest detail to the final setup, we focus on bringing
              the picture in your mind into the real world, with creativity,
              attention to detail, and reliable execution.
            </p>
            <p className="about__vision-line">You bring the vision. We bring it to life.</p>
          </div>

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
