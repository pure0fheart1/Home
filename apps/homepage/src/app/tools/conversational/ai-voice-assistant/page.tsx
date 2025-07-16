'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Mic, Volume2, Settings, Zap, Languages, Smartphone } from 'lucide-react';

export default function AIVoiceAssistantPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    assistantName: '',
    voiceType: 'female',
    language: 'english',
    platform: 'web',
    capabilities: [] as string[],
    wakeWord: 'hey-assistant',
    voiceSpeed: 'normal',
    voiceEmotions: true,
    noiseReduction: true,
    offline: false,
    multiLanguage: false,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const voiceAssistantConfig = `// AI Voice Assistant: ${formData.assistantName}
// Generated with AI Voice Assistant Builder

class ${formData.assistantName.replace(/\s+/g, '')}VoiceAssistant {
  constructor() {
    this.name = '${formData.assistantName}';
    this.voiceType = '${formData.voiceType}';
    this.language = '${formData.language}';
    this.platform = '${formData.platform}';
    this.capabilities = ${JSON.stringify(formData.capabilities)};
    this.wakeWord = '${formData.wakeWord.replace('-', ' ')}';
    this.voiceSpeed = '${formData.voiceSpeed}';
    this.isListening = false;
    this.isProcessing = false;
    this.currentConversation = [];
    this.initialize();
  }

  async initialize() {
    console.log('Initializing ' + this.name + ' Voice Assistant');
    await this.setupSpeechRecognition();
    await this.setupSpeechSynthesis();
    await this.loadCapabilities();
    this.startWakeWordDetection();
  }

  async setupSpeechRecognition() {
    const config = {
      language: this.language,
      continuous: true,
      interimResults: true,
      maxAlternatives: 1,
      ${formData.noiseReduction ? 'noiseReduction: true,' : ''}
      ${formData.offline ? 'offline: true,' : ''}
    };

    this.speechRecognition = new SpeechRecognition(config);
    
    this.speechRecognition.onresult = (event) => {
      this.handleSpeechResult(event);
    };

    this.speechRecognition.onerror = (error) => {
      console.error('Speech recognition error:', error);
      this.handleError(error);
    };

    this.speechRecognition.onend = () => {
      if (this.isListening) {
        this.speechRecognition.start();
      }
    };
  }

  async setupSpeechSynthesis() {
    const voices = speechSynthesis.getVoices();
    this.selectedVoice = voices.find(voice => 
      voice.gender === '${formData.voiceType}' && 
      voice.lang.includes('${formData.language}')
    ) || voices[0];

    this.speechConfig = {
      voice: this.selectedVoice,
      rate: this.getSpeedValue('${formData.voiceSpeed}'),
      pitch: 1.0,
      volume: 1.0,
      ${formData.voiceEmotions ? 'expressivity: "moderate",' : ''}
    };
  }

  startWakeWordDetection() {
    console.log('Listening for wake word: "' + this.wakeWord + '"');
    this.speechRecognition.start();
  }

  handleSpeechResult(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    
    if (!this.isListening && transcript.toLowerCase().includes(this.wakeWord)) {
      this.activateAssistant();
      return;
    }

    if (this.isListening && event.results[event.results.length - 1].isFinal) {
      this.processCommand(transcript);
    }
  }

  activateAssistant() {
    this.isListening = true;
    this.speak("Yes, how can I help you?");
    console.log(this.name + ' activated');
    this.showListeningIndicator();
  }

  async processCommand(command) {
    this.isProcessing = true;
    console.log('Processing command: "' + command + '"');

    try {
      const intent = await this.analyzeIntent(command);
      const response = await this.generateResponse(intent, command);
      
      this.currentConversation.push({
        user: command,
        assistant: response,
        timestamp: new Date()
      });

      await this.speak(response);
      
    } catch (error) {
      console.error('Error processing command:', error);
      await this.speak("I'm sorry, I didn't understand that. Could you please repeat?");
    }
    
    this.isProcessing = false;
  }

  async analyzeIntent(command) {
    const intents = {
      'weather': ['weather', 'temperature', 'forecast', 'rain', 'sunny'],
      'time': ['time', 'date', 'what time', 'what day'],
      'music': ['play', 'music', 'song', 'playlist', 'volume'],
      'smart-home': ['lights', 'temperature', 'door', 'security', 'camera'],
      'calendar': ['schedule', 'meeting', 'appointment', 'remind', 'calendar'],
      'search': ['search', 'find', 'look up', 'what is', 'who is'],
      'calculation': ['calculate', 'math', 'plus', 'minus', 'times', 'divided'],
      'timer': ['timer', 'alarm', 'set timer', 'countdown'],
      'news': ['news', 'latest', 'headlines', 'current events']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => command.toLowerCase().includes(keyword))) {
        return intent;
      }
    }
    return 'general';
  }

  async generateResponse(intent, command) {
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    
    const responses = {
      'weather': 'Based on current data, it is 72°F and partly cloudy. Would you like a detailed forecast?',
      'time': 'It is currently ' + currentTime + '. Today is ' + currentDate + '.',
      'music': 'I would be happy to help with music. What would you like me to play?',
      'smart-home': 'I can help control your smart home devices. Which device would you like to adjust?',
      'calendar': 'Let me check your calendar. You have 2 meetings scheduled for today.',
      'search': 'I will search for that information. Let me find what you are looking for.',
      'calculation': 'I can help with calculations. What would you like me to compute?',
      'timer': 'Timer functionality ready. How long would you like me to set it for?',
      'news': 'Here are today\\'s top headlines: Technology stocks are up, and there\\'s breaking news...',
      'general': 'I understand you said "' + command + '". How can I assist you with that?'
    };

    return responses[intent] || responses['general'];
  }

  async speak(text) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      Object.assign(utterance, this.speechConfig);
      
      utterance.onend = () => resolve();
      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        resolve();
      };

      speechSynthesis.speak(utterance);
    });
  }

  getSpeedValue(speed) {
    const speeds = { slow: 0.7, normal: 1.0, fast: 1.3 };
    return speeds[speed] || 1.0;
  }

  showListeningIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'voice-listening-indicator';
    indicator.innerHTML = '<div style="position: fixed; top: 20px; right: 20px; background: #FFD700; color: black; padding: 10px 15px; border-radius: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; display: flex; align-items: center; gap: 8px; animation: pulse 2s infinite;">🎤 Listening...</div>';
    document.body.appendChild(indicator);

    setTimeout(() => {
      const elem = document.getElementById('voice-listening-indicator');
      if (elem) elem.remove();
      this.isListening = false;
    }, 10000);
  }

  generateConversationLog() {
    let log = 'Voice Assistant Conversation Log\\n\\n';
    log += 'Assistant Name: ' + this.name + '\\n';
    log += 'Session: ' + new Date().toLocaleDateString() + '\\n\\n';
    
    this.currentConversation.forEach((conv, index) => {
      log += (index + 1) + '. User: "' + conv.user + '"\\n';
      log += '   Assistant: "' + conv.assistant + '"\\n';
      log += '   Time: ' + conv.timestamp.toLocaleTimeString() + '\\n\\n';
    });
    
    log += 'Total Interactions: ' + this.currentConversation.length;
    return log;
  }
}

// Initialize the assistant
const assistant = new ${formData.assistantName.replace(/\s+/g, '')}VoiceAssistant();

// Configuration Summary:
// Name: ${formData.assistantName}
// Voice: ${formData.voiceType} voice
// Language: ${formData.language}
// Platform: ${formData.platform}
// Wake Word: "${formData.wakeWord.replace('-', ' ')}"
// Speed: ${formData.voiceSpeed}
// Capabilities: ${formData.capabilities.join(', ')}

// API Integration:
// Speech Recognition: Google Web Speech API
// Text-to-Speech: Browser SpeechSynthesis API
// Enhanced Features: Google AI API (AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A)

// Usage:
assistant.initialize().then(() => {
  console.log('Voice Assistant ready!');
  console.log('Say "' + assistant.wakeWord + '" to activate');
});

// Features Enabled:
${formData.noiseReduction ? '// ✓ Noise reduction' : ''}
${formData.voiceEmotions ? '// ✓ Emotional voice synthesis' : ''}
${formData.offline ? '// ✓ Offline capabilities' : ''}
${formData.multiLanguage ? '// ✓ Multi-language support' : ''}

// Supported Capabilities:
${formData.capabilities.map(cap => `// ✓ ${cap.charAt(0).toUpperCase() + cap.slice(1)} integration`).join('\\n')}

