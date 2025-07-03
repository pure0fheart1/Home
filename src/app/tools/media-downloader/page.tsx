'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Link as LinkIcon, 
  Play, 
  Image as ImageIcon, 
  Music, 
  Video,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface DownloadItem {
  id: string;
  url: string;
  title: string;
  thumbnail?: string;
  duration?: string;
  format: string;
  quality: string;
  size?: string;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  progress: number;
  downloadUrl?: string;
  error?: string;
}

export default function MediaDownloaderPage() {
  const [url, setUrl] = useState('');
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [selectedQuality, setSelectedQuality] = useState('720p');

  const supportedPlatforms = [
    { name: 'YouTube', domain: 'youtube.com', icon: Play },
    { name: 'Twitter', domain: 'twitter.com', icon: LinkIcon },
    { name: 'Instagram', domain: 'instagram.com', icon: ImageIcon },
    { name: 'TikTok', domain: 'tiktok.com', icon: Music },
    { name: 'Vimeo', domain: 'vimeo.com', icon: Video }
  ];

  const formats = [
    { value: 'mp4', label: 'MP4 (Video)', type: 'video' },
    { value: 'mp3', label: 'MP3 (Audio)', type: 'audio' },
    { value: 'webm', label: 'WebM (Video)', type: 'video' },
    { value: 'wav', label: 'WAV (Audio)', type: 'audio' }
  ];

  const qualities = [
    { value: '144p', label: '144p' },
    { value: '240p', label: '240p' },
    { value: '360p', label: '360p' },
    { value: '480p', label: '480p' },
    { value: '720p', label: '720p HD' },
    { value: '1080p', label: '1080p Full HD' },
    { value: '1440p', label: '1440p 2K' },
    { value: '2160p', label: '2160p 4K' }
  ];

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return supportedPlatforms.some(platform => 
        url.hostname.includes(platform.domain)
      );
    } catch {
      return false;
    }
  };

  const analyzeUrl = async () => {
    if (!url.trim() || !isValidUrl(url)) {
      alert('Please enter a valid URL from supported platforms');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate URL analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock media information
      const mockTitle = `Sample Video - ${new URL(url).hostname}`;
      const mockThumbnail = `https://via.placeholder.com/320x180/333/fff?text=${encodeURIComponent(new URL(url).hostname)}`;
      
      const downloadItem: DownloadItem = {
        id: Date.now().toString(),
        url,
        title: mockTitle,
        thumbnail: mockThumbnail,
        duration: '3:42',
        format: selectedFormat,
        quality: selectedQuality,
        size: '45.2 MB',
        status: 'pending',
        progress: 0
      };

      setDownloads(prev => [...prev, downloadItem]);
      setUrl('');
    } catch (error) {
      console.error('Error analyzing URL:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startDownload = async (id: string) => {
    setDownloads(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: 'downloading', progress: 0 }
        : item
    ));

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloads(prev => prev.map(item => {
        if (item.id === id && item.status === 'downloading') {
          const newProgress = Math.min(item.progress + Math.random() * 15, 100);
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return {
              ...item,
              status: 'completed',
              progress: 100,
              downloadUrl: `https://example.com/download/${id}.${item.format}`
            };
          }
          
          return { ...item, progress: newProgress };
        }
        return item;
      }));
    }, 500);
  };

  const removeDownload = (id: string) => {
    setDownloads(prev => prev.filter(item => item.id !== id));
  };

  const getStatusIcon = (status: DownloadItem['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'downloading':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-gradient">
          Media Downloader
        </h1>
        <p className="text-muted-foreground">
          Download videos and audio from popular social media platforms
        </p>
      </div>

      {/* Supported Platforms */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {supportedPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div key={platform.name} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Icon className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-medium text-sm">{platform.name}</div>
                  <div className="text-xs text-muted-foreground">{platform.domain}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download Form */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold">Download Media</h2>
        
        {/* URL Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Media URL</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your media URL here..."
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={analyzeUrl}
              disabled={!url.trim() || isAnalyzing}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Add'}
            </motion.button>
          </div>
        </div>

        {/* Format and Quality Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            >
              {formats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quality</label>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              disabled={selectedFormat === 'mp3' || selectedFormat === 'wav'}
            >
              {qualities.map((quality) => (
                <option key={quality.value} value={quality.value}>
                  {quality.label}
                </option>
              ))}
            </select>
            {(selectedFormat === 'mp3' || selectedFormat === 'wav') && (
              <p className="text-xs text-muted-foreground mt-1">
                Quality selection not available for audio formats
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Downloads List */}
      {downloads.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Downloads</h2>
            <div className="text-sm text-muted-foreground">
              {downloads.length} item{downloads.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {downloads.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    {item.thumbnail && (
                      <div className="w-24 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{item.format.toUpperCase()}</span>
                            {item.quality && <span>{item.quality}</span>}
                            {item.duration && <span>{item.duration}</span>}
                            {item.size && <span>{item.size}</span>}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <span className="text-sm capitalize">{item.status}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {item.status === 'downloading' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Downloading...</span>
                            <span>{Math.round(item.progress)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-accent h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {item.status === 'pending' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => startDownload(item.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </motion.button>
                        )}

                        {item.status === 'completed' && item.downloadUrl && (
                          <a
                            href={item.downloadUrl}
                            download
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            <Download className="h-4 w-4" />
                            Download File
                          </a>
                        )}

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Original
                        </a>

                        <button
                          onClick={() => removeDownload(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-muted/30 border border-border rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-medium">Important Notes</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• This is a demonstration of a media downloader interface</li>
              <li>• Actual downloading functionality requires backend integration</li>
              <li>• Always respect copyright and platform terms of service</li>
              <li>• Some platforms may block automated downloads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}