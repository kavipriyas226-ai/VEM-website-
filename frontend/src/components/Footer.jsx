import React from 'react';

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  'Wedding Events',
  'Engagement Events',
  'Birthday Celebrations',
  'Corporate Events',
  'Reception Events',
  'Customized Events',
];

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="section-inner footer__grid">
        <div className="footer__brand">
          <span className="footer__brand-name">Vishesha</span>
          <span className="footer__brand-sub">Event Management</span>
          <p>
            Creating moments and curating memories through elegant design,
            professional planning and flawless execution for celebrations
            across India.
          </p>
          <div className="footer__socials">
            <a href="https://instagram.com/vishesha.events" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              IG
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              FB
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              PN
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            {SERVICES.map((service) => (
              <li key={service}>
                <a href="#services" onClick={(e) => handleClick(e, '#services')}>
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>64, 3rd cross narayana nagar, kitchipalayam, salem, 636015, Tamil Nadu, India</li>
            <li>+91 63858 29303</li>
            <li>vishesha.events@gmail.com</li>
            <li>Mon &ndash; Sat, 10am &ndash; 7pm</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2026 Vishesha Event Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
