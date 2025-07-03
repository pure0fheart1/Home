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

          {/* AI Tools Section */}
          <section id="ai-tools" className="relative py-20">
            <div className="container-responsive">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
                  AI Tools <span className="text-gradient">Collection</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  Discover 100 powerful AI tools designed to enhance productivity, creativity, and innovation. 
                  Each tool is crafted with cutting-edge technology and intuitive design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/tools"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                  >
                    Explore All Tools
                  </a>
                  <a
                    href="/tools/conversational/ai-chatbot-builder"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-lg font-medium hover:bg-muted/50 transition-colors"
                  >
                    Try AI Chatbot Builder
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="p-6 bg-white dark:bg-black border border-border rounded-lg hover:border-accent transition-colors">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Conversational AI</h3>
                  <p className="text-sm text-muted-foreground">Build chatbots, virtual assistants, and customer service agents</p>
                </div>
                
                <div className="p-6 bg-white dark:bg-black border border-border rounded-lg hover:border-accent transition-colors">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Content Creation</h3>
                  <p className="text-sm text-muted-foreground">Generate blogs, social media content, and marketing copy</p>
                </div>
                
                <div className="p-6 bg-white dark:bg-black border border-border rounded-lg hover:border-accent transition-colors">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Visual Design</h3>
                  <p className="text-sm text-muted-foreground">Create images, logos, and visual content with AI</p>
                </div>
              </div>
            </div>
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