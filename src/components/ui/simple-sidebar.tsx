'use client';

import React, { useState, useEffect } from 'react';
import { X, Github, Globe, Code } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'github' | 'project';
}

interface ProjectCategory {
  title: string;
  projects: Project[];
}

// TODO: Add your GitHub repositories here
// Example format:
// {
//   title: 'Category Name',
//   projects: [
//     {
//       id: 'unique-id',
//       title: 'Project Name',
//       description: 'Brief description of the project',
//       url: 'https://github.com/yourusername/repo-name',
//       type: 'github' | 'project',
//     },
//   ],
// }
const projectCategories: ProjectCategory[] = [
  {
    title: 'AI & Machine Learning Projects',
    projects: [
      {
        id: 'accelerate',
        title: 'Accelerate',
        description: 'AI acceleration project',
        url: 'https://github.com/pure0fheart1/Accelerate',
        type: 'project',
      },
      {
        id: 'jjjjj-ai',
        title: 'jjjjj.ai',
        description: 'AI-focused project',
        url: 'https://github.com/pure0fheart1/jjjjj.ai',
        type: 'project',
      },
      {
        id: 'accelerate-dot-ai',
        title: 'AccererlarateDotAI',
        description: 'JavaScript-based AI acceleration platform',
        url: 'https://github.com/pure0fheart1/AccererlarateDotAI',
        type: 'project',
      },
      {
        id: 'acceleratee-ai',
        title: 'Accerleratee.AI',
        description: 'Another AI acceleration project',
        url: 'https://github.com/pure0fheart1/Accerleratee.AI',
        type: 'project',
      },
    ],
  },
  {
    title: 'Web Applications',
    projects: [
      {
        id: 'marito',
        title: 'Marito',
        description: 'JavaScript web application',
        url: 'https://github.com/pure0fheart1/Marito',
        type: 'project',
      },
      {
        id: 'flowhub',
        title: 'Flowhub',
        description: 'Flow-based project management tool',
        url: 'https://github.com/pure0fheart1/Flowhub',
        type: 'project',
      },
      {
        id: 'github-io',
        title: 'github.io',
        description: 'ECD Website - Personal/Organization website',
        url: 'https://github.com/pure0fheart1/github.io',
        type: 'github',
      },
    ],
  },
  {
    title: 'Mobile & Finance',
    projects: [
      {
        id: 'income-tracker',
        title: 'IncomeTracker',
        description: 'Kotlin-based income tracking application',
        url: 'https://github.com/pure0fheart1/IncomeTracker',
        type: 'project',
      },
    ],
  },
];

export function SimpleSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let isAltPressed = false;
    let isSPressed = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) isAltPressed = true;
      if (event.key.toLowerCase() === 's') isSPressed = true;
      if (event.key.toLowerCase() === 'd' && isAltPressed && isSPressed) {
        event.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.altKey) isAltPressed = false;
      if (event.key.toLowerCase() === 's') isSPressed = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-96 bg-background border-r border-border shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-serif font-bold text-gradient">
              Project Navigator
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              ALT+S+D to toggle
            </p>
          </div>
          <button
            className="w-10 h-10 p-0 rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Projects */}
        <div className="flex-1 overflow-y-auto">
          {projectCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="p-6 border-b border-border/50">
              <h3 className="font-semibold text-foreground mb-4">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.projects.length > 0 ? (
                  category.projects.map((project) => (
                    <a
                      key={project.id}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-accent/20"
                    >
                      <div className="flex items-center gap-3">
                        {project.type === 'github' ? (
                          <Github className="w-5 h-5 text-accent" />
                        ) : (
                          <Code className="w-5 h-5 text-accent" />
                        )}
                        <div>
                          <h4 className="font-medium text-foreground">
                            {project.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No projects added yet.</p>
                    <p className="text-xs mt-2">Edit the sidebar component to add your GitHub repositories.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 