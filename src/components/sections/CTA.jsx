// ── src/components/CTA.jsx ──
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Clock, CheckCircle, Phone, Star, Lock, Users, Award } from "lucide-react";
import "./CTA.css";

export default function CTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    threshold: 0.1,
    margin: "-100px 0px",
  });

  // Animation variants
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
      {/* Background Pattern */}
      <div className="cta-background">
        <div className="cta-bg-pattern" />
      </div>

      {/* Header */}
      <motion.div className="cta-header" variants={itemVariants}>
        <span className="section-label">GET A QUOTE</span>
        <h2 className="cta-title">
          Ready to Protect?{" "}
          <span className="title-gradient">Get Your Free Quote</span>
        </h2>
        <p className="cta-subtitle">
          Join thousands of Florida families who trust us with their protection.
          Get a personalized quote in minutes—no obligation, no pressure.
        </p>

        {/* Trust Badges */}
        <motion.div className="cta-trust-badges" variants={itemVariants}>
          <div className="trust-badge">
            <Clock className="trust-badge-icon" />
            <span>Response in 24 Hours</span>
          </div>
          <div className="trust-badge">
            <Shield className="trust-badge-icon" />
            <span>A+ Rated Carriers</span>
          </div>
          <div className="trust-badge">
            <Lock className="trust-badge-icon" />
            <span>100% Secure</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Container */}
      <div className="cta-content-wrapper">
        {/* Left Side - Value Props */}
        <motion.div className="cta-value-props" variants={containerVariants}>
          <motion.div className="value-prop-card" variants={itemVariants}>
            <div className="value-prop-icon">
              <Users />
            </div>
            <div className="value-prop-content">
              <h4>Personal Agent Assigned</h4>
              <p>Work directly with a dedicated local agent who knows your needs—not a call center.</p>
            </div>
          </motion.div>

          <motion.div className="value-prop-card" variants={itemVariants}>
            <div className="value-prop-icon">
              <Award />
            </div>
            <div className="value-prop-content">
              <h4>Compare Multiple Carriers</h4>
              <p>We shop 20+ top-rated insurance companies to find you the best coverage and price.</p>
            </div>
          </motion.div>

          <motion.div className="value-prop-card" variants={itemVariants}>
            <div className="value-prop-icon">
              <Star />
            </div>
            <div className="value-prop-content">
              <h4>Average Savings of $742/Year</h4>
              <p>Our clients save an average of $742 annually when switching to our recommended policies.</p>
            </div>
          </motion.div>

          <motion.div className="value-prop-card" variants={itemVariants}>
            <div className="value-prop-icon">
              <CheckCircle />
            </div>
            <div className="value-prop-content">
              <h4>No Obligation Quote</h4>
              <p>Get your personalized quote completely free. No hidden fees, no pressure to buy.</p>
            </div>
          </motion.div>

          {/* Testimonial Snippet */}
          <motion.div className="cta-testimonial" variants={itemVariants}>
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-filled" />
              ))}
            </div>
            <p className="testimonial-text">
              "Southeast Insurance saved us over $1,200 on our home and auto bundle.
              The process was incredibly easy!"
            </p>
            <div className="testimonial-author">
              <img src="https://i.pravatar.cc/150?img=32" alt="Jennifer M." className="testimonial-avatar" />
              <div>
                <span className="testimonial-name">Jennifer M.</span>
                <span className="testimonial-location">Neptune Beach, FL</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div className="cta-form-container" variants={containerVariants}>
          {/* Form Header */}
          <div className="form-header">
            <h3>Request Your Free Quote</h3>
            <p>Takes less than 2 minutes to complete</p>
          </div>

          <form className="cta-form">
            <div className="form-row">
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
            </div>

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
              <label htmlFor="address">
                Property Address<span className="required">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="1234 Main St, Jacksonville, FL 32256"
                required
              />
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="insuranceType">
                Insurance Type<span className="required">*</span>
              </label>
              <select id="insuranceType" name="insuranceType" required>
                <option value="">Select coverage type...</option>
                <option value="home">Home Insurance</option>
                <option value="auto">Auto Insurance</option>
                <option value="bundle">Home + Auto Bundle (Save up to 25%)</option>
                <option value="flood">Flood Insurance</option>
                <option value="business">Business Insurance</option>
                <option value="umbrella">Umbrella Policy</option>
                <option value="boat">Boat & Marine</option>
                <option value="other">Other / Multiple Policies</option>
              </select>
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="coverageDetails">
                Tell Us About Your Needs
              </label>
              <textarea
                id="coverageDetails"
                name="coverageDetails"
                rows="3"
                placeholder="Property details, current coverage, any specific concerns..."
              ></textarea>
            </motion.div>

            <motion.div className="form-group checkbox-group" variants={itemVariants}>
              <label className="checkbox-label">
                <input type="checkbox" name="contactPreference" value="call" />
                <span className="checkbox-text">I prefer a phone call to discuss my options</span>
              </label>
            </motion.div>

            <motion.button type="submit" className="submit-btn" variants={itemVariants}>
              <span className="btn-text">Get My Free Quote</span>
              <span className="btn-subtext">No obligation • Response within 24 hours</span>
            </motion.button>

            {/* Security Note */}
            <motion.div className="form-security" variants={itemVariants}>
              <Lock className="security-icon" />
              <span>Your information is secure and will never be shared or sold.</span>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Bottom CTA - Phone */}
      <motion.div className="cta-phone-section" variants={itemVariants}>
        <p>Prefer to speak with someone now?</p>
        <a href="tel:+13862589998" className="phone-link">
          <Phone className="phone-icon" />
          <span className="phone-number">(386) 258-9998</span>
        </a>
        <span className="phone-availability">Available Mon-Fri 8am-6pm, Sat 9am-1pm</span>
      </motion.div>
    </motion.section>
  );
}
