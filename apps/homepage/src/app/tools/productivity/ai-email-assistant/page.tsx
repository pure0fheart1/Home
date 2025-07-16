'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIEmailAssistant() {
  const [emailType, setEmailType] = useState('compose');
  const [tone, setTone] = useState('professional');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [context, setContext] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [length, setLength] = useState('medium');
  const [language, setLanguage] = useState('english');
  const [urgency, setUrgency] = useState('normal');
  const [includeSignature, setIncludeSignature] = useState(true);
  const [followUpReminder, setFollowUpReminder] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const emailTypes = [
    { id: 'compose', label: 'Compose Email', description: 'Create a new email from scratch' },
    { id: 'reply', label: 'Reply/Response', description: 'Generate response to existing email' },
    { id: 'follow-up', label: 'Follow-up', description: 'Create follow-up email' },
    { id: 'apology', label: 'Apology', description: 'Apologetic or explanatory email' },
    { id: 'thank-you', label: 'Thank You', description: 'Express gratitude and appreciation' },
    { id: 'meeting', label: 'Meeting Request', description: 'Schedule or discuss meetings' },
    { id: 'proposal', label: 'Proposal/Pitch', description: 'Business proposal or sales pitch' },
    { id: 'announcement', label: 'Announcement', description: 'Company or project announcements' }
  ];

  const tones = [
    { id: 'professional', label: 'Professional', description: 'Formal business tone' },
    { id: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { id: 'casual', label: 'Casual', description: 'Relaxed and informal' },
    { id: 'urgent', label: 'Urgent', description: 'Time-sensitive and direct' },
    { id: 'diplomatic', label: 'Diplomatic', description: 'Tactful and careful' },
    { id: 'enthusiastic', label: 'Enthusiastic', description: 'Positive and energetic' },
    { id: 'persuasive', label: 'Persuasive', description: 'Convincing and compelling' },
    { id: 'apologetic', label: 'Apologetic', description: 'Regretful and conciliatory' }
  ];

  const lengths = [
    { id: 'short', label: 'Short', description: '1-2 paragraphs' },
    { id: 'medium', label: 'Medium', description: '3-4 paragraphs' },
    { id: 'long', label: 'Long', description: '5+ paragraphs' }
  ];

  const languages = [
    { id: 'english', label: 'English' },
    { id: 'spanish', label: 'Spanish' },
    { id: 'french', label: 'French' },
    { id: 'german', label: 'German' },
    { id: 'italian', label: 'Italian' },
    { id: 'portuguese', label: 'Portuguese' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'japanese', label: 'Japanese' }
  ];

  const urgencyLevels = [
    { id: 'low', label: 'Low', description: 'No rush' },
    { id: 'normal', label: 'Normal', description: 'Standard priority' },
    { id: 'high', label: 'High', description: 'Important' },
    { id: 'urgent', label: 'Urgent', description: 'Time-sensitive' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const selectedType = emailTypes.find(t => t.id === emailType);
    const selectedTone = tones.find(t => t.id === tone);
    const selectedLength = lengths.find(l => l.id === length);
    const selectedUrgency = urgencyLevels.find(u => u.id === urgency);
    
    const mockResult = `Subject: ${subject || 'AI-Generated Email Subject'}

Dear ${recipient || '[Recipient Name]'},

${generateEmailContent(selectedType, selectedTone, selectedLength, selectedUrgency)}

${includeSignature ? `

Best regards,
[Your Name]
[Your Title]
[Company Name]
[Contact Information]

---
This email was optimized using AI Email Assistant
Priority: ${selectedUrgency?.label} | Tone: ${selectedTone?.label} | Length: ${selectedLength?.label}
${followUpReminder ? 'Follow-up reminder set for 3 days' : ''}` : ''}

---
Email Analytics:
- Estimated read time: ${length === 'short' ? '30 seconds' : length === 'medium' ? '1 minute' : '2 minutes'}
- Tone confidence: ${Math.floor(Math.random() * 15) + 85}%
- Engagement score: ${Math.floor(Math.random() * 20) + 80}/100
- Clarity rating: ${Math.floor(Math.random() * 10) + 90}%
- Professional score: ${Math.floor(Math.random() * 15) + 85}%

AI Recommendations:
- ${getRecommendation(selectedTone, selectedUrgency)}
- Consider adding a clear call-to-action
- ${followUpReminder ? 'Follow-up reminder has been set' : 'Consider setting a follow-up reminder'}
- Optimize send time: ${getOptimalSendTime(selectedUrgency)}
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generateEmailContent = (type: any, tone: any, length: any, urgency: any) => {
    const baseContent = {
      compose: "I hope this email finds you well. I wanted to reach out regarding",
      reply: "Thank you for your email. I appreciate you taking the time to",
      'follow-up': "I wanted to follow up on our previous conversation about",
      apology: "I sincerely apologize for any inconvenience caused by",
      'thank-you': "I wanted to express my heartfelt gratitude for",
      meeting: "I hope you're doing well. I would like to schedule a meeting to discuss",
      proposal: "I have an exciting opportunity that I believe would be of great interest to you",
      announcement: "I'm pleased to announce some important news that I wanted to share with you"
    };

    let content = baseContent[type?.id as keyof typeof baseContent] || baseContent.compose;
    
    if (context) {
      content += ` ${context}.`;
    } else {
      content += " the matter we discussed previously.";
    }

    if (keyPoints) {
      content += `\n\nKey points I'd like to address:\n${keyPoints.split('\n').map(point => `• ${point}`).join('\n')}`;
    }

    if (length.id === 'long') {
      content += `\n\nI believe this presents a valuable opportunity for collaboration. The details I've outlined above demonstrate the potential benefits and next steps we should consider.`;
    }

    if (urgency.id === 'urgent') {
      content += `\n\nThis matter requires prompt attention, and I would appreciate your response at your earliest convenience.`;
    }

    return content;
  };

  const getRecommendation = (tone: any, urgency: any) => {
    const recommendations = {
      professional: "Maintain formal language throughout",
      friendly: "Add personal touches to build rapport",
      casual: "Use conversational language while staying professional",
      urgent: "Emphasize time-sensitivity clearly",
      diplomatic: "Use careful wording to avoid misunderstandings"
    };
    return recommendations[tone?.id as keyof typeof recommendations] || "Keep tone consistent throughout";
  };

  const getOptimalSendTime = (urgency: any) => {
    const times = {
      low: "Tuesday-Thursday 10:00 AM",
      normal: "Tuesday-Thursday 9:00 AM or 2:00 PM",
      high: "Monday-Wednesday 9:00 AM",
      urgent: "Send immediately"
    };
    return times[urgency?.id as keyof typeof times] || "Tuesday-Thursday 10:00 AM";
  };

  return (
    <AIToolLayout
      title="AI Email Assistant"
      description="Smart email composition and response generation powered by AI"
      category="Productivity"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Email Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Email Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emailTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setEmailType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  emailType === type.id
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

        {/* Recipient */}
        <div>
          <label className="block text-sm font-medium mb-3">Recipient</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient name or email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-3">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Context */}
        <div>
          <label className="block text-sm font-medium mb-3">Context/Background</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Provide context or background information..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Key Points */}
        <div>
          <label className="block text-sm font-medium mb-3">Key Points</label>
          <textarea
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            placeholder="List key points to include (one per line)..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium mb-3">Tone</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tones.map((t) => (
              <div
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  tone === t.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{t.label}</div>
                <div className="text-xs text-gray-600">{t.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Length */}
        <div>
          <label className="block text-sm font-medium mb-3">Length</label>
          <div className="grid grid-cols-3 gap-3">
            {lengths.map((l) => (
              <div
                key={l.id}
                onClick={() => setLength(l.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  length === l.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{l.label}</div>
                <div className="text-sm text-gray-600">{l.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-3">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>{lang.label}</option>
            ))}
          </select>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium mb-3">Urgency</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {urgencyLevels.map((u) => (
              <div
                key={u.id}
                onClick={() => setUrgency(u.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  urgency === u.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{u.label}</div>
                <div className="text-xs text-gray-600">{u.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium mb-3">Options</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSignature}
                onChange={(e) => setIncludeSignature(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Include email signature</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={followUpReminder}
                onChange={(e) => setFollowUpReminder(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Set follow-up reminder</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 