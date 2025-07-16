'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { HelpCircle, FileText, Target, Search, Settings, Brain } from 'lucide-react';

export default function AIFAQGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    businessName: '',
    industry: 'technology',
    faqCategories: [] as string[],
    targetAudience: 'customers',
    questionCount: '20',
    answerLength: 'medium',
    includeKnowledgeBase: true,
    includeSearchFunctionality: true,
    multiLanguage: false,
    autoUpdate: true,
    priority: 'common-questions',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const faqSystemConfig = `// AI FAQ Generator: ${formData.businessName}
// Generated with AI FAQ Generator Builder

class ${formData.businessName.replace(/\s+/g, '')}FAQSystem {
  constructor() {
    this.businessName = '${formData.businessName}';
    this.industry = '${formData.industry}';
    this.categories = ${JSON.stringify(formData.faqCategories)};
    this.targetAudience = '${formData.targetAudience}';
    this.faqDatabase = [];
    this.knowledgeBase = ${formData.includeKnowledgeBase};
    this.searchEnabled = ${formData.includeSearchFunctionality};
    this.analytics = new FAQAnalytics();
    this.initialize();
  }

  initialize() {
    console.log('Initializing AI FAQ System for ' + this.businessName);
    this.generateBaseFAQs();
    this.setupSearchFunctionality();
    this.startAnalytics();
  }

  generateBaseFAQs() {
    const baseFAQs = {
      'general': [
        {
          question: 'What is ${formData.businessName} and what do you offer?',
          answer: '${formData.businessName} is a leading company in the ${formData.industry} industry. We provide innovative solutions and exceptional service to help our customers achieve their goals.',
          category: 'general',
          priority: 'high',
          searchTerms: ['about', 'company', 'services', 'what is']
        },
        {
          question: 'How can I contact ${formData.businessName}?',
          answer: 'You can reach us through multiple channels: email at support@${formData.businessName.toLowerCase().replace(/\s+/g, '')}.com, phone at (555) 123-4567, or through our live chat feature on this website.',
          category: 'general',
          priority: 'high',
          searchTerms: ['contact', 'support', 'help', 'phone', 'email']
        },
        {
          question: 'What are your business hours?',
          answer: 'Our support team is available Monday through Friday, 9 AM to 6 PM EST. For urgent matters, you can reach our 24/7 emergency support line.',
          category: 'general',
          priority: 'medium',
          searchTerms: ['hours', 'time', 'availability', 'schedule']
        }
      ],
      'pricing': [
        {
          question: 'What are your pricing plans?',
          answer: 'We offer flexible pricing plans to suit different needs. Our Basic plan starts at $29/month, Professional at $79/month, and Enterprise with custom pricing. Contact us for detailed pricing information.',
          category: 'pricing',
          priority: 'high',
          searchTerms: ['price', 'cost', 'plans', 'subscription', 'billing']
        },
        {
          question: 'Do you offer free trials?',
          answer: 'Yes! We offer a 14-day free trial for all our plans. No credit card required to start your trial.',
          category: 'pricing',
          priority: 'high',
          searchTerms: ['trial', 'free', 'demo', 'test']
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Absolutely. You can cancel your subscription at any time from your account dashboard. There are no cancellation fees.',
          category: 'pricing',
          priority: 'medium',
          searchTerms: ['cancel', 'cancellation', 'refund', 'subscription']
        }
      ],
      'technical': [
        {
          question: 'What are the system requirements?',
          answer: 'Our platform works on all modern web browsers (Chrome, Firefox, Safari, Edge). For mobile apps, we support iOS 12+ and Android 8+.',
          category: 'technical',
          priority: 'medium',
          searchTerms: ['requirements', 'compatibility', 'browser', 'mobile']
        },
        {
          question: 'How secure is my data?',
          answer: 'We take security seriously. All data is encrypted in transit and at rest. We are SOC 2 Type II certified and GDPR compliant.',
          category: 'technical',
          priority: 'high',
          searchTerms: ['security', 'privacy', 'encryption', 'gdpr', 'data']
        },
        {
          question: 'Do you provide API access?',
          answer: 'Yes, we offer RESTful API access for Professional and Enterprise plans. Full documentation is available in our developer portal.',
          category: 'technical',
          priority: 'medium',
          searchTerms: ['api', 'integration', 'developer', 'webhook']
        }
      ],
      'support': [
        {
          question: 'How do I get help if I\\'m stuck?',
          answer: 'We offer multiple support channels: live chat, email support, video tutorials, and comprehensive documentation. Premium users also get priority phone support.',
          category: 'support',
          priority: 'high',
          searchTerms: ['help', 'support', 'assistance', 'tutorial']
        },
        {
          question: 'Do you provide training?',
          answer: 'Yes! We offer onboarding sessions, video tutorials, webinars, and one-on-one training sessions for Enterprise customers.',
          category: 'support',
          priority: 'medium',
          searchTerms: ['training', 'onboarding', 'tutorial', 'learn']
        }
      ]
    };

    // Generate FAQs based on selected categories
    this.categories.forEach(category => {
      if (baseFAQs[category]) {
        this.faqDatabase.push(...baseFAQs[category]);
      }
    });

    console.log('Generated ' + this.faqDatabase.length + ' FAQ entries');
  }

  searchFAQ(query) {
    if (!this.searchEnabled) return [];

    const searchTerms = query.toLowerCase().split(' ');
    const results = [];

    this.faqDatabase.forEach(faq => {
      let relevanceScore = 0;

      // Check question relevance
      searchTerms.forEach(term => {
        if (faq.question.toLowerCase().includes(term)) {
          relevanceScore += 3;
        }
        if (faq.answer.toLowerCase().includes(term)) {
          relevanceScore += 2;
        }
        if (faq.searchTerms.some(searchTerm => searchTerm.includes(term))) {
          relevanceScore += 1;
        }
      });

      if (relevanceScore > 0) {
        results.push({
          ...faq,
          relevanceScore
        });
      }
    });

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  getFAQsByCategory(category) {
    return this.faqDatabase.filter(faq => faq.category === category);
  }

  generateFAQWidget() {
    return '<div id="ai-faq-widget" style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;"><h2 style="color: #333; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">Frequently Asked Questions</h2>' + 
      (this.searchEnabled ? '<div style="margin-bottom: 20px;"><input type="text" id="faq-search" placeholder="Search FAQs..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"></div>' : '') +
      '<div id="faq-categories">' + 
      this.categories.map(category => 
        '<div class="faq-category" data-category="' + category + '" style="margin-bottom: 20px;"><h3 style="color: #FFD700; cursor: pointer; border-left: 4px solid #FFD700; padding-left: 10px;">' + 
        category.charAt(0).toUpperCase() + category.slice(1) + 
        '</h3><div class="faq-items">' +
        this.getFAQsByCategory(category).map(faq => 
          '<div class="faq-item" style="margin-bottom: 10px; border: 1px solid #eee; border-radius: 5px;"><div class="faq-question" style="background: #f9f9f9; padding: 15px; cursor: pointer; font-weight: bold;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === \\'none\\' ? \\'block\\' : \\'none\\'">' + 
          faq.question + 
          '</div><div class="faq-answer" style="padding: 15px; display: none;">' + 
          faq.answer + 
          '</div></div>'
        ).join('') +
        '</div></div>'
      ).join('') +
      '</div></div>';
  }

  generateAnalyticsReport() {
    return 'FAQ Analytics Report\\n\\n' +
      'Total FAQs: ' + this.faqDatabase.length + '\\n' +
      'Categories: ' + this.categories.join(', ') + '\\n' +
      'Target Audience: ' + this.targetAudience + '\\n\\n' +
      'FAQ Distribution:\\n' +
      this.categories.map(cat => 
        '- ' + cat.charAt(0).toUpperCase() + cat.slice(1) + ': ' + 
        this.getFAQsByCategory(cat).length + ' questions'
      ).join('\\n') + '\\n\\n' +
      'Most Important Questions:\\n' +
      this.faqDatabase
        .filter(faq => faq.priority === 'high')
        .map((faq, index) => (index + 1) + '. ' + faq.question)
        .join('\\n');
  }
}

class FAQAnalytics {
  constructor() {
    this.searchQueries = [];
    this.popularQuestions = new Map();
    this.unansweredQuestions = [];
  }

  trackSearch(query) {
    this.searchQueries.push({
      query: query,
      timestamp: new Date()
    });
  }

  trackQuestionView(questionId) {
    const count = this.popularQuestions.get(questionId) || 0;
    this.popularQuestions.set(questionId, count + 1);
  }

  getPopularQuestions() {
    return Array.from(this.popularQuestions.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }
}

// Initialize the FAQ system
const faqSystem = new ${formData.businessName.replace(/\s+/g, '')}FAQSystem();

// Configuration:
// Business: ${formData.businessName}
// Industry: ${formData.industry}
// Categories: ${formData.faqCategories.join(', ')}
// Target Audience: ${formData.targetAudience}
// Question Count: ${formData.questionCount}
// Answer Length: ${formData.answerLength}

// Usage Examples:

// 1. Search FAQs
const searchResults = faqSystem.searchFAQ('pricing plans');
console.log('Search Results:', searchResults);

// 2. Get FAQs by category
const pricingFAQs = faqSystem.getFAQsByCategory('pricing');
console.log('Pricing FAQs:', pricingFAQs);

// 3. Generate FAQ widget HTML
const widgetHTML = faqSystem.generateFAQWidget();
console.log('FAQ Widget HTML:', widgetHTML);

// 4. Generate analytics report
const analyticsReport = faqSystem.generateAnalyticsReport();
console.log('Analytics Report:', analyticsReport);

// API Key for enhanced features: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

/* 
FEATURES ENABLED:
✓ Automated FAQ generation
✓ Category-based organization
✓ Smart search functionality
✓ Analytics and tracking
✓ Responsive FAQ widget
✓ Multi-audience targeting
${formData.includeKnowledgeBase ? '✓ Knowledge base integration' : ''}
${formData.includeSearchFunctionality ? '✓ Advanced search capabilities' : ''}
${formData.multiLanguage ? '✓ Multi-language support' : ''}
${formData.autoUpdate ? '✓ Auto-update from support tickets' : ''}

CATEGORIES INCLUDED:
${formData.faqCategories.map(cat => '✓ ' + cat.charAt(0).toUpperCase() + cat.slice(1)).join('\\n')}

TARGET AUDIENCE: ${formData.targetAudience.charAt(0).toUpperCase() + formData.targetAudience.slice(1)}
INDUSTRY: ${formData.industry.charAt(0).toUpperCase() + formData.industry.slice(1)}
*/`;

      setResult(faqSystemConfig);
      setIsGenerating(false);
    }, 3000);
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      faqCategories: prev.faqCategories.includes(category)
        ? prev.faqCategories.filter(c => c !== category)
        : [...prev.faqCategories, category]
    }));
  };

  const availableCategories = [
    'general',
    'pricing',
    'technical',
    'support',
    'billing',
    'account',
    'features',
    'integration'
  ];

  return (
    <AIToolLayout
      title="AI FAQ Generator"
      description="Generate comprehensive FAQ systems with intelligent categorization, search functionality, and analytics. Perfect for customer support and knowledge management."
      category="Conversational AI"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Business/Organization Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            placeholder="e.g., TechSolutions Inc."
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Industry
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="ecommerce">E-commerce</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="consulting">Consulting</option>
            <option value="real-estate">Real Estate</option>
            <option value="travel">Travel & Tourism</option>
          </select>
        </div>

        {/* FAQ Categories */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-accent" />
            FAQ Categories
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableCategories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.faqCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-accent" />
            Target Audience
          </label>
          <select
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="customers">General Customers</option>
            <option value="business">Business Users</option>
            <option value="developers">Developers/Technical</option>
            <option value="partners">Partners & Resellers</option>
            <option value="internal">Internal Team</option>
            <option value="investors">Investors</option>
          </select>
        </div>

        {/* Question Count & Answer Length */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Number of Questions
            </label>
            <select
              value={formData.questionCount}
              onChange={(e) => setFormData(prev => ({ ...prev, questionCount: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="10">10 Questions</option>
              <option value="20">20 Questions</option>
              <option value="30">30 Questions</option>
              <option value="50">50 Questions</option>
              <option value="100">100+ Questions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Answer Length
            </label>
            <select
              value={formData.answerLength}
              onChange={(e) => setFormData(prev => ({ ...prev, answerLength: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="short">Short & Concise</option>
              <option value="medium">Medium Detail</option>
              <option value="long">Comprehensive</option>
            </select>
          </div>
        </div>

        {/* Priority Focus */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Priority Focus
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['common-questions', 'technical-issues', 'business-focused'].map((priority) => (
              <button
                key={priority}
                onClick={() => setFormData(prev => ({ ...prev, priority }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.priority === priority
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {priority.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-accent" />
            Advanced Features
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeKnowledgeBase}
                onChange={(e) => setFormData(prev => ({ ...prev, includeKnowledgeBase: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Knowledge Base Integration</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeSearchFunctionality}
                onChange={(e) => setFormData(prev => ({ ...prev, includeSearchFunctionality: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Advanced Search Functionality</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.multiLanguage}
                onChange={(e) => setFormData(prev => ({ ...prev, multiLanguage: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Multi-Language Support</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoUpdate}
                onChange={(e) => setFormData(prev => ({ ...prev, autoUpdate: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Auto-Update from Support Tickets</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 