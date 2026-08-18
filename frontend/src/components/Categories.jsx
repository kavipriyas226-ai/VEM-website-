import React from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const CATEGORIES = [
  { name: 'Weddings', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
  { name: 'Engagements', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop' },
  { name: 'Birthdays', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop' },
  { name: 'Corporate Events', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop' },
  { name: 'Receptions', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop' },
  { name: 'Baby Showers', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop' },
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
