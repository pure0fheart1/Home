'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { analyzeDocument } from '@/lib/gemini';
import { Code, Shield, Zap, AlertTriangle, CheckCircle, Copy } from 'lucide-react';

const languageOptions = [
  'javascript', 'typescript', 'python', 'java', 'cpp', 'csharp', 'php', 'ruby', 'go', 'rust', 'html', 'css', 'sql'
];

export default function CodeReviewerPage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const codeWithLanguage = `Language: ${language}\n\n${code}`;
      const result = await analyzeDocument(codeWithLanguage, 'code');
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const sampleCode = {
    javascript: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].price) {
      total += items[i].price * items[i].quantity;
    }
  }
  return total;
}`,
    python: `def calculate_total(items):
    total = 0
    for item in items:
        if hasattr(item, 'price') and hasattr(item, 'quantity'):
            total += item.price * item.quantity
    return total`,
    typescript: `interface Item {
  price?: number;
  quantity: number;
}

function calculateTotal(items: Item[]): number {
  return items.reduce((total, item) => {
    return total + (item.price || 0) * item.quantity;
  }, 0);
}`
  };

  const loadSample = () => {
    const sample = sampleCode[language as keyof typeof sampleCode] || sampleCode.javascript;
    setCode(sample);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-serif font-bold">Smart Code Reviewer</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get intelligent code reviews with security analysis, performance suggestions, 
            and best practices recommendations powered by AI.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Code Input
                  </h2>
                  <Button variant="outline" size="sm" onClick={loadSample}>
                    Load Sample
                  </Button>
                </div>
                
                {/* Language Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Programming Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Code Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Your Code
                  </label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here for analysis..."
                    className="w-full h-64 p-3 border border-border rounded-lg bg-background font-mono text-sm resize-none"
                  />
                </div>

                {/* Analyze Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={!code.trim() || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing Code...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Analyze Code
                    </>
                  )}
                </Button>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Analysis Results</h2>
                  {analysis && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(analysis)}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  )}
                </div>
                
                {analysis ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 p-4 rounded-lg max-h-96 overflow-y-auto">
                      {analysis}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Paste your code and click "Analyze" to get AI-powered review</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-semibold mb-2">Security Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Identify potential security vulnerabilities and risks
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Performance Tips</h3>
              <p className="text-sm text-muted-foreground">
                Get suggestions for optimizing code performance
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Best Practices</h3>
              <p className="text-sm text-muted-foreground">
                Learn industry standards and coding conventions
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Multi-Language</h3>
              <p className="text-sm text-muted-foreground">
                Support for 13+ programming languages
              </p>
            </div>
          </div>

          {/* Code Quality Metrics */}
          <div className="mt-8 bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">What We Analyze</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Code Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Security Issues</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Best Practices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Error Handling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Refactoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}