# Personal Homepage - Digital Portfolio & Hub

A sophisticated, modern personal homepage built with Next.js 14, featuring a premium design with white, black, and gold color scheme. This scalable platform serves as a digital identity and portfolio centerpiece, designed to grow with your career and projects.

## ✨ Features

### 🎨 Design & Aesthetics
- **Premium Color Scheme**: Pure white (#FFFFFF), rich black (#000000), and elegant gold (#FFD700/#D4AF37)
- **Modern Typography**: Inter for body text, Playfair Display for headings
- **Sophisticated Animations**: Framer Motion powered micro-interactions and page transitions
- **Dark Mode Support**: Elegant theme switching with automatic system preference detection
- **Responsive Design**: Mobile-first approach with seamless desktop scaling

### 🏗️ Architecture & Scalability
- **Next.js 14 App Router**: Modern React framework with optimal performance
- **TypeScript**: Full type safety with strict configuration
- **Modular Components**: Reusable design system for consistency
- **Dynamic Routing**: Built for unlimited project pages and content expansion
- **Performance Optimized**: Lazy loading, code splitting, and bundle optimization

### 🔧 Technical Features
- **Progressive Web App (PWA)**: Offline capabilities and app-like experience
- **SEO Optimized**: Meta tags, structured data, and automatic sitemap generation
- **Analytics Ready**: Vercel Analytics integration
- **Command Palette**: Quick navigation with Cmd+K shortcut
- **Hidden Project Sidebar**: ALT+S+D shortcut reveals comprehensive GitHub project navigator
- **Intersection Observer**: Smooth scroll animations and active section tracking
- **Accessible**: WCAG 2.1 AA compliance with keyboard navigation

### 🎯 Core Sections
- **Hero Section**: Animated personal branding with typing effect
- **Project Showcase**: Dynamic grid with filtering capabilities
- **Skills Visualization**: Interactive expertise display
- **Contact Section**: Professional contact form and social links
- **Blog Integration**: Ready for content expansion
- **Hidden Sidebar**: ALT+S+D activated project navigator with all GitHub repositories

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and CSS variables
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx     # Premium button with variants
│   │   ├── card.tsx       # Interactive card components
│   │   └── ...
│   ├── layout/            # Layout components
│   │   ├── navigation.tsx # Sticky navigation with scroll effects
│   │   └── footer.tsx     # Comprehensive footer
│   ├── sections/          # Homepage sections
│   │   ├── hero-section.tsx
│   │   ├── project-showcase.tsx
│   │   └── ...
│   └── providers/         # Context providers
├── lib/
│   └── utils.ts          # Utility functions
├── types/
│   └── index.ts          # TypeScript definitions
└── styles/               # Additional stylesheets
```

## 🎨 Design System

### Color Palette
```css
/* Light Theme */
--background: 0 0% 100%     /* Pure White */
--foreground: 0 0% 0%       /* Rich Black */
--accent: 45 93% 47%        /* Elegant Gold */

/* Dark Theme */
--background: 0 0% 0%       /* Rich Black */
--foreground: 0 0% 100%     /* Pure White */
--accent: 45 93% 47%        /* Elegant Gold */
```

### Typography Scale
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code**: JetBrains Mono (monospace)

### Component Variants
- **Buttons**: Primary, Secondary, Outline, Ghost, Link, Gold
- **Cards**: Default, Elevated, Outlined, Glass
- **Interactive states**: Hover, focus, and active animations

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Quality Assurance
npm run lint         # ESLint code checking
npm run type-check   # TypeScript type checking

# Optimization
npm run analyze      # Bundle size analysis
npm run build-sitemap # Generate sitemap
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
SITE_URL=https://.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourname.com
```

### Customization Guide

1. **Personal Information**
   - Update `src/components/sections/hero-section.tsx` with your details
   - Modify social links in navigation and footer components

2. **Projects Data**
   - Add your projects to `src/components/sections/project-showcase.tsx`
   - Consider moving to a CMS or API for dynamic content

3. **Color Scheme**
   - Modify CSS variables in `src/app/globals.css`
   - Update Tailwind config in `tailwind.config.js`

4. **Content**
   - Replace placeholder text throughout components
   - Add your own images to the `public/` directory

5. **Hidden Sidebar Projects**
   - Edit `src/components/ui/sidebar-navigation.tsx` to add your GitHub projects
   - Follow the guide in `SIDEBAR_GUIDE.md` for detailed customization
   - Test the ALT+S+D keyboard shortcut functionality

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Manual Build
```bash
npm run build
npm run start
```

### Environment Setup
1. Set up custom domain
2. Configure environment variables
3. Set up analytics tracking
4. Generate and upload icons/images

## 📈 Performance

### Built-in Optimizations
- **Image Optimization**: WebP/AVIF support with Next.js Image
- **Bundle Splitting**: Optimized webpack configuration
- **Font Loading**: Optimized Google Fonts with display: swap
- **CSS Optimization**: Critical CSS inlining and tree shaking
- **Runtime Performance**: React 18 features and optimizations

### Lighthouse Scores Target
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🔒 Security

- **CSP Headers**: Content Security Policy implementation
- **XSS Protection**: Built-in React XSS prevention
- **HTTPS Enforcement**: Secure headers configuration
- **Dependency Scanning**: Regular security audits

## 🎯 Roadmap

### Phase 1 ✅
- [x] Core design system
- [x] Homepage sections
- [x] Dark mode support
- [x] Responsive design
- [x] Basic animations
- [x] Hidden sidebar navigation (ALT+S+D)

### Phase 2 🚧
- [ ] Command palette search
- [ ] Blog functionality
- [ ] Advanced project filtering
- [ ] Contact form backend
- [ ] Newsletter integration
- [ ] GitHub API integration for dynamic sidebar projects

### Phase 3 📋
- [ ] CMS integration
- [ ] Advanced analytics
- [ ] A/B testing framework
- [ ] Multiple language support
- [ ] Advanced PWA features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations library
- **Lucide React** - Beautiful icon library
- **Vercel** - Deployment and hosting platform

---

**Built with ❤️ and lots of ☕ using modern web technologies**

For questions or support, feel free to [open an issue](https://github.com/yourusername/personal-homepage/issues) or reach out on social media.
