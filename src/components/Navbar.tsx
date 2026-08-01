import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Menu, X, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  currentTheme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
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

          {/* Desktop Navigation Links */}
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

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
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
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-2">
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
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

