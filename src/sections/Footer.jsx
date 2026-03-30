import React from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/animations/FadeUp';
import './Footer.css';

const footerNav = [
  {
    heading: 'Navigate',
    links: [
      { label: 'About',    href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Projects', href: '#projects' },
      { label: 'Process',  href: '#process' },
      { label: 'Impact',   href: '#impact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Web Design',      href: '#services' },
      { label: 'Development',     href: '#services' },
      { label: 'Motion & UX',     href: '#services' },
      { label: 'Brand Identity',  href: '#services' },
      { label: 'Consulting',      href: '#services' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Twitter / X',  href: '#', external: true },
      { label: 'Instagram',    href: '#', external: true },
      { label: 'LinkedIn',     href: '#', external: true },
      { label: 'Dribbble',     href: '#', external: true },
      { label: 'GitHub',       href: '#', external: true },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Animated top divider */}
      <motion.div
        className="footer-rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="footer-inner">
        {/* ── Top row: brand + nav columns ── */}
        <div className="footer-top">

          {/* Brand column */}
          <FadeUp className="footer-brand">
            <a href="#hero" className="footer-logo" data-cursor-hover="Home">
              STUDIO<span className="footer-logo-dot">.</span>
            </a>
            <p className="footer-tagline">
              We craft digital experiences<br />
              that feel alive.
            </p>

            {/* Availability badge */}
            <div className="footer-availability">
              <span className="avail-dot" />
              <span>Available for new projects</span>
            </div>

            <a
              href="mailto:hello@studio.co"
              className="footer-email"
              data-cursor-hover="Email"
            >
              hello@studio.co
            </a>
          </FadeUp>

          {/* Nav columns */}
          <div className="footer-nav-grid">
            {footerNav.map((col, i) => (
              <FadeUp key={col.heading} delay={0.1 * (i + 1)} className="footer-col">
                <h4 className="footer-col-heading">{col.heading}</h4>
                <ul className="footer-col-list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="footer-link"
                        data-cursor-hover={link.label}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                        {link.external && <span className="footer-link-arrow">↗</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="footer-legal">
            © {year} Studio. All rights reserved.
          </p>
          <div className="footer-bottom-center">
            <span className="footer-status-dot" />
            <span className="footer-status-text">All systems operational</span>
          </div>
          <p className="footer-legal">
            Crafted with&nbsp;<span className="footer-heart">♥</span>&nbsp;& precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
