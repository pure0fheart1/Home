'use client';

import * as React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/lib/utils';

const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
];

const footerNavigation = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Portfolio', href: '#projects' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Resources', href: '/resources' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
      { label: 'Twitter', href: 'https://twitter.com/yourusername' },
      { label: 'GitHub', href: 'https://github.com/yourusername' },
      { label: 'Email', href: 'mailto:your@email.com' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      scrollToElement(href.substring(1));
    } else if (href.startsWith('http') || href.startsWith('mailto')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal routes
      window.location.href = href;
    }
  };

  return (
    <footer className="relative bg-muted/30 border-t border-border">
      <div className="container-responsive py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold text-gradient mb-4">
                Your Name
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Crafting digital experiences with passion, precision, and purpose.
                Let's build something amazing together.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.label}
                    onClick={() => handleNavClick(social.href)}
                    className="w-10 h-10 rounded-lg bg-background border border-border hover:border-accent/50 hover:bg-accent/10 flex items-center justify-center transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 group-hover:text-accent transition-colors duration-200" />
                    <span className="sr-only">{social.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerNavigation.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-muted-foreground hover:text-accent transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="font-semibold text-foreground mb-2">
              Stay Updated
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get notified about new projects, blog posts, and updates.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-colors duration-200"
              />
              <Button variant="gold" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© {currentYear} Your Name. Made with</span>
            <Heart className="w-4 h-4 text-accent fill-current" />
            <span>and lots of coffee.</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button
              onClick={() => handleNavClick('/privacy')}
              className="hover:text-accent transition-colors duration-200"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavClick('/terms')}
              className="hover:text-accent transition-colors duration-200"
            >
              Terms of Service
            </button>
            <button
              onClick={() => scrollToElement('hero')}
              className="flex items-center gap-1 hover:text-accent transition-colors duration-200 group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-gradient-to-t from-primary-gold/5 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-gradient-to-t from-primary-gold-muted/5 to-transparent rounded-full blur-xl" />
      </div>
    </footer>
  );
} 