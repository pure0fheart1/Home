'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIQuizGenerator() {
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionTypes, setQuestionTypes] = useState<string[]>(['multiple-choice']);
  const [numberOfQuestions, setNumberOfQuestions] = useState('10');
  const [timeLimit, setTimeLimit] = useState('no-limit');
  const [topics, setTopics] = useState('');
  const [quizPurpose, setQuizPurpose] = useState('assessment');
  const [targetAudience, setTargetAudience] = useState('students');
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(false);
  const [allowRetakes, setAllowRetakes] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const difficulties = [
    { id: 'easy', label: 'Easy', description: 'Basic knowledge and recall' },
    { id: 'medium', label: 'Medium', description: 'Moderate understanding and application' },
    { id: 'hard', label: 'Hard', description: 'Advanced analysis and synthesis' },
    { id: 'expert', label: 'Expert', description: 'Professional-level expertise' }
  ];

  const questionTypeOptions = [
    { id: 'multiple-choice', label: 'Multiple Choice', description: '4 options with one correct answer' },
    { id: 'true-false', label: 'True/False', description: 'Binary true or false questions' },
    { id: 'fill-blank', label: 'Fill in the Blank', description: 'Complete sentences or phrases' },
    { id: 'short-answer', label: 'Short Answer', description: 'Brief written responses' },
    { id: 'matching', label: 'Matching', description: 'Match items from two lists' },
    { id: 'ordering', label: 'Ordering', description: 'Arrange items in correct sequence' },
    { id: 'essay', label: 'Essay', description: 'Long-form written responses' },
    { id: 'case-study', label: 'Case Study', description: 'Scenario-based questions' }
  ];

  const questionCounts = [
    { id: '5', label: '5 Questions', description: 'Quick quiz' },
    { id: '10', label: '10 Questions', description: 'Standard quiz' },
    { id: '15', label: '15 Questions', description: 'Comprehensive quiz' },
    { id: '20', label: '20 Questions', description: 'Extended quiz' },
    { id: '25', label: '25 Questions', description: 'Full assessment' },
    { id: '30', label: '30+ Questions', description: 'Extensive evaluation' }
  ];

  const timeLimits = [
    { id: 'no-limit', label: 'No Time Limit', description: 'Self-paced completion' },
    { id: '15min', label: '15 minutes', description: 'Quick assessment' },
    { id: '30min', label: '30 minutes', description: 'Standard time limit' },
    { id: '45min', label: '45 minutes', description: 'Extended time' },
    { id: '60min', label: '60 minutes', description: 'Full hour assessment' },
    { id: '90min', label: '90 minutes', description: 'Comprehensive exam' }
  ];

  const quizPurposes = [
    { id: 'assessment', label: 'Assessment', description: 'Evaluate knowledge and skills' },
    { id: 'practice', label: 'Practice', description: 'Skill development and reinforcement' },
    { id: 'review', label: 'Review', description: 'Review and consolidation' },
    { id: 'placement', label: 'Placement Test', description: 'Determine appropriate level' },
    { id: 'certification', label: 'Certification', description: 'Professional certification exam' },
    { id: 'entrance', label: 'Entrance Exam', description: 'Admission or entry requirements' }
  ];

  const targetAudiences = [
    { id: 'students', label: 'Students', description: 'Academic students' },
    { id: 'professionals', label: 'Professionals', description: 'Working professionals' },
    { id: 'trainees', label: 'Trainees', description: 'Training participants' },
    { id: 'candidates', label: 'Job Candidates', description: 'Employment screening' },
    { id: 'general', label: 'General Public', description: 'Broad audience' }
  ];

  const handleQuestionTypeToggle = (type: string) => {
    setQuestionTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const selectedDifficulty = difficulties.find(d => d.id === difficulty);
    const selectedCount = questionCounts.find(c => c.id === numberOfQuestions);
    const selectedTimeLimit = timeLimits.find(t => t.id === timeLimit);
    const selectedPurpose = quizPurposes.find(p => p.id === quizPurpose);
    const selectedAudience = targetAudiences.find(a => a.id === targetAudience);
    
    const mockResult = `# AI-Generated Quiz

## Quiz Details
**Subject**: ${subject || 'Sample Subject'}
**Difficulty**: ${selectedDifficulty?.label} - ${selectedDifficulty?.description}
**Questions**: ${selectedCount?.label} (${selectedCount?.description})
**Time Limit**: ${selectedTimeLimit?.label} (${selectedTimeLimit?.description})
**Purpose**: ${selectedPurpose?.label} - ${selectedPurpose?.description}
**Target Audience**: ${selectedAudience?.label} - ${selectedAudience?.description}

## Topics Covered
${topics ? topics.split('\n').map(topic => `• ${topic.trim()}`).join('\n') : '• Core concepts and principles\n• Practical applications\n• Key terminology\n• Problem-solving techniques'}

## Question Types Included
${questionTypes.map(type => {
  const typeInfo = questionTypeOptions.find(t => t.id === type);
  return `• ${typeInfo?.label} - ${typeInfo?.description}`;
}).join('\n')}

## Quiz Configuration
**Adaptive Difficulty**: ${adaptiveDifficulty ? 'Enabled - Questions adjust based on performance' : 'Disabled - Static difficulty level'}
**Explanations**: ${includeExplanations ? 'Included for each question' : 'Not included'}
**Retakes**: ${allowRetakes ? 'Allowed with different questions' : 'Not allowed'}
**Scoring**: Automatic scoring with detailed feedback
**Analytics**: Performance tracking and analysis

---

## QUIZ QUESTIONS

${generateQuizQuestions(questionTypes, parseInt(numberOfQuestions), selectedDifficulty || 'intermediate', subject, topics)}

---

## Answer Key & Explanations

${generateAnswerKey(questionTypes, parseInt(numberOfQuestions), includeExplanations, selectedDifficulty)}

---

## Quiz Analytics & Assessment

### Performance Metrics:
${generatePerformanceMetrics(selectedPurpose, selectedDifficulty)}

### Learning Outcomes:
${generateLearningOutcomes(selectedPurpose, selectedAudience)}

### Difficulty Analysis:
${generateDifficultyAnalysis(selectedDifficulty, adaptiveDifficulty)}

## Scoring Guidelines

### Grading Scale:
${generateGradingScale(selectedPurpose, selectedAudience)}

### Performance Levels:
${generatePerformanceLevels(selectedDifficulty, selectedPurpose)}

### Feedback Framework:
${generateFeedbackFramework(includeExplanations, selectedPurpose)}

## Quiz Administration

### Setup Instructions:
${generateSetupInstructions(selectedTimeLimit, selectedPurpose)}

### Proctoring Guidelines:
${generateProctoringGuidelines(selectedPurpose, selectedAudience)}

### Technical Requirements:
${generateTechnicalRequirements(selectedPurpose, adaptiveDifficulty)}

## Adaptive Learning Features

### Difficulty Adjustment:
${adaptiveDifficulty ? generateDifficultyAdjustment(selectedDifficulty, selectedPurpose) : '• Adaptive difficulty not enabled'}

### Personalization:
${generatePersonalization(adaptiveDifficulty, selectedAudience)}

### Progress Tracking:
${generateProgressTracking(selectedPurpose, adaptiveDifficulty)}

## Quality Assurance

### Question Validation:
${generateQuestionValidation(selectedDifficulty, questionTypes)}

### Content Review:
${generateContentReview(subject, selectedPurpose)}

### Bias Detection:
${generateBiasDetection(selectedAudience, selectedPurpose)}

## Accessibility Features

### Inclusive Design:
${generateInclusiveDesign(selectedAudience, selectedPurpose)}

### Accommodations:
${generateAccommodations(selectedTimeLimit, selectedPurpose)}

### Multiple Formats:
${generateMultipleFormats(questionTypes, selectedAudience)}

## Implementation Guide

### Distribution Methods:
${generateDistributionMethods(selectedPurpose, selectedAudience)}

### Integration Options:
${generateIntegrationOptions(selectedPurpose, adaptiveDifficulty)}

### Maintenance Schedule:
${generateMaintenanceSchedule(selectedPurpose, adaptiveDifficulty)}

*Quiz generated on ${new Date().toLocaleDateString()} using AI Quiz Generator*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generateQuizQuestions = (types: string[], count: number, difficulty: any, subject: string, topics: string) => {
    const questions = [];
    
    for (let i = 1; i <= count; i++) {
      const typeIndex = (i - 1) % types.length;
      const type = types[typeIndex];
      const questionNumber = i;
      
      questions.push(generateQuestion(questionNumber, type, difficulty || 'intermediate', subject));
    }
    
    return questions.join('\n\n');
  };

  const generateQuestion = (number: number, type: string, difficulty: any, subject: string) => {
    const questionTemplates = {
      'multiple-choice': `**Question ${number}** (Multiple Choice - ${difficulty?.label})
${getQuestionText(type, difficulty, subject)}

A) ${getOption(1, difficulty)}
B) ${getOption(2, difficulty)}
C) ${getOption(3, difficulty)}
D) ${getOption(4, difficulty)}

