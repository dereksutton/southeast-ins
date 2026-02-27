// src/components/sections/Hero.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import './Hero.css';

export default function Hero({ mobileMenuOpen }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const isInView = useInView(sectionRef, {
    once: true,
    threshold: 0.1,
  });

  // Track if we're in the hero section
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Keep content visible until we've scrolled past ~80% of the hero section
        // This means content stays visible until almost reaching CoverageGrid
        const heroHeight = rect.height;
        const scrolledPastThreshold = rect.bottom < heroHeight * 0.25;
        setIsVisible(!scrolledPastThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const badgeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} className="hero-section">
      {/* Video Background with Parallax */}
      <motion.div
        className="hero-bg-wrapper"
        style={{ y: backgroundY }}
      >
        <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          poster="./img/flo-beach-home.png"
        >
          <source src="./img/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-bg-grain" />
      </motion.div>

      {/* Premium Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Decorative Elements */}
      <div className="hero-decorative">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
      </div>

      {/* Main Content */}
      <motion.div
        className="hero-content"
        style={{ y: contentY }}
        animate={{
          opacity: mobileMenuOpen ? 0 : isVisible ? 1 : 0,
          scale: mobileMenuOpen ? 0.95 : 1,
          filter: mobileMenuOpen ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.div
          className="hero-inner"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Trust Badge */}
          <motion.div className="hero-badge" variants={badgeVariants}>
            <span className="hero-badge-dot" />
            <span>Trusted by Florida Families Since 2008</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 className="hero-title" variants={fadeUpVariants}>
            <span className="hero-title-line">Protect What</span>
            <span className="hero-title-line hero-title-accent">Matters Most</span>
          </motion.h1>

          {/* Elegant Divider */}
          <motion.div className="hero-divider" variants={fadeUpVariants}>
            <span className="hero-divider-line" />
            <span className="hero-divider-icon">✦</span>
            <span className="hero-divider-line" />
          </motion.div>

          {/* Subtitle */}
          <motion.p className="hero-subtitle" variants={fadeUpVariants}>
            Coast to coast Florida coverage with premium insurance solutions
            tailored for discerning homeowners. With offices in Daytona and Jacksonville - protecting the entire State of Florida.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-buttons" variants={fadeUpVariants}>
            <Button href="#quote" variant="primary" size="lg" shimmer>
              Get Your Free Quote
            </Button>
            <Button href="#coverage" variant="secondary" size="lg">
              Explore Coverage
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div className="hero-trust" variants={fadeUpVariants}>
            <div className="hero-trust-item">
              <span className="hero-trust-number">15+</span>
              <span className="hero-trust-label">Years Experience</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-number">5,000+</span>
              <span className="hero-trust-label">Families Protected</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-number">A+</span>
              <span className="hero-trust-label">Rated Carriers</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
}
