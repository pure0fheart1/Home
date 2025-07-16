'use client';

import React from 'react';
import { Brain, Code, Search, Languages, Scale, DollarSign, Heart, BookOpen, Shield, Monitor, Zap } from 'lucide-react';

const specializedCategories = [
  {
    icon: Code,
    title: 'Development & Technical',
    description: 'Code generation, API development, and system optimization',
    tools: ['AI Code Assistant', 'AI API Generator', 'AI Performance Monitor', 'AI Security Analyzer'],
    color: 'bg-blue-50 border-blue-200 text-blue-600'
  },
  {
    icon: Search,
    title: 'Marketing & SEO',
    description: 'Search optimization and digital marketing tools',
    tools: ['AI SEO Optimizer', 'AI Competitor Analyzer', 'AI Content Optimizer'],
    color: 'bg-green-50 border-green-200 text-green-600'
  },
  {
    icon: Languages,
    title: 'Language & Communication',
    description: 'Translation and multilingual communication tools',
    tools: ['AI Translation Tool', 'AI Localization Assistant', 'AI Communication Optimizer'],
    color: 'bg-purple-50 border-purple-200 text-purple-600'
  },
  {
    icon: Scale,
    title: 'Legal & Compliance',
    description: 'Legal analysis and regulatory compliance tools',
    tools: ['AI Legal Assistant', 'AI Contract Analyzer', 'AI Compliance Checker'],
    color: 'bg-red-50 border-red-200 text-red-600'
  },
  {
    icon: DollarSign,
    title: 'Finance & Investment',
    description: 'Financial planning and investment analysis tools',
    tools: ['AI Financial Advisor', 'AI Investment Analyzer', 'AI Risk Assessment'],
    color: 'bg-yellow-50 border-yellow-200 text-yellow-600'
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Health monitoring and wellness optimization tools',
    tools: ['AI Health Assistant', 'AI Fitness Planner', 'AI Nutrition Optimizer'],
    color: 'bg-pink-50 border-pink-200 text-pink-600'
  },
  {
    icon: BookOpen,
    title: 'Research & Academia',
    description: 'Academic research and scientific analysis tools',
    tools: ['AI Research Assistant', 'AI Literature Review', 'AI Citation Generator'],
    color: 'bg-indigo-50 border-indigo-200 text-indigo-600'
  },
  {
    icon: Shield,
    title: 'Security & Privacy',
    description: 'Cybersecurity and data protection tools',
    tools: ['AI Security Analyzer', 'AI Privacy Auditor', 'AI Threat Detection'],
    color: 'bg-gray-50 border-gray-200 text-gray-600'
  }
];

export default function SpecializedToolsPage() {
  return (
    <div>
      {/* Introduction */}
      <div className="bg-muted/30 rounded-lg p-8 border border-border mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Brain className="h-12 w-12 text-pink-600" />
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Specialized AI Tools
            </h2>
            <p className="text-muted-foreground">
              Advanced AI solutions for specific industries and use cases
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Our specialized AI tools are designed for specific industries, professions, and advanced use cases. 
          These tools leverage cutting-edge AI technology to solve complex problems in fields like software development, 
          legal analysis, financial planning, healthcare, and more. Each tool is crafted with domain expertise and 
          professional-grade functionality.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {specializedCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div
              key={index}
              className="p-6 bg-background rounded-lg border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg border ${category.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                {category.tools.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Tools */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
          Most Popular Specialized Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-background rounded-lg border border-border hover:border-accent transition-all duration-300">
            <Code className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-foreground mb-2">AI Code Assistant</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate, review, and optimize code with intelligent AI assistance
            </p>
            <div className="text-xs text-muted-foreground">
              Most popular for software developers
            </div>
          </div>
          
          <div className="p-6 bg-background rounded-lg border border-border hover:border-accent transition-all duration-300">
            <Search className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-foreground mb-2">AI SEO Optimizer</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced SEO analysis and optimization recommendations
            </p>
            <div className="text-xs text-muted-foreground">
              Essential for digital marketers
            </div>
          </div>
          
          <div className="p-6 bg-background rounded-lg border border-border hover:border-accent transition-all duration-300">
            <DollarSign className="h-8 w-8 text-yellow-600 mb-4" />
            <h3 className="font-semibold text-foreground mb-2">AI Financial Advisor</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Personalized financial planning and investment strategies
            </p>
            <div className="text-xs text-muted-foreground">
              Trusted by financial professionals
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 