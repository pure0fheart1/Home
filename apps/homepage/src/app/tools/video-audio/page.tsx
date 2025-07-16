'use client';

import React from 'react';
import Link from 'next/link';
import { Video, Music, Scissors, Volume2, Mic, Play } from 'lucide-react';

const videoAudioTools = [
  {
    id: 'ai-audio-editor',
    title: 'AI Audio Editor',
    description: 'Edit and enhance audio files with AI-powered tools',
    icon: Scissors,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'ai-audio-generator',
    title: 'AI Audio Generator',
    description: 'Generate custom audio content and music',
    icon: Music,
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    id: 'ai-subtitle-generator',
    title: 'AI Subtitle Generator',
    description: 'Automatically generate subtitles and captions for videos',
    icon: Volume2,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    id: 'ai-video-editor',
    title: 'AI Video Editor',
    description: 'Edit and enhance videos with AI assistance',
    icon: Video,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  },
  {
    id: 'ai-video-generator',
    title: 'AI Video Generator',
    description: 'Create videos from text prompts and scripts',
    icon: Play,
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    id: 'ai-voice-synthesizer',
    title: 'AI Voice Synthesizer',
    description: 'Generate natural-sounding speech from text',
    icon: Mic,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
];

export default function VideoAudioToolsPage() {
  return (
    <div className="container-responsive py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
          Video & Audio <span className="text-gradient">Creation</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          AI-powered video generation, editing, and audio tools to create 
          professional multimedia content for your projects.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoAudioTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/tools/video-audio/${tool.id}`}
              className="group p-6 bg-white dark:bg-black border-2 border-border rounded-lg hover:border-accent transition-all duration-300 hover:shadow-gold"
            >
              <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {tool.description}
              </p>
              <span className="text-xs text-accent font-medium group-hover:text-accent transition-colors">
                Try Tool →
              </span>
            </Link>
          );
        })}
      </div>

      {/* Back to All Tools */}
      <div className="text-center mt-12">
        <Link
          href="/tools"
          className="inline-flex items-center text-accent hover:text-accent/80 transition-colors"
        >
          ← Back to All Tools
        </Link>
      </div>
    </div>
  );
} 