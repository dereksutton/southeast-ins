// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import './Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShow(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
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
    { label: 'Get a Quote', href: '#quote', isButton: true },
  ];

  return (
    <header className={`navbar-header navbar-hide-scroll ${show ? 'visible' : 'hidden'}`}>
      <nav className="navbar-container">
        {/* Logo - Left */}
        <motion.a
          href="#"
          className="navbar-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Southeast Insurance"
        >
          <div className="navbar-logo-img" />
        </motion.a>

        {/* Desktop Menu - Right */}
        <div className="navbar-menu">
          {navLinks.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Button
                href={item.href}
                variant={item.isButton ? 'primary' : 'ghost'}
                size={item.isButton ? 'md' : 'sm'}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
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
          <div
            className="navbar-drawer-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="navbar-drawer">
            <div className="navbar-drawer-links">
              {navLinks.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  variant={item.isButton ? 'primary' : 'ghost'}
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
}