'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIResearchAssistant() {
  const [researchType, setResearchType] = useState('literature-review');
  const [academicField, setAcademicField] = useState('');
  const [researchTopic, setResearchTopic] = useState('');
  const [researchQuestion, setResearchQuestion] = useState('');
  const [sourcesNeeded, setSourcesNeeded] = useState<string[]>([]);
  const [citationStyle, setCitationStyle] = useState('apa');
  const [researchLevel, setResearchLevel] = useState('graduate');
  const [timeframe, setTimeframe] = useState('recent');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const researchTypes = [
    { id: 'literature-review', label: 'Literature Review', description: 'Systematic review of existing research' },
    { id: 'hypothesis-generation', label: 'Hypothesis Generation', description: 'Formulate research hypotheses' },
    { id: 'methodology-design', label: 'Methodology Design', description: 'Research method planning' },
    { id: 'data-analysis', label: 'Data Analysis', description: 'Statistical and qualitative analysis' },
    { id: 'citation-management', label: 'Citation Management', description: 'Reference and bibliography organization' },
    { id: 'grant-writing', label: 'Grant Writing', description: 'Research proposal assistance' }
  ];

  const citationStyles = [
    { id: 'apa', label: 'APA Style', description: 'American Psychological Association' },
    { id: 'mla', label: 'MLA Style', description: 'Modern Language Association' },
    { id: 'chicago', label: 'Chicago Style', description: 'Chicago Manual of Style' },
    { id: 'harvard', label: 'Harvard Style', description: 'Harvard referencing system' },
    { id: 'ieee', label: 'IEEE Style', description: 'Institute of Electrical and Electronics Engineers' },
    { id: 'vancouver', label: 'Vancouver Style', description: 'Medical and scientific journals' }
  ];

  const researchLevels = [
    { id: 'undergraduate', label: 'Undergraduate', description: 'Bachelor\'s level research' },
    { id: 'graduate', label: 'Graduate', description: 'Master\'s level research' },
    { id: 'doctoral', label: 'Doctoral', description: 'PhD level research' },
    { id: 'postdoc', label: 'Post-doctoral', description: 'Advanced research' }
  ];

  const sourceTypes = [
    'Peer-reviewed journals',
    'Books and monographs',
    'Conference proceedings',
    'Government reports',
    'Dissertations/Theses',
    'News articles',
    'Web sources',
    'Primary sources'
  ];

  const timeframes = [
    { id: 'recent', label: 'Recent (Last 5 years)', description: 'Current research' },
    { id: 'decade', label: 'Last Decade', description: '2014-2024' },
    { id: 'comprehensive', label: 'Comprehensive', description: 'All relevant periods' },
    { id: 'historical', label: 'Historical', description: 'Include foundational works' }
  ];

  const handleSourceToggle = (source: string) => {
    setSourcesNeeded(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const selectedType = researchTypes.find(t => t.id === researchType);
    const selectedCitation = citationStyles.find(c => c.id === citationStyle);
    const selectedLevel = researchLevels.find(l => l.id === researchLevel);
    const selectedTimeframe = timeframes.find(t => t.id === timeframe);
    
    const mockResult = `# AI Research Assistant Report

## Research Project Overview
**Research Type**: ${selectedType?.label} - ${selectedType?.description}
**Academic Field**: ${academicField || 'General Research'}
**Research Level**: ${selectedLevel?.label} - ${selectedLevel?.description}
**Citation Style**: ${selectedCitation?.label} - ${selectedCitation?.description}
**Analysis Date**: ${new Date().toLocaleDateString()}

## Research Focus

### Research Topic:
${researchTopic || 'No specific topic provided'}

### Research Question:
${researchQuestion || 'Research question to be developed'}

### Search Timeframe:
${selectedTimeframe?.label} - ${selectedTimeframe?.description}

## Literature Search Strategy

### Database Recommendations:
- **Academic Databases**: JSTOR, PubMed, IEEE Xplore, ACM Digital Library
- **Multidisciplinary**: Web of Science, Scopus, Google Scholar
- **Field-Specific**: ${academicField ? getFieldDatabases(academicField) : 'Discipline-specific databases recommended'}
- **Grey Literature**: OpenGrey, ProQuest Dissertations, Government repositories

### Search Terms & Keywords:
${generateSearchTerms(researchTopic, academicField)}

### Boolean Search Strategy:
${generateBooleanSearch(researchTopic, researchQuestion)}

## Source Analysis

### Recommended Source Types:
${sourcesNeeded.length > 0 ? sourcesNeeded.map(source => `• ${source}: High relevance for research topic`).join('\n') : '• All source types recommended for comprehensive review'}

### Quality Assessment Criteria:
- **Peer Review Status**: Prioritize peer-reviewed publications
- **Journal Impact Factor**: Consider journal rankings and citations
- **Author Credentials**: Evaluate author expertise and affiliations
- **Publication Date**: ${selectedTimeframe?.description} publications prioritized
- **Methodology Quality**: Assess research design and statistical rigor

### Source Evaluation Matrix:
${generateSourceMatrix(researchType, researchLevel)}

## Research Methodology Guidance

${researchType === 'methodology-design' ? generateMethodologyGuidance(researchLevel, academicField) : 
  researchType === 'hypothesis-generation' ? generateHypothesisGuidance(researchTopic, academicField) :
  researchType === 'data-analysis' ? generateDataAnalysisGuidance(researchLevel, academicField) :
  generateLiteratureReviewGuidance(researchLevel, timeframe)}

## Citation Management

### ${selectedCitation?.label} Format Examples:
${generateCitationExamples(citationStyle, sourcesNeeded)}

### Reference Management Tools:
- **Zotero**: Free, open-source reference management
- **Mendeley**: Academic reference manager with PDF annotation
- **EndNote**: Professional reference management software
- **RefWorks**: Web-based reference management system

### Citation Best Practices:
${generateCitationBestPractices(citationStyle, researchLevel)}

## Research Organization

### Project Structure:
\`\`\`
Research Project/
  Literature Review/
    Primary Sources/
    Secondary Sources/
    Citation Database/
  Methodology/
    Research Design/
    Data Collection/
    Analysis Plan/
  Data/
    Raw Data/
    Processed Data/
    Analysis Results/
  Writing/
    Drafts/
    Final Paper/
    Presentations/
\`\`\`

### Time Management:
${generateTimeManagement(researchType, researchLevel)}

## Academic Writing Support

### Writing Structure:
${generateWritingStructure(researchType, researchLevel)}

### Academic Style Guidelines:
- **Clarity**: Use clear, precise language
- **Objectivity**: Maintain neutral, scholarly tone
- **Evidence**: Support all claims with credible sources
- **Citation**: Proper attribution in ${selectedCitation?.label} style
- **Coherence**: Logical flow and organization

### Common Writing Pitfalls:
${generateWritingPitfalls(researchLevel)}

## Collaboration & Networking

### Academic Collaboration:
- **Research Networks**: Join field-specific academic networks
- **Conference Participation**: Present findings at academic conferences
- **Peer Review**: Engage in peer review process
- **Mentorship**: Seek guidance from senior researchers

### Digital Presence:
- **Academic Profiles**: ORCID, ResearchGate, Academia.edu
- **Social Media**: Twitter/X for academic networking
- **Professional Websites**: Personal academic website
- **Publication Tracking**: Google Scholar profile

## Ethical Research Considerations

### Research Ethics:
- **IRB Approval**: Institutional Review Board requirements
- **Informed Consent**: Participant consent procedures
- **Data Privacy**: Confidentiality and anonymization
- **Plagiarism**: Proper attribution and originality
- **Conflict of Interest**: Disclosure requirements

### Academic Integrity:
${generateEthicsGuidance(researchType, researchLevel)}

## Research Tools & Technology

### Analysis Software:
${generateAnalysisTools(academicField, researchType)}

### Data Collection Tools:
- **Surveys**: Qualtrics, SurveyMonkey, Google Forms
- **Interviews**: Zoom, Otter.ai for transcription
- **Observation**: Field notes templates and apps
- **Experiments**: Lab management software

### Writing & Collaboration:
- **Writing**: LaTeX, Microsoft Word with plugins
- **Collaboration**: Google Docs, Overleaf, GitHub
- **Note-taking**: Obsidian, Notion, OneNote
- **Mind Mapping**: Lucidchart, MindMeister

## Funding & Grant Opportunities

### Grant Databases:
- **Federal**: grants.gov, NSF, NIH funding
- **Private**: Foundation Directory Online
- **International**: Fulbright, Marie Curie fellowships
- **Institutional**: University research office resources

### Grant Writing Tips:
${generateGrantTips(researchLevel, academicField)}

## Research Impact & Dissemination

### Publication Strategy:
${generatePublicationStrategy(researchLevel, academicField)}

### Alternative Outputs:
- **Policy Briefs**: Research implications for policy
- **Blog Posts**: Public engagement with research
- **Podcasts**: Audio dissemination of findings
- **Infographics**: Visual research summaries
- **Social Media**: Research communication on platforms

### Impact Measurement:
- **Citations**: Track citation metrics
- **Altmetrics**: Social media and news mentions
- **Downloads**: Publication download statistics
- **Policy Impact**: Influence on policy documents
- **Media Coverage**: News and blog mentions

## Next Steps & Action Plan

### Immediate Actions (1-2 weeks):
${generateImmediateActions(researchType, researchTopic)}

### Short-term Goals (1-3 months):
${generateShortTermActions(researchType, researchLevel)}

### Long-term Objectives (3+ months):
${generateLongTermActions(researchType, researchLevel)}

## Quality Assurance

### Research Validity:
- **Internal Validity**: Control for confounding variables
- **External Validity**: Generalizability of findings
- **Construct Validity**: Measurement accuracy
- **Statistical Validity**: Appropriate statistical methods

### Peer Review Process:
- **Self-Review**: Critical self-assessment
- **Peer Feedback**: Colleague review and input
- **Expert Review**: Subject matter expert evaluation
- **Formal Review**: Journal or conference review process

*AI Research Assistant analysis completed - Comprehensive research strategy ready for implementation*

**Generated on ${new Date().toLocaleDateString()} for academic research purposes**
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const getFieldDatabases = (field: string) => {
    const databases = {
      'psychology': 'PsycINFO, PsycARTICLES',
      'medicine': 'PubMed, MEDLINE, Cochrane Library',
      'engineering': 'IEEE Xplore, Compendex',
      'computer science': 'ACM Digital Library, IEEE Computer Society',
      'business': 'Business Source Premier, ABI/INFORM',
      'education': 'ERIC, Education Database',
      'sociology': 'Sociological Abstracts, SocINDEX',
      'history': 'Historical Abstracts, America: History and Life'
    };
    return databases[field.toLowerCase() as keyof typeof databases] || 'Field-specific databases';
  };

  const generateSearchTerms = (topic: string, field: string) => {
    if (!topic) {
      return `### Primary Keywords:
• Core concept terms related to research focus
• Synonyms and alternative terminology
• Broader and narrower terms
• Field-specific jargon and terminology

### Secondary Keywords:
• Related concepts and theories
• Methodological terms
• Population or context-specific terms
• Temporal or geographic qualifiers`;
    }

    return `### Suggested Search Terms for "${topic}":
• **Primary Terms**: Core keywords from research topic
• **Related Terms**: Synonyms and variant spellings
• **Field Terms**: ${field} specific terminology
• **Methodological Terms**: Research method keywords
• **Theoretical Terms**: Relevant theoretical frameworks`;
  };

  const generateBooleanSearch = (topic: string, question: string) => {
    return `### Boolean Search Examples:
• **AND**: Combine essential terms (topic AND method)
• **OR**: Include synonyms (method OR methodology)
• **NOT**: Exclude irrelevant terms (topic NOT unrelated)
• **Wildcards**: Use * for word variations (psycholog*)
• **Phrases**: Use quotes for exact phrases ("machine learning")

### Search Strategy:
1. Start broad with core terms
2. Add specificity with AND operators
3. Include synonyms with OR operators
4. Refine by excluding irrelevant terms
5. Test multiple search combinations`;
  };

  const generateSourceMatrix = (type: string, level: string) => {
    return `### Source Priority Matrix:

**Tier 1 (Essential)**:
• Peer-reviewed journal articles (80% of sources)
• Seminal works in the field
• Recent systematic reviews
• Meta-analyses when available

**Tier 2 (Important)**:
• Academic books and monographs
• Conference proceedings
• Government and institutional reports
• High-quality dissertations

**Tier 3 (Supplementary)**:
• Professional publications
• News articles for context
• Grey literature
• Web-based resources (with caution)

**Quality Indicators**:
• Journal impact factor > 1.0
• Author h-index and citations
• Institutional affiliation quality
• Methodology rigor and transparency`;
  };

  const generateMethodologyGuidance = (level: string, field: string) => {
    return `### Research Methodology Framework:

**Research Design Selection**:
• **Quantitative**: Surveys, experiments, correlational studies
• **Qualitative**: Interviews, focus groups, ethnography
• **Mixed Methods**: Sequential or concurrent approaches
• **Systematic Review**: Meta-analysis or narrative synthesis

**Sample Size Considerations**:
• **Statistical Power**: Aim for 80% power minimum
• **Effect Size**: Consider expected effect magnitude
• **Population**: Define target and accessible populations
• **Sampling Method**: Random, stratified, or purposive sampling

**Data Collection Methods**:
• **Primary Data**: Surveys, interviews, observations, experiments
• **Secondary Data**: Existing datasets, archival research
• **Measurement Tools**: Validated instruments preferred
• **Data Quality**: Reliability and validity assessment

**Analysis Plan**:
• **Statistical Software**: R, SPSS, SAS for quantitative
• **Qualitative Software**: NVivo, Atlas.ti, MAXQDA
• **Analysis Methods**: Appropriate to research questions
• **Assumptions**: Test statistical assumptions`;
  };

  const generateHypothesisGuidance = (topic: string, field: string) => {
    return `### Hypothesis Development Framework:

**Hypothesis Characteristics**:
• **Testable**: Can be empirically evaluated
• **Specific**: Clear and precise predictions
• **Falsifiable**: Can potentially be disproven
• **Based on Theory**: Grounded in existing literature

**Types of Hypotheses**:
• **Null Hypothesis (H₀)**: No effect or relationship
• **Alternative Hypothesis (H₁)**: Predicted effect or relationship
• **Directional**: Specifies direction of relationship
• **Non-directional**: Relationship exists but direction unspecified

**Hypothesis Formation Process**:
1. **Literature Review**: Identify gaps and patterns
2. **Theoretical Framework**: Connect to existing theories
3. **Variable Identification**: Define independent and dependent variables
4. **Prediction**: Formulate specific, testable predictions
5. **Operationalization**: Define how variables will be measured

**Examples of Well-Formed Hypotheses**:
• Students who receive feedback will show greater improvement than those who do not
• There is a positive correlation between exercise frequency and reported well-being
• Implementation of intervention X will reduce symptom Y by at least 20%`;
  };

  const generateDataAnalysisGuidance = (level: string, field: string) => {
    return `### Data Analysis Strategy:

**Descriptive Statistics**:
• **Central Tendency**: Mean, median, mode
• **Variability**: Standard deviation, variance, range
• **Distribution**: Skewness, kurtosis, normality tests
• **Visualization**: Histograms, box plots, scatter plots

**Inferential Statistics**:
• **T-tests**: Compare means between groups
• **ANOVA**: Compare means across multiple groups
• **Correlation**: Assess relationships between variables
• **Regression**: Predict outcomes and identify predictors
• **Chi-square**: Analyze categorical data relationships

**Advanced Techniques**:
• **Multivariate Analysis**: Multiple regression, MANOVA
• **Longitudinal Analysis**: Repeated measures, growth curves
• **Structural Equation Modeling**: Complex relationships
• **Machine Learning**: Predictive modeling approaches

**Qualitative Analysis**:
• **Thematic Analysis**: Identify patterns and themes
• **Content Analysis**: Systematic categorization
• **Grounded Theory**: Theory development from data
• **Phenomenological Analysis**: Lived experience interpretation

**Validation & Reliability**:
• **Internal Consistency**: Cronbach's alpha, factor analysis
• **Inter-rater Reliability**: Cohen's kappa, intraclass correlation
• **Test-retest Reliability**: Stability over time
• **Validity**: Content, construct, criterion validity`;
  };

  const generateLiteratureReviewGuidance = (level: string, timeframe: string) => {
    return `### Literature Review Methodology:

**Review Types**:
• **Narrative Review**: Comprehensive overview of topic
• **Systematic Review**: Structured, reproducible search
• **Meta-Analysis**: Statistical synthesis of results
• **Scoping Review**: Map available literature

**Search Strategy**:
• **Database Selection**: Multiple relevant databases
• **Search Terms**: Comprehensive keyword strategy
• **Inclusion Criteria**: Clear selection parameters
• **Exclusion Criteria**: Specific rejection criteria
• **Time Frame**: ${timeframe} publications prioritized

**Screening Process**:
1. **Title Screening**: Initial relevance assessment
2. **Abstract Review**: Detailed relevance evaluation
3. **Full-Text Assessment**: Complete eligibility review
4. **Quality Assessment**: Methodological rigor evaluation
5. **Data Extraction**: Systematic information gathering

**Synthesis Methods**:
• **Thematic Organization**: Group by concepts/themes
• **Chronological**: Historical development of field
• **Methodological**: Organize by research methods
• **Theoretical**: Framework or model-based organization

**Critical Analysis**:
• **Strengths**: Identify methodological strengths
• **Limitations**: Note study limitations
• **Gaps**: Identify research gaps
• **Contradictions**: Highlight conflicting findings
• **Future Directions**: Suggest research needs`;
  };

  const generateCitationExamples = (style: string, sources: string[]) => {
    const examples = {
      apa: `**Journal Article**: Smith, J. A. (2023). Research methods in psychology. *Journal of Research*, 45(2), 123-145. https://doi.org/10.1000/123456
**Book**: Johnson, M. (2022). *Academic writing guide* (3rd ed.). Academic Press.
**Chapter**: Brown, K. (2023). Data analysis. In L. White (Ed.), *Research handbook* (pp. 67-89). University Press.`,
      
      mla: `**Journal Article**: Smith, John A. "Research Methods in Psychology." *Journal of Research*, vol. 45, no. 2, 2023, pp. 123-145.
**Book**: Johnson, Mary. *Academic Writing Guide*. 3rd ed., Academic Press, 2022.
**Chapter**: Brown, Karen. "Data Analysis." *Research Handbook*, edited by Lisa White, University Press, 2023, pp. 67-89.`,
      
      chicago: `**Journal Article**: Smith, John A. "Research Methods in Psychology." Journal of Research 45, no. 2 (2023): 123-145.
**Book**: Johnson, Mary. Academic Writing Guide. 3rd ed. Academic Press, 2022.
**Chapter**: Brown, Karen. "Data Analysis." In Research Handbook, edited by Lisa White, 67-89. University Press, 2023.`
    };
    
    return examples[style as keyof typeof examples] || examples.apa;
  };

  const generateCitationBestPractices = (style: string, level: string) => {
    return `### Citation Best Practices:

**Accuracy Requirements**:
• **Complete Information**: All required elements included
• **Correct Format**: Exact ${style.toUpperCase()} style adherence
• **Consistent Style**: Uniform formatting throughout
• **Updated Guidelines**: Use current style manual version

**In-Text Citations**:
• **Author-Date**: (Smith, 2023) for general references
• **Page Numbers**: (Smith, 2023, p. 45) for direct quotes
• **Multiple Authors**: Follow ${style.toUpperCase()} author guidelines
• **No Author**: Use title or organization name

**Reference List**:
• **Alphabetical Order**: Sort by first author surname
• **Hanging Indent**: Second line indented
• **DOI/URL**: Include when available
• **Access Dates**: For web sources when required

**Common Errors to Avoid**:
• Inconsistent date formats
• Missing page numbers for quotes
• Incorrect author name formatting
• Outdated URL links
• Mixed citation styles within document`;
  };

  const generateTimeManagement = (type: string, level: string) => {
    const timelines = {
      'undergraduate': '1-2 semesters',
      'graduate': '1-3 semesters', 
      'doctoral': '2-4 years',
      'postdoc': '1-2 years'
    };
    
    return `### Research Timeline (${timelines[level as keyof typeof timelines]}):

**Phase 1: Planning & Preparation (10-15%)**
• Topic selection and refinement
• Literature search strategy development
• Research question formulation
• Methodology planning

**Phase 2: Literature Review (25-30%)**
• Comprehensive source collection
• Critical analysis and synthesis
• Gap identification
• Theoretical framework development

**Phase 3: Data Collection/Analysis (35-40%)**
• Data gathering or empirical work
• Analysis and interpretation
• Result validation
• Pattern identification

**Phase 4: Writing & Revision (20-25%)**
• Draft composition
• Peer review and feedback
• Revision and refinement
• Final formatting and submission

**Weekly Schedule Recommendations**:
• **Research**: 15-20 hours/week
• **Writing**: 10-15 hours/week
• **Reading**: 8-12 hours/week
• **Analysis**: 5-10 hours/week`;
  };

  const generateWritingStructure = (type: string, level: string) => {
    if (type === 'literature-review') {
      return `### Literature Review Structure:

**Introduction (10-15%)**
• Research context and significance
• Research questions or objectives
• Scope and limitations
• Organization overview

**Body (70-80%)**
• Thematic or chronological organization
• Critical analysis of sources
• Synthesis of findings
• Identification of gaps and contradictions

**Conclusion (10-15%)**
• Summary of key findings
• Research implications
• Future research directions
• Theoretical contributions`;
    }
    
    return `### Research Paper Structure:

**Introduction (10-15%)**
• Problem statement
• Research questions/hypotheses
• Significance and rationale
• Paper organization

**Literature Review (20-25%)**
• Theoretical framework
• Previous research
• Gap identification
• Hypothesis development

**Methodology (15-20%)**
• Research design
• Participants/sample
• Procedures and measures
• Analysis plan

**Results (20-25%)**
• Descriptive statistics
• Hypothesis testing
• Additional analyses
• Visual presentations

**Discussion (15-20%)**
• Interpretation of findings
• Theoretical implications
• Limitations
• Future research

**Conclusion (5-10%)**
• Summary of contributions
• Practical implications
• Final thoughts`;
  };

  const generateWritingPitfalls = (level: string) => {
    return `### Common Academic Writing Issues:

**Content Problems**:
• **Lack of Focus**: Unclear research questions or objectives
• **Insufficient Evidence**: Claims not supported by citations
• **Poor Synthesis**: Sources listed rather than integrated
• **Weak Analysis**: Descriptive rather than critical analysis

**Structure Issues**:
• **Illogical Organization**: Ideas not logically sequenced
• **Poor Transitions**: Abrupt shifts between sections
• **Imbalanced Sections**: Disproportionate section lengths
• **Missing Elements**: Required components omitted

**Style Concerns**:
• **Informal Tone**: Conversational rather than academic
• **Passive Voice Overuse**: Excessive passive constructions
• **Wordiness**: Unnecessarily complex or verbose language
• **Inconsistent Terminology**: Variable use of key terms

**Technical Errors**:
• **Citation Mistakes**: Incorrect or inconsistent citations
• **Grammar Issues**: Subject-verb disagreement, tense errors
• **Formatting Problems**: Inconsistent heading styles
• **Reference Errors**: Incomplete or incorrect references`;
  };

  const generateEthicsGuidance = (type: string, level: string) => {
    return `### Research Ethics Framework:

**Institutional Requirements**:
• **IRB Approval**: Required for human subjects research
• **IACUC Approval**: Required for animal research
• **Data Security**: Secure storage and transmission protocols
• **Consent Procedures**: Informed consent documentation

**Participant Protection**:
• **Voluntary Participation**: No coercion or undue influence
• **Confidentiality**: Identity protection measures
• **Right to Withdraw**: Participants can exit at any time
• **Minimal Risk**: Risk-benefit analysis conducted

**Data Management Ethics**:
• **Data Integrity**: Accurate and honest data reporting
• **Sharing Requirements**: Data availability for verification
• **Privacy Protection**: Personal information safeguards
• **Retention Policies**: Appropriate data storage timeframes

**Publication Ethics**:
• **Authorship**: Appropriate author attribution
• **Plagiarism**: Original work and proper attribution
• **Conflicts of Interest**: Full disclosure of potential conflicts
• **Reproducibility**: Sufficient detail for replication`;
  };

  const generateAnalysisTools = (field: string, type: string) => {
    return `### Recommended Analysis Software:

**Statistical Analysis**:
• **R**: Free, comprehensive statistical environment
• **SPSS**: User-friendly statistical package
• **SAS**: Advanced statistical analysis system
• **Stata**: Econometric and statistical analysis
• **Python**: Programming language with statistical libraries

**Qualitative Analysis**:
• **NVivo**: Comprehensive qualitative data analysis
• **Atlas.ti**: Qualitative data analysis workbench
• **MAXQDA**: Mixed methods analysis software
• **Dedoose**: Web-based mixed methods platform

**Specialized Tools**:
• **MATLAB**: Mathematical computing and engineering
• **Tableau**: Data visualization and business intelligence
• **GraphPad Prism**: Scientific graphing and statistics
• **Mplus**: Structural equation modeling
• **HLM**: Hierarchical linear modeling

**Free Alternatives**:
• **JASP**: Free SPSS alternative
• **jamovi**: User-friendly R interface
• **OpenRefine**: Data cleaning and transformation
• **Orange**: Visual programming for data analysis`;
  };

  const generateGrantTips = (level: string, field: string) => {
    return `### Grant Writing Success Strategies:

**Proposal Components**:
• **Specific Aims**: Clear, achievable objectives
• **Significance**: Impact and importance of research
• **Innovation**: Novel approaches or technologies
• **Approach**: Detailed methodology and timeline
• **Investigator**: Qualifications and track record

**Writing Techniques**:
• **Clear Language**: Avoid jargon and complexity
• **Logical Flow**: Organized and coherent narrative
• **Visual Elements**: Figures and charts for clarity
• **Compelling Story**: Engaging research narrative

**Funding Strategy**:
• **Multiple Applications**: Apply to several sources
• **Appropriate Match**: Align with funder priorities
• **Pilot Data**: Preliminary results strengthen proposals
• **Collaboration**: Partner with experienced researchers

**Common Mistakes**:
• **Overly Ambitious**: Unrealistic scope or timeline
• **Insufficient Detail**: Vague methodology descriptions
• **Poor Budget**: Inadequate or excessive cost estimates
• **Late Submission**: Last-minute preparation issues`;
  };

  const generatePublicationStrategy = (level: string, field: string) => {
    return `### Publication Planning:

**Journal Selection**:
• **Impact Factor**: Balance prestige with acceptance rates
• **Scope Alignment**: Match research to journal focus
• **Open Access**: Consider accessibility requirements
• **Turnaround Time**: Review timeline considerations

**Manuscript Preparation**:
• **Target Journal**: Follow specific guidelines
• **Co-authorship**: Establish contribution agreements
• **Peer Review**: Internal review before submission
• **Revision Planning**: Expect multiple revision rounds

**Alternative Venues**:
• **Conferences**: Present findings to academic community
• **Book Chapters**: Comprehensive topic coverage
• **Special Issues**: Focused thematic publications
• **Preprints**: Early dissemination platforms

**Career Considerations**:
• **Publication Record**: Build consistent output
• **Citation Impact**: Track citation metrics
• **Networking**: Collaborate with established researchers
• **Media Outreach**: Promote research findings`;
  };

  const generateImmediateActions = (type: string, topic: string) => {
    return `1. ${topic ? `Refine research question based on topic: "${topic}"` : 'Define specific research question and objectives'}
2. Conduct preliminary literature search to assess topic viability
3. Set up research organization system (folders, reference manager)
4. Create detailed project timeline with milestones
5. Identify potential advisors or collaborators`;
  };

  const generateShortTermActions = (type: string, level: string) => {
    return `1. Complete comprehensive literature review and synthesis
2. Develop detailed research methodology or analysis plan
3. Obtain necessary approvals (IRB, institutional permissions)
4. Begin data collection or systematic analysis
5. Establish regular meeting schedule with advisors`;
  };

  const generateLongTermActions = (type: string, level: string) => {
    return `1. Complete data analysis and interpret findings
2. Write and revise research manuscript or thesis
3. Present findings at academic conferences
4. Submit work for peer review and publication
5. Plan follow-up research or next project phase
6. Build professional network and research collaborations`;
  };

  return (
    <AIToolLayout
      title="AI Research Assistant"
      description="Academic research support, literature analysis, and scholarly methodology guidance"
      category="Specialized"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Research Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Research Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {researchTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setResearchType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  researchType === type.id
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

        {/* Academic Field and Research Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Academic Field</label>
            <input
              type="text"
              value={academicField}
              onChange={(e) => setAcademicField(e.target.value)}
              placeholder="e.g., Psychology, Computer Science, Biology"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Research Level</label>
            <select
              value={researchLevel}
              onChange={(e) => setResearchLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              {researchLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label} - {level.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Research Topic */}
        <div>
          <label className="block text-sm font-medium mb-3">Research Topic</label>
          <input
            type="text"
            value={researchTopic}
            onChange={(e) => setResearchTopic(e.target.value)}
            placeholder="Enter your research topic or area of focus"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Research Question */}
        <div>
          <label className="block text-sm font-medium mb-3">Research Question</label>
          <textarea
            value={researchQuestion}
            onChange={(e) => setResearchQuestion(e.target.value)}
            placeholder="Enter your specific research question or hypothesis"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Citation Style and Timeframe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Citation Style</label>
            <select
              value={citationStyle}
              onChange={(e) => setCitationStyle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              {citationStyles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.label} - {style.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Publication Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              {timeframes.map((tf) => (
                <option key={tf.id} value={tf.id}>
                  {tf.label} - {tf.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Source Types */}
        <div>
          <label className="block text-sm font-medium mb-3">Preferred Source Types</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sourceTypes.map((source) => (
              <label key={source} className="flex items-center">
                <input
                  type="checkbox"
                  checked={sourcesNeeded.includes(source)}
                  onChange={() => handleSourceToggle(source)}
                  className="mr-2"
                />
                <span className="text-sm">{source}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 