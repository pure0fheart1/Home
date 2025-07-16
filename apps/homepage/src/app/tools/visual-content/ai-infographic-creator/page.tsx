'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { BarChart3, PieChart, Layout, Palette, Download, TrendingUp } from 'lucide-react';

export default function AIInfographicCreatorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    topic: '',
    infographicType: 'statistical',
    layout: 'vertical',
    colorTheme: 'professional',
    chartTypes: [] as string[],
    dataPoints: '5-10',
    targetAudience: 'professionals',
    includeInteractive: false,
    includeAnimations: false,
    socialMediaSizes: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const infographicConfig = `// AI Infographic Creator: ${formData.topic}
// Generated with AI Infographic Creator Builder

class InfographicCreator {
  constructor() {
    this.topic = '${formData.topic}';
    this.infographicType = '${formData.infographicType}';
    this.layout = '${formData.layout}';
    this.colorTheme = '${formData.colorTheme}';
    this.chartTypes = ${JSON.stringify(formData.chartTypes)};
    this.dataPoints = '${formData.dataPoints}';
    this.targetAudience = '${formData.targetAudience}';
    this.designElements = {};
    this.dataStructure = {};
    this.visualHierarchy = {};
    this.initialize();
  }

  initialize() {
    console.log('Initializing Infographic Creator for: ' + this.topic);
    this.analyzeContentStructure();
    this.setupDesignSystem();
    this.generateDataVisualization();
    this.createLayoutStructure();
    ${formData.includeInteractive ? 'this.addInteractiveElements();' : ''}
  }

  analyzeContentStructure() {
    const contentTypes = {
      'statistical': {
        structure: ['title', 'key_stats', 'chart_section', 'supporting_data', 'conclusion'],
        dataFocus: 'Numbers and percentages',
        visualElements: ['charts', 'icons', 'data_callouts'],
        storytelling: 'Data-driven narrative'
      },
      'process': {
        structure: ['title', 'overview', 'step_by_step', 'timeline', 'outcome'],
        dataFocus: 'Sequential information',
        visualElements: ['flowcharts', 'arrows', 'step_indicators'],
        storytelling: 'Process visualization'
      },
      'comparison': {
        structure: ['title', 'introduction', 'side_by_side', 'pros_cons', 'recommendation'],
        dataFocus: 'Comparative analysis',
        visualElements: ['vs_layouts', 'comparison_tables', 'rating_systems'],
        storytelling: 'Analytical comparison'
      },
      'timeline': {
        structure: ['title', 'overview', 'chronological_events', 'milestones', 'future_outlook'],
        dataFocus: 'Historical progression',
        visualElements: ['timeline_graphics', 'milestone_markers', 'period_indicators'],
        storytelling: 'Historical narrative'
      },
      'howto': {
        structure: ['title', 'introduction', 'step_instructions', 'tips_warnings', 'resources'],
        dataFocus: 'Instructional content',
        visualElements: ['step_numbers', 'illustrations', 'warning_boxes'],
        storytelling: 'Educational guidance'
      }
    };

    this.contentStructure = contentTypes[this.infographicType] || contentTypes['statistical'];
  }

  setupDesignSystem() {
    const colorThemes = {
      'professional': {
        primary: '#2563EB', // Blue
        secondary: '#64748B', // Slate
        accent: '#F59E0B', // Amber
        background: '#F8FAFC', // Light Gray
        text: '#1E293B', // Dark Slate
        success: '#10B981', // Emerald
        warning: '#EF4444' // Red
      },
      'vibrant': {
        primary: '#7C3AED', // Purple
        secondary: '#EC4899', // Pink
        accent: '#06B6D4', // Cyan
        background: '#FFFFFF', // White
        text: '#111827', // Gray 900
        success: '#22C55E', // Green
        warning: '#F97316' // Orange
      },
      'corporate': {
        primary: '#1F2937', // Gray 800
        secondary: '#6B7280', // Gray 500
        accent: '#FFD700', // Gold
        background: '#F9FAFB', // Gray 50
        text: '#374151', // Gray 700
        success: '#059669', // Emerald 600
        warning: '#DC2626' // Red 600
      },
      'modern': {
        primary: '#06B6D4', // Cyan
        secondary: '#8B5CF6', // Violet
        accent: '#F59E0B', // Amber
        background: '#FAFAFA', // Neutral 50
        text: '#0F172A', // Slate 900
        success: '#22D3EE', // Cyan 400
        warning: '#F472B6' // Pink 400
      }
    };

    this.colorPalette = colorThemes[this.colorTheme] || colorThemes['professional'];
    
    this.typography = {
      heading: {
        font: 'Inter',
        weight: '800',
        size: '32px',
        lineHeight: '1.2'
      },
      subheading: {
        font: 'Inter',
        weight: '600',
        size: '20px',
        lineHeight: '1.3'
      },
      body: {
        font: 'Inter',
        weight: '400',
        size: '14px',
        lineHeight: '1.5'
      },
      caption: {
        font: 'Inter',
        weight: '500',
        size: '12px',
        lineHeight: '1.4'
      }
    };
  }

  generateDataVisualization() {
    const chartConfigurations = {
      'bar_chart': {
        type: 'bar',
        description: 'Comparing quantities across categories',
        config: {
          orientation: this.layout === 'horizontal' ? 'horizontal' : 'vertical',
          colors: [this.colorPalette.primary, this.colorPalette.secondary, this.colorPalette.accent],
          animation: ${formData.includeAnimations} ? 'slide-up' : 'none',
          gridlines: true,
          dataLabels: true
        },
        bestFor: 'Category comparisons, survey results, performance metrics'
      },
      'pie_chart': {
        type: 'pie',
        description: 'Showing parts of a whole',
        config: {
          colors: [this.colorPalette.primary, this.colorPalette.secondary, this.colorPalette.accent, this.colorPalette.success],
          animation: ${formData.includeAnimations} ? 'rotate' : 'none',
          showPercentages: true,
          legendPosition: 'right'
        },
        bestFor: 'Market share, budget allocation, demographic breakdowns'
      },
      'line_chart': {
        type: 'line',
        description: 'Displaying trends over time',
        config: {
          colors: [this.colorPalette.primary, this.colorPalette.secondary],
          animation: ${formData.includeAnimations} ? 'draw' : 'none',
          pointStyle: 'circle',
          tension: 0.4,
          gridlines: true
        },
        bestFor: 'Time series data, growth trends, performance over time'
      },
      'donut_chart': {
        type: 'donut',
        description: 'Pie chart with center space for key metric',
        config: {
          colors: [this.colorPalette.primary, this.colorPalette.accent, this.colorPalette.success],
          animation: ${formData.includeAnimations} ? 'rotate' : 'none',
          centerText: 'Total: 100%',
          thickness: 0.6
        },
        bestFor: 'KPIs with breakdown, completion rates, satisfaction scores'
      },
      'progress_bar': {
        type: 'progress',
        description: 'Showing completion or achievement levels',
        config: {
          colors: [this.colorPalette.primary, this.colorPalette.success, this.colorPalette.accent],
          animation: ${formData.includeAnimations} ? 'fill' : 'none',
          showPercentage: true,
          height: 20
        },
        bestFor: 'Goal achievement, skill levels, completion rates'
      }
    };

    this.visualizations = {};
    this.chartTypes.forEach(chartType => {
      if (chartConfigurations[chartType]) {
        this.visualizations[chartType] = chartConfigurations[chartType];
      }
    });
  }

  createLayoutStructure() {
    const layouts = {
      'vertical': {
        width: 800,
        height: 2400,
        sections: [
          { type: 'header', height: 200, content: 'title_and_subtitle' },
          { type: 'intro', height: 300, content: 'key_statistics' },
          { type: 'main_chart', height: 600, content: 'primary_visualization' },
          { type: 'supporting', height: 400, content: 'secondary_data' },
          { type: 'insights', height: 300, content: 'key_takeaways' },
          { type: 'footer', height: 200, content: 'source_and_branding' }
        ],
        grid: '12-column system',
        spacing: '40px margins, 20px gutters'
      },
      'horizontal': {
        width: 1200,
        height: 800,
        sections: [
          { type: 'header', width: 1200, height: 150, content: 'title_section' },
          { type: 'left_panel', width: 400, height: 500, content: 'key_data' },
          { type: 'center_chart', width: 500, height: 500, content: 'main_visualization' },
          { type: 'right_panel', width: 300, height: 500, content: 'insights' },
          { type: 'footer', width: 1200, height: 150, content: 'conclusion' }
        ],
        grid: 'Flexible grid system',
        spacing: '30px margins, 20px gutters'
      },
      'square': {
        width: 1000,
        height: 1000,
        sections: [
          { type: 'header', height: 150, content: 'title_area' },
          { type: 'quad_1', width: 500, height: 400, content: 'main_chart' },
          { type: 'quad_2', width: 500, height: 400, content: 'supporting_data' },
          { type: 'quad_3', width: 500, height: 300, content: 'insights' },
          { type: 'quad_4', width: 500, height: 300, content: 'call_to_action' },
          { type: 'footer', height: 150, content: 'branding' }
        ],
        grid: 'Quadrant-based layout',
        spacing: '25px margins, 15px gutters'
      }
    };

    this.layoutStructure = layouts[this.layout] || layouts['vertical'];
  }

  ${formData.includeInteractive ? `
  addInteractiveElements() {
    this.interactiveFeatures = {
      hoverEffects: {
        charts: 'Hover to reveal detailed data points',
        icons: 'Hover for additional information',
        sections: 'Highlight related content on hover'
      },
      clickableElements: {
        chartSegments: 'Click to drill down into data',
        infoButtons: 'Click for expanded explanations',
        dataPoints: 'Click to view source data'
      },
      animations: {
        onLoad: 'Staggered content reveal',
        onScroll: 'Progressive disclosure',
        onInteraction: 'Smooth transitions and feedback'
      },
      responsiveDesign: {
        mobile: 'Touch-optimized interactions',
        tablet: 'Gesture-based navigation',
        desktop: 'Mouse and keyboard optimized'
      }
    };
  }` : ''}

  generateInfographicCode() {
    let svgCode = '<svg width="' + this.layoutStructure.width + '" height="' + this.layoutStructure.height + '" viewBox="0 0 ' + this.layoutStructure.width + ' ' + this.layoutStructure.height + '" xmlns="http://www.w3.org/2000/svg">\\n';
    
    // Background
    svgCode += '  <rect width="' + this.layoutStructure.width + '" height="' + this.layoutStructure.height + '" fill="' + this.colorPalette.background + '"/>\\n\\n';
    
    // Header Section
    svgCode += '  <!-- Header Section -->\\n';
    svgCode += '  <rect x="40" y="40" width="' + (this.layoutStructure.width - 80) + '" height="120" fill="' + this.colorPalette.primary + '" rx="10"/>\\n';
    svgCode += '  <text x="' + (this.layoutStructure.width / 2) + '" y="85" text-anchor="middle" fill="white" font-family="' + this.typography.heading.font + '" font-size="28" font-weight="' + this.typography.heading.weight + '">' + this.topic + '</text>\\n';
    svgCode += '  <text x="' + (this.layoutStructure.width / 2) + '" y="115" text-anchor="middle" fill="white" font-family="' + this.typography.subheading.font + '" font-size="16" font-weight="400">Key Insights and Data Visualization</text>\\n\\n';
    
    // Key Statistics Section
    svgCode += '  <!-- Key Statistics -->\\n';
    const statY = 200;
    const statWidth = (this.layoutStructure.width - 120) / 3;
    for (let i = 0; i < 3; i++) {
      const x = 60 + (i * (statWidth + 20));
      svgCode += '  <rect x="' + x + '" y="' + statY + '" width="' + statWidth + '" height="100" fill="white" stroke="' + this.colorPalette.secondary + '" stroke-width="2" rx="5"/>\\n';
      svgCode += '  <text x="' + (x + statWidth/2) + '" y="' + (statY + 35) + '" text-anchor="middle" fill="' + this.colorPalette.primary + '" font-family="' + this.typography.heading.font + '" font-size="24" font-weight="700">' + (85 + i * 5) + '%</text>\\n';
      svgCode += '  <text x="' + (x + statWidth/2) + '" y="' + (statY + 65) + '" text-anchor="middle" fill="' + this.colorPalette.text + '" font-family="' + this.typography.body.font + '" font-size="12">Key Metric ' + (i + 1) + '</text>\\n';
    }
    svgCode += '\\n';
    
    // Chart Section (simplified bar chart)
    svgCode += '  <!-- Main Chart Section -->\\n';
    const chartY = 350;
    const chartHeight = 200;
    const barWidth = 60;
    const barSpacing = 100;
    const chartData = [65, 78, 45, 82, 90];
    
    for (let i = 0; i < chartData.length; i++) {
      const x = 100 + (i * barSpacing);
      const barHeight = (chartData[i] / 100) * chartHeight;
      const barY = chartY + chartHeight - barHeight;
      
      svgCode += '  <rect x="' + x + '" y="' + barY + '" width="' + barWidth + '" height="' + barHeight + '" fill="' + this.colorPalette.primary + '" rx="3"/>\\n';
      svgCode += '  <text x="' + (x + barWidth/2) + '" y="' + (barY - 10) + '" text-anchor="middle" fill="' + this.colorPalette.text + '" font-family="' + this.typography.caption.font + '" font-size="12">' + chartData[i] + '%</text>\\n';
      svgCode += '  <text x="' + (x + barWidth/2) + '" y="' + (chartY + chartHeight + 20) + '" text-anchor="middle" fill="' + this.colorPalette.text + '" font-family="' + this.typography.body.font + '" font-size="11">Item ' + (i + 1) + '</text>\\n';
    }
    
    // Footer
    svgCode += '\\n  <!-- Footer -->\\n';
    svgCode += '  <text x="40" y="' + (this.layoutStructure.height - 30) + '" fill="' + this.colorPalette.secondary + '" font-family="' + this.typography.caption.font + '" font-size="10">Source: AI Generated Data | Created with AI Infographic Creator</text>\\n';
    
    svgCode += '</svg>';
    
    return svgCode;
  }

  generateSocialMediaVersions() {
    const socialSizes = {
      'instagram_post': { width: 1080, height: 1080, platform: 'Instagram Post' },
      'instagram_story': { width: 1080, height: 1920, platform: 'Instagram Story' },
      'twitter_post': { width: 1200, height: 675, platform: 'Twitter Post' },
      'linkedin_post': { width: 1200, height: 627, platform: 'LinkedIn Post' },
      'facebook_post': { width: 1200, height: 630, platform: 'Facebook Post' },
      'pinterest_pin': { width: 1000, height: 1500, platform: 'Pinterest Pin' }
    };

    const versions = {};
    Object.entries(socialSizes).forEach(([key, size]) => {
      versions[key] = {
        ...size,
        aspectRatio: (size.width / size.height).toFixed(2),
        optimizations: [
          'Larger text for mobile viewing',
          'Simplified data presentation',
          'High contrast for small screens',
          'Platform-specific color adjustments'
        ]
      };
    });

    return versions;
  }

  generateInfographicPackage() {
    return {
      mainInfographic: {
        format: 'SVG + PNG',
        dimensions: this.layoutStructure.width + 'x' + this.layoutStructure.height + 'px',
        colorMode: 'RGB',
        resolution: 'Vector scalable'
      },
      ${formData.socialMediaSizes ? `
      socialMediaVersions: this.generateSocialMediaVersions(),
      ` : ''}
      fileFormats: {
        vector: ['SVG', 'AI', 'EPS'],
        raster: ['PNG (high-res)', 'JPG', 'PDF'],
        web: ['SVG (optimized)', 'PNG 2x', 'WebP'],
        print: ['PDF (300 DPI)', 'PNG (300 DPI)']
      },
      designAssets: {
        colorPalette: this.colorPalette,
        typography: this.typography,
        iconSet: 'Custom icons matching design theme',
        chartElements: 'Reusable chart components'
      },
      usage: {
        presentations: 'Slide deck integration ready',
        websites: 'Responsive web optimization',
        print: 'High-resolution print quality',
        social: 'Platform-optimized versions'
      }
    };
  }

  generateDesignBreakdown() {
    return 'Infographic Design Analysis\\n\\n' +
      'Topic: ' + this.topic + '\\n' +
      'Type: ' + this.infographicType.charAt(0).toUpperCase() + this.infographicType.slice(1) + '\\n' +
      'Layout: ' + this.layout.charAt(0).toUpperCase() + this.layout.slice(1) + '\\n' +
      'Target Audience: ' + this.targetAudience.charAt(0).toUpperCase() + this.targetAudience.slice(1) + '\\n\\n' +
      
      'Design Approach:\\n' +
      '• Color Theme: ' + this.colorTheme.charAt(0).toUpperCase() + this.colorTheme.slice(1) + ' - chosen for audience appeal\\n' +
      '• Layout Structure: ' + this.layoutStructure.grid + '\\n' +
      '• Visual Hierarchy: Strategic use of size, color, and spacing\\n' +
      '• Data Presentation: ' + this.dataPoints + ' key data points for optimal comprehension\\n\\n' +
      
      'Content Structure:\\n' +
      this.contentStructure.structure.map((section, index) => 
        (index + 1) + '. ' + section.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      ).join('\\n') + '\\n\\n' +
      
      'Visual Elements:\\n' +
      this.contentStructure.visualElements.map(element => 
        '• ' + element.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      ).join('\\n') + '\\n\\n' +
      
      'Chart Types Utilized:\\n' +
      this.chartTypes.map(chart => 
        '• ' + chart.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + 
        ': ' + (this.visualizations[chart] ? this.visualizations[chart].bestFor : 'Data visualization')
      ).join('\\n') + '\\n\\n' +
      
      'Accessibility Features:\\n' +
      '✅ High contrast color combinations\\n' +
      '✅ Readable font sizes and weights\\n' +
      '✅ Clear visual hierarchy\\n' +
      '✅ Descriptive alt text ready\\n' +
      '✅ Colorblind-friendly palette\\n\\n' +
      
      'Optimization Recommendations:\\n' +
      '📱 Mobile-first design approach\\n' +
      '🎨 Consistent brand color usage\\n' +
      '📊 Clear data labeling\\n' +
      '⚡ Fast loading optimization\\n' +
      '🔄 Multi-platform compatibility\\n' +
      ${formData.includeInteractive ? "'⚡ Interactive elements for engagement\\n' +" : ''} +
      ${formData.includeAnimations ? "'🎬 Animation timing for better storytelling\\n' +" : ''} +
      '📈 Performance tracking ready';
  }
}

// Initialize Infographic Creator
const infographicCreator = new InfographicCreator();

// Generate SVG infographic
const svgInfographic = infographicCreator.generateInfographicCode();
console.log('SVG Infographic:', svgInfographic);

// Generate complete package
const infographicPackage = infographicCreator.generateInfographicPackage();
console.log('Infographic Package:', infographicPackage);

// Generate design breakdown
const designBreakdown = infographicCreator.generateDesignBreakdown();
console.log('Design Breakdown:', designBreakdown);

// API Key for enhanced features: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

/* 
FEATURES ENABLED:
✓ Multiple infographic types and layouts
✓ Professional color themes
✓ Comprehensive chart generation
✓ Social media optimization
✓ Vector and raster format export
✓ Typography system integration
✓ Data visualization best practices
${formData.includeInteractive ? '✓ Interactive element integration' : ''}
${formData.includeAnimations ? '✓ Animation and motion design' : ''}
${formData.socialMediaSizes ? '✓ Social media format variations' : ''}

TOPIC: ${formData.topic}
TYPE: ${formData.infographicType.charAt(0).toUpperCase() + formData.infographicType.slice(1)}
LAYOUT: ${formData.layout.charAt(0).toUpperCase() + formData.layout.slice(1)}
COLOR THEME: ${formData.colorTheme.charAt(0).toUpperCase() + formData.colorTheme.slice(1)}
CHART TYPES: ${formData.chartTypes.join(', ')}
TARGET AUDIENCE: ${formData.targetAudience.charAt(0).toUpperCase() + formData.targetAudience.slice(1)}
*/`;

      setResult(infographicConfig);
      setIsGenerating(false);
    }, 4000);
  };

  const handleChartTypeToggle = (chartType: string) => {
    setFormData(prev => ({
      ...prev,
      chartTypes: prev.chartTypes.includes(chartType)
        ? prev.chartTypes.filter(c => c !== chartType)
        : [...prev.chartTypes, chartType]
    }));
  };

  const availableChartTypes = [
    'bar_chart',
    'pie_chart',
    'line_chart',
    'donut_chart',
    'progress_bar',
    'area_chart'
  ];

  return (
    <AIToolLayout
      title="AI Infographic Creator"
      description="Design compelling data visualizations and infographics with professional layouts, interactive elements, and social media optimization for maximum impact."
      category="Visual Content & Design"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Infographic Topic
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
            placeholder="e.g., Social Media Marketing Statistics 2024"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        {/* Infographic Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Layout className="w-4 h-4 text-accent" />
            Infographic Type
          </label>
          <select
            value={formData.infographicType}
            onChange={(e) => setFormData(prev => ({ ...prev, infographicType: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="statistical">Statistical Data</option>
            <option value="process">Process Flow</option>
            <option value="comparison">Comparison</option>
            <option value="timeline">Timeline</option>
            <option value="howto">How-To Guide</option>
          </select>
        </div>

        {/* Layout & Color Theme */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Layout Orientation
            </label>
            <select
              value={formData.layout}
              onChange={(e) => setFormData(prev => ({ ...prev, layout: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
              <option value="square">Square</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4 text-accent" />
              Color Theme
            </label>
            <select
              value={formData.colorTheme}
              onChange={(e) => setFormData(prev => ({ ...prev, colorTheme: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="professional">Professional</option>
              <option value="vibrant">Vibrant</option>
              <option value="corporate">Corporate</option>
              <option value="modern">Modern</option>
            </select>
          </div>
        </div>

        {/* Chart Types */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent" />
            Chart Types
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableChartTypes.map((chartType) => (
              <label key={chartType} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.chartTypes.includes(chartType)}
                  onChange={() => handleChartTypeToggle(chartType)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {chartType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Data Points & Target Audience */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Number of Data Points
            </label>
            <select
              value={formData.dataPoints}
              onChange={(e) => setFormData(prev => ({ ...prev, dataPoints: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="3-5">3-5 Points (Simple)</option>
              <option value="5-10">5-10 Points (Medium)</option>
              <option value="10-15">10-15 Points (Detailed)</option>
              <option value="15+">15+ Points (Comprehensive)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Target Audience
            </label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="professionals">Business Professionals</option>
              <option value="students">Students & Academics</option>
              <option value="general">General Public</option>
              <option value="executives">Executives</option>
              <option value="marketers">Marketers</option>
              <option value="researchers">Researchers</option>
            </select>
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            Advanced Features
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeInteractive}
                onChange={(e) => setFormData(prev => ({ ...prev, includeInteractive: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Interactive Elements</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includeAnimations}
                onChange={(e) => setFormData(prev => ({ ...prev, includeAnimations: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Animations & Transitions</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.socialMediaSizes}
                onChange={(e) => setFormData(prev => ({ ...prev, socialMediaSizes: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <Download className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Social Media Size Variations</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 