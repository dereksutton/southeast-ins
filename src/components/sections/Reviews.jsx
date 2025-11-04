// src/components/Reviews.jsx
import React, { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./Reviews.css";

// Sample review data (unchanged)
const reviewsData = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Jacksonville Beach, FL",
    rating: 5,
    text: "After Hurricane Ian, Southeast Insurance was there for us immediately. Their claim process was smooth, and we were back in our home within months. Can't recommend them enough!",
    image: "https://i.pravatar.cc/150?img=1",
    coverageType: "Home Insurance"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Downtown Jacksonville, FL",
    rating: 5,
    text: "Best auto insurance rates I've found in Florida. Their customer service team actually answers the phone, and they helped me bundle my policies to save even more.",
    image: "https://i.pravatar.cc/150?img=3",
    coverageType: "Auto Insurance"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Neptune Beach, FL",
    rating: 5,
    text: "Living near the coast, flood insurance is essential. Southeast Insurance explained everything clearly and helped us get the right coverage without breaking the bank.",
    image: "https://i.pravatar.cc/150?img=5",
    coverageType: "Flood Insurance"
  },
  {
    id: 4,
    name: "James Thompson",
    location: "Riverside, FL",
    rating: 5,
    text: "As a small business owner, I needed comprehensive coverage. They customized a policy that protects my restaurant and employees. Outstanding service!",
    image: "https://i.pravatar.cc/150?img=8",
    coverageType: "Business Insurance"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    location: "Atlantic Beach, FL",
    rating: 5,
    text: "The umbrella policy gave us peace of mind we didn't know we needed. When we had a liability claim, Southeast Insurance handled everything professionally.",
    image: "https://i.pravatar.cc/150?img=9",
    coverageType: "Umbrella Policy"
  },
  {
    id: 6,
    name: "Robert Davis",
    location: "Ponte Vedra, FL",
    rating: 5,
    text: "Insuring our boat was a breeze. They understand the unique needs of marine coverage in Florida and provided excellent protection at a fair price.",
    image: "https://i.pravatar.cc/150?img=12",
    coverageType: "Boat & Marine"
  }
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: false,
    threshold: 0.1,
    margin: "-100px 0px"
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Animation variants (unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className="star"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={index < rating ? "#fbbf24" : "none"}
        stroke="#fbbf24"
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <motion.section
      ref={sectionRef}
      className="reviews-section"
      id="reviews"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background Elements */}
      <div className="reviews-background">
        <div className="bg-pattern" />
      </div>

      {/* Header */}
      <motion.div className="reviews-header" variants={itemVariants}>
        <span className="section-label">TESTIMONIALS</span>
        <h2 className="reviews-title">
          Real Stories from <span className="title-gradient">Real Floridians</span>
        </h2>
        <p className="reviews-subtitle">
          See why thousands of Florida families trust us with their protection needs.
        </p>
      </motion.div>

      {/* Reviews Container */}
      <div className="reviews-container" ref={containerRef}>
        {/* ── LEFT COLUMN: Featured Review + Stats ── */}
        <div className="left-column">
          <motion.div className="featured-review" variants={itemVariants}>
            <motion.div
              className="featured-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="quote-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>

              <motion.div className="review-content" animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="review-text">{reviewsData[activeIndex].text}</p>

                <div className="reviewer-info">
                  <motion.img
                    key={reviewsData[activeIndex].id}
                    src={reviewsData[activeIndex].image}
                    alt={reviewsData[activeIndex].name}
                    className="reviewer-image"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="reviewer-details">
                    <h4>{reviewsData[activeIndex].name}</h4>
                    <p>{reviewsData[activeIndex].location}</p>
                    <div className="rating">{renderStars(reviewsData[activeIndex].rating)}</div>
                  </div>
                </div>

                <div className="coverage-badge">{reviewsData[activeIndex].coverageType}</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Moved: Bottom Stats (now under featured-review) ── */}
          <motion.div
            className="reviews-stats"
            variants={containerVariants}
            style={{ y: parallaxY }}
          >
            <motion.div className="stat-item" variants={itemVariants}>
              <h3>4.9</h3>
              <p>Average Rating</p>
            </motion.div>
            <motion.div className="stat-item" variants={itemVariants}>
              <h3>2,500+</h3>
              <p>Happy Customers</p>
            </motion.div>
            <motion.div className="stat-item" variants={itemVariants}>
              <h3>98%</h3>
              <p>Claim Satisfaction</p>
            </motion.div>
            <motion.div className="stat-item" variants={itemVariants}>
              <h3>24/7</h3>
              <p>Support Available</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Review Cards Grid ── */}
        <motion.div className="reviews-grid" variants={containerVariants}>
          {reviewsData.map((review, index) => (
            <motion.div
              key={review.id}
              className={`review-card ${index === activeIndex ? "active" : ""}`}
              variants={itemVariants}
              onClick={() => setActiveIndex(index)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-header">
                <img src={review.image} alt={review.name} className="card-image" />
                <div className="card-info">
                  <h5>{review.name}</h5>
                  <p>{review.location}</p>
                </div>
              </div>

              <p className="card-text">{review.text.substring(0, 80)}...</p>

              <div className="card-footer">
                <div className="card-rating">{renderStars(review.rating)}</div>
                <span className="card-coverage">{review.coverageType}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
