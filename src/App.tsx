import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { InteractivePlayground } from './components/InteractivePlayground';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { Feature, ThemeMode } from './types';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [selectedPlanName, setSelectedPlanName] = useState<string | undefined>(undefined);
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);
  
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('studymind_theme') as ThemeMode;
    return saved || 'emerald-matrix';
  });

  useEffect(() => {
    localStorage.setItem('studymind_theme', currentTheme);
    document.documentElement.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup', planName?: string) => {
    setAuthMode(mode);
    setSelectedPlanName(planName);
    setAuthModalOpen(true);
  };

  const handleSelectFeature = (feature: Feature) => {
    // Smooth scroll to interactive playground where students can test features live
    const playgroundEl = document.getElementById('playground');
    if (playgroundEl) {
      playgroundEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden theme-${currentTheme} font-sans transition-colors duration-500`}>
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenAuth={(mode) => handleOpenAuth(mode)}
        currentTheme={currentTheme}
        onThemeChange={(theme) => setCurrentTheme(theme)}
      />

      {/* Main Page Content */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero
          onOpenAuth={(mode) => handleOpenAuth(mode)}
          onOpenDemo={() => setDemoModalOpen(true)}
        />

        {/* 2. Feature Showcase Section */}
        <Features
          onSelectFeature={handleSelectFeature}
          onOpenAuth={() => handleOpenAuth('signup', 'Pro Learner')}
        />

        {/* 3. Interactive Live AI Sandbox / Playground */}
        <InteractivePlayground
          onOpenAuth={() => handleOpenAuth('signup', 'Pro Learner')}
        />

        {/* 4. Interactive "How It Works" Stepper */}
        <HowItWorks
          onOpenAuth={() => handleOpenAuth('signup')}
        />

        {/* 5. Social Proof / Testimonials Section */}
        <Testimonials />

        {/* 6. Pricing Section & FAQ Accordion */}
        <Pricing
          onOpenAuth={(planName) => handleOpenAuth('signup', planName)}
        />

        {/* 7. Call-to-Action Banner */}
        <CtaBanner
          onOpenAuth={() => handleOpenAuth('signup')}
        />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Auth Modal (Log In / Sign Up) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        planName={selectedPlanName}
      />

      {/* Interactive Demo Video Tour Modal */}
      <DemoVideoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onOpenAuth={() => handleOpenAuth('signup')}
      />
    </div>
  );
}
