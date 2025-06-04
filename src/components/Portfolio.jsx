import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PortfolioItem = ({ title, category, gradient, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-xl aspect-[4/3]"
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{ background: gradient }}
      />

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="hexagons" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <path
              d="M5,0 L10,5 L5,10 L0,5 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Content Overlay with Enhanced Hover Effect */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
        initial={false}
        whileHover={{ y: 0 }}
      >
        {/* Glass Panel */}
        <div className="relative backdrop-blur-sm bg-white/10 rounded-lg p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          {/* Accent Line */}
          <motion.div
            className="absolute top-0 left-0 h-0.5 bg-accent"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Category Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full mb-2">
              {category}
            </span>
          </motion.div>

          {/* Title with Glow Effect */}
          <motion.h3
            className="text-xl font-bold text-white group-hover:text-glow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {title}
          </motion.h3>

          {/* Interactive Button */}
          <motion.button
            className="mt-4 px-4 py-2 text-sm font-medium text-accent border border-accent/50 rounded-lg hover:bg-accent/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </motion.div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
    </motion.div>
  );
};

const Portfolio = () => {
  const portfolioItems = [
    {
      title: "Summer Vibes - Original Song",
      category: "Music Production",
      gradient: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
    },
    {
      title: "Corporate Brand Voice Over",
      category: "Voice Over",
      gradient: "linear-gradient(45deg, #6C5CE7, #A8E6CF)",
    },
    {
      title: "Audiobook Narration",
      category: "Voice Acting",
      gradient: "linear-gradient(45deg, #FFA62B, #C4E759)",
    },
    {
      title: "Artist Portfolio Website",
      category: "Web Design",
      gradient: "linear-gradient(45deg, #45B8AC, #D65DB1)",
    },
    {
      title: "Music Video Production",
      category: "Video Editing",
      gradient: "linear-gradient(45deg, #FF9671, #845EC2)",
    },
    {
      title: "YouTube Channel Growth",
      category: "Digital Marketing",
      gradient: "linear-gradient(45deg, #00C9A7, #845EC2)",
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Featured Work</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore a selection of my creative projects spanning music, voice overs, web design, and digital content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={item.title}
              {...item}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
