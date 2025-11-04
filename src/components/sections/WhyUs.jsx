// ── src/components/WhyUs.jsx ──
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./WhyUs.css";

export default function WhyUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    threshold: 0.15,
    margin: "-100px 0px",
  });

  // Container stagger + fade-in variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="whyus-section"
      id="why-us"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="whyus-background">
        <div className="bg-pattern" />
      </div>

      {/* Header */}
      <motion.div className="whyus-header" variants={itemVariants}>
        <span className="section-label">WHY CHOOSE US</span>
        <h2 className="whyus-title">
          The Southeast Insurance Difference: <span className="title-gradient">Your Trusted Partner</span>
        </h2>
        <p className="whyus-subtitle">
          We don’t just sell policies—we build relationships. From local expertise to 24/7 support, discover why Floridians trust us to protect what matters most.
        </p>
      </motion.div>

      {/* Story Paragraphs */}
      <motion.div className="whyus-story" variants={itemVariants}>
        <p>
          As a family-owned agency headquartered right here in Jacksonville, we understand the unique challenges of living on Florida’s coast. When hurricane season approaches or storms roll in off the Gulf, you need an insurance partner who acts fast, knows local risks, and fights for you. That’s exactly what <strong>Southeast Insurance</strong> is built to do.
        </p>
        <p>
          Our roots run deep in this community: we’ve helped our neighbors rebuild homes after flood damage, find custom auto policies for families downtown, and secure peace of mind for small businesses from St. Augustine to St. Petersburg. We answer the phone 24/7 because emergencies don’t wait. We personalize each quote so you pay only for what you truly need, never a penny more.
        </p>
        <p>
          When you choose us, you’re not a policy number—you’re family. We guide you through every claim, every adjustment, and every coverage question. Let us show you how insurance can be simple, transparent, and supportive. Your journey to truly confident protection starts here.
        </p>
      </motion.div>

      {/* Pillars Grid */}
      <motion.div className="whyus-pillars" variants={containerVariants}>
        <motion.div className="pillar-card" variants={itemVariants}>
          <div className="pillar-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00A99B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h4>Local Expertise</h4>
          <p>
            Born and raised in Northeast Florida, we know the weather patterns, flood zones, and coastal regulations inside and out. Your coverage is tailored to the exact risks you face.
          </p>
        </motion.div>

        <motion.div className="pillar-card" variants={itemVariants}>
          <div className="pillar-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00A99B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1v22" />
              <path d="M1 12h22" />
            </svg>
          </div>
          <h4>Round-the-Clock Support</h4>
          <p>
            Disasters don’t stick to business hours. Our claims hotline is open 24/7—so you’ll always have a real person on the line, ready to assist when you need it most.
          </p>
        </motion.div>

        <motion.div className="pillar-card" variants={itemVariants}>
          <div className="pillar-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00A99B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h18v18H3V3z" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <h4>Customized Coverage</h4>
          <p>
            No two rooftops or roadways are alike. We craft each policy around your home’s square footage, your vehicle’s make & model, and your family’s budget—never a one-size-fits-all approach.
          </p>
        </motion.div>

        <motion.div className="pillar-card" variants={itemVariants}>
          <div className="pillar-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00A99B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h4>Community Trust</h4>
          <p>
            Over 2,500 families and counting rely on Southeast Insurance each year. Our 4.9★ average rating isn’t just a number—it’s proof that we deliver when it matters.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
