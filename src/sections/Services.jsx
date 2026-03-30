import React from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/animations/FadeUp';
import { Layers, Zap, PenTool, MonitorPlay } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    icon: <MonitorPlay size={32} />,
    title: 'Modern Websites',
    desc: 'We build fast, responsive websites that look great on any screen.'
  },
  {
    icon: <PenTool size={32} />,
    title: 'Visual Design',
    desc: 'We make your brand look professional and unique with custom design.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Fast Performance',
    desc: 'No more slow loading. We optimize everything for a smooth feel.'
  },
  {
    icon: <Layers size={32} />,
    title: 'Simple Solutions',
    desc: 'We create easy-to-use systems that grow as your business grows.'
  }
];

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <FadeUp>
          <span className="hero-eyebrow">Services</span>
          <h2 className="section-title">How We Help.</h2>
        </FadeUp>
      </div>

      <div className="services-grid">
        {servicesData.map((service, idx) => (
          <FadeUp key={idx} delay={idx * 0.1}>
            <motion.div 
              className="service-card glass-panel"
              whileHover={{ scale: 1.05, borderColor: 'rgba(79, 70, 229, 0.4)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="glow-border-effect" />
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

export default Services;
