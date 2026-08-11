import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { PricingPage } from './pages/PricingPage';
import { FaqPage } from './pages/FaqPage';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { Feature, ThemeMode } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [selectedPlanName, setSelectedPlanName] = useState<string | undefined>(undefined);
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup', planName?: string) => {
    setAuthMode(mode);
    setSelectedPlanName(planName);
    setAuthModalOpen(true);
  };

  const handleSelectFeature = (feature: Feature) => {
    setCurrentPage('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageTitleMap: Record<PageId, string> = {
    'home': 'Home',
    'features': 'Features Explorer',
    'how-it-works': 'Steps & Workflow',
    'playground': 'Live AI Sandbox',
    'testimonials': 'Student Reviews',
    'pricing': 'Pricing & Plans',
    'faq': 'FAQ & Support',
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#06080C] text-white font-sans">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        onOpenAuth={(mode) => handleOpenAuth(mode)}
      />

      {/* Main Multi-Page Router Content */}
      <main id="main-content" className="pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          {/* Breadcrumb Header Banner for Subpages */}
          {currentPage !== 'home' && (
            <motion.div
              key={`breadcrumb-${currentPage}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#040914]/90 border-b border-amber-500/20 py-4 px-4 sm:px-6 lg:px-8 backdrop-blur-md shadow-lg"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400">
                  <button
                    onClick={() => {
                      setCurrentPage('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition-colors"
                  >
                    <Home className="w-3.5 h-3.5 text-amber-400" />
                    <span>Home</span>
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-amber-400 font-bold uppercase tracking-wider">{pageTitleMap[currentPage]}</span>
                </div>

                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#040914] border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-amber-300 hover:border-amber-400/50 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>Back to Overview</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <motion.div
            key="page-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage
              onOpenAuth={handleOpenAuth}
              onOpenDemo={() => setDemoModalOpen(true)}
              onSelectFeature={handleSelectFeature}
            />
          </motion.div>
        )}

        {/* 2. DEDICATED FEATURES PAGE */}
        {currentPage === 'features' && (
          <motion.div
            key="page-features"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <FeaturesPage
              onSelectFeature={handleSelectFeature}
              onOpenAuth={handleOpenAuth}
            />
          </motion.div>
        )}

        {/* 3. DEDICATED STEPS & HOW IT WORKS PAGE */}
        {currentPage === 'how-it-works' && (
          <motion.div
            key="page-how-it-works"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <HowItWorksPage onOpenAuth={handleOpenAuth} />
          </motion.div>
        )}

        {/* 4. DEDICATED LIVE AI SANDBOX PAGE */}
        {currentPage === 'playground' && (
          <motion.div
            key="page-playground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <PlaygroundPage onOpenAuth={handleOpenAuth} />
          </motion.div>
        )}

        {/* 5. DEDICATED REVIEWS & TESTIMONIALS PAGE */}
        {currentPage === 'testimonials' && (
          <motion.div
            key="page-testimonials"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialsPage onOpenAuth={handleOpenAuth} />
          </motion.div>
        )}

        {/* 6. DEDICATED PRICING PAGE */}
        {currentPage === 'pricing' && (
          <motion.div
            key="page-pricing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <PricingPage onOpenAuth={handleOpenAuth} />
          </motion.div>
        )}

        {/* 7. DEDICATED FAQ PAGE */}
        {currentPage === 'faq' && (
          <motion.div
            key="page-faq"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <FaqPage onOpenAuth={handleOpenAuth} />
          </motion.div>
        )}
      </main>

      {/* Footer Section */}
      <Footer
        onPageChange={(page) => setCurrentPage(page)}
        onOpenAuth={(mode) => handleOpenAuth(mode)}
      />

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
