'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIAudioGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    audioType: 'background_music',
    genre: 'corporate',
    mood: 'uplifting',
    duration: '60',
    tempo: 'medium',
    instruments: 'mixed',
    key: 'C_major',
    structure: 'intro_verse_chorus',
    quality: 'high',
    format: 'mp3',
    includeVariations: false,
    loopable: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const audioGeneratorConfig = `// AI Audio Generator: ${formData.audioType}
// Generated with AI Audio Generator Builder

class AIAudioGenerator {
  constructor() {
    this.audioType = '${formData.audioType}';
    this.genre = '${formData.genre}';
    this.mood = '${formData.mood}';
    this.duration = ${formData.duration};
    this.tempo = '${formData.tempo}';
    this.instruments = '${formData.instruments}';
    this.key = '${formData.key}';
    this.structure = '${formData.structure}';
    this.quality = '${formData.quality}';
    this.format = '${formData.format}';
    this.includeVariations = ${formData.includeVariations};
    this.loopable = ${formData.loopable};
    this.audioSpecs = {};
    this.composition = {};
    this.initialize();
  }

  initialize() {
    console.log('Initializing AI Audio Generator');
    this.setupAudioSpecifications();
    this.analyzeMusicalRequirements();
    this.generateComposition();
    this.createAudioElements();
    this.assembleAudio();
  }

  setupAudioSpecifications() {
    const qualitySettings = {
      high: { bitrate: '320kbps', sampleRate: '48kHz', bits: 24 },
      medium: { bitrate: '192kbps', sampleRate: '44.1kHz', bits: 16 },
      low: { bitrate: '128kbps', sampleRate: '22kHz', bits: 16 },
      lossless: { bitrate: 'lossless', sampleRate: '96kHz', bits: 32 }
    };
    
    const formatSpecs = {
      mp3: { compression: 'lossy', compatibility: 'universal' },
      wav: { compression: 'lossless', compatibility: 'professional' },
      flac: { compression: 'lossless', compatibility: 'audiophile' },
      aac: { compression: 'lossy', compatibility: 'mobile_optimized' }
    };
    
    this.audioSpecs = {
      quality: qualitySettings[this.quality],
      format: formatSpecs[this.format],
      duration: this.duration,
      channels: 'stereo',
      normalize: true,
      fadeIn: 2,
      fadeOut: 3
    };
    
    console.log('Audio specifications:', this.audioSpecs);
  }

  analyzeMusicalRequirements() {
    const tempoMapping = {
      slow: { bpm: 60, description: 'Slow and contemplative' },
      medium: { bpm: 120, description: 'Moderate and steady' },
      fast: { bpm: 140, description: 'Energetic and dynamic' },
      very_fast: { bpm: 160, description: 'High energy and intense' }
    };
    
    const keySignatures = {
      'C_major': { mood: 'happy', tension: 'low', energy: 'medium' },
      'G_major': { mood: 'bright', tension: 'low', energy: 'high' },
      'D_minor': { mood: 'melancholic', tension: 'medium', energy: 'low' },
      'A_minor': { mood: 'sad', tension: 'medium', energy: 'medium' },
      'F_major': { mood: 'pastoral', tension: 'low', energy: 'low' },
      'B_flat_major': { mood: 'noble', tension: 'low', energy: 'medium' }
    };
    
    const genreCharacteristics = {
      corporate: {
        instruments: ['piano', 'strings', 'soft_synths'],
        rhythm_pattern: 'steady_4_4',
        harmony: 'consonant',
        dynamics: 'moderate'
      },
      cinematic: {
        instruments: ['orchestra', 'choir', 'epic_percussion'],
        rhythm_pattern: 'dramatic_builds',
        harmony: 'complex',
        dynamics: 'wide_range'
      },
      ambient: {
        instruments: ['pads', 'textures', 'field_recordings'],
        rhythm_pattern: 'minimal',
        harmony: 'atmospheric',
        dynamics: 'subtle'
      },
      electronic: {
        instruments: ['synthesizers', 'drum_machines', 'effects'],
        rhythm_pattern: 'electronic_beats',
        harmony: 'modern',
        dynamics: 'punchy'
      },
      acoustic: {
        instruments: ['guitar', 'piano', 'organic_percussion'],
        rhythm_pattern: 'natural_feel',
        harmony: 'traditional',
        dynamics: 'intimate'
      }
    };
    
    this.musicalRequirements = {
      tempo: tempoMapping[this.tempo],
      keySignature: keySignatures[this.key],
      genreSpecs: genreCharacteristics[this.genre],
      targetMood: this.mood,
      audioTypeSpecs: this.getAudioTypeSpecifications()
    };
    
    console.log('Musical requirements analyzed:', this.musicalRequirements);
  }

  getAudioTypeSpecifications() {
    const specifications = {
      background_music: {
        focus: 'non_intrusive',
        complexity: 'medium',
        variation: 'subtle',
        loop_friendly: true
      },
      soundtrack: {
        focus: 'emotional_impact',
        complexity: 'high',
        variation: 'dynamic',
        loop_friendly: false
      },
      podcast_intro: {
        focus: 'brand_identity',
        complexity: 'simple',
        variation: 'minimal',
        loop_friendly: true,
        duration_override: 15
      },
      jingle: {
        focus: 'memorability',
        complexity: 'simple',
        variation: 'catchy',
        loop_friendly: true,
        duration_override: 10
      },
      ambient_soundscape: {
        focus: 'atmosphere',
        complexity: 'textural',
        variation: 'evolving',
        loop_friendly: true
      },
      voice_narration: {
        focus: 'speech_clarity',
        complexity: 'minimal',
        variation: 'supportive',
        loop_friendly: false
      }
    };
    
    return specifications[this.audioType] || specifications.background_music;
  }

  generateComposition() {
    const structure = this.createMusicalStructure();
    const harmonyProgression = this.generateHarmonyProgression();
    const rhythmPattern = this.createRhythmPattern();
    const melodicElements = this.generateMelodicElements();
    
    this.composition = {
      structure: structure,
      harmony: harmonyProgression,
      rhythm: rhythmPattern,
      melody: melodicElements,
      instrumentation: this.selectInstrumentation(),
      arrangement: this.createArrangement()
    };
    
    console.log('Composition generated:', this.composition);
  }

  createMusicalStructure() {
    const structures = {
      intro_verse_chorus: {
        sections: [
          { name: 'intro', duration: 8, intensity: 0.3 },
          { name: 'verse', duration: 16, intensity: 0.6 },
          { name: 'chorus', duration: 16, intensity: 0.9 },
          { name: 'verse', duration: 16, intensity: 0.6 },
          { name: 'outro', duration: 8, intensity: 0.3 }
        ]
      },
      ambient_flow: {
        sections: [
          { name: 'emergence', duration: 20, intensity: 0.2 },
          { name: 'development', duration: 30, intensity: 0.7 },
          { name: 'climax', duration: 15, intensity: 0.9 },
          { name: 'resolution', duration: 15, intensity: 0.4 }
        ]
      },
      cinematic_arc: {
        sections: [
          { name: 'setup', duration: 15, intensity: 0.3 },
          { name: 'rising_action', duration: 25, intensity: 0.6 },
          { name: 'climax', duration: 20, intensity: 1.0 },
          { name: 'falling_action', duration: 15, intensity: 0.5 },
          { name: 'resolution', duration: 10, intensity: 0.2 }
        ]
      },
      simple_loop: {
        sections: [
          { name: 'main_section', duration: this.duration, intensity: 0.7 }
        ]
      }
    };
    
    return structures[this.structure] || structures.simple_loop;
  }

  generateHarmonyProgression() {
    const progressions = {
      'C_major': [
        { chord: 'C_major', function: 'tonic', stability: 'stable' },
        { chord: 'A_minor', function: 'relative_minor', stability: 'moderate' },
        { chord: 'F_major', function: 'subdominant', stability: 'stable' },
        { chord: 'G_major', function: 'dominant', stability: 'tension' }
      ],
      'G_major': [
        { chord: 'G_major', function: 'tonic', stability: 'stable' },
        { chord: 'E_minor', function: 'relative_minor', stability: 'moderate' },
        { chord: 'C_major', function: 'subdominant', stability: 'stable' },
        { chord: 'D_major', function: 'dominant', stability: 'tension' }
      ],
      'A_minor': [
        { chord: 'A_minor', function: 'tonic', stability: 'stable' },
        { chord: 'F_major', function: 'relative_major', stability: 'bright' },
        { chord: 'C_major', function: 'mediant', stability: 'stable' },
        { chord: 'G_major', function: 'dominant', stability: 'tension' }
      ]
    };
    
    return progressions[this.key] || progressions['C_major'];
  }

  createRhythmPattern() {
    const patterns = {
      steady_4_4: {
        time_signature: '4/4',
        kick_pattern: [1, 3],
        snare_pattern: [2, 4],
        hi_hat_pattern: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5],
        complexity: 'simple'
      },
      electronic_beats: {
        time_signature: '4/4',
        kick_pattern: [1, 2.5, 4],
        snare_pattern: [2, 4],
        hi_hat_pattern: [1.25, 1.75, 2.25, 2.75, 3.25, 3.75, 4.25, 4.75],
        complexity: 'medium'
      },
      natural_feel: {
        time_signature: '4/4',
        kick_pattern: [1, 3.2],
        snare_pattern: [2.1, 4.1],
        hi_hat_pattern: 'swing_feel',
        complexity: 'organic'
      },
      minimal: {
        time_signature: 'free',
        kick_pattern: 'sparse',
        snare_pattern: 'atmospheric',
        hi_hat_pattern: 'textural',
        complexity: 'minimal'
      }
    };
    
    const genrePattern = this.musicalRequirements.genreSpecs.rhythm_pattern;
    return patterns[genrePattern] || patterns.steady_4_4;
  }

  generateMelodicElements() {
    return {
      main_melody: {
        range: this.calculateMelodyRange(),
        contour: this.generateMelodyContour(),
        rhythm: this.generateMelodyRhythm(),
        ornaments: this.selectOrnaments()
      },
      counter_melodies: this.generateCounterMelodies(),
      bass_line: this.createBassLine(),
      harmonic_fills: this.generateHarmonicFills()
    };
  }

  calculateMelodyRange() {
    const ranges = {
      low: { min: 'C3', max: 'C4' },
      medium: { min: 'C4', max: 'C5' },
      high: { min: 'C5', max: 'C6' },
      wide: { min: 'C3', max: 'C6' }
    };
    
    const audioTypeRanges = {
      background_music: 'medium',
      soundtrack: 'wide',
      podcast_intro: 'medium',
      jingle: 'high',
      ambient_soundscape: 'low',
      voice_narration: 'low'
    };
    
    const rangeType = audioTypeRanges[this.audioType] || 'medium';
    return ranges[rangeType];
  }

  generateMelodyContour() {
    const contours = {
      ascending: 'gradually_rising',
      descending: 'gradually_falling',
      arch: 'rise_then_fall',
      valley: 'fall_then_rise',
      wave: 'undulating',
      static: 'mostly_stable'
    };
    
    const moodContours = {
      uplifting: 'ascending',
      calming: 'descending',
      inspiring: 'arch',
      mysterious: 'wave',
      corporate: 'static',
      energetic: 'wave'
    };
    
    const contourType = moodContours[this.mood] || 'static';
    return contours[contourType];
  }

  generateMelodyRhythm() {
    return {
      note_values: ['quarter', 'eighth', 'half'],
      syncopation: this.genre === 'electronic' ? 'moderate' : 'minimal',
      rests: 'strategically_placed',
      articulation: 'legato'
    };
  }

  selectOrnaments() {
    const ornamentsByGenre = {
      corporate: ['none'],
      cinematic: ['crescendos', 'trills', 'grace_notes'],
      ambient: ['pitch_bends', 'reverb_tails'],
      electronic: ['filter_sweeps', 'pitch_shifts'],
      acoustic: ['vibrato', 'slides']
    };
    
    return ornamentsByGenre[this.genre] || ['none'];
  }

  generateCounterMelodies() {
    return [
      {
        instrument: 'secondary_lead',
        relationship: 'complementary',
        activity_level: 'moderate'
      },
      {
        instrument: 'harmonic_support',
        relationship: 'supportive',
        activity_level: 'minimal'
      }
    ];
  }

  createBassLine() {
    return {
      pattern: 'root_fifth',
      rhythm: 'steady_quarters',
      register: 'low',
      articulation: 'staccato'
    };
  }

  generateHarmonicFills() {
    return {
      chord_voicings: 'open_triads',
      inversions: 'first_position',
      extensions: this.genre === 'cinematic' ? 'sevenths_ninths' : 'basic_triads',
      rhythm: 'sustained'
    };
  }

  selectInstrumentation() {
    const instrumentSets = {
      mixed: ['piano', 'strings', 'soft_synth', 'light_percussion'],
      orchestral: ['strings', 'woodwinds', 'brass', 'timpani', 'harp'],
      electronic: ['lead_synth', 'pad_synth', 'bass_synth', 'drum_machine'],
      acoustic: ['acoustic_guitar', 'piano', 'acoustic_bass', 'light_drums'],
      minimal: ['piano', 'strings', 'subtle_pad'],
      epic: ['full_orchestra', 'choir', 'epic_drums', 'brass_section']
    };
    
    const baseInstruments = instrumentSets[this.instruments] || instrumentSets.mixed;
    
    return {
      lead_instruments: baseInstruments.slice(0, 2),
      harmony_instruments: baseInstruments.slice(2, 4),
      rhythm_instruments: baseInstruments.slice(-2),
      effects_instruments: this.selectEffectsInstruments()
    };
  }

  selectEffectsInstruments() {
    const effectsByMood = {
      uplifting: ['bell_tones', 'chimes'],
      calming: ['ambient_pads', 'nature_sounds'],
      inspiring: ['choir_ah', 'string_swells'],
      mysterious: ['reversed_reverbs', 'filtered_textures'],
      corporate: ['subtle_percussion'],
      energetic: ['rhythmic_elements', 'synth_arps']
    };
    
    return effectsByMood[this.mood] || [];
  }

  createArrangement() {
    const arrangement = {
      intro: this.arrangeSection('intro'),
      development: this.arrangeSection('development'),
      climax: this.arrangeSection('climax'),
      outro: this.arrangeSection('outro')
    };
    
    return arrangement;
  }

  arrangeSection(sectionType) {
    const arrangements = {
      intro: {
        instrumentation: 'sparse',
        dynamics: 'soft',
        complexity: 'simple',
        focus: 'establishing_mood'
      },
      development: {
        instrumentation: 'building',
        dynamics: 'moderate',
        complexity: 'medium',
        focus: 'melodic_development'
      },
      climax: {
        instrumentation: 'full',
        dynamics: 'forte',
        complexity: 'high',
        focus: 'emotional_peak'
      },
      outro: {
        instrumentation: 'reducing',
        dynamics: 'diminishing',
        complexity: 'simple',
        focus: 'resolution'
      }
    };
    
    return arrangements[sectionType] || arrangements.development;
  }

  createAudioElements() {
    this.audioElements = {
      tracks: this.generateTracks(),
      effects: this.selectAudioEffects(),
      mixing: this.createMixingConfiguration(),
      mastering: this.setupMasteringChain()
    };
    
    console.log('Audio elements created');
  }

  generateTracks() {
    const instrumentation = this.composition.instrumentation;
    const tracks = [];
    
    // Lead tracks
    instrumentation.lead_instruments.forEach((instrument, index) => {
      tracks.push({
        id: \`lead_\${index + 1}\`,
        instrument: instrument,
        role: 'melodic_lead',
        pan: index === 0 ? 'center' : (index % 2 === 0 ? 'left' : 'right'),
        volume: 0.8,
        priority: 'high'
      });
    });
    
    // Harmony tracks
    instrumentation.harmony_instruments.forEach((instrument, index) => {
      tracks.push({
        id: \`harmony_\${index + 1}\`,
        instrument: instrument,
        role: 'harmonic_support',
        pan: index % 2 === 0 ? 'left' : 'right',
        volume: 0.6,
        priority: 'medium'
      });
    });
    
    // Rhythm tracks
    instrumentation.rhythm_instruments.forEach((instrument, index) => {
      tracks.push({
        id: \`rhythm_\${index + 1}\`,
        instrument: instrument,
        role: 'rhythmic_foundation',
        pan: 'center',
        volume: 0.7,
        priority: 'high'
      });
    });
    
    return tracks;
  }

  selectAudioEffects() {
    return {
      reverb: {
        type: 'hall',
        size: 'medium',
        decay: '2.5s',
        predelay: '20ms'
      },
      delay: {
        type: 'stereo',
        time: '1/8_note',
        feedback: '25%',
        mix: '15%'
      },
      eq: {
        low_cut: '80Hz',
        low_shelf: '+2dB @ 200Hz',
        mid_bell: '+1dB @ 1kHz',
        high_shelf: '+1dB @ 8kHz'
      },
      compression: {
        ratio: '3:1',
        attack: '10ms',
        release: '100ms',
        threshold: '-12dB'
      }
    };
  }

  createMixingConfiguration() {
    return {
      balance: {
        lead_volume: 0.8,
        harmony_volume: 0.6,
        rhythm_volume: 0.7,
        effects_volume: 0.4
      },
      panning: {
        lead: 'center',
        harmony: 'wide_stereo',
        rhythm: 'center',
        effects: 'ambient_space'
      },
      frequency_separation: {
        bass: '20Hz-200Hz',
        midrange: '200Hz-2kHz',
        treble: '2kHz-20kHz'
      },
      dynamics: {
        attack_time: 'fast',
        release_time: 'medium',
        overall_compression: 'gentle'
      }
    };
  }

  setupMasteringChain() {
    return {
      eq: 'subtle_enhancement',
      multiband_compression: 'transparent',
      stereo_imaging: 'natural_width',
      limiting: 'peak_protection',
      loudness: this.calculateTargetLoudness(),
      dithering: this.audioSpecs.quality.bits < 24
    };
  }

  calculateTargetLoudness() {
    const targetsByUse = {
      background_music: '-16 LUFS',
      soundtrack: '-14 LUFS',
      podcast_intro: '-16 LUFS',
      jingle: '-12 LUFS',
      ambient_soundscape: '-18 LUFS',
      voice_narration: '-20 LUFS'
    };
    
    return targetsByUse[this.audioType] || '-16 LUFS';
  }

  assembleAudio() {
    const audioAssembly = {
      timeline: this.createAudioTimeline(),
      rendering: this.setupRenderingConfiguration(),
      variations: this.includeVariations ? this.generateVariations() : null,
      looping: this.loopable ? this.setupLoopConfiguration() : null
    };
    
    console.log('Audio assembly configuration created');
    return audioAssembly;
  }

  createAudioTimeline() {
    const timeline = [];
    let currentTime = 0;
    
    this.composition.structure.sections.forEach(section => {
      timeline.push({
        section: section.name,
        startTime: currentTime,
        duration: section.duration,
        intensity: section.intensity,
        arrangement: this.createArrangement()[section.name] || this.createArrangement().development
      });
      currentTime += section.duration;
    });
    
    return timeline;
  }

  setupRenderingConfiguration() {
    return {
      sample_rate: this.audioSpecs.quality.sampleRate,
      bit_depth: this.audioSpecs.quality.bits,
      format: this.format,
      bitrate: this.audioSpecs.quality.bitrate,
      channels: 2,
      normalization: true,
      fade_in: this.audioSpecs.fadeIn,
      fade_out: this.audioSpecs.fadeOut
    };
  }

  generateVariations() {
    return [
      { type: 'tempo_variation', modifier: '0.9x_speed' },
      { type: 'key_variation', modifier: 'transpose_up_2_semitones' },
      { type: 'arrangement_variation', modifier: 'minimal_version' },
      { type: 'mood_variation', modifier: 'darker_version' }
    ];
  }

  setupLoopConfiguration() {
    return {
      loop_points: {
        start: 4, // Start loop after 4 second intro
        end: this.duration - 2 // End loop 2 seconds before outro
      },
      crossfade_duration: 1,
      seamless_transition: true,
      loop_length: this.duration - 6 // Total loop length
    };
  }

  // Export and utility methods
  exportAudio() {
    return {
      format: this.format,
      quality: this.audioSpecs.quality,
      metadata: {
        title: \`AI Generated \${this.audioType}\`,
        genre: this.genre,
        mood: this.mood,
        key: this.key,
        tempo: this.musicalRequirements.tempo.bpm,
        duration: this.duration
      }
    };
  }

  generatePreview() {
    return {
      waveform: 'visual_representation',
      duration: this.duration,
      estimated_file_size: this.calculateFileSize(),
      peak_frequency: this.analyzePeakFrequencies(),
      dynamic_range: this.calculateDynamicRange()
    };
  }

  calculateFileSize() {
    const bitrate = parseInt(this.audioSpecs.quality.bitrate.replace(/[^\d]/g, ''));
    const durationMinutes = this.duration / 60;
    const sizeMB = (bitrate * durationMinutes) / 8000;
    return Math.round(sizeMB * 100) / 100 + 'MB';
  }

  analyzePeakFrequencies() {
    const frequencyRanges = {
      bass: '20Hz-200Hz',
      low_mid: '200Hz-800Hz',
      mid: '800Hz-3kHz',
      high_mid: '3kHz-8kHz',
      treble: '8kHz-20kHz'
    };
    
    return frequencyRanges;
  }

  calculateDynamicRange() {
    const rangeByGenre = {
      corporate: '12dB',
      cinematic: '18dB',
      ambient: '15dB',
      electronic: '10dB',
      acoustic: '14dB'
    };
    
    return rangeByGenre[this.genre] || '12dB';
  }
}

// Initialize AI Audio Generator
const audioGenerator = new AIAudioGenerator();

// Export configuration
export default audioGenerator;`;

      setResult(audioGeneratorConfig);
      setIsGenerating(false);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AIToolLayout
      title="AI Audio Generator"
      description="Create professional music, soundtracks, and audio content with AI-powered composition, arrangement, and production capabilities."
      category="Video & Audio"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Audio Type & Genre */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audio Type</label>
              <select
                value={formData.audioType}
                onChange={(e) => handleInputChange('audioType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="background_music">Background Music</option>
                <option value="soundtrack">Soundtrack/Score</option>
                <option value="podcast_intro">Podcast Intro</option>
                <option value="jingle">Jingle/Branding</option>
                <option value="ambient_soundscape">Ambient Soundscape</option>
                <option value="voice_narration">Voice Narration Background</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <select
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="corporate">Corporate</option>
                <option value="cinematic">Cinematic</option>
                <option value="ambient">Ambient</option>
                <option value="electronic">Electronic</option>
                <option value="acoustic">Acoustic</option>
                <option value="classical">Classical</option>
                <option value="jazz">Jazz</option>
                <option value="rock">Rock</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
              <select
                value={formData.mood}
                onChange={(e) => handleInputChange('mood', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="uplifting">Uplifting</option>
                <option value="calming">Calming</option>
                <option value="inspiring">Inspiring</option>
                <option value="mysterious">Mysterious</option>
                <option value="energetic">Energetic</option>
                <option value="dramatic">Dramatic</option>
                <option value="peaceful">Peaceful</option>
                <option value="intense">Intense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (seconds)</label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="15">15 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="120">2 minutes</option>
                <option value="180">3 minutes</option>
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Musical Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Musical Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tempo</label>
              <select
                value={formData.tempo}
                onChange={(e) => handleInputChange('tempo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="slow">Slow (60 BPM)</option>
                <option value="medium">Medium (120 BPM)</option>
                <option value="fast">Fast (140 BPM)</option>
                <option value="very_fast">Very Fast (160 BPM)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Signature</label>
              <select
                value={formData.key}
                onChange={(e) => handleInputChange('key', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="C_major">C Major (Happy)</option>
                <option value="G_major">G Major (Bright)</option>
                <option value="F_major">F Major (Pastoral)</option>
                <option value="A_minor">A Minor (Melancholic)</option>
                <option value="D_minor">D Minor (Sad)</option>
                <option value="B_flat_major">B♭ Major (Noble)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instruments</label>
              <select
                value={formData.instruments}
                onChange={(e) => handleInputChange('instruments', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mixed">Mixed Ensemble</option>
                <option value="orchestral">Orchestral</option>
                <option value="electronic">Electronic</option>
                <option value="acoustic">Acoustic</option>
                <option value="minimal">Minimal</option>
                <option value="epic">Epic/Cinematic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Structure</label>
              <select
                value={formData.structure}
                onChange={(e) => handleInputChange('structure', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="intro_verse_chorus">Intro-Verse-Chorus</option>
                <option value="ambient_flow">Ambient Flow</option>
                <option value="cinematic_arc">Cinematic Arc</option>
                <option value="simple_loop">Simple Loop</option>
              </select>
            </div>
          </div>
        </div>

        {/* Technical Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audio Quality</label>
              <select
                value={formData.quality}
                onChange={(e) => handleInputChange('quality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="high">High (320kbps)</option>
                <option value="medium">Medium (192kbps)</option>
                <option value="low">Low (128kbps)</option>
                <option value="lossless">Lossless (FLAC)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select
                value={formData.format}
                onChange={(e) => handleInputChange('format', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mp3">MP3 (Universal)</option>
                <option value="wav">WAV (Professional)</option>
                <option value="flac">FLAC (Lossless)</option>
                <option value="aac">AAC (Mobile)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeVariations"
                checked={formData.includeVariations}
                onChange={(e) => handleInputChange('includeVariations', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeVariations" className="ml-2 block text-sm text-gray-900">
                Include Variations (Tempo, Key, Arrangement)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="loopable"
                checked={formData.loopable}
                onChange={(e) => handleInputChange('loopable', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="loopable" className="ml-2 block text-sm text-gray-900">
                Make Seamlessly Loopable
              </label>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "AI-powered musical composition",
              "Professional arrangement and orchestration",
              "Mood-based harmonic progression",
              "Intelligent instrumentation selection",
              "Dynamic structure generation",
              "High-quality audio rendering",
              "Multiple format export options",
              "Seamless loop creation",
              "Tempo and key customization",
              "Genre-specific styling"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 