*Correct Answer: A*`,

      'true-false': `**Question ${number}** (True/False - ${difficulty?.label})
${getQuestionText(type, difficulty, subject)}

A) True
B) False

*Correct Answer: A*`,

      'fill-blank': `**Question ${number}** (Fill in the Blank - ${difficulty?.label})
${getQuestionText(type, difficulty, subject)}

The correct answer is: _______________

*Correct Answer: ${getCorrectAnswer(type, difficulty)}*`,

      'short-answer': `**Question ${number}** (Short Answer - ${difficulty?.label})
${getQuestionText(type, difficulty, subject)}

*Expected Answer: ${getExpectedAnswer(difficulty)}*`,

      'matching': `**Question ${number}** (Matching - ${difficulty?.label})
Match the following terms with their definitions:

Column A:
1. ${getMatchingTerm(1, difficulty)}
2. ${getMatchingTerm(2, difficulty)}
3. ${getMatchingTerm(3, difficulty)}

Column B:
A. ${getMatchingDefinition(1, difficulty)}
B. ${getMatchingDefinition(2, difficulty)}
C. ${getMatchingDefinition(3, difficulty)}

*Correct Answers: 1-A, 2-B, 3-C*`,

      'ordering': `**Question ${number}** (Ordering - ${difficulty?.label})
