import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Sliders, Trophy, ArrowRight, CheckCircle2, Sparkles, FileUp, Mic, Image as ImageIcon, Zap } from 'lucide-react';

interface HowItWorksProps {
  onOpenAuth: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAuth }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      number: 1,
      title: 'Upload Your Course Material',
      short: 'Upload Any Format',
      description: 'Drag & drop PDFs, PowerPoint slides, Word documents, YouTube lecture links, or even photos of handwritten notes.',
      icon: <Upload className="w-6 h-6 text-emerald-400" />,
      features: [
        'Supports PDF, PPTX, DOCX & Audio Transcripts',
        'OCR Handwriting Recognition',
        'Multi-File Batch Uploads'
      ],
      previewContent: (
        <div className="space-y-3 p-4 bg-zinc-950 rounded-xl border border-emerald-500/20">
          <div className="border-2 border-dashed border-emerald-500/40 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors bg-emerald-950/20">
            <FileUp className="w-10 h-10 text-emerald-400 mx-auto mb-2 animate-bounce" />
            <p className="text-xs font-bold text-white mb-1">
              Drop your lecture notes, slides, or textbook PDF here
            </p>
            <p className="text-[10px] text-slate-400">
              Supports files up to 500MB • Drag & drop or click to browse
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="text-[10px] bg-zinc-900 border border-emerald-500/20 text-slate-300 px-2 py-1 rounded flex items-center gap-1">
                <FileUp className="w-3 h-3 text-emerald-400" /> Bio_Lecture_Ch4.pdf
              </span>
              <span className="text-[10px] bg-zinc-900 border border-emerald-500/20 text-slate-300 px-2 py-1 rounded flex items-center gap-1">
                <Mic className="w-3 h-3 text-emerald-400" /> Audio_Rec_12.mp3
              </span>
              <span className="text-[10px] bg-zinc-900 border border-emerald-500/20 text-slate-300 px-2 py-1 rounded flex items-center gap-1">
                <ImageIcon className="w-3 h-3 text-emerald-400" /> Whiteboard.png
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: 'Choose Your Study Mode',
      short: 'Pick AI Action',
      description: 'Select what you need: Executive Summary, "Explain Like I\'m 5", Spaced Flashcards, or Practice Exam Builder.',
      icon: <Sliders className="w-6 h-6 text-emerald-400" />,
      features: [
        'Customizable Explanation Depth',
        'Automatic Anki & Quizlet Deck Generator',
        'AI Exam Question Predictor'
      ],
      previewContent: (
        <div className="space-y-2 p-4 bg-zinc-950 rounded-xl border border-emerald-500/20">
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Generate Executive Summary</span>
            </div>
            <span className="text-[10px] bg-emerald-400 text-black px-2 py-0.5 rounded font-extrabold">Selected</span>
          </div>

          <div className="p-3 bg-zinc-900 border border-emerald-500/20 rounded-lg flex items-center justify-between opacity-80 hover:opacity-100">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Explain Complex Concepts (ELI5)</span>
            </div>
            <span className="text-[10px] text-slate-400">Available</span>
          </div>

          <div className="p-3 bg-zinc-900 border border-emerald-500/20 rounded-lg flex items-center justify-between opacity-80 hover:opacity-100">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Build Spaced Flashcard Deck</span>
            </div>
            <span className="text-[10px] text-slate-400">Available</span>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: 'Master Material & Ace Your Exam',
      short: 'Ace Your Exams',
      description: 'Review structured takeaways, practice flashcards on your phone, and ask the 24/7 AI tutor any lingering questions.',
      icon: <Trophy className="w-6 h-6 text-emerald-400" />,
      features: [
        '3x Faster Exam Prep',
        '100% Retain Core Concepts',
        'Sync Across Desktop & Mobile'
      ],
      previewContent: (
        <div className="p-5 bg-emerald-950/40 rounded-xl border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Exam Mastery Status: 98%
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              Ready for Finals
            </span>
          </div>
          <p className="text-xs text-slate-200">
            "You have reviewed 48 flashcards, solved 12 practice questions, and summarized all 6 lecture modules. Estimated exam grade: A+"
          </p>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>3 Simple Steps</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How StudyMind AI Works
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            From raw messy lecture slides to exam mastery in 3 painless steps.
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
                      ? 'bg-zinc-900 border-emerald-500 shadow-lg shadow-emerald-950/80'
                      : 'bg-zinc-950 border-emerald-500/20 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-colors ${
                        isActive
                          ? 'bg-emerald-400 text-black shadow-md'
                          : 'bg-zinc-800 text-slate-400'
                      }`}
                    >
                      0{s.number}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {s.description}
                      </p>

                      {isActive && (
                        <div className="space-y-1.5 pt-2 border-t border-emerald-950">
                          {s.features.map((f, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
              className="glass-card rounded-2xl border border-emerald-500/30 p-6 sm:p-8 bg-zinc-900 relative overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-950">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-emerald-500/30">
                    {steps[activeStep - 1].icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                      STEP {activeStep} PREVIEW
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {steps[activeStep - 1].title}
                    </h4>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      onClick={() => setActiveStep(num)}
                      className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                        activeStep === num ? 'bg-emerald-400 scale-125' : 'bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Step Visual Content */}
              {steps[activeStep - 1].previewContent}

              <div className="mt-6 pt-4 border-t border-emerald-950 flex items-center justify-between">
                <button
                  onClick={() => setActiveStep(activeStep === 3 ? 1 : activeStep + 1)}
                  className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-lg text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 shadow-md transition-colors"
                >
                  Start Step 1 Free
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
