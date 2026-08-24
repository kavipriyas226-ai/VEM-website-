import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';
import weddingImage from '../../images/Wedding/Wedding.jpeg';
import corporateImage from '../../images/Corporate/Corporate events.jpeg';
import birthdayBalloonImage from '../../images/Birthday/Birthday Balloon decor.jpeg';
import babyshowerSecondImage from '../../images/Babyshower/Babyshowerr.jpeg';

const CATEGORIES = [
  { name: 'Weddings', img: weddingImage },
  { name: 'Birthdays', img: birthdayBalloonImage },
  { name: 'Corporate Events', img: corporateImage },
  { name: 'Baby Showers', img: babyshowerSecondImage },
];

export default function Categories() {
  return (
    <section className="categories" aria-label="Featured event categories">
      <div className="section-inner">
        <Reveal as="div" className="section-head section-head--center">
          <p className="eyebrow">What We Celebrate</p>
          <h2>Featured Event Categories</h2>
          <OrnamentDivider />
        </Reveal>

        <div className="categories__grid">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 90} className="category-card">
              <div className="category-card__frame">
                <img src={cat.img} alt={`${cat.name} planned by Vishesha Event Management`} loading="lazy" />
                <div className="category-card__shade" />
                <span className="category-card__label">{cat.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
