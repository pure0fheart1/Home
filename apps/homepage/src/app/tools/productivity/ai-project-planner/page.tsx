'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIProjectPlanner() {
  const [projectType, setProjectType] = useState('software');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [teamSize, setTeamSize] = useState('5');
  const [timeline, setTimeline] = useState('3months');
  const [complexity, setComplexity] = useState('medium');
  const [methodology, setMethodology] = useState('agile');
  const [riskTolerance, setRiskTolerance] = useState('medium');
  const [deliverables, setDeliverables] = useState('');
  const [constraints, setConstraints] = useState('');
  const [stakeholders, setStakeholders] = useState('');
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [riskAnalysis, setRiskAnalysis] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const projectTypes = [
    { id: 'software', label: 'Software Development', description: 'Web, mobile, or desktop applications' },
    { id: 'marketing', label: 'Marketing Campaign', description: 'Digital or traditional marketing projects' },
    { id: 'construction', label: 'Construction', description: 'Building or infrastructure projects' },
    { id: 'research', label: 'Research & Development', description: 'Innovation and research projects' },
    { id: 'event', label: 'Event Planning', description: 'Conference, launch, or corporate events' },
    { id: 'manufacturing', label: 'Manufacturing', description: 'Product development and manufacturing' },
    { id: 'consulting', label: 'Consulting', description: 'Business consulting and advisory projects' },
    { id: 'education', label: 'Education/Training', description: 'Learning and development programs' }
  ];

  const teamSizes = [
    { id: '1-3', label: '1-3 people', description: 'Small team or individual' },
    { id: '4-7', label: '4-7 people', description: 'Medium team' },
    { id: '8-15', label: '8-15 people', description: 'Large team' },
    { id: '16+', label: '16+ people', description: 'Enterprise team' }
  ];

  const timelines = [
    { id: '2weeks', label: '2 weeks', description: 'Sprint or quick project' },
    { id: '1month', label: '1 month', description: 'Short-term project' },
    { id: '3months', label: '3 months', description: 'Standard project' },
    { id: '6months', label: '6 months', description: 'Medium-term project' },
    { id: '1year', label: '1 year', description: 'Long-term project' },
    { id: '2years', label: '2+ years', description: 'Multi-year initiative' }
  ];

  const complexities = [
    { id: 'simple', label: 'Simple', description: 'Straightforward with minimal dependencies' },
    { id: 'medium', label: 'Medium', description: 'Moderate complexity with some challenges' },
    { id: 'complex', label: 'Complex', description: 'High complexity with multiple dependencies' },
    { id: 'enterprise', label: 'Enterprise', description: 'Very complex with extensive requirements' }
  ];

  const methodologies = [
    { id: 'agile', label: 'Agile', description: 'Iterative development with sprints' },
    { id: 'waterfall', label: 'Waterfall', description: 'Sequential phases with gates' },
    { id: 'kanban', label: 'Kanban', description: 'Continuous flow with visual boards' },
    { id: 'scrum', label: 'Scrum', description: 'Structured agile with ceremonies' },
    { id: 'lean', label: 'Lean', description: 'Waste reduction and efficiency focus' },
    { id: 'hybrid', label: 'Hybrid', description: 'Combination of methodologies' }
  ];

  const riskTolerances = [
    { id: 'low', label: 'Low', description: 'Conservative approach with minimal risk' },
    { id: 'medium', label: 'Medium', description: 'Balanced risk management' },
    { id: 'high', label: 'High', description: 'Aggressive approach with calculated risks' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const selectedType = projectTypes.find(t => t.id === projectType);
    const selectedComplexity = complexities.find(c => c.id === complexity);
    const selectedMethodology = methodologies.find(m => m.id === methodology);
    const selectedRiskTolerance = riskTolerances.find(r => r.id === riskTolerance);
    const selectedTimeline = timelines.find(t => t.id === timeline);
    
    const mockResult = `# AI Project Planning Report

## Project Overview
**Project Name**: ${projectName || 'Untitled Project'}
**Type**: ${selectedType?.label} - ${selectedType?.description}
**Description**: ${projectDescription || 'Project description to be defined'}
**Budget**: ${budget ? `$${budget}` : 'Budget to be determined'}
**Team Size**: ${teamSize} members
**Timeline**: ${selectedTimeline?.label} (${selectedTimeline?.description})
**Complexity**: ${selectedComplexity?.label} - ${selectedComplexity?.description}
**Methodology**: ${selectedMethodology?.label} - ${selectedMethodology?.description}
**Risk Tolerance**: ${selectedRiskTolerance?.label} - ${selectedRiskTolerance?.description}

## Project Phases & Timeline

### Phase Breakdown:
${generatePhaseBreakdown(selectedType, selectedMethodology, selectedTimeline)}

### Milestone Schedule:
${generateMilestones(selectedType, selectedTimeline, selectedComplexity)}

### Critical Path Analysis:
${generateCriticalPath(selectedType, selectedComplexity)}

## Resource Allocation

### Team Structure:
${generateTeamStructure(selectedType, teamSize, selectedComplexity)}

### Skill Requirements:
${generateSkillRequirements(selectedType, selectedComplexity)}

### Resource Utilization:
${generateResourceUtilization(teamSize, selectedTimeline, budget)}

## Budget Planning

### Cost Breakdown:
${generateBudgetBreakdown(selectedType, teamSize, selectedTimeline, budget)}

### Budget Optimization:
${autoOptimize ? generateBudgetOptimization(selectedType, selectedComplexity) : '• Budget optimization disabled'}

### Contingency Planning:
${generateContingencyPlanning(selectedRiskTolerance, budget)}

## Risk Management

### Risk Assessment:
${riskAnalysis ? generateRiskAssessment(selectedType, selectedComplexity, selectedRiskTolerance) : '• Risk analysis disabled'}

### Risk Mitigation Strategies:
${generateRiskMitigation(selectedType, selectedComplexity)}

### Contingency Plans:
${generateContingencyPlans(selectedRiskTolerance, selectedType)}

## Deliverables & Success Metrics

### Project Deliverables:
${deliverables ? deliverables.split('\n').map(d => `• ${d.trim()}`).join('\n') : generateDefaultDeliverables(selectedType)}

### Success Criteria:
${generateSuccessCriteria(selectedType, selectedComplexity)}

### Quality Assurance:
${generateQualityAssurance(selectedType, selectedMethodology)}

## Stakeholder Management

### Stakeholder Analysis:
${stakeholders ? stakeholders.split('\n').map(s => `• ${s.trim()}`).join('\n') : generateDefaultStakeholders(selectedType)}

### Communication Plan:
${generateCommunicationPlan(selectedMethodology, selectedComplexity)}

### Reporting Structure:
${generateReportingStructure(selectedType, teamSize)}

## Project Constraints

### Identified Constraints:
${constraints ? constraints.split('\n').map(c => `• ${c.trim()}`).join('\n') : generateDefaultConstraints(selectedType)}

### Constraint Management:
${generateConstraintManagement(selectedType, selectedComplexity)}

### Assumptions:
${generateAssumptions(selectedType, selectedTimeline)}

## Implementation Strategy

### Methodology Implementation:
${generateMethodologyImplementation(selectedMethodology, selectedType)}

### Tools & Technologies:
${generateToolsAndTech(selectedType, selectedMethodology, teamSize)}

### Process Framework:
${generateProcessFramework(selectedMethodology, selectedComplexity)}

## Monitoring & Control

### Progress Tracking:
${generateProgressTracking(selectedMethodology, selectedComplexity)}

### Performance Metrics:
${generatePerformanceMetrics(selectedType, selectedMethodology)}

### Change Management:
${generateChangeManagement(selectedMethodology, selectedRiskTolerance)}

## AI-Powered Optimizations

### Schedule Optimization:
${autoOptimize ? generateScheduleOptimization(selectedType, selectedComplexity) : '• Schedule optimization disabled'}

### Resource Optimization:
${autoOptimize ? generateResourceOptimization(teamSize, selectedComplexity) : '• Resource optimization disabled'}

### Predictive Analytics:
${generatePredictiveAnalytics(selectedType, selectedComplexity, selectedRiskTolerance)}

## Project Execution Plan

### Sprint Planning:
${generateSprintPlanning(selectedMethodology, selectedTimeline)}

### Task Dependencies:
${generateTaskDependencies(selectedType, selectedComplexity)}

### Workflow Automation:
${generateWorkflowAutomation(selectedMethodology, selectedType)}

## Post-Project Activities

### Project Closure:
${generateProjectClosure(selectedType, selectedMethodology)}

### Lessons Learned:
${generateLessonsLearned(selectedType, selectedComplexity)}

### Knowledge Transfer:
${generateKnowledgeTransfer(selectedType, teamSize)}

## Success Probability Analysis

### Project Success Factors:
- **Timeline Feasibility**: ${getTimelineFeasibility(selectedTimeline, selectedComplexity)}%
- **Budget Adequacy**: ${getBudgetAdequacy(budget, selectedType, selectedComplexity)}%
- **Team Capability**: ${getTeamCapability(teamSize, selectedComplexity)}%
- **Risk Management**: ${getRiskManagement(selectedRiskTolerance, selectedComplexity)}%

### Overall Success Probability: ${calculateOverallSuccess(selectedComplexity, selectedRiskTolerance, selectedTimeline)}%

### Recommendation:
${generateRecommendation(selectedComplexity, selectedRiskTolerance, selectedTimeline)}

*Project plan generated on ${new Date().toLocaleDateString()} using AI Project Planner*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generatePhaseBreakdown = (type: any, methodology: any, timeline: any) => {
    const phases = {
      software: methodology?.id === 'agile' ? 
        `• **Phase 1**: Project Setup & Planning (Week 1-2)
• **Phase 2**: Development Sprint 1 (Week 3-6)
• **Phase 3**: Development Sprint 2 (Week 7-10)
• **Phase 4**: Testing & Quality Assurance (Week 11-12)
• **Phase 5**: Deployment & Launch (Week 13-14)` :
        `• **Phase 1**: Requirements & Analysis (20%)
• **Phase 2**: Design & Architecture (15%)
• **Phase 3**: Development & Implementation (45%)
• **Phase 4**: Testing & Quality Assurance (15%)
• **Phase 5**: Deployment & Maintenance (5%)`,
      marketing: `• **Phase 1**: Research & Strategy (25%)
• **Phase 2**: Creative Development (30%)
• **Phase 3**: Campaign Launch (20%)
• **Phase 4**: Monitoring & Optimization (15%)
• **Phase 5**: Analysis & Reporting (10%)`,
      construction: `• **Phase 1**: Planning & Permits (15%)
• **Phase 2**: Site Preparation (10%)
• **Phase 3**: Foundation & Structure (40%)
• **Phase 4**: Interior & Finishing (25%)
• **Phase 5**: Inspection & Handover (10%)`
    };
    
    return phases[type?.id as keyof typeof phases] || 'Standard project phases will be defined based on project type';
  };

  const generateMilestones = (type: any, timeline: any, complexity: any) => {
    const baseDate = new Date();
    const milestones = [];
    
    milestones.push(`• **Project Kickoff**: ${new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
    milestones.push(`• **Phase 1 Complete**: ${new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
    milestones.push(`• **Mid-project Review**: ${new Date(baseDate.getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
    milestones.push(`• **Final Delivery**: ${new Date(baseDate.getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
    
    return milestones.join('\n');
  };

  const generateCriticalPath = (type: any, complexity: any) => {
    return `• Requirements gathering and approval
• Core development/implementation phase
• Quality assurance and testing
• Stakeholder review and sign-off
• Final deployment and launch`;
  };

  const generateTeamStructure = (type: any, teamSize: string, complexity: any) => {
    const structures = {
      software: `• **Project Manager**: 1 person (planning, coordination)
• **Tech Lead**: 1 person (architecture, code review)
• **Developers**: ${Math.max(1, parseInt(teamSize) - 3)} people (implementation)
• **QA Engineer**: 1 person (testing, quality assurance)
• **DevOps**: 1 person (deployment, infrastructure)`,
      marketing: `• **Campaign Manager**: 1 person (strategy, oversight)
• **Creative Director**: 1 person (design, content)
• **Content Creator**: ${Math.max(1, parseInt(teamSize) - 3)} people (content production)
• **Data Analyst**: 1 person (metrics, optimization)
• **Social Media Manager**: 1 person (social channels)`
    };
    
    return structures[type?.id as keyof typeof structures] || 'Team structure will be defined based on project requirements';
  };

  const generateSkillRequirements = (type: any, complexity: any) => {
    const skills = {
      software: `• Programming languages (JavaScript, Python, Java)
• Framework expertise (React, Node.js, database systems)
• DevOps and deployment tools
• Testing and quality assurance
• Project management and agile methodologies`,
      marketing: `• Digital marketing strategy
• Content creation and copywriting
• Design and visual communication
• Data analysis and metrics
• Social media and campaign management`
    };
    
    return skills[type?.id as keyof typeof skills] || 'Skill requirements will be defined based on project type';
  };

  const generateResourceUtilization = (teamSize: string, timeline: any, budget: string) => {
    const teamNum = parseInt(teamSize);
    const budgetNum = budget ? parseInt(budget) : 100000;
    
    return `• **Team Utilization**: ${Math.min(95, 70 + teamNum * 2)}% average capacity
• **Budget Allocation**: ${Math.floor(budgetNum * 0.7)} (70%) for development, ${Math.floor(budgetNum * 0.3)} (30%) for overhead
• **Time Allocation**: ${timeline?.label} with ${Math.floor(Math.random() * 20) + 10}% buffer
• **Resource Efficiency**: ${Math.floor(Math.random() * 10) + 85}% projected efficiency`;
  };

  const generateBudgetBreakdown = (type: any, teamSize: string, timeline: any, budget: string) => {
    const budgetNum = budget ? parseInt(budget) : 100000;
    
    return `• **Personnel Costs**: $${Math.floor(budgetNum * 0.65)} (65%)
• **Technology & Tools**: $${Math.floor(budgetNum * 0.15)} (15%)
• **Infrastructure**: $${Math.floor(budgetNum * 0.10)} (10%)
• **Contingency**: $${Math.floor(budgetNum * 0.10)} (10%)
• **Total Budget**: $${budgetNum}`;
  };

  const generateBudgetOptimization = (type: any, complexity: any) => {
    return `• Identified 12% potential cost savings through resource optimization
• Recommended tools and automation to reduce manual effort
• Suggested phased approach to spread costs over time
• Identified opportunities for reusable components`;
  };

  const generateContingencyPlanning = (riskTolerance: any, budget: string) => {
    const budgetNum = budget ? parseInt(budget) : 100000;
    const contingency = riskTolerance?.id === 'low' ? 0.15 : riskTolerance?.id === 'medium' ? 0.10 : 0.05;
    
    return `• **Contingency Reserve**: $${Math.floor(budgetNum * contingency)} (${contingency * 100}%)
• **Risk Response Budget**: Additional 5% for risk mitigation
• **Change Request Buffer**: 3-5% for scope changes
• **Emergency Fund**: Separate allocation for critical issues`;
  };

  const generateRiskAssessment = (type: any, complexity: any, riskTolerance: any) => {
    return `• **Technical Risks**: ${complexity?.id === 'complex' ? 'High' : 'Medium'} - Complex implementation challenges
• **Schedule Risks**: ${complexity?.id === 'simple' ? 'Low' : 'Medium'} - Potential delays due to dependencies
• **Budget Risks**: ${riskTolerance?.id === 'low' ? 'Low' : 'Medium'} - Cost overrun possibilities
• **Resource Risks**: Medium - Team availability and skill gaps
• **External Risks**: Low - Third-party dependencies and market changes`;
  };

  const generateRiskMitigation = (type: any, complexity: any) => {
    return `• **Technical**: Proof of concept development, architecture reviews
• **Schedule**: Buffer time allocation, parallel task execution
• **Budget**: Regular cost monitoring, scope management
• **Resource**: Cross-training, backup resource identification
• **Communication**: Regular stakeholder updates, change control`;
  };

  const generateContingencyPlans = (riskTolerance: any, type: any) => {
    return `• **Plan A**: Standard execution with regular monitoring
• **Plan B**: Reduced scope delivery if timeline becomes critical
• **Plan C**: Additional resources deployment if budget allows
• **Plan D**: Phased delivery approach for complex scenarios`;
  };

  const generateDefaultDeliverables = (type: any) => {
    const deliverables = {
      software: `• Functional software application
• Technical documentation
• User manuals and guides
• Test results and quality reports
• Deployment and maintenance plan`,
      marketing: `• Marketing campaign materials
• Creative assets and content
• Campaign performance reports
• Analytics and insights
• Post-campaign recommendations`
    };
    
    return deliverables[type?.id as keyof typeof deliverables] || 'Project deliverables will be defined based on requirements';
  };

  const generateSuccessCriteria = (type: any, complexity: any) => {
    return `• **Quality**: Meet all specified requirements and standards
• **Timeline**: Deliver within planned schedule (±10%)
• **Budget**: Complete within approved budget (±5%)
• **Stakeholder Satisfaction**: Achieve 90%+ approval rating
• **Performance**: Meet all technical and functional benchmarks`;
  };

  const generateQualityAssurance = (type: any, methodology: any) => {
    return `• **Testing Strategy**: Comprehensive testing at each phase
• **Code Reviews**: ${methodology?.id === 'agile' ? 'Peer review for all code changes' : 'Formal review process'}
• **Quality Gates**: Defined criteria for phase completion
• **Continuous Integration**: Automated testing and deployment
• **Performance Monitoring**: Real-time quality metrics`;
  };

  const generateDefaultStakeholders = (type: any) => {
    const stakeholders = {
      software: `• Product Owner (requirements, priorities)
• Development Team (implementation)
• End Users (feedback, acceptance)
• IT Operations (deployment, maintenance)
• Business Stakeholders (approval, funding)`,
      marketing: `• Marketing Director (strategy, approval)
• Creative Team (content, design)
• Sales Team (lead generation, conversion)
• Customer Success (customer feedback)
• Executive Sponsor (budget, strategic alignment)`
    };
    
    return stakeholders[type?.id as keyof typeof stakeholders] || 'Stakeholders will be identified based on project scope';
  };

  const generateCommunicationPlan = (methodology: any, complexity: any) => {
    return `• **Daily**: ${methodology?.id === 'agile' ? 'Stand-up meetings' : 'Team check-ins'}
• **Weekly**: Progress reports to stakeholders
• **Bi-weekly**: Detailed status reviews with management
• **Monthly**: Executive summary and financial reports
• **Ad-hoc**: Issue escalation and critical updates`;
  };

  const generateReportingStructure = (type: any, teamSize: string) => {
    return `• **Team Level**: Daily progress updates
• **Project Level**: Weekly consolidated reports
• **Management Level**: Bi-weekly executive summaries
• **Stakeholder Level**: Monthly progress presentations
• **Governance Level**: Quarterly strategic reviews`;
  };

  const generateDefaultConstraints = (type: any) => {
    return `• **Budget**: Limited financial resources
• **Timeline**: Fixed delivery deadlines
• **Resources**: Limited team availability
• **Technology**: Existing system compatibility
• **Regulatory**: Compliance requirements`;
  };

  const generateConstraintManagement = (type: any, complexity: any) => {
    return `• **Scope Management**: Clear requirement definition and change control
• **Resource Optimization**: Efficient allocation and utilization
• **Risk Mitigation**: Proactive identification and management
• **Communication**: Regular stakeholder alignment
• **Quality Assurance**: Consistent quality standards`;
  };

  const generateAssumptions = (type: any, timeline: any) => {
    return `• **Team Availability**: Core team members available throughout project
• **Technology Stability**: Chosen technologies remain viable
• **Stakeholder Engagement**: Active participation from key stakeholders
• **External Dependencies**: Third-party services remain available
• **Business Environment**: No major organizational changes`;
  };

  const generateMethodologyImplementation = (methodology: any, type: any) => {
    const implementations = {
      agile: `• **Sprints**: 2-week development cycles
• **Ceremonies**: Daily standups, sprint planning, retrospectives
• **Roles**: Scrum Master, Product Owner, Development Team
• **Artifacts**: Product backlog, sprint backlog, burn-down charts`,
      waterfall: `• **Phases**: Sequential with formal gate reviews
• **Documentation**: Comprehensive requirements and design docs
• **Approval**: Formal sign-offs at each phase
• **Change Control**: Formal change request process`
    };
    
    return implementations[methodology?.id as keyof typeof implementations] || 'Methodology implementation will be customized';
  };

  const generateToolsAndTech = (type: any, methodology: any, teamSize: string) => {
    const tools = {
      software: `• **Development**: IDE, version control (Git), CI/CD pipelines
• **Project Management**: Jira, Trello, or Azure DevOps
• **Communication**: Slack, Microsoft Teams, Zoom
• **Testing**: Automated testing frameworks, bug tracking
• **Monitoring**: Application performance monitoring tools`,
      marketing: `• **Content Management**: CMS platforms, design tools
• **Analytics**: Google Analytics, social media insights
• **Automation**: Marketing automation platforms
• **Communication**: Slack, project management tools
• **Creative**: Adobe Creative Suite, Canva, video editing`
    };
    
    return tools[type?.id as keyof typeof tools] || 'Tools and technologies will be selected based on project needs';
  };

  const generateProcessFramework = (methodology: any, complexity: any) => {
    return `• **Planning**: Requirements gathering, estimation, resource allocation
• **Execution**: Development, testing, quality assurance
• **Monitoring**: Progress tracking, performance measurement
• **Control**: Change management, risk mitigation
• **Closure**: Delivery, documentation, lessons learned`;
  };

  const generateProgressTracking = (methodology: any, complexity: any) => {
    return `• **Metrics**: Velocity, burn-down, completion percentage
• **Reporting**: Automated dashboards, weekly reports
• **Reviews**: Sprint reviews, milestone assessments
• **Alerts**: Automated notifications for delays or issues
• **Adjustments**: Regular plan updates based on progress`;
  };

  const generatePerformanceMetrics = (type: any, methodology: any) => {
    return `• **Quality**: Defect density, test coverage, code quality
• **Schedule**: On-time delivery, milestone achievement
• **Budget**: Cost performance index, budget variance
• **Team**: Velocity, productivity, satisfaction
• **Business**: Value delivered, stakeholder satisfaction`;
  };

  const generateChangeManagement = (methodology: any, riskTolerance: any) => {
    return `• **Process**: Formal change request and approval workflow
• **Impact Analysis**: Assessment of scope, time, and cost implications
• **Approval Authority**: Defined decision-making hierarchy
• **Communication**: Stakeholder notification and updates
• **Documentation**: Change log and audit trail`;
  };

  const generateScheduleOptimization = (type: any, complexity: any) => {
    return `• **Parallel Tasks**: Identified 23% time savings through parallel execution
• **Critical Path**: Optimized dependencies to reduce bottlenecks
• **Resource Leveling**: Balanced workload across team members
• **Buffer Management**: Strategic buffer allocation for high-risk tasks`;
  };

  const generateResourceOptimization = (teamSize: string, complexity: any) => {
    return `• **Skill Matching**: Optimal assignment based on expertise
• **Workload Balancing**: Even distribution of tasks
• **Cross-Training**: Identified knowledge sharing opportunities
• **Efficiency Gains**: 15% improvement through automation`;
  };

  const generatePredictiveAnalytics = (type: any, complexity: any, riskTolerance: any) => {
    return `• **Success Probability**: ${Math.floor(Math.random() * 20) + 75}% based on similar projects
• **Risk Likelihood**: ${complexity?.id === 'complex' ? 'High' : 'Medium'} probability of scope changes
• **Budget Accuracy**: ±${Math.floor(Math.random() * 10) + 5}% predicted variance
• **Timeline Confidence**: ${Math.floor(Math.random() * 15) + 80}% likelihood of on-time delivery`;
  };

  const generateSprintPlanning = (methodology: any, timeline: any) => {
    if (methodology?.id === 'agile') {
      return `• **Sprint Duration**: 2-week cycles
• **Sprint Planning**: 4-hour sessions for planning
• **Daily Standups**: 15-minute daily check-ins
• **Sprint Reviews**: 2-hour demo sessions
• **Retrospectives**: 1-hour improvement sessions`;
    }
    
    return `• **Phase Planning**: Detailed planning for each phase
• **Work Breakdown**: Tasks and subtasks definition
• **Sequencing**: Logical order of activities
• **Duration Estimation**: Time estimates for all tasks
• **Resource Assignment**: Team member allocations`;
  };

  const generateTaskDependencies = (type: any, complexity: any) => {
    return `• **Predecessor Tasks**: Requirements must be complete before design
• **Successor Tasks**: Testing depends on development completion
• **Parallel Tasks**: Documentation can run parallel to development
• **External Dependencies**: Third-party integrations and approvals
• **Critical Path**: Key tasks that impact overall timeline`;
  };

  const generateWorkflowAutomation = (methodology: any, type: any) => {
    return `• **Build Automation**: Automated testing and deployment
• **Status Updates**: Automated progress reporting
• **Notification System**: Alerts for milestones and issues
• **Documentation**: Auto-generated project documentation
• **Quality Gates**: Automated quality checks and approvals`;
  };

  const generateProjectClosure = (type: any, methodology: any) => {
    return `• **Deliverable Handover**: Formal transfer to stakeholders
• **Documentation**: Complete project documentation
• **Sign-off**: Formal acceptance from all stakeholders
• **Resource Release**: Team members reassigned
• **Project Archive**: Complete project history preserved`;
  };

  const generateLessonsLearned = (type: any, complexity: any) => {
    return `• **Successes**: What worked well and should be repeated
• **Challenges**: Issues encountered and how they were resolved
• **Improvements**: Recommendations for future projects
• **Best Practices**: Processes and approaches to standardize
• **Knowledge Transfer**: Important insights for organization`;
  };

  const generateKnowledgeTransfer = (type: any, teamSize: string) => {
    return `• **Documentation**: Comprehensive technical and process documentation
• **Training**: Knowledge transfer sessions with relevant teams
• **Mentoring**: Experienced team members guide newcomers
• **Repositories**: Code, design, and process repositories
• **Support**: Transition support for operational teams`;
  };

  const getTimelineFeasibility = (timeline: any, complexity: any) => {
    const baseScore = 85;
    const complexityPenalty = complexity?.id === 'complex' ? 15 : complexity?.id === 'simple' ? 5 : 10;
    const timelineBonus = timeline?.id === '2weeks' ? -10 : timeline?.id === '1year' ? 10 : 0;
    
    return Math.max(60, baseScore - complexityPenalty + timelineBonus);
  };

  const getBudgetAdequacy = (budget: string, type: any, complexity: any) => {
    const baseScore = 80;
    const budgetBonus = budget && parseInt(budget) > 100000 ? 15 : 0;
    const complexityPenalty = complexity?.id === 'complex' ? 20 : 10;
    
    return Math.max(60, baseScore + budgetBonus - complexityPenalty);
  };

  const getTeamCapability = (teamSize: string, complexity: any) => {
    const baseScore = 85;
    const sizeBonus = parseInt(teamSize) > 7 ? 10 : parseInt(teamSize) < 3 ? -10 : 0;
    const complexityPenalty = complexity?.id === 'complex' ? 15 : 5;
    
    return Math.max(60, baseScore + sizeBonus - complexityPenalty);
  };

  const getRiskManagement = (riskTolerance: any, complexity: any) => {
    const baseScore = 80;
    const toleranceBonus = riskTolerance?.id === 'low' ? 15 : riskTolerance?.id === 'high' ? -10 : 0;
    const complexityPenalty = complexity?.id === 'complex' ? 15 : 5;
    
    return Math.max(60, baseScore + toleranceBonus - complexityPenalty);
  };

  const calculateOverallSuccess = (complexity: any, riskTolerance: any, timeline: any) => {
    const baseScore = 85;
    const complexityPenalty = complexity?.id === 'complex' ? 20 : complexity?.id === 'simple' ? 5 : 10;
    const riskPenalty = riskTolerance?.id === 'high' ? 10 : 0;
    const timelinePenalty = timeline?.id === '2weeks' ? 15 : 0;
    
    return Math.max(60, baseScore - complexityPenalty - riskPenalty - timelinePenalty);
  };

  const generateRecommendation = (complexity: any, riskTolerance: any, timeline: any) => {
    const score = calculateOverallSuccess(complexity, riskTolerance, timeline);
    
    if (score >= 85) {
      return 'Excellent project setup with high probability of success. Proceed with confidence.';
    } else if (score >= 75) {
      return 'Good project foundation. Consider minor adjustments to timeline or resources.';
    } else if (score >= 65) {
      return 'Moderate risk project. Recommend additional risk mitigation and resource planning.';
    } else {
      return 'High risk project. Consider scope reduction, timeline extension, or additional resources.';
    }
  };

  return (
    <AIToolLayout
      title="AI Project Planner"
      description="Comprehensive project planning and resource optimization powered by AI"
      category="Productivity"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Project Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Project Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setProjectType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  projectType === type.id
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

        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-3">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium mb-3">Project Description</label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe the project goals, objectives, and scope"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium mb-3">Budget ($)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter total project budget"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium mb-3">Team Size</label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            min="1"
            max="50"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-sm font-medium mb-3">Timeline</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timelines.map((timeline) => (
              <div
                key={timeline.id}
                onClick={() => setTimeline(timeline.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  timeline === timeline.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{timeline.label}</div>
                <div className="text-xs text-gray-600">{timeline.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div>
          <label className="block text-sm font-medium mb-3">Project Complexity</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {complexities.map((comp) => (
              <div
                key={comp.id}
                onClick={() => setComplexity(comp.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  complexity === comp.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{comp.label}</div>
                <div className="text-xs text-gray-600">{comp.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div>
          <label className="block text-sm font-medium mb-3">Project Methodology</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {methodologies.map((method) => (
              <div
                key={method.id}
                onClick={() => setMethodology(method.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  methodology === method.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{method.label}</div>
                <div className="text-xs text-gray-600">{method.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Tolerance */}
        <div>
          <label className="block text-sm font-medium mb-3">Risk Tolerance</label>
          <div className="grid grid-cols-3 gap-3">
            {riskTolerances.map((risk) => (
              <div
                key={risk.id}
                onClick={() => setRiskTolerance(risk.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  riskTolerance === risk.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{risk.label}</div>
                <div className="text-xs text-gray-600">{risk.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <label className="block text-sm font-medium mb-3">Key Deliverables</label>
          <textarea
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            placeholder="List key project deliverables (one per line)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Constraints */}
        <div>
          <label className="block text-sm font-medium mb-3">Project Constraints</label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="List any project constraints or limitations (one per line)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Stakeholders */}
        <div>
          <label className="block text-sm font-medium mb-3">Key Stakeholders</label>
          <textarea
            value={stakeholders}
            onChange={(e) => setStakeholders(e.target.value)}
            placeholder="List key stakeholders and their roles (one per line)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* AI Features */}
        <div>
          <label className="block text-sm font-medium mb-3">AI Features</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoOptimize}
                onChange={(e) => setAutoOptimize(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Enable AI-powered optimization</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={riskAnalysis}
                onChange={(e) => setRiskAnalysis(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Perform comprehensive risk analysis</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 