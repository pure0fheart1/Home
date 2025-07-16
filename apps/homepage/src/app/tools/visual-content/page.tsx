'use client';

import React from 'react';
import Link from 'next/link';
import { Palette, Image, Layout, Type, Square, FileImage, Presentation, Smartphone, Share2 } from 'lucide-react';

const visualContentTools = [
  {
    id: 'ai-banner-designer',
    title: 'AI Banner Designer',
    description: 'Create professional banners and promotional graphics',
    icon: Layout,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    description: 'Create custom images from text prompts',
    icon: Image,
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    id: 'ai-infographic-creator',
    title: 'AI Infographic Creator',
    description: 'Generate informative and engaging infographics',
    icon: FileImage,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    id: 'ai-logo-designer',
    title: 'AI Logo Designer',
    description: 'Create professional logos and brand identities',
    icon: Type,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  },
  {
    id: 'ai-presentation-designer',
    title: 'AI Presentation Designer',
    description: 'Design compelling presentations and slides',
    icon: Presentation,
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    id: 'ai-product-mockup-creator',
    title: 'AI Product Mockup Creator',
    description: 'Create realistic product mockups and prototypes',
    icon: Smartphone,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    id: 'ai-social-media-graphics',
    title: 'AI Social Media Graphics',
    description: 'Generate graphics optimized for social media platforms',
    icon: Share2,
    color: 'bg-pink-50 text-pink-600 border-pink-200',
  },
  {
    id: 'ai-thumbnail-creator',
    title: 'AI Thumbnail Creator',
    description: 'Create eye-catching thumbnails for videos and content',
    icon: Square,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
  },
];

export default function VisualContentToolsPage() {
  return (
    <div className="container-responsive py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
          Visual Content & <span className="text-gradient">Design</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          AI-powered image generation, editing, and design tools to create stunning 
          visual content for your projects and marketing materials.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visualContentTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/tools/visual-content/${tool.id}`}
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