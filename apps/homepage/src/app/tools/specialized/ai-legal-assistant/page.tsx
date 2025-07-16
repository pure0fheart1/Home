'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AILegalAssistant() {
  const [documentType, setDocumentType] = useState('contract');
  const [jurisdiction, setJurisdiction] = useState('us-federal');
  const [analysisType, setAnalysisType] = useState('comprehensive');
  const [documentText, setDocumentText] = useState('');
  const [specificConcerns, setSpecificConcerns] = useState('');
  const [riskAssessment, setRiskAssessment] = useState(true);
  const [complianceCheck, setComplianceCheck] = useState(true);
  const [clauseAnalysis, setClauseAnalysis] = useState(true);
  const [redlining, setRedlining] = useState(true);
  const [precedentSearch, setPrecedentSearch] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const documentTypes = [
    { id: 'contract', label: 'Contract', description: 'Business contracts and agreements' },
    { id: 'lease', label: 'Lease Agreement', description: 'Property rental agreements' },
    { id: 'employment', label: 'Employment Document', description: 'Employment contracts and policies' },
    { id: 'nda', label: 'NDA/Confidentiality', description: 'Non-disclosure agreements' },
    { id: 'privacy', label: 'Privacy Policy', description: 'Data privacy and terms of service' },
    { id: 'corporate', label: 'Corporate Document', description: 'Articles, bylaws, resolutions' },
    { id: 'intellectual', label: 'Intellectual Property', description: 'Patents, trademarks, licensing' },
    { id: 'litigation', label: 'Litigation Document', description: 'Court filings and pleadings' }
  ];

  const jurisdictions = [
    { id: 'us-federal', label: 'US Federal', description: 'Federal United States law' },
    { id: 'us-ca', label: 'California, US', description: 'California state law' },
    { id: 'us-ny', label: 'New York, US', description: 'New York state law' },
    { id: 'us-tx', label: 'Texas, US', description: 'Texas state law' },
    { id: 'uk', label: 'United Kingdom', description: 'UK/English law' },
    { id: 'eu', label: 'European Union', description: 'EU regulations and directives' },
    { id: 'canada', label: 'Canada', description: 'Canadian federal law' },
    { id: 'australia', label: 'Australia', description: 'Australian commonwealth law' }
  ];

  const analysisTypes = [
    { id: 'comprehensive', label: 'Comprehensive Review', description: 'Full legal analysis and risk assessment' },
    { id: 'compliance', label: 'Compliance Check', description: 'Regulatory compliance verification' },
    { id: 'risk', label: 'Risk Assessment', description: 'Legal risk identification and evaluation' },
    { id: 'clause', label: 'Clause Analysis', description: 'Detailed clause-by-clause review' },
    { id: 'comparison', label: 'Document Comparison', description: 'Compare against standards or versions' },
    { id: 'drafting', label: 'Drafting Assistance', description: 'Help improve document language' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 4500));
    
    const selectedDoc = documentTypes.find(d => d.id === documentType);
    const selectedJurisdiction = jurisdictions.find(j => j.id === jurisdiction);
    const selectedAnalysis = analysisTypes.find(a => a.id === analysisType);
    
    const mockResult = `# AI Legal Assistant Analysis Report

## Document Overview
**Document Type**: ${selectedDoc?.label} - ${selectedDoc?.description}
**Jurisdiction**: ${selectedJurisdiction?.label} - ${selectedJurisdiction?.description}
**Analysis Type**: ${selectedAnalysis?.label} - ${selectedAnalysis?.description}
**Analysis Date**: ${new Date().toLocaleDateString()}
**Document Length**: ${(documentText || 'sample document').split(' ').length} words

## Executive Summary

### Overall Legal Health Score: ${Math.floor(Math.random() * 25) + 65}/100

### Critical Findings:
- **High Risk Issues**: ${Math.floor(Math.random() * 3) + 1} critical issues requiring immediate attention
- **Medium Risk Items**: ${Math.floor(Math.random() * 5) + 3} areas for improvement
- **Compliance Status**: ${Math.random() > 0.7 ? '⚠️ Some compliance issues detected' : '✅ Generally compliant'}
- **Legal Clarity**: ${Math.floor(Math.random() * 30) + 70}% of clauses clearly defined

### Recommended Actions:
1. **Immediate**: Address ${Math.floor(Math.random() * 2) + 1} high-priority legal risks
2. **Short-term**: Review and strengthen ${Math.floor(Math.random() * 4) + 3} contract provisions
3. **Long-term**: Consider updating ${Math.floor(Math.random() * 3) + 2} standard clauses

## Legal Risk Assessment

${riskAssessment ? generateRiskAssessment(documentType, jurisdiction) : '• Risk assessment not requested'}

## Compliance Analysis

${complianceCheck ? generateComplianceAnalysis(documentType, jurisdiction) : '• Compliance checking disabled'}

## Clause-by-Clause Analysis

${clauseAnalysis ? generateClauseAnalysis(documentType, documentText) : '• Clause analysis disabled'}

## Document Review & Redlining

${redlining ? generateRedliningAnalysis(documentType, documentText) : '• Redlining analysis disabled'}

## Precedent & Case Law Research

${precedentSearch ? generatePrecedentAnalysis(documentType, jurisdiction) : '• Precedent research not requested'}

## Specific Legal Concerns

### Addressed Concerns:
${specificConcerns ? `Based on your specific concerns: "${specificConcerns}"

