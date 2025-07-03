'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  Volume2,
  AudioLines
} from 'lucide-react';

interface AudioRecording {
  id: string;
  name: string;
  url: string;
  duration: number;
  size: number;
  date: Date;
}

export default function AudioRecorderPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<AudioRecording[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });

      // Setup audio analysis for visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const recording: AudioRecording = {
          id: Date.now().toString(),
          name: `Recording ${recordings.length + 1}`,
          url,
          duration: recordingTime,
          size: blob.size,
          date: new Date()
        };
        setRecordings(prev => [...prev, recording]);
        setRecordingTime(0);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);

      // Start timer and audio level monitoring
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average / 255);
        }
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-gradient">
          Audio Recorder
        </h1>
        <p className="text-muted-foreground">
          Record high-quality audio with real-time visualization and advanced controls
        </p>
      </div>

      {/* Recording Controls */}
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="text-center space-y-6">
          {/* Audio Level Visualization */}
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/40 rounded-full transition-all duration-300"
                style={{
                  transform: `scale(${0.5 + audioLevel * 0.5})`,
                  opacity: isRecording && !isPaused ? 0.8 : 0.2
                }}
              />
              <AudioLines className="h-12 w-12 text-accent z-10" />
            </div>
          </div>

          {/* Timer */}
          <div className="text-4xl font-mono font-bold text-foreground">
            {formatTime(recordingTime)}
          </div>

          {/* Controls */}
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
              <div className="flex items-center gap-4">
                {isPaused ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resumeRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Play className="h-5 w-5" />
                    Resume
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={pauseRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Pause className="h-5 w-5" />
                    Pause
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Square className="h-5 w-5" />
                  Stop
                </motion.button>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="text-sm text-muted-foreground">
            {isRecording && !isPaused && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                Recording in progress...
              </div>
            )}
            {isPaused && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                Recording paused
              </div>
            )}
            {!isRecording && (
              <div className="text-muted-foreground">
                Click "Start Recording" to begin
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recordings List */}
      {recordings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Recordings</h2>
          <div className="space-y-3">
            <AnimatePresence>
              {recordings.map((recording) => (
                <motion.div
                  key={recording.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Volume2 className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium">{recording.name}</h3>
                        <div className="text-sm text-muted-foreground space-x-4">
                          <span>{formatTime(recording.duration)}</span>
                          <span>{formatFileSize(recording.size)}</span>
                          <span>{recording.date.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <audio 
                        controls 
                        src={recording.url}
                        className="h-10"
                        onPlay={() => setCurrentlyPlaying(recording.id)}
                        onPause={() => setCurrentlyPlaying(null)}
                      />
                      <a
                        href={recording.url}
                        download={`${recording.name}.webm`}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                      <button
                        onClick={() => deleteRecording(recording.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
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