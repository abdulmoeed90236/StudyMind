export type ThemeMode = 'emerald-matrix' | 'pitch-black' | 'mint-cyberpunk' | 'clean-white';

export type PageId = 'home' | 'features' | 'how-it-works' | 'playground' | 'testimonials' | 'pricing' | 'faq';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  university: string;
  avatar: string;
  major: string;
  gpaBoost: string;
  content: string;
  rating: number;
  highlight: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'outline';
}

export interface Feature {
  id: string;
  iconName: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  gradient: string;
  highlights: string[];
  demoType: 'summary' | 'explain' | 'flashcards' | 'tutor';
}

export interface SampleStudyNote {
  id: string;
  subject: string;
  icon: string;
  title: string;
  rawText: string;
  summary: {
    keyTakeaways: string[];
    coreFormulasOrTerms: string[];
    timeSaved: string;
  };
  eli5Explanation: string;
  flashcards: { question: string; answer: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
  tutorAnswers: { question: string; answer: string }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'features' | 'pricing' | 'privacy';
}
