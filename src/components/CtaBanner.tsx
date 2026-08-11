import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Flame } from 'lucide-react';

interface CtaBannerProps {
  onOpenAuth: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenAuth }) => {
  return (
    <section className="py-20 relative bg-[#040914] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 sm:p-14 overflow-hidden glass-quantum-panel border border-amber-400/40 shadow-2xl text-center"
        >
          {/* Background Accents */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#040914] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest shadow-lg">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>EXAM SEASON IS HERE — DOMINATE NOW</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight font-sans">
              READY TO ACE YOUR NEXT EXAM WITH <span className="text-gold-gradient text-gold-bright">ZERO STRESS?</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Join 150,000+ students from Stanford, MIT, and Oxford who spend 50% less time studying and score higher grades.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenAuth}
                className="btn-quantum-gold w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 group"
              >
                <span>GET STARTED FREE NOW</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-zinc-400 font-mono uppercase">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Free 7-Day Trial
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-amber-400" /> Instant Setup
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

