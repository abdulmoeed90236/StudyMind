import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Flame } from 'lucide-react';

interface CtaBannerProps {
  onOpenAuth: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenAuth }) => {
  return (
    <section className="py-20 relative bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 sm:p-14 overflow-hidden bg-zinc-900 border border-emerald-500/40 shadow-2xl text-center"
        >
          {/* Background Accents */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg">
              <Flame className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Exam Season Is Here — Don't Fall Behind</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Ace Your Next Exam with Zero Stress?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Join 150,000+ students from Stanford, MIT, and Oxford who spend 50% less time studying and score higher grades.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Get Started Free Now</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Free 7-Day Trial
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-emerald-400" /> Instant Setup
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
