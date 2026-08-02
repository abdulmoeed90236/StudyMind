import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Menu, X, ArrowRight, Home } from 'lucide-react';
import { PageId, ThemeMode } from '../types';

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

  const navLinks: { name: string; id: PageId }[] = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'Steps', id: 'how-it-works' },
    { name: 'Sandbox', id: 'playground' },
    { name: 'Reviews', id: 'testimonials' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'FAQ', id: 'faq' },
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
          ? 'bg-[#FBF9F5]/95 backdrop-blur-xl border-b border-[#E6E1DA] shadow-xs py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 shrink-0 group focus:outline-none text-left"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#4A6B5D] p-0.5 shadow-xs group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#FFFFFF] rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-[#4A6B5D] group-hover:text-[#3D5A4E] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#2D2B2A] flex items-center gap-1">
                StudyMind<span className="text-[#4A6B5D]">AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#4A6B5D] font-bold -mt-1 hidden xs:block">
                Academic Copilot
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#FFFFFF] border border-[#E6E1DA] px-3 py-1 rounded-full backdrop-blur-md shadow-xs">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  currentPage === link.id
                    ? 'bg-[#4A6B5D] text-white shadow-xs font-extrabold'
                    : 'text-[#736E65] hover:text-[#2D2B2A] hover:bg-[#F3EFEA]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="nav-login-btn"
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold text-[#736E65] hover:text-[#2D2B2A] px-3 py-2 rounded-xl hover:bg-[#F3EFEA] transition-colors duration-200 whitespace-nowrap"
            >
              Log In
            </button>
            <button
              id="nav-get-started-btn"
              onClick={() => onOpenAuth('signup')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-[#4A6B5D] hover:bg-[#3D5A4E] shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#FFFFFF] border border-[#E6E1DA] text-[#736E65] hover:text-[#2D2B2A] focus:outline-none"
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
            className="md:hidden fixed inset-x-0 top-[60px] bg-[#FBF9F5]/98 border-b border-[#E6E1DA] backdrop-blur-2xl px-5 py-6 shadow-lg z-50 max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {/* Nav Links */}
              <div className="flex flex-col space-y-1 pt-1">
                <span className="text-[10px] font-mono font-bold text-[#736E65] uppercase tracking-wider px-2 mb-1">
                  Navigation
                </span>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-sm font-bold py-3 px-3 rounded-xl transition-colors flex items-center justify-between text-left ${
                      currentPage === link.id
                        ? 'bg-[#4A6B5D] text-white font-extrabold'
                        : 'text-[#2D2B2A] hover:text-[#4A6B5D] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${currentPage === link.id ? 'text-white' : 'text-[#4A6B5D]'}`} />
                  </button>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-[#E6E1DA] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-3 text-center text-xs font-bold text-[#2D2B2A] bg-[#FFFFFF] border border-[#E6E1DA] rounded-xl hover:bg-[#F3EFEA] transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-3 text-center text-xs font-extrabold text-white bg-[#4A6B5D] hover:bg-[#3D5A4E] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