// Platform: ${formData.platform.charAt(0).toUpperCase() + formData.platform.slice(1)}
// Voice Type: ${formData.voiceType.charAt(0).toUpperCase() + formData.voiceType.slice(1)}
// Language: ${formData.language.charAt(0).toUpperCase() + formData.language.slice(1)}`;

      setResult(voiceAssistantConfig);
      setIsGenerating(false);
    }, 4000);
  };

  const handleCapabilityToggle = (capability: string) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(capability)
        ? prev.capabilities.filter(c => c !== capability)
        : [...prev.capabilities, capability]
    }));
  };

  const availableCapabilities = [
    'weather',
    'music',
    'smart-home',
    'calendar',
    'search',
    'timer',
    'news',
    'calculator',
  ];

  return (
    <AIToolLayout
      title="AI Voice Assistant"
      description="Create intelligent voice-enabled AI assistants with speech recognition, natural language processing, and voice synthesis capabilities for any platform."
      category="Conversational AI"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Assistant Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Mic className="w-4 h-4 text-accent" />
            Assistant Name
          </label>
          <input
            type="text"
            value={formData.assistantName}
            onChange={(e) => setFormData(prev => ({ ...prev, assistantName: e.target.value }))}
            placeholder="e.g., Aria Voice Assistant"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        {/* Voice Configuration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-accent" />
              Voice Type
            </label>
            <select
              value={formData.voiceType}
              onChange={(e) => setFormData(prev => ({ ...prev, voiceType: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="female">Female Voice</option>
              <option value="male">Male Voice</option>
              <option value="neutral">Neutral Voice</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Languages className="w-4 h-4 text-accent" />
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="italian">Italian</option>
              <option value="portuguese">Portuguese</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
            </select>
          </div>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-accent" />
            Target Platform
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['web', 'mobile', 'desktop', 'iot'].map((platform) => (
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

        {/* Wake Word */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Wake Word/Phrase
          </label>
          <select
            value={formData.wakeWord}
            onChange={(e) => setFormData(prev => ({ ...prev, wakeWord: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="hey-assistant">Hey Assistant</option>
            <option value="ok-assistant">OK Assistant</option>
            <option value="hello-assistant">Hello Assistant</option>
            <option value="computer">Computer</option>
            <option value="assistant">Assistant</option>
          </select>
        </div>

        {/* Voice Speed */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Speaking Speed
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['slow', 'normal', 'fast'].map((speed) => (
              <button
                key={speed}
                onClick={() => setFormData(prev => ({ ...prev, voiceSpeed: speed }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.voiceSpeed === speed
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {speed.charAt(0).toUpperCase() + speed.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Voice Capabilities
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableCapabilities.map((capability) => (
              <label key={capability} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.capabilities.includes(capability)}
                  onChange={() => handleCapabilityToggle(capability)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {capability.charAt(0).toUpperCase() + capability.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-accent" />
            Advanced Options
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.voiceEmotions}
                onChange={(e) => setFormData(prev => ({ ...prev, voiceEmotions: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Emotional Voice Synthesis</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.noiseReduction}
                onChange={(e) => setFormData(prev => ({ ...prev, noiseReduction: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Noise Reduction</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.offline}
                onChange={(e) => setFormData(prev => ({ ...prev, offline: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Offline Capabilities</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.multiLanguage}
                onChange={(e) => setFormData(prev => ({ ...prev, multiLanguage: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Multi-Language Support</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 