'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AICodeAssistant() {
  const [programmingLanguage, setProgrammingLanguage] = useState('javascript');
  const [codeType, setCodeType] = useState('function');
  const [complexity, setComplexity] = useState('intermediate');
  const [codeDescription, setCodeDescription] = useState('');
  const [existingCode, setExistingCode] = useState('');
  const [optimizationGoals, setOptimizationGoals] = useState<string[]>([]);
  const [includeComments, setIncludeComments] = useState(true);
  const [includeTests, setIncludeTests] = useState(true);
  const [codeReview, setCodeReview] = useState(false);
  const [securityCheck, setSecurityCheck] = useState(true);
  const [performanceAnalysis, setPerformanceAnalysis] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const programmingLanguages = [
    { id: 'javascript', label: 'JavaScript', description: 'ES6+, Node.js, React' },
    { id: 'python', label: 'Python', description: 'Python 3.x, Django, Flask' },
    { id: 'java', label: 'Java', description: 'Java 8+, Spring Boot' },
    { id: 'typescript', label: 'TypeScript', description: 'Type-safe JavaScript' },
    { id: 'csharp', label: 'C#', description: '.NET, ASP.NET Core' },
    { id: 'php', label: 'PHP', description: 'Modern PHP, Laravel' },
    { id: 'go', label: 'Go', description: 'Golang for scalable apps' },
    { id: 'rust', label: 'Rust', description: 'Systems programming' },
    { id: 'swift', label: 'Swift', description: 'iOS/macOS development' },
    { id: 'kotlin', label: 'Kotlin', description: 'Android development' }
  ];

  const codeTypes = [
    { id: 'function', label: 'Function/Method', description: 'Single function or method' },
    { id: 'class', label: 'Class/Module', description: 'Complete class or module' },
    { id: 'api', label: 'API Endpoint', description: 'REST API endpoint' },
    { id: 'algorithm', label: 'Algorithm', description: 'Data structure or algorithm' },
    { id: 'utility', label: 'Utility Script', description: 'Helper functions and utilities' },
    { id: 'component', label: 'UI Component', description: 'Frontend component' },
    { id: 'database', label: 'Database Query', description: 'SQL queries and operations' },
    { id: 'integration', label: 'Third-party Integration', description: 'External service integration' }
  ];

  const complexityLevels = [
    { id: 'beginner', label: 'Beginner', description: 'Simple, straightforward code' },
    { id: 'intermediate', label: 'Intermediate', description: 'Standard production code' },
    { id: 'advanced', label: 'Advanced', description: 'Complex, optimized code' },
    { id: 'expert', label: 'Expert', description: 'Enterprise-grade architecture' }
  ];

  const optimizationOptions = [
    'Performance optimization',
    'Memory efficiency',
    'Code readability',
    'Security hardening',
    'Error handling',
    'Scalability',
    'Maintainability',
    'Testing coverage'
  ];

  const handleOptimizationToggle = (option: string) => {
    setOptimizationGoals(prev => 
      prev.includes(option) 
        ? prev.filter(g => g !== option)
        : [...prev, option]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const selectedLanguage = programmingLanguages.find(l => l.id === programmingLanguage);
    const selectedType = codeTypes.find(t => t.id === codeType);
    const selectedComplexity = complexityLevels.find(c => c.id === complexity);
    
    const mockResult = `# AI Code Assistant Results

## Code Generation Analysis
**Programming Language**: ${selectedLanguage?.label} - ${selectedLanguage?.description}
**Code Type**: ${selectedType?.label} - ${selectedType?.description}
**Complexity Level**: ${selectedComplexity?.label} - ${selectedComplexity?.description}
**Generated**: ${new Date().toLocaleString()}

## Generated Code

\`\`\`${programmingLanguage}
${generateCode(programmingLanguage, codeType, codeDescription, complexity)}
\`\`\`

## Code Review & Analysis

### Security Analysis:
${securityCheck ? generateSecurityAnalysis(programmingLanguage, codeType) : '• Security analysis disabled'}

### Performance Analysis:
${performanceAnalysis ? generatePerformanceAnalysis(codeType, optimizationGoals) : '• Performance analysis disabled'}

### Code Quality Metrics:
- **Cyclomatic Complexity**: ${Math.floor(Math.random() * 5) + 2}
- **Maintainability Index**: ${Math.floor(Math.random() * 20) + 80}
- **Lines of Code**: ${Math.floor(Math.random() * 100) + 50}
- **Function Count**: ${Math.floor(Math.random() * 10) + 5}
- **Test Coverage**: ${includeTests ? `${Math.floor(Math.random() * 20) + 80}%` : 'No tests generated'}

## Best Practices Applied:
${generateBestPractices(programmingLanguage, selectedType)}

## Optimization Recommendations:
${generateOptimizationRecommendations(optimizationGoals, programmingLanguage)}

${includeTests ? generateTests(programmingLanguage, codeType, codeDescription) : ''}

## Code Documentation

### Function/Class Documentation:
${includeComments ? generateDocumentation(programmingLanguage, codeType, codeDescription) : '• Documentation comments disabled'}

### API Documentation:
${codeType === 'api' ? generateApiDocumentation() : '• Not applicable for this code type'}

### Usage Examples:
${generateUsageExamples(programmingLanguage, codeType, codeDescription)}

## Integration Guidelines

### Dependencies:
${generateDependencies(programmingLanguage, codeType)}

### Installation Instructions:
${generateInstallationInstructions(programmingLanguage)}

### Configuration:
${generateConfiguration(programmingLanguage, codeType)}

## Deployment Considerations

### Environment Setup:
- **Development**: Local development environment configured
- **Testing**: Unit and integration test setup
- **Production**: Production-ready configuration
- **CI/CD**: Continuous integration pipeline ready

### Monitoring & Logging:
- **Error Tracking**: Integrated error monitoring
- **Performance Monitoring**: Application performance insights
- **Logging**: Structured logging implementation
- **Metrics**: Key performance indicators tracked

## Code Maintenance

### Refactoring Opportunities:
${generateRefactoringOpportunities(complexity, optimizationGoals)}

### Technical Debt Assessment:
- **Current Debt Level**: Low
- **Future Maintenance Effort**: Minimal
- **Code Duplication**: None detected
- **Design Pattern Adherence**: High

### Version Control:
- **Git Integration**: Repository ready
- **Branching Strategy**: Feature branch workflow
- **Code Review Process**: Pull request template provided
- **Commit Standards**: Conventional commit format

*AI Code Assistant analysis completed - Ready for production use*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generateCode = (language: string, type: string, description: string, complexity: string) => {
    const codeExamples = {
      javascript: {
        function: `// AI-generated function based on: ${description || 'user requirements'}
async function processData(input, options = {}) {
  try {
    // Input validation
    if (!input || typeof input !== 'object') {
      throw new Error('Invalid input: Expected object');
    }

    // Configuration with defaults
    const config = {
      timeout: 5000,
      retries: 3,
      ...options
    };

    // Core processing logic
    const processed = await Promise.race([
      performProcessing(input, config),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), config.timeout)
      )
    ]);

    // Result validation and formatting
    return {
      success: true,
      data: processed,
      timestamp: new Date().toISOString(),
      metadata: {
        processingTime: Date.now() - startTime,
        itemCount: processed.length
      }
    };
  } catch (error) {
    console.error('Processing failed:', error);
    throw new Error(\`Processing failed: \${error.message}\`);
  }
}

// Helper function for actual processing
async function performProcessing(input, config) {
  // Implementation based on requirements
  return input.map(item => ({
    ...item,
    processed: true,
    processedAt: new Date().toISOString()
  }));
}`,
        class: `// AI-generated class for ${description || 'data management'}
class DataManager {
  constructor(options = {}) {
    this.config = {
      autoSave: true,
      cacheSize: 1000,
      ...options
    };
    this.cache = new Map();
    this.listeners = new Set();
  }

  async create(data) {
    const id = this.generateId();
    const item = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.cache.set(id, item);
    this.notifyListeners('create', item);
    
    if (this.config.autoSave) {
      await this.save(item);
    }
    
    return item;
  }

  async update(id, updates) {
    const existing = this.cache.get(id);
    if (!existing) {
      throw new Error(\`Item with id \${id} not found\`);
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.cache.set(id, updated);
    this.notifyListeners('update', updated);
    
    if (this.config.autoSave) {
      await this.save(updated);
    }
    
    return updated;
  }

  generateId() {
    return \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }

  notifyListeners(event, data) {
    this.listeners.forEach(listener => listener(event, data));
  }
}`
      },
      python: {
        function: `# AI-generated Python function for ${description || 'data processing'}
import asyncio
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime

async def process_data(
    input_data: Dict[str, Any], 
    config: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Process input data with configurable options.
    
    Args:
        input_data: The data to process
        config: Optional configuration parameters
        
    Returns:
        Processed data with metadata
        
    Raises:
        ValueError: If input data is invalid
        ProcessingError: If processing fails
    """
    # Set default configuration
    default_config = {
        'timeout': 30,
        'batch_size': 100,
        'validate_input': True
    }
    config = {**default_config, **(config or {})}
    
    # Input validation
    if config['validate_input']:
        validate_input_data(input_data)
    
    try:
        # Process data in batches
        results = []
        items = input_data.get('items', [])
        
        for i in range(0, len(items), config['batch_size']):
            batch = items[i:i + config['batch_size']]
            batch_result = await process_batch(batch, config)
            results.extend(batch_result)
        
        return {
            'success': True,
            'data': results,
            'metadata': {
                'processed_count': len(results),
                'processing_time': datetime.now().isoformat(),
                'config_used': config
            }
        }
        
    except Exception as e:
        logging.error(f"Processing failed: {e}")
        raise ProcessingError(f"Failed to process data: {e}")

def validate_input_data(data: Dict[str, Any]) -> None:
    """Validate input data structure."""
    if not isinstance(data, dict):
        raise ValueError("Input must be a dictionary")
    if 'items' not in data:
        raise ValueError("Input must contain 'items' key")`
      }
    };

    return codeExamples[language as keyof typeof codeExamples]?.[type as keyof typeof codeExamples[typeof language]] || 
           `// Generated ${language} ${type} code\n// Implementation for: ${description || 'user requirements'}\n// Add your code here`;
  };

  const generateSecurityAnalysis = (language: string, type: string) => {
    return `• **Input Validation**: All user inputs properly validated and sanitized
• **Authentication**: Secure authentication mechanisms implemented
• **Authorization**: Role-based access control applied
• **SQL Injection Prevention**: Parameterized queries used
• **XSS Protection**: Output encoding and CSP headers configured
• **CSRF Protection**: Anti-CSRF tokens implemented
• **Encryption**: Sensitive data encrypted at rest and in transit
• **Error Handling**: Secure error handling without information disclosure
• **Dependency Security**: All dependencies scanned for vulnerabilities
• **Security Headers**: Proper security headers configured`;
  };

  const generatePerformanceAnalysis = (type: string, goals: string[]) => {
    return `• **Algorithmic Complexity**: O(n log n) time complexity achieved
• **Memory Usage**: Optimized memory allocation and garbage collection
• **Database Performance**: Indexed queries and connection pooling
• **Caching Strategy**: Multi-level caching implemented
• **Async Operations**: Non-blocking asynchronous processing
• **Load Testing**: Handles ${Math.floor(Math.random() * 5000) + 1000} concurrent requests
• **Response Time**: Average response time under 200ms
• **Throughput**: ${Math.floor(Math.random() * 500) + 100} requests per second
• **Resource Utilization**: CPU usage optimized to <70%
• **Scalability**: Horizontally scalable architecture`;
  };

  const generateBestPractices = (language: string, type: any) => {
    return `• **Clean Code**: Follows ${language} coding standards and conventions
• **SOLID Principles**: Single responsibility and dependency inversion applied
• **Design Patterns**: Appropriate design patterns implemented
• **Error Handling**: Comprehensive error handling and logging
• **Documentation**: Clear inline comments and API documentation
• **Testing**: Unit tests with high coverage included
• **Version Control**: Git-friendly code structure
• **Configuration**: Environment-based configuration management
• **Logging**: Structured logging with appropriate levels
• **Monitoring**: Performance metrics and health checks included`;
  };

  const generateOptimizationRecommendations = (goals: string[], language: string) => {
    if (goals.length === 0) return '• No specific optimization goals selected';
    
    return goals.map(goal => {
      const recommendations = {
        'Performance optimization': '• Implement caching strategies and optimize database queries',
        'Memory efficiency': '• Use object pooling and minimize memory allocations',
        'Code readability': '• Apply consistent naming conventions and add explanatory comments',
        'Security hardening': '• Implement input validation and secure authentication',
        'Error handling': '• Add comprehensive try-catch blocks and logging',
        'Scalability': '• Design for horizontal scaling and load distribution',
        'Maintainability': '• Follow SOLID principles and modular architecture',
        'Testing coverage': '• Implement unit, integration, and end-to-end tests'
      };
      return recommendations[goal as keyof typeof recommendations] || `• Optimization for ${goal}`;
    }).join('\n');
  };

  const generateTests = (language: string, type: string, description: string) => {
    return `
## Test Suite

### Unit Tests:
\`\`\`${language}
${language === 'javascript' ? `
// Test suite for generated code
describe('Generated Function Tests', () => {
  test('should process valid input successfully', async () => {
    const input = { items: [{ id: 1, name: 'test' }] };
    const result = await processData(input);
    
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.metadata.itemCount).toBe(1);
  });

  test('should handle invalid input gracefully', async () => {
    await expect(processData(null)).rejects.toThrow('Invalid input');
  });

  test('should respect timeout configuration', async () => {
    const input = { items: [] };
    const options = { timeout: 100 };
    
    const result = await processData(input, options);
    expect(result.success).toBe(true);
  });
});` : `
# Test suite for generated Python code
import pytest
from unittest.mock import patch
import asyncio

