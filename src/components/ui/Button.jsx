import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick,
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-poppins font-medium transition-all duration-300 ease-luxury
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    relative overflow-hidden whitespace-nowrap
  `;

  const variants = {
    primary: `
      bg-brand-teal hover:bg-brand-teal/90 text-white 
      shadow-lg hover:shadow-xl hover:-translate-y-0.5
      focus:ring-brand-teal/50
    `,
    secondary: `
      bg-white/90 hover:bg-white text-brand-gray 
      shadow-lg hover:shadow-xl hover:-translate-y-0.5
      focus:ring-gray-500/50
    `,
    outline: `
      border-2 border-brand-teal text-brand-teal 
      hover:bg-brand-teal hover:text-white
      focus:ring-brand-teal/50
    `,
    ghost: `
      text-white hover:bg-white/10
      focus:ring-white/50
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const classes = `
    ${baseClasses} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  const Component = href ? 'a' : motion.button;
  const motionProps = href ? {} : {
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.95 }
  };

  return (
    <Component
      className={classes}
      href={href}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {/* Shimmer effect for primary and secondary buttons */}
      {(variant === 'primary' || variant === 'secondary') && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer" />
      )}
      <span className="relative z-10">{children}</span>
    </Component>
  );
};

export default Button;