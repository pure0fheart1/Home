'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Mail, Users, Target, TrendingUp, Calendar, Zap } from 'lucide-react';

export default function AIEmailMarketingPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    brandName: '',
    industry: 'technology',
    emailTypes: [] as string[],
    audienceSegments: [] as string[],
    campaignGoal: 'engagement',
    emailFrequency: 'weekly',
    tone: 'professional',
    includePersonalization: true,
    includeABTesting: true,
    includeAnalytics: true,
    includeAutomation: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const emailMarketingConfig = `// AI Email Marketing Assistant: ${formData.brandName}
// Generated with AI Email Marketing Builder

class ${formData.brandName.replace(/\s+/g, '')}EmailMarketing {
  constructor() {
    this.brandName = '${formData.brandName}';
    this.industry = '${formData.industry}';
    this.emailTypes = ${JSON.stringify(formData.emailTypes)};
    this.audienceSegments = ${JSON.stringify(formData.audienceSegments)};
    this.campaignGoal = '${formData.campaignGoal}';
    this.tone = '${formData.tone}';
    this.emailFrequency = '${formData.emailFrequency}';
    this.campaigns = [];
    this.analytics = new EmailAnalytics();
    this.automationRules = [];
    this.initialize();
  }

  initialize() {
    console.log('Initializing Email Marketing System for ' + this.brandName);
    this.setupEmailTemplates();
    this.createAudienceSegments();
    ${formData.includeAutomation ? 'this.setupAutomationWorkflows();' : ''}
    ${formData.includeAnalytics ? 'this.startAnalyticsTracking();' : ''}
  }

  setupEmailTemplates() {
    this.templates = {
      'newsletter': {
        subject: this.generateSubjectLine('newsletter'),
        structure: {
          header: '📧 {brand_name} Newsletter - {date}',
          greeting: 'Hi {first_name},',
          content: {
            intro: 'Welcome to our latest newsletter! Here\\'s what\\'s happening at {brand_name}...',
            sections: [
              '🔥 Featured Story: {main_story}',
              '📈 Industry Updates: {industry_news}',
              '💡 Tips & Tricks: {helpful_tips}',
              '🎉 Community Highlights: {community_features}'
            ],
            cta: 'Read more on our blog →'
          },
          footer: 'Thanks for being part of our community!\\n\\nBest regards,\\nThe {brand_name} Team'
        }
      },
      'promotional': {
        subject: this.generateSubjectLine('promotional'),
        structure: {
          header: '🔥 Exclusive Offer Inside!',
          greeting: 'Hello {first_name}!',
          content: {
            intro: 'We have something special just for you...',
            offer: '✨ {offer_details} ✨',
            benefits: [
              '✅ Save {discount_amount}',
              '✅ Premium features included',
              '✅ Limited time only'
            ],
            urgency: '⏰ Offer expires in {time_left}!',
            cta: 'Claim Your Offer Now →'
          },
          footer: 'Questions? Reply to this email and we\\'ll help you out!'
        }
      },
      'welcome': {
        subject: 'Welcome to {brand_name}! Let\\'s get started 🎉',
        structure: {
          header: '🎉 Welcome to the {brand_name} family!',
          greeting: 'Hi {first_name},',
          content: {
            intro: 'We\\'re thrilled to have you on board! Here\\'s what you can expect...',
            next_steps: [
              '1. Complete your profile setup',
              '2. Explore our key features',
              '3. Join our community'
            ],
            resources: [
              '📚 Getting Started Guide',
              '🎥 Video Tutorials',
              '👥 Community Forum'
            ],
            cta: 'Get Started Now →'
          },
          footer: 'Need help? Our support team is here for you!'
        }
      },
      're_engagement': {
        subject: this.generateSubjectLine('re_engagement'),
        structure: {
          header: '👋 We miss you at {brand_name}!',
          greeting: 'Hi {first_name},',
          content: {
            intro: 'It\\'s been a while since we\\'ve seen you...',
            whats_new: 'Here\\'s what you\\'ve missed:',
            updates: [
              '🚀 New features launched',
              '🎯 Improved user experience',
              '🌟 Community achievements'
            ],
            incentive: '🎁 Welcome back with 20% off your next purchase',
            cta: 'Welcome Back →'
          },
          footer: 'Not interested? You can unsubscribe anytime.'
        }
      },
      'educational': {
        subject: this.generateSubjectLine('educational'),
        structure: {
          header: '💡 Learn something new today',
          greeting: 'Hello {first_name},',
          content: {
            intro: 'Knowledge is power! Here\\'s today\\'s learning...',
            topic: '📖 Topic: {educational_topic}',
            key_points: [
              '✨ Key insight #1',
              '✨ Key insight #2', 
              '✨ Key insight #3'
            ],
            application: '🎯 How to apply this: {practical_tips}',
            cta: 'Read Full Article →'
          },
          footer: 'Keep learning and growing with {brand_name}!'
        }
      }
    };
  }

  generateSubjectLine(emailType) {
    const subjectLines = {
      'newsletter': [
        '{brand_name} Weekly: {highlight}',
        'Your weekly dose of {industry} insights',
        '📧 {month} Newsletter: {main_topic}',
        'What\\'s new at {brand_name}? Find out inside!'
      ],
      'promotional': [
        '🔥 {discount}% OFF - Limited Time!',
        'Exclusive offer just for you, {first_name}',
        'Last chance: {offer_name}',
        'Your special {brand_name} deal expires soon'
      ],
      'welcome': [
        'Welcome to {brand_name}! Let\\'s get started 🎉',
        'Your {brand_name} journey begins now',
        'Thanks for joining {brand_name}! Here\\'s what\\'s next',
        'Welcome aboard, {first_name}! 🚀'
      ],
      're_engagement': [
        'We miss you, {first_name}! Come back with 20% off',
        'Your {brand_name} account is waiting for you',
        'It\\'s been too long! Here\\'s what you missed',
        'Welcome back offer: {incentive}'
      ],
      'educational': [
        '💡 {topic}: Everything you need to know',
        'Master {skill} in 5 minutes',
        '{industry} tip: {main_insight}',
        'Learn {topic} with {brand_name}'
      ]
    };

    const options = subjectLines[emailType] || ['Update from {brand_name}'];
    return options[Math.floor(Math.random() * options.length)];
  }

  createEmailCampaign(type, segmentId, customizations = {}) {
    const template = this.templates[type];
    if (!template) throw new Error('Email type not supported');

    const segment = this.getAudienceSegment(segmentId);
    const campaign = {
      id: 'CAMP_' + Date.now(),
      type: type,
      segment: segmentId,
      subject: this.personalizeContent(template.subject, segment, customizations),
      content: this.generateEmailContent(template.structure, segment, customizations),
      scheduledFor: this.getOptimalSendTime(segment),
      status: 'draft',
      ${formData.includeABTesting ? 'abTest: this.setupABTest(template),' : ''}
      created: new Date(),
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        converted: 0
      }
    };

    this.campaigns.push(campaign);
    return campaign;
  }

  generateEmailContent(structure, segment, customizations) {
    let content = '';
    
    // Header
    content += '<div style="background: linear-gradient(135deg, #FFD700, #FFA500); padding: 20px; text-align: center; color: #000;">';
    content += '<h1 style="margin: 0; font-size: 24px;">' + structure.header + '</h1>';
    content += '</div>';

    // Body
    content += '<div style="padding: 30px; background: #fff; font-family: Arial, sans-serif; line-height: 1.6;">';
    
    // Greeting
    content += '<p style="font-size: 16px; margin-bottom: 20px;">' + structure.greeting + '</p>';
    
    // Main content
    if (structure.content.intro) {
      content += '<p style="font-size: 16px; margin-bottom: 20px;">' + structure.content.intro + '</p>';
    }

    // Content sections
    if (structure.content.sections) {
      structure.content.sections.forEach(section => {
        content += '<div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #FFD700;">';
        content += '<p style="margin: 0; font-size: 16px;">' + section + '</p>';
        content += '</div>';
      });
    }

    // CTA Button
    if (structure.content.cta) {
      content += '<div style="text-align: center; margin: 30px 0;">';
      content += '<a href="{cta_link}" style="background: #FFD700; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">';
      content += structure.content.cta;
      content += '</a>';
      content += '</div>';
    }

    // Footer
    content += '<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">';
    content += '<p>' + structure.footer + '</p>';
    content += '<p style="margin-top: 20px;">Follow us: <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">LinkedIn</a></p>';
    content += '<p style="margin-top: 10px; font-size: 12px;">© ' + new Date().getFullYear() + ' ' + this.brandName + '. All rights reserved.</p>';
    content += '</div>';
    
    content += '</div>';

    return this.personalizeContent(content, segment, customizations);
  }

  personalizeContent(content, segment, customizations) {
    const personalizations = {
      '{brand_name}': this.brandName,
      '{first_name}': segment.firstName || 'Valued Customer',
      '{date}': new Date().toLocaleDateString(),
      '{month}': new Date().toLocaleDateString('en-US', { month: 'long' }),
      '{industry}': this.industry,
      ...customizations
    };

    let personalizedContent = content;
    Object.entries(personalizations).forEach(([placeholder, value]) => {
      personalizedContent = personalizedContent.replace(new RegExp(placeholder, 'g'), value);
    });

    return personalizedContent;
  }

  getAudienceSegment(segmentId) {
    const segments = {
      'new_subscribers': {
        name: 'New Subscribers',
        characteristics: ['Recently joined', 'High engagement potential'],
        preferredTime: '10:00 AM',
        firstName: 'New User'
      },
      'active_users': {
        name: 'Active Users',
        characteristics: ['Regular engagement', 'Product advocates'],
        preferredTime: '2:00 PM',
        firstName: 'Active User'
      },
      'inactive_users': {
        name: 'Inactive Users',
        characteristics: ['Low engagement', 'Re-engagement needed'],
        preferredTime: '11:00 AM',
        firstName: 'Valued Customer'
      },
      'premium_customers': {
        name: 'Premium Customers',
        characteristics: ['High value', 'Loyal customers'],
        preferredTime: '9:00 AM',
        firstName: 'Premium Member'
      }
    };

    return segments[segmentId] || segments['active_users'];
  }

  getOptimalSendTime(segment) {
    const optimalTimes = {
      'tuesday': segment.preferredTime || '10:00 AM',
      'wednesday': segment.preferredTime || '2:00 PM',
      'thursday': segment.preferredTime || '11:00 AM'
    };

    const bestDay = Object.keys(optimalTimes)[Math.floor(Math.random() * 3)];
    return bestDay + ' at ' + optimalTimes[bestDay];
  }

  ${formData.includeABTesting ? `
  setupABTest(template) {
    return {
      variant_a: {
        subject: template.subject,
        content_variation: 'standard'
      },
      variant_b: {
        subject: template.subject.replace('!', ' - Don\\'t Miss Out!'),
        content_variation: 'urgency_focused'
      },
      split_percentage: 50,
      metric: 'open_rate'
    };
  }` : ''}

  generateCampaignReport() {
    const totalCampaigns = this.campaigns.length;
    const totalSent = this.campaigns.reduce((sum, camp) => sum + camp.metrics.sent, 0);
    const totalOpened = this.campaigns.reduce((sum, camp) => sum + camp.metrics.opened, 0);
    const totalClicked = this.campaigns.reduce((sum, camp) => sum + camp.metrics.clicked, 0);

    return 'Email Marketing Performance Report\\n\\n' +
      'Brand: ' + this.brandName + '\\n' +
      'Industry: ' + this.industry + '\\n' +
      'Campaign Goal: ' + this.campaignGoal + '\\n\\n' +
      'Campaign Overview:\\n' +
      '• Total Campaigns: ' + totalCampaigns + '\\n' +
      '• Total Emails Sent: ' + totalSent + '\\n' +
      '• Average Open Rate: ' + (totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : 0) + '%\\n' +
      '• Average Click Rate: ' + (totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : 0) + '%\\n\\n' +
      'Email Types Performance:\\n' +
      this.emailTypes.map(type => 
        '• ' + type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + 
        ': ' + this.campaigns.filter(c => c.type === type).length + ' campaigns'
      ).join('\\n') + '\\n\\n' +
      'Audience Segments:\\n' +
      this.audienceSegments.map(segment => 
        '• ' + segment.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      ).join('\\n') + '\\n\\n' +
      'Best Practices Applied:\\n' +
      '✅ Personalized subject lines\\n' +
      '✅ Mobile-responsive design\\n' +
      '✅ Clear call-to-action buttons\\n' +
      '✅ Optimal send time scheduling\\n' +
      ${formData.includeABTesting ? "'✅ A/B testing enabled\\n' +" : ''} +
      ${formData.includePersonalization ? "'✅ Dynamic personalization\\n' +" : ''} +
      '✅ Automated follow-up sequences\\n\\n' +
      'Recommendations:\\n' +
      '📈 Increase frequency for engaged segments\\n' +
      '🎯 Create more targeted content\\n' +
      '📱 Optimize for mobile devices\\n' +
      '🔄 Set up re-engagement campaigns';
  }
}

class EmailAnalytics {
  constructor() {
    this.events = [];
    this.segmentPerformance = new Map();
  }

  trackEvent(campaignId, eventType, userId) {
    this.events.push({
      campaignId,
      eventType,
      userId,
      timestamp: new Date()
    });
  }

  getCampaignMetrics(campaignId) {
    const events = this.events.filter(e => e.campaignId === campaignId);
    return {
      sent: events.filter(e => e.eventType === 'sent').length,
      opened: events.filter(e => e.eventType === 'opened').length,
      clicked: events.filter(e => e.eventType === 'clicked').length,
      converted: events.filter(e => e.eventType === 'converted').length
    };
  }
}

// Initialize Email Marketing System
const emailMarketing = new ${formData.brandName.replace(/\s+/g, '')}EmailMarketing();

// Configuration Summary:
// Brand: ${formData.brandName}
// Industry: ${formData.industry}
// Email Types: ${formData.emailTypes.join(', ')}
// Audience Segments: ${formData.audienceSegments.join(', ')}
// Campaign Goal: ${formData.campaignGoal}
// Email Frequency: ${formData.emailFrequency}

// Example: Create a newsletter campaign
const newsletterCampaign = emailMarketing.createEmailCampaign('newsletter', 'active_users', {
  '{main_story}': 'New product features that will boost your productivity',
  '{industry_news}': 'Latest trends in ' + '${formData.industry}',
  '{helpful_tips}': 'Time-saving shortcuts for daily tasks'
});

console.log('Created newsletter campaign:', newsletterCampaign.id);

// Generate performance report
const performanceReport = emailMarketing.generateCampaignReport();
console.log('Performance Report:', performanceReport);

// API Key for enhanced features: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

/* 
FEATURES ENABLED:
✓ Multi-type email campaigns
✓ Audience segmentation
✓ Dynamic personalization
✓ Optimal send time scheduling
✓ Mobile-responsive templates
✓ Performance analytics
✓ Campaign automation
${formData.includePersonalization ? '✓ Advanced personalization' : ''}
${formData.includeABTesting ? '✓ A/B testing capabilities' : ''}
${formData.includeAnalytics ? '✓ Comprehensive analytics' : ''}
${formData.includeAutomation ? '✓ Workflow automation' : ''}

EMAIL TYPES:
${formData.emailTypes.map(type => '✓ ' + type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\\n')}

AUDIENCE SEGMENTS:
${formData.audienceSegments.map(segment => '✓ ' + segment.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\\n')}

CAMPAIGN GOAL: ${formData.campaignGoal.charAt(0).toUpperCase() + formData.campaignGoal.slice(1)}
BRAND TONE: ${formData.tone.charAt(0).toUpperCase() + formData.tone.slice(1)}
*/`;

      setResult(emailMarketingConfig);
      setIsGenerating(false);
    }, 4000);
  };

  const handleEmailTypeToggle = (emailType: string) => {
    setFormData(prev => ({
      ...prev,
      emailTypes: prev.emailTypes.includes(emailType)
        ? prev.emailTypes.filter(t => t !== emailType)
        : [...prev.emailTypes, emailType]
    }));
  };

  const handleAudienceSegmentToggle = (segment: string) => {
    setFormData(prev => ({
      ...prev,
      audienceSegments: prev.audienceSegments.includes(segment)
        ? prev.audienceSegments.filter(s => s !== segment)
        : [...prev.audienceSegments, segment]
    }));
  };

  const availableEmailTypes = [
    'newsletter',
    'promotional',
    'welcome',
    'educational',
    're_engagement',
    'transactional'
  ];

  const availableAudienceSegments = [
    'new_subscribers',
    'active_users',
    'inactive_users',
    'premium_customers',
    'trial_users',
    'churned_users'
  ];

  return (
    <AIToolLayout
      title="AI Email Marketing Assistant"
      description="Create high-converting email campaigns with AI-powered personalization, segmentation, and optimization. Automate your email marketing for maximum engagement."
      category="Content Creation"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Brand Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Brand/Company Name
          </label>
          <input
            type="text"
            value={formData.brandName}
            onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
            placeholder="e.g., GrowthTech Solutions"
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
            <option value="ecommerce">E-commerce</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
            <option value="consulting">Consulting</option>
            <option value="saas">SaaS</option>
            <option value="nonprofit">Non-profit</option>
            <option value="real-estate">Real Estate</option>
          </select>
        </div>

        {/* Email Types */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            Email Campaign Types
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableEmailTypes.map((emailType) => (
              <label key={emailType} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailTypes.includes(emailType)}
                  onChange={() => handleEmailTypeToggle(emailType)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {emailType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Audience Segments */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Audience Segments
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableAudienceSegments.map((segment) => (
              <label key={segment} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.audienceSegments.includes(segment)}
                  onChange={() => handleAudienceSegmentToggle(segment)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {segment.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Campaign Goal & Email Frequency */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              Campaign Goal
            </label>
            <select
              value={formData.campaignGoal}
              onChange={(e) => setFormData(prev => ({ ...prev, campaignGoal: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="engagement">Increase Engagement</option>
              <option value="conversions">Drive Conversions</option>
              <option value="retention">Improve Retention</option>
              <option value="awareness">Brand Awareness</option>
              <option value="education">Education & Learning</option>
              <option value="sales">Boost Sales</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              Email Frequency
            </label>
            <select
              value={formData.emailFrequency}
              onChange={(e) => setFormData(prev => ({ ...prev, emailFrequency: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="triggered">Event Triggered</option>
            </select>
          </div>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Brand Tone
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['professional', 'friendly', 'casual', 'authoritative', 'enthusiastic', 'conversational'].map((tone) => (
              <button
                key={tone}
                onClick={() => setFormData(prev => ({ ...prev, tone }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.tone === tone
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Advanced Features
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includePersonalization}
                onChange={(e) => setFormData(prev => ({ ...prev, includePersonalization: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Advanced Personalization</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeABTesting}
                onChange={(e) => setFormData(prev => ({ ...prev, includeABTesting: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">A/B Testing Capabilities</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeAnalytics}
                onChange={(e) => setFormData(prev => ({ ...prev, includeAnalytics: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Performance Analytics</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeAutomation}
                onChange={(e) => setFormData(prev => ({ ...prev, includeAutomation: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Workflow Automation</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 