import React, { useEffect, useState } from 'react';
import Header from './sections/Header';
import CustomCursor from './components/ui/CustomCursor';
import StarField from './components/ui/StarField';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simple loader to ensure fonts and styles are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0); // Start at top
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div style={{ height: '100vh', background: '#030303' }}></div>;
  }

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <CustomCursor />
      
      {/* Interactive Star Background */}
      <StarField />
      
      {/* Fixed Navigation Header */}
      <Header />
      
      {/* Page Sections */}
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
