'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Brain, Clock, Target } from 'lucide-react';

const educationTools = [
  {
    id: 'ai-learning-assistant',
    title: 'AI Learning Assistant',
    description: 'Personalized tutoring and adaptive learning guidance powered by AI',
    icon: Brain,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'ai-study-planner',
    title: 'AI Study Planner',
    description: 'Personalized study schedules and learning optimization powered by AI',
    icon: Clock,
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    id: 'ai-course-creator',
    title: 'AI Course Creator',
    description: 'Comprehensive course design and curriculum planning powered by AI',
    icon: BookOpen,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    id: 'ai-flashcard-generator',
    title: 'AI Flashcard Generator',
    description: 'Create intelligent flashcards with spaced repetition and adaptive learning',
    icon: Target,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  },
  {
    id: 'ai-quiz-generator',
    title: 'AI Quiz Generator',
    description: 'Create customized quizzes and assessments with AI-powered question generation',
    icon: GraduationCap,
    color: 'bg-red-50 text-red-600 border-red-200',
  },
];

export default function EducationToolsPage() {
  return (
    <div className="container-responsive py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
          Education & <span className="text-gradient">Learning</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          AI-powered tools designed to enhance learning experiences, create educational content, 
          and optimize study strategies for students and educators.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/tools/education/${tool.id}`}
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