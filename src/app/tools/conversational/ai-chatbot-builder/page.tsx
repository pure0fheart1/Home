'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Bot, MessageCircle, Zap } from 'lucide-react';

export default function AIChatbotBuilderPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    botName: '',
    personality: 'friendly',
    industry: 'general',
    features: [] as string[],
    platform: 'web',
    complexity: 'basic',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const chatbotCode = `// AI Chatbot: ${formData.botName}
// Generated with AI Chatbot Builder

class ${formData.botName.replace(/\s+/g, '')}Chatbot {
  constructor() {
    this.personality = '${formData.personality}';
    this.industry = '${formData.industry}';
    this.platform = '${formData.platform}';
    this.responses = this.generateResponses();
  }

  generateResponses() {
    return {
      greeting: [
        "Hello! I'm ${formData.botName}, your ${formData.personality} AI assistant.",
        "Hi there! How can I help you today?",
        "Welcome! I'm here to assist you with ${formData.industry} related questions."
      ],
      fallback: [
        "I'm not sure I understand. Could you rephrase that?",
        "Let me connect you with a human agent who can better assist you.",
        "I'm still learning! Can you try asking in a different way?"
      ],
      goodbye: [
        "Thank you for chatting with me! Have a great day!",
        "It was nice talking with you. Feel free to return anytime!",
        "Goodbye! I hope I was helpful today."
      ]
    };
  }

  processMessage(message) {
    // Basic NLP processing
    const intent = this.detectIntent(message.toLowerCase());
    return this.generateResponse(intent);
  }

  detectIntent(message) {
    if (message.includes('hello') || message.includes('hi')) return 'greeting';
    if (message.includes('bye') || message.includes('goodbye')) return 'goodbye';
    if (message.includes('help') || message.includes('support')) return 'help';
    return 'general';
  }

  generateResponse(intent) {
    const responses = this.responses[intent] || this.responses.fallback;
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Integration Code
const chatbot = new ${formData.botName.replace(/\s+/g, '')}Chatbot();

// HTML Integration
const chatWidget = \`
<div id="ai-chatbot" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  z-index: 1000;
">
  <div style="
    background: #FFD700;
    color: black;
    padding: 15px;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
  ">
    💬 ${formData.botName}
  </div>
  <div id="chat-messages" style="
    height: 300px;
    overflow-y: auto;
    padding: 10px;
  "></div>
  <div style="
    padding: 10px;
    border-top: 1px solid #eee;
  ">
    <input type="text" id="chat-input" placeholder="Type your message..." style="
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 5px;
    ">
  </div>
</div>
\`;

// Features: ${formData.features.join(', ')}
// Platform: ${formData.platform}
// Complexity: ${formData.complexity}

// API Integration Ready
// Use API Key: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A for enhanced AI features`;

      setResult(chatbotCode);
      setIsGenerating(false);
    }, 2000);
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const availableFeatures = [
    'Multi-language support',
    'Voice recognition',
    'Sentiment analysis',
    'Integration with CRM',
    'Analytics dashboard',
    'Custom branding',
    'Mobile responsive',
    'File upload support'
  ];

  return (
    <AIToolLayout
      title="AI Chatbot Builder"
      description="Create custom chatbots for websites and messaging platforms with advanced AI capabilities and seamless integration."
      category="Conversational AI"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Bot Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Chatbot Name
          </label>
          <input
            type="text"
            value={formData.botName}
            onChange={(e) => setFormData(prev => ({ ...prev, botName: e.target.value }))}
            placeholder="e.g., CustomerSupport Bot"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        {/* Personality */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Personality
          </label>
          <select
            value={formData.personality}
            onChange={(e) => setFormData(prev => ({ ...prev, personality: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="friendly">Friendly & Casual</option>
            <option value="professional">Professional & Formal</option>
            <option value="enthusiastic">Enthusiastic & Energetic</option>
            <option value="empathetic">Empathetic & Caring</option>
            <option value="witty">Witty & Humorous</option>
          </select>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Industry Focus
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="general">General Purpose</option>
            <option value="ecommerce">E-commerce</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance & Banking</option>
            <option value="education">Education</option>
            <option value="realestate">Real Estate</option>
            <option value="travel">Travel & Tourism</option>
            <option value="saas">SaaS & Technology</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Platform
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['web', 'facebook', 'whatsapp', 'telegram'].map((platform) => (
              <button
                key={platform}
                onClick={() => setFormData(prev => ({ ...prev, platform }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.platform === platform
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Features
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableFeatures.map((feature) => (
              <label key={feature} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Complexity Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['basic', 'advanced', 'enterprise'].map((level) => (
              <button
                key={level}
                onClick={() => setFormData(prev => ({ ...prev, complexity: level }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.complexity === level
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
}