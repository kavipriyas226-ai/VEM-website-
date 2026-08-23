import React, { useEffect, useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';
import weddingImage from '../../images/Wedding/Wedding.jpeg';
import birthdayBalloonImage from '../../images/Birthday/Birthday Balloon decor.jpeg';
import birthdayEntranceImage from '../../images/Birthday/Birthday Entrance Arch.jpeg';
import corporateImage from '../../images/Corporate/Corporate events.jpeg';
import babyshowerImage from '../../images/Babyshower/Babyshower.jpeg';
import babyshowerSecondImage from '../../images/Babyshower/Babyshowerr.jpeg';
import babyshowerThirdImage from '../../images/Babyshower/Babyshowerrr.jpeg';

const FILTERS = ['All', 'Weddings', 'Birthdays', 'Corporate', 'Baby showers' ];

const IMAGES = [
  { src: weddingImage, category: 'Weddings', title: 'Weddings , CSI Church, Hasthampatti, Salem' },
  { src: birthdayBalloonImage, category: 'Birthdays', title: 'Birthday Balloon Decor , CSI Church,Old Bustand, Salem' },
  { src: birthdayEntranceImage, category: 'Birthdays', title: 'Birthday Entrance Arch , CSI Church,Old Bustand, Salem' },
  { src: corporateImage, category: 'Corporate', title: 'Corporate Events , Shevapet,Salem' },
  { src: babyshowerImage, category: 'Baby showers', title: 'Baby Shower Celebration , Ratna Residency, 3Roads, salem' },
  { src: babyshowerSecondImage, category: 'Baby showers', title: 'Baby Shower Decor , Erumapalayam Salem' },
  { src: babyshowerThirdImage, category: 'Baby showers', title: 'Baby Shower Setup , Thaaramangalam Salem' },
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
