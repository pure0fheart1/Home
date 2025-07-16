'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { scrollToElement } from '@/lib/utils';

const socialLinks = [
  { icon: Github, href: 'https://github.com/pure0fheart1', label: 'GitHub' },
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
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "I craft digital experiences that matter.";

  // Typing animation effect
  useEffect(() => {
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
  }, [fullText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 via-transparent to-primary-gold-muted/20" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-gold rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-gold-muted rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-primary-gold rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-responsive relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Greeting */}
          <div className="mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-accent text-lg font-medium">
              Hello, I'm
            </span>
          </div>

          {/* Name */}
          <h1 className="text-responsive-3xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-gradient">Your Name</span>
          </h1>

          {/* Typed Subtitle */}
          <div className="text-responsive-xl lg:text-2xl text-muted-foreground mb-8 min-h-[3rem] flex items-center justify-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <span className="font-light">
              {typedText}
              {isTyping && (
                <span className="inline-block w-0.5 h-6 bg-accent ml-1 animate-pulse" />
              )}
            </span>
          </div>

          {/* Description */}
          <p className="text-responsive-base lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: '0.8s' }}>
            I'm a passionate developer and designer who specializes in creating
            beautiful, functional, and scalable digital solutions. With expertise
            spanning full-stack development to user experience design, I bring
            ideas to life through code and creativity.
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-up" style={{ animationDelay: '1s' }}>
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 bg-muted/50 backdrop-blur-sm rounded-full text-sm font-medium border border-border/50 hover:border-accent/50 transition-all duration-200 hover:scale-105 animate-scale-in"
              >
                {skill}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '1.2s' }}>
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
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: '1.4s' }}>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:border-accent/50 hover:bg-accent/10 transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-fade-up" style={{ animationDelay: '1.6s' }}>
            <span className="text-sm font-medium">Scroll to explore</span>
            <button
              onClick={() => scrollToElement('projects')}
              className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center hover:border-accent/50 transition-colors duration-200 animate-float"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-primary-gold/10 to-primary-gold-muted/5 blur-xl animate-float" />
        <div className="absolute bottom-1/4 right-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-primary-gold-muted/10 to-primary-gold/5 blur-xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
    </section>
  );
} 