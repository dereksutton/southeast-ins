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
import Privacy from './components/pages/Privacy';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Minimal path routing — the only non-home page is the legal one, so a
  // pathname check beats pulling in a router. render.yaml rewrites /* to
  // index.html, so /privacy loads this app and lands here.
  if (window.location.pathname.replace(/\/+$/, '') === '/privacy') {
    return <Privacy />;
  }

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
