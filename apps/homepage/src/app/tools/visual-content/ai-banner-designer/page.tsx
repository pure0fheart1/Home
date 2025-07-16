'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

interface BannerConfig {
  type: string;
  purpose: string;
  platform: string;
  industry: string;
  style: string;
  colorScheme: string;
  dimensions: string;
  ctaText: string;
  headline: string;
  subheadline: string;
  brandName: string;
  logoPosition: string;
  animation: string;
  targetAudience: string;
  seasonalTheme: string;
}

const bannerTypes = [
  'Web Banner', 'Display Ad', 'Social Media Banner', 'YouTube Banner',
  'Email Header', 'Website Header', 'Promotional Banner', 'Event Banner',
  'Product Banner', 'Sale Banner', 'Announcement Banner', 'Hero Banner'
];

const purposes = [
  'Brand Awareness', 'Product Promotion', 'Event Marketing', 'Lead Generation',
  'Sales Conversion', 'Traffic Generation', 'App Download', 'Newsletter Signup',
  'Social Media Growth', 'Customer Retention', 'Holiday Campaign', 'New Launch'
];

const platforms = [
  'Website', 'Google Ads', 'Facebook Ads', 'Instagram', 'YouTube',
  'LinkedIn', 'Twitter', 'Pinterest', 'TikTok', 'Snapchat',
  'Email Campaign', 'Mobile App', 'Print Media', 'Digital Signage'
];

const industries = [
  'Technology', 'E-commerce', 'Healthcare', 'Education', 'Finance',
  'Real Estate', 'Food & Beverage', 'Fashion', 'Travel', 'Automotive',
  'Entertainment', 'Sports', 'Beauty', 'Home & Garden', 'B2B Services'
];

const designStyles = [
  'Modern Minimalist', 'Bold & Vibrant', 'Professional Corporate',
  'Creative Artistic', 'Elegant Luxury', 'Playful & Fun',
  'Clean & Simple', 'Dark & Moody', 'Retro Vintage',
  'Gradient Modern', 'Hand-drawn Organic', 'Geometric Abstract'
];

const colorSchemes = [
  'Brand Colors', 'Complementary', 'Monochromatic', 'Triadic',
  'Split Complementary', 'Analogous', 'High Contrast', 'Pastel Soft',
  'Bold Primary', 'Earth Tones', 'Neon Bright', 'Black & White'
];

const dimensionPresets = [
  'Custom', 'Leaderboard (728x90)', 'Banner (468x60)', 'Rectangle (300x250)',
  'Skyscraper (160x600)', 'Square (250x250)', 'Large Rectangle (336x280)',
  'Mobile Banner (320x50)', 'Wide Skyscraper (300x600)', 'Half Page (300x600)',
  'Facebook Cover (820x312)', 'Twitter Header (1500x500)', 'LinkedIn Banner (1584x396)',
  'YouTube Channel Art (2560x1440)', 'Instagram Story (1080x1920)'
];

const logoPositions = [
  'Top Left', 'Top Right', 'Top Center', 'Bottom Left',
  'Bottom Right', 'Bottom Center', 'Center', 'Left Side',
  'Right Side', 'No Logo'
];

const animationTypes = [
  'Static', 'Fade In', 'Slide In', 'Zoom In', 'Bounce',
  'Rotate', 'Pulse', 'Flip', 'Shake', 'Glow Effect',
  'Parallax', 'Hover Effects', 'Scroll Animation', 'Auto-play Video'
];

const targetAudiences = [
  'General Public', 'Young Adults (18-25)', 'Adults (26-40)', 'Middle-aged (41-55)',
  'Seniors (55+)', 'Professionals', 'Students', 'Parents', 'Tech Enthusiasts',
  'Business Owners', 'Entrepreneurs', 'Creatives', 'Athletes', 'Gamers'
];

const seasonalThemes = [
  'None', 'Spring Fresh', 'Summer Bright', 'Autumn Warm', 'Winter Cool',
  'Holiday Season', 'Back to School', 'Black Friday', 'New Year',
  'Valentine\'s Day', 'Easter', 'Halloween', 'Thanksgiving', 'Christmas'
];

