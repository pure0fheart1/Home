'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Image, 
  Download, 
  Volume2, 
  Play, 
  FileAudio,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

const tools = [
  {
    name: 'Audio Recorder',
    href: '/tools/audio-recorder',
    icon: Mic,
    description: 'Record high-quality audio with advanced controls and effects',
    features: ['Real-time waveform', 'Multiple formats', 'Noise reduction'],
    aiPowered: false
  },
  {
    name: 'Image Gallery',
    href: '/tools/image-gallery',
    icon: Image,
    description: 'Create beautiful image galleries with smart organization',
    features: ['Drag & drop upload', 'Auto-categorization', 'Bulk operations'],
    aiPowered: false
  },
  {
    name: 'Media Downloader',
    href: '/tools/media-downloader',
    icon: Download,
    description: 'Download media from YouTube, Twitter, Instagram and more',
    features: ['Multiple platforms', 'Quality selection', 'Batch download'],
    aiPowered: false
  },
  {
    name: 'Text to Audio',
    href: '/tools/text-to-audio',
    icon: Volume2,
    description: 'Convert text to natural-sounding speech using AI',
    features: ['Natural voices', 'Multiple languages', 'SSML support'],
    aiPowered: true
  },
  {
    name: 'Video Player',
    href: '/tools/video-player',
    icon: Play,
    description: 'Advanced video player with subtitle support and controls',
    features: ['Subtitle support', 'Playback speed', 'Chapter markers'],
    aiPowered: false
  },
  {
    name: 'Voice Transcriber',
    href: '/tools/voice-transcriber',
    icon: FileAudio,
    description: 'Transcribe audio to text with high accuracy using AI',
    features: ['Real-time transcription', 'Multiple languages', 'Speaker detection'],
    aiPowered: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-gradient">
          Developer Tools Suite
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive collection of tools to enhance your productivity. 
          From media processing to AI-powered transcription and text-to-speech.
        </p>
      </div>

      {/* Tools Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6"
      >
        {tools.map((tool) => {
          const Icon = tool.icon;
          
          return (
            <motion.div
              key={tool.href}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={tool.href}>
                <div className="group p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {tool.name}
                        </h3>
                        {tool.aiPowered && (
                          <div className="flex items-center gap-1 mt-1">
                            <Sparkles className="h-3 w-3 text-primary-gold" />
                            <span className="text-xs text-primary-gold font-medium">AI-Powered</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" />
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-accent" />
                      <span className="text-xs font-medium text-foreground">Key Features</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Info */}
      <div className="text-center pt-8 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary-gold" />
          <span>AI-powered tools use Google Gemini API for enhanced functionality</span>
        </div>
      </div>
    </div>
  );
}