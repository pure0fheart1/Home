# Home - Personal Digital Hub Monorepo

This is a monorepo containing my personal homepage and AI tools platform, designed to be scalable to thousands of pages and tools as requested [[memory:916471]].

## 🏗️ Project Structure

```
Home/
├── apps/
│   └── homepage/          # Main homepage application
│       ├── src/          # Source code
│       ├── public/       # Static assets
│       └── package.json  # Homepage dependencies
├── docs/                 # Documentation
├── package.json         # Root monorepo configuration
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation & Running

From the root directory:

```bash
# Install dependencies
npm run install:all

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Or navigate to the specific app:

```bash
cd apps/homepage
npm install
npm run dev
```

## 🎨 Design System

The project uses a sophisticated **white, black, and gold** color scheme:
- Primary: Gold (#FFD700)
- Background: White/Black (theme-aware)
- Accent: Gold variations

## 🔧 Features

- **100 AI Tools**: Comprehensive collection of AI-powered tools
- **Hidden Sidebar**: Press `ALT+S+D` to reveal the tools navigation
- **Dark Mode**: Automatic theme detection and manual toggle
- **Responsive**: Optimized for all devices
- **PWA Ready**: Installable as a progressive web app
- **SEO Optimized**: Built-in sitemap and meta tags

## 📁 Apps

### Homepage (`/apps/homepage`)
The main personal homepage and portfolio site featuring:
- Hero section with animations
- Project showcase
- Skills visualization
- AI tools integration
- Contact section

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Type Safety**: TypeScript
- **Database**: Firebase (ready for integration)
- **Analytics**: Vercel Analytics

## 📚 Documentation

- [AI Tools Implementation](./AI_TOOLS_IMPLEMENTATION_SUMMARY.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Sidebar Guide](./SIDEBAR_GUIDE.md)

## 🚀 Deployment

The project is optimized for deployment on Vercel:

```bash
# From root directory
npm run build
```

Then deploy the `apps/homepage/.next` directory to your hosting provider.

## 🔒 Environment Variables

Create `.env.local` in `apps/homepage/`:

```env
# Google AI API
GOOGLE_AI_API_KEY=AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

---

Built with ❤️ using modern web technologies for scalability and performance. 