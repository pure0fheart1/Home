'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AITaskManager() {
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignee, setAssignee] = useState('');
  const [smartScheduling, setSmartScheduling] = useState(true);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [workflowAutomation, setWorkflowAutomation] = useState(true);
  const [taskDependencies, setTaskDependencies] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [tags, setTags] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const priorities = [
    { id: 'urgent', label: 'Urgent', color: 'text-red-600', description: 'Immediate attention required' },
    { id: 'high', label: 'High', color: 'text-orange-600', description: 'Important, complete soon' },
    { id: 'medium', label: 'Medium', color: 'text-yellow-600', description: 'Normal priority' },
    { id: 'low', label: 'Low', color: 'text-green-600', description: 'When time permits' }
  ];

  const categories = [
    'Project Management',
    'Development',
    'Design',
    'Marketing',
    'Sales',
    'Operations',
    'HR',
    'Finance',
    'Customer Support',
    'Research',
    'Planning',
    'Review',
    'Meeting',
    'Training',
    'Other'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const priorityDetails = priorities.find(p => p.id === priority);
    const smartSchedulingContent = smartScheduling ? 
      `- **Optimal Start Time**: Tomorrow 9:00 AM (based on your productivity patterns)
- **Suggested Duration**: 2-3 hours in focused blocks
- **Break Intervals**: 15-minute breaks every 45 minutes
- **Best Days**: Tuesday and Thursday (historically your most productive days)
- **Avoid**: Friday afternoons (meetings typically scheduled)` 
      : '- Smart scheduling disabled';
    
    const priorityOptimizationContent = autoOptimize ? 
      `- **Current Priority**: ${priorityDetails?.label}
- **AI Suggestion**: ${priority === 'urgent' ? 'Consider breaking into smaller tasks' : 'Priority level appropriate'}
- **Impact Score**: 8.5/10 (high business impact)
- **Effort Score**: 6.2/10 (moderate complexity)
- **Urgency Score**: ${priority === 'urgent' ? '9.1/10' : priority === 'high' ? '7.3/10' : '5.0/10'}
- **Recommended Action**: ${priority === 'urgent' ? 'Start immediately' : 'Schedule within next 3 days'}`
      : '- Priority optimization disabled';
    
    const workflowAutomationContent = workflowAutomation ? 
      `- **Auto-assign**: Based on team capacity and expertise
- **Status Updates**: Automated progress tracking
- **Notifications**: Smart reminders 24h and 1h before deadline
- **Dependencies**: Automatically manage task dependencies
- **Recurring Tasks**: Set up automation for similar future tasks
- **Integration**: Sync with calendar, email, and project management tools`
      : '- Workflow automation disabled';
    
    const dependenciesContent = taskDependencies ? 
      `**Dependencies**: ${taskDependencies}
**Suggested Sub-tasks**:
1. Research and planning phase (30 minutes)
2. Initial setup and preparation (45 minutes)
3. Core execution (2 hours)
4. Review and refinement (30 minutes)
5. Final delivery and documentation (30 minutes)`
      : 'No dependencies specified';
    
    const tagsContent = tags ? 
      `**Tags**: ${tags}` 
      : `**Suggested Tags**: productivity, ${category?.toLowerCase() || 'general'}, ${priority}`;
    
    const mockResult = `# AI Task Management Plan

## Task Overview
**Task**: ${taskInput || 'Sample task description'}
**Priority**: ${priorityDetails?.label} (${priorityDetails?.description})
**Category**: ${category || 'General'}
**Deadline**: ${deadline || 'Not specified'}
**Assignee**: ${assignee || 'Unassigned'}
**Time Estimate**: ${timeEstimate || 'Not specified'}

## AI-Powered Optimizations

### Smart Scheduling Recommendations:
${smartSchedulingContent}

### Priority Optimization:
${priorityOptimizationContent}

### Workflow Automation:
${workflowAutomationContent}

## Task Breakdown & Dependencies
${dependenciesContent}

## Resource Allocation
- **Team Members**: ${assignee || 'To be assigned'}
- **Tools Required**: Based on category and complexity
- **Estimated Cost**: $${Math.floor(Math.random() * 500) + 100}
- **ROI Projection**: 285% (based on similar tasks)

## Tags & Classification
${tagsContent}

## Risk Assessment
- **Completion Risk**: Low (based on current workload)
- **Dependency Risk**: ${taskDependencies ? 'Medium' : 'Low'}
- **Resource Risk**: Low (team availability good)
- **Quality Risk**: Low (sufficient time allocated)

## Performance Metrics
- **Estimated Completion**: ${deadline || 'Within 5 business days'}
- **Success Probability**: 92%
- **Quality Score Prediction**: 8.7/10
- **Efficiency Rating**: High

## AI Insights & Recommendations
1. **Timing**: Best scheduled for ${smartScheduling ? 'Tuesday 9:00 AM' : 'as specified'}
2. **Approach**: Break into 4-5 focused work sessions
3. **Collaboration**: ${assignee ? `Assign to ${assignee}` : 'Consider team collaboration'}
4. **Tools**: Integrate with existing productivity stack
5. **Follow-up**: Schedule review meeting 1 day after completion

## Automation Rules Created:
- Auto-assign similar tasks to optimal team members
- Set up recurring deadlines for related work
- Create notification workflows for stakeholders
- Establish quality checkpoints at 25%, 50%, and 75% completion
- Configure automatic status updates to project dashboard

## Next Steps:
1. Confirm task assignment and timeline
2. Set up automated workflows and notifications
3. Schedule focused work blocks in calendar
4. Prepare necessary resources and tools
5. Begin execution with AI-optimized approach

*Task plan generated on ${new Date().toLocaleDateString()} using AI-powered task management system*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  return (
    <AIToolLayout
      title="AI Task Manager"
      description="Intelligent task organization and workflow optimization powered by AI"
      category="Productivity"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Task Input */}
        <div>
          <label className="block text-sm font-medium mb-3">Task Description</label>
          <textarea
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Describe your task in detail..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-3">Priority Level</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {priorities.map((prio) => (
              <div
                key={prio.id}
                onClick={() => setPriority(prio.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  priority === prio.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`font-medium ${prio.color}`}>{prio.label}</div>
                <div className="text-xs text-gray-600">{prio.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-3">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium mb-3">Deadline</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-sm font-medium mb-3">Assignee</label>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="Enter team member name or email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Time Estimate */}
        <div>
          <label className="block text-sm font-medium mb-3">Time Estimate</label>
          <input
            type="text"
            value={timeEstimate}
            onChange={(e) => setTimeEstimate(e.target.value)}
            placeholder="e.g., 2 hours, 3 days, 1 week"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Task Dependencies */}
        <div>
          <label className="block text-sm font-medium mb-3">Dependencies</label>
          <input
            type="text"
            value={taskDependencies}
            onChange={(e) => setTaskDependencies(e.target.value)}
            placeholder="List tasks that must be completed first"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-3">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Add tags separated by commas"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* AI Features */}
        <div>
          <label className="block text-sm font-medium mb-3">AI Features</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={smartScheduling}
                onChange={(e) => setSmartScheduling(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Smart Scheduling (AI-optimized timing)</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoOptimize}
                onChange={(e) => setAutoOptimize(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Auto-Priority Optimization</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={workflowAutomation}
                onChange={(e) => setWorkflowAutomation(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Workflow Automation</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 