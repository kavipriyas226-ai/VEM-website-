import React, { useEffect, useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const FILTERS = ['All', 'Weddings', 'Engagements', 'Birthdays', 'Corporate', 'Décor'];

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop', category: 'Weddings', title: 'Mandap Styling, Udaipur' },
  { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop', category: 'Engagements', title: 'Ring Ceremony Décor' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=900&auto=format&fit=crop', category: 'Birthdays', title: 'Milestone Birthday Setup' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop', category: 'Corporate', title: 'Brand Launch Evening' },
  { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=900&auto=format&fit=crop', category: 'Décor', title: 'Floral Centrepiece Design' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=900&auto=format&fit=crop', category: 'Weddings', title: 'Reception Head Table' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop', category: 'Birthdays', title: 'Garden Party Styling' },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=900&auto=format&fit=crop', category: 'Weddings', title: 'Bridal Entrance Aisle' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop', category: 'Corporate', title: 'Conference Stage Design' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop', category: 'Décor', title: 'Lounge Styling Detail' },
  { src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=900&auto=format&fit=crop', category: 'Engagements', title: 'Candlelit Engagement Table' },
  { src: 'https://images.unsplash.com/photo-1546032996-6098e9b4869d?q=80&w=900&auto=format&fit=crop', category: 'Weddings', title: 'Evening Reception Lighting' },
];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () => (active === 'All' ? IMAGES : IMAGES.filter((img) => img.category === active)),
    [active]
  );

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, filtered.length]);

  return (
    <section id="gallery" className="gallery">
      <div className="section-inner">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Our Work</p>
          <h2>A Glimpse Into Our Celebrations</h2>
          <OrnamentDivider />
        </Reveal>

        <Reveal className="gallery__filters" delay={100}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`gallery__filter ${active === f ? 'is-active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="gallery__grid">
          {filtered.map((img, i) => (
            <Reveal key={img.src} delay={(i % 6) * 70} className={`gallery__item gallery__item--${i % 5}`}>
              <button type="button" className="gallery__item-btn" onClick={() => setLightbox(i)}>
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="gallery__item-overlay">
                  <span className="gallery__item-cat">{img.category}</span>
                  <span className="gallery__item-title">{img.title}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button type="button" className="lightbox__close" aria-label="Close" onClick={() => setLightbox(null)}>
            &times;
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
            }}
          >
            &#8249;
          </button>
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].title} />
            <figcaption>
              {filtered[lightbox].title} &middot; {filtered[lightbox].category}
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % filtered.length);
            }}
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}
