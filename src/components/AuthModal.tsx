import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Lock, Mail, User, GraduationCap, Brain } from 'lucide-react';

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/90 text-white overflow-hidden"
        >
          {/* Background Gradient Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-950 border border-emerald-500/20 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30">
                  <Brain className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{planName ? `Selected Plan: ${planName}` : 'Student Academic Copilot'}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  {mode === 'signup' ? 'Create Your Free Account' : 'Welcome Back'}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {mode === 'signup'
                    ? 'Start summarizing PDFs and acing your exams in under 60 seconds.'
                    : 'Sign in to access your saved course notes and flashcard decks.'}
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2.5 mb-5">
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 border border-emerald-500/30 hover:border-emerald-400 text-xs font-bold text-slate-200 transition-colors flex items-center justify-center gap-2"
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
                  <div className="w-full border-t border-emerald-950" />
                </div>
                <span className="relative bg-zinc-900 px-3 text-[10px] text-slate-400 uppercase font-bold">
                  Or with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === 'signup' && (
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      University or School Name (Optional)
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="e.g. Stanford University"
                        className="w-full bg-zinc-950 border border-emerald-500/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Student Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@university.edu"
                      className="w-full bg-zinc-950 border border-emerald-500/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-zinc-950 border border-emerald-500/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-2 rounded-xl text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>{mode === 'signup' ? 'Create Free Account' : 'Sign In Now'}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </form>

              {/* Mode Toggle */}
              <div className="mt-5 text-center text-xs text-slate-400">
                {mode === 'signup' ? (
                  <p>
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      Log In
                    </button>
                  </p>
                ) : (
                  <p>
                    New to StudyMind AI?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-emerald-400 font-bold hover:underline"
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
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <h3 className="text-2xl font-extrabold text-white">
                Welcome to StudyMind AI! 🎉
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Your account is ready! We&apos;ve unlocked your workspace with 5 free PDF summaries and unlimited flashcards.
              </p>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors"
                >
                  Launch Study Dashboard
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
