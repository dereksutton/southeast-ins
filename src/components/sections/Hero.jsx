// src/components/sections/Hero.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '../ui/Button';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    threshold: 0.1,
    margin: "-100px 0px"
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="hero-section"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background Image */}
      <div className="hero-bg-image" />

      {/* Dark Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
      >
        <motion.div className="hero-text-wrapper" variants={itemVariants}>
          <span className="hero-label">
            FLORIDA INSURANCE EXPERTS
          </span>

          <h1 className="hero-title">
            Personalized Coverage,{' '}
            <span className="hero-title-gradient">
              Florida Peace of Mind
            </span>
          </h1>

          <p className="hero-subtitle">
            From Daytona's coast to Jacksonville's suburbs, protect what matters most —
            home, car, and everything in between.
          </p>

          <div className="hero-buttons">
            <Button href="#quote" variant="primary" size="lg">
              Start My Free Quote
            </Button>
            <Button href="#coverage" variant="secondary" size="lg">
              View Coverage Options
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}