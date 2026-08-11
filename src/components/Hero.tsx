import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, FileText, Lightbulb, Layers, Bot, Star, CheckCircle2, ShieldCheck, Zap, BookOpen, Clock, Award, Brain, Cpu, Sparkles } from 'lucide-react';
import { UNIVERSITIES, SAMPLE_STUDY_NOTES } from '../data/mockData';
import { QuantumCanvas3D } from './QuantumCanvas3D';
import { QuantumBrain3D } from './QuantumBrain3D';

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'explain' | 'flashcards' | 'tutor'>('summary');
  const [sampleIndex, setSampleIndex] = useState(0);

  const sample = SAMPLE_STUDY_NOTES[sampleIndex];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#040914] bg-quantum-ambient">
      {/* 3D Interactive WebGL Quantum Particle Field */}
      <QuantumCanvas3D interactive={true} />

      {/* Undulating Gold/Amber Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Floating Quantum Gold Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#081220]/90 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.25)] mb-6 glow-gold-border max-w-full text-center backdrop-blur-xl"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
            <span className="truncate">STUDYMIND AI · QUANTUM TECH GOLD EDITION</span>
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 font-sans">
              PRO 3.0
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.05] font-sans"
          >
            ACE YOUR EXAMS IN <br className="hidden sm:inline" />
            <span className="text-gold-gradient text-gold-bright tracking-wider">
              HALF THE TIME.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal"
          >
            Transform 50-page textbooks, lecture slides, and scanned PDFs into high-yield summaries, spaced-repetition flashcards, and 24/7 AI tutor guidance in seconds.
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
              className="btn-quantum-gold w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider group"
            >
              <span>CLAIM FREE GOLD PASS</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-cta-demo"
              onClick={onOpenDemo}
              className="btn-quantum-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
                <Play className="w-3 h-3 fill-current ml-0.5 text-amber-400" />
              </div>
              <span>3D GAMEPLAY WALKTHROUGH</span>
            </button>
          </motion.div>

          {/* Micro Stats & Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-zinc-400 font-mono"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white font-sans">4.98/5 RATING</span>
              <span>(24,000+ SCHOLARS)</span>
            </div>
            <div className="hidden sm:block text-zinc-700">•</div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant AI Drop-In</span>
            </div>
            <div className="hidden sm:block text-zinc-700">•</div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Syllabus Accuracy Guarantee</span>
            </div>
          </motion.div>

          {/* University Logos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 pt-6 border-t border-amber-500/20 w-full"
          >
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400/70 mb-4">
              POWERING TOP ACADEMIC INSTITUTIONS WORLDWIDE
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 hover:opacity-100 transition-opacity">
              {UNIVERSITIES.map((uni) => (
                <span
                  key={uni.name}
                  className="text-xs sm:text-sm font-extrabold uppercase text-zinc-400 tracking-wider hover:text-amber-300 transition-colors"
                >
                  {uni.logoText}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quantum Tech Gold Interactive Panel HUD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl glass-quantum-panel p-3 sm:p-5 shadow-2xl border border-amber-400/30">
            {/* Window Top Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-3 mb-3 border-b border-amber-500/20 px-2 gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs text-amber-400 font-mono hidden xs:inline-block uppercase tracking-wider font-bold">
                  QUANTUM_STUDY_INTERFACE_V3.8
                </span>
              </div>

              {/* Sample Topic Selector */}
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1 bg-[#040914] border border-amber-500/20 rounded-lg p-1 w-full sm:w-auto">
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider px-1.5 font-bold hidden md:inline">
                  SELECT SUBJECT:
                </span>
                {SAMPLE_STUDY_NOTES.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setSampleIndex(idx)}
                    className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider transition-all font-mono ${
                      sampleIndex === idx
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'text-zinc-400 hover:text-white hover:bg-amber-500/10'
                    }`}
                  >
                    {item.subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Scenario Sub-View Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 p-1.5 bg-[#040914] rounded-xl border border-amber-500/20">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 sm:px-3 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === 'summary'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.5)]'
                    : 'text-zinc-300 hover:text-white hover:bg-amber-500/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">EXECUTIVE INTEL</span>
              </button>

              <button
                onClick={() => setActiveTab('explain')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 sm:px-3 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === 'explain'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.5)]'
                    : 'text-zinc-300 hover:text-white hover:bg-amber-500/10'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">3D NEURAL BRAIN</span>
              </button>

              <button
                onClick={() => setActiveTab('flashcards')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 sm:px-3 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === 'flashcards'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.5)]'
                    : 'text-zinc-300 hover:text-white hover:bg-amber-500/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">SPACED CARDS</span>
              </button>

              <button
                onClick={() => setActiveTab('tutor')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 sm:px-3 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === 'tutor'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.5)]'
                    : 'text-zinc-300 hover:text-white hover:bg-amber-500/10'
                }`}
              >
                <Bot className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">QUANTUM AI TUTOR</span>
              </button>
            </div>

            {/* Preview Card Content Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 bg-[#040914] rounded-xl border border-amber-500/20 min-h-[340px]">
              {/* Left Column: Raw Source Material */}
              <div className="lg:col-span-5 bg-[#081220] p-4 rounded-xl border border-amber-500/20 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    SOURCE DOSSIER
                  </span>
                  <span className="text-[10px] bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-400/30 uppercase font-bold">
                    48 PAGES PARSED
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{sample.title}</h4>
                <div className="text-xs text-zinc-300 leading-relaxed bg-[#040914] p-3 rounded-lg border border-amber-500/20 font-mono overflow-y-auto max-h-[220px]">
                  {sample.rawText}
                </div>
                <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-zinc-400 border-t border-amber-500/20 font-mono">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Clock className="w-3 h-3 text-amber-400" /> {sample.summary.timeSaved} SAVED
                  </span>
                  <span className="text-amber-300/70 font-mono">LATENCY: 0.14s</span>
                </div>
              </div>

              {/* Right Column: AI Output Scenarios */}
              <div className="lg:col-span-7 bg-[#081220] p-4 rounded-xl border border-amber-500/20 flex flex-col relative overflow-hidden">
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
                          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                            <Brain className="w-3.5 h-3.5 text-amber-400" /> EXECUTIVE INTEL TAKEAWAYS
                          </span>
                          <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                            100% SYLLABUS GROUNDED
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-200">
                          {sample.summary.keyTakeaways.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 bg-[#040914] p-2.5 rounded-lg border border-amber-500/20">
                              <span className="text-amber-400 font-extrabold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-amber-400/80 mb-1.5 block">
                          CORE FORMULAS & TARGET DEFINITIONS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sample.summary.coreFormulasOrTerms.map((term, i) => (
                            <span key={i} className="text-[10px] font-mono bg-[#040914] border border-amber-400/40 text-amber-300 px-2 py-1 rounded-md">
                              {term}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: 3D NEURAL BRAIN */}
                  {activeTab === 'explain' && (
                    <motion.div
                      key="explain"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <QuantumBrain3D />
                      <div className="bg-[#040914] p-2.5 rounded-lg border border-amber-400/30 text-xs text-zinc-300 font-mono flex items-center justify-between">
                        <span>3D MESH RECALL ENGINE</span>
                        <span className="text-amber-400 font-bold">+340% EXAM ACCURACY</span>
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
                          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-amber-400" /> SPACED REPETITION CARDS
                          </span>
                          <span className="text-[10px] bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded font-mono font-bold border border-amber-400/30 uppercase">
                            ANKI & QUIZLET SYNC
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sample.flashcards.slice(0, 2).map((fc, i) => (
                            <div key={i} className="bg-[#040914] p-3 rounded-lg border border-amber-500/20 space-y-1">
                              <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase font-mono">
                                <span>CARD #{i + 1}</span>
                                <span className="text-amber-400">{fc.difficulty}</span>
                              </div>
                              <p className="text-xs text-white font-medium">Q: {fc.question}</p>
                              <p className="text-[11px] text-amber-300 pt-1 border-t border-amber-500/20 font-mono">
                                A: {fc.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: QUANTUM AI TUTOR */}
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
                          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                            <Bot className="w-3.5 h-3.5 text-amber-400" /> 24/7 QUANTUM AI TUTOR
                          </span>
                          <span className="text-[10px] bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded font-mono font-bold border border-amber-400/30 uppercase">
                            ZERO HALLUCINATIONS
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="bg-[#040914] p-2.5 rounded-lg border border-amber-500/20 text-xs text-zinc-200 font-mono">
                            <span className="text-amber-400 font-bold block text-[10px]">STUDENT:</span>
                            {sample.tutorAnswers[0].question}
                          </div>
                          <div className="bg-[#040914] p-2.5 rounded-lg border border-amber-400/40 text-xs text-zinc-200">
                            <span className="text-amber-400 font-extrabold text-[10px] flex items-center gap-1 font-mono">
                              <Bot className="w-3 h-3 text-amber-400" /> QUANTUM AI TUTOR:
                            </span>
                            {sample.tutorAnswers[0].answer}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Interactive CTA */}
                <div className="mt-3 pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Want to test your own syllabus or textbook PDF?
                  </span>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono shrink-0"
                  >
                    <span>DROP IN YOUR SLIDES FREE</span>
                    <ArrowRight className="w-3 h-3 text-amber-400" />
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

