'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Copy, Download, RefreshCw, Heart, Eye } from 'lucide-react';

interface ColorPalette {
  name: string;
  colors: string[];
  mood: string;
  description: string;
}

const moods = [
  'Calm & Peaceful', 'Energetic & Vibrant', 'Professional & Corporate', 
  'Creative & Artistic', 'Warm & Cozy', 'Cool & Modern', 'Nature & Organic',
  'Minimalist & Clean', 'Bold & Dramatic', 'Soft & Romantic'
];

const colorPalettes: Record<string, ColorPalette[]> = {
  'Calm & Peaceful': [
    { name: 'Ocean Breeze', colors: ['#E6F3FF', '#B3D9FF', '#80BFFF', '#4DA6FF', '#1A8CFF'], mood: 'Calm & Peaceful', description: 'Serene blues inspired by ocean waves' },
    { name: 'Sage Garden', colors: ['#F0F4EC', '#C8D5B9', '#A4C686', '#7FB069', '#56925C'], mood: 'Calm & Peaceful', description: 'Tranquil greens of a peaceful garden' },
    { name: 'Lavender Dreams', colors: ['#F5F0FF', '#E0D1FF', '#C2A2FF', '#A373E6', '#8B44CC'], mood: 'Calm & Peaceful', description: 'Soft purples for relaxation' },
  ],
  'Energetic & Vibrant': [
    { name: 'Sunset Fire', colors: ['#FFF4E6', '#FFD633', '#FF9500', '#FF6B35', '#E63946'], mood: 'Energetic & Vibrant', description: 'Bold oranges and reds like a blazing sunset' },
    { name: 'Electric Neon', colors: ['#F0FFF0', '#39FF14', '#00FF41', '#FF1493', '#8A2BE2'], mood: 'Energetic & Vibrant', description: 'High-energy neon colors' },
    { name: 'Tropical Paradise', colors: ['#E6FFFA', '#00E5FF', '#FF6B9D', '#FFEB3B', '#4CAF50'], mood: 'Energetic & Vibrant', description: 'Vibrant tropical colors' },
  ],
  'Professional & Corporate': [
    { name: 'Corporate Blue', colors: ['#F8FAFC', '#E2E8F0', '#64748B', '#334155', '#0F172A'], mood: 'Professional & Corporate', description: 'Classic corporate blue tones' },
    { name: 'Executive Gray', colors: ['#FAFAFA', '#D4D4D8', '#A1A1AA', '#52525B', '#18181B'], mood: 'Professional & Corporate', description: 'Sophisticated gray palette' },
    { name: 'Navy Elite', colors: ['#F1F5F9', '#CBD5E1', '#475569', '#1E293B', '#0C4A6E'], mood: 'Professional & Corporate', description: 'Navy blue for executive presence' },
  ],
  'Creative & Artistic': [
    { name: 'Artist\'s Dream', colors: ['#FFF9E6', '#FFE066', '#FF9F43', '#EA5455', '#8E44AD'], mood: 'Creative & Artistic', description: 'Inspiring colors for creativity' },
    { name: 'Bohemian Rhapsody', colors: ['#FDF2F8', '#F3E8FF', '#DDD6FE', '#A78BFA', '#7C3AED'], mood: 'Creative & Artistic', description: 'Artistic bohemian vibes' },
    { name: 'Rainbow Splash', colors: ['#FFE5E5', '#FFE5CC', '#FFFFCC', '#E5FFCC', '#CCE5FF'], mood: 'Creative & Artistic', description: 'Playful rainbow pastels' },
  ],
  'Warm & Cozy': [
    { name: 'Autumn Leaves', colors: ['#FFF8E1', '#FFCC80', '#FF8A65', '#D84315', '#8D4004'], mood: 'Warm & Cozy', description: 'Warm autumn colors' },
    { name: 'Coffee House', colors: ['#FFF3E0', '#FFCC80', '#A1887F', '#6D4C41', '#3E2723'], mood: 'Warm & Cozy', description: 'Rich coffee and cream tones' },
    { name: 'Fireside', colors: ['#FFF8E1', '#FFAB91', '#FF7043', '#E64A19', '#BF360C'], mood: 'Warm & Cozy', description: 'Cozy fireside warmth' },
  ],
  'Cool & Modern': [
    { name: 'Arctic Frost', colors: ['#F0F9FF', '#E0F2FE', '#0EA5E9', '#0284C7', '#0C4A6E'], mood: 'Cool & Modern', description: 'Cool modern blues' },
    { name: 'Mint Fresh', colors: ['#F0FDF4', '#DCFCE7', '#4ADE80', '#16A34A', '#15803D'], mood: 'Cool & Modern', description: 'Fresh mint greens' },
    { name: 'Steel Gray', colors: ['#F8FAFC', '#F1F5F9', '#64748B', '#334155', '#1E293B'], mood: 'Cool & Modern', description: 'Modern steel palette' },
  ],
  'Nature & Organic': [
    { name: 'Forest Floor', colors: ['#F7F3F0', '#D4C5B9', '#8B7355', '#5D4E37', '#3C2414'], mood: 'Nature & Organic', description: 'Earthy forest tones' },
    { name: 'Garden Fresh', colors: ['#F0FDF4', '#BBF7D0', '#4ADE80', '#16A34A', '#15803D'], mood: 'Nature & Organic', description: 'Fresh garden greens' },
    { name: 'Desert Sand', colors: ['#FFFBEB', '#FED7AA', '#FB923C', '#EA580C', '#C2410C'], mood: 'Nature & Organic', description: 'Warm desert colors' },
  ],
  'Minimalist & Clean': [
    { name: 'Pure White', colors: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#D1D5DB', '#6B7280'], mood: 'Minimalist & Clean', description: 'Clean white minimalism' },
    { name: 'Monochrome', colors: ['#FFFFFF', '#E5E7EB', '#9CA3AF', '#4B5563', '#111827'], mood: 'Minimalist & Clean', description: 'Classic monochrome' },
    { name: 'Soft Neutral', colors: ['#FEFEFE', '#F5F5F4', '#E7E5E4', '#A8A29E', '#78716C'], mood: 'Minimalist & Clean', description: 'Soft neutral tones' },
  ],
  'Bold & Dramatic': [
    { name: 'Midnight Drama', colors: ['#FEF7FF', '#E879F9', '#A21CAF', '#701A75', '#4A044E'], mood: 'Bold & Dramatic', description: 'Dramatic purple nights' },
    { name: 'Fire & Ice', colors: ['#FEF2F2', '#FCA5A5', '#EF4444', '#DC2626', '#991B1B'], mood: 'Bold & Dramatic', description: 'Bold red drama' },
    { name: 'Electric Storm', colors: ['#FFFBEB', '#FDE047', '#EAB308', '#CA8A04', '#A16207'], mood: 'Bold & Dramatic', description: 'Electric yellow energy' },
  ],
  'Soft & Romantic': [
    { name: 'Rose Petals', colors: ['#FDF2F8', '#FCE7F3', '#F9A8D4', '#EC4899', '#DB2777'], mood: 'Soft & Romantic', description: 'Soft romantic pinks' },
    { name: 'Peach Blossom', colors: ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FB923C', '#EA580C'], mood: 'Soft & Romantic', description: 'Gentle peach tones' },
    { name: 'Lavender Love', colors: ['#FAF5FF', '#E9D5FF', '#C084FC', '#A855F7', '#9333EA'], mood: 'Soft & Romantic', description: 'Romantic lavender hues' },
  ],
};

export default function ColorPalettePage() {
  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [currentPalettes, setCurrentPalettes] = useState<ColorPalette[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setCurrentPalettes(colorPalettes[selectedMood as keyof typeof colorPalettes] || []);
  }, [selectedMood]);

  const generateRandomPalette = () => {
    const allPalettes = Object.values(colorPalettes).flat();
    const filteredPalettes = allPalettes.filter(p => p.mood === selectedMood);
    const shuffled = [...filteredPalettes].sort(() => Math.random() - 0.5);
    setCurrentPalettes(shuffled);
  };

  const copyColorCode = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const copyPaletteCSS = (palette: ColorPalette) => {
    const css = `/* ${palette.name} - ${palette.description} */
:root {
  --color-primary: ${palette.colors[0]};
  --color-secondary: ${palette.colors[1]};
  --color-accent: ${palette.colors[2]};
  --color-highlight: ${palette.colors[3]};
  --color-dark: ${palette.colors[4]};
}

.palette-${palette.name.toLowerCase().replace(/\s+/g, '-')} {
  --bg-primary: ${palette.colors[0]};
  --bg-secondary: ${palette.colors[1]};
  --text-primary: ${palette.colors[4]};
  --text-secondary: ${palette.colors[3]};
  --accent: ${palette.colors[2]};
}`;
    navigator.clipboard.writeText(css);
  };

  const downloadPalette = (palette: ColorPalette) => {
    const css = `/* ${palette.name} - ${palette.description} */
:root {
  --color-primary: ${palette.colors[0]};
  --color-secondary: ${palette.colors[1]};
  --color-accent: ${palette.colors[2]};
  --color-highlight: ${palette.colors[3]};
  --color-dark: ${palette.colors[4]};
}`;
    
    const element = document.createElement('a');
    const file = new Blob([css], { type: 'text/css' });
    element.href = URL.createObjectURL(file);
    element.download = `${palette.name.replace(/\s+/g, '-').toLowerCase()}-palette.css`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleFavorite = (paletteName: string) => {
    setFavorites(prev => 
      prev.includes(paletteName) 
        ? prev.filter(name => name !== paletteName)
        : [...prev, paletteName]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-serif font-bold">Smart Color Palette Generator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate beautiful, mood-based color palettes for your projects with instant CSS export 
            and customization options.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mood Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Choose Your Mood</h2>
              <Button onClick={generateRandomPalette} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Shuffle
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                    selectedMood === mood
                      ? 'border-accent bg-accent/10 text-accent font-medium'
                      : 'border-border hover:border-accent/50 hover:bg-muted/50'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="space-y-6">
            {currentPalettes.map((palette, index) => (
              <div key={index} className="bg-card rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{palette.name}</h3>
                    <p className="text-sm text-muted-foreground">{palette.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(palette.name)}
                      className={favorites.includes(palette.name) ? 'text-red-500' : ''}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(palette.name) ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyPaletteCSS(palette)}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      CSS
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadPalette(palette)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {palette.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="aspect-square group cursor-pointer">
                      <div
                        className="w-full h-full rounded-lg border-2 border-border group-hover:border-accent transition-all duration-200 shadow-sm"
                        style={{ backgroundColor: color }}
                        onClick={() => copyColorCode(color)}
                      />
                      <div className="mt-2 text-center">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {color}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: palette.colors[0] }}>
                  <h4 className="font-semibold mb-2" style={{ color: palette.colors[4] }}>
                    Preview
                  </h4>
                  <p className="text-sm mb-3" style={{ color: palette.colors[3] }}>
                    This is how your content would look with this color palette.
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded text-white text-sm font-medium"
                      style={{ backgroundColor: palette.colors[2] }}
                    >
                      Primary Button
                    </button>
                    <button
                      className="px-3 py-1 rounded text-sm font-medium border"
                      style={{ 
                        color: palette.colors[2],
                        borderColor: palette.colors[2]
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Mood-Based Palettes</h3>
              <p className="text-sm text-muted-foreground">
                Choose from 10 different moods to find the perfect palette
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Copy className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Instant CSS Export</h3>
              <p className="text-sm text-muted-foreground">
                Copy CSS variables or download complete stylesheets
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Live Preview</h3>
              <p className="text-sm text-muted-foreground">
                See how your palette looks in real UI components
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}