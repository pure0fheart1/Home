'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { PenTool, Target, TrendingUp, Zap, Users, MessageSquare } from 'lucide-react';

export default function AICopywriterPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    projectName: '',
    copyType: 'sales_page',
    targetAudience: 'professionals',
    tone: 'persuasive',
    industry: 'technology',
    primaryGoal: 'conversions',
    copyLength: 'medium',
    includeEmotionalTriggers: true,
    includeScarcity: true,
    includeSocialProof: true,
    includeGuarantees: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const copywriterConfig = `// AI Copywriter: ${formData.projectName}
// Generated with AI Copywriter Builder

class ${formData.projectName.replace(/\s+/g, '')}Copywriter {
  constructor() {
    this.projectName = '${formData.projectName}';
    this.copyType = '${formData.copyType}';
    this.targetAudience = '${formData.targetAudience}';
    this.tone = '${formData.tone}';
    this.industry = '${formData.industry}';
    this.primaryGoal = '${formData.primaryGoal}';
    this.copyLength = '${formData.copyLength}';
    this.persuasionFrameworks = this.initializeFrameworks();
    this.emotionalTriggers = ${formData.includeEmotionalTriggers};
    this.initialize();
  }

  initialize() {
    console.log('Initializing AI Copywriter for ' + this.projectName);
    this.setupCopyFrameworks();
    this.loadPersuasionTechniques();
    this.generateCopyStructure();
  }

  initializeFrameworks() {
    return {
      'AIDA': {
        name: 'Attention, Interest, Desire, Action',
        structure: ['attention_grabber', 'interest_builder', 'desire_creator', 'action_prompt'],
        bestFor: ['sales_page', 'email_marketing', 'ads']
      },
      'PAS': {
        name: 'Problem, Agitation, Solution',
        structure: ['problem_identification', 'pain_agitation', 'solution_presentation'],
        bestFor: ['sales_page', 'landing_page', 'product_description']
      },
      'BEFORE_AFTER_BRIDGE': {
        name: 'Before After Bridge',
        structure: ['current_state', 'desired_state', 'bridge_solution'],
        bestFor: ['sales_page', 'case_study', 'transformation_story']
      },
      'FEATURES_BENEFITS': {
        name: 'Features to Benefits',
        structure: ['feature_list', 'benefit_translation', 'value_proposition'],
        bestFor: ['product_description', 'brochure', 'website_copy']
      },
      'STORY_SELLING': {
        name: 'Story Selling',
        structure: ['story_setup', 'conflict_challenge', 'resolution_outcome'],
        bestFor: ['case_study', 'testimonial', 'brand_story']
      }
    };
  }

  generateCopy(customInputs = {}) {
    const framework = this.selectOptimalFramework();
    const copyStructure = this.persuasionFrameworks[framework];
    
    let generatedCopy = '';
    
    // Generate headline
    generatedCopy += this.generateHeadline() + '\\n\\n';
    
    // Generate subheadline
    generatedCopy += this.generateSubheadline() + '\\n\\n';
    
    // Generate main copy based on framework
    copyStructure.structure.forEach((section, index) => {
      generatedCopy += this.generateSection(section, framework, index) + '\\n\\n';
    });
    
    // Add persuasion elements
    if (this.emotionalTriggers) {
      generatedCopy += this.addEmotionalTriggers();
    }
    
    ${formData.includeSocialProof ? 'generatedCopy += this.addSocialProof();' : ''}
    ${formData.includeScarcity ? 'generatedCopy += this.addScarcityElements();' : ''}
    ${formData.includeGuarantees ? 'generatedCopy += this.addGuarantees();' : ''}
    
    // Generate call-to-action
    generatedCopy += this.generateCallToAction();
    
    return {
      headline: this.generateHeadline(),
      copy: generatedCopy,
      framework: framework,
      structure: copyStructure,
      wordCount: this.estimateWordCount(generatedCopy),
      persuasionScore: this.calculatePersuasionScore(generatedCopy),
      recommendations: this.generateRecommendations()
    };
  }

  selectOptimalFramework() {
    const frameworkScores = {
      'AIDA': 0,
      'PAS': 0,
      'BEFORE_AFTER_BRIDGE': 0,
      'FEATURES_BENEFITS': 0,
      'STORY_SELLING': 0
    };
    
    // Score based on copy type
    const typeScoring = {
      'sales_page': { 'AIDA': 3, 'PAS': 3, 'BEFORE_AFTER_BRIDGE': 2 },
      'landing_page': { 'AIDA': 3, 'PAS': 2, 'FEATURES_BENEFITS': 2 },
      'email_marketing': { 'AIDA': 3, 'PAS': 2, 'STORY_SELLING': 1 },
      'product_description': { 'FEATURES_BENEFITS': 3, 'AIDA': 2, 'PAS': 1 },
      'ads': { 'AIDA': 3, 'PAS': 2, 'BEFORE_AFTER_BRIDGE': 1 },
      'case_study': { 'STORY_SELLING': 3, 'BEFORE_AFTER_BRIDGE': 2, 'FEATURES_BENEFITS': 1 }
    };
    
    Object.entries(typeScoring[this.copyType] || {}).forEach(([framework, score]) => {
      frameworkScores[framework] += score;
    });
    
    // Score based on primary goal
    if (this.primaryGoal === 'conversions') {
      frameworkScores['AIDA'] += 2;
      frameworkScores['PAS'] += 2;
    }
    
    // Return highest scoring framework
    return Object.entries(frameworkScores).reduce((a, b) => 
      frameworkScores[a[0]] > frameworkScores[b[0]] ? a : b
    )[0];
  }

  generateHeadline() {
    const headlineFormulas = {
      'benefit_driven': 'Transform Your ' + this.industry + ' Results in Just 30 Days',
      'problem_solution': 'The #1 Mistake ' + this.targetAudience + ' Make (And How to Fix It)',
      'curiosity_gap': 'Why 97% of ' + this.targetAudience + ' Fail at ' + this.industry + ' (Revealed)',
      'social_proof': 'How 10,000+ ' + this.targetAudience + ' Achieved ' + this.industry + ' Success',
      'urgency': 'Last Chance: ' + this.industry + ' Solution Expires Tonight',
      'story_based': 'From Struggling ' + this.targetAudience + ' to ' + this.industry + ' Expert'
    };
    
    const toneAdjustments = {
      'persuasive': headlineFormulas.benefit_driven,
      'urgent': headlineFormulas.urgency,
      'curious': headlineFormulas.curiosity_gap,
      'authoritative': headlineFormulas.social_proof,
      'conversational': headlineFormulas.story_based,
      'professional': headlineFormulas.problem_solution
    };
    
    return toneAdjustments[this.tone] || headlineFormulas.benefit_driven;
  }

  generateSubheadline() {
    const subheadlines = {
      'persuasive': 'Discover the proven system that\\'s helping ' + this.targetAudience + ' achieve breakthrough results without the usual struggle.',
      'urgent': 'Don\\'t let another day pass without the ' + this.industry + ' advantage your competitors are already using.',
      'curious': 'The surprising truth about ' + this.industry + ' that industry insiders don\\'t want you to know.',
      'authoritative': 'Evidence-based strategies that deliver measurable ' + this.industry + ' improvements for serious ' + this.targetAudience + '.',
      'conversational': 'Let me share the simple approach that changed everything for my ' + this.industry + ' journey.',
      'professional': 'A comprehensive solution designed specifically for ' + this.targetAudience + ' who demand real ' + this.industry + ' results.'
    };
    
    return subheadlines[this.tone] || subheadlines.persuasive;
  }

  generateSection(sectionType, framework, index) {
    const sectionContent = {
      'attention_grabber': this.generateAttentionSection(),
      'interest_builder': this.generateInterestSection(),
      'desire_creator': this.generateDesireSection(),
      'action_prompt': this.generateActionSection(),
      'problem_identification': this.generateProblemSection(),
      'pain_agitation': this.generateAgitationSection(),
      'solution_presentation': this.generateSolutionSection(),
      'current_state': this.generateCurrentStateSection(),
      'desired_state': this.generateDesiredStateSection(),
      'bridge_solution': this.generateBridgeSection(),
      'feature_list': this.generateFeatureSection(),
      'benefit_translation': this.generateBenefitSection(),
      'value_proposition': this.generateValueSection(),
      'story_setup': this.generateStorySetupSection(),
      'conflict_challenge': this.generateConflictSection(),
      'resolution_outcome': this.generateResolutionSection()
    };
    
    return sectionContent[sectionType] || 'Section content for ' + sectionType;
  }

  generateAttentionSection() {
    return 'Are you tired of watching other ' + this.targetAudience + ' succeed in ' + this.industry + ' while you struggle with the same old approaches? What if I told you there\\'s a proven method that\\'s been quietly transforming businesses just like yours?';
  }

  generateInterestSection() {
    return 'This isn\\'t another generic ' + this.industry + ' course or outdated strategy. It\\'s a complete system that addresses the real challenges ' + this.targetAudience + ' face today. The same system that\\'s helped over 10,000 professionals achieve breakthrough results in record time.';
  }

  generateDesireSection() {
    return 'Imagine waking up each day knowing that your ' + this.industry + ' strategy is working around the clock. Picture the confidence you\\'ll feel when colleagues ask for your secret to success. This is the transformation that awaits you.';
  }

  generateActionSection() {
    return 'The opportunity to transform your ' + this.industry + ' results starts right here, right now. Click the button below to secure your spot and join thousands of successful ' + this.targetAudience + ' who\\'ve already made the smart choice.';
  }

  generateProblemSection() {
    return 'Let\\'s be honest about the biggest challenge facing ' + this.targetAudience + ' today: despite working harder than ever, real ' + this.industry + ' success seems just out of reach. You\\'ve tried the conventional approaches, invested in tools and training, yet the breakthrough results remain elusive.';
  }

  generateAgitationSection() {
    return 'Every day you delay, the gap widens. Your competitors are moving ahead while you\\'re stuck with methods that worked yesterday but fail today. The frustration builds as you watch opportunities slip away, knowing you have the potential but lack the right strategy.';
  }

  generateSolutionSection() {
    return 'What if everything changed today? What if there was a proven solution specifically designed for ' + this.targetAudience + ' like you? A system that eliminates the guesswork and delivers the ' + this.industry + ' results you\\'ve been searching for.';
  }

  addEmotionalTriggers() {
    const triggers = [
      '\\n**Fear of Missing Out:** This exclusive opportunity won\\'t be available forever. Join the select group of ' + this.targetAudience + ' who refuse to settle for average results.\\n',
      '\\n**Social Belonging:** Join a community of like-minded ' + this.targetAudience + ' who are transforming their ' + this.industry + ' success together.\\n',
      '\\n**Achievement:** Experience the satisfaction of finally mastering ' + this.industry + ' and becoming the expert others turn to for advice.\\n'
    ];
    
    return triggers[Math.floor(Math.random() * triggers.length)];
  }

  ${formData.includeSocialProof ? `
  addSocialProof() {
    return '\\n**What Others Are Saying:**\\n\\n' +
      '\\"This completely transformed our ' + this.industry + ' approach. Results exceeded our expectations.\\" - Sarah M., ' + this.targetAudience + '\\n\\n' +
      '\\"Finally, a solution that actually works. Highly recommended!\\" - John D., Industry Expert\\n\\n' +
      '\\"The best investment we\\'ve made for our ' + this.industry + ' strategy.\\" - Lisa T., Business Owner\\n\\n';
  }` : ''}

  ${formData.includeScarcity ? `
  addScarcityElements() {
    return '\\n**Limited Time Offer:**\\n' +
      'Only 100 spots available this month. Once they\\'re gone, the next opportunity won\\'t be available until next quarter. Don\\'t let this be the decision you regret.\\n\\n' +
      '⏰ **Deadline:** Offer expires in 72 hours\\n' +
      '🎯 **Spots Remaining:** Less than 20 left\\n\\n';
  }` : ''}

  ${formData.includeGuarantees ? `
  addGuarantees() {
    return '\\n**100% Risk-Free Guarantee:**\\n' +
      'We\\'re so confident in this solution that we offer a complete 60-day money-back guarantee. If you don\\'t see measurable improvements in your ' + this.industry + ' results within 60 days, we\\'ll refund every penny. No questions asked.\\n\\n' +
      '✅ Full refund if not satisfied\\n' +
      '✅ Keep all bonus materials\\n' +
      '✅ 24/7 support included\\n\\n';
  }` : ''}

  generateCallToAction() {
    const ctas = {
      'conversions': '🚀 **START YOUR TRANSFORMATION TODAY**\\n\\nClick below to secure your spot and join the ' + this.targetAudience + ' who are already seeing incredible ' + this.industry + ' results.\\n\\n[GET INSTANT ACCESS NOW →]',
      'leads': '📋 **GET YOUR FREE STRATEGY GUIDE**\\n\\nDownload our exclusive ' + this.industry + ' blueprint used by successful ' + this.targetAudience + ' worldwide.\\n\\n[DOWNLOAD FREE GUIDE →]',
      'engagement': '💬 **JOIN THE CONVERSATION**\\n\\nShare your ' + this.industry + ' challenges and get personalized advice from our expert community.\\n\\n[JOIN NOW →]',
      'awareness': '🎯 **LEARN MORE ABOUT OUR APPROACH**\\n\\nDiscover how our proven ' + this.industry + ' methodology can transform your results.\\n\\n[EXPLORE SOLUTIONS →]'
    };
    
    return '\\n\\n' + (ctas[this.primaryGoal] || ctas.conversions);
  }

  estimateWordCount(copy) {
    return copy.split(/\\s+/).filter(word => word.length > 0).length;
  }

  calculatePersuasionScore(copy) {
    let score = 0;
    
    // Check for emotional words
    const emotionalWords = ['transform', 'breakthrough', 'exclusive', 'proven', 'guaranteed', 'secret', 'discover'];
    emotionalWords.forEach(word => {
      if (copy.toLowerCase().includes(word)) score += 5;
    });
    
    // Check for urgency indicators
    const urgencyWords = ['limited', 'expires', 'deadline', 'last chance', 'now', 'today'];
    urgencyWords.forEach(word => {
      if (copy.toLowerCase().includes(word)) score += 3;
    });
    
    // Check for social proof
    if (copy.includes('10,000+') || copy.includes('thousands')) score += 10;
    
    // Check for guarantees
    if (copy.includes('guarantee') || copy.includes('risk-free')) score += 8;
    
    return Math.min(score, 100); // Cap at 100
  }

  generateRecommendations() {
    const recommendations = [
      'Test different headlines with A/B testing',
      'Add more specific numbers and statistics',
      'Include customer testimonials with photos',
      'Create urgency with limited-time offers',
      'Use bullet points for better readability',
      'Add visual elements to break up text',
      'Include a FAQ section to address objections',
      'Optimize for mobile viewing',
      'Add trust badges and certifications',
      'Create multiple call-to-action buttons'
    ];
    
    return recommendations.slice(0, 5);
  }

  generateVariations(baseHeadline) {
    return [
      baseHeadline + ' (Limited Time)',
      'New: ' + baseHeadline,
      baseHeadline + ' - Guaranteed Results',
      'Exclusive: ' + baseHeadline,
      baseHeadline + ' That Actually Works'
    ];
  }

  analyzeCopyPerformance() {
    return 'Copy Performance Analysis\\n\\n' +
      'Project: ' + this.projectName + '\\n' +
      'Copy Type: ' + this.copyType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + '\\n' +
      'Target Audience: ' + this.targetAudience.charAt(0).toUpperCase() + this.targetAudience.slice(1) + '\\n' +
      'Primary Goal: ' + this.primaryGoal.charAt(0).toUpperCase() + this.primaryGoal.slice(1) + '\\n\\n' +
      'Framework Used: ' + this.selectOptimalFramework() + '\\n' +
      'Estimated Word Count: ' + this.estimateWordCount('Sample copy for analysis') + ' words\\n' +
      'Persuasion Score: 85/100\\n\\n' +
      'Optimization Recommendations:\\n' +
      this.generateRecommendations().map((rec, index) => (index + 1) + '. ' + rec).join('\\n') + '\\n\\n' +
      'A/B Testing Suggestions:\\n' +
      '• Test emotional vs. logical appeals\\n' +
      '• Compare short vs. long-form copy\\n' +
      '• Test different CTA button colors\\n' +
      '• Compare urgency vs. benefit-focused headlines\\n' +
      '• Test with and without social proof elements';
  }
}

// Initialize Copywriter
const copywriter = new ${formData.projectName.replace(/\s+/g, '')}Copywriter();

// Configuration Summary:
// Project: ${formData.projectName}
// Copy Type: ${formData.copyType}
// Target Audience: ${formData.targetAudience}
// Tone: ${formData.tone}
// Primary Goal: ${formData.primaryGoal}

// Generate copy
const generatedCopy = copywriter.generateCopy();
console.log('Generated Copy:', generatedCopy);

// Performance analysis
const performanceAnalysis = copywriter.analyzeCopyPerformance();
console.log('Performance Analysis:', performanceAnalysis);

// Generate headline variations
const headlineVariations = copywriter.generateVariations(generatedCopy.headline);
console.log('Headline Variations:', headlineVariations);

// API Key for enhanced features: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

/* 
FEATURES ENABLED:
✓ Multiple persuasion frameworks (AIDA, PAS, BAB, etc.)
✓ Audience-specific copy generation
✓ Tone-based content adaptation
✓ Goal-oriented optimization
✓ Persuasion score calculation
✓ A/B testing recommendations
✓ Copy performance analysis
${formData.includeEmotionalTriggers ? '✓ Emotional trigger integration' : ''}
${formData.includeScarcity ? '✓ Scarcity and urgency elements' : ''}
${formData.includeSocialProof ? '✓ Social proof integration' : ''}
${formData.includeGuarantees ? '✓ Risk reversal guarantees' : ''}

COPY TYPE: ${formData.copyType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
TARGET AUDIENCE: ${formData.targetAudience.charAt(0).toUpperCase() + formData.targetAudience.slice(1)}
TONE: ${formData.tone.charAt(0).toUpperCase() + formData.tone.slice(1)}
PRIMARY GOAL: ${formData.primaryGoal.charAt(0).toUpperCase() + formData.primaryGoal.slice(1)}
INDUSTRY: ${formData.industry.charAt(0).toUpperCase() + formData.industry.slice(1)}
*/`;

      setResult(copywriterConfig);
      setIsGenerating(false);
    }, 3500);
  };

  return (
    <AIToolLayout
      title="AI Copywriter"
      description="Generate high-converting sales copy and marketing content with proven persuasion frameworks, emotional triggers, and conversion optimization techniques."
      category="Content Creation"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project/Campaign Name
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
            placeholder="e.g., Product Launch Campaign"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        {/* Copy Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-accent" />
            Copy Type
          </label>
          <select
            value={formData.copyType}
            onChange={(e) => setFormData(prev => ({ ...prev, copyType: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="sales_page">Sales Page</option>
            <option value="landing_page">Landing Page</option>
            <option value="email_marketing">Email Marketing</option>
            <option value="product_description">Product Description</option>
            <option value="ads">Advertisements</option>
            <option value="case_study">Case Study</option>
            <option value="brochure">Brochure/Flyer</option>
            <option value="website_copy">Website Copy</option>
          </select>
        </div>

        {/* Target Audience & Industry */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              Target Audience
            </label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="professionals">Business Professionals</option>
              <option value="entrepreneurs">Entrepreneurs</option>
              <option value="executives">Executives</option>
              <option value="small_business">Small Business Owners</option>
              <option value="consumers">General Consumers</option>
              <option value="students">Students</option>
              <option value="retirees">Retirees</option>
              <option value="parents">Parents</option>
            </select>
          </div>

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
              <option value="retail">Retail</option>
              <option value="consulting">Consulting</option>
              <option value="real_estate">Real Estate</option>
              <option value="fitness">Fitness</option>
              <option value="beauty">Beauty</option>
              <option value="travel">Travel</option>
            </select>
          </div>
        </div>

        {/* Tone & Primary Goal */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent" />
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="persuasive">Persuasive</option>
              <option value="urgent">Urgent</option>
              <option value="curious">Curious</option>
              <option value="authoritative">Authoritative</option>
              <option value="conversational">Conversational</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              Primary Goal
            </label>
            <select
              value={formData.primaryGoal}
              onChange={(e) => setFormData(prev => ({ ...prev, primaryGoal: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="conversions">Drive Conversions</option>
              <option value="leads">Generate Leads</option>
              <option value="engagement">Increase Engagement</option>
              <option value="awareness">Build Awareness</option>
              <option value="retention">Improve Retention</option>
              <option value="education">Educate Audience</option>
            </select>
          </div>
        </div>

        {/* Copy Length */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Copy Length
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['short', 'medium', 'long'].map((length) => (
              <button
                key={length}
                onClick={() => setFormData(prev => ({ ...prev, copyLength: length }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.copyLength === length
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {length.charAt(0).toUpperCase() + length.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Persuasion Elements */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Persuasion Elements
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeEmotionalTriggers}
                onChange={(e) => setFormData(prev => ({ ...prev, includeEmotionalTriggers: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Emotional Triggers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeScarcity}
                onChange={(e) => setFormData(prev => ({ ...prev, includeScarcity: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Scarcity & Urgency</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeSocialProof}
                onChange={(e) => setFormData(prev => ({ ...prev, includeSocialProof: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Social Proof & Testimonials</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeGuarantees}
                onChange={(e) => setFormData(prev => ({ ...prev, includeGuarantees: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Risk Reversal & Guarantees</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 