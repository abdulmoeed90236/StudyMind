import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Sliders, Trophy, ArrowRight, CheckCircle2, Sparkles, FileUp, Mic, Image as ImageIcon, Zap, Cpu, Award } from 'lucide-react';

interface HowItWorksProps {
  onOpenAuth: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAuth }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      number: 1,
      title: 'Upload Course Material',
      short: 'Upload Any Format',
      description: 'Drag & drop PDFs, PowerPoint slides, Word documents, YouTube lecture links, or scanned handwritten notes.',
      icon: <Upload className="w-6 h-6 text-amber-400" />,
      features: [
        'Supports PDF, PPTX, DOCX & Audio Transcripts',
        'OCR Handwriting & Formula Recognition',
        'Multi-File Batch Drop-In'
      ],
      previewContent: (
        <div className="space-y-3 p-4 bg-[#040914] rounded-xl border border-amber-500/20">
          <div className="border-2 border-dashed border-amber-400/50 rounded-xl p-6 text-center hover:border-amber-400 transition-colors bg-amber-400/5">
            <FileUp className="w-10 h-10 text-amber-400 mx-auto mb-2 animate-bounce" />
            <p className="text-xs font-bold font-mono text-white uppercase tracking-wider mb-1">
              3D INTAKE PORTAL · DROP DOSSIER OR SLIDES HERE
            </p>
            <p className="text-[10px] text-zinc-400 font-mono">
              Supports files up to 500MB • Drag & drop or click to browse
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-full">
              <span className="text-[10px] bg-[#081220] border border-amber-500/20 text-amber-300 px-2 py-1 rounded-md flex items-center gap-1 font-mono">
                <FileUp className="w-3 h-3 text-amber-400 shrink-0" /> <span className="truncate">Bio_Lecture_Ch4.pdf</span>
              </span>
              <span className="text-[10px] bg-[#081220] border border-amber-500/20 text-amber-300 px-2 py-1 rounded-md flex items-center gap-1 font-mono">
                <Mic className="w-3 h-3 text-amber-400 shrink-0" /> <span className="truncate">Audio_Rec_12.mp3</span>
              </span>
              <span className="text-[10px] bg-[#081220] border border-amber-500/20 text-amber-300 px-2 py-1 rounded-md flex items-center gap-1 font-mono">
                <ImageIcon className="w-3 h-3 text-amber-400 shrink-0" /> <span className="truncate">Whiteboard.png</span>
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: 'Quantum Neural Synthesis',
      short: 'AI Synthesis',
      description: 'Select output type: Executive Summary, "Explain Like I\'m 5", Spaced Flashcard Deck, or Interactive AI Tutor.',
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      features: [
        'Customizable Depth & High-Yield Filtering',
        'Automatic Anki & Quizlet Deck Generator',
        'AI Exam Question Predictor'
      ],
      previewContent: (
        <div className="space-y-2 p-3 sm:p-4 bg-[#040914] rounded-xl border border-amber-500/20">
          <div className="p-3 bg-amber-400/20 border border-amber-400/50 rounded-lg flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-extrabold uppercase text-white truncate">Generate Executive Intel Takeaways</span>
            </div>
            <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black uppercase shrink-0">Selected</span>
          </div>

          <div className="p-3 bg-[#081220] border border-amber-500/20 rounded-lg flex flex-wrap items-center justify-between gap-2 opacity-80 hover:opacity-100">
            <div className="flex items-center gap-2 min-w-0">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold uppercase text-zinc-200 truncate">Explain Complex Concepts (ELI5 Metaphor)</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono uppercase shrink-0">Available</span>
          </div>

          <div className="p-3 bg-[#081220] border border-amber-500/20 rounded-lg flex flex-wrap items-center justify-between gap-2 opacity-80 hover:opacity-100">
            <div className="flex items-center gap-2 min-w-0">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold uppercase text-zinc-200 truncate">Build Spaced Repetition Deck</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono uppercase shrink-0">Available</span>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: 'Instant Exam Domination',
      short: 'Ace Exams',
      description: 'Review structured takeaways, practice flashcards on mobile, and query the 24/7 AI tutor for instant high-yield mastery.',
      icon: <Award className="w-6 h-6 text-amber-400" />,
      features: [
        '3x Faster Exam Preparation',
        '100% Concept Retention Guarantee',
        'Seamless Desktop & Mobile Sync'
      ],
      previewContent: (
        <div className="p-4 sm:p-5 bg-[#081220] rounded-xl border border-amber-400/30 space-y-3 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-400" /> EXAM MASTERY STATUS: 98%
            </span>
            <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black uppercase shrink-0">
              READY FOR FINALS
            </span>
          </div>
          <p className="text-xs text-zinc-200 font-sans">
            "You have reviewed 48 flashcards, solved 12 practice questions, and summarized all 6 lecture modules. Estimated exam grade: A+"
          </p>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-[#040914] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081220] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>3 SIMPLE STEPS TO MASTERY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight font-sans">
            HOW STUDYMIND AI <span className="text-gold-gradient text-gold-bright">OPERATES</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            From raw messy lecture decks to exam domination in 3 painless steps.
          </p>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Step Navigation Cards */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((s) => {
              const isActive = activeStep === s.number;
              return (
                <div
                  key={s.number}
                  onClick={() => setActiveStep(s.number)}
                  className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 border ${
                    isActive
                      ? 'glass-quantum-card border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : 'bg-[#081220]/60 border-amber-500/20 hover:border-amber-400/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 transition-colors ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-[#040914] text-zinc-500 border border-amber-500/20'
                      }`}
                    >
                      0{s.number}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-extrabold uppercase text-white mb-1 font-sans">
                        {s.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                        {s.description}
                      </p>

                      {isActive && (
                        <div className="space-y-1.5 pt-2 border-t border-amber-500/20 font-mono">
                          {s.features.map((f, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-amber-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Step Preview Output Display */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-quantum-panel rounded-2xl border border-amber-400/30 p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-2xl max-w-full"
            >
              <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-amber-500/20 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-[#040914] border border-amber-500/20 shrink-0">
                    {steps[activeStep - 1].icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block truncate font-mono">
                      STEP 0{activeStep} QUANTUM PREVIEW
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold uppercase text-white truncate font-sans">
                      {steps[activeStep - 1].title}
                    </h4>
                  </div>
                </div>

                <div className="flex gap-1.5 shrink-0">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      onClick={() => setActiveStep(num)}
                      className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                        activeStep === num ? 'bg-amber-400 scale-125 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-[#040914] border border-amber-500/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Step Visual Content */}
              {steps[activeStep - 1].previewContent}

              <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setActiveStep(activeStep === 3 ? 1 : activeStep + 1)}
                  className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 hover:text-amber-300 flex items-center gap-1.5"
                >
                  <span>NEXT STEP</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>

                <button
                  onClick={onOpenAuth}
                  className="btn-quantum-gold px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider"
                >
                  START STEP 1 FREE
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

