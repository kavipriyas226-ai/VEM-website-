import React, { useState } from 'react';
import Reveal from './Reveal.jsx';
import OrnamentDivider from './OrnamentDivider.jsx';

const FAQS = [
  {
    q: 'What types of events do you manage?',
    a: 'We plan and execute weddings, engagements, birthdays, corporate events, receptions, baby showers and fully customized celebrations of any scale.',
  },
  {
    q: 'Do you provide customized packages?',
    a: 'Yes. Alongside our Essential, Signature and Royal packages, we design fully bespoke packages tailored to your requirements, guest count and vision.',
  },
  {
    q: 'How early should we book an event?',
    a: 'We recommend booking 3-6 months in advance for most celebrations, and 6-12 months for larger weddings, to secure preferred venues and vendors.',
  },
  {
    q: 'Do you provide decoration services?',
    a: 'Yes, décor and styling are core to what we do — from florals and lighting to full thematic set design.',
  },
  {
    q: 'Can you manage complete event execution?',
    a: 'Absolutely. Our team manages everything end-to-end, from initial concept and vendor coordination to on-the-day execution.',
  },
  {
    q: 'Do you handle corporate events?',
    a: 'Yes, we plan product launches, conferences, offsites and corporate celebrations with the same care and precision as our social events.',
  },
  {
    q: 'How can I request a quotation?',
    a: 'Fill out the enquiry form below with your event details, and our team will get back to you with a tailored quotation.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq">
      <div className="section-inner section-inner--narrow">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Questions & Answers</p>
          <h2>Frequently Asked Questions</h2>
          <OrnamentDivider />
        </Reveal>

        <div className="faq__list">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 50} className="faq__item">
                <button
                  type="button"
                  className={`faq__question ${open ? 'is-open' : ''}`}
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  {item.q}
                  <span className="faq__icon" aria-hidden="true">
                    {open ? '\u2212' : '+'}
                  </span>
                </button>
                <div
                  className="faq__answer"
                  style={{ maxHeight: open ? '260px' : '0px' }}
                >
                  <p>{item.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
