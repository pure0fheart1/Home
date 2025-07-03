'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, QrCode, BarChart3, Copy, Download, ExternalLink, Calendar, MousePointer } from 'lucide-react';
import QRCode from 'qrcode';

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  qrCode?: string;
  clickHistory: { timestamp: Date; referrer?: string }[];
}

export default function URLAnalyticsPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [isShortening, setIsShortening] = useState(false);
  const [selectedLink, setSelectedLink] = useState<ShortenedLink | null>(null);
  const [error, setError] = useState('');

  // Load links from localStorage on mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('url-analytics-links');
    if (savedLinks) {
      const parsed = JSON.parse(savedLinks);
      // Convert date strings back to Date objects
      const linksWithDates = parsed.map((link: any) => ({
        ...link,
        createdAt: new Date(link.createdAt),
        clickHistory: link.clickHistory.map((click: any) => ({
          ...click,
          timestamp: new Date(click.timestamp)
        }))
      }));
      setLinks(linksWithDates);
    }
  }, []);

  // Save links to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem('url-analytics-links', JSON.stringify(links));
  }, [links]);

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateQRCode = async (url: string) => {
    try {
      return await QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  };

  const handleShortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError('Please enter a URL to shorten');
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    // Check if custom code is already taken
    if (customCode && links.some(link => link.shortCode === customCode)) {
      setError('Custom code is already taken');
      return;
    }

    setIsShortening(true);
    setError('');

    try {
      const shortCode = customCode || generateShortCode();
      const shortUrl = `${window.location.origin}/s/${shortCode}`;
      const qrCode = await generateQRCode(shortUrl);

      const newLink: ShortenedLink = {
        id: Date.now().toString(),
        originalUrl,
        shortCode,
        shortUrl,
        clicks: 0,
        createdAt: new Date(),
        qrCode,
        clickHistory: []
      };

      setLinks(prev => [newLink, ...prev]);
      setOriginalUrl('');
      setCustomCode('');
    } catch (err) {
      setError('Failed to create short link. Please try again.');
      console.error(err);
    } finally {
      setIsShortening(false);
    }
  };

  const simulateClick = (linkId: string) => {
    setLinks(prev => prev.map(link => {
      if (link.id === linkId) {
        const updatedLink = {
          ...link,
          clicks: link.clicks + 1,
          clickHistory: [
            ...link.clickHistory,
            { timestamp: new Date(), referrer: 'Demo Click' }
          ]
        };
        return updatedLink;
      }
      return link;
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadQR = (link: ShortenedLink) => {
    if (!link.qrCode) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-${link.shortCode}.png`;
      downloadLink.href = canvas.toDataURL();
      downloadLink.click();
    };
    
    img.src = link.qrCode;
  };

  const deleteLink = (linkId: string) => {
    setLinks(prev => prev.filter(link => link.id !== linkId));
    if (selectedLink?.id === linkId) {
      setSelectedLink(null);
    }
  };

  const getTotalClicks = () => {
    return links.reduce((total, link) => total + link.clicks, 0);
  };

  const getTopPerformer = () => {
    if (links.length === 0) return null;
    return links.reduce((top, link) => link.clicks > (top?.clicks || 0) ? link : top, links[0]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-serif font-bold">URL Analytics Hub</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create short links, generate QR codes, and track analytics with detailed click monitoring 
            and performance insights.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Link className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{links.length}</p>
                  <p className="text-sm text-muted-foreground">Total Links</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{getTotalClicks()}</p>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {getTopPerformer()?.clicks || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Top Performer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* URL Shortener */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Link className="w-5 h-5" />
                  Create Short Link
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Original URL *
                    </label>
                    <input
                      type="url"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      placeholder="https://example.com/very-long-url"
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Custom Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                      placeholder="my-link"
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      maxLength={20}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Letters and numbers only. Leave empty for random code.
                    </p>
                  </div>

                  <Button
                    onClick={handleShortenUrl}
                    disabled={!originalUrl.trim() || isShortening}
                    className="w-full"
                    size="lg"
                  >
                    {isShortening ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Link className="w-4 h-4 mr-2" />
                        Create Short Link
                      </>
                    )}
                  </Button>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <span className="text-sm text-red-500">{error}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Analytics Panel */}
            <div className="space-y-6">
              {selectedLink ? (
                <div className="bg-card rounded-lg border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Link Analytics</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedLink(null)}
                    >
                      Close
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Short URL</p>
                      <p className="font-mono text-sm">{selectedLink.shortUrl}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Original URL</p>
                      <p className="text-sm break-all">{selectedLink.originalUrl}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Clicks</p>
                        <p className="text-2xl font-bold">{selectedLink.clicks}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="text-sm">{selectedLink.createdAt.toLocaleDateString()}</p>
                      </div>
                    </div>

                    {selectedLink.qrCode && (
                      <div className="text-center">
                        <img
                          src={selectedLink.qrCode}
                          alt="QR Code"
                          className="mx-auto mb-2"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadQR(selectedLink)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download QR
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-semibold mb-4">Select a Link</h2>
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Click on a link below to view detailed analytics</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Links List */}
          <div className="mt-8 bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Your Links</h2>
            
            {links.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Link className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No short links created yet. Create your first link above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-mono text-sm font-medium">{link.shortUrl}</p>
                          <span className="px-2 py-1 bg-muted rounded text-xs">
                            {link.clicks} clicks
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {link.originalUrl}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created {link.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(link.shortUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(link.originalUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLink(link)}
                        >
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => simulateClick(link.id)}
                          className="bg-green-500/10 hover:bg-green-500/20 text-green-600"
                        >
                          +1 Click
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteLink(link.id)}
                          className="text-red-500 hover:bg-red-500/10"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Link className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Smart Shortening</h3>
              <p className="text-sm text-muted-foreground">
                Custom codes or auto-generated short links
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">QR Code Generation</h3>
              <p className="text-sm text-muted-foreground">
                Automatic QR codes for easy mobile sharing
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Click Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Detailed tracking and performance metrics
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">History Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Complete history of all your shortened links
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}