import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeUp } from '../components/animations/FadeUp';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '5+',   label: 'Years Building' },
  { value: '120+', label: 'Projects Shipped' },
  { value: '98%',  label: 'Client Satisfaction' },
];

// Column definitions — each column moves at a different rate
// yFrom: starting offset (px), yTo: ending offset (px) as section scrolls
const columns = [
  {
    speed: { from: 60, to: -60 },   // floats UP
    cards: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        alt: 'Abstract 3D',
        tall: true,
      },
      {
        type: 'value',
        label: 'Our Core',
        items: ['Bold Design', 'Clean Code', 'Fast Delivery', 'Human Focus'],
      },
    ],
  },
  {
    speed: { from: -40, to: 80 },   // sinks DOWN (opposite)
    cards: [
      {
        type: 'stat',
        value: '200%',
        label: 'Average increase in conversion for our clients',
        accent: true,
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
        alt: 'Design process',
        tall: false,
      },
      {
        type: 'text',
        quote: 'We don\'t just design pixels — we engineer experiences.',
      },
    ],
  },
  {
    speed: { from: 100, to: -40 },  // flies UP fastest
    cards: [
      {
        type: 'skill',
        label: 'Our Stack',
        items: ['React', 'Three.js', 'GSAP', 'Framer Motion', 'Node.js', 'Figma'],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
        alt: 'Motion design',
        tall: false,
      },
      {
        type: 'founded',
        year: '2019',
        label: 'Founded',
      },
    ],
  },
];

const About = () => {
  const sectionRef  = useRef(null);
  const col1Ref     = useRef(null);
  const col2Ref     = useRef(null);
  const col3Ref     = useRef(null);
  const colRefs     = [col1Ref, col2Ref, col3Ref];

  useEffect(() => {
    const ctx = gsap.context(() => {
      columns.forEach((col, i) => {
        gsap.fromTo(
          colRefs[i].current,
          { y: col.speed.from },
          {
            y: col.speed.to,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <div className="about-layout">

        {/* ── LEFT: Sticky text panel ── */}
        <div className="about-left">
          <div className="about-sticky">
            <FadeUp>
              <span className="about-eyebrow">Who We Are</span>
              <h2 className="about-heading">
                Craft meets<br />
                <em className="about-heading-em">engineering.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="about-body">
                We are a boutique creative studio obsessed with the details.
                Every pixel, every millisecond of animation, every line of code
                is considered — because the feeling a product gives is everything.
              </p>
            </FadeUp>

            <FadeUp delay={0.35}>
              <div className="about-stats">
                {stats.map((s) => (
                  <div className="about-stat" key={s.label}>
                    <span className="about-stat-value">{s.value}</span>
                    <span className="about-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>

        {/* ── RIGHT: 3-column kinetic grid ── */}
        <div className="about-right">
          {columns.map((col, ci) => (
            <div
              className="about-col"
              key={ci}
              ref={colRefs[ci]}
            >
              {col.cards.map((card, ki) => {
                if (card.type === 'image') return (
                  <div
                    key={ki}
                    className={`about-card about-card--image ${card.tall ? 'tall' : ''}`}
                    data-cursor-hover="View"
                  >
                    <img src={card.src} alt={card.alt} />
                  </div>
                );

                if (card.type === 'stat') return (
                  <div key={ki} className={`about-card about-card--stat ${card.accent ? 'accent' : ''}`}>
                    <span className="card-big-num">{card.value}</span>
                    <p className="card-label">{card.label}</p>
                  </div>
                );

                if (card.type === 'value') return (
                  <div key={ki} className="about-card about-card--list">
                    <span className="card-heading">{card.label}</span>
                    <ul>
                      {card.items.map((it) => (
                        <li key={it}>
                          <span className="list-arrow">→</span> {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                );

                if (card.type === 'skill') return (
                  <div key={ki} className="about-card about-card--skills">
                    <span className="card-heading">{card.label}</span>
                    <div className="skill-tags">
                      {card.items.map((it) => (
                        <span key={it} className="skill-tag">{it}</span>
                      ))}
                    </div>
                  </div>
                );

                if (card.type === 'text') return (
                  <div key={ki} className="about-card about-card--quote">
                    <p className="card-quote">&ldquo;{card.quote}&rdquo;</p>
                  </div>
                );

                if (card.type === 'founded') return (
                  <div key={ki} className="about-card about-card--founded">
                    <span className="founded-year">{card.year}</span>
                    <span className="founded-label">{card.label}</span>
                  </div>
                );

                return null;
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
