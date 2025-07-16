'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';
import { Brain, Calendar, Mail, CheckCircle, Clock, User } from 'lucide-react';

export default function AIVirtualAssistantPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    assistantName: '',
    primaryRole: 'productivity',
    personalityType: 'professional',
    capabilities: [] as string[],
    integrations: [] as string[],
    workingHours: '9-5',
    responseStyle: 'detailed',
    reminders: true,
    proactive: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const assistantConfig = `// AI Virtual Assistant: ${formData.assistantName}
// Generated with AI Virtual Assistant Builder

class ${formData.assistantName.replace(/\s+/g, '')}Assistant {
  constructor() {
    this.name = '${formData.assistantName}';
    this.role = '${formData.primaryRole}';
    this.personality = '${formData.personalityType}';
    this.capabilities = ${JSON.stringify(formData.capabilities)};
    this.integrations = ${JSON.stringify(formData.integrations)};
    this.workingHours = '${formData.workingHours}';
    this.responseStyle = '${formData.responseStyle}';
    this.proactiveMode = ${formData.proactive};
    this.reminderSystem = ${formData.reminders};
    this.initializeAssistant();
  }

  initializeAssistant() {
    console.log(\`Initializing \${this.name} - Your AI Virtual Assistant\`);
    this.setupCapabilities();
    this.loadIntegrations();
    this.startProactiveMode();
  }

  setupCapabilities() {
    const capabilityMap = {
      'email-management': this.manageEmails.bind(this),
      'calendar-scheduling': this.manageCalendar.bind(this),
      'task-management': this.manageTasks.bind(this),
      'meeting-preparation': this.prepareMeetings.bind(this),
      'document-organization': this.organizeDocuments.bind(this),
      'research-assistance': this.assistWithResearch.bind(this),
      'data-analysis': this.analyzeData.bind(this),
      'travel-planning': this.planTravel.bind(this)
    };

    this.capabilities.forEach(capability => {
      if (capabilityMap[capability]) {
        console.log(\`Capability enabled: \${capability}\`);
      }
    });
  }

  async processRequest(request) {
    const intent = await this.analyzeIntent(request);
    const response = await this.generateResponse(intent, request);
    
    if (this.proactiveMode) {
      await this.checkForProactiveActions();
    }
    
    return response;
  }

  analyzeIntent(request) {
    // Advanced NLP intent recognition
    const intents = {
      'schedule': ['schedule', 'calendar', 'meeting', 'appointment'],
      'email': ['email', 'send', 'reply', 'draft'],
      'task': ['task', 'todo', 'reminder', 'deadline'],
      'research': ['research', 'find', 'search', 'information'],
      'analysis': ['analyze', 'report', 'data', 'metrics']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => request.toLowerCase().includes(keyword))) {
        return intent;
      }
    }
    return 'general';
  }

  async manageEmails() {
    return {
      action: 'email_management',
      tasks: [
        'Prioritize urgent emails',
        'Draft responses for routine inquiries',
        'Schedule email sends for optimal times',
        'Organize emails into relevant folders',
        'Flag important messages for follow-up'
      ]
    };
  }

  async manageCalendar() {
    return {
      action: 'calendar_management',
      tasks: [
        'Find optimal meeting times',
        'Schedule recurring appointments',
        'Block focus time for deep work',
        'Send meeting reminders to participants',
        'Reschedule conflicts automatically'
      ]
    };
  }

  async manageTasks() {
    return {
      action: 'task_management',
      tasks: [
        'Prioritize tasks by importance and urgency',
        'Break down complex projects into subtasks',
        'Set realistic deadlines and reminders',
        'Track progress and completion rates',
        'Suggest task optimizations'
      ]
    };
  }

  async checkForProactiveActions() {
    const proactiveActions = [
      'Check for upcoming deadlines',
      'Suggest meeting preparation items',
      'Remind about pending tasks',
      'Analyze productivity patterns',
      'Recommend schedule optimizations'
    ];
    
    return proactiveActions;
  }

  generateDailyBriefing() {
    return \`
📅 Daily Briefing - \${new Date().toLocaleDateString()}

🎯 Top Priorities:
- Complete quarterly report analysis
- Prepare for 3 PM client meeting
- Review team performance metrics
- Follow up on pending proposals

📧 Email Summary:
- 12 new emails (3 urgent)
- 5 responses needed
- 2 meetings scheduled

⏰ Schedule Overview:
- 9:00 AM - Team standup
- 11:00 AM - Project review
- 3:00 PM - Client presentation
- 4:30 PM - Focus time blocked

💡 Productivity Insights:
- Most productive time: 9-11 AM
- Suggested focus time: 2-4 PM
- Meeting load: Moderate

🔔 Reminders:
- Submit expense report (Due: Tomorrow)
- Birthday: Sarah (Team Lead)
- Quarterly review prep needed
\`;
  }
}

// Integration Setup
const assistant = new ${formData.assistantName.replace(/\s+/g, '')}Assistant();

// API Integrations Available:
${formData.integrations.map(integration => `// - ${integration.charAt(0).toUpperCase() + integration.slice(1)} API`).join('\n')}

