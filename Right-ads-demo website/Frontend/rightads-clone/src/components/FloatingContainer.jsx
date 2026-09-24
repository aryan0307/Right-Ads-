import React from 'react';

/**
 * Reusable glassmorphism floating container.
 *
 * @param {'sm'|'md'|'lg'} size - Animation speed tier (4s / 6s / 8s)
 * @param {boolean} accent - Use translucent variant for colored backgrounds
 * @param {React.ElementType} as - HTML element or component to render
 */
const FloatingContainer = ({
  children,
  className = '',
  size = 'md',
  accent = false,
  as: Component = 'div',
  style,
  ...props
}) => {
  const sizeClass = { sm: 'float-sm', md: 'float-md', lg: 'float-lg' }[size] || 'float-md';
  const accentClass = accent ? 'floating-glass--accent' : '';

  return (
    <Component
      className={`floating-glass ${sizeClass} ${accentClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};

export default FloatingContainer;
