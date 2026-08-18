import React from 'react';

/**
 * The site's signature mark: a thin line flanking a small four-petal motif,
 * echoing the mandala/rangoli patterns used in Indian celebration décor.
 * Used under eyebrows, between sections and as the scroll indicator core.
 */
export default function OrnamentDivider({ align = 'center', tone = 'olive' }) {
  return (
    <div className={`ornament ornament--${align} ornament--${tone}`} aria-hidden="true">
      <span className="ornament__line" />
      <svg className="ornament__mark" viewBox="0 0 24 24" width="16" height="16">
        <path d="M12 2 C13.5 8 16 10.5 22 12 C16 13.5 13.5 16 12 22 C10.5 16 8 13.5 2 12 C8 10.5 10.5 8 12 2 Z" />
      </svg>
      <span className="ornament__line" />
    </div>
  );
}
