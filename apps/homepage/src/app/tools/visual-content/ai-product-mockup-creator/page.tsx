'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIProductMockupCreatorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    productType: 'digital_device',
    mockupStyle: 'modern',
    deviceType: 'smartphone',
    environment: 'minimal',
    perspective: 'front_view',
    backgroundStyle: 'clean',
    lightingSetup: 'soft',
    colorScheme: 'neutral',
    includeReflections: true,
    includeShadows: true,
    includeContext: false,
    brandingLevel: 'subtle',
    outputFormat: 'high_res',
    quantity: 'single',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const productMockupConfig = `// AI Product Mockup Creator: ${formData.productType} ${formData.deviceType}
// Generated with AI Product Mockup Creator Builder

class ProductMockupCreator {
  constructor() {
    this.productType = '${formData.productType}';
    this.mockupStyle = '${formData.mockupStyle}';
    this.deviceType = '${formData.deviceType}';
    this.environment = '${formData.environment}';
    this.perspective = '${formData.perspective}';
    this.backgroundStyle = '${formData.backgroundStyle}';
    this.lightingSetup = '${formData.lightingSetup}';
    this.colorScheme = '${formData.colorScheme}';
    this.includeReflections = ${formData.includeReflections};
    this.includeShadows = ${formData.includeShadows};
    this.includeContext = ${formData.includeContext};
    this.brandingLevel = '${formData.brandingLevel}';
    this.outputFormat = '${formData.outputFormat}';
    this.quantity = '${formData.quantity}';
    this.mockupSpecs = {};
    this.initialize();
  }

  initialize() {
    console.log('Initializing Product Mockup Creator');
    this.setupMockupSpecifications();
    this.configureDeviceProperties();
    this.setupLightingAndEnvironment();
    this.generateMockups();
  }

  setupMockupSpecifications() {
    const specifications = {
      digital_device: {
        smartphone: {
          dimensions: { width: 375, height: 812 },
          aspect_ratio: '9:19.5',
          screen_bezel: 'minimal',
          common_models: ['iPhone 14', 'Samsung Galaxy S23', 'Google Pixel 7']
        },
        tablet: {
          dimensions: { width: 1024, height: 1366 },
          aspect_ratio: '3:4',
          screen_bezel: 'medium',
          common_models: ['iPad Pro', 'Surface Pro', 'Galaxy Tab']
        },
        laptop: {
          dimensions: { width: 1920, height: 1080 },
          aspect_ratio: '16:9',
          screen_bezel: 'thin',
          common_models: ['MacBook Pro', 'Dell XPS', 'Surface Laptop']
        },
        desktop: {
          dimensions: { width: 2560, height: 1440 },
          aspect_ratio: '16:9',
          screen_bezel: 'minimal',
          common_models: ['iMac', 'Studio Display', 'Dell Monitor']
        },
        smartwatch: {
          dimensions: { width: 368, height: 448 },
          aspect_ratio: '1:1.2',
          screen_bezel: 'curved',
          common_models: ['Apple Watch', 'Galaxy Watch', 'Pixel Watch']
        }
      },
      physical_product: {
        packaging: {
          types: ['box', 'bottle', 'bag', 'tube', 'jar'],
          materials: ['cardboard', 'glass', 'plastic', 'metal'],
          finishes: ['matte', 'glossy', 'textured', 'metallic']
        },
        apparel: {
          types: ['t-shirt', 'hoodie', 'cap', 'bag', 'shoes'],
          views: ['front', 'back', 'side', 'detail'],
          contexts: ['model', 'flat_lay', 'hanging', 'lifestyle']
        },
        print_media: {
          types: ['business_card', 'flyer', 'poster', 'brochure', 'magazine'],
          formats: ['portrait', 'landscape', 'square'],
          contexts: ['desk', 'wall', 'hand', 'stack']
        }
      }
    };
    
    this.mockupSpecs = specifications[this.productType]?.[this.deviceType] || 
                       specifications.digital_device.smartphone;
    console.log('Mockup specifications:', this.mockupSpecs);
  }

  configureDeviceProperties() {
    const deviceConfig = {
      material: this.selectMaterial(),
      color: this.selectDeviceColor(),
      finish: this.selectFinish(),
      wear_level: 'new',
      screen_content: 'placeholder',
      branding_visibility: this.brandingLevel
    };
    
    this.deviceProperties = deviceConfig;
    console.log('Device properties configured:', deviceConfig);
  }

  selectMaterial() {
    const materials = {
      smartphone: ['aluminum', 'glass', 'ceramic', 'titanium'],
      tablet: ['aluminum', 'magnesium', 'plastic'],
      laptop: ['aluminum', 'magnesium', 'carbon_fiber'],
      desktop: ['aluminum', 'plastic', 'glass'],
      smartwatch: ['aluminum', 'stainless_steel', 'titanium']
    };
    
    const deviceMaterials = materials[this.deviceType] || materials.smartphone;
    return deviceMaterials[0]; // Default to first material
  }

  selectDeviceColor() {
    const colorSchemes = {
      neutral: ['space_gray', 'silver', 'black', 'white'],
      vibrant: ['blue', 'red', 'green', 'purple', 'yellow'],
      premium: ['gold', 'rose_gold', 'graphite', 'sierra_blue'],
      monochrome: ['black', 'white', 'gray']
    };
    
    return colorSchemes[this.colorScheme] || colorSchemes.neutral;
  }

  selectFinish() {
    const finishes = {
      modern: 'matte',
      premium: 'brushed_metal',
      clean: 'glossy',
      industrial: 'anodized',
      minimal: 'satin'
    };
    
    return finishes[this.mockupStyle] || finishes.modern;
  }

  setupLightingAndEnvironment() {
    const lightingSetups = {
      soft: {
        primary_light: { type: 'softbox', intensity: 80, angle: 45 },
        fill_light: { type: 'umbrella', intensity: 40, angle: -30 },
        rim_light: { type: 'spot', intensity: 60, angle: 135 },
        ambient: 20
      },
      dramatic: {
        primary_light: { type: 'spot', intensity: 100, angle: 60 },
        fill_light: { type: 'reflector', intensity: 30, angle: -45 },
        rim_light: { type: 'strip', intensity: 80, angle: 120 },
        ambient: 10
      },
      natural: {
        primary_light: { type: 'window', intensity: 70, angle: 30 },
        fill_light: { type: 'bounce', intensity: 35, angle: -20 },
        rim_light: { type: 'window', intensity: 50, angle: 150 },
        ambient: 25
      },
      studio: {
        primary_light: { type: 'beauty_dish', intensity: 85, angle: 45 },
        fill_light: { type: 'softbox', intensity: 45, angle: -30 },
        rim_light: { type: 'grid_spot', intensity: 70, angle: 135 },
        ambient: 15
      }
    };
    
    this.lightingConfig = lightingSetups[this.lightingSetup] || lightingSetups.soft;
    
    const environments = {
      minimal: {
        background: 'seamless_white',
        surface: 'reflective_white',
        props: 'none',
        depth_of_field: 'shallow'
      },
      lifestyle: {
        background: 'home_office',
        surface: 'wooden_desk',
        props: ['coffee_cup', 'notebook', 'plant'],
        depth_of_field: 'medium'
      },
      studio: {
        background: 'gradient_gray',
        surface: 'acrylic_platform',
        props: 'geometric_shapes',
        depth_of_field: 'deep'
      },
      outdoor: {
        background: 'natural_setting',
        surface: 'stone_or_wood',
        props: 'natural_elements',
        depth_of_field: 'variable'
      }
    };
    
    this.environmentConfig = environments[this.environment] || environments.minimal;
    console.log('Lighting and environment configured');
  }

  generateMockups() {
    const mockups = [];
    const perspectives = this.getPerspectives();
    
    perspectives.forEach((perspective, index) => {
      const mockup = {
        id: \`mockup_\${index + 1}\`,
        perspective: perspective,
        device: this.deviceProperties,
        lighting: this.lightingConfig,
        environment: this.environmentConfig,
        effects: this.generateEffects(),
        composition: this.generateComposition(perspective),
        technical_specs: this.generateTechnicalSpecs()
      };
      
      mockups.push(mockup);
    });
    
    console.log(\`Generated \${mockups.length} mockup variations\`);
    return mockups;
  }

  getPerspectives() {
    const perspectiveOptions = {
      single: [this.perspective],
      multiple: ['front_view', 'three_quarter', 'side_view'],
      comprehensive: ['front_view', 'three_quarter', 'side_view', 'back_view', 'top_view']
    };
    
    return perspectiveOptions[this.quantity] || perspectiveOptions.single;
  }

  generateEffects() {
    return {
      reflections: this.includeReflections ? {
        surface_reflection: 'subtle',
        screen_reflection: 'minimal',
        environment_reflection: 'soft'
      } : null,
      shadows: this.includeShadows ? {
        cast_shadow: 'soft_edge',
        contact_shadow: 'tight',
        ambient_occlusion: 'subtle'
      } : null,
      depth_of_field: {
        focus_point: 'device_center',
        blur_intensity: 'medium',
        bokeh_quality: 'high'
      }
    };
  }

  generateComposition(perspective) {
    const compositions = {
      front_view: {
        camera_angle: 0,
        device_rotation: { x: 0, y: 0, z: 0 },
        positioning: 'centered',
        scale: 'optimal'
      },
      three_quarter: {
        camera_angle: 30,
        device_rotation: { x: 5, y: 25, z: 0 },
        positioning: 'rule_of_thirds',
        scale: 'prominent'
      },
      side_view: {
        camera_angle: 90,
        device_rotation: { x: 0, y: 90, z: 0 },
        positioning: 'centered',
        scale: 'detailed'
      },
      top_view: {
        camera_angle: -90,
        device_rotation: { x: 90, y: 0, z: 0 },
        positioning: 'flat_lay',
        scale: 'contextual'
      }
    };
    
    return compositions[perspective] || compositions.front_view;
  }

  generateTechnicalSpecs() {
    const specs = {
      resolution: this.getResolution(),
      color_space: 'sRGB',
      bit_depth: '16-bit',
      format: this.outputFormat,
      compression: 'lossless',
      metadata: {
        created_by: 'AI_Product_Mockup_Creator',
        device_model: this.deviceType,
        style: this.mockupStyle,
        timestamp: new Date().toISOString()
      }
    };
    
    return specs;
  }

  getResolution() {
    const resolutions = {
      high_res: { width: 4000, height: 3000, dpi: 300 },
      web_optimized: { width: 1920, height: 1440, dpi: 72 },
      social_media: { width: 1080, height: 1080, dpi: 72 },
      print_ready: { width: 6000, height: 4500, dpi: 300 }
    };
    
    return resolutions[this.outputFormat] || resolutions.high_res;
  }

  // Export and customization methods
  exportMockup(format = 'png') {
    return {
      format: format,
      quality: 'maximum',
      transparency: format === 'png',
      color_profile: 'sRGB',
      metadata_included: true
    };
  }

  customizeContent(screenContent) {
    return {
      content_type: typeof screenContent,
      scaling: 'fit_to_screen',
      positioning: 'centered',
      quality_enhancement: 'ai_upscale'
    };
  }

  generateVariations() {
    return {
      color_variants: this.selectDeviceColor(),
      angle_variants: ['front', 'three_quarter', 'side'],
      context_variants: ['minimal', 'lifestyle', 'studio'],
      lighting_variants: ['soft', 'dramatic', 'natural']
    };
  }
}

// Initialize Product Mockup Creator
const productMockupCreator = new ProductMockupCreator();

// Export configuration
export default productMockupCreator;`;

      setResult(productMockupConfig);
      setIsGenerating(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AIToolLayout
      title="AI Product Mockup Creator"
      description="Create professional product mockups and device presentations with AI-powered scene generation, realistic lighting, and customizable environments."
      category="Visual Content"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Product Type & Device */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
              <select
                value={formData.productType}
                onChange={(e) => handleInputChange('productType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="digital_device">Digital Device</option>
                <option value="physical_product">Physical Product</option>
                <option value="print_media">Print Media</option>
                <option value="apparel">Apparel</option>
                <option value="packaging">Packaging</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Device/Item Type</label>
              <select
                value={formData.deviceType}
                onChange={(e) => handleInputChange('deviceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="smartphone">Smartphone</option>
                <option value="tablet">Tablet</option>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop Monitor</option>
                <option value="smartwatch">Smartwatch</option>
                <option value="tv">Smart TV</option>
                <option value="business_card">Business Card</option>
                <option value="poster">Poster/Print</option>
              </select>
            </div>
          </div>
        </div>

        {/* Style & Appearance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Style & Appearance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mockup Style</label>
              <select
                value={formData.mockupStyle}
                onChange={(e) => handleInputChange('mockupStyle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="modern">Modern</option>
                <option value="premium">Premium</option>
                <option value="minimal">Minimal</option>
                <option value="industrial">Industrial</option>
                <option value="creative">Creative</option>
                <option value="retro">Retro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
              <select
                value={formData.colorScheme}
                onChange={(e) => handleInputChange('colorScheme', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="neutral">Neutral Tones</option>
                <option value="vibrant">Vibrant Colors</option>
                <option value="premium">Premium Metals</option>
                <option value="monochrome">Monochrome</option>
                <option value="brand">Brand Colors</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Perspective</label>
              <select
                value={formData.perspective}
                onChange={(e) => handleInputChange('perspective', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="front_view">Front View</option>
                <option value="three_quarter">Three Quarter</option>
                <option value="side_view">Side View</option>
                <option value="top_view">Top View</option>
                <option value="back_view">Back View</option>
                <option value="isometric">Isometric</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <select
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="single">Single View</option>
                <option value="multiple">Multiple Views (3)</option>
                <option value="comprehensive">Comprehensive Set (5)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Environment & Lighting */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment & Lighting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
              <select
                value={formData.environment}
                onChange={(e) => handleInputChange('environment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="minimal">Minimal Studio</option>
                <option value="lifestyle">Lifestyle Scene</option>
                <option value="office">Office Environment</option>
                <option value="outdoor">Outdoor Setting</option>
                <option value="studio">Professional Studio</option>
                <option value="home">Home Environment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Style</label>
              <select
                value={formData.backgroundStyle}
                onChange={(e) => handleInputChange('backgroundStyle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="clean">Clean White</option>
                <option value="gradient">Gradient</option>
                <option value="textured">Textured</option>
                <option value="transparent">Transparent</option>
                <option value="contextual">Contextual Scene</option>
                <option value="custom">Custom Background</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lighting Setup</label>
              <select
                value={formData.lightingSetup}
                onChange={(e) => handleInputChange('lightingSetup', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="soft">Soft Studio</option>
                <option value="dramatic">Dramatic</option>
                <option value="natural">Natural Light</option>
                <option value="studio">Professional Studio</option>
                <option value="rim">Rim Lighting</option>
                <option value="ambient">Ambient</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branding Level</label>
              <select
                value={formData.brandingLevel}
                onChange={(e) => handleInputChange('brandingLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="subtle">Subtle</option>
                <option value="moderate">Moderate</option>
                <option value="prominent">Prominent</option>
                <option value="none">No Branding</option>
              </select>
            </div>
          </div>
        </div>

        {/* Visual Effects */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Effects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeReflections"
                checked={formData.includeReflections}
                onChange={(e) => handleInputChange('includeReflections', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeReflections" className="ml-2 block text-sm text-gray-900">
                Include Reflections
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeShadows"
                checked={formData.includeShadows}
                onChange={(e) => handleInputChange('includeShadows', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeShadows" className="ml-2 block text-sm text-gray-900">
                Include Shadows
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeContext"
                checked={formData.includeContext}
                onChange={(e) => handleInputChange('includeContext', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeContext" className="ml-2 block text-sm text-gray-900">
                Include Context Objects
              </label>
            </div>
          </div>
        </div>

        {/* Output Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Output Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <select
                value={formData.outputFormat}
                onChange={(e) => handleInputChange('outputFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="high_res">High Resolution (4K)</option>
                <option value="web_optimized">Web Optimized</option>
                <option value="social_media">Social Media Ready</option>
                <option value="print_ready">Print Ready (300 DPI)</option>
                <option value="vector">Vector Format</option>
              </select>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Photorealistic device rendering",
              "Customizable lighting setups",
              "Multiple perspective options",
              "Smart shadow and reflection generation",
              "Brand-consistent styling",
              "High-resolution export options",
              "Batch mockup generation",
              "Screen content replacement",
              "Environmental context options",
              "Professional studio quality"
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