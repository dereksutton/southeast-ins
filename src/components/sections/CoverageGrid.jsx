// src/components/sections/CoverageGrid.jsx - Split Screen Bento Grid
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import coverageItems from "../../data/coverageItems";
import Button from "../ui/Button";
import "./CoverageGrid.css";

export default function CoverageGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: false, 
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
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Grid configuration
  const gridConfig = [
    { bgImage: "home-bg.png" },
    { bgImage: "auto-bg.png" },
    { bgImage: "flood-bg.png" },
    { bgImage: "umbrella-bg.png" },
    { bgImage: "business-bg.png" },
    { bgImage: "boat-bg.png" },
    { bgImage: "custom-bg.png" },
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="coverage-section" 
      id="coverage"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background Elements */}
      <div className="section-background">
        <div className="bg-gradient-orb orb-1" />
        <div className="bg-gradient-orb orb-2" />
      </div>

      {/* Header Section - Full Width */}
      <motion.div 
        className="coverage-header"
        variants={cardVariants}
      >
        <span className="section-label">PROTECTION PLANS</span>
        <h2 className="coverage-title">
          Coverage That <span className="title-gradient">Adapts</span> to Your Life
        </h2>
        <p className="coverage-subtitle">
          From coastal homes to city commutes, we've got you covered with 
          comprehensive insurance solutions designed for Florida living.
        </p>
      </motion.div>

      {/* Split Screen Layout */}
      <div className="split-screen-container">
        {/* Left Side - Bento Grid */}
        <div className="bento-section">
          <motion.div 
            className="bento-grid"
            variants={containerVariants}
          >
            {coverageItems.map((item, index) => {
              const config = gridConfig[index];
              
              return (
                <motion.div
                  key={index}
                  className="bento-item"
                  data-bg={config.bgImage}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Background Image */}
                  <div 
                    className="bento-bg-image"
                    style={{
                      backgroundImage: `url('./img/${config.bgImage}')`
                    }}
                  />

                  <div className="bento-content">
                    <motion.div 
                      className="bento-icon"
                      animate={{ 
                        rotateY: hoveredCard === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    <h3 className="bento-title">{item.title}</h3>
                    <p className="bento-description">{item.description}</p>
                    
                    <a href={item.learnMoreLink} className="bento-link">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Section - CTA and Badge */}
          <motion.div 
            className="bottom-section"
            variants={cardVariants}
          >
            {/* 25% Badge */}
            <div className="savings-badge">
              <span className="badge-number">25%</span>
              <span className="badge-text">Average Savings on Bundled Coverage</span>
            </div>

            {/* CTA Card */}
            <div className="cta-card">
              <div className="cta-card-badge">Free • No Obligation</div>
              <h3>Ready to Get Started?</h3>
              <p>Get your personalized quote in under 2 minutes.</p>
              <div className="cta-card-features">
                <span>✓ Compare rates</span>
                <span>✓ Expert guidance</span>
                <span>✓ Save up to 25%</span>
              </div>
              <Button href="#quote" variant="primary" className="cta-button">
                Get My Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Full Image (now via CSS background) */}
        <motion.div 
          className="image-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
        </motion.div>
      </div>
    </motion.section>
  );
}
