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
      icon: <Upload className="w-6 h-6 text-[#6366F1]" />,
      features: [
        'Supports PDF, PPTX, DOCX & Audio Transcripts',
        'OCR Handwriting Recognition',
        'Multi-File Batch Uploads'
      ],
      previewContent: (
        <div className="space-y-3 p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
          <div className="border-2 border-dashed border-[#6366F1]/40 rounded-xl p-6 text-center hover:border-[#6366F1] transition-colors bg-[#6366F1]/10">
            <FileUp className="w-10 h-10 text-[#6366F1] mx-auto mb-2 animate-bounce" />
            <p className="text-xs font-bold text-[#F8FAFC] mb-1">
              Drop your lecture notes, slides, or textbook PDF here
            </p>
            <p className="text-[10px] text-[#94A3B8]">
              Supports files up to 500MB • Drag & drop or click to browse
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="text-[10px] bg-[#1E293B] border border-[#334155] text-slate-300 px-2 py-1 rounded-lg flex items-center gap-1">
                <FileUp className="w-3 h-3 text-[#6366F1]" /> Bio_Lecture_Ch4.pdf
              </span>
              <span className="text-[10px] bg-[#1E293B] border border-[#334155] text-slate-300 px-2 py-1 rounded-lg flex items-center gap-1">
                <Mic className="w-3 h-3 text-[#6366F1]" /> Audio_Rec_12.mp3
              </span>
              <span className="text-[10px] bg-[#1E293B] border border-[#334155] text-slate-300 px-2 py-1 rounded-lg flex items-center gap-1">
                <ImageIcon className="w-3 h-3 text-[#6366F1]" /> Whiteboard.png
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
      icon: <Sliders className="w-6 h-6 text-[#6366F1]" />,
      features: [
        'Customizable Explanation Depth',
        'Automatic Anki & Quizlet Deck Generator',
        'AI Exam Question Predictor'
      ],
      previewContent: (
        <div className="space-y-2 p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
          <div className="p-3 bg-[#6366F1]/20 border border-[#6366F1]/40 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#818CF8]" />
              <span className="text-xs font-bold text-white">Generate Executive Summary</span>
            </div>
            <span className="text-[10px] bg-[#6366F1] text-white px-2 py-0.5 rounded font-extrabold">Selected</span>
          </div>

          <div className="p-3 bg-[#1E293B] border border-[#334155] rounded-xl flex items-center justify-between opacity-80 hover:opacity-100">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#6366F1]" />
              <span className="text-xs font-bold text-[#F8FAFC]">Explain Complex Concepts (ELI5)</span>
            </div>
            <span className="text-[10px] text-[#94A3B8]">Available</span>
          </div>

          <div className="p-3 bg-[#1E293B] border border-[#334155] rounded-xl flex items-center justify-between opacity-80 hover:opacity-100">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#6366F1]" />
              <span className="text-xs font-bold text-[#F8FAFC]">Build Spaced Flashcard Deck</span>
            </div>
            <span className="text-[10px] text-[#94A3B8]">Available</span>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: 'Master Material & Ace Your Exam',
      short: 'Ace Your Exams',
      description: 'Review structured takeaways, practice flashcards on your phone, and ask the 24/7 AI tutor any lingering questions.',
      icon: <Trophy className="w-6 h-6 text-[#10B981]" />,
      features: [
        '3x Faster Exam Prep',
        '100% Retain Core Concepts',
        'Sync Across Desktop & Mobile'
      ],
      previewContent: (
        <div className="p-5 bg-[#1E293B] rounded-xl border border-[#10B981]/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Exam Mastery Status: 98%
            </span>
            <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-full font-bold">
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
    <section id="how-it-works" className="py-24 relative bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#334155] text-[#818CF8] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>3 Simple Steps</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            How StudyMind AI Works
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#94A3B8]">
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
                      ? 'bg-[#1E293B] border-[#6366F1] shadow-lg shadow-indigo-500/20'
                      : 'bg-[#1E293B]/60 border-[#334155] hover:border-[#6366F1]/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#6366F1] text-white shadow-md'
                          : 'bg-[#0F172A] text-[#94A3B8]'
                      }`}
                    >
                      0{s.number}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[#F8FAFC] mb-1">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                        {s.description}
                      </p>

                      {isActive && (
                        <div className="space-y-1.5 pt-2 border-t border-[#334155]">
                          {s.features.map((f, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-[#a5b4fc]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
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
              className="glass-card rounded-2xl border border-[#334155] p-6 sm:p-8 bg-[#1E293B] relative overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#334155]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0F172A] border border-[#334155]">
                    {steps[activeStep - 1].icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#818CF8] font-bold block">
                      STEP {activeStep} PREVIEW
                    </span>
                    <h4 className="text-base font-bold text-[#F8FAFC]">
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
                        activeStep === num ? 'bg-[#6366F1] scale-125' : 'bg-[#0F172A]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Step Visual Content */}
              {steps[activeStep - 1].previewContent}

              <div className="mt-6 pt-4 border-t border-[#334155] flex items-center justify-between">
                <button
                  onClick={() => setActiveStep(activeStep === 3 ? 1 : activeStep + 1)}
                  className="text-xs font-bold text-[#94A3B8] hover:text-[#6366F1] flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-[#6366F1] hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-colors"
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
