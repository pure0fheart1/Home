'use client';

import React, { useState } from 'react';
import { ArrowLeft, Copy, Download, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AIToolLayoutProps {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  onGenerate?: () => Promise<void>;
  isGenerating?: boolean;
  result?: string;
  apiKey?: string;
}

export function AIToolLayout({
  title,
  description,
  category,
  children,
  onGenerate,
  isGenerating = false,
  result,
  apiKey = 'AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A',
}: AIToolLayoutProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-result.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          
          <div className="mb-6">
            <span className="text-sm text-accent font-medium px-3 py-1 bg-accent/10 rounded-full">
              {category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-black border border-border rounded-lg">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Configure Your AI Tool
              </h2>
              
              {children}
              
              {onGenerate && (
                <button
                  onClick={onGenerate}
                  disabled={isGenerating}
                  className="w-full mt-6 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-black border border-border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Result</h2>
                {result && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 text-muted-foreground hover:text-accent transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 text-muted-foreground hover:text-accent transition-colors"
                      title="Download result"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {result ? (
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                    {result}
                  </pre>
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-8 border border-border text-center">
                  <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Your AI-generated result will appear here
                  </p>
                </div>
              )}
              
              {copied && (
                <div className="mt-2 text-sm text-accent">
                  ✓ Copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Key Info */}
        <div className="mt-8 p-4 bg-muted/20 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>API Integration:</strong> This tool uses Google AI API (Key: {apiKey.substring(0, 8)}...) 
            for enhanced AI capabilities. All processing is done securely.
          </p>
        </div>
      </div>
    </div>
  );
} 