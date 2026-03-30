import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../hooks/useLenis.jsx';
import './Header.css';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Process', href: '#process' },
  { name: 'Impact', href: '#impact' },
];

const Header = () => {
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <motion.header 
      className={`site-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="header-container">
        <a 
          href="#hero" 
          className="header-logo" 
          onClick={(e) => handleNavClick(e, '#hero')}
          data-cursor-hover="Home"
        >
          STUDIO<span>.</span>
        </a>

        <nav className="header-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <a 
                  href={link.href} 
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                  data-cursor-hover="Explore"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta">
          <button 
            className="header-btn" 
            onClick={(e) => handleNavClick(e, '#cta')}
          >
            Contact
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