**Analysis**: Your concerns are well-founded and require attention in the following areas:
• Legal liability exposure assessment
• Contractual obligation clarity review  
• Dispute resolution mechanism evaluation
• Governing law and jurisdiction verification` : 'No specific concerns provided - comprehensive review conducted'}

## Document Structure Analysis

### Legal Framework Assessment:
- **Preamble/Introduction**: ${Math.random() > 0.3 ? '✅ Complete and appropriate' : '⚠️ Could be strengthened'}
- **Definitions Section**: ${Math.random() > 0.4 ? '✅ Comprehensive definitions provided' : '⚠️ Missing key definitions'}
- **Core Provisions**: ${Math.random() > 0.6 ? '✅ Well-structured and clear' : '⚠️ Some ambiguities detected'}
- **Termination Clauses**: ${Math.random() > 0.5 ? '✅ Clearly defined exit mechanisms' : '⚠️ Termination procedures unclear'}
- **Dispute Resolution**: ${Math.random() > 0.3 ? '✅ Appropriate dispute mechanisms' : '⚠️ Weak dispute resolution framework'}

### Document Quality Metrics:
- **Legal Precision**: ${Math.floor(Math.random() * 20) + 75}/100
- **Enforceability**: ${Math.floor(Math.random() * 25) + 70}/100
- **Clarity Score**: ${Math.floor(Math.random() * 30) + 65}/100
- **Completeness**: ${Math.floor(Math.random() * 20) + 80}/100

## Regulatory Compliance Review

### Industry-Specific Compliance:
${generateIndustryCompliance(documentType, jurisdiction)}

### Data Protection & Privacy:
${generatePrivacyCompliance(documentType, jurisdiction)}

### Employment Law Compliance:
${documentType === 'employment' ? generateEmploymentCompliance(jurisdiction) : '• Not applicable for this document type'}

## Contract Performance Analysis

### Obligation Analysis:
${generateObligationAnalysis(documentType, documentText)}

### Performance Metrics:
${generatePerformanceMetrics(documentType)}

## Legal Technology Integration

### E-Discovery Readiness:
- **Document Format**: ${Math.random() > 0.8 ? 'Requires format optimization' : 'E-discovery ready'}
- **Metadata Management**: Proper metadata handling protocols recommended
- **Search Optimization**: Document structured for efficient legal search
- **Version Control**: ${redlining ? 'Comprehensive versioning system needed' : 'Standard version control sufficient'}

### Contract Management:
- **Automated Alerts**: Set up renewal and deadline notifications
- **Performance Tracking**: Implement milestone and deliverable tracking
- **Amendment Procedures**: Standardized amendment and modification processes
- **Archive Requirements**: Long-term storage and retrieval optimization

## Negotiation Strategy

### Leverage Points:
${generateNegotiationStrategy(documentType, riskAssessment)}

### Alternative Provisions:
${generateAlternativeProvisions(documentType, clauseAnalysis)}

## Legal Cost Analysis

### Estimated Legal Costs:
- **Document Review**: $${Math.floor(Math.random() * 2000) + 1000} (attorney review)
- **Revisions**: $${Math.floor(Math.random() * 1500) + 500} (drafting improvements)
- **Compliance Update**: $${Math.floor(Math.random() * 1000) + 300} (regulatory alignment)
- **Negotiation Support**: $${Math.floor(Math.random() * 3000) + 1000} (if required)

### Cost-Benefit Analysis:
- **Risk Mitigation Value**: $${Math.floor(Math.random() * 50000) + 10000}
- **Compliance Savings**: $${Math.floor(Math.random() * 20000) + 5000}
- **Negotiation Advantage**: $${Math.floor(Math.random() * 30000) + 15000}

## Implementation Recommendations

### Immediate Actions (0-30 days):
${generateImmediateActions(documentType, riskAssessment, complianceCheck)}

### Short-term Improvements (1-6 months):
${generateShortTermActions(documentType, jurisdiction)}

### Long-term Strategy (6+ months):
${generateLongTermStrategy(documentType, jurisdiction)}

## Legal Professional Consultation

### Recommended Expertise:
${generateProfessionalRecommendations(documentType, jurisdiction, riskAssessment)}

### When to Engage Counsel:
- **Complex Negotiations**: When deal value exceeds $${Math.floor(Math.random() * 500000) + 100000}
- **High-Risk Provisions**: For liability caps above $${Math.floor(Math.random() * 1000000) + 500000}
- **Regulatory Changes**: When new compliance requirements emerge
- **Dispute Escalation**: Before formal legal proceedings

## Document Automation Opportunities

### Template Development:
- **Standardized Clauses**: Create reusable clause library
- **Approval Workflows**: Implement automated approval processes
- **Risk Scoring**: Automated risk assessment for similar documents
- **Compliance Monitoring**: Ongoing regulatory change tracking

### Technology Integration:
- **Contract Lifecycle Management**: Full CLM system implementation
- **AI-Powered Review**: Continuous document monitoring and alerts
- **Digital Signatures**: Secure electronic signature implementation
- **Blockchain Options**: Consider distributed ledger for high-value agreements

## Quality Assurance Checklist

### Pre-Signature Verification:
✅ All parties properly identified and authorized
✅ Consideration and mutual obligations clearly stated
✅ Performance standards and metrics defined
✅ Termination procedures and notice requirements specified
✅ Governing law and jurisdiction clauses included
✅ Dispute resolution mechanisms established
✅ Intellectual property rights addressed
✅ Confidentiality and non-disclosure provisions included

### Post-Signature Management:
- Set up contract performance monitoring
- Establish amendment and modification procedures
- Implement deadline and renewal tracking
- Create dispute escalation protocols

## Legal Disclaimer

**Important Notice**: This AI-generated legal analysis is for informational purposes only and does not constitute legal advice. Always consult with qualified legal professionals before making legal decisions or executing agreements. Laws vary by jurisdiction and change frequently.

**Limitations**: This analysis is based on the provided document text and selected parameters. It may not capture all legal nuances or jurisdiction-specific requirements. Professional legal review is recommended for all important legal documents.

*Analysis completed on ${new Date().toLocaleDateString()} using AI Legal Assistant technology*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generateRiskAssessment = (docType: string, jurisdiction: string) => {
    return `### Comprehensive Risk Analysis:

