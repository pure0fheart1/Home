'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Image, 
  Download, 
  Volume2, 
  Play, 
  FileAudio,
  Home,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tools = [
  {
    name: 'Audio Recorder',
    href: '/tools/audio-recorder',
    icon: Mic,
    description: 'Record and manage audio files'
  },
  {
    name: 'Image Gallery',
    href: '/tools/image-gallery',
    icon: Image,
    description: 'Create and manage image galleries'
  },
  {
    name: 'Media Downloader',
    href: '/tools/media-downloader',
    icon: Download,
    description: 'Download media from various sources'
  },
  {
    name: 'Text to Audio',
    href: '/tools/text-to-audio',
    icon: Volume2,
    description: 'Convert text to speech using AI'
  },
  {
    name: 'Video Player',
    href: '/tools/video-player',
    icon: Play,
    description: 'Advanced video player with features'
  },
  {
    name: 'Voice Transcriber',
    href: '/tools/voice-transcriber',
    icon: FileAudio,
    description: 'Transcribe voice to text using AI'
  }
];

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <Home className="h-4 w-4" />
                <span className="text-sm">Home</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-serif font-bold text-gradient">
                Developer Tools
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Available Tools</h2>
              <nav className="space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = pathname === tool.href;
                  
                  return (
                    <Link key={tool.href} href={tool.href}>
                      <div className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                        isActive 
                          ? "bg-accent/20 text-accent border border-accent/30" 
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}>
                        <Icon className="h-5 w-5" />
                        <div>
                          <div className="font-medium text-sm">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">Quick Stats</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Total Tools: {tools.length}</div>
                <div>AI-Powered: 2</div>
                <div>Status: All Online</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}