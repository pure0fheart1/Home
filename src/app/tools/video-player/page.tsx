'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  Upload,
  SkipBack,
  SkipForward,
  RotateCcw,
  Subtitles,
  List
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface VideoFile {
  id: string;
  file: File;
  url: string;
  name: string;
  duration: number;
  size: number;
}

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

export default function VideoPlayerPage() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    
    try {
      const videoFiles: VideoFile[] = acceptedFiles.map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        duration: 0, // Will be set when video loads
        size: file.size
      }));

      setVideos(prev => [...prev, ...videoFiles]);
      
      if (!currentVideo && videoFiles.length > 0) {
        const firstVideo = videoFiles[0];
        if (firstVideo) {
          setCurrentVideo(firstVideo);
        }
      }
    } catch (error) {
      console.error('Error uploading videos:', error);
    } finally {
      setIsUploading(false);
    }
  }, [currentVideo]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv']
    },
    multiple: true,
    disabled: isUploading
  });

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      if (currentVideo) {
        setVideos(prev => prev.map(video => 
          video.id === currentVideo.id 
            ? { ...video, duration: videoRef.current!.duration }
            : video
        ));
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-gradient">
          Video Player
        </h1>
        <p className="text-muted-foreground">
          Advanced video player with subtitles, speed control, and more features
        </p>
      </div>

      {/* Upload Area */}
      {!currentVideo && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragActive
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
                <p className="text-muted-foreground">Uploading videos...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-foreground font-medium text-lg">
                    {isDragActive ? 'Drop your videos here' : 'Drag & drop videos here'}
                  </p>
                  <p className="text-muted-foreground">
                    or click to select files
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">
                  Supports MP4, WebM, MOV, AVI, MKV
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Player */}
      {currentVideo && (
        <div className="space-y-4">
          <div 
            ref={containerRef}
            className="relative bg-black rounded-xl overflow-hidden group"
            onMouseMove={showControlsTemporarily}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={currentVideo.url}
              className="w-full aspect-video object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
            />

            {/* Subtitles */}
            {showSubtitles && subtitles.length > 0 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded text-center">
                {subtitles
                  .filter(sub => currentTime >= sub.start && currentTime <= sub.end)
                  .map(sub => sub.text)
                  .join(' ')
                }
              </div>
            )}

            {/* Controls Overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                >
                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white ml-1" />
                      )}
                    </motion.button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    {/* Progress Bar */}
                    <div className="w-full">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
                        }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePlay}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>

                        <button
                          onClick={() => skip(-10)}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <SkipBack className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => skip(10)}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <SkipForward className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2 ml-2">
                          <button
                            onClick={toggleMute}
                            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                          >
                            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <div className="text-white text-sm ml-4">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowSubtitles(!showSubtitles)}
                          className={`p-2 rounded-lg transition-colors ${
                            showSubtitles ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          <Subtitles className="h-5 w-5" />
                        </button>

                        <div className="relative">
                          <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`p-2 rounded-lg transition-colors ${
                              showSettings ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/20 hover:text-white'
                            }`}
                          >
                            <Settings className="h-5 w-5" />
                          </button>

                          {showSettings && (
                            <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-3 min-w-[200px]">
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-white text-sm mb-1">Playback Speed</label>
                                  <div className="grid grid-cols-4 gap-1">
                                    {playbackRates.map(rate => (
                                      <button
                                        key={rate}
                                        onClick={() => changePlaybackRate(rate)}
                                        className={`px-2 py-1 text-xs rounded transition-colors ${
                                          playbackRate === rate
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                      >
                                        {rate}x
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={toggleFullscreen}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Maximize className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Video Info */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{currentVideo.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span>{formatFileSize(currentVideo.size)}</span>
                  <span>{formatTime(duration)}</span>
                  <span>{playbackRate}x speed</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {videos.length > 1 && (
                  <button
                    onClick={() => {/* Show playlist */}}
                    className="flex items-center gap-2 px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
                  >
                    <List className="h-4 w-4" />
                    Playlist ({videos.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video List */}
      {videos.length > 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Video Playlist</h2>
          <div className="grid gap-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`flex items-center gap-4 p-4 bg-card border rounded-lg cursor-pointer transition-all duration-200 ${
                  currentVideo?.id === video.id
                    ? 'ring-2 ring-accent border-accent/50'
                    : 'border-border hover:border-accent/30'
                }`}
                onClick={() => setCurrentVideo(video)}
              >
                <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{video.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {formatFileSize(video.size)}
                    {video.duration > 0 && ` • ${formatTime(video.duration)}`}
                  </div>
                </div>
                
                {currentVideo?.id === video.id && (
                  <div className="text-accent">
                    <Play className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload More */}
      {videos.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
              isDragActive
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              {isDragActive ? 'Drop more videos here' : 'Add more videos to playlist'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}