**High-Risk Areas Identified**:
• **Liability Exposure**: ${docType === 'contract' ? 'Unlimited liability clauses detected' : 'Standard liability terms present'}
• **Indemnification**: ${Math.random() > 0.6 ? 'One-sided indemnification favoring counterparty' : 'Balanced indemnification provisions'}
• **Termination Rights**: ${Math.random() > 0.5 ? 'Asymmetric termination rights detected' : 'Reciprocal termination provisions'}
• **Intellectual Property**: ${docType === 'intellectual' ? 'Complex IP ownership issues require attention' : 'Standard IP provisions adequate'}

**Financial Risk Assessment**:
• **Payment Terms**: ${Math.random() > 0.4 ? 'Payment terms favor counterparty' : 'Balanced payment structure'}
• **Penalty Clauses**: ${Math.random() > 0.7 ? 'Excessive penalty provisions detected' : 'Reasonable penalty structure'}
• **Currency/Inflation**: ${Math.random() > 0.8 ? 'No inflation protection mechanisms' : 'Adequate economic protection'}
• **Credit Risk**: ${Math.random() > 0.6 ? 'Counterparty creditworthiness concerns' : 'Acceptable credit risk profile'}

**Operational Risk Factors**:
• **Performance Standards**: ${Math.random() > 0.5 ? 'Vague performance criteria' : 'Clear performance metrics'}
• **Change Management**: ${Math.random() > 0.6 ? 'Inadequate change control procedures' : 'Robust change management framework'}
• **Force Majeure**: ${Math.random() > 0.3 ? 'Comprehensive force majeure coverage' : 'Limited force majeure protection'}
• **Regulatory Compliance**: ${Math.random() > 0.4 ? 'Compliance obligations clearly defined' : 'Regulatory requirements need clarification'}

