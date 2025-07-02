'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn, scrollToElement } from '@/lib/utils';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search,
  Home,
  User,
  Briefcase,
  Mail,
  FileText
} from 'lucide-react';

const navigationItems = [
  { id: 'home', label: 'Home', href: '#hero', icon: Home },
  { id: 'about', label: 'About', href: '#about', icon: User },
  { id: 'projects', label: 'Projects', href: '#projects', icon: Briefcase },
  { id: 'blog', label: 'Blog', href: '/blog', icon: FileText, external: true },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navigationItems.filter(item => !item.external);
      for (const section of sections) {
        const element = document.getElementById(section.href.substring(1));
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation clicks
  const handleNavClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank');
    } else {
      scrollToElement(href.substring(1));
    }
    setIsMobileMenuOpen(false);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-elegant'
            : 'bg-transparent'
        )}
      >
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('#hero')}
                className="text-2xl font-serif font-bold text-gradient hover:scale-105 transition-transform duration-200"
              >
                YN
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href, item.external)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                      'hover:bg-muted hover:text-foreground',
                      isActive && 'bg-accent/10 text-accent'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="sm"
                className="w-10 h-10 p-0"
                onClick={() => {
                  // Command palette trigger will be implemented
                  const event = new KeyboardEvent('keydown', {
                    key: 'k',
                    metaKey: true,
                  });
                  document.dispatchEvent(event);
                }}
              >
                <Search className="w-4 h-4" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Theme Toggle */}
              <Button 
                variant="ghost" 
                size="sm"
                className="w-10 h-10 p-0"
                onClick={toggleTheme}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* CTA Button */}
              <Button variant="gold" size="sm">
                Let's Work Together
              </Button>
              
              {/* Sidebar Hint */}
              <div className="hidden xl:block text-xs text-muted-foreground">
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">ALT+S+D</kbd>
                <span className="ml-1">Projects</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="w-10 h-10 p-0"
                onClick={toggleTheme}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-elegant">
            <div className="container-responsive py-6">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.href, item.external)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200',
                        'hover:bg-muted hover:text-foreground',
                        isActive && 'bg-accent/10 text-accent'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
                
                <div className="pt-4 border-t border-border space-y-3">
                  <Button variant="gold" fullWidth>
                    Let's Work Together
                  </Button>
                  
                  <div className="text-center text-xs text-muted-foreground">
                    <kbd className="px-1 py-0.5 bg-muted rounded text-xs">ALT+S+D</kbd>
                    <span className="ml-1">for Project Navigator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 