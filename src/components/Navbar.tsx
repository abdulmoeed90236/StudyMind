import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Menu, X, ArrowRight, Sparkles, Cpu } from 'lucide-react';
import { PageId } from '../types';

export type { PageId };

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks: { name: string; id: PageId; subtitle: string }[] = [
    { name: 'Home', id: 'home', subtitle: 'Overview' },
    { name: 'Summarizer', id: 'features', subtitle: '3D Neural AI' },
    { name: 'Practice', id: 'playground', subtitle: 'Sandbox' },
    { name: 'How It Works', id: 'how-it-works', subtitle: '3D Flow' },
    { name: 'Reviews', id: 'testimonials', subtitle: 'Student Proof' },
    { name: 'Pricing', id: 'pricing', subtitle: 'Gold Plans' },
    { name: 'FAQ', id: 'faq', subtitle: 'Help Center' },
  ];

  const handleNavClick = (id: PageId) => {
    setMobileMenuOpen(false);
    onPageChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'glass-quantum-nav py-2.5'
          : 'bg-[#040914]/80 backdrop-blur-md border-b border-amber-500/20 py-3.5'
      }`}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo with Glowing Quantum Gold Core */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none text-left"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#040914] rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black uppercase tracking-wider text-white flex items-center gap-1 font-sans">
                StudyMind<span className="text-amber-400 text-gold-bright">AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-400/90 font-mono font-bold -mt-1 hidden xs:block">
                QUANTUM TECH GOLD EDITION
              </span>
            </div>
          </button>

          {/* Desktop Quantum Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#081220]/90 border border-amber-500/25 px-3 py-1.5 rounded-full backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative text-xs font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-[0_0_18px_rgba(245,158,11,0.5)]'
                      : 'text-zinc-300 hover:text-amber-300 hover:bg-amber-500/10'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="w-3 h-3 text-slate-950" />}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="nav-login-btn"
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-amber-300 px-3 py-2 rounded-lg hover:bg-amber-500/10 transition-colors duration-200 whitespace-nowrap font-mono"
            >
              Sign In
            </button>
            <button
              id="nav-get-started-btn"
              onClick={() => onOpenAuth('signup')}
              className="btn-quantum-gold inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap"
            >
              <span>Launch Free</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#081220] border border-amber-500/30 text-amber-400 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 top-[62px] bg-[#040914]/98 border-b border-amber-500/30 backdrop-blur-2xl px-5 py-6 shadow-2xl z-50 max-h-[calc(100vh-62px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1 pt-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-amber-400" />
                  <span>Quantum Navigation Modules</span>
                </span>
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`text-sm font-bold uppercase tracking-wider py-3 px-3.5 rounded-xl transition-colors flex items-center justify-between text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                          : 'text-zinc-200 hover:text-amber-300 hover:bg-amber-500/10'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>{link.name}</span>
                        <span className="text-[10px] font-mono opacity-80 font-normal lowercase">{link.subtitle}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-amber-500/20 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-200 bg-[#081220] border border-amber-500/30 rounded-xl hover:bg-amber-500/10 transition-colors font-mono"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="btn-quantum-gold w-full py-3 text-center text-xs font-extrabold uppercase tracking-wider text-slate-950 rounded-xl flex items-center justify-center gap-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


