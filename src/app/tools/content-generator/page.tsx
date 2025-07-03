'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateContent } from '@/lib/gemini';
import { PenTool, Share2, FileText, Copy, Download, Sparkles } from 'lucide-react';

type ContentType = 'blog' | 'social' | 'description';

const contentTypes = [
  { id: 'blog', label: 'Blog Post', icon: FileText, description: 'Comprehensive blog articles with SEO optimization' },
  { id: 'social', label: 'Social Media', icon: Share2, description: 'Platform-specific social media content' },
  { id: 'description', label: 'Project Description', icon: PenTool, description: 'Compelling project and product descriptions' },
];

export default function ContentGeneratorPage() {
  const [contentType, setContentType] = useState<ContentType>('blog');
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or title');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const result = await generateContent(contentType, topic, context);
      setGeneratedContent(result);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-${contentType}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const selectedType = contentTypes.find(type => type.id === contentType);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-serif font-bold">AI Content Generator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create engaging, high-quality content for blogs, social media, and projects 
            with AI-powered writing assistance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Content Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = contentType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id as ContentType)}
                  className={`p-6 border rounded-lg text-left transition-all duration-200 ${
                    isSelected 
                      ? 'border-accent bg-accent/5 shadow-lg' 
                      : 'border-border hover:border-accent/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">{type.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {selectedType && <selectedType.icon className="w-5 h-5" />}
                  Content Details
                </h2>
                
                {/* Topic Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Topic / Title *
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={
                      contentType === 'blog' ? 'e.g., "How to Build a REST API with Node.js"' :
                      contentType === 'social' ? 'e.g., "Launch of my new portfolio website"' :
                      'e.g., "E-commerce Mobile App"'
                    }
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                </div>

                {/* Context Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Additional Context (Optional)
                  </label>
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder={
                      contentType === 'blog' ? 'Target audience, key points to cover, specific examples...' :
                      contentType === 'social' ? 'Key features, target audience, call-to-action...' :
                      'Technologies used, target users, key features...'
                    }
                    className="w-full h-24 p-3 border border-border rounded-lg bg-background resize-none"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-sm text-red-500">{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Generated Content</h2>
                  {generatedContent && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadContent}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
                
                {generatedContent ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 p-4 rounded-lg max-h-96 overflow-y-auto">
                      {generatedContent}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Enter a topic and click "Generate" to create AI-powered content</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Examples */}
          <div className="mt-12 bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">What You'll Get</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Blog Posts
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• SEO-optimized titles</li>
                  <li>• Structured content with headings</li>
                  <li>• Engaging introductions</li>
                  <li>• Call-to-action conclusions</li>
                  <li>• Meta descriptions</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-green-500" />
                  Social Media
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Twitter/X posts</li>
                  <li>• LinkedIn updates</li>
                  <li>• Instagram captions</li>
                  <li>• Facebook posts</li>
                  <li>• Relevant hashtags</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-purple-500" />
                  Project Descriptions
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear overviews</li>
                  <li>• Key features highlights</li>
                  <li>• Technology stack</li>
                  <li>• Problem-solution fit</li>
                  <li>• Target audience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}