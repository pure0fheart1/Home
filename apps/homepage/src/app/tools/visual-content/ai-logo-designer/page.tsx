'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Palette, Layers, Type, Download, Sparkles, Eye } from 'lucide-react';

export default function AILogoDesignerPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'technology',
    style: 'modern',
    colorScheme: 'blue_gold',
    logoType: 'combination',
    symbolStyle: 'abstract',
    includeTagline: false,
    vectorFormats: true,
    brandGuidelines: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const logoDesignerConfig = `// AI Logo Designer: ${formData.companyName}
// Generated with AI Logo Designer Builder

class ${formData.companyName.replace(/\s+/g, '')}LogoDesigner {
  constructor() {
    this.companyName = '${formData.companyName}';
    this.industry = '${formData.industry}';
    this.style = '${formData.style}';
    this.colorScheme = '${formData.colorScheme}';
    this.logoType = '${formData.logoType}';
    this.symbolStyle = '${formData.symbolStyle}';
    this.includeTagline = ${formData.includeTagline};
    this.designElements = {};
    this.colorPalette = {};
    this.typography = {};
    this.initialize();
  }

  initialize() {
    console.log('Initializing Logo Designer for ' + this.companyName);
    this.analyzeIndustryTrends();
    this.generateColorPalette();
    this.selectTypography();
    this.createDesignConcepts();
    ${formData.brandGuidelines ? 'this.generateBrandGuidelines();' : ''}
  }

  analyzeIndustryTrends() {
    const industryCharacteristics = {
      'technology': {
        symbolTypes: ['circuit', 'network', 'geometric', 'abstract'],
        colorTrends: ['blue', 'purple', 'green', 'orange'],
        stylePreferences: ['modern', 'minimalist', 'futuristic'],
        conceptKeywords: ['innovation', 'connectivity', 'growth', 'precision']
      },
      'finance': {
        symbolTypes: ['arrow', 'graph', 'shield', 'geometric'],
        colorTrends: ['blue', 'green', 'navy', 'gold'],
        stylePreferences: ['professional', 'trustworthy', 'classic'],
        conceptKeywords: ['trust', 'growth', 'security', 'stability']
      },
      'healthcare': {
        symbolTypes: ['cross', 'heart', 'leaf', 'circle'],
        colorTrends: ['blue', 'green', 'red', 'teal'],
        stylePreferences: ['clean', 'caring', 'professional'],
        conceptKeywords: ['care', 'healing', 'life', 'wellness']
      },
      'education': {
        symbolTypes: ['book', 'graduation', 'tree', 'lightbulb'],
        colorTrends: ['blue', 'orange', 'green', 'purple'],
        stylePreferences: ['friendly', 'inspiring', 'accessible'],
        conceptKeywords: ['knowledge', 'growth', 'discovery', 'potential']
      },
      'retail': {
        symbolTypes: ['shopping', 'arrow', 'geometric', 'abstract'],
        colorTrends: ['red', 'orange', 'pink', 'purple'],
        stylePreferences: ['vibrant', 'approachable', 'trendy'],
        conceptKeywords: ['shopping', 'style', 'value', 'experience']
      }
    };

    this.industryInsights = industryCharacteristics[this.industry] || industryCharacteristics['technology'];
  }

  generateColorPalette() {
    const colorSchemes = {
      'blue_gold': {
        primary: '#1E40AF', // Deep Blue
        secondary: '#FFD700', // Gold
        accent: '#3B82F6', // Bright Blue
        neutral: '#64748B', // Slate Gray
        background: '#F8FAFC' // Light Gray
      },
      'green_navy': {
        primary: '#065F46', // Dark Green
        secondary: '#1E3A8A', // Navy Blue
        accent: '#10B981', // Emerald
        neutral: '#6B7280', // Gray
        background: '#F9FAFB' // Off White
      },
      'purple_silver': {
        primary: '#7C3AED', // Purple
        secondary: '#9CA3AF', // Silver
        accent: '#A855F7', // Light Purple
        neutral: '#4B5563', // Dark Gray
        background: '#F3F4F6' // Light Background
      },
      'red_black': {
        primary: '#DC2626', // Red
        secondary: '#111827', // Black
        accent: '#EF4444', // Bright Red
        neutral: '#6B7280', // Gray
        background: '#FFFFFF' // White
      },
      'orange_blue': {
        primary: '#EA580C', // Orange
        secondary: '#1D4ED8', // Blue
        accent: '#F97316', // Bright Orange
        neutral: '#64748B', // Slate
        background: '#FAFAFA' // Off White
      }
    };

    this.colorPalette = colorSchemes[this.colorScheme] || colorSchemes['blue_gold'];
  }

  selectTypography() {
    const typographyStyles = {
      'modern': {
        primaryFont: 'Inter',
        fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
        weight: '600',
        characteristics: 'Clean, contemporary, highly legible',
        usage: 'Perfect for tech and modern businesses'
      },
      'classic': {
        primaryFont: 'Playfair Display',
        fallbacks: ['Georgia', 'Times New Roman', 'serif'],
        weight: '700',
        characteristics: 'Elegant, traditional, sophisticated',
        usage: 'Ideal for luxury and professional services'
      },
      'bold': {
        primaryFont: 'Poppins',
        fallbacks: ['Helvetica', 'Arial', 'sans-serif'],
        weight: '800',
        characteristics: 'Strong, impactful, attention-grabbing',
        usage: 'Great for retail and consumer brands'
      },
      'friendly': {
        primaryFont: 'Nunito',
        fallbacks: ['Verdana', 'Arial', 'sans-serif'],
        weight: '700',
        characteristics: 'Approachable, warm, rounded',
        usage: 'Perfect for education and healthcare'
      },
      'minimalist': {
        primaryFont: 'Roboto',
        fallbacks: ['Arial', 'Helvetica', 'sans-serif'],
        weight: '500',
        characteristics: 'Clean, simple, functional',
        usage: 'Ideal for startups and tech companies'
      }
    };

    this.typography = typographyStyles[this.style] || typographyStyles['modern'];
  }

  createDesignConcepts() {
    const concepts = [];
    
    // Generate multiple logo concepts based on logoType
    if (this.logoType === 'text' || this.logoType === 'combination') {
      concepts.push(this.generateTextConcept());
    }
    
    if (this.logoType === 'symbol' || this.logoType === 'combination') {
      concepts.push(this.generateSymbolConcept());
    }
    
    if (this.logoType === 'combination') {
      concepts.push(this.generateCombinationConcept());
    }

    this.designConcepts = concepts;
    return concepts;
  }

  generateTextConcept() {
    return {
      type: 'text',
      concept: 'Wordmark Logo',
      description: 'Clean typography-based logo focusing on the company name "' + this.companyName + '"',
      elements: {
        text: this.companyName,
        font: this.typography.primaryFont,
        weight: this.typography.weight,
        color: this.colorPalette.primary,
        effects: this.style === 'modern' ? 'subtle gradient' : 'solid color',
        spacing: 'optimized letter spacing for readability'
      },
      variations: [
        'Horizontal layout',
        'Stacked layout', 
        'Single line with custom spacing'
      ]
    };
  }

  generateSymbolConcept() {
    const symbols = this.industryInsights.symbolTypes;
    const selectedSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    return {
      type: 'symbol',
      concept: 'Icon Mark',
      description: 'Abstract symbol representing ' + this.industryInsights.conceptKeywords.join(', '),
      elements: {
        symbolType: selectedSymbol,
        style: this.symbolStyle,
        primaryColor: this.colorPalette.primary,
        accentColor: this.colorPalette.secondary,
        geometry: 'Based on golden ratio proportions',
        scalability: 'Optimized for sizes from 16px to large format'
      },
      symbolMeaning: 'Represents ' + this.industryInsights.conceptKeywords[0] + ' and ' + this.industryInsights.conceptKeywords[1],
      applications: ['App icons', 'Favicon', 'Social media avatars', 'Letterheads']
    };
  }

  generateCombinationConcept() {
    return {
      type: 'combination',
      concept: 'Complete Brand Mark',
      description: 'Integrated symbol and text logo for maximum brand recognition',
      layout: {
        arrangement: 'Symbol left, text right',
        alternative: 'Symbol above, text below',
        spacing: 'Proportional spacing based on symbol height',
        alignment: 'Center aligned for balance'
      },
      elements: {
        symbol: 'Custom icon reflecting ' + this.industry + ' industry',
        text: this.companyName,
        typography: this.typography.primaryFont,
        colorHierarchy: 'Symbol in primary color, text in secondary color',
        sizing: 'Symbol height = 1.2x text height'
      },
      versatility: 'Works in horizontal, vertical, and stacked formats'
    };
  }

  generateSVGLogo() {
    // Simplified SVG generation for demonstration
    const svgWidth = 300;
    const svgHeight = 100;
    
    return '<svg width="' + svgWidth + '" height="' + svgHeight + '" viewBox="0 0 ' + svgWidth + ' ' + svgHeight + '" xmlns="http://www.w3.org/2000/svg">\\n' +
      '  <!-- Background -->\\n' +
      '  <rect width="' + svgWidth + '" height="' + svgHeight + '" fill="' + this.colorPalette.background + '"/>\\n' +
      '  \\n' +
      '  <!-- Symbol -->\\n' +
      '  <circle cx="50" cy="50" r="25" fill="' + this.colorPalette.primary + '" stroke="' + this.colorPalette.secondary + '" stroke-width="2"/>\\n' +
      '  <circle cx="50" cy="50" r="15" fill="' + this.colorPalette.secondary + '"/>\\n' +
      '  \\n' +
      '  <!-- Company Name -->\\n' +
      '  <text x="90" y="55" font-family="' + this.typography.primaryFont + ', sans-serif" font-size="24" font-weight="' + this.typography.weight + '" fill="' + this.colorPalette.primary + '">' + this.companyName + '</text>\\n' +
      '  \\n' +
      (this.includeTagline ? '  <!-- Tagline -->\\n  <text x="90" y="75" font-family="' + this.typography.primaryFont + ', sans-serif" font-size="12" fill="' + this.colorPalette.neutral + '">Your Industry Tagline</text>\\n' : '') +
      '</svg>';
  }

  ${formData.brandGuidelines ? `
  generateBrandGuidelines() {
    return {
      logoUsage: {
        minimumSize: '24px height for digital, 0.5 inch for print',
        clearSpace: 'Minimum clear space = 0.5x logo height on all sides',
        backgrounds: 'Use on light backgrounds. Dark version available for dark backgrounds',
        doNots: [
          'Do not stretch or distort the logo',
          'Do not change colors without approval',
          'Do not add effects or shadows',
          'Do not place on busy backgrounds'
        ]
      },
      colorGuidelines: {
        primary: {
          hex: this.colorPalette.primary,
          rgb: this.hexToRgb(this.colorPalette.primary),
          cmyk: this.hexToCmyk(this.colorPalette.primary),
          usage: 'Primary brand color for main logo elements'
        },
        secondary: {
          hex: this.colorPalette.secondary,
          rgb: this.hexToRgb(this.colorPalette.secondary),
          cmyk: this.hexToCmyk(this.colorPalette.secondary),
          usage: 'Accent color for highlights and secondary elements'
        }
      },
      typography: {
        logoFont: {
          name: this.typography.primaryFont,
          weight: this.typography.weight,
          usage: 'Logo and main headings only'
        },
        brandFont: {
          name: this.typography.primaryFont,
          weights: '400, 500, 600, 700',
          usage: 'All brand communications and marketing materials'
        }
      },
      applications: {
        digital: ['Website header', 'Social media profiles', 'Email signatures', 'App icons'],
        print: ['Business cards', 'Letterheads', 'Brochures', 'Signage'],
        merchandise: ['T-shirts', 'Mugs', 'Pens', 'Bags']
      }
    };
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? 
      'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')' : null;
  }

  hexToCmyk(hex) {
    // Simplified CMYK conversion for demonstration
    return 'C:50 M:30 Y:0 K:10';
  }` : ''}

  generateLogoPackage() {
    const logoPackage = {
      logoVariations: [
        {
          name: 'Primary Logo',
          format: 'Full color combination mark',
          usage: 'Main logo for all primary applications',
          files: ['logo-primary.svg', 'logo-primary.png', 'logo-primary.pdf']
        },
        {
          name: 'Secondary Logo',
          format: 'Single color version',
          usage: 'When color printing is limited',
          files: ['logo-secondary.svg', 'logo-secondary.png']
        },
        {
          name: 'Icon Only',
          format: 'Symbol without text',
          usage: 'App icons, favicons, social media avatars',
          files: ['icon.svg', 'icon.png', 'favicon.ico']
        },
        {
          name: 'Text Only',
          format: 'Wordmark without symbol',
          usage: 'Horizontal layouts, headers',
          files: ['wordmark.svg', 'wordmark.png']
        }
      ],
      fileFormats: {
        vector: ['SVG', 'AI', 'EPS', 'PDF'],
        raster: ['PNG (transparent)', 'JPG', 'PNG (high-res)'],
        web: ['SVG (optimized)', 'PNG 2x', 'WebP'],
        print: ['PDF (vector)', 'EPS', 'PNG 300dpi']
      },
      sizeVariations: [
        'Favicon (16x16, 32x32)',
        'Small (64x64)',
        'Medium (128x128, 256x256)',
        'Large (512x512, 1024x1024)',
        'Print ready (vector scalable)'
      ]
    };

    return logoPackage;
  }

  generateDesignRationale() {
    return 'Logo Design Rationale for ' + this.companyName + '\\n\\n' +
      'Industry Context:\\n' +
      'The ' + this.industry + ' industry values ' + this.industryInsights.conceptKeywords.join(', ') + '. Our logo design reflects these core values while establishing a distinctive brand presence.\\n\\n' +
      
      'Design Strategy:\\n' +
      '• Style: ' + this.style.charAt(0).toUpperCase() + this.style.slice(1) + ' - chosen to convey professionalism and innovation\\n' +
      '• Color Scheme: ' + this.colorScheme.replace('_', ' & ') + ' - represents trust, growth, and premium quality\\n' +
      '• Logo Type: ' + this.logoType.charAt(0).toUpperCase() + this.logoType.slice(1) + ' - provides maximum versatility and brand recognition\\n\\n' +
      
      'Color Psychology:\\n' +
      '• Primary Color (' + this.colorPalette.primary + '): Conveys trust, stability, and professionalism\\n' +
      '• Secondary Color (' + this.colorPalette.secondary + '): Represents innovation, premium quality, and success\\n' +
      '• Supporting colors create visual hierarchy and brand consistency\\n\\n' +
      
      'Typography Rationale:\\n' +
      '• Font Choice: ' + this.typography.primaryFont + ' - ' + this.typography.characteristics + '\\n' +
      '• Weight: ' + this.typography.weight + ' - ensures excellent readability across all applications\\n' +
      '• ' + this.typography.usage + '\\n\\n' +
      
      'Scalability & Versatility:\\n' +
      '• Vector-based design ensures crisp appearance at any size\\n' +
      '• Works effectively in color, single color, and black & white\\n' +
      '• Optimized for digital screens and print applications\\n' +
      '• Clear space guidelines maintain logo integrity\\n\\n' +
      
      'Brand Applications:\\n' +
      '• Digital: Website, social media, email signatures, app icons\\n' +
      '• Print: Business cards, letterheads, brochures, signage\\n' +
      '• Merchandise: Apparel, promotional items, packaging\\n' +
      '• Environmental: Office signage, trade show displays, vehicle graphics';
  }
}

// Initialize Logo Designer
const logoDesigner = new ${formData.companyName.replace(/\s+/g, '')}LogoDesigner();

// Generate design concepts
const designConcepts = logoDesigner.createDesignConcepts();
console.log('Logo Concepts:', designConcepts);

// Generate SVG logo
const svgLogo = logoDesigner.generateSVGLogo();
console.log('SVG Logo Code:', svgLogo);

// Generate complete logo package
const logoPackage = logoDesigner.generateLogoPackage();
console.log('Logo Package:', logoPackage);

// Generate design rationale
const designRationale = logoDesigner.generateDesignRationale();
console.log('Design Rationale:', designRationale);

${formData.brandGuidelines ? `
// Generate brand guidelines
const brandGuidelines = logoDesigner.generateBrandGuidelines();
console.log('Brand Guidelines:', brandGuidelines);
` : ''}

// API Key for enhanced features: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

/* 
FEATURES ENABLED:
✓ Industry-specific logo design
✓ Multiple logo concepts and variations
✓ Professional color palette generation
✓ Typography selection and pairing
✓ SVG code generation
✓ Complete logo package creation
✓ Scalable vector formats
${formData.vectorFormats ? '✓ Vector format optimization' : ''}
${formData.brandGuidelines ? '✓ Comprehensive brand guidelines' : ''}
${formData.includeTagline ? '✓ Tagline integration' : ''}

COMPANY: ${formData.companyName}
INDUSTRY: ${formData.industry.charAt(0).toUpperCase() + formData.industry.slice(1)}
STYLE: ${formData.style.charAt(0).toUpperCase() + formData.style.slice(1)}
COLOR SCHEME: ${formData.colorScheme.replace('_', ' & ')}
LOGO TYPE: ${formData.logoType.charAt(0).toUpperCase() + formData.logoType.slice(1)}
SYMBOL STYLE: ${formData.symbolStyle.charAt(0).toUpperCase() + formData.symbolStyle.slice(1)}
*/`;

      setResult(logoDesignerConfig);
      setIsGenerating(false);
    }, 4000);
  };

  return (
    <AIToolLayout
      title="AI Logo Designer"
      description="Create professional logos with industry-specific design, color psychology, and complete brand packages. Generate vector logos with comprehensive brand guidelines."
      category="Visual Content & Design"
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
            placeholder="e.g., TechFlow Innovations"
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
            <option value="retail">Retail</option>
            <option value="consulting">Consulting</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="real_estate">Real Estate</option>
            <option value="food_beverage">Food & Beverage</option>
            <option value="automotive">Automotive</option>
          </select>
        </div>

        {/* Style & Color Scheme */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent" />
              Logo Style
            </label>
            <select
              value={formData.style}
              onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="bold">Bold</option>
              <option value="friendly">Friendly</option>
              <option value="minimalist">Minimalist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4 text-accent" />
              Color Scheme
            </label>
            <select
              value={formData.colorScheme}
              onChange={(e) => setFormData(prev => ({ ...prev, colorScheme: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="blue_gold">Blue & Gold</option>
              <option value="green_navy">Green & Navy</option>
              <option value="purple_silver">Purple & Silver</option>
              <option value="red_black">Red & Black</option>
              <option value="orange_blue">Orange & Blue</option>
            </select>
          </div>
        </div>

        {/* Logo Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Type className="w-4 h-4 text-accent" />
            Logo Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['text', 'symbol', 'combination'].map((type) => (
              <button
                key={type}
                onClick={() => setFormData(prev => ({ ...prev, logoType: type }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.logoType === type
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Symbol Style */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            Symbol Style
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['abstract', 'geometric', 'organic', 'iconic'].map((style) => (
              <button
                key={style}
                onClick={() => setFormData(prev => ({ ...prev, symbolStyle: style }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.symbolStyle === style
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Additional Features
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeTagline}
                onChange={(e) => setFormData(prev => ({ ...prev, includeTagline: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Include Tagline Space</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.vectorFormats}
                onChange={(e) => setFormData(prev => ({ ...prev, vectorFormats: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <Download className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Generate Vector Formats (SVG, AI, EPS)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.brandGuidelines}
                onChange={(e) => setFormData(prev => ({ ...prev, brandGuidelines: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Complete Brand Guidelines</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 