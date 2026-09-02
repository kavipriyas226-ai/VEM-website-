import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';
import weddingImage from '../../images/Wedding/Wedding.jpeg';
import corporateImage from '../../images/Corporate/image 1.jpeg';
import birthdayImage from '../../images/Birthday/image 1.jpeg';
import babyshowerImage from '../../images/Babyshower/image 1.jpeg';
import homeDecorImage from '../../images/home decor/image 1.jpeg';

const CATEGORIES = [
  { name: 'Weddings', img: weddingImage },
  { name: 'Birthdays', img: birthdayImage },
  { name: 'Corporate Events', img: corporateImage },
  { name: 'Baby Showers', img: babyshowerImage },
  { name: 'Home Decor', img: homeDecorImage },
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
