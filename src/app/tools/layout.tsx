'use client';

import { Navigation } from '@/components/layout/navigation';
import { SimpleSidebar } from '@/components/ui/simple-sidebar';
import { CommandPalette } from '@/components/ui/command-palette';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Command Palette */}
      <CommandPalette />
      
      {/* AI Tools Sidebar Navigation */}
      <SimpleSidebar />
      
      {/* Main Content */}
      <main className="relative pt-16">
        {children}
      </main>
      
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-gold opacity-5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-gold-muted opacity-3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
}