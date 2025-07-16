'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIVideoGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    videoType: 'explainer',
    duration: '60',
    aspectRatio: '16:9',
    style: 'modern',
    tone: 'professional',
    audience: 'general',
    script: '',
    voiceType: 'ai_generated',
    musicStyle: 'corporate',
    includeSubtitles: true,
    includeBranding: false,
    quality: 'hd',
    language: 'english',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const videoGeneratorConfig = `// AI Video Generator: ${formData.videoType}
// Generated with AI Video Generator Builder

class AIVideoGenerator {
  constructor() {
    this.videoType = '${formData.videoType}';
    this.duration = ${formData.duration};
    this.aspectRatio = '${formData.aspectRatio}';
    this.style = '${formData.style}';
    this.tone = '${formData.tone}';
    this.audience = '${formData.audience}';
    this.script = \`${formData.script}\`;
    this.voiceType = '${formData.voiceType}';
    this.musicStyle = '${formData.musicStyle}';
    this.includeSubtitles = ${formData.includeSubtitles};
    this.includeBranding = ${formData.includeBranding};
    this.quality = '${formData.quality}';
    this.language = '${formData.language}';
    this.videoSpecs = {};
    this.scenes = [];
    this.initialize();
  }

  initialize() {
    console.log('Initializing AI Video Generator');
    this.setupVideoSpecifications();
    this.analyzeScript();
    this.generateSceneBreakdown();
    this.createVideoElements();
    this.assembleVideo();
  }

  setupVideoSpecifications() {
    const specifications = {
      '16:9': { width: 1920, height: 1080, format: 'landscape' },
      '9:16': { width: 1080, height: 1920, format: 'vertical' },
      '1:1': { width: 1080, height: 1080, format: 'square' },
      '4:5': { width: 1080, height: 1350, format: 'portrait' }
    };
    
    const qualitySettings = {
      hd: { resolution: '1080p', bitrate: '8000k', fps: 30 },
      '4k': { resolution: '2160p', bitrate: '20000k', fps: 60 },
      web: { resolution: '720p', bitrate: '4000k', fps: 30 },
      mobile: { resolution: '720p', bitrate: '2000k', fps: 30 }
    };
    
    this.videoSpecs = {
      dimensions: specifications[this.aspectRatio],
      quality: qualitySettings[this.quality],
      duration: this.duration,
      format: 'mp4',
      codec: 'h264'
    };
    
    console.log('Video specifications:', this.videoSpecs);
  }

  analyzeScript() {
    if (!this.script) {
      this.script = this.generateDefaultScript();
    }
    
    const analysis = {
      word_count: this.script.split(' ').length,
      estimated_speaking_time: this.calculateSpeakingTime(),
      key_points: this.extractKeyPoints(),
      emotional_tone: this.analyzeEmotionalTone(),
      action_items: this.identifyActionItems(),
      visual_cues: this.extractVisualCues()
    };
    
    this.scriptAnalysis = analysis;
    console.log('Script analysis completed:', analysis);
  }

  generateDefaultScript() {
    const defaultScripts = {
      explainer: \`Welcome to our innovative solution that transforms the way you work. 
                  In just 60 seconds, discover how our platform can streamline your workflow, 
                  increase productivity, and deliver exceptional results. 
                  Join thousands of satisfied customers who have already transformed their business.\`,
      
      product_demo: \`Introducing our latest product - designed with you in mind. 
                     Watch as we demonstrate key features that will revolutionize your experience. 
                     From intuitive design to powerful functionality, 
                     see why this is the solution you've been waiting for.\`,
      
      testimonial: \`Don't just take our word for it. Listen to real customers share their success stories. 
                    Discover how our solution has made a meaningful impact on their business 
                    and learn why they recommend us to others.\`,
      
      social_media: \`Ready to take your content to the next level? 
                     In this quick video, we'll show you exactly how to maximize your impact, 
                     engage your audience, and achieve your goals. Let's get started!\`
    };
    
    return defaultScripts[this.videoType] || defaultScripts.explainer;
  }

  calculateSpeakingTime() {
    const wordsPerMinute = 150; // Average speaking pace
    const wordCount = this.script.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute * 60); // Return in seconds
  }

  extractKeyPoints() {
    // Simple keyword extraction
    const sentences = this.script.split(/[.!?]+/);
    return sentences.map((sentence, index) => ({
      id: index + 1,
      text: sentence.trim(),
      timestamp: (index * (this.duration / sentences.length)).toFixed(1)
    })).filter(point => point.text.length > 0);
  }

  analyzeEmotionalTone() {
    const emotionalKeywords = {
      positive: ['success', 'amazing', 'excellent', 'outstanding', 'wonderful'],
      urgent: ['now', 'today', 'immediately', 'quickly', 'fast'],
      trustworthy: ['proven', 'reliable', 'trusted', 'guaranteed', 'secure'],
      innovative: ['new', 'innovative', 'cutting-edge', 'revolutionary', 'advanced']
    };
    
    const scriptLower = this.script.toLowerCase();
    const detectedTones = [];
    
    Object.entries(emotionalKeywords).forEach(([tone, keywords]) => {
      const matchCount = keywords.filter(keyword => scriptLower.includes(keyword)).length;
      if (matchCount > 0) {
        detectedTones.push({ tone, strength: matchCount });
      }
    });
    
    return detectedTones;
  }

  identifyActionItems() {
    const actionWords = ['discover', 'learn', 'see', 'watch', 'join', 'get', 'start', 'try'];
    const sentences = this.script.split(/[.!?]+/);
    
    return sentences.filter(sentence => 
      actionWords.some(action => sentence.toLowerCase().includes(action))
    ).map(sentence => sentence.trim());
  }

  extractVisualCues() {
    const visualKeywords = {
      show: ['demonstrate', 'show', 'display', 'reveal'],
      transition: ['next', 'then', 'meanwhile', 'after'],
      emphasis: ['important', 'key', 'main', 'essential', 'critical']
    };
    
    const cues = [];
    const scriptLower = this.script.toLowerCase();
    
    Object.entries(visualKeywords).forEach(([type, keywords]) => {
      keywords.forEach(keyword => {
        if (scriptLower.includes(keyword)) {
          cues.push({ type, keyword, action: this.mapVisualAction(type) });
        }
      });
    });
    
    return cues;
  }

  mapVisualAction(type) {
    const actions = {
      show: 'screen_focus',
      transition: 'scene_change',
      emphasis: 'highlight_text'
    };
    
    return actions[type] || 'standard_visual';
  }

  generateSceneBreakdown() {
    const keyPoints = this.scriptAnalysis.key_points;
    const sceneDuration = this.duration / keyPoints.length;
    
    this.scenes = keyPoints.map((point, index) => ({
      id: \`scene_\${index + 1}\`,
      startTime: index * sceneDuration,
      duration: sceneDuration,
      content: point.text,
      visualStyle: this.determineSceneVisual(point.text, index),
      audioElements: this.determineAudioElements(point.text),
      transitions: this.selectTransition(index)
    }));
    
    console.log(\`Generated \${this.scenes.length} scenes\`);
  }

  determineSceneVisual(content, sceneIndex) {
    const visualStyles = {
      modern: {
        background: 'gradient_mesh',
        typography: 'sans_serif_bold',
        colors: ['#667eea', '#764ba2'],
        animations: 'smooth_transitions'
      },
      corporate: {
        background: 'professional_office',
        typography: 'clean_corporate',
        colors: ['#1e3a8a', '#3b82f6'],
        animations: 'subtle_movement'
      },
      creative: {
        background: 'artistic_abstract',
        typography: 'creative_font',
        colors: ['#f093fb', '#f5576c'],
        animations: 'dynamic_effects'
      },
      minimal: {
        background: 'clean_white',
        typography: 'minimal_sans',
        colors: ['#000000', '#ffffff'],
        animations: 'fade_transitions'
      }
    };
    
    const baseStyle = visualStyles[this.style] || visualStyles.modern;
    
    return {
      ...baseStyle,
      scene_number: sceneIndex + 1,
      visual_elements: this.generateVisualElements(content),
      text_overlay: this.createTextOverlay(content)
    };
  }

  generateVisualElements(content) {
    const elements = [];
    
    // Add icons based on content
    if (content.toLowerCase().includes('solution')) {
      elements.push({ type: 'icon', name: 'lightbulb', position: 'center_left' });
    }
    if (content.toLowerCase().includes('customer')) {
      elements.push({ type: 'icon', name: 'users', position: 'top_right' });
    }
    if (content.toLowerCase().includes('product')) {
      elements.push({ type: 'icon', name: 'package', position: 'bottom_center' });
    }
    
    // Add background elements
    elements.push({
      type: 'background_animation',
      style: 'floating_particles',
      opacity: 0.1
    });
    
    return elements;
  }

  createTextOverlay(content) {
    const words = content.split(' ');
    const midpoint = Math.floor(words.length / 2);
    
    return {
      primary_text: words.slice(0, midpoint).join(' '),
      secondary_text: words.slice(midpoint).join(' '),
      typography: {
        primary_font: 'Inter',
        primary_size: '48px',
        primary_weight: 'bold',
        secondary_font: 'Inter',
        secondary_size: '24px',
        secondary_weight: 'normal'
      },
      animation: {
        entrance: 'fade_in_up',
        timing: 'staggered',
        duration: '0.6s'
      }
    };
  }

  determineAudioElements(content) {
    return {
      voiceover: {
        text: content,
        voice_type: this.voiceType,
        speed: this.calculateOptimalSpeed(),
        emphasis: this.identifyEmphasisWords(content),
        pause_points: this.determinePausePoints(content)
      },
      background_music: {
        style: this.musicStyle,
        volume: 0.3,
        fade_in: true,
        fade_out: true
      },
      sound_effects: this.generateSoundEffects(content)
    };
  }

  calculateOptimalSpeed() {
    const baseSpeed = 1.0;
    const adjustments = {
      professional: 0.9,
      casual: 1.1,
      energetic: 1.2,
      calm: 0.8
    };
    
    return adjustments[this.tone] || baseSpeed;
  }

  identifyEmphasisWords(content) {
    const emphasisWords = ['key', 'important', 'essential', 'critical', 'amazing', 'innovative'];
    const words = content.toLowerCase().split(' ');
    
    return words.map((word, index) => ({
      word,
      index,
      emphasize: emphasisWords.some(emphasisWord => word.includes(emphasisWord))
    })).filter(item => item.emphasize);
  }

  determinePausePoints(content) {
    const punctuation = ['.', ',', '!', '?'];
    const pausePoints = [];
    
    for (let i = 0; i < content.length; i++) {
      if (punctuation.includes(content[i])) {
        pausePoints.push({
          position: i,
          duration: content[i] === '.' ? 0.5 : 0.3
        });
      }
    }
    
    return pausePoints;
  }

  generateSoundEffects(content) {
    const effects = [];
    
    if (content.toLowerCase().includes('click') || content.toLowerCase().includes('select')) {
      effects.push({ type: 'click', timing: 'on_action' });
    }
    if (content.toLowerCase().includes('notification')) {
      effects.push({ type: 'notification_bell', timing: 'emphasis' });
    }
    if (content.toLowerCase().includes('success')) {
      effects.push({ type: 'success_chime', timing: 'end_of_scene' });
    }
    
    return effects;
  }

  selectTransition(sceneIndex) {
    const transitions = ['fade', 'slide_left', 'zoom_in', 'wipe', 'crossfade'];
    const transitionIndex = sceneIndex % transitions.length;
    
    return {
      type: transitions[transitionIndex],
      duration: 0.5,
      easing: 'ease_in_out'
    };
  }

  createVideoElements() {
    this.videoElements = {
      intro: this.createIntroSequence(),
      scenes: this.scenes,
      outro: this.createOutroSequence(),
      subtitles: this.includeSubtitles ? this.generateSubtitles() : null,
      branding: this.includeBranding ? this.createBrandingElements() : null
    };
    
    console.log('Video elements created');
  }

  createIntroSequence() {
    return {
      duration: 3,
      elements: [
        {
          type: 'logo_animation',
          animation: 'fade_in_scale',
          duration: 2
        },
        {
          type: 'title_card',
          text: this.generateTitleFromType(),
          animation: 'slide_in_bottom',
          duration: 1
        }
      ]
    };
  }

  generateTitleFromType() {
    const titles = {
      explainer: 'How It Works',
      product_demo: 'Product Demo',
      testimonial: 'Customer Success',
      social_media: 'Quick Tip',
      tutorial: 'Step by Step',
      marketing: 'Discover More'
    };
    
    return titles[this.videoType] || 'Video Presentation';
  }

  createOutroSequence() {
    return {
      duration: 4,
      elements: [
        {
          type: 'call_to_action',
          text: 'Learn More',
          button_style: 'prominent',
          animation: 'pulse',
          duration: 2
        },
        {
          type: 'contact_info',
          elements: ['website', 'social_media'],
          animation: 'fade_in',
          duration: 2
        }
      ]
    };
  }

  generateSubtitles() {
    return this.scenes.map((scene, index) => ({
      id: \`subtitle_\${index + 1}\`,
      startTime: scene.startTime,
      endTime: scene.startTime + scene.duration,
      text: scene.content,
      style: {
        font: 'Arial',
        size: '24px',
        color: '#ffffff',
        background: 'rgba(0,0,0,0.8)',
        position: 'bottom_center'
      }
    }));
  }

  createBrandingElements() {
    return {
      watermark: {
        position: 'bottom_right',
        opacity: 0.7,
        size: 'small'
      },
      color_scheme: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#fbbf24'
      },
      logo_placement: {
        intro: true,
        outro: true,
        watermark: true
      }
    };
  }

  assembleVideo() {
    const videoAssembly = {
      timeline: this.createTimeline(),
      audio_mix: this.createAudioMix(),
      render_settings: this.createRenderSettings(),
      export_options: this.createExportOptions()
    };
    
    console.log('Video assembly configuration created');
    return videoAssembly;
  }

  createTimeline() {
    let currentTime = 0;
    const timeline = [];
    
    // Add intro
    timeline.push({
      type: 'intro',
      startTime: currentTime,
      duration: this.videoElements.intro.duration,
      elements: this.videoElements.intro.elements
    });
    currentTime += this.videoElements.intro.duration;
    
    // Add scenes
    this.videoElements.scenes.forEach(scene => {
      timeline.push({
        type: 'scene',
        startTime: currentTime,
        duration: scene.duration,
        content: scene
      });
      currentTime += scene.duration;
    });
    
    // Add outro
    timeline.push({
      type: 'outro',
      startTime: currentTime,
      duration: this.videoElements.outro.duration,
      elements: this.videoElements.outro.elements
    });
    
    return timeline;
  }

  createAudioMix() {
    return {
      voiceover: {
        volume: 0.8,
        normalization: true,
        noise_reduction: true
      },
      background_music: {
        volume: 0.3,
        fade_in_duration: 2,
        fade_out_duration: 2,
        loop: true
      },
      sound_effects: {
        volume: 0.5,
        spatial_audio: false
      }
    };
  }

  createRenderSettings() {
    return {
      resolution: this.videoSpecs.quality.resolution,
      frame_rate: this.videoSpecs.quality.fps,
      bitrate: this.videoSpecs.quality.bitrate,
      codec: this.videoSpecs.codec,
      format: this.videoSpecs.format
    };
  }

  createExportOptions() {
    return {
      formats: ['mp4', 'mov', 'avi'],
      qualities: ['web', 'hd', '4k'],
      compression: 'h264',
      metadata: {
        title: this.generateTitleFromType(),
        description: 'Generated with AI Video Generator',
        tags: [this.videoType, this.style, this.tone]
      }
    };
  }

  // Preview and editing methods
  generatePreview() {
    return {
      thumbnail: 'scene_1_frame',
      duration: this.duration,
      scene_count: this.scenes.length,
      estimated_file_size: this.calculateFileSize()
    };
  }

  calculateFileSize() {
    const bitrate = parseInt(this.videoSpecs.quality.bitrate.replace('k', ''));
    const durationMinutes = this.duration / 60;
    const sizeMB = (bitrate * durationMinutes * 60) / 8000; // Convert to MB
    return Math.round(sizeMB) + 'MB';
  }
}

// Initialize AI Video Generator
const videoGenerator = new AIVideoGenerator();

// Export configuration
export default videoGenerator;`;

      setResult(videoGeneratorConfig);
      setIsGenerating(false);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AIToolLayout
      title="AI Video Generator"
      description="Create professional videos from text scripts with AI-powered scene generation, voiceovers, and dynamic visual elements."
      category="Video & Audio"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Video Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Type</label>
              <select
                value={formData.videoType}
                onChange={(e) => handleInputChange('videoType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="explainer">Explainer Video</option>
                <option value="product_demo">Product Demo</option>
                <option value="testimonial">Testimonial</option>
                <option value="social_media">Social Media</option>
                <option value="tutorial">Tutorial</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (seconds)</label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="90">1.5 minutes</option>
                <option value="120">2 minutes</option>
                <option value="180">3 minutes</option>
                <option value="300">5 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
              <select
                value={formData.aspectRatio}
                onChange={(e) => handleInputChange('aspectRatio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="16:9">16:9 (Landscape)</option>
                <option value="9:16">9:16 (Vertical/Stories)</option>
                <option value="1:1">1:1 (Square)</option>
                <option value="4:5">4:5 (Portrait)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
              <select
                value={formData.quality}
                onChange={(e) => handleInputChange('quality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="web">Web (720p)</option>
                <option value="hd">HD (1080p)</option>
                <option value="4k">4K (2160p)</option>
                <option value="mobile">Mobile Optimized</option>
              </select>
            </div>
          </div>
        </div>

        {/* Script & Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Script & Content</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video Script</label>
            <textarea
              value={formData.script}
              onChange={(e) => handleInputChange('script', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              placeholder="Enter your video script or leave blank for AI-generated content based on video type..."
            />
            <p className="text-sm text-gray-500 mt-2">
              Tip: Leave blank to automatically generate a script based on your video type and settings.
            </p>
          </div>
        </div>

        {/* Style & Design */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Style & Design</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visual Style</label>
              <select
                value={formData.style}
                onChange={(e) => handleInputChange('style', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="modern">Modern</option>
                <option value="corporate">Corporate</option>
                <option value="creative">Creative</option>
                <option value="minimal">Minimal</option>
                <option value="dynamic">Dynamic</option>
                <option value="elegant">Elegant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <select
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="energetic">Energetic</option>
                <option value="calm">Calm</option>
                <option value="inspiring">Inspiring</option>
                <option value="conversational">Conversational</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select
                value={formData.audience}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">General Audience</option>
                <option value="business">Business Professionals</option>
                <option value="young_adults">Young Adults</option>
                <option value="students">Students</option>
                <option value="seniors">Seniors</option>
                <option value="technical">Technical/Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
                <option value="portuguese">Portuguese</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Voice Type</label>
              <select
                value={formData.voiceType}
                onChange={(e) => handleInputChange('voiceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ai_generated">AI Generated Voice</option>
                <option value="male_professional">Male Professional</option>
                <option value="female_professional">Female Professional</option>
                <option value="male_casual">Male Casual</option>
                <option value="female_casual">Female Casual</option>
                <option value="text_only">Text Only (No Voice)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Music</label>
              <select
                value={formData.musicStyle}
                onChange={(e) => handleInputChange('musicStyle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="corporate">Corporate</option>
                <option value="upbeat">Upbeat</option>
                <option value="calm">Calm</option>
                <option value="inspiring">Inspiring</option>
                <option value="tech">Tech/Electronic</option>
                <option value="none">No Music</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeSubtitles"
                checked={formData.includeSubtitles}
                onChange={(e) => handleInputChange('includeSubtitles', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeSubtitles" className="ml-2 block text-sm text-gray-900">
                Include Subtitles/Captions
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeBranding"
                checked={formData.includeBranding}
                onChange={(e) => handleInputChange('includeBranding', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeBranding" className="ml-2 block text-sm text-gray-900">
                Include Branding Elements
              </label>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "AI-powered script generation",
              "Text-to-video conversion",
              "Professional voiceover synthesis",
              "Dynamic scene transitions",
              "Automated subtitle generation",
              "Multi-platform aspect ratios",
              "Background music integration",
              "Brand customization options",
              "HD and 4K export quality",
              "Batch video generation"
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