import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeUp } from '../components/animations/FadeUp';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Discovery', desc: 'Understanding the core vision, audience, and deep technical requirements.' },
  { num: '02', title: 'Strategy', desc: 'Crafting the blueprint and motion guidelines for the digital experience.' },
  { num: '03', title: 'Design execution', desc: 'Translating strategy into physics-based, high-fidelity interfaces.' },
  { num: '04', title: 'Development', desc: 'Building with uncompromising performance and butter-smooth interactions.' }
];

const Process = () => {
  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll progress line animation
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      { 
        scaleY: 1, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section className="process-section" ref={containerRef} id="process">
      <div className="process-header">
         <FadeUp>
            <span className="hero-eyebrow">Methodology</span>
            <h2 className="section-title">The Blueprint.</h2>
         </FadeUp>
      </div>

      <div className="process-timeline">
        <div className="process-line-bg" />
        <div className="process-line-fill" ref={lineRef} />

        {steps.map((step, i) => (
          <div className="process-step" key={i}>
            <div className="step-marker" />
            <div className="step-content">
              <FadeUp delay={0.1}>
                <span className="step-num">{step.num}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </FadeUp>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
