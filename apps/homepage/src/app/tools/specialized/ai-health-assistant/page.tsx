'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIHealthAssistant() {
  const [healthGoal, setHealthGoal] = useState('general-wellness');
  const [age, setAge] = useState('');
  const [currentSymptoms, setCurrentSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [urgencyLevel, setUrgencyLevel] = useState('routine');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const healthGoals = [
    { id: 'general-wellness', label: 'General Wellness', description: 'Overall health maintenance' },
    { id: 'symptom-analysis', label: 'Symptom Analysis', description: 'Understanding symptoms' },
    { id: 'fitness-nutrition', label: 'Fitness & Nutrition', description: 'Exercise and diet optimization' },
    { id: 'mental-health', label: 'Mental Health', description: 'Emotional wellness' },
    { id: 'preventive-care', label: 'Preventive Care', description: 'Prevention strategies' },
    { id: 'chronic-management', label: 'Chronic Condition', description: 'Managing ongoing conditions' }
  ];

  const urgencyLevels = [
    { id: 'emergency', label: 'Emergency', description: 'Seek immediate attention' },
    { id: 'urgent', label: 'Urgent', description: 'See provider within 24h' },
    { id: 'moderate', label: 'Moderate', description: 'Schedule within few days' },
    { id: 'routine', label: 'Routine', description: 'General wellness consultation' }
  ];

  const lifestyleFactors = [
    'Regular exercise', 'Balanced diet', 'Adequate sleep', 'Stress management',
    'No smoking', 'Limited alcohol', 'Work-life balance', 'Social connections'
  ];

  const handleLifestyleToggle = (factor: string) => {
    setLifestyle(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const selectedGoal = healthGoals.find(g => g.id === healthGoal);
    const selectedUrgency = urgencyLevels.find(u => u.id === urgencyLevel);
    
    const mockResult = `# AI Health Assistant Report

## IMPORTANT MEDICAL DISCLAIMER
⚠️ **This AI health assistant is for informational purposes only and does not replace professional medical advice. Always consult with qualified healthcare providers for medical decisions. In case of emergency, call emergency services immediately.**

## Health Assessment Overview
**Primary Goal**: ${selectedGoal?.label} - ${selectedGoal?.description}
**Urgency Level**: ${selectedUrgency?.label} - ${selectedUrgency?.description}
**Assessment Date**: ${new Date().toLocaleDateString()}
**Age**: ${age || 'Not specified'} years

## Health Analysis Summary

### Overall Wellness Score: ${Math.floor(Math.random() * 25) + 70}/100

### Key Findings:
- **Symptom Status**: ${currentSymptoms ? 'Symptoms reported and analyzed' : 'No current symptoms reported'}
- **Lifestyle Score**: ${Math.floor((lifestyle.length / lifestyleFactors.length) * 100)}% based on healthy habits
- **Risk Factors**: ${Math.floor(Math.random() * 3) + 1} potential areas for improvement identified
- **Preventive Care**: Age-appropriate screenings and checkups recommended

## Symptom Analysis
${currentSymptoms ? `
**Reported Symptoms**: ${currentSymptoms}

**Assessment**: 
${urgencyLevel === 'emergency' ? '🚨 **EMERGENCY**: Seek immediate medical attention' :
  urgencyLevel === 'urgent' ? '⚠️ **URGENT**: Contact healthcare provider within 24 hours' :
  urgencyLevel === 'moderate' ? '📋 **MODERATE**: Schedule appointment within few days' :
  '📅 **ROUTINE**: Discuss during next regular checkup'}

**Recommendations**:
• Monitor symptoms and note any changes
• Keep a symptom diary for healthcare provider
• Maintain hydration and rest as appropriate
• Seek medical attention if symptoms worsen` : 
'### No Current Symptoms Reported\nFocus on preventive care and wellness optimization.'}

## Medical History Assessment
${medicalHistory ? `
**Medical Background**: ${medicalHistory}
• Consider family history for risk assessment
• Maintain regular monitoring as appropriate
• Follow specialist recommendations for ongoing conditions
• Keep emergency medical information updated` :
'### No Medical History Provided\nEstablish baseline health metrics and regular checkups recommended.'}

## Lifestyle Analysis

**Current Healthy Habits**: ${lifestyle.length > 0 ? lifestyle.join(', ') : 'None specified'}

**Lifestyle Strengths**:
${lifestyle.map(factor => `• ✅ ${factor}: Continue maintaining this healthy habit`).join('\n') || '• Opportunity to establish healthy lifestyle foundations'}

**Areas for Improvement**:
${lifestyleFactors.filter(factor => !lifestyle.includes(factor)).slice(0, 3).map(factor => 
`• 🎯 ${factor}: Consider incorporating into routine`).join('\n')}

## Personalized Health Recommendations

### Immediate Actions (Next 1-2 weeks):
${urgencyLevel === 'emergency' ? '1. Seek immediate emergency medical care\n2. Contact emergency contacts\n3. Bring medical history and medications' :
  urgencyLevel === 'urgent' ? '1. Contact healthcare provider within 24 hours\n2. Monitor symptoms closely\n3. Prepare symptom history for appointment' :
  '1. Schedule routine health checkup if overdue\n2. Begin implementing lifestyle improvements\n3. Start tracking health metrics'}

### Short-term Goals (1-3 months):
1. ${!lifestyle.includes('Regular exercise') ? 'Establish 150 minutes/week moderate exercise routine' : 'Maintain current exercise level'}
2. ${!lifestyle.includes('Balanced diet') ? 'Implement balanced nutrition plan' : 'Continue healthy eating patterns'}
3. ${!lifestyle.includes('Adequate sleep') ? 'Achieve 7-9 hours quality sleep per night' : 'Maintain good sleep hygiene'}
4. Complete age-appropriate health screenings
5. Establish strong healthcare provider relationships

### Long-term Health Strategy (3+ months):
1. Develop comprehensive preventive care plan
2. Build healthcare provider network including specialists
3. Maintain ideal weight and fitness level
4. Implement stress management systems
5. Plan for age-related health changes

## Preventive Care Schedule

### Age-Appropriate Screenings:
${parseInt(age || '30') >= 18 ? '• **Annual Physical**: Comprehensive health examination' : ''}
${parseInt(age || '30') >= 20 ? '• **Blood Pressure**: Check at every visit' : ''}
${parseInt(age || '30') >= 35 ? '• **Cholesterol**: Every 5 years or as recommended' : ''}
${parseInt(age || '30') >= 45 ? '• **Diabetes Screening**: Every 3 years' : ''}
${parseInt(age || '30') >= 50 ? '• **Colonoscopy**: Every 10 years for cancer screening' : ''}
${parseInt(age || '30') >= 40 ? '• **Vision/Hearing**: Annual screening recommended' : ''}

### Vaccinations:
• **Annual Flu Shot**: Recommended for all adults
• **COVID-19**: Stay updated with current recommendations
• **Tdap**: Every 10 years
${parseInt(age || '30') >= 65 ? '• **Pneumococcal**: Senior-specific vaccinations' : ''}

## Wellness Optimization Plan

### Physical Wellness:
• **Exercise**: ${lifestyle.includes('Regular exercise') ? 'Maintain current activity' : 'Start with 30 min moderate activity 5x/week'}
• **Nutrition**: Focus on whole foods, fruits, vegetables, lean proteins
• **Hydration**: Aim for 8 glasses water daily
• **Sleep**: ${lifestyle.includes('Adequate sleep') ? 'Continue 7-9 hours nightly' : 'Prioritize 7-9 hours quality sleep'}

### Mental & Emotional Wellness:
• **Stress Management**: ${lifestyle.includes('Stress management') ? 'Continue current strategies' : 'Develop stress reduction techniques'}
• **Social Connections**: ${lifestyle.includes('Social connections') ? 'Maintain strong network' : 'Build meaningful relationships'}
• **Work-Life Balance**: ${lifestyle.includes('Work-life balance') ? 'Maintain boundaries' : 'Establish clear boundaries'}
• **Mental Health**: Regular check-ins with emotional status

## Health Monitoring Technology

### Recommended Tools:
• **Fitness Apps**: MyFitnessPal, Strava for activity tracking
• **Meditation**: Headspace, Calm for stress management
• **Sleep Tracking**: Monitor sleep patterns and quality
• **Symptom Tracking**: Keep digital health diary
• **Telehealth**: Enable video consultations with providers

### Wearable Devices:
• **Fitness Trackers**: Monitor activity, heart rate, sleep
• **Smart Scales**: Track weight and body composition
• **Blood Pressure Monitors**: Regular cardiovascular monitoring

## Emergency Preparedness

### Medical Emergency Kit:
• Current medication list and dosages
• Emergency contact information
• Medical history summary
• Insurance cards and identification
• Healthcare provider contact information

### When to Seek Immediate Care:
• Chest pain or difficulty breathing
• Sudden severe headache or vision changes
• Signs of stroke (FAST test)
• Severe allergic reactions
• Loss of consciousness
• Persistent high fever

## Healthcare Provider Coordination

### Building Your Healthcare Team:
• **Primary Care**: Foundation for all healthcare needs
• **Specialists**: Based on age, risk factors, and conditions
• **Mental Health**: Therapist or counselor for emotional support
• **Emergency Contacts**: Keep updated contact information

### Questions for Your Doctor:
• What preventive screenings do I need for my age?
• How can I optimize my current health routine?
• What warning signs should I watch for?
• How often should I schedule follow-up appointments?
• Are there specialists I should see for preventive care?

*Generated on ${new Date().toLocaleDateString()} for informational purposes only. Always consult healthcare professionals for medical advice.*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  return (
    <AIToolLayout
      title="AI Health Assistant"
      description="Health monitoring, wellness recommendations, and symptom analysis guidance"
      category="Specialized"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Health Goal */}
        <div>
          <label className="block text-sm font-medium mb-3">Primary Health Goal</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {healthGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => setHealthGoal(goal.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  healthGoal === goal.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{goal.label}</div>
                <div className="text-sm text-gray-600">{goal.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Age and Urgency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="35"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Urgency Level</label>
            <select
              value={urgencyLevel}
              onChange={(e) => setUrgencyLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              {urgencyLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label} - {level.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Symptoms */}
        <div>
          <label className="block text-sm font-medium mb-3">Current Symptoms (optional)</label>
          <textarea
            value={currentSymptoms}
            onChange={(e) => setCurrentSymptoms(e.target.value)}
            placeholder="Describe any current symptoms you're experiencing..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Medical History */}
        <div>
          <label className="block text-sm font-medium mb-3">Medical History (optional)</label>
          <textarea
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="Brief medical history, chronic conditions, family history..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Lifestyle Factors */}
        <div>
          <label className="block text-sm font-medium mb-3">Current Lifestyle Factors</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {lifestyleFactors.map((factor) => (
              <label key={factor} className="flex items-center">
                <input
                  type="checkbox"
                  checked={lifestyle.includes(factor)}
                  onChange={() => handleLifestyleToggle(factor)}
                  className="mr-2"
                />
                <span className="text-sm">{factor}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-sm text-yellow-800">
            <strong>Medical Disclaimer:</strong> This AI Health Assistant provides educational information only and does not replace professional medical advice. Always consult with qualified healthcare providers for medical decisions. In emergencies, call emergency services immediately.
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 