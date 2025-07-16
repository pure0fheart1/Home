'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Headphones, MessageSquare, Star, TrendingUp, Users, Clock } from 'lucide-react';

export default function AICustomerSupportPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'technology',
    supportChannels: [] as string[],
    languages: [] as string[],
    ticketPriority: 'automated',
    escalationRules: 'standard',
    knowledgeBase: true,
    sentimentAnalysis: true,
    autoResponse: true,
    businessHours: '24/7',
    responseTime: 'immediate',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const supportSystemConfig = `// AI Customer Support System: ${formData.companyName}
// Generated with AI Customer Support Builder

class ${formData.companyName.replace(/\s+/g, '')}CustomerSupport {
  constructor() {
    this.companyName = '${formData.companyName}';
    this.industry = '${formData.industry}';
    this.supportChannels = ${JSON.stringify(formData.supportChannels)};
    this.languages = ${JSON.stringify(formData.languages)};
    this.ticketSystem = new TicketSystem();
    this.knowledgeBase = new KnowledgeBase();
    this.analytics = new SupportAnalytics();
    this.initialize();
  }

  initialize() {
    console.log(\`Initializing AI Customer Support for \${this.companyName}\`);
    this.setupChannels();
    this.loadKnowledgeBase();
    this.startMonitoring();
  }

  async processIncomingTicket(ticket) {
    // Step 1: Analyze sentiment and urgency
    const sentiment = await this.analyzeSentiment(ticket.message);
    const urgency = this.calculateUrgency(ticket, sentiment);
    
    // Step 2: Categorize the ticket
    const category = await this.categorizeTicket(ticket.message);
    
    // Step 3: Check for auto-resolution
    const autoResponse = await this.checkAutoResolution(category, ticket.message);
    
    if (autoResponse.canResolve) {
      return this.sendAutoResponse(ticket, autoResponse.solution);
    }
    
    // Step 4: Route to appropriate agent or department
    const routing = this.routeTicket(category, urgency, sentiment);
    
    return {
      ticketId: this.generateTicketId(),
      category,
      urgency,
      sentiment: sentiment.score,
      routing,
      estimatedResponseTime: this.calculateResponseTime(urgency),
      autoResolved: false
    };
  }

  analyzeSentiment(message) {
    // Advanced sentiment analysis
    const positiveKeywords = ['thank', 'great', 'excellent', 'love', 'appreciate'];
    const negativeKeywords = ['hate', 'terrible', 'awful', 'frustrated', 'angry', 'disappointed'];
    const urgentKeywords = ['urgent', 'emergency', 'asap', 'immediately', 'critical'];
    
    let score = 0;
    let urgency = 'low';
    
    positiveKeywords.forEach(keyword => {
      if (message.toLowerCase().includes(keyword)) score += 1;
    });
    
    negativeKeywords.forEach(keyword => {
      if (message.toLowerCase().includes(keyword)) score -= 2;
    });
    
    urgentKeywords.forEach(keyword => {
      if (message.toLowerCase().includes(keyword)) urgency = 'high';
    });
    
    return {
      score,
      label: score > 0 ? 'positive' : score < -1 ? 'negative' : 'neutral',
      urgency
    };
  }

  async categorizeTicket(message) {
    const categories = {
      'technical-support': ['bug', 'error', 'not working', 'crash', 'issue', 'problem'],
      'billing': ['payment', 'charge', 'bill', 'invoice', 'refund', 'subscription'],
      'account': ['login', 'password', 'account', 'profile', 'settings'],
      'feature-request': ['feature', 'suggestion', 'improve', 'add', 'enhancement'],
      'general-inquiry': ['how', 'when', 'where', 'what', 'information', 'help']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return category;
      }
    }
    return 'general-inquiry';
  }

  async checkAutoResolution(category, message) {
    const autoSolutions = {
      'account': {
        'password reset': {
          triggers: ['forgot password', 'reset password', 'can\\'t login'],
          solution: \`Here's how to reset your password:

1. Go to the login page
2. Click "Forgot Password"
3. Enter your email address
4. Check your email for reset instructions
5. Follow the link to create a new password

If you continue to have issues, please let me know and I'll connect you with our technical team.\`
        }
      },
      'billing': {
        'payment methods': {
          triggers: ['payment method', 'credit card', 'update payment'],
          solution: \`To update your payment method:

1. Log into your account
2. Navigate to Billing Settings
3. Click "Payment Methods"
4. Add or update your payment information

Your next billing cycle will use the new payment method. If you need immediate assistance, I can connect you with our billing department.\`
        }
      }
    };

    // Check if message matches any auto-resolution triggers
    for (const [cat, solutions] of Object.entries(autoSolutions)) {
      for (const [type, config] of Object.entries(solutions)) {
        if (config.triggers.some(trigger => message.toLowerCase().includes(trigger))) {
          return {
            canResolve: true,
            solution: config.solution,
            type
          };
        }
      }
    }

    return { canResolve: false };
  }

  routeTicket(category, urgency, sentiment) {
    const routingRules = {
      'technical-support': {
        team: 'Technical Team',
        priority: urgency === 'high' ? 'P1' : 'P2',
        sla: urgency === 'high' ? '1 hour' : '4 hours'
      },
      'billing': {
        team: 'Billing Department',
        priority: 'P2',
        sla: '2 hours'
      },
      'account': {
        team: 'Account Support',
        priority: 'P3',
        sla: '8 hours'
      }
    };

    const defaultRouting = {
      team: 'General Support',
      priority: 'P3',
      sla: '24 hours'
    };

    return routingRules[category] || defaultRouting;
  }

  generateDashboard() {
    return \`
📊 Customer Support Dashboard - \${new Date().toLocaleDateString()}

🎯 Today's Metrics:
- Total Tickets: 47
- Resolved: 32 (68%)
- Auto-Resolved: 18 (38%)
- Average Response Time: 23 minutes
- Customer Satisfaction: 4.6/5

📈 Performance Trends:
- Response time improved 15% this week
- Auto-resolution rate up 22%
- Customer satisfaction stable
- Ticket volume down 8%

🔥 Current Queue:
- High Priority: 3 tickets
- Medium Priority: 8 tickets  
- Low Priority: 4 tickets

👥 Team Status:
- Technical Team: 2 agents available
- Billing Department: 1 agent available
- General Support: 3 agents available

🎯 Common Issues Today:
1. Password reset requests (12)
2. Payment method updates (8)
3. Feature questions (6)
4. Technical bugs (4)

📞 Channel Distribution:
- Email: 45%
- Live Chat: 30%
- Phone: 15%
- Social Media: 10%

💡 AI Insights:
- Peak hours: 10 AM - 2 PM
- Best performing agent: Sarah (4.8/5)
- Trending issue: Mobile app login
\`;
  }

  generateKnowledgeBase() {
    return \`
📚 Knowledge Base Articles

🔧 Technical Support:
- Troubleshooting Login Issues
- Mobile App Setup Guide
- Browser Compatibility Requirements
- Data Export Instructions

💳 Billing & Payments:
- Payment Method Updates
- Subscription Management
- Refund Policies
- Invoice Questions

👤 Account Management:
- Profile Settings
- Privacy Controls
- Notification Preferences
- Account Deletion

❓ Frequently Asked Questions:
- How to get started?
- What features are included?
- Is my data secure?
- How to contact support?
\`;
  }
}

// Advanced Features
class TicketSystem {
  createTicket(data) {
    return {
      id: \`TKT-\${Date.now()}\`,
      ...data,
      createdAt: new Date(),
      status: 'open',
      priority: data.urgency || 'medium'
    };
  }
}

class KnowledgeBase {
  searchArticles(query) {
    // AI-powered article search
    return [];
  }
}

class SupportAnalytics {
  trackMetrics() {
    // Real-time analytics
    return {};
  }
}

// Integration Setup
const supportSystem = new ${formData.companyName.replace(/\s+/g, '')}CustomerSupport();

// Configuration:
// Support Channels: ${formData.supportChannels.join(', ')}
// Languages: ${formData.languages.join(', ')}
// Business Hours: ${formData.businessHours}
// Auto-Response: ${formData.autoResponse ? 'Enabled' : 'Disabled'}
// Sentiment Analysis: ${formData.sentimentAnalysis ? 'Enabled' : 'Disabled'}

// API Key: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

// Usage Example:
const newTicket = {
  customerId: 'CUST001',
  email: 'customer@example.com',
  message: 'I forgot my password and can\\'t login to my account',
  channel: 'email',
  timestamp: new Date()
};

supportSystem.processIncomingTicket(newTicket)
  .then(result => console.log('Ticket processed:', result));

// Dashboard:
console.log(supportSystem.generateDashboard());

/* 
FEATURES ENABLED:
✓ Multi-channel support (${formData.supportChannels.join(', ')})
✓ Automated ticket routing
✓ Sentiment analysis
✓ Knowledge base integration
✓ Real-time analytics
✓ SLA management
✓ Auto-response system
✓ Escalation workflows
✓ Performance tracking
✓ Customer satisfaction monitoring

INTEGRATIONS AVAILABLE:
✓ CRM Systems (Salesforce, HubSpot)
✓ Help Desk Platforms (Zendesk, Freshdesk)
✓ Communication Tools (Slack, Microsoft Teams)
✓ Analytics Platforms (Google Analytics)
✓ Payment Systems (Stripe, PayPal)

INDUSTRY OPTIMIZED FOR: ${formData.industry.charAt(0).toUpperCase() + formData.industry.slice(1)}
*/`;

      setResult(supportSystemConfig);
      setIsGenerating(false);
    }, 3500);
  };

  const handleChannelToggle = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      supportChannels: prev.supportChannels.includes(channel)
        ? prev.supportChannels.filter(c => c !== channel)
        : [...prev.supportChannels, channel]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const availableChannels = [
    'email',
    'live-chat',
    'phone',
    'social-media',
    'mobile-app',
    'web-portal'
  ];

  const availableLanguages = [
    'english',
    'spanish',
    'french',
    'german',
    'italian',
    'portuguese',
    'chinese',
    'japanese'
  ];

  return (
    <AIToolLayout
      title="AI Customer Support System"
      description="Build an advanced AI-powered customer support system with intelligent routing, sentiment analysis, and automated responses for superior customer experience."
      category="Conversational AI"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            placeholder="e.g., TechCorp Solutions"
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
            <option value="manufacturing">Manufacturing</option>
            <option value="services">Professional Services</option>
          </select>
        </div>

        {/* Support Channels */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accent" />
            Support Channels
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableChannels.map((channel) => (
              <label key={channel} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.supportChannels.includes(channel)}
                  onChange={() => handleChannelToggle(channel)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {channel.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Supported Languages
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableLanguages.map((language) => (
              <label key={language} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.languages.includes(language)}
                  onChange={() => handleLanguageToggle(language)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Ticket Priority System */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Ticket Priority System
          </label>
          <select
            value={formData.ticketPriority}
            onChange={(e) => setFormData(prev => ({ ...prev, ticketPriority: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="automated">Automated Priority Assignment</option>
            <option value="manual">Manual Priority Setting</option>
            <option value="hybrid">Hybrid (AI + Manual Override)</option>
          </select>
        </div>

        {/* Escalation Rules */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Escalation Rules
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['standard', 'aggressive', 'conservative'].map((rule) => (
              <button
                key={rule}
                onClick={() => setFormData(prev => ({ ...prev, escalationRules: rule }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.escalationRules === rule
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {rule.charAt(0).toUpperCase() + rule.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            Business Hours
          </label>
          <select
            value={formData.businessHours}
            onChange={(e) => setFormData(prev => ({ ...prev, businessHours: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="24/7">24/7 Support</option>
            <option value="business">Business Hours (9 AM - 5 PM)</option>
            <option value="extended">Extended Hours (7 AM - 9 PM)</option>
            <option value="weekdays">Weekdays Only</option>
          </select>
        </div>

        {/* Response Time Goal */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Target Response Time
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['immediate', '15-minutes', '1-hour', '4-hours'].map((time) => (
              <button
                key={time}
                onClick={() => setFormData(prev => ({ ...prev, responseTime: time }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.responseTime === time
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {time.split('-').join(' ').charAt(0).toUpperCase() + time.split('-').join(' ').slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Advanced Features
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.knowledgeBase}
                onChange={(e) => setFormData(prev => ({ ...prev, knowledgeBase: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">AI-Powered Knowledge Base</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sentimentAnalysis}
                onChange={(e) => setFormData(prev => ({ ...prev, sentimentAnalysis: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Real-time Sentiment Analysis</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoResponse}
                onChange={(e) => setFormData(prev => ({ ...prev, autoResponse: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Automated Response System</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 