'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Folder, Code, Globe, Settings, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// GitHub projects data
const projectCategories = [
  {
    id: 'creative-apps',
    title: 'Creative Applications',
    projects: [
      {
        id: 'ai-creative-studio',
        title: 'AI Creative Studio',
        description: 'Advanced AI-powered creative suite for content generation and design',
        url: 'https://gemini-creative-suite-18506056916.us-west1.run.app/',
        type: 'web-app',
        tags: ['AI', 'Creative', 'Design'],
        language: 'Web App',
        stars: 5,
      },
      {
        id: 'gif-magic-studio',
        title: 'GIF Magic Studio',
        description: 'Professional GIF creation and animation studio with advanced features',
        url: 'https://copy-of-magical-gif-maker-18506056916.us-west1.run.app/',
        type: 'web-app',
        tags: ['GIF', 'Animation', 'Media'],
        language: 'Web App',
        stars: 4,
      },
    ],
  },
  {
    id: 'productivity-tools',
    title: 'Productivity Tools',
    projects: [
      {
        id: 'taskmaster-pro',
        title: 'TaskMaster Pro',
        description: 'Intelligent checklist and task management system with smart features',
        url: 'https://smartchecklist-18506056916.us-west1.run.app/',
        type: 'web-app',
        tags: ['Tasks', 'Productivity', 'Smart'],
        language: 'Web App',
        stars: 5,
      },
      {
        id: 'flashcard-academy',
        title: 'FlashCard Academy',
        description: 'Advanced flashcard creation and study platform for enhanced learning',
        url: 'https://flashcard-maker-18506056916.us-west1.run.app/',
        type: 'web-app',
        tags: ['Learning', 'Education', 'Study'],
        language: 'Web App',
        stars: 4,
      },
      {
        id: 'bottlerun-pro',
        title: 'BottleRun Pro',
        description: 'Professional bottle management and tracking application',
        url: 'https://bottlerunapp-18506056916.us-west1.run.app/',
        type: 'web-app',
        tags: ['Management', 'Tracking', 'Professional'],
        language: 'Web App',
        stars: 4,
      },
    ],
  },
  {
    id: 'development-tools',
    title: 'Development Suite',
    projects: [
      {
        id: 'code-studio-pro',
        title: 'Code Studio Pro',
        description: 'Advanced integrated development environment with modern tooling',
        url: 'https://idx-studio-3439720303-18506056916.australia-southeast1.run.app/',
        type: 'web-app',
        tags: ['IDE', 'Development', 'Coding'],
        language: 'Web App',
        stars: 5,
      },
      {
        id: 'dev-environment-pro',
        title: 'Dev Environment Pro',
        description: 'Professional development environment with European cloud infrastructure',
        url: 'https://idx-studio-6994149270-18506056916.europe-west1.run.app/',
        type: 'web-app',
        tags: ['IDE', 'Cloud', 'Europe'],
        language: 'Web App',
        stars: 5,
      },
    ],
  },
];

interface SidebarNavigationProps {
  className?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  liveUrl?: string;
  type: string;
  tags: string[];
  language: string;
  stars: number;
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle ALT+S+D keyboard shortcut
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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleProjectClick = (project: Project) => {
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'profile': return Github;
      case 'portfolio': return Globe;
      case 'tool': return Settings;
      case 'web-app': return Globe;
      case 'documentation': return Folder;
      default: return Code;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            className={cn(
              'fixed left-0 top-0 h-full w-96 bg-background border-r border-border shadow-2xl z-50 flex flex-col',
              className
            )}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
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
                className="w-10 h-10 p-0 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-6 border-b border-border">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              />
            </div>

            {/* Categories and Projects */}
            <div className="flex-1 overflow-y-auto">
              {projectCategories.map((category) => (
                <div key={category.id} className="p-6 border-b border-border/50">
                  <h3 className="font-semibold text-foreground mb-4">
                    {category.title}
                  </h3>
                  
                  <div className="space-y-3">
                    {category.projects.map((project) => {
                      const Icon = getProjectIcon(project.type);
                      
                      return (
                        <div
                          key={project.id}
                          className="group cursor-pointer"
                          onClick={() => handleProjectClick(project)}
                        >
                          <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-accent/20">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-accent" />
                                <div>
                                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                                    {project.title}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-muted-foreground">
                                      {project.language}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 text-primary-gold fill-current" />
                                      <span className="text-xs text-muted-foreground">
                                        {project.stars}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="px-2 py-1 text-xs text-muted-foreground">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">
                  Total Projects: {projectCategories.reduce((sum, cat) => sum + cat.projects.length, 0)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">ESC</kbd> to close
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 