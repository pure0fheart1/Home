import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Your Name - Digital Portfolio & Personal Hub',
    template: '%s | Your Name',
  },
  description: 'A sophisticated digital portfolio showcasing projects, expertise, and professional journey. Your central hub for all creative and professional endeavors.',
  keywords: [
    'portfolio',
    'developer',
    'designer',
    'projects',
    'professional',
    'creative',
    'digital hub',
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  metadataBase: new URL(process.env.SITE_URL || 'https://yourname.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Your Name - Digital Portfolio & Personal Hub',
    description: 'A sophisticated digital portfolio showcasing projects, expertise, and professional journey.',
    siteName: 'Your Name Portfolio',
  },
  twitter: {
    card: 'summary',
    title: 'Your Name - Digital Portfolio & Personal Hub',
    description: 'A sophisticated digital portfolio showcasing projects, expertise, and professional journey.',
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
} 