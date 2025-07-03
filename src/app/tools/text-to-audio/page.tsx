'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Volume2, 
  Play, 
  Pause, 
  Square, 
  Download, 
  Settings, 
  Type,
  Sparkles
} from 'lucide-react';

interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: string;
}

export default function TextToAudioPage() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<VoiceSettings>({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: ''
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    React.useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        setAvailableVoices(voices);
        if (voices.length > 0 && !settings.voice) {
          const firstVoice = voices[0];
          if (firstVoice) {
            setSettings(prev => ({ ...prev, voice: firstVoice.name }));
          }
        }
      };

      loadVoices();
      if (synthRef.current) {
        synthRef.current.addEventListener('voiceschanged', loadVoices);
      }

      return () => {
        if (synthRef.current) {
          synthRef.current.removeEventListener('voiceschanged', loadVoices);
        }
      };
    }
    
    return undefined;
  }, [settings.voice]);

  const generateAudio = async () => {
    if (!text.trim() || !synthRef.current) return;

    setIsGenerating(true);
    
    try {
      // Enhanced text processing with AI (placeholder)
      let processedText = text;
      
      // In a real implementation, you could use Gemini AI to:
      // 1. Improve text readability
      // 2. Add proper punctuation
      // 3. Enhance pronunciation
      // 4. Add SSML tags
      
      const utterance = new SpeechSynthesisUtterance(processedText);
      utteranceRef.current = utterance;

      // Apply settings
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;
      
      const selectedVoice = availableVoices.find(voice => voice.name === settings.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Setup audio capture for download
      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();
      const mediaRecorder = new MediaRecorder(destination.stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        mediaRecorder.start();
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        mediaRecorder.stop();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsPlaying(false);
        setIsPaused(false);
      };

      synthRef.current.speak(utterance);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const pauseAudio = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeAudio = () => {
    if (synthRef.current && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const enhanceTextWithAI = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    try {
      // Placeholder for AI enhancement
      // In a real implementation, you would call your Gemini API here
      const enhancedText = `${text}. This text has been enhanced for better speech synthesis.`;
      setText(enhancedText);
    } catch (error) {
      console.error('Error enhancing text:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-serif font-bold text-gradient">
            Text to Audio
          </h1>
          <Sparkles className="h-6 w-6 text-primary-gold" />
        </div>
        <p className="text-muted-foreground">
          Convert text to natural-sounding speech with AI enhancements
        </p>
      </div>

      {/* Text Input */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">Enter Your Text</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={enhanceTextWithAI}
              disabled={isGenerating || !text.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-primary-gold/10 text-primary-gold rounded-lg hover:bg-primary-gold/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="h-4 w-4" />
              Enhance with AI
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text you want to convert to speech..."
          className="w-full h-40 p-4 bg-muted border border-border rounded-lg resize-none focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          maxLength={5000}
        />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{text.length}/5000 characters</span>
          <span>~{Math.ceil(text.split(' ').length / 200)} minute(s) to read</span>
        </div>
      </div>

      {/* Voice Settings */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-card border border-border rounded-xl p-6 space-y-6"
        >
          <h3 className="text-lg font-semibold mb-4">Voice Settings</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Voice</label>
                <select
                  value={settings.voice}
                  onChange={(e) => setSettings(prev => ({ ...prev, voice: e.target.value }))}
                  className="w-full p-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                >
                  {availableVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Speed: {settings.rate.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.rate}
                  onChange={(e) => setSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Pitch: {settings.pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.pitch}
                  onChange={(e) => setSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Volume: {Math.round(settings.volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => setSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-center gap-4">
          {!isPlaying && !isPaused ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateAudio}
              disabled={!text.trim() || isGenerating}
              className="flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-foreground" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Audio'}
            </motion.button>
          ) : (
            <div className="flex items-center gap-4">
              {isPaused ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resumeAudio}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Play className="h-5 w-5" />
                  Resume
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={pauseAudio}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <Pause className="h-5 w-5" />
                  Pause
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopAudio}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Square className="h-5 w-5" />
                Stop
              </motion.button>
            </div>
          )}
        </div>

        {/* Download */}
        {audioUrl && (
          <div className="mt-6 text-center">
            <a
              href={audioUrl}
              download="text-to-speech.wav"
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}