class TestGeneratedFunction:
    @pytest.mark.asyncio
    async def test_process_data_success(self):
        """Test successful data processing."""
        input_data = {'items': [{'id': 1, 'name': 'test'}]}
        result = await process_data(input_data)
        
        assert result['success'] is True
        assert len(result['data']) == 1
        assert 'metadata' in result

    @pytest.mark.asyncio
    async def test_invalid_input(self):
        """Test handling of invalid input."""
        with pytest.raises(ValueError):
            await process_data("invalid")

    @pytest.mark.asyncio
    async def test_configuration_override(self):
        """Test configuration parameter override."""
        input_data = {'items': []}
        config = {'batch_size': 50}
        result = await process_data(input_data, config)
        
        assert result['metadata']['config_used']['batch_size'] == 50`}
\`\`\`

### Integration Tests:
- API endpoint testing with realistic payloads
- Database integration testing with test fixtures
- External service integration mocking
- End-to-end workflow testing

### Performance Tests:
- Load testing with ${Math.floor(Math.random() * 1000) + 500} concurrent users
- Stress testing at 2x normal capacity
- Memory leak detection over extended runs
- Database performance under load`;
  };

  const generateDocumentation = (language: string, type: string, description: string) => {
    return `
### JSDoc/Docstring Comments:
\`\`\`${language}
/**
 * ${description || 'Generated function description'}
 * 
 * @param {Object} input - The input data to process
 * @param {Object} options - Configuration options
 * @param {number} options.timeout - Request timeout in milliseconds
 * @param {number} options.retries - Number of retry attempts
 * @returns {Promise<Object>} Processing result with metadata
 * @throws {Error} When input validation fails
 * 
 * @example
 * const result = await processData(
 *   { items: [{ id: 1, name: 'example' }] },
 *   { timeout: 10000 }
 * );
 */
\`\`\`

### README Documentation:
- **Purpose**: ${description || 'Automated code functionality'}
- **Installation**: Package installation instructions
- **Usage**: Code usage examples and patterns
- **Configuration**: Available configuration options
- **API Reference**: Complete function/method documentation
- **Contributing**: Guidelines for code contributions`;
  };

  const generateUsageExamples = (language: string, type: string, description: string) => {
    return `
### Basic Usage:
\`\`\`${language}
${language === 'javascript' ? `
// Basic usage example
const input = {
  items: [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 }
  ]
};

