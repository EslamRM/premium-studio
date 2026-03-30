import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useMousePosition } from '../hooks/useMousePosition';
import './Hero.css';
import '../sections/Section.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { x, y } = useMousePosition();

  // Gentle 3D tilt effect driven by mouse position
  useEffect(() => {
    if (!containerRef.current) return;
    
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const moveX = (x - cx) * 0.05;
    const moveY = (y - cy) * 0.05;

    gsap.to(containerRef.current, {
      x: moveX,
      y: moveY,
      duration: 1,
      ease: "power2.out"
    });
  }, [x, y]);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-gradients">
        <div className="glow-orb primary" />
        <div className="glow-orb secondary" />
        <div className="glow-orb tertiary" />
        <div className="hero-noise-overlay" />
      </div>

      <div className="hero-content" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="hero-subtitle">Creative Studio</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&rsquo;s build something<br />
          <em className="hero-title-em">extraordinary.</em>
        </motion.h1>
        
        <motion.p 
          className="section-subtitle hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          We build modern websites that help your business grow. Simple, fast, and beautiful.
        </motion.p>

        <motion.div
          className="hero-cta-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button className="primary-btn" data-cursor-hover="Explore">
            View Our Work
            <span className="btn-glow" />
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="indicator-dot" />
      </motion.div>
    </section>
  );
};

export default Hero;
