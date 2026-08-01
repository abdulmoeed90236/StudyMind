import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, RotateCcw, Sparkles, CheckCircle2, FileText, Layers, Bot, ArrowRight } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose, onOpenAuth }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: '1. Drag & Drop PDF Lecture Notes',
      desc: 'Upload 50-page PDF slide decks, scanned textbooks, or recorded lectures in 1 click.',
      badge: 'Step 1 of 4',
      visual: (
        <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155] text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#6366F1]/20 text-[#6366F1] flex items-center justify-center mx-auto animate-pulse">
            <FileText className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-white">Molecular_Biology_Ch7_Genetics.pdf</p>
          <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30 font-mono">
            48 Pages Parsed in 0.3s
          </span>
        </div>
      )
    },
    {
      title: '2. Instant Executive AI Summary',
      desc: 'Extracted key takeaways, core definitions, and formulas with zero fluff or filler.',
      badge: 'Step 2 of 4',
      visual: (
        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155] space-y-2 text-left">
          <div className="flex items-center justify-between text-xs font-bold text-[#818CF8]">
            <span>✨ Core Takeaway #1</span>
            <span className="text-[10px] text-[#94A3B8] font-mono">0.4s AI Latency</span>
          </div>
          <p className="text-xs text-slate-300 bg-[#1E293B] p-2.5 rounded border border-[#334155]">
            DNA replication proceeds in 5' to 3' direction via Okazaki fragments on the lagging strand catalyzed by DNA Polymerase III.
          </p>
        </div>
      )
    },
    {
      title: '3. Auto-Generated Active Recall Cards',
      desc: 'Instant spaced-repetition deck ready to sync with Anki or Quizlet.',
      badge: 'Step 3 of 4',
      visual: (
        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#10B981]/40 space-y-2">
          <div className="flex justify-between text-[10px] text-[#10B981] font-bold">
            <span>FLASHCARD #1</span>
            <span>SPACED REPETITION READY</span>
          </div>
          <p className="text-xs text-white font-medium">Q: What enzyme unwinds the double helix?</p>
          <p className="text-xs text-[#10B981] pt-1 border-t border-[#334155]">A: DNA Helicase.</p>
        </div>
      )
    },
    {
      title: '4. Ask 24/7 Contextual AI Tutor',
      desc: 'Ask follow-up questions grounded strictly in your class syllabus.',
      badge: 'Step 4 of 4',
      visual: (
        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#6366F1]/40 space-y-2">
          <div className="bg-[#1E293B] p-2 rounded text-xs text-slate-200 border border-[#334155]">
            <strong className="text-[#818CF8] block text-[10px]">STUDENT:</strong>
            Why does leading strand synthesize continuously?
          </div>
          <div className="bg-[#6366F1]/20 p-2 rounded text-xs text-indigo-200 border border-[#6366F1]/30">
            <strong className="text-[#818CF8] block text-[10px]">AI TUTOR:</strong>
            Because DNA Polymerase moves in the same 5' to 3' direction as the expanding replication fork!
          </div>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-[#1E293B] border border-[#334155] rounded-2xl p-6 shadow-2xl shadow-indigo-500/10 text-white overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#334155]">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#0F172A] border border-[#334155] text-[#6366F1]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F8FAFC]">StudyMind AI Walkthrough</h3>
                <p className="text-xs text-[#94A3B8]">Interactive product tour in 60 seconds</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#0F172A] text-[#94A3B8] hover:text-white transition-colors border border-[#334155]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tour Stage Content */}
          <div className="py-6 space-y-6">
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span className="font-mono text-[#818CF8] font-bold">
                {demoSteps[currentStep].badge}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-2.5 py-1 rounded bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:text-white text-[11px] font-semibold flex items-center gap-1"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isPlaying ? 'Pause Tour' : 'Play Tour'}</span>
                </button>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-xl font-extrabold text-[#F8FAFC]">
                {demoSteps[currentStep].title}
              </h4>
              <p className="text-xs text-[#94A3B8] max-w-lg mx-auto">
                {demoSteps[currentStep].desc}
              </p>
            </div>

            {/* Interactive Visual Box */}
            <div className="max-w-md mx-auto">
              {demoSteps[currentStep].visual}
            </div>

            {/* Progress Stepper Bar */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {demoSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep === idx
                      ? 'w-8 bg-[#6366F1]'
                      : 'w-2 bg-[#0F172A] border border-[#334155]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-[#334155] flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((currentStep + 1) % demoSteps.length)}
              className="text-xs font-bold text-[#94A3B8] hover:text-white flex items-center gap-1.5"
            >
              <span>Next Demo Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6366F1] hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-colors"
            >
              Try This Free On Your Notes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
