import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = ({ media }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setCurrentMediaIndex((prev) => (prev + 1) % media.length);
        setTimeout(() => setIsTransitioning(false), 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentMediaIndex, media, isTransitioning]);

  const handleManualNavigation = (index) => {
    if (!isTransitioning && index !== currentMediaIndex) {
      setIsTransitioning(true);
      setCurrentMediaIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <motion.div 
      className="relative w-full h-screen overflow-hidden bg-primary"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {/* Complex Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-primary/90 z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.4),transparent_70%)] z-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,215,0,0.1),transparent_40%)] z-20"></div>
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 z-20 opacity-30 mix-blend-overlay animate-pattern">
        <div className="absolute inset-0"></div>
      </div>

      {/* Media Container with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMediaIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: mousePosition.x * -20,
            y: mousePosition.y * -20
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-10"
        >
          {media[currentMediaIndex].isVideo ? (
            <motion.div className="w-full h-full relative">
              <video
                key={media[currentMediaIndex].url}
                className="object-cover w-full h-full"
                autoPlay
                muted
                loop
                playsInline
                poster={media[currentMediaIndex].thumbnailUrl}
                style={{ 
                  filter: 'brightness(0.8) contrast(1.1)',
                  transform: `scale(1.1) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
                }}
              >
                <source src={media[currentMediaIndex].url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          ) : (
            <motion.img
              key={media[currentMediaIndex].url}
              src={media[currentMediaIndex].url}
              alt={media[currentMediaIndex].alt}
              className="object-cover w-full h-full transform transition-all duration-300"
              style={{ 
                filter: 'brightness(0.8) contrast(1.1)',
                transform: `scale(1.1) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
              }}
            />
          )}

          {/* Slide Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-30"
          >
            <div className="text-center px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-7xl font-bold text-white mb-4 text-glow"
              >
                {media[currentMediaIndex].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl text-white/90"
              >
                {media[currentMediaIndex].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Navigation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center space-x-6 bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
          {media.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => !isTransitioning && handleManualNavigation(index)}
              disabled={isTransitioning}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                currentMediaIndex === index 
                  ? 'bg-accent scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {currentMediaIndex === index && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Side Navigation */}
      <motion.div 
        className={`absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-30`}
        initial={{ opacity: 0 }}
        animate={{ opacity: showOverlay ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <NavigationButton
          direction="prev"
          onClick={() => !isTransitioning && 
            handleManualNavigation((currentMediaIndex - 1 + media.length) % media.length)}
          disabled={isTransitioning}
        />
        <NavigationButton
          direction="next"
          onClick={() => !isTransitioning && 
            handleManualNavigation((currentMediaIndex + 1) % media.length)}
          disabled={isTransitioning}
        />
      </motion.div>
    </motion.div>
  );
};

const NavigationButton = ({ direction, onClick, disabled }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className="group relative p-3"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <div className={`absolute inset-0 bg-gradient-to-${direction === 'prev' ? 'r' : 'l'} from-accent to-transparent opacity-20 blur-lg group-hover:opacity-40 transition-opacity`}></div>
    <div className="relative bg-black/30 backdrop-blur-md rounded-full p-4 group-hover:bg-black/50 transition-all border border-white/10">
      <svg 
        className={`w-6 h-6 text-white transform transition-transform ${
          direction === 'prev' 
            ? 'group-hover:-translate-x-1' 
            : 'group-hover:translate-x-1'
        }`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} 
        />
      </svg>
    </div>
  </motion.button>
);

export default Banner;
