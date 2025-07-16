'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AITranslationTool() {
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('spanish');
  const [translationType, setTranslationType] = useState('general');
  const [textToTranslate, setTextToTranslate] = useState('');
  const [formality, setFormality] = useState('neutral');
  const [contextualHints, setContextualHints] = useState('');
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [culturalAdaptation, setCulturalAdaptation] = useState(true);
  const [qualityCheck, setQualityCheck] = useState(true);
  const [alternativeTranslations, setAlternativeTranslations] = useState(true);
  const [confidenceScoring, setConfidenceScoring] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const languages = [
    { code: 'auto', name: 'Auto-detect', flag: '🌐' },
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'spanish', name: 'Spanish', flag: '🇪🇸' },
    { code: 'french', name: 'French', flag: '🇫🇷' },
    { code: 'german', name: 'German', flag: '🇩🇪' },
    { code: 'italian', name: 'Italian', flag: '🇮🇹' },
    { code: 'portuguese', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'russian', name: 'Russian', flag: '🇷🇺' },
    { code: 'chinese', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'japanese', name: 'Japanese', flag: '🇯🇵' },
    { code: 'korean', name: 'Korean', flag: '🇰🇷' },
    { code: 'arabic', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'dutch', name: 'Dutch', flag: '🇳🇱' },
    { code: 'swedish', name: 'Swedish', flag: '🇸🇪' },
    { code: 'norwegian', name: 'Norwegian', flag: '🇳🇴' }
  ];

  const translationTypes = [
    { id: 'general', label: 'General Translation', description: 'Standard translation for everyday content' },
    { id: 'business', label: 'Business & Corporate', description: 'Professional business communications' },
    { id: 'technical', label: 'Technical & Scientific', description: 'Technical documentation and research' },
    { id: 'legal', label: 'Legal Documents', description: 'Legal contracts and official documents' },
    { id: 'medical', label: 'Medical & Healthcare', description: 'Medical terminology and healthcare content' },
    { id: 'marketing', label: 'Marketing & Creative', description: 'Advertising and creative content' },
    { id: 'academic', label: 'Academic & Research', description: 'Scholarly articles and research papers' },
    { id: 'literary', label: 'Literary & Creative', description: 'Books, stories, and creative writing' }
  ];

  const formalityLevels = [
    { id: 'very-formal', label: 'Very Formal', description: 'Official documents, ceremonies' },
    { id: 'formal', label: 'Formal', description: 'Business communications, academia' },
    { id: 'neutral', label: 'Neutral', description: 'Standard professional tone' },
    { id: 'informal', label: 'Informal', description: 'Casual conversations, social media' },
    { id: 'very-informal', label: 'Very Informal', description: 'Slang, colloquialisms' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const sourceLang = languages.find(l => l.code === sourceLanguage);
    const targetLang = languages.find(l => l.code === targetLanguage);
    const selectedType = translationTypes.find(t => t.id === translationType);
    const selectedFormality = formalityLevels.find(f => f.id === formality);
    
    const mockResult = `# AI Translation Tool Results

## Translation Analysis
**Source Language**: ${sourceLang?.flag} ${sourceLang?.name}${sourceLanguage === 'auto' ? ' (Auto-detected)' : ''}
**Target Language**: ${targetLang?.flag} ${targetLang?.name}
**Translation Type**: ${selectedType?.label} - ${selectedType?.description}
**Formality Level**: ${selectedFormality?.label} - ${selectedFormality?.description}
**Processed**: ${new Date().toLocaleString()}

## Primary Translation

### Original Text:
${textToTranslate || 'Please enter text to translate'}

### Translation:
${generateTranslation(textToTranslate, sourceLanguage, targetLanguage, translationType, formality)}

### Translation Quality Score: ${Math.floor(Math.random() * 15) + 85}/100

## Linguistic Analysis

### Source Text Analysis:
${generateSourceAnalysis(textToTranslate, sourceLanguage, translationType)}

### Translation Methodology:
${generateTranslationMethodology(translationType, formality, culturalAdaptation)}

## Alternative Translations

${alternativeTranslations ? generateAlternatives(textToTranslate, targetLanguage, translationType) : '• Alternative translations disabled'}

## Cultural Adaptation Notes

${culturalAdaptation ? generateCulturalNotes(sourceLanguage, targetLanguage, translationType) : '• Cultural adaptation disabled'}

## Quality Assurance Report

${qualityCheck ? generateQualityReport(sourceLanguage, targetLanguage, translationType) : '• Quality checking disabled'}

## Confidence Scoring

${confidenceScoring ? generateConfidenceScoring(textToTranslate, translationType) : '• Confidence scoring disabled'}

## Contextual Analysis

### Context Interpretation:
${contextualHints ? `Based on provided context: "${contextualHints}"
- Context relevance applied to translation choices
- Terminology adjusted for specific domain
- Cultural references adapted appropriately` : 'No specific context provided - using general translation approach'}

### Terminology Consistency:
- **Technical Terms**: ${translationType === 'technical' ? 'Specialized terminology maintained' : 'Standard terminology applied'}
- **Industry Jargon**: ${translationType === 'business' ? 'Business terminology preserved' : 'General language used'}
- **Cultural References**: ${culturalAdaptation ? 'Adapted for target culture' : 'Literal translation maintained'}

## Translation Memory

### Similar Translations:
${generateTranslationMemory(translationType, targetLanguage)}

### Glossary Matches:
${generateGlossaryMatches(textToTranslate, translationType)}

## Style & Tone Analysis

### Source Text Characteristics:
- **Tone**: ${generateToneAnalysis(formality, translationType)}
- **Register**: ${selectedFormality?.label} level maintained
- **Complexity**: ${translationType === 'technical' ? 'High complexity' : translationType === 'academic' ? 'Academic level' : 'Standard complexity'}
- **Audience**: ${generateAudienceAnalysis(translationType, formality)}

### Target Text Adaptation:
- **Cultural Sensitivity**: ${culturalAdaptation ? 'Applied' : 'Not applied'}
- **Localization Level**: ${culturalAdaptation ? 'Full localization' : 'Direct translation'}
- **Regional Variants**: ${generateRegionalNotes(targetLanguage)}

## Formatting Preservation

${preserveFormatting ? generateFormattingReport() : '• Formatting preservation disabled'}

## Translation Validation

### Accuracy Checks:
- **Semantic Accuracy**: ${Math.floor(Math.random() * 10) + 90}%
- **Syntactic Correctness**: ${Math.floor(Math.random() * 8) + 92}%
- **Pragmatic Appropriateness**: ${Math.floor(Math.random() * 12) + 88}%
- **Cultural Appropriateness**: ${culturalAdaptation ? `${Math.floor(Math.random() * 10) + 90}%` : 'Not assessed'}

### Grammar & Style:
- **Grammar Accuracy**: ${Math.floor(Math.random() * 5) + 95}%
- **Style Consistency**: ${Math.floor(Math.random() * 8) + 92}%
- **Punctuation**: ${preserveFormatting ? 'Preserved and adapted' : 'Standard application'}
- **Capitalization**: Target language conventions applied

## Specialized Features

### Domain-Specific Enhancements:
${generateDomainFeatures(translationType)}

### Advanced Processing:
${generateAdvancedFeatures(qualityCheck, confidenceScoring, alternativeTranslations)}

## Post-Translation Services

### Proofreading Suggestions:
${generateProofreadingSuggestions(translationType, targetLanguage)}

### Localization Recommendations:
${generateLocalizationRecommendations(sourceLanguage, targetLanguage, translationType)}

## Translation Statistics

### Processing Metrics:
- **Word Count**: ${(textToTranslate || 'sample text').split(' ').length} words
- **Character Count**: ${(textToTranslate || 'sample text').length} characters
- **Estimated Reading Time**: ${Math.ceil((textToTranslate || 'sample text').split(' ').length / 200)} minute(s)
- **Translation Time**: ${Math.ceil((textToTranslate || 'sample text').split(' ').length / 500)} minute(s)
- **Complexity Score**: ${Math.floor(Math.random() * 30) + 40}/100

### Cost Estimation:
- **Professional Rate**: $${((textToTranslate || 'sample text').split(' ').length * 0.12).toFixed(2)}
- **Rush Rate**: $${((textToTranslate || 'sample text').split(' ').length * 0.18).toFixed(2)}
- **Specialized Rate**: $${((textToTranslate || 'sample text').split(' ').length * 0.25).toFixed(2)}

## Language Pair Analysis

### Translation Difficulty:
${generateDifficultyAnalysis(sourceLanguage, targetLanguage)}

### Common Challenges:
${generateLanguageChallenges(sourceLanguage, targetLanguage)}

## Continuous Improvement

### Learning Feedback:
- Translation accuracy continuously improved through neural networks
- Domain-specific training data updated regularly
- Cultural adaptation models refined based on user feedback
- Quality scoring algorithms enhanced with human expert validation

### Model Performance:
- **Training Data**: 50+ billion translation pairs
- **Language Coverage**: 100+ languages supported
- **Accuracy Rate**: ${Math.floor(Math.random() * 5) + 95}% for major language pairs
- **Update Frequency**: Real-time model improvements

*AI Translation completed with professional-grade accuracy and cultural sensitivity*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generateTranslation = (text: string, source: string, target: string, type: string, formality: string) => {
    if (!text) return 'No text provided for translation';
    
    // Mock translation based on parameters
    const translations = {
      'english-spanish': {
        'Hello, how are you?': '¡Hola! ¿Cómo estás?',
        'business': 'Estimado/a señor/a, ¿cómo se encuentra usted?',
        'formal': 'Buenos días, ¿cómo está usted?'
      },
      'english-french': {
        'Hello, how are you?': 'Bonjour, comment allez-vous?',
        'business': 'Bonjour Madame/Monsieur, comment vous portez-vous?',
        'informal': 'Salut, comment ça va?'
      }
    };
    
    // Return a sophisticated mock translation
    return `[Professional ${target} translation optimized for ${type} context with ${formality} formality level]

${text.length > 50 ? text.substring(0, 50) + '...' : text} → 

[Translated text would appear here with proper linguistic adaptation, cultural sensitivity, and domain-specific terminology. The translation maintains the original meaning while adapting to target language conventions and cultural context.]`;
  };

  const generateSourceAnalysis = (text: string, source: string, type: string) => {
    if (!text) return '• No text provided for analysis';
    
    return `• **Language Confidence**: ${Math.floor(Math.random() * 10) + 90}% (${source === 'auto' ? 'Auto-detected' : 'User-specified'})
• **Text Complexity**: ${type === 'technical' ? 'High' : type === 'legal' ? 'Very High' : 'Medium'} complexity level
• **Sentence Structure**: ${Math.floor(Math.random() * 3) + 2} average clauses per sentence
• **Vocabulary Level**: ${type === 'academic' ? 'Advanced academic' : type === 'business' ? 'Professional business' : 'Standard'} vocabulary
• **Cultural References**: ${Math.floor(Math.random() * 3)} cultural references detected
• **Idiomatic Expressions**: ${Math.floor(Math.random() * 2)} idiomatic phrases identified`;
  };

  const generateTranslationMethodology = (type: string, formality: string, cultural: boolean) => {
    return `• **Translation Approach**: Neural machine translation with ${type} domain specialization
• **Contextual Processing**: Advanced context-aware translation algorithms
• **Cultural Adaptation**: ${cultural ? 'Full cultural localization applied' : 'Literal translation approach'}
• **Formality Adjustment**: Content adapted to ${formality} register
• **Quality Assurance**: Multi-layer validation including semantic and pragmatic checks
• **Post-editing**: Automated post-editing for fluency and naturalness`;
  };

  const generateAlternatives = (text: string, target: string, type: string) => {
    if (!text) return '• No alternatives available without source text';
    
    return `### Alternative Translation Options:

**Variation 1 (More Formal)**:
[Alternative translation with elevated formality and more sophisticated vocabulary]

**Variation 2 (More Natural)**:
[Translation prioritizing natural flow and idiomatic expressions]

**Variation 3 (Literal)**:
[More literal translation preserving source structure]

**Regional Variations**:
• **${target} (Spain)**: [European Spanish variant]
• **${target} (Latin America)**: [Latin American Spanish variant]
• **${target} (Professional)**: [Business/professional register]

**Context-Specific Options**:
• **Marketing Copy**: Adapted for promotional content
• **Technical Documentation**: Optimized for clarity and precision
• **Conversational**: Natural, spoken-language style`;
  };

  const generateCulturalNotes = (source: string, target: string, type: string) => {
    return `### Cultural Adaptation Applied:

**Localization Elements**:
• **Date/Time Formats**: Adapted to ${target} conventions
• **Number Formats**: Local number and currency formatting
• **Address Formats**: Regional address structure applied
• **Honorifics**: Appropriate titles and forms of address
• **Cultural References**: References adapted or explained for target culture

**Regional Considerations**:
• **Dialectal Variations**: ${target} regional preferences considered
• **Cultural Sensitivity**: Content reviewed for cultural appropriateness
• **Social Conventions**: Communication styles adapted to target culture
• **Business Etiquette**: ${type === 'business' ? 'Professional norms applied' : 'General cultural norms considered'}

**Avoided Pitfalls**:
• **False Friends**: Misleading cognates identified and corrected
• **Cultural Taboos**: Potentially sensitive content flagged and adapted
• **Humor/Wordplay**: Creative adaptations for culture-specific humor
• **Metaphors**: Metaphorical language adapted for cultural relevance`;
  };

  const generateQualityReport = (source: string, target: string, type: string) => {
    return `### Comprehensive Quality Assessment:

**Linguistic Quality**:
• **Fluency Score**: ${Math.floor(Math.random() * 10) + 90}/100
• **Adequacy Score**: ${Math.floor(Math.random() * 8) + 92}/100
• **Naturalness**: ${Math.floor(Math.random() * 12) + 88}/100
• **Consistency**: ${Math.floor(Math.random() * 5) + 95}/100

**Technical Validation**:
• **Grammar Check**: ${Math.floor(Math.random() * 3)} minor issues detected and corrected
• **Spelling Accuracy**: 100% - no spelling errors detected
• **Punctuation**: Properly adapted to target language conventions
• **Typography**: ${preserveFormatting ? 'Original formatting preserved' : 'Standard formatting applied'}

**Content Validation**:
• **Meaning Preservation**: ${Math.floor(Math.random() * 5) + 95}% semantic accuracy
• **Tone Consistency**: Original tone maintained and adapted appropriately
• **Factual Accuracy**: ${type === 'technical' ? 'Technical facts verified' : 'Content accuracy maintained'}
• **Completeness**: 100% - no content omitted or added

**Professional Standards**:
• **Industry Compliance**: ${type === 'legal' ? 'Legal terminology standards met' : type === 'medical' ? 'Medical terminology validated' : 'Industry standards applied'}
• **Style Guide Adherence**: Target language style guidelines followed
• **Accessibility**: Content accessible to target audience education level
• **Readability Score**: ${Math.floor(Math.random() * 15) + 75}/100 (appropriate for intended audience)`;
  };

  const generateConfidenceScoring = (text: string, type: string) => {
    if (!text) return '• No confidence scoring available without source text';
    
    return `### Translation Confidence Analysis:

**Overall Confidence**: ${Math.floor(Math.random() * 15) + 85}%

**Phrase-Level Confidence**:
${text.split('.').slice(0, 3).map((sentence, index) => 
`• **Sentence ${index + 1}**: ${Math.floor(Math.random() * 20) + 80}% confidence
  - High confidence in core meaning
  - ${Math.random() > 0.7 ? 'Minor uncertainty in idiomatic expression' : 'Clear translation path identified'}
  - Terminology: ${type === 'technical' ? 'Specialized terms verified' : 'Standard vocabulary'}`
).join('\n')}

**Uncertainty Factors**:
• **Ambiguous Phrases**: ${Math.floor(Math.random() * 3)} phrases require context clarification
• **Polysemous Words**: ${Math.floor(Math.random() * 2)} words with multiple meanings
• **Cultural Context**: ${Math.floor(Math.random() * 2)} references may need cultural adaptation
• **Technical Terms**: ${type === 'technical' ? `${Math.floor(Math.random() * 4)} specialized terms verified` : 'No technical terminology concerns'}

**Confidence Factors**:
• **Clear Syntax**: Sentence structure allows confident translation
• **Common Vocabulary**: ${Math.floor(Math.random() * 80) + 70}% common vocabulary
• **Contextual Clues**: Sufficient context for accurate interpretation
• **Domain Familiarity**: High confidence in ${type} domain translation`;
  };

  const generateToneAnalysis = (formality: string, type: string) => {
    const tones = {
      'very-formal': 'Ceremonial and highly respectful',
      'formal': 'Professional and courteous',
      'neutral': 'Balanced and appropriate',
      'informal': 'Friendly and conversational',
      'very-informal': 'Casual and relaxed'
    };
    
    return tones[formality as keyof typeof tones] || 'Professional';
  };

  const generateAudienceAnalysis = (type: string, formality: string) => {
    const audiences = {
      'business': 'Corporate professionals and business stakeholders',
      'technical': 'Technical specialists and engineers',
      'legal': 'Legal professionals and official entities',
      'medical': 'Healthcare professionals and patients',
      'academic': 'Researchers and academic community',
      'marketing': 'General public and consumers',
      'literary': 'Literary audience and readers'
    };
    
    return audiences[type as keyof typeof audiences] || 'General audience';
  };

  const generateRegionalNotes = (language: string) => {
    const regional = {
      'spanish': 'European vs. Latin American variants considered',
      'english': 'US, UK, and Commonwealth variants available',
      'french': 'Metropolitan vs. Canadian French options',
      'portuguese': 'Brazilian vs. European Portuguese variants',
      'chinese': 'Simplified vs. Traditional character options',
      'arabic': 'Modern Standard vs. regional dialects'
    };
    
    return regional[language as keyof typeof regional] || 'Standard variant applied';
  };

  const generateFormattingReport = () => {
    return `### Formatting Preservation Report:

**Text Structure**:
• **Paragraphs**: Original paragraph breaks maintained
• **Line Breaks**: Manual line breaks preserved where appropriate
• **Indentation**: Source indentation style adapted to target conventions
• **Lists**: Bullet points and numbering preserved and adapted

**Typography**:
• **Bold/Italic**: Emphasis formatting maintained
• **Fonts**: Font selections preserved where culturally appropriate
• **Headers**: Heading hierarchy maintained with proper target language formatting
• **Special Characters**: Character encoding properly handled

**Layout Elements**:
• **Tables**: Table structure and formatting preserved
• **Images**: Image captions and alt-text translated
• **Hyperlinks**: Link text translated, URLs preserved
• **References**: Citations and footnotes properly formatted

**Document Standards**:
• **Page Layout**: Original layout structure maintained
• **Margins**: Standard margins applied for target language
• **Spacing**: Appropriate line and paragraph spacing
• **Alignment**: Text alignment adapted to target language reading direction`;
  };

  const generateDomainFeatures = (type: string) => {
    const features = {
      'business': `• **Contract Templates**: Business contract translation optimized
• **Financial Terms**: Specialized financial terminology database
• **Corporate Communications**: Executive-level communication standards
• **Marketing Materials**: Brand voice consistency across languages`,
      'technical': `• **Technical Glossaries**: Industry-specific terminology databases
• **Patent Translation**: Specialized patent document handling
• **User Manuals**: Technical documentation optimization
• **API Documentation**: Software documentation translation`,
      'legal': `• **Legal Terminology**: Jurisdiction-specific legal term databases
• **Contract Precision**: Contract language precision and accuracy
• **Compliance Standards**: Legal document compliance requirements
• **Notarization Ready**: Translations suitable for official use`,
      'medical': `• **Medical Terminology**: Comprehensive medical dictionary integration
• **Patient Safety**: Patient communication accuracy prioritized
• **Regulatory Compliance**: Medical device and pharmaceutical standards
• **Clinical Documentation**: Healthcare record translation protocols`
    };
    
    return features[type as keyof typeof features] || `• **General Translation**: Standard translation features applied
• **Quality Assurance**: General quality checking protocols
• **Cultural Adaptation**: Basic cultural sensitivity measures
• **Terminology Management**: Standard vocabulary database access`;
  };

  const generateAdvancedFeatures = (quality: boolean, confidence: boolean, alternatives: boolean) => {
    const features = [];
    
    if (quality) {
      features.push('• **Multi-layer QA**: Automated quality assurance with human expert validation patterns');
    }
    if (confidence) {
      features.push('• **AI Confidence Metrics**: Real-time confidence scoring for translation reliability');
    }
    if (alternatives) {
      features.push('• **Multiple Options**: Alternative translation suggestions for nuanced choices');
    }
    
    features.push('• **Neural Processing**: Advanced neural machine translation with transformer architecture');
    features.push('• **Context Awareness**: Deep contextual understanding beyond sentence boundaries');
    features.push('• **Continuous Learning**: AI models updated with latest linguistic developments');
    
    return features.join('\n');
  };

  const generateProofreadingSuggestions = (type: string, target: string) => {
    return `### Post-Translation Review Recommendations:

**Human Review Priorities**:
• **Cultural Nuances**: Review cultural references and localization choices
• **Technical Accuracy**: ${type === 'technical' ? 'Verify technical terminology with subject matter expert' : 'Standard accuracy review sufficient'}
• **Style Consistency**: Ensure consistent tone and style throughout document
• **Final Proofread**: Native speaker review recommended for important documents

**Quality Enhancement**:
• **Terminology Validation**: Cross-reference specialized terms with authoritative sources
• **Flow Optimization**: Review sentence flow and readability in target language
• **Cultural Sensitivity**: Final check for cultural appropriateness and sensitivity
• **Brand Voice**: ${type === 'marketing' ? 'Ensure brand voice consistency in target market' : 'Maintain professional tone throughout'}

**Delivery Optimization**:
• **Format Check**: Verify all formatting translated correctly
• **Link Verification**: Ensure all hyperlinks function in target language context
• **Accessibility**: Confirm translation meets accessibility standards
• **Version Control**: Maintain translation versioning for future updates`;
  };

  const generateLocalizationRecommendations = (source: string, target: string, type: string) => {
    return `### Comprehensive Localization Strategy:

**Market Adaptation**:
• **Local Regulations**: Research target market regulatory requirements
• **Currency Conversion**: Update pricing and financial references
• **Contact Information**: Localize phone numbers, addresses, and support channels
• **Legal Disclaimers**: Adapt legal text for target jurisdiction

**Cultural Integration**:
• **Visual Elements**: Consider image and color adaptation for target culture
• **Measurement Units**: Convert measurements to local standards
• **Date/Time**: Implement local date and time conventions
• **Payment Methods**: Include locally preferred payment options

**SEO & Digital**:
• **Keyword Localization**: Research target language SEO keywords
• **URL Structure**: Implement hreflang and localized URL structure
• **Meta Tags**: Translate and optimize meta descriptions for local search
• **Social Media**: Adapt social media references for local platforms

**Market Entry Support**:
• **Competitive Analysis**: Research local competitors and messaging
• **Price Positioning**: Analyze local market pricing strategies
• **Distribution Channels**: Identify appropriate local distribution methods
• **Partnership Opportunities**: Research potential local business partnerships`;
  };

  const generateDifficultyAnalysis = (source: string, target: string) => {
    return `**Language Pair Complexity**: ${Math.random() > 0.5 ? 'Moderate' : 'High'} difficulty level
**Linguistic Distance**: ${source === 'english' && target === 'spanish' ? 'Moderate distance' : 'Significant linguistic differences'}
**Writing System**: ${target === 'chinese' || target === 'arabic' ? 'Different writing system requires special attention' : 'Similar writing systems'}
**Grammar Complexity**: ${target === 'german' || target === 'finnish' ? 'Complex grammatical structures' : 'Standard grammatical complexity'}`;
  };

  const generateLanguageChallenges = (source: string, target: string) => {
    return `• **Word Order**: ${target === 'japanese' || target === 'korean' ? 'Significant word order differences require restructuring' : 'Minor word order adjustments needed'}
• **Gender/Articles**: ${target === 'german' || target === 'spanish' ? 'Grammatical gender system requires careful attention' : 'No gender considerations'}
• **Formality Levels**: ${target === 'japanese' || target === 'korean' ? 'Complex honorific system requires cultural knowledge' : 'Standard formality considerations'}
• **Idiomatic Expressions**: Cultural idioms require creative adaptation rather than literal translation
• **False Friends**: Cognates with different meanings require careful handling
• **Cultural Context**: References to culture-specific concepts need explanation or adaptation`;
  };

  const generateTranslationMemory = (type: string, target: string) => {
    return `• **Previous Translations**: ${Math.floor(Math.random() * 100) + 50} similar ${type} translations in database
• **Terminology Matches**: ${Math.floor(Math.random() * 20) + 10} consistent terminology matches found
• **Style Consistency**: Previous translations in similar style available for reference
• **Quality Benchmarks**: Translation quality metrics based on previous professional reviews`;
  };

  const generateGlossaryMatches = (text: string, type: string) => {
    if (!text) return '• No glossary matches available without source text';
    
    return `• **Domain Glossary**: ${Math.floor(Math.random() * 15) + 5} specialized terms matched to ${type} glossary
• **Approved Terminology**: All technical terms verified against approved translation database
• **Consistency Check**: Terminology usage consistent with previous translations
• **Client Preferences**: Translation choices align with client terminology preferences`;
  };

  return (
    <AIToolLayout
      title="AI Translation Tool"
      description="Professional-grade translation with context awareness and cultural adaptation"
      category="Specialized"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-3">Source Language</label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => setSourceLanguage(lang.code)}
                  className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                    sourceLanguage === lang.code
                      ? 'bg-yellow-50 border border-yellow-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Target Language</label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {languages.filter(l => l.code !== 'auto').map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => setTargetLanguage(lang.code)}
                  className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                    targetLanguage === lang.code
                      ? 'bg-yellow-50 border border-yellow-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Translation Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Translation Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {translationTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setTranslationType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  translationType === type.id
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

        {/* Formality Level */}
        <div>
          <label className="block text-sm font-medium mb-3">Formality Level</label>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {formalityLevels.map((level) => (
              <div
                key={level.id}
                onClick={() => setFormality(level.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  formality === level.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{level.label}</div>
                <div className="text-xs text-gray-600">{level.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Text to Translate */}
        <div>
          <label className="block text-sm font-medium mb-3">Text to Translate</label>
          <textarea
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            placeholder="Enter the text you want to translate..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-32 resize-none"
          />
          <div className="mt-2 text-sm text-gray-500">
            {textToTranslate.length} characters, {textToTranslate.split(' ').filter(word => word).length} words
          </div>
        </div>

        {/* Contextual Hints */}
        <div>
          <label className="block text-sm font-medium mb-3">Contextual Hints (optional)</label>
          <textarea
            value={contextualHints}
            onChange={(e) => setContextualHints(e.target.value)}
            placeholder="Provide context about the content (e.g., 'This is a marketing email for a tech startup targeting young professionals')"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-20 resize-none"
          />
        </div>

        {/* Translation Options */}
        <div>
          <label className="block text-sm font-medium mb-3">Translation Options</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preserveFormatting}
                onChange={(e) => setPreserveFormatting(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Preserve original formatting and structure</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={culturalAdaptation}
                onChange={(e) => setCulturalAdaptation(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Apply cultural adaptation and localization</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={qualityCheck}
                onChange={(e) => setQualityCheck(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Include comprehensive quality analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={alternativeTranslations}
                onChange={(e) => setAlternativeTranslations(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Provide alternative translation options</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={confidenceScoring}
                onChange={(e) => setConfidenceScoring(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Show confidence scoring for translations</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 