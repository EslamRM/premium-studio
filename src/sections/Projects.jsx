import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeUp } from '../components/animations/FadeUp';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Aero Dynamics',
    cat: 'E-Commerce / 3D',
    img: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Vanguard OS',
    cat: 'SaaS Platform',
    img: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Neon Vault',
    cat: 'FinTech App',
    img: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Nexus Motion',
    cat: 'Creative Branding',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000'
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.project-panel');
      const scrollWidth = scrollWrapperRef.current.scrollWidth - window.innerWidth;

      // Capture the tween so panels can reference it for their containerAnimation
      const horizontalTween = gsap.to(panels, {
        x: () => -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Parallax scale on each image, tied to the horizontal scroll progress
      panels.forEach((panel) => {
        const img = panel.querySelector('img');
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" ref={containerRef} id="projects">
      <div className="projects-header-wrapper">
        <FadeUp>
          <span className="hero-eyebrow">Our Portfolio</span>
          <h2 className="section-title">Recent Work.</h2>
        </FadeUp>
      </div>

      <div className="projects-scroll-wrapper" ref={scrollWrapperRef}>
        <div className="projects-track">
          {projects.map((project, i) => (
             <div className="project-panel" key={i}>
                <div 
                  className="project-card" 
                  data-cursor-hover="View Project"
                >
                  <div className="project-img-wrapper">
                    <img src={project.img} alt={project.title} />
                    <div className="project-overlay" />
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-cat">{project.cat}</span>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
