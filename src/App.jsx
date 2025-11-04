// ── src/App.jsx ──
import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import CoverageGrid from './components/sections/CoverageGrid';
import WhyUs from './components/sections/WhyUs';
import Reviews from './components/sections/Reviews';
import CTA from './components/sections/CTA';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CoverageGrid />
      <WhyUs />
      <Reviews />
      <CTA />
      <Footer />
    </div>
  );
}