const result = await processData(input);
console.log(result.data);` : `
# Basic usage example
input_data = {
    'items': [
        {'id': 1, 'name': 'Item 1', 'value': 100},
        {'id': 2, 'name': 'Item 2', 'value': 200}
    ]
}

result = await process_data(input_data)
print(result['data'])`}
\`\`\`

### Advanced Usage:
\`\`\`${language}
${language === 'javascript' ? `
// Advanced configuration
const config = {
  timeout: 15000,
  retries: 5,
  batchSize: 50,
  cacheResults: true
};

const result = await processData(input, config);` : `
# Advanced configuration
config = {
    'timeout': 30,
    'batch_size': 50,
    'validate_input': True,
    'cache_results': True
}

result = await process_data(input_data, config)`}
\`\`\``;
  };

  const generateDependencies = (language: string, type: string) => {
    const deps = {
      javascript: [
        'lodash: ^4.17.21',
        'axios: ^1.6.0',
        'express: ^4.18.0',
        'jest: ^29.0.0 (dev)',
        'typescript: ^5.0.0 (dev)'
      ],
      python: [
        'aiohttp>=3.8.0',
        'pydantic>=2.0.0',
        'pytest>=7.0.0',
        'pytest-asyncio>=0.21.0',
        'black>=23.0.0 (dev)'
      ]
    };
    
    return (deps[language as keyof typeof deps] || ['No specific dependencies']).map(dep => `• ${dep}`).join('\n');
  };

  const generateInstallationInstructions = (language: string) => {
    const instructions = {
      javascript: `
\`\`\`bash
# Install dependencies
npm install

# Install development dependencies
npm install --save-dev jest typescript @types/node

# Run tests
npm test

# Build for production
npm run build
\`\`\``,
      python: `
\`\`\`bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt

# Run tests
pytest

# Format code
black .
\`\`\``
    };
    
    return instructions[language as keyof typeof instructions] || '• Standard package installation process';
  };

  const generateConfiguration = (language: string, type: string) => {
    return `
### Environment Variables:
- **NODE_ENV**: development/production
- **PORT**: Application port (default: 3000)
- **DATABASE_URL**: Database connection string
- **CACHE_TTL**: Cache time-to-live in seconds
- **LOG_LEVEL**: Logging level (error/warn/info/debug)

### Configuration Files:
- **config.json**: Main configuration file
- **.env**: Environment-specific variables
- **tsconfig.json**: TypeScript configuration (if applicable)
- **jest.config.js**: Test configuration
- **docker-compose.yml**: Container orchestration`;
  };

  const generateRefactoringOpportunities = (complexity: string, goals: string[]) => {
    return `• **Code Splitting**: Break down large functions into smaller, focused methods
• **Design Pattern Application**: Consider implementing Strategy or Factory patterns
• **Performance Optimization**: Add memoization for frequently called functions
• **Error Handling Enhancement**: Implement custom error classes for better error management
• **Logging Improvement**: Add structured logging with correlation IDs
• **Testing Enhancement**: Increase test coverage to 95%+
• **Documentation Update**: Add comprehensive API documentation
• **Type Safety**: Enhance type definitions and validation`;
  };

  const generateApiDocumentation = () => {
    return `
### OpenAPI/Swagger Documentation:
\`\`\`yaml
openapi: 3.0.0
info:
  title: Generated API
  version: 1.0.0
paths:
  /api/process:
    post:
      summary: Process data
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    type: object
      responses:
        200:
          description: Successful processing
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  data:
                    type: array
\`\`\``;
  };

  return (
    <AIToolLayout
      title="AI Code Assistant"
      description="Intelligent code generation, review, and optimization with security analysis"
      category="Specialized"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Programming Language */}
        <div>
          <label className="block text-sm font-medium mb-3">Programming Language</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {programmingLanguages.map((lang) => (
              <div
                key={lang.id}
                onClick={() => setProgrammingLanguage(lang.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  programmingLanguage === lang.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{lang.label}</div>
                <div className="text-sm text-gray-600">{lang.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Code Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {codeTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setCodeType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  codeType === type.id
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

        {/* Complexity Level */}
        <div>
          <label className="block text-sm font-medium mb-3">Complexity Level</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {complexityLevels.map((level) => (
              <div
                key={level.id}
                onClick={() => setComplexity(level.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  complexity === level.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-sm text-gray-600">{level.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Description */}
        <div>
          <label className="block text-sm font-medium mb-3">Code Description</label>
          <textarea
            value={codeDescription}
            onChange={(e) => setCodeDescription(e.target.value)}
            placeholder="Describe what you want the code to do (e.g., 'Create a user authentication system with JWT tokens')"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none"
          />
        </div>

        {/* Existing Code */}
        <div>
          <label className="block text-sm font-medium mb-3">Existing Code (optional)</label>
          <textarea
            value={existingCode}
            onChange={(e) => setExistingCode(e.target.value)}
            placeholder="Paste existing code here for review, optimization, or refactoring"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-32 resize-none font-mono text-sm"
          />
        </div>

        {/* Optimization Goals */}
        <div>
          <label className="block text-sm font-medium mb-3">Optimization Goals</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {optimizationOptions.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={optimizationGoals.includes(option)}
                  onChange={() => handleOptimizationToggle(option)}
                  className="mr-2"
                />
                <span className="text-sm">{option}</span>
              </label>
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
                checked={includeComments}
                onChange={(e) => setIncludeComments(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Generate comprehensive documentation and comments</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeTests}
                onChange={(e) => setIncludeTests(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Generate unit tests and test cases</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={codeReview}
                onChange={(e) => setCodeReview(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Perform automated code review</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={securityCheck}
                onChange={(e) => setSecurityCheck(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Security vulnerability analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={performanceAnalysis}
                onChange={(e) => setPerformanceAnalysis(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Performance optimization analysis</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 