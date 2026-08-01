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
    <footer className="bg-zinc-950 border-t border-emerald-950/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-950/80">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 text-left focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-emerald-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <Brain className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                StudyMind<span className="text-emerald-400">AI</span>
              </span>
            </button>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Next-generation AI study assistant for ambitious students. Summarize lecture notes, explain tough topics with analogies, and auto-generate exam flashcards in seconds.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-200 block mb-2">
                Join 50,000+ students getting Weekly AI Study Hacks:
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter student email..."
                  className="flex-1 bg-zinc-900 border border-emerald-500/20 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {subscribed ? <CheckCircle2 className="w-3.5 h-3.5 text-black" /> : <Send className="w-3.5 h-3.5 text-black" />}
                  <span>{subscribed ? 'Subscribed' : 'Join'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Pages Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">Pages</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('home')} className="hover:text-emerald-400 transition-colors text-left">Home Overview</button></li>
              <li><button onClick={() => handleNav('features')} className="hover:text-emerald-400 transition-colors text-left">Features Explorer</button></li>
              <li><button onClick={() => handleNav('how-it-works')} className="hover:text-emerald-400 transition-colors text-left">Steps & Workflow</button></li>
              <li><button onClick={() => handleNav('playground')} className="hover:text-emerald-400 transition-colors text-left">Live AI Sandbox</button></li>
              <li><button onClick={() => handleNav('testimonials')} className="hover:text-emerald-400 transition-colors text-left">Student Reviews</button></li>
            </ul>
          </div>

          {/* Column 3: Resources & Plans */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">Plans & Help</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('pricing')} className="hover:text-emerald-400 transition-colors text-left">Student Pricing</button></li>
              <li><button onClick={() => handleNav('faq')} className="hover:text-emerald-400 transition-colors text-left">FAQ & Support</button></li>
              <li><button onClick={() => onOpenAuth?.('signup')} className="hover:text-emerald-400 transition-colors text-left">Get Started Free</button></li>
              <li><button onClick={() => onOpenAuth?.('login')} className="hover:text-emerald-400 transition-colors text-left">Student Login</button></li>
            </ul>
          </div>

          {/* Column 4: Community & Back to Top */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">Community</h4>
            <div className="flex items-center gap-2">
              <a href="#" className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-zinc-800 transition-colors w-full justify-center"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
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
