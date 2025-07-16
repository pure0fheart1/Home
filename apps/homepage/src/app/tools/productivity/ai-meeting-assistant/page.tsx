'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIMeetingAssistant() {
  const [meetingType, setMeetingType] = useState('team');
  const [meetingPurpose, setMeetingPurpose] = useState('');
  const [duration, setDuration] = useState('60');
  const [participants, setParticipants] = useState('');
  const [agenda, setAgenda] = useState('');
  const [transcription, setTranscription] = useState(true);
  const [actionItems, setActionItems] = useState(true);
  const [summaryType, setSummaryType] = useState('detailed');
  const [followUpReminders, setFollowUpReminders] = useState(true);
  const [meetingNotes, setMeetingNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const meetingTypes = [
    { id: 'team', label: 'Team Meeting', description: 'Regular team sync or standup' },
    { id: 'client', label: 'Client Meeting', description: 'External client or customer meeting' },
    { id: 'project', label: 'Project Review', description: 'Project status and planning' },
    { id: 'brainstorm', label: 'Brainstorming', description: 'Creative ideation session' },
    { id: 'presentation', label: 'Presentation', description: 'Formal presentation or demo' },
    { id: 'interview', label: 'Interview', description: 'Job interview or evaluation' },
    { id: 'training', label: 'Training', description: 'Learning or skill development' },
    { id: 'board', label: 'Board Meeting', description: 'Executive or board meeting' }
  ];

  const durations = [
    { id: '15', label: '15 minutes', description: 'Quick check-in' },
    { id: '30', label: '30 minutes', description: 'Standard meeting' },
    { id: '60', label: '1 hour', description: 'Detailed discussion' },
    { id: '90', label: '1.5 hours', description: 'Extended meeting' },
    { id: '120', label: '2 hours', description: 'Workshop or deep dive' }
  ];

  const summaryTypes = [
    { id: 'brief', label: 'Brief', description: 'Key points only' },
    { id: 'detailed', label: 'Detailed', description: 'Comprehensive summary' },
    { id: 'action-focused', label: 'Action-Focused', description: 'Emphasis on action items' },
    { id: 'executive', label: 'Executive', description: 'High-level overview' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const selectedType = meetingTypes.find(t => t.id === meetingType);
    const selectedDuration = durations.find(d => d.id === duration);
    const selectedSummary = summaryTypes.find(s => s.id === summaryType);
    
    const mockResult = `# AI Meeting Assistant Report

## Meeting Details
**Type**: ${selectedType?.label} - ${selectedType?.description}
**Purpose**: ${meetingPurpose || 'General discussion and updates'}
**Duration**: ${selectedDuration?.label}
**Date**: ${new Date().toLocaleDateString()}
**Time**: ${new Date().toLocaleTimeString()}

## Participants
${participants ? participants.split('\n').map(p => `• ${p.trim()}`).join('\n') : '• No participants specified'}

## Pre-Meeting Preparation

### Generated Agenda:
${generateAgenda(selectedType, meetingPurpose, agenda)}

### Meeting Materials:
- **Presentation Template**: ${selectedType?.id === 'presentation' ? 'Created and ready' : 'Not required'}
- **Shared Documents**: Folder created for meeting resources
- **Screen Share Setup**: ${selectedType?.id === 'presentation' ? 'Configured' : 'Available if needed'}
- **Recording Setup**: ${transcription ? 'Enabled' : 'Disabled'}

### Participant Preparation:
- **Pre-meeting Survey**: ${selectedType?.id === 'brainstorm' ? 'Sent to gather ideas' : 'Not required'}
- **Background Reading**: Relevant documents shared 24h in advance
- **Technical Check**: Video/audio test completed
- **Agenda Distribution**: Sent to all participants

## Meeting Analysis

### Engagement Metrics:
- **Participation Rate**: ${Math.floor(Math.random() * 20) + 80}%
- **Speaking Time Distribution**: Balanced across participants
- **Question/Answer Ratio**: ${Math.floor(Math.random() * 5) + 3}:1
- **Meeting Pace**: ${getMeetingPace(selectedType)}

### Content Analysis:
${generateContentAnalysis(selectedType, meetingNotes)}

### Discussion Topics:
${generateDiscussionTopics(selectedType, meetingPurpose)}

## Meeting Summary

### ${selectedSummary?.label} Summary:
${generateMeetingSummary(selectedSummary, selectedType, meetingNotes)}

### Key Decisions:
${generateKeyDecisions(selectedType, meetingPurpose)}

### Important Points:
${generateImportantPoints(selectedType)}

## Action Items & Follow-ups

### Generated Action Items:
${actionItems ? generateActionItems(selectedType, meetingPurpose) : '• Action item tracking disabled'}

### Follow-up Schedule:
${followUpReminders ? generateFollowUpSchedule(selectedType) : '• Follow-up reminders disabled'}

### Accountability Matrix:
${generateAccountabilityMatrix(selectedType, participants)}

## Meeting Transcription

### Transcription Status:
${transcription ? 
`- **Status**: Complete
- **Accuracy**: ${Math.floor(Math.random() * 10) + 90}%
- **Processing Time**: ${Math.floor(Math.random() * 5) + 2} minutes
- **Format**: Text with speaker identification
- **Searchable**: Yes, with keyword indexing` :
'- Transcription feature disabled'}

### Key Quotes:
${transcription ? generateKeyQuotes(selectedType) : '• Not available without transcription'}

## Meeting Effectiveness Analysis

### Productivity Metrics:
- **Meeting Efficiency**: ${Math.floor(Math.random() * 15) + 85}%
- **Goal Achievement**: ${Math.floor(Math.random() * 20) + 80}%
- **Time Utilization**: ${Math.floor(Math.random() * 10) + 90}%
- **Participant Satisfaction**: ${Math.floor(Math.random() * 15) + 85}%

### Improvement Suggestions:
${generateImprovementSuggestions(selectedType, duration)}

### Meeting Health Score:
**Overall Score**: ${Math.floor(Math.random() * 20) + 80}/100
- Structure: ${Math.floor(Math.random() * 10) + 90}%
- Engagement: ${Math.floor(Math.random() * 15) + 85}%
- Outcomes: ${Math.floor(Math.random() * 10) + 90}%
- Efficiency: ${Math.floor(Math.random() * 15) + 85}%

## Documentation & Sharing

### Meeting Record:
- **Meeting Minutes**: Auto-generated and formatted
- **Action Item List**: Exported to task management system
- **Decision Log**: Documented with context and rationale
- **Follow-up Items**: Scheduled in calendar

### Distribution:
- **Attendees**: Summary sent within 2 hours
- **Stakeholders**: Executive summary shared
- **Archive**: Stored in meeting repository
- **Knowledge Base**: Key insights added to organization wiki

## Integration & Automation

### System Integration:
- **Calendar**: Follow-up meetings scheduled automatically
- **Task Management**: Action items added to project boards
- **CRM**: Client meeting notes synced to customer records
- **Email**: Summary and action items sent via email

### Automated Workflows:
- **Reminder System**: Automated follow-up reminders sent
- **Progress Tracking**: Action item completion monitored
- **Escalation**: Overdue items automatically escalated
- **Reporting**: Weekly meeting effectiveness reports generated

## Next Steps

### Immediate Actions:
1. **Distribute Meeting Summary**: Send to all participants
2. **Schedule Follow-ups**: Book next meeting if required
3. **Assign Action Items**: Notify responsible parties
4. **Update Project Status**: Reflect decisions in project tracking

### Long-term Optimization:
- **Meeting Pattern Analysis**: Review recurring meeting effectiveness
- **Participant Feedback**: Collect feedback for continuous improvement
- **Process Refinement**: Update meeting templates and processes
- **Training**: Provide meeting best practices training

## Quality Assurance

### Accuracy Verification:
- **Content Review**: ${Math.floor(Math.random() * 10) + 90}% accuracy confirmed
- **Action Item Validation**: All items reviewed and confirmed
- **Participant Verification**: Summary approved by key attendees
- **Compliance Check**: Meeting documentation meets standards

### Security & Privacy:
- **Data Encryption**: All meeting data encrypted at rest and in transit
- **Access Control**: Restricted access based on participant roles
- **Retention Policy**: Data retained according to organization policy
- **Audit Trail**: Complete log of all meeting-related activities

*Meeting analysis completed on ${new Date().toLocaleDateString()} using AI Meeting Assistant*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generateAgenda = (type: any, purpose: string, customAgenda: string) => {
    if (customAgenda) {
      return customAgenda.split('\n').map(item => `• ${item.trim()}`).join('\n');
    }
    
    const agendas = {
      team: `• Team updates and progress review
• Current sprint/project status
• Blockers and challenges discussion
• Upcoming priorities and deadlines
• Resource allocation and planning`,
      client: `• Welcome and introductions
• Project status update
• Client feedback and requirements
• Next steps and deliverables
• Timeline and milestone review`,
      project: `• Project milestone review
• Budget and resource status
• Risk assessment and mitigation
• Quality assurance update
• Stakeholder communication`,
      brainstorm: `• Problem statement and context
• Ideation session guidelines
• Brainstorming activities
• Idea evaluation and prioritization
• Next steps and action planning`
    };
    
    return agendas[type?.id as keyof typeof agendas] || 'Standard meeting agenda items';
  };

  const generateContentAnalysis = (type: any, notes: string) => {
    if (notes) {
      return `Based on meeting notes provided:
• Key themes identified and categorized
• Sentiment analysis: Generally positive tone
• Content complexity: Appropriate for audience
• Information density: Well-balanced discussion`;
    }
    
    return `• Discussion topics well-structured and relevant
• Balanced participation from all attendees
• Clear progression through agenda items
• Appropriate level of detail for ${type?.label.toLowerCase()}`;
  };

  const generateDiscussionTopics = (type: any, purpose: string) => {
    const topics = {
      team: `• Sprint planning and task allocation
• Technical challenges and solutions
• Process improvements and efficiency
• Team collaboration and communication`,
      client: `• Project deliverables and timeline
• Client requirements and feedback
• Budget considerations and approvals
• Communication protocols and updates`,
      project: `• Milestone achievements and delays
• Resource allocation and staffing
• Risk management and contingencies
• Quality standards and testing`
    };
    
    const baseTopic = topics[type?.id as keyof typeof topics] || '• General discussion topics';
    
    if (purpose) {
      return `${baseTopic}\n• ${purpose} - specific discussion points`;
    }
    
    return baseTopic;
  };

  const generateMeetingSummary = (summaryType: any, type: any, notes: string) => {
    const summaries = {
      brief: `Meeting objectives achieved with key decisions made. All participants contributed effectively. Action items assigned and follow-up scheduled.`,
      detailed: `The ${type?.label.toLowerCase()} covered all agenda items comprehensively. Participants engaged in productive discussions, leading to several important decisions. Key challenges were identified and solutions proposed. All action items were clearly defined with responsible parties assigned.`,
      'action-focused': `Primary focus on deliverables and next steps. Action items clearly defined with deadlines and ownership. Follow-up meetings scheduled to track progress.`,
      executive: `High-level overview: Meeting objectives met, key decisions made, and action items assigned. Overall productivity high with positive outcomes.`
    };
    
    return summaries[summaryType?.id as keyof typeof summaries] || 'Standard meeting summary';
  };

  const generateKeyDecisions = (type: any, purpose: string) => {
    const decisions = {
      team: `• Sprint goals and priorities confirmed
• Resource allocation approved
• Process improvements implemented
• Next meeting scheduled`,
      client: `• Project scope and deliverables agreed
• Timeline and milestones confirmed
• Budget allocation approved
• Communication schedule established`,
      project: `• Project direction and priorities set
• Resource requirements approved
• Risk mitigation strategies adopted
• Quality standards confirmed`
    };
    
    return decisions[type?.id as keyof typeof decisions] || '• Key decisions documented and approved';
  };

  const generateImportantPoints = (type: any) => {
    return `• All participants actively engaged in discussions
• Clear communication and understanding achieved
• Potential risks identified and addressed
• Follow-up actions clearly defined
• Meeting objectives successfully met`;
  };

  const generateActionItems = (type: any, purpose: string) => {
    return `• Finalize project deliverables (Due: Next Friday, Owner: Project Manager)
• Conduct stakeholder review (Due: This Week, Owner: Team Lead)
• Update project documentation (Due: Next Monday, Owner: Technical Writer)
• Schedule follow-up meeting (Due: Tomorrow, Owner: Meeting Organizer)
• Prepare status report (Due: End of Week, Owner: Project Coordinator)`;
  };

  const generateFollowUpSchedule = (type: any) => {
    return `• 24-hour reminder: Action item deadlines approaching
• 48-hour follow-up: Progress check with assigned owners
• Weekly review: Overall action item completion status
• Next meeting: Scheduled based on urgency and priorities`;
  };

  const generateAccountabilityMatrix = (type: any, participants: string) => {
    return `• Primary Responsibility: Project Manager
• Secondary Support: Team Members
• Review Authority: Department Head
• Reporting Structure: Weekly status updates
• Escalation Path: Department Head → Director → VP`;
  };

  const generateKeyQuotes = (type: any) => {
    return `• "We need to prioritize quality over speed in this phase"
• "The client feedback has been overwhelmingly positive"
• "Let's schedule a follow-up to review the implementation"
• "This approach will save us significant time and resources"`;
  };

  const getMeetingPace = (type: any) => {
    const paces = {
      team: 'Steady and collaborative',
      client: 'Professional and measured',
      project: 'Focused and efficient',
      brainstorm: 'Dynamic and creative'
    };
    
    return paces[type?.id as keyof typeof paces] || 'Well-paced and engaging';
  };

  const generateImprovementSuggestions = (type: any, duration: string) => {
    const durationNum = parseInt(duration);
    
    let suggestions = [];
    
    if (durationNum > 90) {
      suggestions.push('• Consider breaking long meetings into shorter, focused sessions');
    }
    
    if (type?.id === 'brainstorm') {
      suggestions.push('• Include more interactive elements and visual aids');
    }
    
    suggestions.push('• Send agenda 24 hours in advance for better preparation');
    suggestions.push('• Consider recording for absent team members');
    
    return suggestions.join('\n');
  };

  return (
    <AIToolLayout
      title="AI Meeting Assistant"
      description="Intelligent meeting preparation, analysis, and follow-up automation"
      category="Productivity"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Meeting Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Meeting Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {meetingTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setMeetingType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  meetingType === type.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{type.label}</div>
                <div className="text-sm text-gray-600">{type.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Purpose */}
        <div>
          <label className="block text-sm font-medium mb-3">Meeting Purpose</label>
          <input
            type="text"
            value={meetingPurpose}
            onChange={(e) => setMeetingPurpose(e.target.value)}
            placeholder="Brief description of meeting purpose"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-3">Duration</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {durations.map((d) => (
              <div
                key={d.id}
                onClick={() => setDuration(d.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  duration === d.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{d.label}</div>
                <div className="text-xs text-gray-600">{d.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Participants */}
        <div>
          <label className="block text-sm font-medium mb-3">Participants</label>
          <textarea
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="Enter participant names or emails (one per line)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Agenda */}
        <div>
          <label className="block text-sm font-medium mb-3">Custom Agenda (optional)</label>
          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            placeholder="Enter agenda items (one per line) - leave blank for AI-generated agenda"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Meeting Notes */}
        <div>
          <label className="block text-sm font-medium mb-3">Meeting Notes (optional)</label>
          <textarea
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
            placeholder="Enter meeting notes or key discussion points for analysis"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-32 resize-none"
          />
        </div>

        {/* Summary Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Summary Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {summaryTypes.map((summary) => (
              <div
                key={summary.id}
                onClick={() => setSummaryType(summary.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  summaryType === summary.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{summary.label}</div>
                <div className="text-xs text-gray-600">{summary.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features */}
        <div>
          <label className="block text-sm font-medium mb-3">AI Features</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={transcription}
                onChange={(e) => setTranscription(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Enable transcription and speech analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={actionItems}
                onChange={(e) => setActionItems(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Auto-generate action items</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={followUpReminders}
                onChange={(e) => setFollowUpReminders(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Set up follow-up reminders</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 