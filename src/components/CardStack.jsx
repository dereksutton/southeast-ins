// src/components/CardStack.jsx - Fixed for All Cards & Better Speed
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";

export const StickyScrollReveal = ({ content, videoSrc }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"], // Changed to ensure full scroll range
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsCount = content.length;
    
    // Map scroll progress to card indices with better distribution
    // This ensures we reach the last card before scroll ends
    const adjustedProgress = Math.min(latest * 1.2, 1); // Amplify progress slightly
    
    let cardIndex;
    if (adjustedProgress >= 0.99) {
      // Ensure we show the last card
      cardIndex = cardsCount - 1;
    } else {
      // Distribute cards evenly across scroll range
      cardIndex = Math.floor(adjustedProgress * cardsCount);
    }
    
    // Clamp to valid range
    cardIndex = Math.min(Math.max(cardIndex, 0), cardsCount - 1);
    
    if (cardIndex !== activeCard) {
      setActiveCard(cardIndex);
    }
  });

  return (
    <div className="sticky-scroll-container" ref={ref}>
      <div className="sticky-scroll-wrapper">
        <div 
          className="sticky-scroll-content"
          style={{
            background: '#ffffff',
            filter: 'none',
            isolation: 'isolate'
          }}
        >
          {/* Card Stack on Left */}
          <div className="card-stack-container">
            {content.map((item, index) => {
              const isActive = index === activeCard;
              
              if (!isActive) {
                return null;
              }

              return (
                <motion.div
                  key={item.title + index}
                  className="coverage-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.3, // Faster transition
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="coverage-card-header">
                    <div className="coverage-card-icon">
                      {item.icon}
                    </div>
                    <h2 className="coverage-card-title">
                      {item.title}
                    </h2>
                  </div>
                  <p className="coverage-card-description">
                    {item.description}
                  </p>
                  {item.learnMoreLink && (
                    <a
                      href={item.learnMoreLink}
                      className="coverage-card-link"
                    >
                      Learn More →
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Video Container - Clean, no borders */}
          <div 
            className="coverage-video-container"
            style={{
              background: 'transparent',
              isolation: 'isolate',
              transform: 'translateZ(0)',
              willChange: 'auto'
            }}
          >
            {videoSrc ? (
              <video
                className="coverage-video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={videoSrc} type="video/mp4" />
                <img
                  src="./img/coverage-side.png"
                  alt="Coverage Illustration"
                  className="coverage-image-fallback"
                />
              </video>
            ) : (
              <img
                src="./img/coverage-side.png"
                alt="Coverage Illustration"
                className="coverage-image"
              />
            )}
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="scroll-progress">
          {content.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === activeCard ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};