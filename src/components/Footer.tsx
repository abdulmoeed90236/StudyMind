import React, { useState } from 'react';
import { Brain, Send, CheckCircle2, Github, Twitter, Linkedin, MessageSquare, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
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

  return (
    <footer className="bg-zinc-950 border-t border-emerald-950 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-950">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <Brain className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                StudyMind<span className="text-emerald-400">AI</span>
              </span>
            </a>

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
                  placeholder="Enter your student email..."
                  className="flex-1 bg-zinc-900 border border-emerald-500/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold transition-colors flex items-center gap-1"
                >
                  {subscribed ? <CheckCircle2 className="w-3.5 h-3.5 text-black" /> : <Send className="w-3.5 h-3.5 text-black" />}
                  <span>{subscribed ? 'Subscribed' : 'Join'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Product Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Instant Document Summarizer</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Explain Like I'm 5 (ELI5)</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Smart Flashcards & Anki</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">24/7 Contextual AI Tutor</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">OCR Handwritten Note Scanner</a></li>
            </ul>
          </div>

          {/* Column 3: Resources & Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#playground" className="hover:text-emerald-400 transition-colors">Live AI Sandbox</a></li>
              <li><a href="#testimonials" className="hover:text-emerald-400 transition-colors">Student Case Studies</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Student Pricing & Aid</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ & Support</a></li>
            </ul>
          </div>

          {/* Column 4: Trust & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-zinc-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[11px] text-slate-400 pt-2">
              Privacy First. All uploaded study notes are encrypted in transit and never used to train public LLM models.
            </p>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} StudyMind AI, Inc. Built with passion for students everywhere.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Academic Integrity Policy</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
