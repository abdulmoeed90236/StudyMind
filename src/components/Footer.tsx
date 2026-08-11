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
    <footer className="bg-[#040914] border-t border-amber-500/20 pt-16 pb-12 text-zinc-400 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-amber-500/20">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 text-left focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                <div className="w-full h-full bg-[#040914] rounded-[10px] flex items-center justify-center">
                  <Brain className="w-4 h-4 text-amber-400 animate-pulse" />
                </div>
              </div>
              <span className="text-lg font-black uppercase text-white tracking-wider font-sans">
                STUDYMIND<span className="text-gold-gradient text-gold-bright">AI</span>
              </span>
            </button>

            <p className="text-zinc-300 leading-relaxed max-w-sm">
              Next-generation Quantum AI study assistant for ambitious scholars. Summarize lecture notes, explain complex concepts with metaphors, and auto-generate exam decks in seconds.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <span className="text-xs font-extrabold uppercase text-white block mb-2 font-mono">
                Join 50,000+ scholars getting Quantum AI Study Hacks:
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter student email..."
                  className="flex-1 bg-[#081220] border border-amber-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="submit"
                  className="btn-quantum-gold px-4 py-2 rounded-xl text-xs uppercase flex items-center gap-1.5 shrink-0"
                >
                  {subscribed ? <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" /> : <Send className="w-3.5 h-3.5 text-slate-950" />}
                  <span>{subscribed ? 'Subscribed' : 'Join'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Pages Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider font-mono">Pages</h4>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => handleNav('home')} className="hover:text-amber-300 transition-colors text-left">Home Overview</button></li>
              <li><button onClick={() => handleNav('features')} className="hover:text-amber-300 transition-colors text-left">Features Explorer</button></li>
              <li><button onClick={() => handleNav('how-it-works')} className="hover:text-amber-300 transition-colors text-left">Steps & Workflow</button></li>
              <li><button onClick={() => handleNav('playground')} className="hover:text-amber-300 transition-colors text-left">Live AI Sandbox</button></li>
              <li><button onClick={() => handleNav('testimonials')} className="hover:text-amber-300 transition-colors text-left">Scholar Reviews</button></li>
            </ul>
          </div>

          {/* Column 3: Resources & Plans */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider font-mono">Plans & Support</h4>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => handleNav('pricing')} className="hover:text-amber-300 transition-colors text-left">Quantum Passes</button></li>
              <li><button onClick={() => handleNav('faq')} className="hover:text-amber-300 transition-colors text-left">FAQ & Support</button></li>
              <li><button onClick={() => onOpenAuth?.('signup')} className="hover:text-amber-300 transition-colors text-left">Get Started Free</button></li>
              <li><button onClick={() => onOpenAuth?.('login')} className="hover:text-amber-300 transition-colors text-left">Student Login</button></li>
            </ul>
          </div>

          {/* Column 4: Community & Back to Top */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider font-mono">Community</h4>
            <div className="flex items-center gap-2">
              <a href="#" className="p-2 rounded-xl bg-[#081220] border border-amber-500/20 text-zinc-400 hover:text-amber-300 hover:border-amber-400/50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#081220] border border-amber-500/20 text-zinc-400 hover:text-amber-300 hover:border-amber-400/50 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#081220] border border-amber-500/20 text-zinc-400 hover:text-amber-300 hover:border-amber-400/50 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#081220] border border-amber-500/20 text-zinc-400 hover:text-amber-300 hover:border-amber-400/50 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#081220] border border-amber-500/30 text-amber-300 font-bold font-mono uppercase tracking-wider hover:bg-amber-400/10 transition-colors w-full justify-center"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 font-mono">
          <p>© {new Date().getFullYear()} StudyMind AI, Inc. Built for competitive high-achievers.</p>
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