**Legal/Regulatory Risks**:
• **Governing Law**: ${jurisdiction === 'us-federal' ? 'Federal law appropriately selected' : 'Jurisdiction selection appropriate'}
• **Regulatory Changes**: ${Math.random() > 0.5 ? 'Adequate regulatory change provisions' : 'Limited regulatory adaptation mechanisms'}
• **Cross-Border Issues**: ${Math.random() > 0.7 ? 'International transaction complexities addressed' : 'Domestic transaction - minimal cross-border risk'}
• **Enforceability**: ${Math.floor(Math.random() * 20) + 80}% likelihood of successful enforcement`;
  };

  const generateComplianceAnalysis = (docType: string, jurisdiction: string) => {
    return `### Regulatory Compliance Assessment:

**${jurisdiction.toUpperCase()} Compliance Status**:
• **Contract Law Requirements**: ${Math.random() > 0.8 ? '⚠️ Some requirements not fully met' : '✅ Meets basic contract law standards'}
• **Consumer Protection**: ${docType === 'contract' ? '✅ Consumer protection provisions adequate' : 'N/A for document type'}
• **Employment Regulations**: ${docType === 'employment' ? '⚠️ Some employment law gaps identified' : 'N/A for document type'}
• **Data Protection Laws**: ${Math.random() > 0.6 ? '⚠️ GDPR/CCPA compliance needs attention' : '✅ Data protection requirements met'}

**Industry-Specific Compliance**:
• **Financial Services**: ${Math.random() > 0.7 ? 'Additional SOX compliance required' : 'Standard financial oversight sufficient'}
• **Healthcare**: ${docType === 'privacy' ? 'HIPAA compliance verification needed' : 'No healthcare-specific requirements'}
• **Technology**: ${Math.random() > 0.5 ? 'Software licensing compliance verified' : 'No technology-specific issues'}
• **International Trade**: ${Math.random() > 0.8 ? 'Export control regulations apply' : 'No international trade restrictions'}

**Regulatory Filing Requirements**:
• **SEC Filings**: ${docType === 'corporate' ? 'May require SEC disclosure' : 'No SEC filing requirements'}
• **State Registrations**: ${Math.random() > 0.6 ? 'State business registration may be required' : 'No additional state requirements'}
• **Professional Licensing**: ${Math.random() > 0.7 ? 'Professional license verification needed' : 'No professional licensing requirements'}
• **Tax Implications**: ${Math.random() > 0.5 ? 'Tax reporting obligations identified' : 'Minimal tax compliance requirements'}

**Compliance Timeline**:
• **Immediate (0-30 days)**: Address ${Math.floor(Math.random() * 3) + 1} critical compliance gaps
• **Short-term (1-6 months)**: Implement ${Math.floor(Math.random() * 4) + 2} compliance improvements
• **Ongoing**: Establish compliance monitoring for regulatory changes`;
  };

  const generateClauseAnalysis = (docType: string, text: string) => {
    if (!text) {
      return `### Standard Clause Analysis for ${docType.charAt(0).toUpperCase() + docType.slice(1)} Documents:

**Essential Clauses Review**:
• **Parties Identification**: Clear identification of all contracting parties required
• **Scope of Work**: Detailed description of obligations and deliverables needed
• **Payment Terms**: Specific payment amounts, timing, and methods must be defined
• **Duration & Termination**: Contract term and termination procedures should be specified
• **Governing Law**: Jurisdiction and applicable law clauses recommended`;
    }

    return `### Detailed Clause Analysis:

**Contract Structure Assessment**:
• **Opening Provisions**: ${Math.random() > 0.3 ? '✅ Proper party identification and recitals' : '⚠️ Incomplete opening provisions'}
• **Definitions Section**: ${Math.random() > 0.4 ? '✅ Comprehensive defined terms' : '⚠️ Missing key definitions'}
• **Core Obligations**: ${Math.random() > 0.5 ? '✅ Clear mutual obligations' : '⚠️ Vague obligation language'}
• **Consideration**: ${Math.random() > 0.2 ? '✅ Adequate consideration stated' : '⚠️ Consideration issues detected'}

**Critical Clause Analysis**:
• **Force Majeure**: ${Math.random() > 0.6 ? 'Comprehensive coverage including pandemic provisions' : 'Standard force majeure clause present'}
• **Limitation of Liability**: ${Math.random() > 0.5 ? 'Mutual liability caps appropriate' : 'Unbalanced liability allocation'}
• **Indemnification**: ${Math.random() > 0.4 ? 'Reciprocal indemnification structure' : 'One-sided indemnification concerns'}
• **Confidentiality**: ${Math.random() > 0.3 ? 'Robust confidentiality provisions' : 'Basic confidentiality coverage'}

