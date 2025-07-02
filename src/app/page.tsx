'use client';

import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/hero-section-simple';
import { ProjectShowcase } from '@/components/sections/project-showcase';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { PageTransition } from '@/components/ui/page-transition';
import { CommandPalette } from '@/components/ui/command-palette';
import { SimpleSidebar } from '@/components/ui/simple-sidebar';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-background">
        {/* Navigation */}
        <Navigation />
        
        {/* Command Palette */}
        <CommandPalette />
        
        {/* Hidden Sidebar Navigation */}
        <SimpleSidebar />
        
        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <section id="hero" className="relative">
            <Suspense fallback={<div className="h-screen bg-background" />}>
              <HeroSection />
            </Suspense>
          </section>

          {/* Project Showcase */}
          <section id="projects" className="relative">
            <Suspense fallback={<div className="h-96 bg-background" />}>
              <ProjectShowcase />
            </Suspense>
          </section>

          {/* Skills & Expertise */}
          <section id="skills" className="relative">
            <Suspense fallback={<div className="h-96 bg-background" />}>
              <SkillsSection />
            </Suspense>
          </section>

          {/* Contact */}
          <section id="contact" className="relative">
            <Suspense fallback={<div className="h-96 bg-background" />}>
              <ContactSection />
            </Suspense>
          </section>
        </main>

        {/* Footer */}
        <Footer />
        
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-gold opacity-5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-gold-muted opacity-3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
      </div>
    </PageTransition>
  );
} 