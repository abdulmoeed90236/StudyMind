import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Lock, Mail, GraduationCap, Brain, Eye, EyeOff, Loader2, UserPlus, LogIn } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  planName?: string;
  onSuccess?: (userEmail: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  planName,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [university, setUniversity] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync mode whenever modal opens or initialMode prop changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg('');
      setShowPassword(false);
      setSubmitted(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSwitchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setErrorMsg('');
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, university }),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.error || `Authentication failed (${res.status}). Please try again.`);
      }

      const activeEmail = data.user?.email || email.trim();
      if (data.token) {
        localStorage.setItem('quantum_token', data.token);
        if (activeEmail) {
          localStorage.setItem('quantum_user_email', activeEmail);
        }
      }

      setSubmitted(true);
      if (onSuccess && activeEmail) {
        onSuccess(activeEmail);
      }
    } catch (err: any) {
      console.error('Auth Error:', err);
      setErrorMsg(err.message || 'Authentication error. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
    if (onSuccess && email) {
      onSuccess(email.trim());
    }
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
              {/* Header Badge */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#040914] text-amber-300 text-xs font-mono font-bold mb-2 border border-amber-400/40 uppercase tracking-widest">
                  <Brain className="w-3.5 h-3.5 text-amber-400" />
                  <span>{planName ? `Selected Plan: ${planName}` : 'Student Academic Copilot'}</span>
                </div>

                <h3 className="text-2xl font-black uppercase text-white font-sans">
                  {mode === 'signup' ? 'Create Free Account' : 'Welcome Back'}
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  {mode === 'signup'
                    ? 'Start summarizing PDFs and acing your exams in under 60 seconds.'
                    : 'Sign in to access your saved course notes and flashcard decks.'}
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex p-1 mb-4 rounded-xl bg-[#040914] border border-amber-500/30">
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signup')}
                  className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'signup'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'text-zinc-400 hover:text-amber-300'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up Free</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'login'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'text-zinc-400 hover:text-amber-300'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono flex flex-col gap-1.5">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 text-red-400 font-bold">⚠️</span>
                    <span>{errorMsg}</span>
                  </div>
                  {errorMsg.toLowerCase().includes('already exists') && (
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('login')}
                      className="self-start text-xs font-bold text-amber-300 underline uppercase tracking-wider pl-5 hover:text-amber-200"
                    >
                      → Click here to Sign In instead
                    </button>
                  )}
                </div>
              )}

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
                        onChange={(e) => {
                          setUniversity(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="e.g. Stanford University"
                        className="w-full bg-[#040914] border border-amber-500/30 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="alex@university.edu"
                      className="w-full bg-[#040914] border border-amber-500/30 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
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
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="••••••••••••"
                      className="w-full bg-[#040914] border border-amber-500/30 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-zinc-400 hover:text-amber-300 p-1 rounded transition-colors focus:outline-none"
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                      aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-zinc-400 hover:text-amber-300" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-quantum-gold w-full py-3 mt-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                      <span>Processing Account...</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === 'signup' ? 'Create Free Account' : 'Sign In Now'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </form>

              {/* Mode Toggle Footer */}
              <div className="mt-5 text-center text-xs text-zinc-400 font-mono">
                {mode === 'signup' ? (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('login')}
                      className="text-amber-300 font-bold uppercase tracking-wider hover:underline ml-1"
                    >
                      Sign In Here
                    </button>
                  </p>
                ) : (
                  <p>
                    New to StudyMind AI?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('signup')}
                      className="text-amber-300 font-bold uppercase tracking-wider hover:underline ml-1"
                    >
                      Create Account Free
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


