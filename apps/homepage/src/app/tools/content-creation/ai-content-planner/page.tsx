'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Calendar, Target, TrendingUp, FileText, Users, Lightbulb } from 'lucide-react';

export default function AIContentPlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    brandName: '',
    industry: 'technology',
    contentGoals: [] as string[],
    targetAudience: [] as string[],
    contentTypes: [] as string[],
    planningPeriod: 'monthly',
    contentVolume: 'medium',
    includeTrends: true,
    includeCompetitorAnalysis: true,
    includeSeasonality: true,
    includeKeywords: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const contentPlannerConfig = `// AI Content Planner: ${formData.brandName}
// Generated with AI Content Planner Builder

class ${formData.brandName.replace(/\s+/g, '')}ContentPlanner {
  constructor() {
    this.brandName = '${formData.brandName}';
    this.industry = '${formData.industry}';
    this.contentGoals = ${JSON.stringify(formData.contentGoals)};
    this.targetAudience = ${JSON.stringify(formData.targetAudience)};
    this.contentTypes = ${JSON.stringify(formData.contentTypes)};
    this.planningPeriod = '${formData.planningPeriod}';
    this.contentVolume = '${formData.contentVolume}';
    this.contentCalendar = [];
    this.trendAnalyzer = ${formData.includeTrends} ? new TrendAnalyzer() : null;
    this.competitorTracker = ${formData.includeCompetitorAnalysis} ? new CompetitorTracker() : null;
    this.initialize();
  }

  initialize() {
    console.log('Initializing Content Planner for ' + this.brandName);
    this.setupContentFramework();
    this.generateContentCalendar();
    ${formData.includeTrends ? 'this.analyzeTrends();' : ''}
    ${formData.includeCompetitorAnalysis ? 'this.analyzeCompetitors();' : ''}
  }

  setupContentFramework() {
    this.contentFramework = {
      'blog_posts': {
        frequency: this.getContentFrequency('blog_posts'),
        types: ['how_to', 'list', 'industry_news', 'case_study', 'opinion'],
        optimal_length: '800-1500 words',
        seo_focus: true,
        platforms: ['website', 'medium', 'linkedin']
      },
      'social_media': {
        frequency: this.getContentFrequency('social_media'),
        types: ['promotional', 'educational', 'behind_scenes', 'user_generated'],
        optimal_length: 'Platform specific',
        engagement_focus: true,
        platforms: ['twitter', 'linkedin', 'facebook', 'instagram']
      },
      'videos': {
        frequency: this.getContentFrequency('videos'),
        types: ['tutorial', 'demo', 'interview', 'behind_scenes'],
        optimal_length: '2-10 minutes',
        visual_focus: true,
        platforms: ['youtube', 'vimeo', 'social_media']
      },
      'infographics': {
        frequency: this.getContentFrequency('infographics'),
        types: ['data_visualization', 'process_flow', 'comparison', 'timeline'],
        optimal_format: 'Vertical 800x2000px',
        shareability_focus: true,
        platforms: ['pinterest', 'social_media', 'website']
      },
      'podcasts': {
        frequency: this.getContentFrequency('podcasts'),
        types: ['interview', 'solo', 'panel', 'narrative'],
        optimal_length: '20-60 minutes',
        audio_focus: true,
        platforms: ['spotify', 'apple_podcasts', 'google_podcasts']
      },
      'newsletters': {
        frequency: this.getContentFrequency('newsletters'),
        types: ['weekly_roundup', 'product_updates', 'industry_insights'],
        optimal_length: '500-800 words',
        relationship_focus: true,
        platforms: ['email', 'newsletter_platforms']
      }
    };
  }

  getContentFrequency(contentType) {
    const volumeMultipliers = {
      'low': { blog_posts: 1, social_media: 3, videos: 0.5, infographics: 0.5, podcasts: 0.25, newsletters: 1 },
      'medium': { blog_posts: 2, social_media: 5, videos: 1, infographics: 1, podcasts: 0.5, newsletters: 1 },
      'high': { blog_posts: 4, social_media: 10, videos: 2, infographics: 2, podcasts: 1, newsletters: 2 }
    };

    const baseFrequency = volumeMultipliers[this.contentVolume][contentType] || 1;
    
    if (this.planningPeriod === 'weekly') return Math.ceil(baseFrequency / 4);
    if (this.planningPeriod === 'quarterly') return baseFrequency * 3;
    return baseFrequency; // monthly
  }

  generateContentCalendar(period = 30) {
    const calendar = [];
    const startDate = new Date();
    
    // Generate content ideas for the planning period
    for (let day = 0; day < period; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);
      
      const dailyContent = this.generateDailyContent(currentDate);
      if (dailyContent.length > 0) {
        calendar.push({
          date: currentDate.toDateString(),
          content: dailyContent,
          themes: this.getDailyThemes(currentDate),
          priority: this.calculatePriority(currentDate, dailyContent)
        });
      }
    }

    this.contentCalendar = calendar;
    return calendar;
  }

  generateDailyContent(date) {
    const content = [];
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    this.contentTypes.forEach(contentType => {
      const framework = this.contentFramework[contentType];
      if (!framework) return;

      const shouldCreateToday = this.shouldCreateContentToday(contentType, dayOfWeek, dayOfMonth);
      
      if (shouldCreateToday) {
        const contentIdea = this.generateContentIdea(contentType, date);
        content.push({
          type: contentType,
          idea: contentIdea,
          platform: framework.platforms[0],
          estimatedTime: this.getEstimatedTime(contentType),
          keywords: ${formData.includeKeywords} ? this.suggestKeywords(contentIdea.topic) : [],
          urgency: this.calculateUrgency(contentType, date)
        });
      }
    });

    return content;
  }

  shouldCreateContentToday(contentType, dayOfWeek, dayOfMonth) {
    const frequency = this.getContentFrequency(contentType);
    
    // Different content types have different optimal days
    const optimalDays = {
      'blog_posts': [1, 3], // Monday, Wednesday
      'social_media': [1, 2, 3, 4, 5], // Weekdays
      'videos': [2, 4], // Tuesday, Thursday  
      'infographics': [3], // Wednesday
      'podcasts': [5], // Friday
      'newsletters': [5] // Friday
    };

    const contentOptimalDays = optimalDays[contentType] || [1, 3, 5];
    const isOptimalDay = contentOptimalDays.includes(dayOfWeek);
    
    // Frequency-based logic
    if (frequency >= 1) return isOptimalDay;
    if (frequency >= 0.5) return isOptimalDay && dayOfMonth <= 15;
    return isOptimalDay && dayOfMonth <= 7;
  }

  generateContentIdea(contentType, date) {
    const ideas = {
      'blog_posts': [
        { topic: 'Industry trends in ' + this.industry, type: 'analysis', angle: 'future predictions' },
        { topic: 'Best practices for ' + this.industry + ' professionals', type: 'how_to', angle: 'actionable tips' },
        { topic: 'Common mistakes in ' + this.industry, type: 'list', angle: 'problem solving' },
        { topic: this.brandName + ' success story', type: 'case_study', angle: 'real results' },
        { topic: 'The future of ' + this.industry, type: 'opinion', angle: 'thought leadership' }
      ],
      'social_media': [
        { topic: 'Quick tip for ' + this.industry, type: 'educational', angle: 'value sharing' },
        { topic: 'Behind the scenes at ' + this.brandName, type: 'behind_scenes', angle: 'transparency' },
        { topic: 'Customer spotlight', type: 'user_generated', angle: 'community building' },
        { topic: 'Product feature highlight', type: 'promotional', angle: 'benefit focused' }
      ],
      'videos': [
        { topic: 'How to use ' + this.brandName + ' effectively', type: 'tutorial', angle: 'education' },
        { topic: this.brandName + ' product demo', type: 'demo', angle: 'showcase' },
        { topic: 'Interview with industry expert', type: 'interview', angle: 'authority building' },
        { topic: 'Day in the life at ' + this.brandName, type: 'behind_scenes', angle: 'culture' }
      ],
      'infographics': [
        { topic: this.industry + ' statistics', type: 'data_visualization', angle: 'insights' },
        { topic: 'Process workflow for ' + this.industry, type: 'process_flow', angle: 'clarity' },
        { topic: this.brandName + ' vs competitors', type: 'comparison', angle: 'differentiation' },
        { topic: 'Evolution of ' + this.industry, type: 'timeline', angle: 'perspective' }
      ],
      'podcasts': [
        { topic: 'Expert interview: ' + this.industry + ' insights', type: 'interview', angle: 'knowledge sharing' },
        { topic: 'Solo discussion: ' + this.industry + ' trends', type: 'solo', angle: 'thought leadership' },
        { topic: 'Panel: Future of ' + this.industry, type: 'panel', angle: 'diverse perspectives' }
      ],
      'newsletters': [
        { topic: 'Weekly ' + this.industry + ' roundup', type: 'weekly_roundup', angle: 'curation' },
        { topic: this.brandName + ' product updates', type: 'product_updates', angle: 'transparency' },
        { topic: this.industry + ' insights and analysis', type: 'industry_insights', angle: 'expertise' }
      ]
    };

    const contentIdeas = ideas[contentType] || ideas['blog_posts'];
    const randomIdea = contentIdeas[Math.floor(Math.random() * contentIdeas.length)];
    
    return {
      ...randomIdea,
      title: this.generateContentTitle(randomIdea.topic, randomIdea.type),
      description: this.generateContentDescription(randomIdea.topic, randomIdea.angle),
      targetAudience: this.selectTargetAudience(),
      callToAction: this.generateCallToAction(contentType)
    };
  }

  generateContentTitle(topic, type) {
    const titleFormats = {
      'how_to': 'How to ' + topic + ': A Complete Guide',
      'list': '10 Essential ' + topic + ' Strategies',
      'analysis': 'Deep Dive: ' + topic + ' Analysis',
      'case_study': 'Case Study: ' + topic,
      'opinion': 'Why ' + topic + ' Matters More Than Ever',
      'educational': '💡 ' + topic,
      'behind_scenes': '👀 ' + topic,
      'tutorial': '🎥 ' + topic + ' Tutorial',
      'demo': '✨ ' + topic + ' Demo',
      'data_visualization': '📊 ' + topic + ' by the Numbers'
    };

    return titleFormats[type] || topic;
  }

  generateContentDescription(topic, angle) {
    const descriptions = {
      'future predictions': 'Explore upcoming trends and what they mean for your business',
      'actionable tips': 'Practical strategies you can implement immediately',
      'problem solving': 'Avoid these common pitfalls and boost your success',
      'real results': 'See how real customers achieved measurable results',
      'thought leadership': 'Industry insights from our expert team',
      'value sharing': 'Quick, actionable advice to improve your workflow',
      'transparency': 'Get an inside look at how we operate',
      'community building': 'Celebrating our amazing community members',
      'benefit focused': 'Discover how this feature can transform your process'
    };

    return descriptions[angle] || 'Valuable insights about ' + topic;
  }

  selectTargetAudience() {
    return this.targetAudience[Math.floor(Math.random() * this.targetAudience.length)] || 'general';
  }

  generateCallToAction(contentType) {
    const ctas = {
      'blog_posts': ['Read the full article', 'Share your thoughts in comments', 'Subscribe for more insights'],
      'social_media': ['Like and share', 'Comment below', 'Follow for more'],
      'videos': ['Watch the full video', 'Subscribe to our channel', 'Share with your team'],
      'infographics': ['Download the full infographic', 'Share this insight', 'Save for later'],
      'podcasts': ['Listen to the full episode', 'Subscribe on your favorite platform', 'Share with colleagues'],
      'newsletters': ['Read the full newsletter', 'Forward to a friend', 'Subscribe for weekly updates']
    };

    const typeCtas = ctas[contentType] || ['Learn more', 'Get started today'];
    return typeCtas[Math.floor(Math.random() * typeCtas.length)];
  }

  getEstimatedTime(contentType) {
    const timesInHours = {
      'blog_posts': '3-5 hours',
      'social_media': '0.5-1 hour',
      'videos': '4-8 hours',
      'infographics': '2-4 hours',
      'podcasts': '2-6 hours',
      'newsletters': '1-2 hours'
    };

    return timesInHours[contentType] || '2-3 hours';
  }

  calculateUrgency(contentType, date) {
    // Higher urgency for time-sensitive content
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    if (contentType === 'social_media' && !isWeekend) return 'high';
    if (contentType === 'newsletters' && dayOfWeek === 5) return 'high';
    if (contentType === 'blog_posts') return 'medium';
    return 'low';
  }

  ${formData.includeKeywords ? `
  suggestKeywords(topic) {
    const industryKeywords = {
      'technology': ['innovation', 'digital transformation', 'automation', 'AI', 'software'],
      'finance': ['investment', 'financial planning', 'ROI', 'capital', 'growth'],
      'healthcare': ['patient care', 'medical technology', 'wellness', 'treatment', 'health'],
      'education': ['learning', 'student success', 'curriculum', 'teaching', 'academic'],
      'marketing': ['engagement', 'conversion', 'brand awareness', 'lead generation', 'ROI']
    };

    const baseKeywords = industryKeywords[this.industry] || ['business', 'success', 'growth', 'strategy'];
    const topicKeywords = topic.toLowerCase().split(' ').filter(word => word.length > 3);
    
    return [...baseKeywords.slice(0, 3), ...topicKeywords.slice(0, 2)];
  }` : ''}

  getDailyThemes(date) {
    const month = date.getMonth();
    const dayOfWeek = date.getDay();
    
    const seasonalThemes = {
      0: ['New Year', 'Planning', 'Goals'], // January
      1: ['Love', 'Relationships', 'Networking'], // February
      2: ['Growth', 'Spring', 'Renewal'], // March
      3: ['Innovation', 'Fresh Ideas', 'Creativity'], // April
      4: ['Productivity', 'Efficiency', 'Progress'], // May
      5: ['Summer', 'Collaboration', 'Teamwork'], // June
      6: ['Independence', 'Freedom', 'Flexibility'], // July
      7: ['Achievement', 'Success', 'Results'], // August
      8: ['Learning', 'Education', 'Knowledge'], // September
      9: ['Harvest', 'Gratitude', 'Reflection'], // October
      10: ['Thanksgiving', 'Community', 'Sharing'], // November
      11: ['Year-end', 'Reflection', 'Planning'] // December
    };

    const weeklyThemes = {
      1: ['Monday Motivation', 'Week Kickoff'],
      2: ['Tuesday Tips', 'Best Practices'],
      3: ['Wednesday Wisdom', 'Mid-week Insights'],
      4: ['Thursday Thoughts', 'Expert Opinions'],
      5: ['Friday Features', 'Week Wrap-up'],
      6: ['Saturday Spotlight', 'Community Focus'],
      0: ['Sunday Strategy', 'Planning Ahead']
    };

    return [
      ...(seasonalThemes[month] || []),
      ...(weeklyThemes[dayOfWeek] || [])
    ];
  }

  generateContentStrategy() {
    return 'Content Strategy Report for ' + this.brandName + '\\n\\n' +
      'Planning Period: ' + this.planningPeriod.charAt(0).toUpperCase() + this.planningPeriod.slice(1) + '\\n' +
      'Content Volume: ' + this.contentVolume.charAt(0).toUpperCase() + this.contentVolume.slice(1) + '\\n' +
      'Industry Focus: ' + this.industry.charAt(0).toUpperCase() + this.industry.slice(1) + '\\n\\n' +
      'Content Goals:\\n' +
      this.contentGoals.map(goal => '• ' + goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\\n') + '\\n\\n' +
      'Target Audiences:\\n' +
      this.targetAudience.map(audience => '• ' + audience.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\\n') + '\\n\\n' +
      'Content Types & Frequency:\\n' +
      this.contentTypes.map(type => {
        const frequency = this.getContentFrequency(type);
        return '• ' + type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + 
               ': ' + frequency + 'x per ' + this.planningPeriod;
      }).join('\\n') + '\\n\\n' +
      'Calendar Overview:\\n' +
      '• Total Content Pieces: ' + this.contentCalendar.reduce((sum, day) => sum + day.content.length, 0) + '\\n' +
      '• High Priority Days: ' + this.contentCalendar.filter(day => day.priority === 'high').length + '\\n' +
      '• Content Distribution: Balanced across all selected types\\n\\n' +
      'Key Recommendations:\\n' +
      '✅ Maintain consistent publishing schedule\\n' +
      '✅ Repurpose content across multiple platforms\\n' +
      '✅ Monitor performance and adjust strategy\\n' +
      '✅ Engage with audience through comments and shares\\n' +
      ${formData.includeTrends ? "'✅ Stay updated with trending topics\\n' +" : ''} +
      ${formData.includeCompetitorAnalysis ? "'✅ Monitor competitor content strategies\\n' +" : ''} +
      '✅ Track and measure content ROI\\n\\n' +
      'Next Steps:\\n' +
      '1. Review and approve content calendar\\n' +
      '2. Assign content creation responsibilities\\n' +
      '3. Set up content tracking and analytics\\n' +
      '4. Begin content production following the schedule';
  }

  calculatePriority(date, content) {
    let priorityScore = 0;
    
    content.forEach(item => {
      if (item.urgency === 'high') priorityScore += 3;
      if (item.urgency === 'medium') priorityScore += 2;
      if (item.urgency === 'low') priorityScore += 1;
    });

    if (priorityScore >= 6) return 'high';
    if (priorityScore >= 3) return 'medium';
    return 'low';
  }
}

class TrendAnalyzer {
  analyzeTrends() {
    // Simulated trend analysis
    return [
      'AI and automation trends',
      'Sustainability focus',
      'Remote work best practices',
      'Digital transformation',
      'Customer experience optimization'
    ];
  }
}

class CompetitorTracker {
  analyzeCompetitors() {
    // Simulated competitor analysis
    return [
      'Competitor A focuses on educational content',
      'Competitor B uses video heavily',
      'Industry trend: Increased podcast content',
      'Gap opportunity: Interactive content formats'
    ];
  }
}

// Initialize Content Planner
const contentPlanner = new ${formData.brandName.replace(/\s+/g, '')}ContentPlanner();

// Configuration Summary:
// Brand: ${formData.brandName}
// Industry: ${formData.industry}
// Planning Period: ${formData.planningPeriod}
// Content Volume: ${formData.contentVolume}
// Content Goals: ${formData.contentGoals.join(', ')}

// Generate 30-day content calendar
const contentCalendar = contentPlanner.generateContentCalendar(30);
console.log('Generated content calendar with ' + contentCalendar.length + ' planned days');

// Generate comprehensive strategy
const strategy = contentPlanner.generateContentStrategy();
console.log('Content Strategy:', strategy);

// Example: Get today's content
const today = new Date();
const todayContent = contentPlanner.generateDailyContent(today);
console.log('Today\\'s content plan:', todayContent);

// API Key for enhanced features: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

/* 
FEATURES ENABLED:
✓ Comprehensive content calendar
✓ Multi-format content planning
✓ Audience-targeted content
✓ Goal-oriented strategy
✓ Seasonal theme integration
✓ Time estimation & prioritization
✓ Platform-specific optimization
${formData.includeTrends ? '✓ Trend analysis integration' : ''}
${formData.includeCompetitorAnalysis ? '✓ Competitor monitoring' : ''}
${formData.includeSeasonality ? '✓ Seasonal content planning' : ''}
${formData.includeKeywords ? '✓ SEO keyword suggestions' : ''}

CONTENT GOALS:
${formData.contentGoals.map(goal => '✓ ' + goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\\n')}

TARGET AUDIENCES:
${formData.targetAudience.map(audience => '✓ ' + audience.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\\n')}

CONTENT TYPES:
${formData.contentTypes.map(type => '✓ ' + type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\\n')}
*/`;

      setResult(contentPlannerConfig);
      setIsGenerating(false);
    }, 4500);
  };

  const handleContentGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      contentGoals: prev.contentGoals.includes(goal)
        ? prev.contentGoals.filter(g => g !== goal)
        : [...prev.contentGoals, goal]
    }));
  };

  const handleTargetAudienceToggle = (audience: string) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter(a => a !== audience)
        : [...prev.targetAudience, audience]
    }));
  };

  const handleContentTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  const availableContentGoals = [
    'brand_awareness',
    'lead_generation', 
    'customer_engagement',
    'thought_leadership',
    'product_education',
    'community_building'
  ];

  const availableTargetAudiences = [
    'executives',
    'managers',
    'professionals',
    'entrepreneurs',
    'students',
    'general_public'
  ];

  const availableContentTypes = [
    'blog_posts',
    'social_media',
    'videos',
    'infographics',
    'podcasts',
    'newsletters'
  ];

  return (
    <AIToolLayout
      title="AI Content Planner"
      description="Create comprehensive content strategies and calendars with AI-powered insights, trend analysis, and audience targeting for maximum impact."
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
            placeholder="e.g., ContentMaster Pro"
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
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
            <option value="consulting">Consulting</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="media">Media & Entertainment</option>
            <option value="nonprofit">Non-profit</option>
          </select>
        </div>

        {/* Content Goals */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-accent" />
            Content Goals
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableContentGoals.map((goal) => (
              <label key={goal} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.contentGoals.includes(goal)}
                  onChange={() => handleContentGoalToggle(goal)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Target Audience
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableTargetAudiences.map((audience) => (
              <label key={audience} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.targetAudience.includes(audience)}
                  onChange={() => handleTargetAudienceToggle(audience)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {audience.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Content Types */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            Content Types
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableContentTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.contentTypes.includes(type)}
                  onChange={() => handleContentTypeToggle(type)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Planning Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              Planning Period
            </label>
            <select
              value={formData.planningPeriod}
              onChange={(e) => setFormData(prev => ({ ...prev, planningPeriod: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content Volume
            </label>
            <select
              value={formData.contentVolume}
              onChange={(e) => setFormData(prev => ({ ...prev, contentVolume: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="low">Low Volume</option>
              <option value="medium">Medium Volume</option>
              <option value="high">High Volume</option>
            </select>
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            Advanced Features
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeTrends}
                onChange={(e) => setFormData(prev => ({ ...prev, includeTrends: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Trend Analysis Integration</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeCompetitorAnalysis}
                onChange={(e) => setFormData(prev => ({ ...prev, includeCompetitorAnalysis: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Competitor Analysis</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeSeasonality}
                onChange={(e) => setFormData(prev => ({ ...prev, includeSeasonality: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Seasonal Content Planning</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeKeywords}
                onChange={(e) => setFormData(prev => ({ ...prev, includeKeywords: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">SEO Keyword Suggestions</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 