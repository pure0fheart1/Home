'use client';

import React, { useState, useEffect } from 'react';
import { X, Bot, FileText, Palette, Video, BarChart3, Zap, GraduationCap, Search, Brain } from 'lucide-react';
import Link from 'next/link';

interface AITool {
  id: string;
  title: string;
  description: string;
  url: string;
  status: 'ready' | 'coming-soon';
}

interface AIToolCategory {
  title: string;
  icon: any;
  tools: AITool[];
}

const aiToolCategories: AIToolCategory[] = [
  {
    title: 'Conversational AI & Customer Service',
    icon: Bot,
    tools: [
      { id: 'ai-chatbot-builder', title: 'AI Chatbot Builder', description: 'Create custom chatbots for websites and messaging platforms', url: '/tools/conversational/ai-chatbot-builder', status: 'ready' },
      { id: 'customer-service-agent', title: 'Customer Service AI Agent', description: 'Automated customer support with ticket resolution', url: '/tools/conversational/customer-service-agent', status: 'coming-soon' },
      { id: 'live-chat-assistant', title: 'Live Chat AI Assistant', description: 'Real-time customer support with human handoff', url: '/tools/conversational/live-chat-assistant', status: 'coming-soon' },
      { id: 'voice-assistant-creator', title: 'Voice Assistant Creator', description: 'Build custom voice-enabled AI assistants', url: '/tools/conversational/voice-assistant-creator', status: 'coming-soon' },
      { id: 'faq-bot-generator', title: 'FAQ Bot Generator', description: 'Automatically generate chatbots from FAQ content', url: '/tools/conversational/faq-bot-generator', status: 'coming-soon' },
    ]
  },
  {
    title: 'Content Creation & Writing',
    icon: FileText,
    tools: [
      { id: 'ai-blog-writer', title: 'AI Blog Writer', description: 'Generate SEO-optimized blog posts and articles', url: '/tools/content-creation/ai-blog-writer', status: 'ready' },
      { id: 'email-marketing-ai', title: 'Email Marketing AI', description: 'Create compelling email campaigns and newsletters', url: '/tools/content-creation/email-marketing-ai', status: 'coming-soon' },
      { id: 'social-media-generator', title: 'Social Media Content Generator', description: 'Create posts, captions, and hashtags', url: '/tools/content-creation/social-media-generator', status: 'coming-soon' },
      { id: 'ai-copywriter', title: 'AI Copywriter', description: 'Generate marketing copy, ads, and sales content', url: '/tools/content-creation/ai-copywriter', status: 'coming-soon' },
      { id: 'press-release-generator', title: 'Press Release Generator', description: 'Create professional press releases', url: '/tools/content-creation/press-release-generator', status: 'coming-soon' },
      { id: 'product-description-writer', title: 'Product Description Writer', description: 'Generate compelling e-commerce descriptions', url: '/tools/content-creation/product-description-writer', status: 'coming-soon' },
      { id: 'ai-resume-builder', title: 'AI Resume Builder', description: 'Create professional resumes and cover letters', url: '/tools/content-creation/ai-resume-builder', status: 'coming-soon' },
    ]
  },
  {
    title: 'Visual Content & Design',
    icon: Palette,
    tools: [
      { id: 'ai-image-generator', title: 'AI Image Generator', description: 'Create custom images from text prompts', url: '/tools/visual-content/ai-image-generator', status: 'ready' },
      { id: 'logo-design-ai', title: 'Logo Design AI', description: 'Generate professional logos and branding', url: '/tools/visual-content/logo-design-ai', status: 'coming-soon' },
      { id: 'social-graphics-creator', title: 'Social Media Graphics Creator', description: 'Design posts, stories, and banners', url: '/tools/visual-content/social-graphics-creator', status: 'coming-soon' },
      { id: 'ai-photo-editor', title: 'AI Photo Editor', description: 'Enhance, restore, and manipulate images', url: '/tools/visual-content/ai-photo-editor', status: 'coming-soon' },
      { id: 'video-thumbnail-generator', title: 'Video Thumbnail Generator', description: 'Create eye-catching video thumbnails', url: '/tools/visual-content/video-thumbnail-generator', status: 'coming-soon' },
      { id: 'ai-avatar-creator', title: 'AI Avatar Creator', description: 'Generate custom avatars and profile pictures', url: '/tools/visual-content/ai-avatar-creator', status: 'coming-soon' },
      { id: 'background-remover', title: 'Background Remover', description: 'Remove and replace image backgrounds', url: '/tools/visual-content/background-remover', status: 'coming-soon' },
      { id: 'art-style-transfer', title: 'AI Art Style Transfer', description: 'Apply artistic styles to images', url: '/tools/visual-content/art-style-transfer', status: 'coming-soon' },
    ]
  },
  {
    title: 'Video & Audio Creation',
    icon: Video,
    tools: [
      { id: 'ai-video-generator', title: 'AI Video Generator', description: 'Create videos from text or images', url: '/tools/video-audio/ai-video-generator', status: 'coming-soon' },
      { id: 'text-to-speech', title: 'Text-to-Speech Converter', description: 'Generate natural-sounding voiceovers', url: '/tools/video-audio/text-to-speech', status: 'coming-soon' },
      { id: 'ai-video-editor', title: 'AI Video Editor', description: 'Automated video editing with smart cuts', url: '/tools/video-audio/ai-video-editor', status: 'coming-soon' },
      { id: 'podcast-transcriber', title: 'Podcast Transcript Generator', description: 'Convert audio to text automatically', url: '/tools/video-audio/podcast-transcriber', status: 'coming-soon' },
      { id: 'ai-music-generator', title: 'AI Music Generator', description: 'Create original music and soundtracks', url: '/tools/video-audio/ai-music-generator', status: 'coming-soon' },
      { id: 'voice-cloning', title: 'Voice Cloning Tool', description: 'Replicate voices for various applications', url: '/tools/video-audio/voice-cloning', status: 'coming-soon' },
    ]
  },
  {
    title: 'Data Analysis & Business Intelligence',
    icon: BarChart3,
    tools: [
      { id: 'ai-data-analyzer', title: 'AI Data Analyzer', description: 'Extract insights from spreadsheets and databases', url: '/tools/data-analysis/ai-data-analyzer', status: 'coming-soon' },
      { id: 'business-report-generator', title: 'Business Report Generator', description: 'Create automated business reports', url: '/tools/data-analysis/business-report-generator', status: 'coming-soon' },
      { id: 'ai-dashboard-builder', title: 'AI Dashboard Builder', description: 'Visualize data with intelligent dashboards', url: '/tools/data-analysis/ai-dashboard-builder', status: 'coming-soon' },
      { id: 'predictive-analytics', title: 'Predictive Analytics Tool', description: 'Forecast trends and business outcomes', url: '/tools/data-analysis/predictive-analytics', status: 'coming-soon' },
      { id: 'survey-analyzer', title: 'AI Survey Analyzer', description: 'Analyze survey responses and feedback', url: '/tools/data-analysis/survey-analyzer', status: 'coming-soon' },
      { id: 'financial-assistant', title: 'Financial Data Assistant', description: 'Analyze financial data and generate insights', url: '/tools/data-analysis/financial-assistant', status: 'coming-soon' },
    ]
  },
  {
    title: 'Productivity & Workflow',
    icon: Zap,
    tools: [
      { id: 'meeting-assistant', title: 'AI Meeting Assistant', description: 'Transcribe, summarize, and extract action items', url: '/tools/productivity/meeting-assistant', status: 'coming-soon' },
      { id: 'smart-calendar', title: 'Smart Calendar Scheduler', description: 'AI-powered scheduling and time management', url: '/tools/productivity/smart-calendar', status: 'coming-soon' },
      { id: 'email-assistant', title: 'Email AI Assistant', description: 'Smart email composition and management', url: '/tools/productivity/email-assistant', status: 'coming-soon' },
      { id: 'document-summarizer', title: 'Document Summarizer', description: 'Condense long documents into key points', url: '/tools/productivity/document-summarizer', status: 'coming-soon' },
      { id: 'project-manager', title: 'AI Project Manager', description: 'Automated project planning and tracking', url: '/tools/productivity/project-manager', status: 'coming-soon' },
      { id: 'task-automation', title: 'Task Automation Builder', description: 'Create custom automation workflows', url: '/tools/productivity/task-automation', status: 'coming-soon' },
    ]
  },
  {
    title: 'Education & Learning',
    icon: GraduationCap,
    tools: [
      { id: 'ai-tutor', title: 'AI Tutor', description: 'Personalized learning and homework assistance', url: '/tools/education/ai-tutor', status: 'coming-soon' },
      { id: 'language-learning', title: 'Language Learning AI', description: 'Practice conversations and grammar', url: '/tools/education/language-learning', status: 'coming-soon' },
      { id: 'quiz-generator', title: 'AI Quiz Generator', description: 'Create educational quizzes and assessments', url: '/tools/education/quiz-generator', status: 'coming-soon' },
      { id: 'study-guide-creator', title: 'Study Guide Creator', description: 'Generate study materials from content', url: '/tools/education/study-guide-creator', status: 'coming-soon' },
      { id: 'research-assistant', title: 'Research Assistant AI', description: 'Help with academic research and citations', url: '/tools/education/research-assistant', status: 'coming-soon' },
    ]
  },
  {
    title: 'SEO & Marketing',
    icon: Search,
    tools: [
      { id: 'seo-optimizer', title: 'SEO Content Optimizer', description: 'Optimize content for search engines', url: '/tools/seo-marketing/seo-optimizer', status: 'coming-soon' },
      { id: 'keyword-research', title: 'Keyword Research AI', description: 'Find and analyze profitable keywords', url: '/tools/seo-marketing/keyword-research', status: 'coming-soon' },
      { id: 'ad-campaign-manager', title: 'AI Ad Campaign Manager', description: 'Create and optimize advertising campaigns', url: '/tools/seo-marketing/ad-campaign-manager', status: 'coming-soon' },
      { id: 'social-analytics', title: 'Social Media Analytics', description: 'Analyze social media performance', url: '/tools/seo-marketing/social-analytics', status: 'coming-soon' },
      { id: 'competitor-analysis', title: 'Competitor Analysis Tool', description: 'Research and track competitors', url: '/tools/seo-marketing/competitor-analysis', status: 'coming-soon' },
      { id: 'landing-page-builder', title: 'AI Landing Page Builder', description: 'Create high-converting landing pages', url: '/tools/seo-marketing/landing-page-builder', status: 'coming-soon' },
      { id: 'email-list-builder', title: 'Email List Builder AI', description: 'Grow and manage email subscriber lists', url: '/tools/seo-marketing/email-list-builder', status: 'coming-soon' },
    ]
  },
  {
    title: 'Specialized & Emerging AI',
    icon: Brain,
    tools: [
      // AI Agents & Autonomous Systems
      { id: 'personal-ai-assistant', title: 'Personal AI Assistant', description: 'AI that learns your preferences and acts autonomously', url: '/tools/specialized/personal-ai-assistant', status: 'coming-soon' },
      { id: 'research-agent', title: 'AI Research Agent', description: 'Conducts comprehensive research and compiles reports', url: '/tools/specialized/research-agent', status: 'coming-soon' },
      { id: 'shopping-agent', title: 'Shopping AI Agent', description: 'Finds best deals and makes purchase recommendations', url: '/tools/specialized/shopping-agent', status: 'coming-soon' },
      { id: 'travel-agent', title: 'Travel Planning Agent', description: 'Plans complete trips with bookings and itineraries', url: '/tools/specialized/travel-agent', status: 'coming-soon' },
      { id: 'investment-advisor', title: 'Investment AI Advisor', description: 'Provides personalized investment recommendations', url: '/tools/specialized/investment-advisor', status: 'coming-soon' },
      { id: 'health-monitor', title: 'Health Monitoring Agent', description: 'Tracks health metrics and provides insights', url: '/tools/specialized/health-monitor', status: 'coming-soon' },
      
      // Hyper-Personalization Tools
      { id: 'personality-analyzer', title: 'AI Personality Analyzer', description: 'Analyze personality from social media and text', url: '/tools/specialized/personality-analyzer', status: 'coming-soon' },
      { id: 'custom-trainer', title: 'Custom AI Trainer', description: 'Train AI models on your specific data and style', url: '/tools/specialized/custom-trainer', status: 'coming-soon' },
      { id: 'behavior-predictor', title: 'Behavioral Prediction Engine', description: 'Predict user behavior and preferences', url: '/tools/specialized/behavior-predictor', status: 'coming-soon' },
      { id: 'content-personalizer', title: 'Dynamic Content Personalizer', description: 'Adapt website content in real-time', url: '/tools/specialized/content-personalizer', status: 'coming-soon' },
      { id: 'relationship-advisor', title: 'AI Relationship Advisor', description: 'Relationship guidance based on communication patterns', url: '/tools/specialized/relationship-advisor', status: 'coming-soon' },
      { id: 'learning-path', title: 'Personalized Learning Path Creator', description: 'Custom educational journeys', url: '/tools/specialized/learning-path', status: 'coming-soon' },
      
      // Technology Integration
      { id: 'code-reviewer', title: 'AI Code Review Assistant', description: 'Automated code quality and security analysis', url: '/tools/specialized/code-reviewer', status: 'coming-soon' },
      { id: 'smart-contract-auditor', title: 'Smart Contract Auditor', description: 'Analyze blockchain smart contracts for vulnerabilities', url: '/tools/specialized/smart-contract-auditor', status: 'coming-soon' },
      { id: 'iot-manager', title: 'IoT Device Manager', description: 'Control and optimize connected devices with AI', url: '/tools/specialized/iot-manager', status: 'coming-soon' },
      { id: 'ar-recognition', title: 'AR Object Recognition', description: 'Identify and interact with real-world objects', url: '/tools/specialized/ar-recognition', status: 'coming-soon' },
      { id: 'accessibility-tool', title: 'AI Accessibility Tool', description: 'Make digital content accessible for all users', url: '/tools/specialized/accessibility-tool', status: 'coming-soon' },
      { id: 'quantum-simulator', title: 'Quantum Computing Simulator', description: 'Simulate quantum algorithms and circuits', url: '/tools/specialized/quantum-simulator', status: 'coming-soon' },
      
      // Healthcare & Wellness
      { id: 'symptom-checker', title: 'Medical Symptom Checker', description: 'AI-powered preliminary health assessment', url: '/tools/specialized/symptom-checker', status: 'coming-soon' },
      { id: 'mental-health-companion', title: 'Mental Health Companion', description: 'Emotional support and mental wellness tracking', url: '/tools/specialized/mental-health-companion', status: 'coming-soon' },
      { id: 'nutrition-analyzer', title: 'Nutrition AI Analyzer', description: 'Analyze food and provide nutritional insights', url: '/tools/specialized/nutrition-analyzer', status: 'coming-soon' },
      { id: 'fitness-checker', title: 'Fitness Form Checker', description: 'Analyze exercise form through video', url: '/tools/specialized/fitness-checker', status: 'coming-soon' },
      { id: 'sleep-optimizer', title: 'Sleep Pattern Optimizer', description: 'Improve sleep quality with AI recommendations', url: '/tools/specialized/sleep-optimizer', status: 'coming-soon' },
      { id: 'medication-reminder', title: 'Medication Reminder AI', description: 'Smart medication management and interactions', url: '/tools/specialized/medication-reminder', status: 'coming-soon' },
      
      // Creative & Entertainment
      { id: 'ai-storyteller', title: 'AI Storyteller', description: 'Generate interactive stories and narratives', url: '/tools/specialized/ai-storyteller', status: 'coming-soon' },
      { id: 'interior-designer', title: 'Virtual Interior Designer', description: 'Design and visualize room layouts', url: '/tools/specialized/interior-designer', status: 'coming-soon' },
      { id: 'fashion-stylist', title: 'AI Fashion Stylist', description: 'Personal styling recommendations and outfit planning', url: '/tools/specialized/fashion-stylist', status: 'coming-soon' },
      { id: 'game-companion', title: 'Game AI Companion', description: 'Intelligent NPCs for gaming experiences', url: '/tools/specialized/game-companion', status: 'coming-soon' },
      { id: 'poetry-generator', title: 'AI Poetry Generator', description: 'Create personalized poems and lyrics', url: '/tools/specialized/poetry-generator', status: 'coming-soon' },
      { id: 'event-planner', title: 'Virtual Event Planner', description: 'Plan and coordinate virtual events', url: '/tools/specialized/event-planner', status: 'coming-soon' },
      
      // Security & Privacy
      { id: 'privacy-guardian', title: 'AI Privacy Guardian', description: 'Protect personal data across digital platforms', url: '/tools/specialized/privacy-guardian', status: 'coming-soon' },
      { id: 'deepfake-detector', title: 'Deepfake Detector', description: 'Identify manipulated media content', url: '/tools/specialized/deepfake-detector', status: 'coming-soon' },
      { id: 'security-auditor', title: 'AI Security Auditor', description: 'Automated security vulnerability assessment', url: '/tools/specialized/security-auditor', status: 'coming-soon' },
      { id: 'identity-protector', title: 'Digital Identity Protector', description: 'Monitor and protect online identity', url: '/tools/specialized/identity-protector', status: 'coming-soon' },
      { id: 'fraud-detector', title: 'AI Fraud Detector', description: 'Real-time fraud detection and prevention', url: '/tools/specialized/fraud-detector', status: 'coming-soon' },
      
      // Sustainability & Environment
      { id: 'carbon-calculator', title: 'Carbon Footprint Calculator', description: 'Track and reduce environmental impact', url: '/tools/specialized/carbon-calculator', status: 'coming-soon' },
      { id: 'energy-optimizer', title: 'Energy Usage Optimizer', description: 'Optimize home and office energy consumption', url: '/tools/specialized/energy-optimizer', status: 'coming-soon' },
      { id: 'waste-reducer', title: 'Waste Reduction AI', description: 'Minimize waste through smart recommendations', url: '/tools/specialized/waste-reducer', status: 'coming-soon' },
      { id: 'sustainable-shopping', title: 'Sustainable Shopping Guide', description: 'Find eco-friendly products and alternatives', url: '/tools/specialized/sustainable-shopping', status: 'coming-soon' },
      { id: 'climate-tracker', title: 'Climate Impact Tracker', description: 'Monitor climate-related risks and opportunities', url: '/tools/specialized/climate-tracker', status: 'coming-soon' },
      
      // Niche Applications
      { id: 'dream-interpreter', title: 'AI Dream Interpreter', description: 'Analyze and interpret dream meanings', url: '/tools/specialized/dream-interpreter', status: 'coming-soon' },
      { id: 'emotion-analyzer', title: 'Voice Emotion Analyzer', description: 'Detect emotions from speech patterns', url: '/tools/specialized/emotion-analyzer', status: 'coming-soon' },
      { id: 'habit-builder', title: 'AI Habit Builder', description: 'Build and maintain positive habits', url: '/tools/specialized/habit-builder', status: 'coming-soon' },
      { id: 'social-trainer', title: 'Social Skills Trainer', description: 'Practice and improve social interactions', url: '/tools/specialized/social-trainer', status: 'coming-soon' },
      { id: 'time-capsule', title: 'AI Time Capsule', description: 'Create digital time capsules with predictions', url: '/tools/specialized/time-capsule', status: 'coming-soon' },
      { id: 'digital-declutter', title: 'Digital Declutter Assistant', description: 'Organize and clean digital life', url: '/tools/specialized/digital-declutter', status: 'coming-soon' },
      { id: 'conflict-resolver', title: 'AI Conflict Resolver', description: 'Mediate disputes and suggest resolutions', url: '/tools/specialized/conflict-resolver', status: 'coming-soon' },
      { id: 'memory-palace', title: 'Memory Palace Builder', description: 'Create visual memory aids and techniques', url: '/tools/specialized/memory-palace', status: 'coming-soon' },
      { id: 'life-coach', title: 'AI Life Coach', description: 'Personalized life guidance and goal achievement', url: '/tools/specialized/life-coach', status: 'coming-soon' },
      { id: 'future-visualizer', title: 'Future Self Visualizer', description: 'Project and visualize future life scenarios', url: '/tools/specialized/future-visualizer', status: 'coming-soon' },
    ]
  }
];