Arrange the following steps in the correct order:

1. ${getOrderingStep(1, difficulty)}
2. ${getOrderingStep(2, difficulty)}
3. ${getOrderingStep(3, difficulty)}
4. ${getOrderingStep(4, difficulty)}

*Correct Order: 3, 1, 4, 2*`,

      'essay': `**Question ${number}** (Essay - ${difficulty?.label})
${getQuestionText(type, difficulty, subject)}

*Grading Criteria: ${getEssayGradingCriteria(difficulty)}*`,

      'case-study': `**Question ${number}** (Case Study - ${difficulty?.label})
**Scenario**: ${getCaseStudyScenario(difficulty, subject)}

**Question**: ${getQuestionText(type, difficulty, subject)}

*Expected Response: ${getCaseStudyExpectedResponse(difficulty)}*`
    };

    return questionTemplates[type as keyof typeof questionTemplates] || questionTemplates['multiple-choice'];
  };

  const getQuestionText = (type: string, difficulty: any, subject: string) => {
    const questionStarters = {
      easy: 'What is the basic definition of',
      medium: 'How would you apply the concept of',
      hard: 'Analyze the relationship between',
      expert: 'Evaluate the implications of'
    };
    
    const starter = questionStarters[difficulty?.id as keyof typeof questionStarters] || 'What is';
    return `${starter} ${subject || 'the given topic'} in professional practice?`;
  };

  const getOption = (optionNumber: number, difficulty: any) => {
    const options = {
      1: 'Correct answer based on fundamental principles',
      2: 'Plausible but incorrect alternative',
      3: 'Common misconception or error',
      4: 'Clearly incorrect option'
    };
    
    return options[optionNumber as keyof typeof options] || 'Sample option';
  };

  const getCorrectAnswer = (type: string, difficulty: any) => {
    return difficulty?.id === 'expert' ? 'Complex technical term' : 'Fundamental concept';
  };

  const getExpectedAnswer = (difficulty: any) => {
    return difficulty?.id === 'expert' ? 
      'Detailed explanation with professional insights and practical applications' :
      'Clear explanation of key concepts with relevant examples';
  };

  const getMatchingTerm = (number: number, difficulty: any) => {
    const terms = ['Primary concept', 'Secondary principle', 'Advanced application'];
    return terms[number - 1] || 'Sample term';
  };

  const getMatchingDefinition = (number: number, difficulty: any) => {
    const definitions = ['Basic definition', 'Detailed explanation', 'Complex application'];
    return definitions[number - 1] || 'Sample definition';
  };

  const getOrderingStep = (number: number, difficulty: any) => {
    const steps = ['Initial setup', 'Core process', 'Final verification', 'Documentation'];
    return steps[number - 1] || 'Sample step';
  };

  const getEssayGradingCriteria = (difficulty: any) => {
    return difficulty?.id === 'expert' ? 
      'Professional analysis, original insights, comprehensive coverage, clear argumentation' :
      'Accurate information, clear organization, relevant examples, proper grammar';
  };

  const getCaseStudyScenario = (difficulty: any, subject: string) => {
    return `A professional working with ${subject || 'the topic'} encounters a challenging situation that requires ${difficulty?.id === 'expert' ? 'advanced problem-solving' : 'basic application'} skills.`;
  };

  const getCaseStudyExpectedResponse = (difficulty: any) => {
    return difficulty?.id === 'expert' ? 
      'Sophisticated analysis with multiple perspectives and strategic recommendations' :
      'Clear problem identification and appropriate solution approach';
  };

  const generateAnswerKey = (types: string[], count: number, explanations: boolean, difficulty: any) => {
    const answers = [];
    
    for (let i = 1; i <= count; i++) {
      const typeIndex = (i - 1) % types.length;
      const type = types[typeIndex];
      
      answers.push(`**Question ${i}**: ${getAnswerWithExplanation(type, explanations, difficulty || 'intermediate')}`);
    }
    
    return answers.join('\n\n');
  };

  const getAnswerWithExplanation = (type: string, explanations: boolean, difficulty: any) => {
    const answer = 'A (Correct answer)';
    
    if (!explanations) {
      return answer;
    }
    
    const explanation = difficulty?.id === 'expert' ? 
      'This answer demonstrates advanced understanding of professional principles and their practical applications in complex scenarios.' :
      'This answer correctly identifies the fundamental concept and shows understanding of its basic application.';
    
    return `${answer}\n*Explanation*: ${explanation}`;
  };

  const generatePerformanceMetrics = (purpose: any, difficulty: any) => {
    return `• **Completion Rate**: Expected ${Math.floor(Math.random() * 15) + 85}% completion rate
