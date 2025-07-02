// Core types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: string;
  tags: string[];
  status: 'active' | 'completed' | 'archived' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
  startDate: string;
  endDate?: string;
  lastUpdated: string;
  viewCount?: number;
  likes?: number;
  collaborators?: string[];
  client?: string;
  testimonial?: Testimonial;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 1 | 2 | 3 | 4 | 5; // 1 = Beginner, 5 = Expert
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  projects?: string[]; // Project IDs
  certifications?: string[];
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  skills: string[];
  achievements: string[];
  logo?: string;
  companyUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  honors?: string[];
  description?: string;
  logo?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
  date: string;
  projectId?: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  tags: string[];
  category: string;
  featured: boolean;
  readingTime: number;
  viewCount?: number;
  likes?: number;
  coverImage?: string;
  seo: SEOData;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavItem[];
}

// UI Component types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// Search and filtering types
export interface SearchFilters {
  query?: string;
  categories?: string[];
  tags?: string[];
  status?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'date' | 'title' | 'popularity' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// API types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Theme types
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
}

// Newsletter types
export interface NewsletterSubscription {
  email: string;
  preferences?: string[];
  source?: string;
}

// Settings types
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    analytics: boolean;
    cookies: boolean;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type WithTimestamps<T> = T & {
  createdAt: string;
  updatedAt: string;
};

// React component types
export type ComponentProps<T = {}> = T & {
  className?: string;
  children?: React.ReactNode;
};

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate';
  fillMode?: 'forwards' | 'backwards' | 'both';
  iterationCount?: number | 'infinite';
}

// Performance types
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
} 