export function SimpleSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(aiToolCategories);

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

  useEffect(() => {
    if (!searchQuery) {
      setFilteredCategories(aiToolCategories);
      return;
    }

    const filtered = aiToolCategories.map(category => ({
      ...category,
      tools: category.tools.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.tools.length > 0);

    setFilteredCategories(filtered);
  }, [searchQuery]);

  const totalTools = aiToolCategories.reduce((sum, cat) => sum + cat.tools.length, 0);
  const readyTools = aiToolCategories.reduce((sum, cat) => sum + cat.tools.filter(tool => tool.status === 'ready').length, 0);

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
              AI Tools Navigator
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              ALT+S+D to toggle • {totalTools} tools available
            </p>
          </div>
          <button
            className="w-10 h-10 p-0 rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-border">
          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-foreground placeholder-muted-foreground"
          />
        </div>

        {/* Categories and Tools */}
        <div className="flex-1 overflow-y-auto">
          {filteredCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="border-b border-border/50">
                {/* Category Header */}
                <div className="p-4 bg-muted/20">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-foreground text-sm">
                {category.title}
              </h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {category.tools.length}
                    </span>
                  </div>
                </div>
                
                {/* Tools List */}
                <div className="px-4 py-2">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.url}
                      className={`block p-3 rounded-lg mb-2 transition-all duration-200 group ${
                        tool.status === 'ready' 
                          ? 'hover:bg-muted/50 border border-transparent hover:border-accent/20' 
                          : 'opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium text-sm transition-colors ${
                              tool.status === 'ready' 
                                ? 'text-foreground group-hover:text-accent' 
                                : 'text-muted-foreground'
                            }`}>
                              {tool.title}
                            </h4>
                            {tool.status === 'ready' && (
                              <span className="w-2 h-2 bg-accent rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      {tool.status === 'coming-soon' && (
                        <div className="mt-2">
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                            Coming Soon
                          </span>
                  </div>
                )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">
              {readyTools} Ready • {totalTools - readyTools} Coming Soon
            </p>
            <p className="text-xs text-muted-foreground">
              Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 