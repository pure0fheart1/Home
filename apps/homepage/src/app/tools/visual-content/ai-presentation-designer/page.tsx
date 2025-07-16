'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIPresentationDesignerPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    presentationType: 'business',
    topic: '',
    audience: 'professionals',
    duration: '15',
    slideCount: '10',
    style: 'modern',
    colorScheme: 'corporate',
    includeCharts: true,
    includeImages: true,
    includeAnimations: false,
    templateCategory: 'general',
    branding: 'minimal',
    language: 'english',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const presentationDesignerConfig = `// AI Presentation Designer: ${formData.topic}
// Generated with AI Presentation Designer Builder

class PresentationDesigner {
  constructor() {
    this.presentationType = '${formData.presentationType}';
    this.topic = '${formData.topic}';
    this.audience = '${formData.audience}';
    this.duration = ${formData.duration};
    this.slideCount = ${formData.slideCount};
    this.style = '${formData.style}';
    this.colorScheme = '${formData.colorScheme}';
    this.includeCharts = ${formData.includeCharts};
    this.includeImages = ${formData.includeImages};
    this.includeAnimations = ${formData.includeAnimations};
    this.templateCategory = '${formData.templateCategory}';
    this.branding = '${formData.branding}';
    this.language = '${formData.language}';
    this.slides = [];
    this.initialize();
  }

  initialize() {
    console.log('Initializing Presentation Designer for: ' + this.topic);
    this.analyzeAudience();
    this.generateSlideStructure();
    this.createDesignTheme();
    this.generateContent();
  }

  analyzeAudience() {
    const audienceProfiles = {
      executives: { 
        attention_span: 'short',
        content_preference: 'high-level',
        visual_style: 'minimalist',
        key_elements: ['roi', 'strategic_impact', 'executive_summary']
      },
      professionals: {
        attention_span: 'medium',
        content_preference: 'detailed',
        visual_style: 'professional',
        key_elements: ['data', 'processes', 'implementation']
      },
      students: {
        attention_span: 'variable',
        content_preference: 'engaging',
        visual_style: 'colorful',
        key_elements: ['examples', 'interactive', 'memorable']
      },
      general: {
        attention_span: 'medium',
        content_preference: 'accessible',
        visual_style: 'balanced',
        key_elements: ['clarity', 'storytelling', 'visual_aids']
      }
    };
    
    this.audienceProfile = audienceProfiles[this.audience] || audienceProfiles.general;
    console.log('Audience profile:', this.audienceProfile);
  }

  generateSlideStructure() {
    const structures = {
      business: [
        { type: 'title', title: 'Title Slide', content: 'topic_introduction' },
        { type: 'agenda', title: 'Agenda', content: 'presentation_outline' },
        { type: 'problem', title: 'Problem Statement', content: 'challenge_identification' },
        { type: 'solution', title: 'Our Solution', content: 'solution_overview' },
        { type: 'benefits', title: 'Key Benefits', content: 'value_proposition' },
        { type: 'implementation', title: 'Implementation', content: 'execution_plan' },
        { type: 'timeline', title: 'Timeline', content: 'project_schedule' },
        { type: 'investment', title: 'Investment', content: 'cost_analysis' },
        { type: 'roi', title: 'Return on Investment', content: 'financial_impact' },
        { type: 'next_steps', title: 'Next Steps', content: 'action_items' }
      ],
      pitch: [
        { type: 'hook', title: 'The Hook', content: 'attention_grabber' },
        { type: 'problem', title: 'The Problem', content: 'market_pain_point' },
        { type: 'solution', title: 'Our Solution', content: 'unique_value_prop' },
        { type: 'market', title: 'Market Opportunity', content: 'market_size' },
        { type: 'traction', title: 'Traction', content: 'proof_points' },
        { type: 'business_model', title: 'Business Model', content: 'revenue_streams' },
        { type: 'competition', title: 'Competition', content: 'competitive_analysis' },
        { type: 'team', title: 'Our Team', content: 'team_credentials' },
        { type: 'financials', title: 'Financials', content: 'financial_projections' },
        { type: 'funding', title: 'Funding Ask', content: 'investment_request' }
      ],
      educational: [
        { type: 'introduction', title: 'Introduction', content: 'topic_overview' },
        { type: 'objectives', title: 'Learning Objectives', content: 'goals_outcomes' },
        { type: 'overview', title: 'Topic Overview', content: 'subject_introduction' },
        { type: 'concepts', title: 'Key Concepts', content: 'fundamental_ideas' },
        { type: 'examples', title: 'Examples', content: 'practical_applications' },
        { type: 'activity', title: 'Interactive Activity', content: 'engagement_exercise' },
        { type: 'assessment', title: 'Knowledge Check', content: 'understanding_verification' },
        { type: 'summary', title: 'Summary', content: 'key_takeaways' },
        { type: 'resources', title: 'Additional Resources', content: 'further_learning' },
        { type: 'questions', title: 'Questions & Discussion', content: 'interactive_session' }
      ]
    };
    
    const baseStructure = structures[this.presentationType] || structures.business;
    this.slideStructure = baseStructure.slice(0, parseInt(this.slideCount));
    console.log('Generated slide structure:', this.slideStructure);
  }

  createDesignTheme() {
    const themes = {
      modern: {
        fonts: ['Montserrat', 'Open Sans'],
        layout: 'minimal_whitespace',
        icons: 'flat_design',
        animations: 'subtle_transitions'
      },
      corporate: {
        fonts: ['Arial', 'Calibri'],
        layout: 'structured_grid',
        icons: 'professional_icons',
        animations: 'formal_transitions'
      },
      creative: {
        fonts: ['Poppins', 'Nunito'],
        layout: 'asymmetrical',
        icons: 'custom_graphics',
        animations: 'dynamic_effects'
      },
      minimalist: {
        fonts: ['Helvetica', 'Lato'],
        layout: 'clean_simple',
        icons: 'minimal_line',
        animations: 'none'
      }
    };
    
    this.designTheme = themes[this.style] || themes.modern;
    
    const colorSchemes = {
      corporate: ['#1e3a8a', '#3b82f6', '#e5e7eb', '#374151'],
      vibrant: ['#dc2626', '#f59e0b', '#10b981', '#8b5cf6'],
      monochrome: ['#000000', '#374151', '#9ca3af', '#f3f4f6'],
      earth: ['#92400e', '#d97706', '#065f46', '#047857'],
      ocean: ['#1e40af', '#3b82f6', '#06b6d4', '#0891b2']
    };
    
    this.colors = colorSchemes[this.colorScheme] || colorSchemes.corporate;
    console.log('Design theme created:', this.designTheme);
  }

  generateContent() {
    this.slideStructure.forEach((slide, index) => {
      console.log(\`Generating content for slide \${index + 1}: \${slide.title}\`);
      
      const slideContent = {
        slideNumber: index + 1,
        title: slide.title,
        type: slide.type,
        content: this.generateSlideContent(slide),
        design: this.generateSlideDesign(slide),
        animations: this.includeAnimations ? this.generateAnimations(slide) : null
      };
      
      this.slides.push(slideContent);
    });
    
    console.log('All slides generated:', this.slides.length);
  }

  generateSlideContent(slide) {
    const contentTemplates = {
      title: {
        headline: this.topic,
        subtitle: \`Presentation for \${this.audience}\`,
        presenter: 'Your Name',
        date: new Date().toLocaleDateString()
      },
      agenda: {
        items: this.slideStructure.map(s => s.title),
        estimated_time: this.duration + ' minutes'
      },
      data: {
        charts: this.includeCharts ? ['bar_chart', 'line_graph', 'pie_chart'] : [],
        statistics: ['key_metric_1', 'key_metric_2', 'key_metric_3'],
        sources: 'data_sources'
      }
    };
    
    return contentTemplates[slide.type] || {
      bullet_points: ['Key point 1', 'Key point 2', 'Key point 3'],
      supporting_text: \`Supporting information for \${slide.title}\`,
      visual_elements: this.includeImages ? ['relevant_image'] : []
    };
  }

  generateSlideDesign(slide) {
    return {
      layout: this.selectLayout(slide.type),
      color_scheme: this.colors,
      typography: this.designTheme.fonts,
      spacing: 'optimal',
      alignment: 'professional'
    };
  }

  selectLayout(slideType) {
    const layouts = {
      title: 'centered_title',
      agenda: 'bulleted_list',
      content: 'title_and_content',
      comparison: 'two_column',
      data: 'chart_focus',
      conclusion: 'centered_summary'
    };
    
    return layouts[slideType] || layouts.content;
  }

  generateAnimations(slide) {
    if (!this.includeAnimations) return null;
    
    return {
      entrance: 'fade_in',
      emphasis: 'highlight',
      exit: 'fade_out',
      timing: 'on_click'
    };
  }

  // Export Methods
  exportToPowerPoint() {
    return {
      format: 'pptx',
      slides: this.slides,
      theme: this.designTheme,
      colors: this.colors
    };
  }

  exportToGoogle() {
    return {
      format: 'google_slides',
      slides: this.slides,
      sharing: 'editable_link'
    };
  }

  exportToPDF() {
    return {
      format: 'pdf',
      slides: this.slides,
      quality: 'high_resolution'
    };
  }
}

// Initialize Presentation Designer
const presentationDesigner = new PresentationDesigner();

// Export configuration
export default presentationDesigner;`;

      setResult(presentationDesignerConfig);
      setIsGenerating(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AIToolLayout
      title="AI Presentation Designer"
      description="Create professional presentations, pitch decks, and slide designs with AI-powered content generation and design optimization."
      category="Visual Content"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Presentation Basics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Presentation Basics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Presentation Type</label>
              <select
                value={formData.presentationType}
                onChange={(e) => handleInputChange('presentationType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="business">Business Presentation</option>
                <option value="pitch">Pitch Deck</option>
                <option value="educational">Educational/Training</option>
                <option value="sales">Sales Presentation</option>
                <option value="report">Report/Analysis</option>
                <option value="proposal">Project Proposal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select
                value={formData.audience}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="executives">Executives/C-Level</option>
                <option value="professionals">Business Professionals</option>
                <option value="students">Students/Trainees</option>
                <option value="clients">Clients/Customers</option>
                <option value="investors">Investors</option>
                <option value="general">General Audience</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Presentation Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your presentation topic"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Slides</label>
              <select
                value={formData.slideCount}
                onChange={(e) => handleInputChange('slideCount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5 slides</option>
                <option value="10">10 slides</option>
                <option value="15">15 slides</option>
                <option value="20">20 slides</option>
                <option value="25">25 slides</option>
                <option value="30">30 slides</option>
              </select>
            </div>
          </div>
        </div>

        {/* Design Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Design Style</label>
              <select
                value={formData.style}
                onChange={(e) => handleInputChange('style', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="modern">Modern</option>
                <option value="corporate">Corporate</option>
                <option value="creative">Creative</option>
                <option value="minimalist">Minimalist</option>
                <option value="elegant">Elegant</option>
                <option value="bold">Bold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
              <select
                value={formData.colorScheme}
                onChange={(e) => handleInputChange('colorScheme', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="corporate">Corporate Blue</option>
                <option value="vibrant">Vibrant Colors</option>
                <option value="monochrome">Monochrome</option>
                <option value="earth">Earth Tones</option>
                <option value="ocean">Ocean Theme</option>
                <option value="custom">Custom Brand Colors</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Category</label>
              <select
                value={formData.templateCategory}
                onChange={(e) => handleInputChange('templateCategory', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">General Business</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branding Level</label>
              <select
                value={formData.branding}
                onChange={(e) => handleInputChange('branding', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="minimal">Minimal Branding</option>
                <option value="moderate">Moderate Branding</option>
                <option value="heavy">Heavy Branding</option>
                <option value="custom">Custom Brand Package</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeCharts"
                checked={formData.includeCharts}
                onChange={(e) => handleInputChange('includeCharts', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeCharts" className="ml-2 block text-sm text-gray-900">
                Include Charts & Graphs
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeImages"
                checked={formData.includeImages}
                onChange={(e) => handleInputChange('includeImages', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeImages" className="ml-2 block text-sm text-gray-900">
                Include Stock Images
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeAnimations"
                checked={formData.includeAnimations}
                onChange={(e) => handleInputChange('includeAnimations', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeAnimations" className="ml-2 block text-sm text-gray-900">
                Include Animations
              </label>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "AI-powered slide structure generation",
              "Audience-optimized content suggestions",
              "Professional design templates",
              "Smart chart and graph creation",
              "Brand consistency maintenance",
              "Multi-format export (PPT, PDF, Google Slides)",
              "Speaker notes generation",
              "Presentation timing optimization",
              "Interactive element suggestions",
              "Accessibility compliance features"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 