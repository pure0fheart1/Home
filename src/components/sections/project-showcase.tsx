'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

// Mock project data
const projects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern, scalable e-commerce solution built with Next.js and Stripe.',
    image: '/placeholder-project-1.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true,
  },
  {
    id: '2',
    title: 'AI-Powered Dashboard',
    description: 'An intelligent analytics dashboard with machine learning insights.',
    image: '/placeholder-project-2.jpg',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true,
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking application with biometric auth.',
    image: '/placeholder-project-3.jpg',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT', 'Plaid API'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/username/project',
    featured: false,
  },
];

export function ProjectShowcase() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container-responsive">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-responsive-2xl lg:text-5xl font-serif font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-responsive-base lg:text-xl text-muted-foreground leading-relaxed">
            A showcase of my recent work, spanning full-stack development, 
            mobile applications, and innovative digital solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Card key={project.id} variant="elevated" interactive className="h-full">
              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary-gold/20 to-primary-gold-muted/10 rounded-t-lg mb-6 flex items-center justify-center">
                <span className="text-muted-foreground font-medium">
                  {project.title}
                </span>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription>
                      {project.description}
                    </CardDescription>
                  </div>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full whitespace-nowrap">
                      Featured
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 text-xs font-medium text-muted-foreground">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="gold" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
} 