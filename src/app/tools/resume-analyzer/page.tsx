'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { analyzeDocument } from '@/lib/gemini';
import { Upload, FileText, Brain, AlertCircle, CheckCircle } from 'lucide-react';

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
    };
    reader.readAsText(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please upload a resume or paste text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const result = await analyzeDocument(text, 'resume');
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-serif font-bold">AI Resume Analyzer</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant, AI-powered feedback on your resume with personalized suggestions for improvement, 
            keyword optimization, and formatting recommendations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Resume
                </h2>
                
                {/* File Upload */}
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <FileText className="w-12 h-12 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Click to upload resume</p>
                      <p className="text-sm text-muted-foreground">
                        Supports .txt, .pdf, .doc, .docx files
                      </p>
                    </div>
                  </label>
                </div>

                {file && (
                  <div className="mt-4 p-3 bg-muted rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                )}

                {/* Text Input */}
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">
                    Or paste your resume text here:
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    className="w-full h-32 p-3 border border-border rounded-lg bg-background resize-none"
                  />
                </div>

                {/* Analyze Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isAnalyzing}
                  className="w-full mt-4"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                
                {analysis ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {analysis}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Upload your resume and click "Analyze" to get AI-powered feedback</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Comprehensive Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed feedback on content, structure, and formatting
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Powered by Google Gemini for intelligent, contextual feedback
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">
                Supports various file formats and direct text input
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}