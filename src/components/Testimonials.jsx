import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TestimonialCard = ({ name, role, content, color, delay, imageSrc }) => {
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
      className="relative group"
    >
      <div className="relative p-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        {/* Dynamic Pattern */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id={`dots-${name}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100" height="100" fill={`url(#dots-${name})`} />
          </svg>
        </div>

        {/* Quote Icon */}
        <motion.div
          className="absolute -top-4 -right-4 text-accent/20 transform rotate-12"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [12, 0, 12]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </motion.div>

        {/* Profile */}        <div className="flex items-center mb-6">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
          >            <div className="w-14 h-14 rounded-full shadow-lg overflow-hidden">
              <img 
                src={imageSrc} 
                alt={name}
                className="w-full h-full object-cover"
                style={{ 
                  boxShadow: `0 0 20px ${color}44`
                }}
              />
            </div>
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${color}22, transparent)`,
                filter: 'blur(4px)'
              }}
            />
          </motion.div>

          <div className="ml-4">
            <motion.h4 
              className="font-semibold text-lg group-hover:text-accent transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {name}
            </motion.h4>
            <p className="text-white/60 text-sm">{role}</p>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <motion.div 
            className="absolute -left-6 top-0 bottom-0 w-0.5 bg-accent/30"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <p className="text-white/80 italic pl-4 leading-relaxed">"{content}"</p>
        </div>

        {/* Hover Effects */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Recording Artist",
      content: "Working with you on my debut album was incredible. Your songwriting and production skills brought my vision to life in ways I never imagined possible.",
      color: "#FF6B6B",
    },
    {
      name: "Michael Chen",
      role: "Tech Startup Founder",
      content: "The voice over work you did for our product videos was perfect. Professional, engaging, and delivered ahead of schedule. Couldn't ask for better!",
      color: "#4ECDC4",
    },
    {
      name: "Emily Rodriguez",
      role: "Author",
      content: "Your narration brought my audiobook to life. The character voices and emotional depth you brought to the project exceeded all expectations.",
      color: "#6C5CE7",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-primary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Client Testimonials</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Here's what some of my clients have to say about their experience working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
