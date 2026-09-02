import React, { useEffect, useState } from 'react';
import OrnamentDivider from './OrnamentDivider.jsx';
import headerImage from '../../images/header image.jpeg';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url("${headerImage}")` }} />
      <div className="hero__overlay" />

      <div className={`hero__content ${mounted ? 'is-in' : ''}`}>
        <p className="hero__eyebrow">Vishesha Event Management</p>
        <h1 className="hero__headline">
          We Don’t Convince You.
          <br />
          <em> We Understand You.</em>
        </h1>
        <OrnamentDivider tone="cream" />
        <p className="hero__sub">
          We transform celebrations into unforgettable experiences through
          thoughtful planning, elegant design and flawless execution.
        </p>

        <div className="hero__ctas">
          <a href="#contact" className="btn btn--primary" onClick={(e) => scrollTo(e, '#contact')}>
            Plan Your Event
          </a>
          <a href="#gallery" className="btn btn--outline" onClick={(e) => scrollTo(e, '#gallery')}>
            Explore Our Work
          </a>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll"
        aria-label="Scroll to explore"
        onClick={(e) => scrollTo(e, '#about')}
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </button>
    </section>
  );
}
