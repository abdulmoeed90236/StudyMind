import React, { useState } from 'react';
import { Brain, Send, CheckCircle2, Github, Twitter, Linkedin, MessageSquare, ArrowUp, Activity } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onPageChange?: (page: PageId) => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange, onOpenAuth }) => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const handleNav = (page: PageId) => {
    if (onPageChange) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] border-t border-[#334155] pt-16 pb-12 text-[#94A3B8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#334155]">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 text-left focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-[#6366F1] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                  <Brain className="w-4 h-4 text-[#6366F1]" />
                </div>
              </div>
              <span className="text-lg font-bold text-[#F8FAFC] tracking-tight">
                StudyMind<span className="text-[#6366F1]">AI</span>
              </span>
            </button>

            <p className="text-[#94A3B8] leading-relaxed max-w-sm">
              Next-generation AI study assistant for ambitious students. Summarize lecture notes, explain tough topics with analogies, and auto-generate exam flashcards in seconds.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#F8FAFC] block mb-2">
                Join 50,000+ students getting Weekly AI Study Hacks:
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter student email..."
                  className="flex-1 bg-[#1E293B] border border-[#334155] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#6366F1]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6366F1] hover:bg-indigo-500 text-white font-extrabold transition-colors flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-500/20"
                >
                  {subscribed ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Send className="w-3.5 h-3.5 text-white" />}
                  <span>{subscribed ? 'Subscribed' : 'Join'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Pages Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#F8FAFC] uppercase tracking-wider font-mono">Pages</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('home')} className="hover:text-[#6366F1] transition-colors text-left">Home Overview</button></li>
              <li><button onClick={() => handleNav('features')} className="hover:text-[#6366F1] transition-colors text-left">Features Explorer</button></li>
              <li><button onClick={() => handleNav('how-it-works')} className="hover:text-[#6366F1] transition-colors text-left">Steps & Workflow</button></li>
              <li><button onClick={() => handleNav('playground')} className="hover:text-[#6366F1] transition-colors text-left">Live AI Sandbox</button></li>
              <li><button onClick={() => handleNav('testimonials')} className="hover:text-[#6366F1] transition-colors text-left">Student Reviews</button></li>
            </ul>
          </div>

          {/* Column 3: Resources & Plans */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#F8FAFC] uppercase tracking-wider font-mono">Plans & Help</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('pricing')} className="hover:text-[#6366F1] transition-colors text-left">Student Pricing</button></li>
              <li><button onClick={() => handleNav('faq')} className="hover:text-[#6366F1] transition-colors text-left">FAQ & Support</button></li>
              <li><button onClick={() => onOpenAuth?.('signup')} className="hover:text-[#6366F1] transition-colors text-left">Get Started Free</button></li>
              <li><button onClick={() => onOpenAuth?.('login')} className="hover:text-[#6366F1] transition-colors text-left">Student Login</button></li>
            </ul>
          </div>

          {/* Column 4: Community & Back to Top */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#F8FAFC] uppercase tracking-wider font-mono">Community</h4>
            <div className="flex items-center gap-2">
              <a href="#" className="p-2 rounded-xl bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-[#6366F1] hover:border-[#6366F1]/40 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-[#6366F1] hover:border-[#6366F1]/40 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-[#6366F1] hover:border-[#6366F1]/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-[#6366F1] hover:border-[#6366F1]/40 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E293B] border border-[#334155] text-[#818CF8] font-bold hover:bg-[#334155]/50 transition-colors w-full justify-center"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#94A3B8]">
          <p>© {new Date().getFullYear()} StudyMind AI, Inc. Built with passion for students everywhere.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Academic Integrity</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
