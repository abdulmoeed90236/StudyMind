import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Menu, X, Sparkles, ArrowRight, Palette, Check } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, currentTheme, onThemeChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
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

  const themesList: { id: ThemeMode; name: string; badge: string; color: string }[] = [
    { id: 'emerald-matrix', name: 'Emerald Matrix', badge: 'Dark Green', color: 'bg-emerald-500' },
    { id: 'pitch-black', name: 'Pitch Black OLED', badge: 'Pure Obsidian', color: 'bg-zinc-100' },
    { id: 'mint-cyberpunk', name: 'Mint Cyberpunk', badge: 'Teal Glow', color: 'bg-teal-400' },
    { id: 'clean-white', name: 'Studio White', badge: 'High Contrast', color: 'bg-emerald-600' },
  ];

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Steps', href: '#how-it-works' },
    { name: 'Sandbox', href: '#playground' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-emerald-500/20 shadow-xl shadow-black/40 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2 shrink-0 group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-white p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1">
                StudyMind<span className="text-emerald-400">AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-400/90 font-bold -mt-1 hidden xs:block">
                Academic Copilot
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links - Shown on lg screens to avoid layout wrapping on tablet */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-950/80 border border-emerald-500/20 px-3 py-1 rounded-full backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-bold text-slate-300 hover:text-emerald-300 px-3 py-1.5 rounded-full hover:bg-emerald-950/40 transition-all duration-200 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs + Theme Selector */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                id="theme-toggle-btn"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 border border-emerald-500/30 hover:border-emerald-400 text-slate-200 hover:text-white transition-all duration-200"
                title="Change UI Theme"
              >
                <Palette className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="capitalize hidden xl:inline">{currentTheme.replace('-', ' ')}</span>
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-52 bg-zinc-950 border border-emerald-500/30 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <div className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider px-2.5 py-1 mb-1">
                      UI Theme Presets
                    </div>
                    {themesList.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onThemeChange(t.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          currentTheme === t.id
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                            : 'text-slate-300 hover:bg-zinc-900 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                          <span>{t.name}</span>
                        </div>
                        {currentTheme === t.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              id="nav-login-btn"
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-zinc-900 transition-colors duration-200 whitespace-nowrap"
            >
              Log In
            </button>
            <button
              id="nav-get-started-btn"
              onClick={() => onOpenAuth('signup')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                const nextIndex = (themesList.findIndex(t => t.id === currentTheme) + 1) % themesList.length;
                onThemeChange(themesList[nextIndex].id);
              }}
              className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/30 text-slate-300 hover:text-white focus:outline-none"
              title="Toggle Theme"
            >
              <Palette className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/30 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden fixed inset-x-0 top-[60px] bg-zinc-950/98 border-b border-emerald-500/30 backdrop-blur-2xl px-5 py-6 shadow-2xl z-50 max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {/* Theme Switcher in Mobile Drawer */}
              <div className="p-3 bg-zinc-900/90 rounded-2xl border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Select Visual Theme
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {themesList.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => onThemeChange(t.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        currentTheme === t.id
                          ? 'bg-emerald-400 text-black font-extrabold shadow-sm'
                          : 'bg-zinc-950 text-slate-300 border border-emerald-500/20'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.color}`} />
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col space-y-1 pt-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                  Navigation
                </span>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-bold text-slate-200 hover:text-emerald-400 py-3 px-3 rounded-xl hover:bg-zinc-900 transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400/60" />
                  </a>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-emerald-950 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-3 text-center text-xs font-bold text-slate-200 bg-zinc-900 border border-emerald-500/30 rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-3 text-center text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