• **Average Score**: Target ${Math.floor(Math.random() * 15) + 75}% average performance
• **Time Efficiency**: Average completion time ${Math.floor(Math.random() * 20) + 20} minutes
• **Question Analysis**: Difficulty distribution and discrimination indices
• **Learning Insights**: Performance patterns and knowledge gaps identified`;
  };

  const generateLearningOutcomes = (purpose: any, audience: any) => {
    return `• **Knowledge Assessment**: Measure understanding of core concepts
• **Skill Evaluation**: Assess practical application abilities
• **Competency Verification**: Confirm ${audience?.label.toLowerCase()} competency levels
• **Learning Gaps**: Identify areas needing additional attention
• **Progress Tracking**: Monitor learning advancement over time`;
  };

  const generateDifficultyAnalysis = (difficulty: any, adaptive: boolean) => {
    return `• **Difficulty Level**: Questions calibrated to ${difficulty?.label.toLowerCase()} level
• **Cognitive Load**: Appropriate mental effort required
• **Progression**: ${adaptive ? 'Adaptive progression based on performance' : 'Static difficulty throughout'}
• **Balance**: Mix of recall, comprehension, and application questions
• **Discrimination**: Questions effectively distinguish between ability levels`;
  };

  const generateGradingScale = (purpose: any, audience: any) => {
    const scales = {
      assessment: `• **A (90-100%)**: Excellent - Mastery level performance
