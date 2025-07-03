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
    title: 'Creative Applications',
    projects: [
      {
        id: 'ai-creative-studio',
        title: 'AI Creative Studio',
        description: 'Advanced AI-powered creative suite for content generation and design',
        url: 'https://gemini-creative-suite-18506056916.us-west1.run.app/',
        type: 'project',
      },
      {
        id: 'gif-magic-studio',
        title: 'GIF Magic Studio',
        description: 'Professional GIF creation and animation studio with advanced features',
        url: 'https://copy-of-magical-gif-maker-18506056916.us-west1.run.app/',
        type: 'project',
      },
    ],
  },
  {
    title: 'Productivity Tools',
    projects: [
      {
        id: 'taskmaster-pro',
        title: 'TaskMaster Pro',
        description: 'Intelligent checklist and task management system with smart features',
        url: 'https://smartchecklist-18506056916.us-west1.run.app/',
        type: 'project',
      },
      {
        id: 'flashcard-academy',
        title: 'FlashCard Academy',
        description: 'Advanced flashcard creation and study platform for enhanced learning',
        url: 'https://flashcard-maker-18506056916.us-west1.run.app/',
        type: 'project',
      },
      {
        id: 'bottlerun-pro',
        title: 'BottleRun Pro',
        description: 'Professional bottle management and tracking application',
        url: 'https://bottlerunapp-18506056916.us-west1.run.app/',
        type: 'project',
      },
    ],
  },
  {
    title: 'Development Suite',
    projects: [
      {
        id: 'code-studio-pro',
        title: 'Code Studio Pro',
        description: 'Advanced integrated development environment with modern tooling',
        url: 'https://idx-studio-3439720303-18506056916.australia-southeast1.run.app/',
        type: 'project',
      },
      {
        id: 'dev-environment-pro',
        title: 'Dev Environment Pro',
        description: 'Professional development environment with European cloud infrastructure',
        url: 'https://idx-studio-6994149270-18506056916.europe-west1.run.app/',
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