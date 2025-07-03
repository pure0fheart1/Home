'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Square, 
  FileAudio, 
  Download, 
  Copy, 
  Trash2, 
  Sparkles,
  Upload,
  Languages
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface Transcription {
  id: string;
  text: string;
  confidence: number;
  timestamp: Date;
  duration: number;
  language: string;
}

export default function VoiceTranscriberPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' }
  ];

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = selectedLanguage;

        recognitionRef.current.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result && result[0]) {
              const transcript = result[0].transcript;
              if (result.isFinal) {
                finalTranscript += transcript;
              } else {
                interimTranscript += transcript;
              }
            }
          }

          setCurrentTranscript(finalTranscript + interimTranscript);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedLanguage]);

  const startRecording = async () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      setIsRecording(true);
      setCurrentTranscript('');
      setRecordingTime(0);
      
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.start();

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      
      if (currentTranscript.trim()) {
        const transcription: Transcription = {
          id: Date.now().toString(),
          text: currentTranscript.trim(),
          confidence: 0.95, // Placeholder confidence score
          timestamp: new Date(),
          duration: recordingTime,
          language: selectedLanguage
        };
        setTranscriptions(prev => [...prev, transcription]);
      }

      setCurrentTranscript('');
      setRecordingTime(0);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsTranscribing(true);
    
    try {
      // Placeholder for audio file transcription
      // In a real implementation, you would:
      // 1. Upload the file to your server
      // 2. Use Gemini API or another service to transcribe
      // 3. Return the transcription results
      
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing
      
      const transcription: Transcription = {
        id: Date.now().toString(),
        text: `This is a placeholder transcription for the uploaded file: ${file.name}. In a real implementation, this would contain the actual transcribed text from your audio file using AI services.`,
        confidence: 0.88,
        timestamp: new Date(),
        duration: 120, // Placeholder duration
        language: selectedLanguage
      };
      
      setTranscriptions(prev => [...prev, transcription]);
    } catch (error) {
      console.error('Error transcribing file:', error);
    } finally {
      setIsTranscribing(false);
    }
  }, [selectedLanguage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg', '.webm']
    },
    multiple: false,
    disabled: isTranscribing
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteTranscription = (id: string) => {
    setTranscriptions(prev => prev.filter(t => t.id !== id));
  };

  const downloadTranscription = (transcription: Transcription) => {
    const element = document.createElement('a');
    const file = new Blob([transcription.text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `transcription_${transcription.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-serif font-bold text-gradient">
            Voice Transcriber
          </h1>
          <Sparkles className="h-6 w-6 text-primary-gold" />
        </div>
        <p className="text-muted-foreground">
          Transcribe voice to text in real-time using advanced AI
        </p>
      </div>

      {/* Language Selection */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <Languages className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold">Language Settings</h2>
        </div>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full md:w-auto p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          disabled={isRecording}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Recording Controls */}
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center relative overflow-hidden">
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/40 rounded-full transition-all duration-300 ${
                isRecording ? 'animate-pulse' : 'opacity-20'
              }`}
            />
            <Mic className="h-12 w-12 text-accent z-10" />
          </div>

          <div className="text-4xl font-mono font-bold text-foreground">
            {formatTime(recordingTime)}
          </div>

          <div className="flex items-center justify-center gap-4">
            {!isRecording ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startRecording}
                className="flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors font-medium text-lg"
              >
                <Mic className="h-6 w-6" />
                Start Recording
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopRecording}
                className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-lg"
              >
                <Square className="h-6 w-6" />
                Stop Recording
              </motion.button>
            )}
          </div>

          {/* Live Transcript */}
          {currentTranscript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-muted/50 rounded-lg"
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Live Transcript:</h3>
              <p className="text-foreground">{currentTranscript}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Upload className="h-5 w-5 text-accent" />
          Upload Audio File
        </h2>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragActive
              ? 'border-accent bg-accent/5'
              : 'border-border hover:border-accent/50'
          } ${isTranscribing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          {isTranscribing ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
              <p className="text-muted-foreground">Transcribing your audio...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <FileAudio className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-foreground font-medium">
                {isDragActive ? 'Drop your audio file here' : 'Drag & drop an audio file here'}
              </p>
              <p className="text-muted-foreground text-sm">
                Supports MP3, WAV, M4A, OGG, WebM
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Transcriptions List */}
      {transcriptions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Transcriptions</h2>
          <div className="space-y-4">
            <AnimatePresence>
              {transcriptions.map((transcription) => (
                <motion.div
                  key={transcription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <FileAudio className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground space-x-4">
                          <span>{transcription.timestamp.toLocaleString()}</span>
                          <span>{formatTime(transcription.duration)}</span>
                          <span>Confidence: {Math.round(transcription.confidence * 100)}%</span>
                          <span>{languages.find(l => l.code === transcription.language)?.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(transcription.text)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => downloadTranscription(transcription)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTranscription(transcription.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">{transcription.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}