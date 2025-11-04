// ── src/components/CTA.jsx ──
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./CTA.css";

export default function CTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    threshold: 0.1,
    margin: "-100px 0px",
  });

  // Animation variants (same as Reviews)
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

  return (
    <motion.section
      ref={sectionRef}
      className="cta-section"
      id="quote"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Header */}
      <motion.div className="cta-header" variants={itemVariants}>
        <span className="section-label">GET A QUOTE</span>
        <h2 className="cta-title">
          Ready to Protect?{" "}
          <span className="title-gradient">Get Your Free Quote</span>
        </h2>
        <p className="cta-subtitle">
          Fill out the form below and one of our agents will get back to you
          shortly.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form className="cta-form" variants={containerVariants}>
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="fullName">
            Full Name<span className="required">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            required
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="email">
            Email Address<span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="phone">
            Phone Number<span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(123) 456-7890"
            required
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="address">
            Address<span className="required">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="1234 Main St, Jacksonville, FL"
            required
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="insuranceType">
            Insurance Type<span className="required">*</span>
          </label>
          <select id="insuranceType" name="insuranceType" required>
            <option value="">-- Select Policy --</option>
            <option value="home">Home Insurance</option>
            <option value="auto">Auto Insurance</option>
            <option value="flood">Flood Insurance</option>
            <option value="business">Business Insurance</option>
            <option value="umbrella">Umbrella Policy</option>
            <option value="boat">Boat & Marine</option>
          </select>
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="coverageDetails">
            Coverage Details<span className="required">*</span>
          </label>
          <textarea
            id="coverageDetails"
            name="coverageDetails"
            rows="4"
            placeholder="Please provide any specifics (e.g., property value, vehicle year/model, square footage)..."
            required
          ></textarea>
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="currentProvider">Current Provider (if any)</label>
          <input
            type="text"
            id="currentProvider"
            name="currentProvider"
            placeholder="e.g., State Farm"
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="comments">Additional Comments</label>
          <textarea
            id="comments"
            name="comments"
            rows="3"
            placeholder="Any other information or questions..."
          ></textarea>
        </motion.div>

        <motion.button type="submit" className="submit-btn" variants={itemVariants}>
          Get My Quote
        </motion.button>
      </motion.form>
    </motion.section>
  );
}