• **B (80-89%)**: Good - Proficient understanding
• **C (70-79%)**: Satisfactory - Basic competency
• **D (60-69%)**: Needs Improvement - Below standard
• **F (Below 60%)**: Unsatisfactory - Significant gaps`,
      practice: `• **Mastery (90-100%)**: Concepts fully understood
• **Proficient (80-89%)**: Good understanding with minor gaps
• **Developing (70-79%)**: Basic understanding, needs practice
• **Beginning (60-69%)**: Fundamental concepts unclear
• **Needs Support (Below 60%)**: Requires additional instruction`,
      certification: `• **Pass (80-100%)**: Meets certification requirements
• **Conditional Pass (70-79%)**: Meets minimum standards
• **Fail (Below 70%)**: Does not meet certification requirements
• **Retake Required**: Additional preparation needed`
    };
    
    return scales[purpose?.id as keyof typeof scales] || scales.assessment;
  };

  const generatePerformanceLevels = (difficulty: any, purpose: any) => {
    return `• **Expert Level**: Superior performance demonstrating mastery
• **Proficient Level**: Competent performance meeting expectations
• **Developing Level**: Adequate performance with room for growth
• **Beginning Level**: Basic performance requiring improvement
• **Intervention Level**: Performance requiring additional support`;
  };

  const generateFeedbackFramework = (explanations: boolean, purpose: any) => {
    return `• **Immediate Feedback**: ${explanations ? 'Detailed explanations provided' : 'Basic correctness indication'}
• **Performance Summary**: Overall score and achievement level
• **Strength Areas**: Topics demonstrating strong understanding
• **Improvement Areas**: Concepts requiring additional study
• **Recommendations**: Specific suggestions for continued learning`;
  };

  const generateSetupInstructions = (timeLimit: any, purpose: any) => {
    return `• **Environment Setup**: Ensure quiet, distraction-free environment
• **Technical Check**: Verify system compatibility and internet connection
• **Time Management**: ${timeLimit?.id === 'no-limit' ? 'No time restrictions' : `Monitor ${timeLimit?.label} time limit`}
• **Instructions**: Clear guidelines provided before starting
• **Support**: Technical support available during administration`;
  };

  const generateProctoringGuidelines = (purpose: any, audience: any) => {
    return `• **Supervision Level**: ${purpose?.id === 'certification' ? 'High security proctoring' : 'Standard monitoring'}
• **Identity Verification**: Confirm participant identity before starting
• **Environment Monitoring**: Ensure appropriate testing environment
• **Academic Integrity**: Clear policies on acceptable behavior
• **Intervention Protocols**: Procedures for handling irregularities`;
  };

  const generateTechnicalRequirements = (purpose: any, adaptive: boolean) => {
    return `• **Platform**: Modern web browser with JavaScript enabled
