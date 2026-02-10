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
  shimmer = false,
  ...props
}) => {
  // Base styles applied to all buttons
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', 'Poppins', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.02em',
    borderRadius: '9999px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    border: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    position: 'relative',
    overflow: 'hidden',
  };

  // Variant-specific styles
  const variantStyles = {
    primary: {
      backgroundColor: '#00A99B',
      color: '#ffffff',
      boxShadow: '0 8px 30px rgba(0, 169, 155, 0.4)',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: '#333333',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#00A99B',
      border: '2px solid #00A99B',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#ffffff',
    },
  };

  // Size-specific styles - increased sizes for desktop
  const sizeStyles = {
    sm: {
      padding: '14px 28px',
      fontSize: '16px',
    },
    md: {
      padding: '18px 36px',
      fontSize: '18px',
    },
    lg: {
      padding: '24px 48px',
      fontSize: '20px',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  // Shimmer styles
  const shimmerStyles = {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transform: 'skewX(-20deg)',
  };

  // Framer Motion animations
  const getMotionProps = () => {
    if (disabled) return {};

    if (variant === 'ghost') {
      return {
        whileHover: {
          scale: 1.08,
          color: '#00A99B',
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        },
        whileTap: {
          scale: 0.95,
        },
      };
    }

    // Primary and secondary buttons
    return {
      whileHover: {
        scale: 1.05,
        y: -5,
        boxShadow: variant === 'primary'
          ? '0 20px 50px rgba(0, 169, 155, 0.5)'
          : '0 20px 50px rgba(0, 0, 0, 0.18)',
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      },
      whileTap: {
        scale: 0.98,
        y: 0,
      },
    };
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      style={combinedStyles}
      className={className}
      href={href}
      onClick={onClick}
      disabled={!href && disabled}
      {...getMotionProps()}
      {...props}
    >
      {/* Shimmer Effect */}
      {shimmer && (
        <motion.span
          style={shimmerStyles}
          animate={{
            left: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
          }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>{children}</span>
    </Component>
  );
};

export default Button;
