'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container-responsive">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-responsive-2xl lg:text-5xl font-serif font-bold mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-responsive-base lg:text-xl text-muted-foreground mb-8">
            Ready to bring your ideas to life? Let's start a conversation.
          </p>
          <Button variant="gold" size="lg">
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
} 