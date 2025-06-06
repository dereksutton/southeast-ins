// src/components/CoverageGrid.jsx - Clean Bento Grid with Fixed Image
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import coverageItems from "../data/coverageItems";
import "./CoverageGrid.css";

export default function CoverageGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    threshold: 0.1,
    margin: "-100px 0px"
  });

  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Assign grid sizes for a balanced layout
  const gridConfig = [
    { size: "large", hasVideo: true },   // Home Insurance
    { size: "medium" },                  // Auto Insurance
    { size: "small" },                   // Flood Insurance
    { size: "small" },                   // Umbrella Policy
    { size: "medium" },                  // Business Insurance
    { size: "small" },                   // Boat & Marine
    { size: "small" },                   // Life & Health
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="coverage-section" 
      id="coverage"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Fixed Image on Right */}
      <div className="fixed-image-container">
        <img 
          src="./img/coverage-side.png" 
          alt="Family Protection"
          className="fixed-image"
        />
      </div>

      {/* Left Side Content */}
      <div className="coverage-content">
        {/* Header Section */}
        <motion.div 
          className="coverage-header"
          variants={cardVariants}
        >
          <h2 className="coverage-title">
            Our Coverage
          </h2>
          <p className="coverage-subtitle">
            Comprehensive insurance solutions tailored to protect what matters most to you.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          className="bento-grid"
          variants={containerVariants}
        >
          {coverageItems.map((item, index) => {
            const config = gridConfig[index];
            
            return (
              <motion.div
                key={index}
                className={`bento-item bento-${config.size}`}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Video Background for Home Insurance */}
                {config.hasVideo && (
                  <div className="video-bg">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="./img/coverage-vid.mp4" type="video/mp4" />
                    </video>
                  </div>
                )}

                <div className="bento-content">
                  <div className="bento-icon">
                    {item.icon}
                  </div>
                  <h3 className="bento-title">{item.title}</h3>
                  <p className="bento-description">{item.description}</p>
                  
                  <motion.a
                    href={item.learnMoreLink}
                    className="bento-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn More →
                  </motion.a>
                </div>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div 
            className="bento-item bento-cta"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3>Ready to Get Started?</h3>
            <p>Get your personalized quote in just minutes.</p>
            <a href="#quote" className="cta-button">
              Get My Quote
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}