**Performance & Delivery**:
• **Acceptance Criteria**: ${Math.random() > 0.5 ? 'Clear acceptance standards defined' : 'Acceptance criteria need clarification'}
• **Service Levels**: ${Math.random() > 0.6 ? 'Specific SLA metrics included' : 'Service level expectations unclear'}
• **Remedies**: ${Math.random() > 0.4 ? 'Appropriate remedy structure' : 'Limited remedy options'}
• **Warranty Provisions**: ${Math.random() > 0.3 ? 'Comprehensive warranty coverage' : 'Minimal warranty protection'}

**Relationship Management**:
• **Communication Protocols**: ${Math.random() > 0.5 ? 'Clear communication procedures' : 'Communication methods undefined'}
• **Change Management**: ${Math.random() > 0.6 ? 'Formal change control process' : 'Informal change procedures'}
• **Dispute Resolution**: ${Math.random() > 0.4 ? 'Multi-tier dispute resolution' : 'Basic dispute mechanisms'}
• **Relationship Governance**: ${Math.random() > 0.5 ? 'Governance structure defined' : 'Management structure unclear'}`;
  };

  const generateRedliningAnalysis = (docType: string, text: string) => {
    return `### Document Review & Redlining Suggestions:

**Language Improvements**:
• **Ambiguous Terms**: Replace ${Math.floor(Math.random() * 5) + 3} vague terms with specific definitions
• **Passive Voice**: Convert ${Math.floor(Math.random() * 8) + 5} passive constructions to active voice
• **Lengthy Sentences**: Break down ${Math.floor(Math.random() * 6) + 4} complex sentences for clarity
• **Technical Jargon**: Simplify ${Math.floor(Math.random() * 4) + 2} technical terms or add definitions

**Structural Revisions**:
• **Section Organization**: Reorganize ${Math.floor(Math.random() + 3) + 2} sections for logical flow
• **Cross-References**: Add ${Math.floor(Math.random() * 6) + 4} internal cross-references for clarity
• **Numbering System**: Implement consistent numbering throughout document
• **Appendices**: Move ${Math.floor(Math.random() * 3) + 1} detailed provisions to appendices

**Legal Strengthening**:
• **Missing Clauses**: Add ${Math.floor(Math.random() * 4) + 3} standard protective clauses
• **Enforcement Mechanisms**: Strengthen ${Math.floor(Math.random() * 3) + 2} enforcement provisions
• **Notice Requirements**: Clarify notice procedures and timing requirements
• **Compliance Integration**: Add regulatory compliance monitoring provisions

**Risk Mitigation Edits**:
• **Liability Caps**: Recommend mutual liability limitations
• **Insurance Requirements**: Add appropriate insurance coverage requirements
• **Audit Rights**: Include audit and inspection provisions
• **Termination Protection**: Strengthen termination for cause procedures

**Negotiation Recommendations**:
• **Favorable Terms**: ${Math.floor(Math.random() * 6) + 4} provisions could be more favorable
• **Reciprocal Rights**: Balance ${Math.floor(Math.random() * 3) + 2} one-sided provisions
• **Economic Terms**: Review pricing and payment terms for competitiveness
• **Performance Standards**: Negotiate more achievable performance metrics`;
  };

  const generatePrecedentAnalysis = (docType: string, jurisdiction: string) => {
    return `### Precedent & Case Law Research:

**Relevant Case Law**:
• **Recent Decisions**: ${Math.floor(Math.random() * 15) + 10} relevant cases from last 5 years
• **Jurisdictional Precedents**: ${Math.floor(Math.random() * 20) + 15} applicable ${jurisdiction} decisions
• **Circuit Court Opinions**: ${Math.floor(Math.random() * 8) + 5} influential circuit court rulings
• **Supreme Court Cases**: ${Math.floor(Math.random() * 3) + 1} relevant Supreme Court decisions

**Contract Interpretation Trends**:
• **Plain Meaning Rule**: Courts emphasize clear, unambiguous language
• **Commercial Reasonableness**: Increasing focus on commercially reasonable interpretations
• **Good Faith Obligations**: Implied duty of good faith and fair dealing strengthened
• **Consumer Protection**: Enhanced consumer protection in B2C agreements

**Industry-Specific Precedents**:
• **${docType.charAt(0).toUpperCase() + docType.slice(1)} Cases**: ${Math.floor(Math.random() * 12) + 8} relevant industry cases
• **Enforcement Rates**: ${Math.floor(Math.random() * 20) + 75}% successful enforcement rate for similar clauses
• **Damage Awards**: Average damages range $${Math.floor(Math.random() * 500000) + 100000} - $${Math.floor(Math.random() * 2000000) + 1000000}
• **Settlement Patterns**: ${Math.floor(Math.random() * 30) + 60}% of cases settle before trial

