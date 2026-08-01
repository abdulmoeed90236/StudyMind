import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Play, FileText, Lightbulb, Layers, Bot, Star, CheckCircle2, ShieldCheck, Zap, BookOpen, Clock, Award } from 'lucide-react';
import { UNIVERSITIES, SAMPLE_STUDY_NOTES } from '../data/mockData';

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'explain' | 'flashcards' | 'tutor'>('summary');
  const [sampleIndex, setSampleIndex] = useState(0);

  const sample = SAMPLE_STUDY_NOTES[sampleIndex];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-glow">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-700/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-900/40 mb-6 glow-border"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>✨ Next-Gen AI Academic Copilot for Students</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold border border-emerald-500/40">
              v2.5 Live
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Ace Your Exams in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-white">
              Half the Time
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal"
          >
            StudyMind AI turns 50-page PDFs into 5-minute executive summaries, generates active-recall flashcards, and explains tough concepts like you&apos;re 5.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-cta-start"
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <span>Try for Free</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-cta-demo"
              onClick={onOpenDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-zinc-900/90 border border-emerald-500/30 hover:bg-zinc-800 hover:border-emerald-400 transition-all duration-300 backdrop-blur-md"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Watch Interactive Demo</span>
            </button>
          </motion.div>

          {/* Micro Stats & Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex text-emerald-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-200">4.9/5</span>
              <span>(12,000+ Students)</span>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Academic Privacy</span>
            </div>
          </motion.div>

          {/* University Logos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 pt-6 border-t border-emerald-950/60 w-full"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400/80 mb-4">
              Trusted by Top Students at 500+ World-Class Universities
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80 hover:opacity-100 transition-opacity">
              {UNIVERSITIES.map((uni) => (
                <span
                  key={uni.name}
                  className="text-xs sm:text-sm font-bold text-slate-300 tracking-wider hover:text-emerald-300 transition-colors"
                >
                  {uni.logoText}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mock Product UI Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl glass-card border border-emerald-500/30 p-2 sm:p-4 shadow-2xl shadow-emerald-950/80">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-white/20 rounded-2xl blur-xl opacity-50 -z-10" />

            {/* Window Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-950/80 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-emerald-400/80 font-mono hidden sm:inline-block">
                  study_mind_copilot_preview.v2
                </span>
              </div>

              {/* Sample Topic Selector */}
              <div className="flex items-center gap-1.5 bg-zinc-950 border border-emerald-500/30 rounded-lg p-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider px-2 font-medium hidden xs:inline">
                  Select Topic:
                </span>
                {SAMPLE_STUDY_NOTES.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setSampleIndex(idx)}
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      sampleIndex === idx
                        ? 'bg-emerald-500 text-black shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Feature Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4 p-1 bg-zinc-950 rounded-xl border border-emerald-500/30">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'summary'
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Instant Summary</span>
              </button>

              <button
                onClick={() => setActiveTab('explain')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'explain'
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-900'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Explain Like I'm 5</span>
              </button>

              <button
                onClick={() => setActiveTab('flashcards')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'flashcards'
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Smart Flashcards</span>
              </button>

              <button
                onClick={() => setActiveTab('tutor')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'tutor'
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-900'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>24/7 AI Tutor</span>
              </button>
            </div>

            {/* Preview Card Content Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 bg-zinc-950 rounded-xl border border-emerald-500/20 min-h-[320px]">
              {/* Left Column: Raw Source Material */}
              <div className="lg:col-span-5 bg-zinc-900/90 p-4 rounded-lg border border-emerald-500/20 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    Source Lecture Document
                  </span>
                  <span className="text-[10px] bg-zinc-950 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                    PDF (12 Pages)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{sample.title}</h4>
                <div className="text-xs text-slate-300/90 leading-relaxed bg-zinc-950 p-3 rounded border border-emerald-500/20 font-mono overflow-y-auto max-h-[220px]">
                  {sample.rawText}
                </div>
                <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-emerald-950">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Clock className="w-3 h-3" /> {sample.summary.timeSaved}
                  </span>
                  <span className="text-slate-400">Processing Speed: 0.4s</span>
                </div>
              </div>

              {/* Right Column: AI Output */}
              <div className="lg:col-span-7 bg-zinc-900/90 p-4 rounded-lg border border-emerald-500/30 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 pointer-events-none opacity-20">
                  <Zap className="w-20 h-20 text-emerald-500" />
                </div>

                <AnimatePresence mode="wait">
                  {/* TAB 1: SUMMARY */}
                  {activeTab === 'summary' && (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Executive AI Key Takeaways
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-extrabold border border-emerald-500/30">
                            99.8% Accuracy
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-200">
                          {sample.summary.keyTakeaways.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 bg-zinc-950 p-2 rounded border border-emerald-500/20">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[11px] font-semibold text-slate-400 mb-1.5 block">
                          Core Terms & Formulas Extracted:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sample.summary.coreFormulasOrTerms.map((term, i) => (
                            <span key={i} className="text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2 py-1 rounded">
                              {term}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: ELI5 */}
                  {activeTab === 'explain' && (
                    <motion.div
                      key="explain"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                            Intuitive Analogy Explanation
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                            Simple Analogy Mode
                          </span>
                        </div>
                        <div className="bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-lg text-xs text-emerald-100 leading-relaxed">
                          {sample.eli5Explanation}
                        </div>
                      </div>

                      <div className="bg-zinc-950 p-3 rounded border border-emerald-500/20">
                        <span className="text-[11px] font-semibold text-emerald-400 block mb-1">
                          💡 Why students love this:
                        </span>
                        <p className="text-xs text-slate-300">
                          Replaces confusing academic jargon with visual mental models so you grasp concepts in seconds before exams.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: FLASHCARDS */}
                  {activeTab === 'flashcards' && (
                    <motion.div
                      key="flashcards"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-emerald-400" /> Auto-Generated Spaced Flashcards
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                            Anki Ready
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sample.flashcards.slice(0, 2).map((fc, i) => (
                            <div key={i} className="bg-zinc-950 p-3 rounded-lg border border-emerald-500/20 space-y-1">
                              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                                <span>CARD #{i + 1}</span>
                                <span className="text-emerald-400">{fc.difficulty}</span>
                              </div>
                              <p className="text-xs text-white font-medium">Q: {fc.question}</p>
                              <p className="text-[11px] text-emerald-300 pt-1 border-t border-emerald-950">
                                A: {fc.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: AI TUTOR */}
                  {activeTab === 'tutor' && (
                    <motion.div
                      key="tutor"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                            <Bot className="w-3.5 h-3.5 text-emerald-400" /> Contextual AI Tutor Chat
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                            Course Grounded
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-emerald-500/20 text-xs text-slate-200">
                            <span className="text-emerald-400 font-bold block text-[10px]">STUDENT:</span>
                            {sample.tutorAnswers[0].question}
                          </div>
                          <div className="bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-500/30 text-xs text-white">
                            <span className="text-emerald-300 font-bold text-[10px] flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-400" /> STUDYMIND AI TUTOR:
                            </span>
                            {sample.tutorAnswers[0].answer}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Interactive CTA */}
                <div className="mt-3 pt-3 border-t border-emerald-950 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Want to try with your own course materials?
                  </span>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
                  >
                    <span>Upload Notes Free</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
