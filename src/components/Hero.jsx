import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Banner from './Banner';

const Hero = () => {  const bannerMedia = [
    {
      url: new URL('../assets/images/developer.jpg', import.meta.url).href,
      alt: 'Professional Developer',
      isVideo: false,
      title: 'Digital Innovation',
      subtitle: 'Creating seamless digital experiences'
    },
    {
      url: new URL('../assets/images/hero-bg.jpg', import.meta.url).href,
      alt: 'Portfolio Background',
      isVideo: false,
      title: 'Creative Solutions',
      subtitle: 'Turning ideas into reality'
    },
    {
      url: new URL('../assets/images/portfolio/music-1.jpg', import.meta.url).href,
      alt: 'Portfolio Image',
      isVideo: false,
      title: 'Musical Journey',
      subtitle: 'Composing melodies that inspire'
    }
  ];

  // Preload images
  useEffect(() => {
    bannerMedia.forEach(media => {
      if (!media.isVideo) {
        const img = new Image();
        img.src = media.url;
      }
      if (media.isVideo && media.thumbnailUrl) {
        const img = new Image();
        img.src = media.thumbnailUrl;
      }
    });
  }, []);
  return (
    <section id="home" className="relative min-h-screen">
      {/* Dynamic Banner */}
      <Banner media={bannerMedia} />
    </section>
  );
};

export default Hero;
