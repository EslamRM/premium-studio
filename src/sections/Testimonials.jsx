import React from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/animations/FadeUp';
import './Testimonials.css';

const testimonials = [
  {
    quote: "Working with this team felt like having our own visionary studio. The motion and physics in the UI are unmatched.",
    author: "Elena R.",
    role: "CEO, NexoTech"
  },
  {
    quote: "They didn't just design a website, they engineered an experience. Our conversion rate increased by 200%.",
    author: "David M.",
    role: "Founder, Zenith"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="impact">
      <div className="test-header">
         <FadeUp>
            <span className="hero-eyebrow">Client Voices</span>
            <h2 className="section-title">Impact.</h2>
         </FadeUp>
      </div>

      <div className="test-grid">
        {testimonials.map((test, i) => (
          <FadeUp delay={0.2 * i} key={i}>
            <div className="test-card glass-panel" data-cursor-hover="Read">
              <div className="quote-mark">"</div>
              <p className="test-quote">{test.quote}</p>
              <div className="test-author-info">
                <span className="test-author">{test.author}</span>
                <span className="test-role">{test.role}</span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
