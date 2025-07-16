'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Calendar, Mail, Users, FolderOpen, CheckSquare } from 'lucide-react';

const productivityTools = [
  {
    id: 'ai-calendar-scheduler',
    title: 'AI Calendar Scheduler',
    description: 'Intelligent scheduling and calendar management',
    icon: Calendar,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'ai-document-organizer',
    title: 'AI Document Organizer',
    description: 'Organize and manage documents with AI assistance',
    icon: FolderOpen,
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    id: 'ai-email-assistant',
    title: 'AI Email Assistant',
    description: 'Automate and enhance email management',
    icon: Mail,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    id: 'ai-meeting-assistant',
    title: 'AI Meeting Assistant',
    description: 'Enhance meetings with AI-powered assistance',
    icon: Users,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  },
  {
    id: 'ai-project-planner',
    title: 'AI Project Planner',
    description: 'Plan and manage projects with AI insights',
    icon: Zap,
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    id: 'ai-task-manager',
    title: 'AI Task Manager',
    description: 'Intelligent task management and prioritization',
    icon: CheckSquare,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
];

export default function ProductivityToolsPage() {
  return (
    <div className="container-responsive py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
          Productivity & <span className="text-gradient">Workflow</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          AI-powered task automation and productivity enhancement tools to streamline 
          your workflow and boost efficiency.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productivityTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/tools/productivity/${tool.id}`}
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