• **Internet**: Stable broadband connection for ${adaptive ? 'adaptive features' : 'standard delivery'}
• **Device**: Computer, tablet, or smartphone compatibility
• **Backup**: Secondary device or connection recommended
• **Accessibility**: Screen reader and keyboard navigation support`;
  };

  const generateDifficultyAdjustment = (difficulty: any, purpose: any) => {
    return `• **Performance Monitoring**: Real-time analysis of response accuracy
• **Dynamic Scaling**: Automatic adjustment of question difficulty
• **Optimal Challenge**: Maintain appropriate difficulty level
• **Learning Optimization**: Maximize learning through optimal challenge
• **Performance Prediction**: Predict final performance based on progress`;
  };

  const generatePersonalization = (adaptive: boolean, audience: any) => {
    return `• **Individual Adaptation**: ${adaptive ? 'AI-powered personalization' : 'Standard experience for all'}
• **Learning Style**: Accommodate different learning preferences
• **Pace Adjustment**: Allow flexible pacing based on needs
• **Content Relevance**: Emphasize topics most relevant to ${audience?.label.toLowerCase()}
• **Feedback Customization**: Tailored feedback based on performance patterns`;
  };

  const generateProgressTracking = (purpose: any, adaptive: boolean) => {
    return `• **Real-time Progress**: Live tracking of completion and performance
• **Analytics Dashboard**: Comprehensive performance analytics
• **Competency Mapping**: Track mastery of specific skills and knowledge
• **Trend Analysis**: Identify learning patterns and trends
• **Predictive Insights**: ${adaptive ? 'AI-powered performance predictions' : 'Standard progress reporting'}`;
  };

  const generateQuestionValidation = (difficulty: any, types: string[]) => {
    return `• **Content Accuracy**: Expert review of all questions and answers
• **Difficulty Calibration**: Validation of difficulty levels through testing
• **Question Quality**: Assessment of clarity, relevance, and effectiveness
• **Bias Review**: Examination for cultural, gender, and demographic bias
• **Statistical Analysis**: Item analysis and performance statistics`;
  };

  const generateContentReview = (subject: string, purpose: any) => {
    return `• **Subject Matter Expertise**: Review by qualified experts in ${subject || 'the field'}
• **Curriculum Alignment**: Alignment with relevant standards and curricula
• **Current Relevance**: Ensure content reflects current knowledge and practices
• **Comprehensiveness**: Coverage of essential topics and concepts
• **Accuracy Verification**: Fact-checking and validation of all content`;
  };

  const generateBiasDetection = (audience: any, purpose: any) => {
    return `• **Demographic Fairness**: Questions appropriate for diverse ${audience?.label.toLowerCase()}
• **Cultural Sensitivity**: Avoid cultural assumptions and stereotypes
• **Language Accessibility**: Clear, accessible language for all participants
• **Gender Neutrality**: Avoid gender-specific references where inappropriate
• **Inclusive Examples**: Use diverse examples and scenarios`;
  };

  const generateInclusiveDesign = (audience: any, purpose: any) => {
    return `• **Universal Access**: Design accessible to users with disabilities
• **Multiple Formats**: Alternative formats for different needs
• **Clear Navigation**: Intuitive interface design
• **Flexible Interaction**: Multiple ways to interact with content
• **Assistive Technology**: Compatibility with screen readers and other tools`;
  };

  const generateAccommodations = (timeLimit: any, purpose: any) => {
    return `• **Extended Time**: Additional time for users with disabilities
• **Alternative Formats**: Large print, audio, or braille versions
• **Assistive Technology**: Screen reader and keyboard navigation support
• **Flexible Scheduling**: Accommodation for different time zones and schedules
• **Support Services**: Human assistance when needed`;
  };

  const generateMultipleFormats = (types: string[], audience: any) => {
    return `• **Digital Delivery**: Online platform with full functionality
