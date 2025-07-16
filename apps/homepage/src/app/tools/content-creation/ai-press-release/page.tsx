'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Newspaper, Calendar, Users, TrendingUp, Building, Award } from 'lucide-react';

export default function AIPressReleasePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: '',
    newsType: 'product_launch',
    industry: 'technology',
    targetMedia: [] as string[],
    urgency: 'medium',
    includeQuotes: true,
    includeStats: true,
    includeContactInfo: true,
    includeBoilerplate: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const pressReleaseConfig = `// AI Press Release Generator: ${formData.companyName}
// Generated with AI Press Release Builder

class ${formData.companyName.replace(/\s+/g, '')}PressReleaseGenerator {
  constructor() {
    this.companyName = '${formData.companyName}';
    this.newsType = '${formData.newsType}';
    this.industry = '${formData.industry}';
    this.targetMedia = ${JSON.stringify(formData.targetMedia)};
    this.urgency = '${formData.urgency}';
    this.pressReleaseStructure = this.initializePRStructure();
    this.initialize();
  }

  initialize() {
    console.log('Initializing Press Release Generator for ' + this.companyName);
    this.setupPressReleaseFramework();
    this.generateMediaList();
    this.createDistributionStrategy();
  }

  initializePRStructure() {
    return {
      header: this.generateHeader(),
      headline: this.generateHeadline(),
      dateline: this.generateDateline(),
      leadParagraph: this.generateLeadParagraph(),
      bodyParagraphs: this.generateBodyParagraphs(),
      quotes: ${formData.includeQuotes} ? this.generateQuotes() : [],
      callToAction: this.generateCallToAction(),
      boilerplate: ${formData.includeBoilerplate} ? this.generateBoilerplate() : '',
      contactInfo: ${formData.includeContactInfo} ? this.generateContactInfo() : {}
    };
  }

  generateHeader() {
    const urgencyIndicators = {
      'low': '',
      'medium': 'FOR IMMEDIATE RELEASE',
      'high': 'FOR IMMEDIATE RELEASE - TIME SENSITIVE',
      'urgent': 'URGENT - FOR IMMEDIATE RELEASE'
    };
    return urgencyIndicators[this.urgency] || 'FOR IMMEDIATE RELEASE';
  }

  generateHeadline() {
    const headlines = {
      'product_launch': this.companyName + ' Launches Revolutionary New Product That Transforms ' + this.industry,
      'funding': this.companyName + ' Secures Major Funding Round to Accelerate ' + this.industry + ' Innovation',
      'partnership': this.companyName + ' Partners with Industry Leader to Expand ' + this.industry + ' Solutions',
      'acquisition': this.companyName + ' Acquires Leading ' + this.industry + ' Company to Strengthen Market Position',
      'milestone': this.companyName + ' Reaches Significant Milestone in ' + this.industry + ' Growth',
      'expansion': this.companyName + ' Expands Operations to Meet Growing ' + this.industry + ' Demand',
      'award': this.companyName + ' Receives Prestigious Industry Award for ' + this.industry + ' Excellence',
      'research': this.companyName + ' Publishes Groundbreaking Research on ' + this.industry + ' Trends',
      'executive': this.companyName + ' Appoints New Executive to Lead ' + this.industry + ' Division',
      'sustainability': this.companyName + ' Commits to Sustainable ' + this.industry + ' Practices'
    };

    return headlines[this.newsType] || headlines['product_launch'];
  }

  generateDateline() {
    const currentDate = new Date();
    const location = 'CITY, State'; // Would be customized based on company location
    return location + ' - ' + currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + ' - ';
  }

  generateLeadParagraph() {
    const leadTemplates = {
      'product_launch': this.companyName + ', a leading innovator in the ' + this.industry + ' sector, today announced the launch of its groundbreaking new product that promises to revolutionize how businesses approach ' + this.industry + '. This innovative solution addresses critical market needs and positions ' + this.companyName + ' at the forefront of industry transformation.',
      
      'funding': this.companyName + ', an emerging leader in ' + this.industry + ' solutions, today announced the successful completion of a significant funding round. The investment will accelerate product development, expand market reach, and strengthen the company\\'s position in the rapidly growing ' + this.industry + ' market.',
      
      'partnership': this.companyName + ', a pioneering force in ' + this.industry + ', today announced a strategic partnership with a major industry player. This collaboration will combine complementary strengths to deliver enhanced value to customers and drive innovation in the ' + this.industry + ' space.',
      
      'acquisition': this.companyName + ', a rapidly growing company in the ' + this.industry + ' sector, today announced the acquisition of a leading industry specialist. This strategic move strengthens ' + this.companyName + '\\'s market position and expands its comprehensive ' + this.industry + ' solution portfolio.',
      
      'milestone': this.companyName + ', a dynamic player in the ' + this.industry + ' industry, today announced reaching a significant business milestone. This achievement demonstrates the company\\'s strong growth trajectory and validates its innovative approach to ' + this.industry + ' solutions.',
      
      'award': this.companyName + ', a respected innovator in ' + this.industry + ', today announced receiving a prestigious industry award recognizing its excellence and contribution to advancing ' + this.industry + ' standards and practices.'
    };

    return leadTemplates[this.newsType] || leadTemplates['product_launch'];
  }

  generateBodyParagraphs() {
    const paragraphs = [];
    
    // Problem/Context paragraph
    paragraphs.push(
      'The ' + this.industry + ' industry has been experiencing significant transformation, with businesses increasingly seeking solutions that can adapt to evolving market demands. Traditional approaches have proven insufficient for addressing today\\'s complex challenges, creating a clear need for innovative alternatives that can deliver measurable results.'
    );
    
    // Solution/Innovation paragraph  
    paragraphs.push(
      'This latest development from ' + this.companyName + ' directly addresses these market needs through cutting-edge technology and proven methodologies. The solution incorporates advanced features designed specifically for ' + this.industry + ' professionals who demand both performance and reliability in their operational tools.'
    );
    
    // Impact/Benefits paragraph
    paragraphs.push(
      'Early adopters have reported significant improvements in efficiency, cost reduction, and overall performance metrics. The implementation has enabled organizations to streamline their ' + this.industry + ' processes while maintaining the highest standards of quality and compliance.'
    );
    
    ${formData.includeStats ? `
    // Statistics paragraph
    paragraphs.push(
      'According to recent industry research, companies implementing this type of solution have seen average improvements of 40% in operational efficiency, 25% reduction in costs, and 60% faster time-to-market for new initiatives. These metrics underscore the transformative potential of innovative ' + this.industry + ' solutions.'
    );
    ` : ''}
    
    return paragraphs;
  }

  ${formData.includeQuotes ? `
  generateQuotes() {
    return [
      {
        quote: '"This represents a significant milestone for ' + this.companyName + ' and the entire ' + this.industry + ' industry. We\\'re excited to bring this innovative solution to market and help our customers achieve unprecedented levels of success."',
        attribution: 'CEO, ' + this.companyName,
        title: 'Chief Executive Officer'
      },
      {
        quote: '"The response from our beta customers has been overwhelmingly positive. They\\'ve seen immediate improvements in their ' + this.industry + ' operations, which validates our approach and reinforces our commitment to innovation."',
        attribution: 'CTO, ' + this.companyName,
        title: 'Chief Technology Officer'
      },
      {
        quote: '"This solution addresses real challenges that ' + this.industry + ' professionals face every day. We\\'ve designed it from the ground up to be intuitive, powerful, and scalable for organizations of all sizes."',
        attribution: 'Head of Product, ' + this.companyName,
        title: 'Head of Product Development'
      }
    ];
  }` : ''}

  generateCallToAction() {
    const ctas = {
      'product_launch': 'For more information about this innovative ' + this.industry + ' solution, visit ' + this.companyName.toLowerCase().replace(/\\s+/g, '') + '.com or contact our sales team to schedule a demonstration.',
      'funding': 'To learn more about ' + this.companyName + '\\'s growth plans and investment opportunities, visit our investor relations page or contact our media team.',
      'partnership': 'For additional details about this strategic partnership and its benefits for customers, please visit our partnership announcement page.',
      'acquisition': 'For more information about this acquisition and its impact on our service offerings, please visit our corporate news section.',
      'milestone': 'To celebrate this milestone with us and learn about our journey, visit our company story page and follow us on social media.',
      'award': 'For more information about this award and our commitment to ' + this.industry + ' excellence, visit our recognition and awards section.'
    };

    return ctas[this.newsType] || ctas['product_launch'];
  }

  ${formData.includeBoilerplate ? `
  generateBoilerplate() {
    return 'About ' + this.companyName + '\\n\\n' +
      this.companyName + ' is a leading innovator in the ' + this.industry + ' space, dedicated to providing cutting-edge solutions that empower businesses to achieve their goals. Founded on the principles of innovation, quality, and customer success, ' + this.companyName + ' has established itself as a trusted partner for organizations seeking to transform their ' + this.industry + ' operations.\\n\\n' +
      'With a team of industry experts and a commitment to continuous innovation, ' + this.companyName + ' delivers solutions that combine advanced technology with practical functionality. The company serves clients across various industries and has built a reputation for excellence in product development, customer service, and thought leadership.\\n\\n' +
      'For more information about ' + this.companyName + ' and its comprehensive suite of ' + this.industry + ' solutions, visit www.' + this.companyName.toLowerCase().replace(/\\s+/g, '') + '.com';
  }` : ''}

  ${formData.includeContactInfo ? `
  generateContactInfo() {
    return {
      mediaContact: {
        name: 'Media Relations Team',
        title: 'Public Relations',
        company: this.companyName,
        email: 'media@' + this.companyName.toLowerCase().replace(/\\s+/g, '') + '.com',
        phone: '(555) 123-4567'
      },
      investorContact: {
        name: 'Investor Relations Team',
        title: 'Investor Relations',
        company: this.companyName,
        email: 'investors@' + this.companyName.toLowerCase().replace(/\\s+/g, '') + '.com',
        phone: '(555) 123-4568'
      }
    };
  }` : ''}

  generateFullPressRelease() {
    let pressRelease = '';
    
    // Header
    pressRelease += this.pressReleaseStructure.header + '\\n\\n';
    
    // Headline
    pressRelease += this.pressReleaseStructure.headline + '\\n\\n';
    
    // Dateline + Lead
    pressRelease += this.pressReleaseStructure.dateline + this.pressReleaseStructure.leadParagraph + '\\n\\n';
    
    // Body paragraphs
    this.pressReleaseStructure.bodyParagraphs.forEach(paragraph => {
      pressRelease += paragraph + '\\n\\n';
    });
    
    // Quotes
    if (this.pressReleaseStructure.quotes.length > 0) {
      this.pressReleaseStructure.quotes.forEach(quote => {
        pressRelease += quote.quote + '\\n';
        pressRelease += '— ' + quote.attribution + ', ' + quote.title + ', ' + this.companyName + '\\n\\n';
      });
    }
    
    // Call to Action
    pressRelease += this.pressReleaseStructure.callToAction + '\\n\\n';
    
    // Boilerplate
    if (this.pressReleaseStructure.boilerplate) {
      pressRelease += this.pressReleaseStructure.boilerplate + '\\n\\n';
    }
    
    // Contact Information
    if (this.pressReleaseStructure.contactInfo.mediaContact) {
      pressRelease += 'Media Contact:\\n';
      const media = this.pressReleaseStructure.contactInfo.mediaContact;
      pressRelease += media.name + '\\n';
      pressRelease += media.title + '\\n';
      pressRelease += media.company + '\\n';
      pressRelease += 'Email: ' + media.email + '\\n';
      pressRelease += 'Phone: ' + media.phone + '\\n\\n';
      
      if (this.pressReleaseStructure.contactInfo.investorContact) {
        pressRelease += 'Investor Contact:\\n';
        const investor = this.pressReleaseStructure.contactInfo.investorContact;
        pressRelease += investor.name + '\\n';
        pressRelease += investor.title + '\\n';
        pressRelease += investor.company + '\\n';
        pressRelease += 'Email: ' + investor.email + '\\n';
        pressRelease += 'Phone: ' + investor.phone + '\\n\\n';
      }
    }
    
    // End marker
    pressRelease += '###\\n\\n';
    pressRelease += 'Note: The ### symbol indicates the end of the press release.';
    
    return pressRelease;
  }

  generateMediaList() {
    const mediaContacts = {
      'technology': [
        'TechCrunch - tech@techcrunch.com',
        'Wired Magazine - news@wired.com',
        'Ars Technica - tips@arstechnica.com',
        'The Verge - tips@theverge.com',
        'ZDNet - editorial@zdnet.com'
      ],
      'business': [
        'Forbes - tips@forbes.com',
        'Business Insider - tips@businessinsider.com',
        'Harvard Business Review - editorial@hbr.org',
        'Fast Company - news@fastcompany.com',
        'Inc. Magazine - editors@inc.com'
      ],
      'finance': [
        'Wall Street Journal - tips@wsj.com',
        'Financial Times - news@ft.com',
        'Bloomberg - news@bloomberg.net',
        'CNBC - tips@cnbc.com',
        'Reuters - news@reuters.com'
      ],
      'healthcare': [
        'Healthcare IT News - news@healthcareitnews.com',
        'Modern Healthcare - news@modernhealthcare.com',
        'Becker\\'s Hospital Review - editorial@beckershospitalreview.com',
        'STAT News - tips@statnews.com',
        'Healthcare Dive - editorial@healthcaredive.com'
      ]
    };

    return mediaContacts[this.industry] || mediaContacts['business'];
  }

  generateDistributionStrategy() {
    return {
      primaryTargets: this.generateMediaList(),
      distributionChannels: [
        'Company website and press room',
        'PR Newswire distribution',
        'Industry-specific publications',
        'Social media platforms',
        'Email to media contacts',
        'Press release distribution services'
      ],
      timeline: {
        'preparation': 'T-5 days: Finalize press release and materials',
        'media_outreach': 'T-3 days: Send to key media contacts',
        'distribution': 'T-0 days: Wide distribution via services',
        'follow_up': 'T+1 day: Follow up with key journalists',
        'monitoring': 'T+7 days: Monitor coverage and engagement'
      },
      successMetrics: [
        'Number of media pickups',
        'Social media engagement',
        'Website traffic increase',
        'Brand mention sentiment',
        'Lead generation impact'
      ]
    };
  }

  generatePRAnalytics() {
    return 'Press Release Performance Analytics\\n\\n' +
      'Company: ' + this.companyName + '\\n' +
      'News Type: ' + this.newsType.replace('_', ' ').replace(/\\b\\w/g, l => l.toUpperCase()) + '\\n' +
      'Industry: ' + this.industry.charAt(0).toUpperCase() + this.industry.slice(1) + '\\n' +
      'Target Media: ' + this.targetMedia.join(', ') + '\\n' +
      'Urgency Level: ' + this.urgency.charAt(0).toUpperCase() + this.urgency.slice(1) + '\\n\\n' +
      
      'Distribution Strategy:\\n' +
      '• Primary media targets identified: ' + this.generateMediaList().length + ' outlets\\n' +
      '• Multi-channel distribution approach\\n' +
      '• 7-day monitoring and follow-up plan\\n\\n' +
      
      'Key Performance Indicators:\\n' +
      '📊 Media Coverage Metrics\\n' +
      '• Target: 10-15 media pickups\\n' +
      '• Quality score based on outlet authority\\n' +
      '• Geographic distribution tracking\\n\\n' +
      
      '📱 Digital Engagement\\n' +
      '• Social media mentions and shares\\n' +
      '• Website traffic from referrals\\n' +
      '• Email open and click rates\\n\\n' +
      
      '🎯 Business Impact\\n' +
      '• Lead generation attribution\\n' +
      '• Brand sentiment analysis\\n' +
      '• Competitive positioning impact\\n\\n' +
      
      'Optimization Recommendations:\\n' +
      '✅ Customize outreach for each media outlet\\n' +
      '✅ Include high-quality visuals and assets\\n' +
      '✅ Follow up within 24-48 hours\\n' +
      '✅ Monitor and respond to media inquiries\\n' +
      '✅ Amplify coverage through owned channels\\n' +
      '✅ Track long-term impact on brand metrics';
  }
}

// Initialize Press Release Generator
const prGenerator = new ${formData.companyName.replace(/\s+/g, '')}PressReleaseGenerator();

// Generate complete press release
const fullPressRelease = prGenerator.generateFullPressRelease();
console.log('Complete Press Release:', fullPressRelease);

// Generate distribution strategy
const distributionStrategy = prGenerator.generateDistributionStrategy();
console.log('Distribution Strategy:', distributionStrategy);

// Generate media list
const mediaList = prGenerator.generateMediaList();
console.log('Target Media List:', mediaList);

// Generate analytics report
const analytics = prGenerator.generatePRAnalytics();
console.log('PR Analytics:', analytics);

// API Key for enhanced features: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

/* 
FEATURES ENABLED:
✓ Professional press release structure
✓ Industry-specific targeting
✓ Multiple news type templates
✓ Media contact generation
✓ Distribution strategy planning
✓ Performance analytics tracking
✓ SEO-optimized content
${formData.includeQuotes ? '✓ Executive quotes integration' : ''}
${formData.includeStats ? '✓ Statistical data inclusion' : ''}
${formData.includeContactInfo ? '✓ Media contact information' : ''}
${formData.includeBoilerplate ? '✓ Company boilerplate text' : ''}

COMPANY: ${formData.companyName}
NEWS TYPE: ${formData.newsType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
INDUSTRY: ${formData.industry.charAt(0).toUpperCase() + formData.industry.slice(1)}
URGENCY: ${formData.urgency.charAt(0).toUpperCase() + formData.urgency.slice(1)}
TARGET MEDIA: ${formData.targetMedia.join(', ')}
*/`;

      setResult(pressReleaseConfig);
      setIsGenerating(false);
    }, 3500);
  };

  const handleTargetMediaToggle = (media: string) => {
    setFormData(prev => ({
      ...prev,
      targetMedia: prev.targetMedia.includes(media)
        ? prev.targetMedia.filter(m => m !== media)
        : [...prev.targetMedia, media]
    }));
  };

  const availableTargetMedia = [
    'tech_media',
    'business_media',
    'industry_publications',
    'local_news',
    'national_news',
    'trade_journals'
  ];

  return (
    <AIToolLayout
      title="AI Press Release Generator"
      description="Create professional press releases with proper structure, media targeting, and distribution strategies for maximum coverage and impact."
      category="Content Creation"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Building className="w-4 h-4 text-accent" />
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            placeholder="e.g., TechInnovate Solutions"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        {/* News Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-accent" />
            News Type
          </label>
          <select
            value={formData.newsType}
            onChange={(e) => setFormData(prev => ({ ...prev, newsType: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="product_launch">Product Launch</option>
            <option value="funding">Funding Announcement</option>
            <option value="partnership">Strategic Partnership</option>
            <option value="acquisition">Acquisition</option>
            <option value="milestone">Company Milestone</option>
            <option value="expansion">Business Expansion</option>
            <option value="award">Award Recognition</option>
            <option value="research">Research Publication</option>
            <option value="executive">Executive Appointment</option>
            <option value="sustainability">Sustainability Initiative</option>
          </select>
        </div>

        {/* Industry & Urgency */}
        <div className="grid grid-cols-2 gap-4">
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
              <option value="business">Business</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="energy">Energy</option>
              <option value="automotive">Automotive</option>
              <option value="aerospace">Aerospace</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              Urgency Level
            </label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Standard Release</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent/Breaking News</option>
            </select>
          </div>
        </div>

        {/* Target Media */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Target Media Types
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableTargetMedia.map((media) => (
              <label key={media} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.targetMedia.includes(media)}
                  onChange={() => handleTargetMediaToggle(media)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {media.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Press Release Elements */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-accent" />
            Include Elements
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeQuotes}
                onChange={(e) => setFormData(prev => ({ ...prev, includeQuotes: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Executive Quotes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeStats}
                onChange={(e) => setFormData(prev => ({ ...prev, includeStats: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Industry Statistics</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeContactInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, includeContactInfo: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Media Contact Information</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeBoilerplate}
                onChange={(e) => setFormData(prev => ({ ...prev, includeBoilerplate: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Company Boilerplate</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 