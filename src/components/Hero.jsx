// ── src/components/Hero.jsx ──
import React, { useRef } from 'react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.3 });

  // Variants for staggered fade/slide animations
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const bgVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
  };
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };
  const buttonsContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        className="hero-wrapper"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* ── Background Image ── */}
        <m.div className="hero-bg-container">
          <m.img
            src={`${import.meta.env.BASE_URL}img/flo-beach-home.png`}
            alt="Beach House"
            className="hero-bg-image"
            onError={(e) => {
              console.error('Image failed to load:', e);
              e.target.style.backgroundColor = '#1a1a1a';
            }}
            variants={bgVariants}
          />
          {/* Retain static overlay */}
          <div className="hero-overlay" />
        </m.div>

        {/* ── Hero Content ── */}
        <m.div className="hero-content">
          <m.h1 className="hero-heading" variants={headingVariants}>
            Personalized Coverage,
            <span className="hero-heading-teal">Florida Peace of Mind</span>
          </m.h1>

          <m.p className="hero-subtext" variants={textVariants}>
            From Daytona’s coast to Jacksonville’s suburbs, protect what matters most — 
            home, car, and everything in between.
          </m.p>

          <m.div className="hero-buttons" variants={buttonsContainerVariants}>
            <m.a
              href="#quote"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start My Free Quote
            </m.a>
            <m.a
              href="#coverage"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Coverage Options
            </m.a>
          </m.div>
        </m.div>
      </m.section>
    </LazyMotion>
  );
}
