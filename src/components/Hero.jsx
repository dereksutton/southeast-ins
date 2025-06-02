// ── src/components/Hero.jsx ──
import React from 'react';
import './Hero.css'; // Ensure this file is next to Hero.jsx

export default function Hero() {
  return (
    <section className="hero-wrapper">
      {/* ── Background Image + Single Overlay ── */}
      <div className="hero-bg-container">
        <img
          /* 
            Use import.meta.env.BASE_URL so that in production (base="/southeast-ins/")
            this becomes "/southeast-ins/img/flo-beach-home.png". 
            In dev, BASE_URL is "/", so it loads "/img/flo-beach-home.png".
          */
          src={`${import.meta.env.BASE_URL}img/flo-beach-home.png`}
          alt="Beach House"
          className="hero-bg-image"
          onError={(e) => {
            console.error('Image failed to load:', e);
            e.target.style.backgroundColor = '#1a1a1a';
          }}
        />
        {/* Single uniform black overlay at 40% opacity */}
        <div className="hero-overlay" />
      </div>

      {/* ── Hero Content (text + buttons) ── */}
      <div className="hero-content">
        <h1 className="hero-heading">
          Personalized Coverage,
          <span className="hero-heading-teal">Florida Peace of Mind</span>
        </h1>

        <p className="hero-subtext">
          From Daytona’s coast to Jacksonville’s suburbs, protect what matters most — 
          home, car, and everything in between.
        </p>

        <div className="hero-buttons">
          <a href="#quote" className="btn-primary">
            Start My Free Quote
          </a>
          <a href="#coverage" className="btn-secondary">
            View Coverage Options
          </a>
        </div>
      </div>
    </section>
  );
}