• **Print Options**: PDF versions for offline use
• **Mobile Compatibility**: Smartphone and tablet optimization
• **Audio Support**: Text-to-speech and audio instructions
• **Interactive Elements**: Engaging multimedia when appropriate`;
  };

  const generateDistributionMethods = (purpose: any, audience: any) => {
    return `• **Online Platform**: Web-based delivery with tracking
• **Learning Management System**: Integration with existing LMS
• **Email Distribution**: Direct email links to participants
• **QR Codes**: Quick access through mobile scanning
• **Embedded Links**: Integration into websites and applications`;
  };

  const generateIntegrationOptions = (purpose: any, adaptive: boolean) => {
    return `• **LMS Integration**: Seamless integration with major learning platforms
• **Grade Passback**: Automatic score transfer to gradebooks
• **Single Sign-On**: SSO compatibility for easy access
• **API Access**: Developer API for custom integrations
• **Data Export**: Export results in multiple formats`;
  };

  const generateMaintenanceSchedule = (purpose: any, adaptive: boolean) => {
    return `• **Regular Updates**: ${adaptive ? 'AI algorithm updates and improvements' : 'Periodic content updates'}
• **Content Review**: Quarterly review of questions and answers
• **Performance Analysis**: Monthly analysis of quiz effectiveness
• **Security Updates**: Regular security patches and updates
• **User Feedback**: Continuous improvement based on user feedback`;
  };

  return (
    <AIToolLayout
      title="AI Quiz Generator"
      description="Create customized quizzes and assessments with AI-powered question generation"
      category="Education"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-3">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter the subject or topic for the quiz"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium mb-3">Difficulty Level</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {difficulties.map((diff) => (
              <div
                key={diff.id}
                onClick={() => setDifficulty(diff.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  difficulty === diff.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{diff.label}</div>
                <div className="text-xs text-gray-600">{diff.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Types */}
        <div>
          <label className="block text-sm font-medium mb-3">Question Types</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {questionTypeOptions.map((type) => (
              <label key={type.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={questionTypes.includes(type.id)}
                  onChange={() => handleQuestionTypeToggle(type.id)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-sm">{type.label}</div>
                  <div className="text-xs text-gray-600">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-sm font-medium mb-3">Number of Questions</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {questionCounts.map((count) => (
              <div
                key={count.id}
                onClick={() => setNumberOfQuestions(count.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  numberOfQuestions === count.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{count.label}</div>
                <div className="text-xs text-gray-600">{count.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Limit */}
        <div>
          <label className="block text-sm font-medium mb-3">Time Limit</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timeLimits.map((limit) => (
              <div
                key={limit.id}
                onClick={() => setTimeLimit(limit.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  timeLimit === limit.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{limit.label}</div>
                <div className="text-xs text-gray-600">{limit.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div>
          <label className="block text-sm font-medium mb-3">Specific Topics</label>
          <textarea
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Enter specific topics to cover (one per line)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Quiz Purpose */}
        <div>
          <label className="block text-sm font-medium mb-3">Quiz Purpose</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quizPurposes.map((purpose) => (
              <div
                key={purpose.id}
                onClick={() => setQuizPurpose(purpose.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  quizPurpose === purpose.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{purpose.label}</div>
                <div className="text-xs text-gray-600">{purpose.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium mb-3">Target Audience</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {targetAudiences.map((audience) => (
              <div
                key={audience.id}
                onClick={() => setTargetAudience(audience.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  targetAudience === audience.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{audience.label}</div>
                <div className="text-xs text-gray-600">{audience.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Features */}
        <div>
          <label className="block text-sm font-medium mb-3">Quiz Features</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeExplanations}
                onChange={(e) => setIncludeExplanations(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Include explanations for answers</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={adaptiveDifficulty}
                onChange={(e) => setAdaptiveDifficulty(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Enable adaptive difficulty adjustment</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={allowRetakes}
                onChange={(e) => setAllowRetakes(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Allow quiz retakes</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 