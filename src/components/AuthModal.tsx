import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Lock, Mail, GraduationCap, Brain } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  planName?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  planName
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040914]/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md glass-quantum-panel border border-amber-400/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        >
          {/* Background Gradient Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#040914] border border-amber-500/20 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#040914] text-amber-300 text-xs font-mono font-bold mb-3 border border-amber-400/40 uppercase tracking-widest">
                  <Brain className="w-3.5 h-3.5 text-amber-400" />
                  <span>{planName ? `Selected Plan: ${planName}` : 'Student Academic Copilot'}</span>
                </div>

                <h3 className="text-2xl font-black uppercase text-white font-sans">
                  {mode === 'signup' ? 'Create Your Free Quantum Pass' : 'Welcome Back'}
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  {mode === 'signup'
                    ? 'Start summarizing PDFs and acing your exams in under 60 seconds.'
                    : 'Sign in to access your saved course notes and flashcard decks.'}
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2.5 mb-5 font-mono">
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#040914] border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google Student Account</span>
                </button>
              </div>

              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-500/20" />
                </div>
                <span className="relative bg-[#081220] px-3 text-[10px] text-amber-400/80 uppercase font-mono font-bold rounded-md border border-amber-500/20">
                  Or with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 font-mono">
                {mode === 'signup' && (
                  <div>
                    <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                      University or School Name (Optional)
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="e.g. Stanford University"
                        className="w-full bg-[#040914] border border-amber-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                    Student Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@university.edu"
                      className="w-full bg-[#040914] border border-amber-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#040914] border border-amber-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-quantum-gold w-full py-3 mt-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>{mode === 'signup' ? 'Create Free Account' : 'Sign In Now'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </form>

              {/* Mode Toggle */}
              <div className="mt-5 text-center text-xs text-zinc-400 font-mono">
                {mode === 'signup' ? (
                  <p>
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-amber-300 font-bold uppercase tracking-wider hover:underline"
                    >
                      Log In
                    </button>
                  </p>
                ) : (
                  <p>
                    New to StudyMind AI?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-amber-300 font-bold uppercase tracking-wider hover:underline"
                    >
                      Sign Up Free
                    </button>
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Success Confirmation View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#040914] border border-amber-400/50 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <CheckCircle2 className="w-8 h-8 text-amber-400" />
              </div>

              <h3 className="text-2xl font-black uppercase text-white font-sans">
                WELCOME TO STUDYMIND AI! ⚡
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
                Your account is ready! We&apos;ve unlocked your Quantum workspace with free PDF summaries and unlimited flashcards.
              </p>

              <div className="pt-4 space-y-2 font-mono">
                <button
                  onClick={handleReset}
                  className="btn-quantum-gold w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider"
                >
                  Launch Quantum Workspace
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

