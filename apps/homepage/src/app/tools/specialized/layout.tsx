'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, ArrowLeft } from 'lucide-react';

const specializedTools = [
  {
    id: 'ai-code-assistant',
    title: 'AI Code Assistant',
    description: 'Intelligent code generation, review, and optimization',
    href: '/tools/specialized/ai-code-assistant',
  },
  {
    id: 'ai-seo-optimizer',
    title: 'AI SEO Optimizer',
    description: 'Advanced SEO analysis and optimization recommendations',
    href: '/tools/specialized/ai-seo-optimizer',
  },
  {
    id: 'ai-translation-tool',
    title: 'AI Translation Tool',
    description: 'Professional-grade translation with context awareness',
    href: '/tools/specialized/ai-translation-tool',
  },
  {
    id: 'ai-legal-assistant',
    title: 'AI Legal Assistant',
    description: 'Legal document analysis and compliance checking',
    href: '/tools/specialized/ai-legal-assistant',
  },
  {
    id: 'ai-financial-advisor',
    title: 'AI Financial Advisor',
    description: 'Personalized financial planning and investment advice',
    href: '/tools/specialized/ai-financial-advisor',
  },
  {
    id: 'ai-health-assistant',
    title: 'AI Health Assistant',
    description: 'Health monitoring and wellness recommendations',
    href: '/tools/specialized/ai-health-assistant',
  },
  {
    id: 'ai-research-assistant',
    title: 'AI Research Assistant',
    description: 'Academic research support and literature analysis',
    href: '/tools/specialized/ai-research-assistant',
  },
  {
    id: 'ai-security-analyzer',
    title: 'AI Security Analyzer',
    description: 'Cybersecurity threat detection and vulnerability assessment',
    href: '/tools/specialized/ai-security-analyzer',
  },
  {
    id: 'ai-performance-monitor',
    title: 'AI Performance Monitor',
    description: 'System performance analysis and optimization',
    href: '/tools/specialized/ai-performance-monitor',
  },
  {
    id: 'ai-api-generator',
    title: 'AI API Generator',
    description: 'Automated API development and documentation',
    href: '/tools/specialized/ai-api-generator',
  },
];

export default function SpecializedToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-responsive py-16">
      {/* Header */}
      <div className="mb-12">
        <Link 
          href="/tools" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Tools
        </Link>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
            <Brain className="h-8 w-8 text-pink-600" />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground">
              Specialized & Emerging AI
            </h1>
            <p className="text-xl text-muted-foreground">
              Cutting-edge and niche AI applications for specialized use cases
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {children}

      {/* Tools Grid */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
          All Specialized AI Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializedTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group p-6 bg-background rounded-lg border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 