import React, { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import './styles/animations.css';
import './styles/theme.css';
import './App.css';

// Import images
import developerImg from './assets/images/developer.jpg';
import heroBg from './assets/images/hero-bg.jpg';
import musicImg from './assets/images/portfolio/music-1.jpg';

function App() {
  useEffect(() => {
    // Preload images
    const images = [developerImg, heroBg, musicImg];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <MainLayout>
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </MainLayout>
  );
}

export default App;
