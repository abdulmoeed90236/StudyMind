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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/60 shadow-xl shadow-slate-950/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-400 to-white p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                StudyMind<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white">AI</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold -mt-1">
                Academic Copilot
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-950/80 border border-emerald-500/20 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-semibold text-slate-300 hover:text-emerald-300 px-3.5 py-1.5 rounded-full hover:bg-emerald-950/40 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs + Theme Selector */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                id="theme-toggle-btn"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-emerald-500/30 hover:border-emerald-400 text-slate-200 hover:text-white transition-all duration-200"
                title="Change UI Theme"
              >
                <Palette className="w-4 h-4 text-emerald-400" />
                <span className="capitalize">{currentTheme.replace('-', ' ')}</span>
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-52 bg-zinc-950 border border-emerald-500/30 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider px-2.5 py-1 mb-1">
                      Select Theme Preset
                    </div>
                    {themesList.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onThemeChange(t.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
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
              className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-zinc-900 transition-colors duration-200"
            >
              Log In
            </button>
            <button
              id="nav-get-started-btn"
              onClick={() => onOpenAuth('signup')}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                const nextIndex = (themesList.findIndex(t => t.id === currentTheme) + 1) % themesList.length;
                onThemeChange(themesList[nextIndex].id);
              }}
              className="p-2 rounded-lg bg-zinc-900 border border-emerald-500/30 text-slate-300 hover:text-white focus:outline-none"
              title="Toggle Theme"
            >
              <Palette className="w-5 h-5 text-emerald-400" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-emerald-500/30 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950/95 border-b border-emerald-500/30 backdrop-blur-xl overflow-hidden px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2 pt-2">
              <div className="mb-2 p-2.5 bg-zinc-900 rounded-xl border border-emerald-500/30">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">Switch Theme</span>
                <div className="grid grid-cols-2 gap-2">
                  {themesList.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => onThemeChange(t.id)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left ${
                        currentTheme === t.id ? 'bg-emerald-500 text-black font-extrabold' : 'bg-zinc-950 text-slate-300 border border-emerald-500/20'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-semibold text-slate-300 hover:text-emerald-300 py-2.5 px-3 rounded-lg hover:bg-zinc-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-emerald-950 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 text-center text-sm font-bold text-slate-200 bg-zinc-900 border border-emerald-500/30 rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2.5 text-center text-sm font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
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

