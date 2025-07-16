'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, MessageCircle, Headphones, HelpCircle, User } from 'lucide-react';

const conversationalTools = [
  {
    id: 'ai-chatbot-builder',
    title: 'AI Chatbot Builder',
    description: 'Create custom chatbots for websites and messaging platforms',
    icon: Bot,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'ai-customer-support',
    title: 'AI Customer Support',
    description: 'Automated customer service and support solutions',
    icon: HelpCircle,
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    id: 'ai-faq-generator',
    title: 'AI FAQ Generator',
    description: 'Generate comprehensive FAQ sections and knowledge bases',
    icon: MessageCircle,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    id: 'ai-virtual-assistant',
    title: 'AI Virtual Assistant',
    description: 'Create intelligent virtual assistants for various tasks',
    icon: User,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  },
  {
    id: 'ai-voice-assistant',
    title: 'AI Voice Assistant',
    description: 'Build voice-enabled AI assistants and applications',
    icon: Headphones,
    color: 'bg-red-50 text-red-600 border-red-200',
  },
];

export default function ConversationalToolsPage() {
  return (
    <div className="container-responsive py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
          Conversational <span className="text-gradient">AI & Customer Service</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          AI-powered conversational tools and customer service solutions to enhance 
          user engagement and automate support interactions.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conversationalTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/tools/conversational/${tool.id}`}
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