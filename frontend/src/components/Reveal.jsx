import React from 'react';
import useReveal from '../hooks/useReveal.js';

/**
 * Wraps children in a fade/slide reveal that triggers once the element
 * scrolls into view. `as` lets the caller pick the wrapping tag,
 * `delay` staggers groups of siblings, `variant` picks the motion style.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant = 'up',
  className = '',
  threshold,
  ...rest
}) {
  const [ref, visible] = useReveal(threshold);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
