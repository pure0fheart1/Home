'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, PenTool, Mail, Share2, Calendar, Search, Edit3 } from 'lucide-react';

const contentCreationTools = [
  {
    id: 'ai-blog-writer',
    title: 'AI Blog Writer',
    description: 'Generate SEO-optimized blog posts and articles',
    icon: FileText,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'ai-content-planner',
    title: 'AI Content Planner',
    description: 'Plan and strategize content creation with AI assistance',
    icon: Calendar,
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    id: 'ai-copywriter',
    title: 'AI Copywriter',
    description: 'Create compelling marketing copy and advertisements',
    icon: PenTool,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    id: 'ai-email-marketing',
    title: 'AI Email Marketing',
    description: 'Generate engaging email campaigns and newsletters',
    icon: Mail,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  },
  {
    id: 'ai-press-release',
    title: 'AI Press Release',
    description: 'Create professional press releases and announcements',
    icon: Edit3,
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    id: 'ai-seo-writer',
    title: 'AI SEO Writer',
    description: 'Generate SEO-optimized content for better search rankings',
    icon: Search,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    id: 'ai-social-media-manager',
    title: 'AI Social Media Manager',
    description: 'Create and manage social media content and campaigns',
    icon: Share2,
    color: 'bg-pink-50 text-pink-600 border-pink-200',
  },
];

export default function ContentCreationToolsPage() {
  return (
    <div className="container-responsive py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
          Content Creation & <span className="text-gradient">Writing</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          AI-powered writing and content generation tools to create engaging, 
          SEO-optimized content for blogs, marketing, and social media.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentCreationTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/tools/content-creation/${tool.id}`}
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