export default function AIBannerDesigner() {
  const [config, setConfig] = useState<BannerConfig>({
    type: '',
    purpose: '',
    platform: '',
    industry: '',
    style: '',
    colorScheme: '',
    dimensions: '',
    ctaText: '',
    headline: '',
    subheadline: '',
    brandName: '',
    logoPosition: '',
    animation: '',
    targetAudience: '',
    seasonalTheme: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBanners, setGeneratedBanners] = useState<string[]>([]);

  const handleInputChange = (field: keyof BannerConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const generateBanners = async () => {
    if (!config.type || !config.purpose || !config.headline) {
      alert('Please fill in the required fields: Banner Type, Purpose, and Headline');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockBanners = [
        `Generated ${config.type} for ${config.purpose} - Version A`,
        `Generated ${config.type} for ${config.purpose} - Version B`,
        `Generated ${config.type} for ${config.purpose} - Version C`
      ];
      setGeneratedBanners(mockBanners);
      setIsGenerating(false);
    }, 3000);
  };

  const configSections = [
    {
      title: "Banner Specifications",
      fields: [
        { label: "Banner Type*", field: "type" as keyof BannerConfig, options: bannerTypes },
        { label: "Purpose*", field: "purpose" as keyof BannerConfig, options: purposes },
        { label: "Platform", field: "platform" as keyof BannerConfig, options: platforms },
        { label: "Dimensions", field: "dimensions" as keyof BannerConfig, options: dimensionPresets }
      ]
    },
    {
      title: "Content & Messaging",
      fields: [
        { label: "Headline*", field: "headline" as keyof BannerConfig, type: "text" },
        { label: "Subheadline", field: "subheadline" as keyof BannerConfig, type: "text" },
        { label: "Call-to-Action Text", field: "ctaText" as keyof BannerConfig, type: "text" },
        { label: "Brand Name", field: "brandName" as keyof BannerConfig, type: "text" }
      ]
    },
    {
      title: "Design & Style",
      fields: [
        { label: "Industry", field: "industry" as keyof BannerConfig, options: industries },
        { label: "Design Style", field: "style" as keyof BannerConfig, options: designStyles },
        { label: "Color Scheme", field: "colorScheme" as keyof BannerConfig, options: colorSchemes },
        { label: "Logo Position", field: "logoPosition" as keyof BannerConfig, options: logoPositions }
      ]
    },
    {
      title: "Advanced Options",
      fields: [
        { label: "Animation Type", field: "animation" as keyof BannerConfig, options: animationTypes },
        { label: "Target Audience", field: "targetAudience" as keyof BannerConfig, options: targetAudiences },
        { label: "Seasonal Theme", field: "seasonalTheme" as keyof BannerConfig, options: seasonalThemes }
      ]
    }
  ];

  const features = [
    "Platform-optimized banner dimensions",
    "Industry-specific design templates",
    "Advanced typography and layout options",
    "Brand guideline compliance",
    "A/B testing variations",
    "Animation and interactive elements",
    "Multi-format export (PNG, JPG, GIF, SVG)",
    "Social media optimization",
    "Performance analytics integration",
    "Conversion tracking setup"
  ];

  const useCases = [
    "Create display advertising campaigns",
    "Design social media banners",
    "Generate email header graphics",
    "Build website promotional banners",
    "Develop event marketing materials",
    "Design product launch campaigns",
    "Create seasonal promotional content",
    "Generate A/B testing variations"
  ];

  return (
    <AIToolLayout
      title="AI Banner Designer"
      description="Create professional, high-converting banners with AI-powered design optimization for any platform or campaign."
      category="Visual Content"
      onGenerate={generateBanners}
      isGenerating={isGenerating}
      result={generatedBanners.length > 0 ? generatedBanners.join('\n\n') : ''}
    >
      <div className="space-y-6">
        {configSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                                     {'type' in field && field.type === 'text' ? (
                     <input
                       type="text"
                       value={config[field.field]}
                       onChange={(e) => handleInputChange(field.field, e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder={`Enter ${field.label.toLowerCase()}`}
                     />
                   ) : (
                     <select
                       value={config[field.field]}
                       onChange={(e) => handleInputChange(field.field, e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                       <option value="">Select {field.label}</option>
                       {'options' in field && field.options?.map((option: string, optionIndex: number) => (
                         <option key={optionIndex} value={option}>
                           {option}
                         </option>
                       ))}
                     </select>
                   )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 