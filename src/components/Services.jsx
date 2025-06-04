import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServiceCard = ({ title, description, icon: Icon, delay }) => {
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
      className="relative group card overflow-hidden backdrop-blur-lg border border-white/10 hover:border-accent/50"
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.2),transparent_70%)]"></div>
        <div className="absolute inset-0">
          <svg className="w-full h-full text-white/5" viewBox="0 0 100 100">
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Icon Container with Complex Animation */}
      <motion.div 
        className="relative z-10 rounded-full bg-accent/10 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-500"
        whileHover={{ 
          scale: 1.1,
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.3 } 
        }}
      >
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-md group-hover:blur-lg transition-all duration-500"></div>
        <div className="relative">
          <Icon className="w-7 h-7 text-accent transform group-hover:scale-110 transition-transform duration-500" />
        </div>
      </motion.div>

      {/* Content with Hover Effects */}
      <motion.h3 
        className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300"
        initial={false}
        whileHover={{ x: 5 }}
      >
        {title}
      </motion.h3>

      <p className="text-white/70 relative z-10 transition-colors duration-300 group-hover:text-white/90">
        {description}
      </p>

      {/* Accent Line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-accent/50"
        initial={{ width: 0 }}
        whileInView={{ width: '30%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Agentic Automation',
      description: 'Implementing intelligent automation solutions using AI agents to streamline workflows and processes.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Agentic AI Coding',
      description: 'Developing custom AI-powered coding solutions and intelligent code generation systems.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'App Designing',
      description: 'Creating beautiful, intuitive, and responsive applications with modern UI/UX principles.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V17a4 4 0 01-4 4h-4zm2-16H5v12a2 2 0 002 2h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707L14.586 4.586A1 1 0 0014.293 4H9z" />
        </svg>
      ),
    },
    {
      title: 'Custom Songwriting',
      description: 'Crafting unique, memorable songs tailored to your vision and style.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
    },
    {
      title: 'Voice Over Services',
      description: 'Professional voice acting for commercials, animations, and narration.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: 'Music Production',
      description: 'Full song production including recording, mixing, and mastering.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0 0l-2.828 2.828m0 0a9 9 0 010-12.728m2.828 2.828L6.414 7.414" />
        </svg>
      ),
    },
    {
      title: 'Website Design',
      description: 'Custom Wix and Shopify website design for artists and businesses.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Video Editing',
      description: 'Professional video editing for music videos, promos, and content.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'YouTube Promotion',
      description: 'Strategic promotion and growth strategies for YouTube channels.',
      icon: props => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-20 bg-primary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">My Services</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Bringing your creative vision to life through a comprehensive suite of services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