// Working Hours: ${formData.workingHours}
// Response Style: ${formData.responseStyle}
// Proactive Mode: ${formData.proactive ? 'Enabled' : 'Disabled'}
// Reminder System: ${formData.reminders ? 'Active' : 'Inactive'}

// Usage Example:
assistant.processRequest("Schedule a meeting with the marketing team for next week")
  .then(response => console.log(response));

// Daily Briefing:
console.log(assistant.generateDailyBriefing());

/* 
CAPABILITIES ENABLED:
${formData.capabilities.map(cap => `✓ ${cap.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`).join('\n')}

INTEGRATIONS:
${formData.integrations.map(int => `✓ ${int.charAt(0).toUpperCase() + int.slice(1)}`).join('\n')}

API Configuration:
- Google API Key: AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A
- Assistant will be available 24/7 with smart working hours respect
- Proactive suggestions based on user patterns and preferences
*/`;

      setResult(assistantConfig);
      setIsGenerating(false);
    }, 3000);
  };

  const handleCapabilityToggle = (capability: string) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(capability)
        ? prev.capabilities.filter(c => c !== capability)
        : [...prev.capabilities, capability]
    }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setFormData(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter(i => i !== integration)
        : [...prev.integrations, integration]
    }));
  };

  const availableCapabilities = [
    'email-management',
    'calendar-scheduling', 
    'task-management',
    'meeting-preparation',
    'document-organization',
    'research-assistance',
    'data-analysis',
    'travel-planning'
  ];

  const availableIntegrations = [
    'google-workspace',
    'microsoft-365',
    'slack',
    'trello',
    'asana',
    'zoom',
    'salesforce',
    'hubspot'
  ];

  return (
    <AIToolLayout
      title="AI Virtual Assistant"
      description="Create a personalized AI assistant for productivity, task management, and daily workflow optimization. Integrates with your favorite tools and platforms."
      category="Conversational AI"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Assistant Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-accent" />
            Assistant Name
          </label>
          <input
            type="text"
            value={formData.assistantName}
            onChange={(e) => setFormData(prev => ({ ...prev, assistantName: e.target.value }))}
            placeholder="e.g., Alex Assistant"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        {/* Primary Role */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Primary Role
          </label>
          <select
            value={formData.primaryRole}
            onChange={(e) => setFormData(prev => ({ ...prev, primaryRole: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="productivity">Productivity Assistant</option>
            <option value="executive">Executive Assistant</option>
            <option value="research">Research Assistant</option>
            <option value="project-manager">Project Manager</option>
            <option value="personal">Personal Assistant</option>
          </select>
        </div>

        {/* Personality Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Personality Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['professional', 'friendly', 'enthusiastic', 'analytical', 'supportive', 'efficient'].map((personality) => (
              <button
                key={personality}
                onClick={() => setFormData(prev => ({ ...prev, personalityType: personality }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.personalityType === personality
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {personality.charAt(0).toUpperCase() + personality.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent" />
            Capabilities
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
                  {capability.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Platform Integrations
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableIntegrations.map((integration) => (
              <label key={integration} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.integrations.includes(integration)}
                  onChange={() => handleIntegrationToggle(integration)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
                />
                <span className="text-sm text-foreground">
                  {integration.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            Working Hours
          </label>
          <select
            value={formData.workingHours}
            onChange={(e) => setFormData(prev => ({ ...prev, workingHours: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="24/7">24/7 Available</option>
            <option value="9-5">Business Hours (9 AM - 5 PM)</option>
            <option value="8-6">Extended Hours (8 AM - 6 PM)</option>
            <option value="flexible">Flexible Hours</option>
          </select>
        </div>

        {/* Response Style */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Response Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['concise', 'detailed', 'conversational'].map((style) => (
              <button
                key={style}
                onClick={() => setFormData(prev => ({ ...prev, responseStyle: style }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.responseStyle === style
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
          <label className="block text-sm font-medium text-foreground mb-3">
            Additional Features
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.reminders}
                onChange={(e) => setFormData(prev => ({ ...prev, reminders: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Smart Reminders & Notifications</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.proactive}
                onChange={(e) => setFormData(prev => ({ ...prev, proactive: e.target.checked }))}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent/20"
              />
              <span className="text-sm text-foreground">Proactive Suggestions & Insights</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 