**Regulatory Developments**:
• **Recent Regulations**: ${Math.floor(Math.random() * 5) + 3} new regulatory requirements
• **Pending Legislation**: ${Math.floor(Math.random() * 4) + 2} proposed laws may impact agreements
• **Enforcement Actions**: ${Math.floor(Math.random() * 10) + 5} recent enforcement actions in sector
• **Guidance Updates**: ${Math.floor(Math.random() * 6) + 4} regulatory guidance updates

**Best Practices Evolution**:
• **Industry Standards**: Emerging best practices in ${docType} agreements
• **Technology Integration**: Digital signature and blockchain adoption trends
• **ESG Considerations**: Environmental and social governance integration
• **Risk Management**: Enhanced risk allocation and mitigation strategies`;
  };

  const generateIndustryCompliance = (docType: string, jurisdiction: string) => {
    return `• **Financial Services**: ${Math.random() > 0.6 ? 'SOX and Dodd-Frank compliance required' : 'Standard financial oversight sufficient'}
• **Healthcare**: ${Math.random() > 0.7 ? 'HIPAA and FDA regulations apply' : 'No healthcare-specific requirements'}
• **Technology**: ${Math.random() > 0.5 ? 'Data privacy and cybersecurity standards needed' : 'Standard tech compliance adequate'}
• **Energy**: ${Math.random() > 0.8 ? 'Environmental and safety regulations apply' : 'No energy sector requirements'}`;
  };

  const generatePrivacyCompliance = (docType: string, jurisdiction: string) => {
    return `• **GDPR Compliance**: ${jurisdiction === 'eu' ? 'Full GDPR compliance required' : 'GDPR may apply to EU data subjects'}
• **CCPA Requirements**: ${jurisdiction.includes('us-ca') ? 'California Consumer Privacy Act compliance mandatory' : 'CCPA compliance recommended'}
• **Data Processing**: ${Math.random() > 0.4 ? 'Data processing agreements need strengthening' : 'Adequate data processing provisions'}
• **Cross-Border Transfers**: ${Math.random() > 0.6 ? 'International data transfer mechanisms required' : 'Domestic data handling sufficient'}`;
  };

  const generateEmploymentCompliance = (jurisdiction: string) => {
    return `### Employment Law Compliance Analysis:

**Federal Employment Laws**:
• **Title VII**: Equal employment opportunity provisions adequate
• **ADA Compliance**: Disability accommodation procedures included
• **FLSA**: Fair Labor Standards Act wage and hour compliance
• **FMLA**: Family and Medical Leave Act provisions addressed

**State-Specific Requirements**:
• **${jurisdiction} Laws**: State employment law compliance verified
• **At-Will Employment**: At-will provisions properly structured
• **Non-Compete**: Non-compete enforceability varies by state
• **Wage Laws**: State wage and hour requirements met

**Workplace Policies**:
• **Anti-Harassment**: Comprehensive harassment prevention policies
• **Safety Standards**: OSHA compliance and workplace safety measures
• **Privacy Rights**: Employee privacy and monitoring policies
• **Termination Procedures**: Clear termination and severance procedures`;
  };

  const generateObligationAnalysis = (docType: string, text: string) => {
    return `### Party Obligations Assessment:

**Primary Obligations**:
• **Party A Responsibilities**: ${Math.floor(Math.random() * 8) + 5} distinct obligations identified
• **Party B Responsibilities**: ${Math.floor(Math.random() * 6) + 4} reciprocal obligations specified
• **Mutual Obligations**: ${Math.floor(Math.random() * 4) + 3} shared responsibilities defined
• **Performance Standards**: ${Math.random() > 0.5 ? 'Specific metrics and KPIs established' : 'Performance standards need clarification'}

**Timing & Deadlines**:
• **Critical Milestones**: ${Math.floor(Math.random() * 6) + 4} key deadlines identified
• **Notice Requirements**: ${Math.floor(Math.random() * 15) + 30} days notice periods specified
• **Delivery Schedules**: ${Math.random() > 0.6 ? 'Clear delivery timelines established' : 'Delivery schedules need refinement'}
• **Renewal Deadlines**: ${Math.random() > 0.5 ? 'Automatic renewal provisions included' : 'Manual renewal process required'}

**Contingent Obligations**:
• **Conditional Performance**: ${Math.floor(Math.random() * 3) + 2} conditional obligations identified
• **Trigger Events**: Events that modify or terminate obligations clearly defined
• **Escalation Procedures**: Progressive enforcement mechanisms established
• **Alternative Performance**: Substitute performance options available`;
  };

  const generatePerformanceMetrics = (docType: string) => {
    return `### Contract Performance Indicators:

