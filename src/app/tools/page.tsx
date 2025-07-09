'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, Bot, Palette, FileText, BarChart3, Users, GraduationCap, Zap } from 'lucide-react';

const toolCategories = [
  {
    id: 'conversational',
    title: 'Conversational AI & Customer Service',
    description: 'Chat bots, assistants, and customer support tools',
    icon: Bot,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    tools: 5,
  },
  {
    id: 'content-creation',
    title: 'Content Creation & Writing',
    description: 'AI-powered writing and content generation tools',
    icon: FileText,
    color: 'bg-green-50 text-green-600 border-green-200',
    tools: 7,
  },
  {
    id: 'visual-content',
    title: 'Visual Content & Design',
    description: 'Image generation, editing, and design tools',
    icon: Palette,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    tools: 8,
  },
  {
    id: 'video-audio',
    title: 'Video & Audio Creation',
    description: 'Video generation, editing, and audio tools',
    icon: Users,
    color: 'bg-red-50 text-red-600 border-red-200',
    tools: 6,
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis & Business Intelligence',
    description: 'Data insights and business analytics tools',
    icon: BarChart3,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    tools: 6,
  },
  {
    id: 'productivity',
    title: 'Productivity & Workflow',
    description: 'Task automation and productivity enhancement',
    icon: Zap,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    tools: 6,
  },
  {
    id: 'education',
    title: 'Education & Learning',
    description: 'Learning assistance and educational tools',
    icon: GraduationCap,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    tools: 5,
  },
  {
    id: 'specialized',
    title: 'Specialized & Emerging AI',
    description: 'Cutting-edge and niche AI applications',
    icon: Brain,
    color: 'bg-pink-50 text-pink-600 border-pink-200',
    tools: 57,
  },
];

export default function ToolsPage() {
  return (
    <div className="container-responsive py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
          AI Tools <span className="text-gradient">Collection</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover 100 powerful AI tools designed to enhance productivity, creativity, and innovation. 
          Each tool is crafted with cutting-edge technology and intuitive design.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {toolCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              href={`/tools/${category.id}`}
              className="group p-6 bg-white dark:bg-black border-2 border-border rounded-lg hover:border-accent transition-all duration-300 hover:shadow-gold"
            >
              <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-accent font-medium">
                  {category.tools} tools
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Featured Tools */}
      <div className="bg-muted/30 rounded-lg p-8 border border-border">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
          Featured Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/tools/conversational/ai-chatbot-builder"
            className="p-4 bg-background rounded-lg border border-border hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-2">AI Chatbot Builder</h3>
            <p className="text-sm text-muted-foreground">Create custom chatbots for websites and messaging platforms</p>
          </Link>
          <Link
            href="/tools/content-creation/ai-blog-writer"
            className="p-4 bg-background rounded-lg border border-border hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-2">AI Blog Writer</h3>
            <p className="text-sm text-muted-foreground">Generate SEO-optimized blog posts and articles</p>
          </Link>
          <Link
            href="/tools/visual-content/ai-image-generator"
            className="p-4 bg-background rounded-lg border border-border hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-2">AI Image Generator</h3>
            <p className="text-sm text-muted-foreground">Create custom images from text prompts</p>
          </Link>
        </div>
      </div>
    </div>
  );
}