import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, FileText, Lightbulb, Layers, Bot, Star, CheckCircle2, ShieldCheck, Zap, BookOpen, Clock, Award, Brain } from 'lucide-react';
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A6B5D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#C85A32]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E6E1DA] text-[#4A6B5D] text-xs font-bold shadow-xs mb-6 glow-border max-w-full text-center"
          >
            <Zap className="w-3.5 h-3.5 text-[#4A6B5D] shrink-0" />
            <span className="truncate">Next-Gen Academic Copilot for Students</span>
            <span className="bg-[#4A6B5D]/10 text-[#4A6B5D] px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold border border-[#4A6B5D]/20 shrink-0">
              v2.5 Live
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2D2B2A] leading-[1.1]"
          >
            Ace Your Exams in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A6B5D] via-[#3D5A4E] to-[#C85A32]">
              Half the Time
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-[#736E65] max-w-2xl leading-relaxed font-normal"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-extrabold text-white bg-[#4A6B5D] hover:bg-[#3D5A4E] shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <span>Try for Free</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-cta-demo"
              onClick={onOpenDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-[#2D2B2A] bg-[#FFFFFF] border border-[#E6E1DA] hover:bg-[#F3EFEA] hover:border-[#4A6B5D] transition-all duration-300 shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#4A6B5D]/10 flex items-center justify-center text-[#4A6B5D]">
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
            className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#736E65]"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex text-[#C85A32]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C85A32] text-[#C85A32]" />
                ))}
              </div>
              <span className="font-semibold text-[#2D2B2A]">4.9/5</span>
              <span>(12,000+ Students)</span>
            </div>
            <div className="hidden sm:block text-[#E6E1DA]">•</div>
            <div className="flex items-center gap-1.5 text-[#736E65]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B5D]" />
              <span>No Credit Card Required</span>
            </div>
            <div className="hidden sm:block text-[#E6E1DA]">•</div>
            <div className="flex items-center gap-1.5 text-[#736E65]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B5D]" />
              <span>100% Academic Privacy</span>
            </div>
          </motion.div>

          {/* University Logos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 pt-6 border-t border-[#E6E1DA] w-full"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#736E65] mb-4">
              Trusted by Top Students at 500+ World-Class Universities
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80 hover:opacity-100 transition-opacity">
              {UNIVERSITIES.map((uni) => (
                <span
                  key={uni.name}
                  className="text-xs sm:text-sm font-bold text-[#736E65] tracking-wider hover:text-[#4A6B5D] transition-colors"
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
          <div className="relative rounded-2xl glass-card border border-[#E6E1DA] p-2 sm:p-4 shadow-sm bg-[#FFFFFF]">
            {/* Window Top Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-3 mb-3 border-b border-[#E6E1DA] px-2 gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C85A32]/60" />
                <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
                <div className="w-3 h-3 rounded-full bg-[#4A6B5D]/60" />
                <span className="ml-2 text-xs text-[#736E65] font-mono hidden xs:inline-block">
                  study_mind_copilot_preview.v2
                </span>
              </div>

              {/* Sample Topic Selector */}
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1 bg-[#FBF9F5] border border-[#E6E1DA] rounded-xl p-1 w-full sm:w-auto">
                <span className="text-[10px] text-[#736E65] uppercase tracking-wider px-1.5 font-medium hidden md:inline">
                  Topic:
                </span>
                {SAMPLE_STUDY_NOTES.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setSampleIndex(idx)}
                    className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      sampleIndex === idx
                        ? 'bg-[#4A6B5D] text-white shadow-xs'
                        : 'text-[#736E65] hover:text-[#2D2B2A]'
                    }`}
                  >
                    {item.subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Feature Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4 p-1 bg-[#FBF9F5] rounded-xl border border-[#E6E1DA]">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'summary'
                    ? 'bg-[#4A6B5D] text-white shadow-xs'
                    : 'text-[#736E65] hover:text-[#2D2B2A] hover:bg-[#F3EFEA]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Summary</span>
              </button>

              <button
                onClick={() => setActiveTab('explain')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'explain'
                    ? 'bg-[#4A6B5D] text-white shadow-xs'
                    : 'text-[#736E65] hover:text-[#2D2B2A] hover:bg-[#F3EFEA]'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Explain (ELI5)</span>
              </button>

              <button
                onClick={() => setActiveTab('flashcards')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'flashcards'
                    ? 'bg-[#4A6B5D] text-white shadow-xs'
                    : 'text-[#736E65] hover:text-[#2D2B2A] hover:bg-[#F3EFEA]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Flashcards</span>
              </button>

              <button
                onClick={() => setActiveTab('tutor')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'tutor'
                    ? 'bg-[#4A6B5D] text-white shadow-xs'
                    : 'text-[#736E65] hover:text-[#2D2B2A] hover:bg-[#F3EFEA]'
                }`}
              >
                <Bot className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">AI Tutor</span>
              </button>
            </div>

            {/* Preview Card Content Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 bg-[#FBF9F5] rounded-xl border border-[#E6E1DA] min-h-[320px]">
              {/* Left Column: Raw Source Material */}
              <div className="lg:col-span-5 bg-[#FFFFFF] p-4 rounded-xl border border-[#E6E1DA] flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#4A6B5D] uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#4A6B5D]" />
                    Source Lecture Document
                  </span>
                  <span className="text-[10px] bg-[#F3EFEA] text-[#4A6B5D] px-2 py-0.5 rounded font-mono border border-[#E6E1DA]">
                    PDF (12 Pages)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#2D2B2A] mb-2">{sample.title}</h4>
                <div className="text-xs text-[#2D2B2A] leading-relaxed bg-[#FBF9F5] p-3 rounded-lg border border-[#E6E1DA] font-mono overflow-y-auto max-h-[220px]">
                  {sample.rawText}
                </div>
                <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-[#736E65] border-t border-[#E6E1DA]">
                  <span className="flex items-center gap-1 text-[#4A6B5D] font-semibold">
                    <Clock className="w-3 h-3" /> {sample.summary.timeSaved}
                  </span>
                  <span className="text-[#736E65]">Processing Speed: 0.4s</span>
                </div>
              </div>

              {/* Right Column: AI Output */}
              <div className="lg:col-span-7 bg-[#FFFFFF] p-4 rounded-xl border border-[#E6E1DA] flex flex-col relative overflow-hidden">
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
                          <span className="text-xs font-bold text-[#4A6B5D] flex items-center gap-1.5">
                            <Brain className="w-3.5 h-3.5 text-[#4A6B5D]" /> Executive AI Key Takeaways
                          </span>
                          <span className="text-[10px] bg-[#4A6B5D]/10 text-[#4A6B5D] px-2 py-0.5 rounded-full font-extrabold border border-[#4A6B5D]/20">
                            99.8% Accuracy
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs text-[#2D2B2A]">
                          {sample.summary.keyTakeaways.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 bg-[#FBF9F5] p-2.5 rounded-lg border border-[#E6E1DA]">
                              <span className="text-[#C85A32] font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[11px] font-semibold text-[#736E65] mb-1.5 block">
                          Core Terms & Formulas Extracted:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sample.summary.coreFormulasOrTerms.map((term, i) => (
                            <span key={i} className="text-[10px] font-mono bg-[#FBF9F5] border border-[#E6E1DA] text-[#4A6B5D] px-2 py-1 rounded-lg">
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
                          <span className="text-xs font-bold text-[#4A6B5D] flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-[#4A6B5D]" />
                            Intuitive Analogy Explanation
                          </span>
                          <span className="text-[10px] bg-[#C85A32]/10 text-[#C85A32] px-2 py-0.5 rounded-full font-bold border border-[#C85A32]/20">
                            Simple Analogy Mode
                          </span>
                        </div>
                        <div className="bg-[#FBF9F5] border border-[#4A6B5D]/30 p-3.5 rounded-xl text-xs text-[#2D2B2A] leading-relaxed">
                          {sample.eli5Explanation}
                        </div>
                      </div>

                      <div className="bg-[#FBF9F5] p-3 rounded-xl border border-[#E6E1DA]">
                        <span className="text-[11px] font-semibold text-[#4A6B5D] block mb-1">
                          💡 Why students love this:
                        </span>
                        <p className="text-xs text-[#736E65]">
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
                          <span className="text-xs font-bold text-[#4A6B5D] flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#4A6B5D]" /> Auto-Generated Spaced Flashcards
                          </span>
                          <span className="text-[10px] bg-[#4A6B5D]/10 text-[#4A6B5D] px-2 py-0.5 rounded-full font-bold border border-[#4A6B5D]/20">
                            Anki Ready
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sample.flashcards.slice(0, 2).map((fc, i) => (
                            <div key={i} className="bg-[#FBF9F5] p-3 rounded-xl border border-[#E6E1DA] space-y-1">
                              <div className="flex justify-between text-[10px] text-[#736E65] font-semibold">
                                <span>CARD #{i + 1}</span>
                                <span className="text-[#4A6B5D]">{fc.difficulty}</span>
                              </div>
                              <p className="text-xs text-[#2D2B2A] font-medium">Q: {fc.question}</p>
                              <p className="text-[11px] text-[#C85A32] pt-1 border-t border-[#E6E1DA]">
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
                          <span className="text-xs font-bold text-[#4A6B5D] flex items-center gap-1.5">
                            <Bot className="w-3.5 h-3.5 text-[#4A6B5D]" /> Contextual AI Tutor Chat
                          </span>
                          <span className="text-[10px] bg-[#4A6B5D]/10 text-[#4A6B5D] px-2 py-0.5 rounded-full font-bold border border-[#4A6B5D]/20">
                            Course Grounded
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="bg-[#FBF9F5] p-2.5 rounded-xl border border-[#E6E1DA] text-xs text-[#2D2B2A]">
                            <span className="text-[#4A6B5D] font-bold block text-[10px]">STUDENT:</span>
                            {sample.tutorAnswers[0].question}
                          </div>
                          <div className="bg-[#F3EFEA] p-2.5 rounded-xl border border-[#4A6B5D]/30 text-xs text-[#2D2B2A]">
                            <span className="text-[#4A6B5D] font-bold text-[10px] flex items-center gap-1">
                              <Bot className="w-3 h-3 text-[#4A6B5D]" /> STUDYMIND AI TUTOR:
                            </span>
                            {sample.tutorAnswers[0].answer}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Interactive CTA */}
                <div className="mt-3 pt-3 border-t border-[#E6E1DA] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                  <span className="text-[11px] text-[#736E65]">
                    Want to try with your own course materials?
                  </span>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="text-xs font-bold text-[#4A6B5D] hover:text-[#3D5A4E] flex items-center gap-1 hover:underline shrink-0"
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
