import React from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/animations/FadeUp';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-bg-glow" />
      <div className="cta-content">
         <FadeUp>
            <h2 className="cta-title">Have an idea? <br/>Let's talk.</h2>
            <p className="cta-subtitle">Tell us about your project and we'll help you build it.</p>
         </FadeUp>
         <FadeUp delay={0.2}>
            <button className="primary-btn cta-btn" data-cursor-hover="Let's Talk">
              Start a Project
              <span className="btn-glow" />
            </button>
         </FadeUp>
      </div>
    </section>
  );
};

export default CTA;