**Measurable Outcomes**:
• **Delivery Metrics**: ${Math.floor(Math.random() * 95) + 95}% on-time delivery target
• **Quality Standards**: ${Math.floor(Math.random() * 10) + 98}% quality acceptance rate
• **Response Times**: ${Math.floor(Math.random() * 48) + 24} hour maximum response time
• **Customer Satisfaction**: ${Math.floor(Math.random() * 15) + 85}% minimum satisfaction score

**Financial Performance**:
• **Cost Management**: Budget variance within ±${Math.floor(Math.random() * 8) + 5}%
• **Revenue Targets**: ${Math.floor(Math.random() * 20) + 80}% of projected revenue achievement
• **Penalty Thresholds**: Performance below ${Math.floor(Math.random() * 10) + 80}% triggers penalties
• **Bonus Criteria**: Exceeding ${Math.floor(Math.random() * 10) + 105}% targets earns bonuses

**Compliance Metrics**:
• **Regulatory Adherence**: 100% compliance with applicable regulations
• **Safety Standards**: Zero tolerance for safety violations
• **Data Security**: ${Math.floor(Math.random() * 5) + 99}.${Math.floor(Math.random() * 9)}% uptime requirement
• **Audit Results**: Pass rate of ${Math.floor(Math.random() * 10) + 95}% for compliance audits`;
  };

  const generateNegotiationStrategy = (docType: string, riskAssessment: boolean) => {
    if (!riskAssessment) return '• Strategic analysis not available without risk assessment';
    
    return `### Negotiation Leverage Analysis:

**Your Advantages**:
• **Market Position**: ${Math.random() > 0.5 ? 'Strong market position provides leverage' : 'Competitive market reduces leverage'}
• **Unique Value**: ${Math.random() > 0.6 ? 'Unique capabilities create negotiating power' : 'Standard offerings limit premium positioning'}
• **Relationship Value**: ${Math.random() > 0.4 ? 'Long-term relationship potential adds value' : 'Transactional relationship limits leverage'}
• **Timing**: ${Math.random() > 0.5 ? 'Favorable timing enhances position' : 'Neutral timing considerations'}

**Counterparty Constraints**:
• **Urgency**: ${Math.random() > 0.6 ? 'Counterparty urgency creates opportunity' : 'No apparent time pressure'}
• **Alternatives**: ${Math.random() > 0.5 ? 'Limited alternatives strengthen your position' : 'Multiple alternatives weaken position'}
• **Budget Constraints**: ${Math.random() > 0.4 ? 'Budget limitations may affect terms' : 'Adequate budget for negotiations'}
• **Decision Process**: ${Math.random() > 0.3 ? 'Simple decision process enables quick closure' : 'Complex approval process may delay'}

**Strategic Recommendations**:
• **Priority Terms**: Focus on ${Math.floor(Math.random() * 3) + 2} most critical terms first
• **Concession Strategy**: Prepare ${Math.floor(Math.random() * 4) + 3} potential concessions
• **Walk-Away Terms**: Identify ${Math.floor(Math.random() * 2) + 1} non-negotiable requirements
• **Value Creation**: Explore ${Math.floor(Math.random() * 3) + 2} mutual value opportunities`;
  };

  const generateAlternativeProvisions = (docType: string, clauseAnalysis: boolean) => {
    if (!clauseAnalysis) return '• Alternative provisions not available without clause analysis';
    
    return `### Suggested Alternative Language:

**Liability Provisions**:
• **Current**: Standard unlimited liability
• **Alternative**: Mutual liability caps at contract value
• **Benefits**: Balanced risk allocation, more acceptable to both parties

**Termination Clauses**:
• **Current**: Unilateral termination rights
• **Alternative**: Reciprocal termination with cure periods
• **Benefits**: Fair termination process, relationship preservation

**Payment Terms**:
• **Current**: Net 60 payment terms
• **Alternative**: Net 30 with early payment discounts
• **Benefits**: Improved cash flow, cost savings opportunity

