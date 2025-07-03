# Personal Homepage & Developer Tools Suite

A sophisticated personal homepage featuring a comprehensive developer tools suite with AI-powered features using Google Gemini API.

## 🚀 Features

### Homepage
- Modern, responsive design with dark/light theme support
- Smooth animations with Framer Motion
- Project showcase and skills sections
- Professional navigation with sidebar

### Developer Tools Suite
- **Audio Recorder**: Record high-quality audio with real-time visualization
- **Image Gallery**: Upload, organize, and manage image collections
- **Media Downloader**: Download content from YouTube, Twitter, Instagram, and more
- **Text to Audio**: AI-powered text-to-speech conversion using Gemini API
- **Video Player**: Advanced video player with subtitle support and speed controls
- **Voice Transcriber**: AI-powered voice-to-text transcription using Web Speech API

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **AI Integration**: Google Gemini API
- **File Handling**: React Dropzone
- **Icons**: Lucide React
- **Theme**: Next Themes

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key (for AI features)

## � Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-homepage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   # Required for AI features
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Site configuration
   SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Get your Gemini API key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Homepage
- Browse the main homepage to see your portfolio and projects
- Use `ALT+S+D` to open the project navigator sidebar
- Switch between light and dark themes

### Developer Tools
- Access tools via `/tools` or through the sidebar navigation
- Each tool has its own dedicated page with full functionality
- AI-powered tools (Text to Audio, Voice Transcriber) require the Gemini API key

### Tool-Specific Features

#### Audio Recorder (`/tools/audio-recorder`)
- Click "Start Recording" to begin
- Real-time audio level visualization
- Pause/resume functionality
- Download recordings as WebM files

#### Image Gallery (`/tools/image-gallery`)
- Drag & drop images or click to upload
- Grid/list view modes
- Bulk operations (download, delete)
- Image preview modal

#### Media Downloader (`/tools/media-downloader`)
- Paste URLs from supported platforms
- Choose format (MP4, MP3, WebM, WAV) and quality
- Track download progress
- *Note: This is a UI demonstration - backend integration required for actual downloads*

#### Text to Audio (`/tools/text-to-audio`)
- Enter text (up to 5000 characters)
- Adjust voice settings (speed, pitch, volume)
- AI enhancement features (placeholder)
- Download generated audio

#### Video Player (`/tools/video-player`)
- Upload video files (MP4, WebM, MOV, AVI, MKV)
- Full-featured player with subtitles
- Playback speed control
- Fullscreen support
- Playlist management

#### Voice Transcriber (`/tools/voice-transcriber`)
- Real-time voice transcription
- Multiple language support
- Upload audio files for transcription
- Download transcriptions as text files

## 🔐 API Keys Setup

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your `.env.local` file as `GEMINI_API_KEY`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `out` directory to your hosting platform

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update CSS variables in `src/app/globals.css`
- Edit component styles in individual files

### Content
- Update personal information in homepage components
- Modify project data in sidebar navigation
- Customize tool descriptions and features

### AI Features
- Extend Gemini API integration in `src/lib/gemini.ts`
- Add new AI-powered tools by following existing patterns
- Customize voice settings and language options

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── tools/             # Tool pages
│   │   ├── audio-recorder/
│   │   ├── image-gallery/
│   │   ├── media-downloader/
│   │   ├── text-to-audio/
│   │   ├── video-player/
│   │   └── voice-transcriber/
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── sections/         # Homepage sections
│   └── ui/              # UI components
├── lib/                  # Utilities and APIs
│   ├── gemini.ts        # Gemini API integration
│   └── utils.ts         # Utility functions
└── types/               # TypeScript type definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help setting up the project:

1. Check the [Issues](https://github.com/your-username/your-repo/issues) page
2. Create a new issue with detailed description
3. Join the discussions in the [Discussions](https://github.com/your-username/your-repo/discussions) tab

---

**Made with ❤️ and lots of ☕**
