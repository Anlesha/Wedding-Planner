import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-blush-200/70 p-5 shadow-soft transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-premium hover:-translate-y-0.5 hover:border-roseGold-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
