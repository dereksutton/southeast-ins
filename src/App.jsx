// ── src/App.jsx ──
import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import CoverageGrid from './components/sections/CoverageGrid';
import WhyUs from './components/sections/WhyUs';
import Reviews from './components/sections/Reviews';
import FAQ from './components/sections/FAQ';
import CTA from './components/sections/CTA';
import Footer from './components/layout/Footer';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <Hero mobileMenuOpen={mobileMenuOpen} />
      <CoverageGrid />
      <WhyUs />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