**Performance Standards**:
• **Current**: Vague performance requirements
• **Alternative**: Specific SLA metrics with measurement procedures
• **Benefits**: Clear expectations, objective performance evaluation`;
  };

  const generateImmediateActions = (docType: string, risk: boolean, compliance: boolean) => {
    const actions = [];
    
    if (risk) {
      actions.push('1. Address high-risk liability and indemnification clauses');
      actions.push('2. Clarify vague performance standards and acceptance criteria');
    }
    
    if (compliance) {
      actions.push(`${actions.length + 1}. Update data privacy and protection provisions`);
      actions.push(`${actions.length + 2}. Verify regulatory compliance requirements`);
    }
    
    actions.push(`${actions.length + 1}. Review and strengthen termination procedures`);
    actions.push(`${actions.length + 2}. Implement proper notice and communication protocols`);
    
    return actions.join('\n');
  };

  const generateShortTermActions = (docType: string, jurisdiction: string) => {
    return `1. Develop standardized clause library for future ${docType} agreements
2. Implement contract management system for tracking and monitoring
3. Establish regular compliance review schedule
4. Create amendment and modification procedures
5. Train relevant staff on contract administration requirements`;
  };

  const generateLongTermStrategy = (docType: string, jurisdiction: string) => {
    return `1. Develop comprehensive contract lifecycle management program
2. Implement AI-powered contract analysis and monitoring
3. Establish vendor/partner relationship management protocols
4. Create dispute prevention and early resolution procedures
5. Build regulatory change monitoring and adaptation processes`;
  };

  const generateProfessionalRecommendations = (docType: string, jurisdiction: string, risk: boolean) => {
    return `### Legal Professional Engagement:

**Immediate Consultation Needed**:
• **Contract Attorney**: ${risk ? 'High-risk provisions require specialized review' : 'Standard contract review recommended'}
• **Compliance Counsel**: ${Math.random() > 0.6 ? 'Regulatory compliance issues need expert attention' : 'Basic compliance review sufficient'}
• **Industry Specialist**: ${docType === 'intellectual' ? 'IP attorney consultation essential' : 'General counsel adequate'}

**Specialized Expertise**:
• **${docType.charAt(0).toUpperCase() + docType.slice(1)} Law**: Specialist in ${docType} agreements recommended
• **${jurisdiction.toUpperCase()} Law**: Local jurisdiction expertise required
• **Litigation Support**: ${Math.random() > 0.8 ? 'Litigation attorney consultation advisable' : 'Not currently necessary'}
• **Regulatory Affairs**: ${Math.random() > 0.7 ? 'Regulatory specialist needed' : 'Standard regulatory review sufficient'}

**Cost-Effective Approach**:
• **Initial Review**: $${Math.floor(Math.random() * 3000) + 1500} for comprehensive attorney review
• **Ongoing Support**: $${Math.floor(Math.random() * 500) + 200}/hour for modifications and questions
• **Annual Review**: $${Math.floor(Math.random() * 2000) + 1000} for annual contract health check
• **Template Development**: $${Math.floor(Math.random() * 5000) + 3000} for standardized agreement templates`;
  };

  return (
    <AIToolLayout
      title="AI Legal Assistant"
      description="Legal document analysis, compliance checking, and risk assessment"
      category="Specialized"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Document Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Document Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documentTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setDocumentType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  documentType === type.id
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

        {/* Jurisdiction */}
        <div>
          <label className="block text-sm font-medium mb-3">Jurisdiction</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {jurisdictions.map((juris) => (
              <div
                key={juris.id}
                onClick={() => setJurisdiction(juris.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  jurisdiction === juris.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{juris.label}</div>
                <div className="text-xs text-gray-600">{juris.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Analysis Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {analysisTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setAnalysisType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  analysisType === type.id
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

        {/* Document Text */}
        <div>
          <label className="block text-sm font-medium mb-3">Document Text</label>
          <textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Paste your legal document text here for analysis..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-40 resize-none"
          />
          <div className="mt-2 text-sm text-gray-500">
            {documentText.length} characters, {documentText.split(' ').filter(word => word).length} words
          </div>
        </div>

        {/* Specific Concerns */}
        <div>
          <label className="block text-sm font-medium mb-3">Specific Legal Concerns (optional)</label>
          <textarea
            value={specificConcerns}
            onChange={(e) => setSpecificConcerns(e.target.value)}
            placeholder="Describe any specific legal concerns or areas you'd like us to focus on..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Analysis Options */}
        <div>
          <label className="block text-sm font-medium mb-3">Analysis Options</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={riskAssessment}
                onChange={(e) => setRiskAssessment(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Comprehensive legal risk assessment</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={complianceCheck}
                onChange={(e) => setComplianceCheck(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Regulatory compliance verification</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={clauseAnalysis}
                onChange={(e) => setClauseAnalysis(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Detailed clause-by-clause analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={redlining}
                onChange={(e) => setRedlining(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Document review and redlining suggestions</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={precedentSearch}
                onChange={(e) => setPrecedentSearch(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Legal precedent and case law research</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 