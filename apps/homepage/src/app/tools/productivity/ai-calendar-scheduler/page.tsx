'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AICalendarScheduler() {
  const [eventType, setEventType] = useState('meeting');
  const [eventTitle, setEventTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [duration, setDuration] = useState('60');
  const [priority, setPriority] = useState('medium');
  const [preferredTimes, setPreferredTimes] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [recurringPattern, setRecurringPattern] = useState('none');
  const [bufferTime, setBufferTime] = useState('15');
  const [meetingType, setMeetingType] = useState('virtual');
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [conflictResolution, setConflictResolution] = useState('suggest');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const eventTypes = [
    { id: 'meeting', label: 'Meeting', description: 'Regular business meeting' },
    { id: 'presentation', label: 'Presentation', description: 'Presentation or demo' },
    { id: 'workshop', label: 'Workshop', description: 'Training or workshop session' },
    { id: 'interview', label: 'Interview', description: 'Job interview or evaluation' },
    { id: 'call', label: 'Phone Call', description: 'Phone or video call' },
    { id: 'brainstorm', label: 'Brainstorming', description: 'Creative brainstorming session' },
    { id: 'review', label: 'Review', description: 'Project or performance review' },
    { id: 'planning', label: 'Planning', description: 'Strategic planning session' }
  ];

  const priorities = [
    { id: 'low', label: 'Low', description: 'Flexible scheduling' },
    { id: 'medium', label: 'Medium', description: 'Standard priority' },
    { id: 'high', label: 'High', description: 'Important, minimize delays' },
    { id: 'urgent', label: 'Urgent', description: 'Schedule immediately' }
  ];

  const durations = [
    { id: '15', label: '15 minutes', description: 'Quick check-in' },
    { id: '30', label: '30 minutes', description: 'Standard meeting' },
    { id: '60', label: '1 hour', description: 'Detailed discussion' },
    { id: '90', label: '1.5 hours', description: 'Extended meeting' },
    { id: '120', label: '2 hours', description: 'Workshop or training' },
    { id: '180', label: '3 hours', description: 'Long session' }
  ];

  const timezones = [
    { id: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { id: 'EST', label: 'EST (Eastern Standard Time)' },
    { id: 'PST', label: 'PST (Pacific Standard Time)' },
    { id: 'GMT', label: 'GMT (Greenwich Mean Time)' },
    { id: 'CET', label: 'CET (Central European Time)' },
    { id: 'JST', label: 'JST (Japan Standard Time)' },
    { id: 'AEST', label: 'AEST (Australian Eastern Standard Time)' }
  ];

  const recurringPatterns = [
    { id: 'none', label: 'None', description: 'One-time event' },
    { id: 'daily', label: 'Daily', description: 'Repeat daily' },
    { id: 'weekly', label: 'Weekly', description: 'Repeat weekly' },
    { id: 'biweekly', label: 'Bi-weekly', description: 'Every two weeks' },
    { id: 'monthly', label: 'Monthly', description: 'Repeat monthly' },
    { id: 'quarterly', label: 'Quarterly', description: 'Every three months' }
  ];

  const meetingTypes = [
    { id: 'virtual', label: 'Virtual', description: 'Video conference' },
    { id: 'in-person', label: 'In-person', description: 'Physical meeting' },
    { id: 'hybrid', label: 'Hybrid', description: 'Both virtual and in-person' },
    { id: 'phone', label: 'Phone', description: 'Phone call only' }
  ];

  const conflictResolutions = [
    { id: 'suggest', label: 'Suggest alternatives', description: 'Propose alternative times' },
    { id: 'override', label: 'Override conflicts', description: 'Schedule anyway' },
    { id: 'reschedule', label: 'Auto-reschedule', description: 'Move conflicting events' },
    { id: 'notify', label: 'Notify only', description: 'Just notify about conflicts' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const selectedEventType = eventTypes.find(t => t.id === eventType);
    const selectedPriority = priorities.find(p => p.id === priority);
    const selectedDuration = durations.find(d => d.id === duration);
    const selectedRecurring = recurringPatterns.find(r => r.id === recurringPattern);
    const selectedMeetingType = meetingTypes.find(m => m.id === meetingType);
    
    const mockResult = `# AI Calendar Scheduling Result

## Event Details
**Title**: ${eventTitle || 'Untitled Event'}
**Type**: ${selectedEventType?.label} - ${selectedEventType?.description}
**Duration**: ${selectedDuration?.label}
**Priority**: ${selectedPriority?.label}
**Meeting Type**: ${selectedMeetingType?.label}
**Timezone**: ${timezone}
**Recurring**: ${selectedRecurring?.label}

## Participants
${participants ? participants.split('\n').map(p => `• ${p.trim()}`).join('\n') : '• No participants specified'}

## AI-Optimized Schedule Recommendations

### Recommended Time Slots:
${generateTimeSlots(selectedPriority, selectedDuration, preferredTimes)}

### Optimal Scheduling:
- **Best Time**: ${getOptimalTime(selectedPriority, selectedEventType)}
- **Productivity Score**: ${Math.floor(Math.random() * 15) + 85}%
- **Conflict Risk**: ${getConflictRisk(selectedPriority)}
- **Participant Availability**: ${Math.floor(Math.random() * 20) + 80}%

### Buffer Time Analysis:
- **Before Meeting**: ${bufferTime} minutes (${getBufferAnalysis(bufferTime, 'before')})
- **After Meeting**: ${bufferTime} minutes (${getBufferAnalysis(bufferTime, 'after')})
- **Travel Time**: ${selectedMeetingType?.id === 'in-person' ? '30 minutes recommended' : 'Not applicable'}

## Calendar Optimization

### Conflict Detection:
${generateConflictAnalysis(selectedPriority, conflictResolution)}

### Scheduling Efficiency:
- **Calendar Density**: Optimal (65% utilization)
- **Meeting Clustering**: Recommended grouping identified
- **Focus Time**: ${getDuration()} minutes of uninterrupted work time preserved
- **Energy Levels**: Scheduled during ${getEnergyLevel()} energy period

## Meeting Preparation

### Pre-meeting Setup:
- **Room/Link**: ${selectedMeetingType?.id === 'virtual' ? 'Video conference link generated' : 'Room booking required'}
- **Agenda**: ${selectedEventType?.id === 'meeting' ? 'Template agenda created' : 'Specialized agenda for ' + selectedEventType?.label}
- **Materials**: Preparation checklist generated
- **Reminders**: Set for 24h, 1h, and 15min before

### Participant Coordination:
- **Invitations**: ${getParticipantCount()} calendar invitations prepared
- **Timezone Display**: All times shown in participant local timezones
- **Availability Check**: ${Math.floor(Math.random() * 20) + 80}% participant availability confirmed
- **Alternative Options**: 3 backup time slots identified

## Automated Actions

### Calendar Integration:
- **Event Created**: Ready to sync with Google Calendar, Outlook, Apple Calendar
- **Recurring Pattern**: ${selectedRecurring?.id !== 'none' ? `Set for ${selectedRecurring?.label.toLowerCase()}` : 'Single event'}
- **Notifications**: Smart reminders configured
- **Blocking**: Focus time automatically blocked around meeting

### AI Recommendations:
${generateAIRecommendations(selectedEventType, selectedPriority, selectedDuration)}

## Follow-up Actions

### Post-meeting:
- **Meeting Notes**: Template prepared for key decisions and action items
- **Action Items**: Automatic tracking and assignment
- **Follow-up Meetings**: Suggested based on meeting outcomes
- **Feedback**: Post-meeting survey scheduled

### Analytics:
- **Meeting Efficiency**: Track time utilization
- **Participant Engagement**: Monitor attendance patterns
- **Outcome Tracking**: Measure meeting success metrics
- **Calendar Health**: Monitor overall scheduling patterns

## Resource Requirements

### Technical Setup:
- **Platform**: ${selectedMeetingType?.id === 'virtual' ? 'Zoom/Teams/Meet link ready' : 'Physical room required'}
- **Equipment**: ${getEquipmentNeeds(selectedEventType, selectedMeetingType)}
- **Documents**: Shared folder created for meeting materials
- **Recording**: ${selectedMeetingType?.id === 'virtual' ? 'Auto-recording enabled' : 'Not applicable'}

### Budget Impact:
- **Time Cost**: ${calculateTimeCost(selectedDuration, participants)} (estimated)
- **Resource Cost**: ${selectedMeetingType?.id === 'in-person' ? 'Room booking fee' : 'Virtual platform cost'}
- **Opportunity Cost**: ${getOpportunityCost(selectedPriority)} priority conflicts avoided
- **ROI Projection**: ${Math.floor(Math.random() * 200) + 150}% expected return on meeting investment

*Schedule optimized on ${new Date().toLocaleDateString()} using AI Calendar Scheduler*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generateTimeSlots = (priority: any, duration: any, preferred: string) => {
    const slots = [
      '• Tuesday, March 12, 2024 at 10:00 AM - 11:00 AM',
      '• Wednesday, March 13, 2024 at 2:00 PM - 3:00 PM',
      '• Thursday, March 14, 2024 at 9:00 AM - 10:00 AM'
    ];
    
    if (preferred) {
      return `Based on your preferred times (${preferred}):\n${slots.join('\n')}`;
    }
    
    return `AI-optimized time slots:\n${slots.join('\n')}`;
  };

  const getOptimalTime = (priority: any, eventType: any) => {
    const times = {
      urgent: 'Next available slot (within 2 hours)',
      high: 'Tomorrow 10:00 AM',
      medium: 'This week Tuesday 2:00 PM',
      low: 'Next week when convenient'
    };
    return times[priority?.id as keyof typeof times] || 'Tuesday 2:00 PM';
  };

  const getConflictRisk = (priority: any) => {
    const risks = {
      urgent: 'High (may override existing meetings)',
      high: 'Medium (careful scheduling required)',
      medium: 'Low (flexible timing)',
      low: 'Very Low (easy to accommodate)'
    };
    return risks[priority?.id as keyof typeof risks] || 'Low';
  };

  const getBufferAnalysis = (bufferTime: string, position: string) => {
    const time = parseInt(bufferTime);
    if (time >= 30) return 'Generous buffer, excellent for preparation';
    if (time >= 15) return 'Good buffer time for transitions';
    return 'Minimal buffer, consider extending';
  };

  const generateConflictAnalysis = (priority: any, resolution: string) => {
    return `• No major conflicts detected
• 2 minor scheduling overlaps resolved using ${resolution} strategy
• ${priority?.id === 'urgent' ? 'Override permissions applied' : 'Respectful scheduling maintained'}
• Alternative time slots prepared for flexibility`;
  };

  const getDuration = () => Math.floor(Math.random() * 60) + 30;

  const getEnergyLevel = () => {
    const levels = ['high', 'medium-high', 'optimal'];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const getParticipantCount = () => {
    const count = participants ? participants.split('\n').filter(p => p.trim()).length : 0;
    return count || 'Multiple';
  };

  const generateAIRecommendations = (eventType: any, priority: any, duration: any) => {
    return `• ${eventType?.id === 'meeting' ? 'Send agenda 24h before meeting' : 'Prepare specialized materials'}
• ${priority?.id === 'urgent' ? 'Consider shorter duration for efficiency' : 'Duration appropriate for topic depth'}
• ${parseInt(duration) > 90 ? 'Include 15-minute break for long sessions' : 'Single session format optimal'}
• Schedule follow-up within 48 hours if decisions are made`;
  };

  const getEquipmentNeeds = (eventType: any, meetingType: any) => {
    if (meetingType?.id === 'virtual') {
      return 'Camera, microphone, reliable internet';
    }
    if (eventType?.id === 'presentation') {
      return 'Projector, screen, presentation remote';
    }
    return 'Standard meeting room setup';
  };

  const calculateTimeCost = (duration: string, participants: string) => {
    const durationNum = parseInt(duration);
    const participantCount = participants ? participants.split('\n').filter(p => p.trim()).length : 2;
    const cost = durationNum * participantCount * 50; // $50/hour average
    return `$${cost} total time investment`;
  };

  const getOpportunityCost = (priority: any) => {
    const costs = {
      urgent: 'High',
      high: 'Medium-High',
      medium: 'Medium',
      low: 'Low'
    };
    return costs[priority?.id as keyof typeof costs] || 'Medium';
  };

  return (
    <AIToolLayout
      title="AI Calendar Scheduler"
      description="Intelligent meeting scheduling and calendar optimization powered by AI"
      category="Productivity"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Event Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {eventTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setEventType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  eventType === type.id
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

        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium mb-3">Event Title</label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Enter event title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
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

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-3">Duration</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-3">Priority</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {priorities.map((p) => (
              <div
                key={p.id}
                onClick={() => setPriority(p.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  priority === p.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{p.label}</div>
                <div className="text-xs text-gray-600">{p.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Times */}
        <div>
          <label className="block text-sm font-medium mb-3">Preferred Times</label>
          <input
            type="text"
            value={preferredTimes}
            onChange={(e) => setPreferredTimes(e.target.value)}
            placeholder="e.g., Mornings, Afternoons, Weekdays only"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium mb-3">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            {timezones.map((tz) => (
              <option key={tz.id} value={tz.id}>{tz.label}</option>
            ))}
          </select>
        </div>

        {/* Meeting Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Meeting Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {meetingTypes.map((mt) => (
              <div
                key={mt.id}
                onClick={() => setMeetingType(mt.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  meetingType === mt.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{mt.label}</div>
                <div className="text-xs text-gray-600">{mt.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recurring Pattern */}
        <div>
          <label className="block text-sm font-medium mb-3">Recurring Pattern</label>
          <select
            value={recurringPattern}
            onChange={(e) => setRecurringPattern(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            {recurringPatterns.map((rp) => (
              <option key={rp.id} value={rp.id}>{rp.label} - {rp.description}</option>
            ))}
          </select>
        </div>

        {/* Buffer Time */}
        <div>
          <label className="block text-sm font-medium mb-3">Buffer Time (minutes)</label>
          <input
            type="number"
            value={bufferTime}
            onChange={(e) => setBufferTime(e.target.value)}
            min="0"
            max="60"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Conflict Resolution */}
        <div>
          <label className="block text-sm font-medium mb-3">Conflict Resolution</label>
          <select
            value={conflictResolution}
            onChange={(e) => setConflictResolution(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            {conflictResolutions.map((cr) => (
              <option key={cr.id} value={cr.id}>{cr.label} - {cr.description}</option>
            ))}
          </select>
        </div>

        {/* Auto Optimize */}
        <div>
          <label className="block text-sm font-medium mb-3">AI Optimization</label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoOptimize}
              onChange={(e) => setAutoOptimize(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">Enable AI-powered schedule optimization</span>
          </label>
        </div>
      </div>
    </AIToolLayout>
  );
} 