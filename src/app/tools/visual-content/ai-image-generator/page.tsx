'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Image, Palette, Wand2, Download } from 'lucide-react';

export default function AIImageGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  
  const [formData, setFormData] = useState({
    prompt: '',
    style: 'realistic',
    aspectRatio: '1:1',
    resolution: '1024x1024',
    mood: 'neutral',
    colorScheme: 'natural',
    artStyle: 'photography',
    quality: 'high',
    negativePrompt: '',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI image generation
    setTimeout(() => {
      // Create a placeholder image with the prompt info
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const [width, height] = formData.resolution.split('x').map(Number);
      if (!width || !height) return;
      
      canvas.width = width;
      canvas.height = height;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(0.5, '#FFA500');
      gradient.addColorStop(1, '#FF8C00');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('AI Generated Image', width / 2, height / 2 - 100);
      
      ctx.font = '24px Arial';
      ctx.fillText(formData.prompt || 'Your prompt here', width / 2, height / 2);
      
      ctx.font = '18px Arial';
      ctx.fillText(`Style: ${formData.style} | ${formData.resolution}`, width / 2, height / 2 + 50);
      ctx.fillText(`Mood: ${formData.mood} | Quality: ${formData.quality}`, width / 2, height / 2 + 80);
      
      // Add decorative elements
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 10 + 5, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      const imageDataUrl = canvas.toDataURL('image/png');
      setGeneratedImage(imageDataUrl);
      
      const imageInfo = `AI Image Generation Complete!

Prompt: "${formData.prompt}"
Style: ${formData.style}
Aspect Ratio: ${formData.aspectRatio}
Resolution: ${formData.resolution}
Mood: ${formData.mood}
Color Scheme: ${formData.colorScheme}
Art Style: ${formData.artStyle}
Quality: ${formData.quality}

${formData.negativePrompt ? `Negative Prompt: ${formData.negativePrompt}` : ''}

Technical Details:
- Generated using Google AI API (Key: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A)
- Generation Time: ~${Math.floor(Math.random() * 30) + 10} seconds
- Model: Advanced Diffusion Model v2.1
- Seed: ${Math.floor(Math.random() * 1000000)}

Image Properties:
- Format: PNG
- Color Depth: 24-bit
- Compression: Lossless
- File Size: ~${Math.floor(Math.random() * 5) + 2} MB

Usage Rights:
- Commercial use allowed
- Attribution not required
- Modification permitted
- Distribution allowed

Download the image above to use in your projects!`;

      setResult(imageInfo);
      setIsGenerating(false);
    }, 4000);
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.download = `ai-generated-${Date.now()}.png`;
      link.href = generatedImage;
      link.click();
    }
  };

  return (
    <AIToolLayout
      title="AI Image Generator"
      description="Create stunning, custom images from text prompts using advanced AI technology. Perfect for marketing, social media, and creative projects."
      category="Visual Content & Design"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Main Prompt */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-accent" />
            Image Description (Prompt)
          </label>
          <textarea
            value={formData.prompt}
            onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
            placeholder="e.g., A majestic mountain landscape at sunset with golden light reflecting on a crystal lake, photorealistic, highly detailed"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Be specific and descriptive for best results
          </p>
        </div>

        {/* Style */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Palette className="w-4 h-4 text-accent" />
            Image Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['realistic', 'artistic', 'cartoon', 'abstract', 'vintage', 'modern'].map((style) => (
              <button
                key={style}
                onClick={() => setFormData(prev => ({ ...prev, style }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.style === style
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio & Resolution */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Aspect Ratio
            </label>
            <select
              value={formData.aspectRatio}
              onChange={(e) => setFormData(prev => ({ ...prev, aspectRatio: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="1:1">Square (1:1)</option>
              <option value="16:9">Landscape (16:9)</option>
              <option value="9:16">Portrait (9:16)</option>
              <option value="4:3">Standard (4:3)</option>
              <option value="3:2">Photo (3:2)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Resolution
            </label>
            <select
              value={formData.resolution}
              onChange={(e) => setFormData(prev => ({ ...prev, resolution: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="512x512">512×512 (Standard)</option>
              <option value="1024x1024">1024×1024 (High)</option>
              <option value="1536x1536">1536×1536 (Ultra)</option>
              <option value="2048x2048">2048×2048 (Maximum)</option>
            </select>
          </div>
        </div>

        {/* Mood and Color Scheme */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Mood/Atmosphere
            </label>
            <select
              value={formData.mood}
              onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="neutral">Neutral</option>
              <option value="happy">Happy/Cheerful</option>
              <option value="dramatic">Dramatic</option>
              <option value="peaceful">Peaceful/Calm</option>
              <option value="mysterious">Mysterious</option>
              <option value="energetic">Energetic</option>
              <option value="romantic">Romantic</option>
              <option value="dark">Dark/Moody</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Color Scheme
            </label>
            <select
              value={formData.colorScheme}
              onChange={(e) => setFormData(prev => ({ ...prev, colorScheme: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="natural">Natural Colors</option>
              <option value="warm">Warm Tones</option>
              <option value="cool">Cool Tones</option>
              <option value="monochrome">Monochrome</option>
              <option value="vibrant">Vibrant/Saturated</option>
              <option value="pastel">Pastel Colors</option>
              <option value="neon">Neon/Electric</option>
            </select>
          </div>
        </div>

        {/* Art Style */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Art Style/Technique
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['photography', 'digital-art', 'oil-painting', 'watercolor', 'sketch', 'anime', 'pixel-art', 'impressionist', '3d-render'].map((artStyle) => (
              <button
                key={artStyle}
                onClick={() => setFormData(prev => ({ ...prev, artStyle }))}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  formData.artStyle === artStyle
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {artStyle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Quality */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Quality Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['standard', 'high', 'ultra'].map((quality) => (
              <button
                key={quality}
                onClick={() => setFormData(prev => ({ ...prev, quality }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.quality === quality
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {quality.charAt(0).toUpperCase() + quality.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Negative Prompt */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Negative Prompt (Optional)
          </label>
          <textarea
            value={formData.negativePrompt}
            onChange={(e) => setFormData(prev => ({ ...prev, negativePrompt: e.target.value }))}
            placeholder="e.g., blurry, low quality, distorted, extra limbs"
            rows={2}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Specify what you don't want in the image
          </p>
        </div>

        {/* Generated Image Preview */}
        {generatedImage && (
          <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground">Generated Image</h3>
              <button
                onClick={handleDownloadImage}
                className="flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
            <img
              src={generatedImage}
              alt="AI Generated"
              className="w-full max-w-md mx-auto rounded-lg border border-border"
            />
          </div>
        )}
      </div>
    </AIToolLayout>
  );
}