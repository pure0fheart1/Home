'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { cn, scrollToElement } from '@/lib/utils';

const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
];

const skills = [
  'Full-Stack Development',
  'UI/UX Design',
  'System Architecture',
  'Cloud Solutions',
  'AI/ML Integration',
  'Performance Optimization',
];

export function HeroSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullText = "I craft digital experiences that matter.";

  // Typing animation effect
  useEffect(() => {
    if (inView && isTyping) {
      let i = 0;
      const typeTimer = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(typeTimer);
        }
      }, 80);

      return () => clearInterval(typeTimer);
    }
    return undefined;
  }, [inView, isTyping, fullText]);

  // Animation controls
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for easeOut
      },
    },
  };

  const skillsVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const skillItemVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 via-transparent to-primary-gold-muted/20" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-gold rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-gold-muted rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-primary-gold rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-responsive relative z-10">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-accent text-lg font-medium">
              Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-responsive-3xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6"
          >
            <span className="text-gradient">Your Name</span>
          </motion.h1>

          {/* Typed Subtitle */}
          <motion.div
            variants={itemVariants}
            className="text-responsive-xl lg:text-2xl text-muted-foreground mb-8 min-h-[3rem] flex items-center justify-center"
          >
            <span className="font-light">
              {typedText}
              {isTyping && (
                <span className="inline-block w-0.5 h-6 bg-accent ml-1 animate-pulse" />
              )}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-responsive-base lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            I'm a passionate developer and designer who specializes in creating
            beautiful, functional, and scalable digital solutions. With expertise
            spanning full-stack development to user experience design, I bring
            ideas to life through code and creativity.
          </motion.p>

          {/* Skills Tags */}
          <motion.div
            variants={skillsVariants}
            initial="hidden"
            animate={controls}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                variants={skillItemVariants}
                className="px-4 py-2 bg-muted/50 backdrop-blur-sm rounded-full text-sm font-medium border border-border/50 hover:border-accent/50 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              variant="gold"
              size="lg"
              className="min-w-[200px]"
              onClick={() => scrollToElement('projects')}
            >
              View My Work
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px]"
              onClick={() => scrollToElement('contact')}
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:border-accent/50 hover:bg-accent/10 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.button
              onClick={() => scrollToElement('projects')}
              className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center hover:border-accent/50 transition-colors duration-200"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-primary-gold/10 to-primary-gold-muted/5 blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-primary-gold-muted/10 to-primary-gold/5 blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    </section>
  );
} 