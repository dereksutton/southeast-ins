// ── src/components/Footer.jsx ──
import React from "react";
import { Facebook } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Logo or Brand Name */}
        <div className="footer-brand">
          <a href="/#">
            <img src="/img/southeast-logo.png" alt="Southeast Insurance" className="footer-logo" />
          </a>
        </div>

        {/* Navigation Links — rooted with "/" so they also work from /privacy */}
        <nav className="footer-nav">
          <a href="/#coverage" className="footer-link">
            Coverage
          </a>
          <a href="/#why-us" className="footer-link">
            Why Us
          </a>
          <a href="/#reviews" className="footer-link">
            Reviews
          </a>
          <a href="/#faq" className="footer-link">
            FAQ
          </a>
          <a href="/#quote" className="footer-link">
            Get a Quote
          </a>
          <a href="/#file-claim" className="footer-link">
            File a Claim
          </a>
        </nav>

        {/* Facebook Link */}
        <a
          href="https://www.facebook.com/SoutheastInsuranceAgency"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-facebook"
        >
          <Facebook size={18} />
          <span>Follow Us on Facebook</span>
        </a>

        {/* Legal */}
        <nav className="footer-legal">
          <a href="/privacy" className="footer-legal-link">
            Texting Terms &amp; Privacy
          </a>
        </nav>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Southeast Insurance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
