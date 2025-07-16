'use client';

import React from 'react';
import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="container-responsive py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Navigation Test Page
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          If you can see this page without errors, navigation is working correctly!
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/tools" 
            className="block p-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
          >
            ← Back to Tools Overview
          </Link>
          
          <Link 
            href="/" 
            className="block p-4 border border-border rounded-lg hover:border-accent transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Status Check</h2>
          <p className="text-sm text-muted-foreground">
            ✅ React components loading correctly<br/>
            ✅ CSS styles applied<br/>
            ✅ Navigation working<br/>
            ✅ No runtime errors
          </p>
        </div>
      </div>
    </div>
  );
} 