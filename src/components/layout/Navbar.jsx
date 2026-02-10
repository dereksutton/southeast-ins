// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Facebook } from 'lucide-react';
import Button from '../ui/Button';
import './Navbar.css';

export default function Navbar({ mobileOpen, setMobileOpen }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only show navbar when at the very top of the page
      if (currentScrollY < 50) {
        setShow(true);
      } else {
        setShow(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: 'Coverage', href: '#coverage' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const ctaButtons = [
    { label: 'Our Coverage', href: '#coverage', variant: 'secondary' },
    { label: 'Get a Quote', href: '#quote', variant: 'primary' },
  ];

  return (
    <header className={`navbar-header navbar-hide-scroll ${show ? 'visible' : 'hidden'}`}>
      <nav className="navbar-container">
        {/* Logo Section - Left */}
        <motion.div
          className="navbar-logo-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="#" className="navbar-logo" aria-label="Southeast Insurance">
            <div className="navbar-logo-img" />
          </a>
          {/* Social - Facebook */}
          <a
            href="https://www.facebook.com/SoutheastInsuranceAgency"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-facebook-link"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={18} />
            <span>Follow Us</span>
          </a>
        </motion.div>

        {/* Right Section - Nav Links + CTA Buttons */}
        <div className="navbar-right">
          <motion.div
            className="navbar-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="navbar-glass-container">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    href={item.href}
                    variant="ghost"
                    size="sm"
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <div className="navbar-cta-buttons">
            {ctaButtons.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (navLinks.length + index) * 0.1 }}
              >
                <Button
                  href={item.href}
                  variant={item.variant}
                  size="sm"
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="navbar-mobile-btn"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <motion.div
            className="navbar-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            className="navbar-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="navbar-drawer-close"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Decorative accent */}
            <div className="navbar-drawer-accent" />

            {/* Navigation Links */}
            <nav className="navbar-drawer-nav">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="navbar-drawer-link"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <motion.div
              className="navbar-drawer-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                href="#quote"
                variant="primary"
                size="md"
                shimmer
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </Button>
              <Button
                href="#coverage"
                variant="secondary"
                size="md"
                onClick={() => setMobileOpen(false)}
              >
                Our Coverage
              </Button>
            </motion.div>

            {/* Footer - Logo & Social */}
            <motion.div
              className="navbar-drawer-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="navbar-drawer-logo">
                <div className="navbar-logo-img navbar-drawer-logo-img" />
              </div>
              <a
                href="https://www.facebook.com/SoutheastInsuranceAgency"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-drawer-facebook"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={22} />
                <span>Follow Us on Facebook</span>
              </a>
              <p className="navbar-drawer-tagline">Protecting Florida Families Since 2008</p>
            </motion.div>
          </motion.div>
        </>
      )}
    </header>
  );
}
