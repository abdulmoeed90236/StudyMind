import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Layers, Bot, ArrowRight, CheckCircle2, Zap, BrainCircuit, Lightbulb, Camera, Cpu, Sparkles, Brain, Shield } from 'lucide-react';
import { FEATURES_DATA } from '../data/mockData';
import { Feature } from '../types';
import { QuantumBrain3D } from './QuantumBrain3D';

interface FeaturesProps {
  onSelectFeature: (feature: Feature) => void;
  onOpenAuth: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onSelectFeature, onOpenAuth }) => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>(FEATURES_DATA[0].id);

  const activeFeature = FEATURES_DATA.find((f) => f.id === activeFeatureId) || FEATURES_DATA[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-6 h-6 text-amber-400" />;
      case 'Sparkles':
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-amber-400" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-amber-400" />;
      default:
        return <Zap className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="features" className="py-24 relative bg-[#040914] overflow-hidden">
      {/* Background Quantum Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081220] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>QUANTUM AI SUMMARIZER & FEATURE SUITE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight font-sans"
          >
            PRECISION WEAPONRY FOR{' '}
            <span className="text-gold-gradient text-gold-bright tracking-wider">
              ACADEMIC MASTERY
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-300"
          >
            Stop re-reading 50-page lecture decks manually. StudyMind's 3D Quantum engine scans, condenses, and synthesizes study dossiers instantly.
          </motion.p>
        </div>

        {/* 3D Micro-Scenario Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURES_DATA.map((feature, idx) => {
            const isSelected = activeFeatureId === feature.id;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => {
                  setActiveFeatureId(feature.id);
                  onSelectFeature(feature);
                }}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'glass-quantum-card border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                    : 'glass-quantum-card border border-amber-500/20 hover:border-amber-400/50'
                }`}
              >
                {/* Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#040914] border border-amber-500/20 shadow-inner">
                    {getIcon(feature.iconName)}
                  </div>
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    {feature.badge}
                  </span>
                </div>

                {/* 3D Animated Scenario Visual Preview */}
                <div className="mb-4 bg-[#040914] p-3 rounded-xl border border-amber-500/20 text-xs font-mono text-zinc-300 relative overflow-hidden group">
                  {idx === 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                        <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> 3D OCR SCANNER</span>
                        <span className="text-emerald-400 text-[10px]">PARSED IN 0.14s</span>
                      </div>
                      <div className="relative bg-[#081220] p-2 rounded border border-amber-400/30 overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1 bg-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
                        <p className="text-[10px] text-zinc-300 truncate">Syllabus_OrgoChem_Ch4_Mechanisms.pdf</p>
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                        <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-amber-400" /> LOGIC GATE CONDENSER</span>
                        <span className="text-amber-300 text-[10px]">99.8% FIDELITY</span>
                      </div>
                      <div className="bg-[#081220] p-2 rounded border border-amber-400/30 space-y-1">
                        <div className="flex items-center gap-1 text-[10px] text-amber-300">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>SYNTHESIZING 12KB DATA...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                        <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-amber-400" /> SPACED REPETITION</span>
                        <span className="text-amber-300 text-[10px]">ANKI SYNC</span>
                      </div>
                      <div className="bg-[#081220] p-2 rounded border border-amber-400/30 flex items-center justify-between text-[10px] text-amber-300">
                        <span>FLASHCARD #1</span>
                        <span className="text-emerald-400">READY</span>
                      </div>
                    </div>
                  )}

                  {idx === 3 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                        <span className="flex items-center gap-1"><Bot className="w-3.5 h-3.5 text-amber-400" /> 24/7 AI TUTOR</span>
                        <span className="text-emerald-400 text-[10px]">ACTIVE</span>
                      </div>
                      <div className="bg-[#081220] p-2 rounded border border-amber-400/30 text-[10px] text-zinc-300 truncate">
                        "Ask follow-up questions grounded in syllabus..."
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-black uppercase text-white mb-2 font-sans">{feature.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {feature.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs font-bold font-mono uppercase tracking-wider text-amber-400 group">
                  <span>EXPLORE SCENARIO</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-amber-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deep Dive Spotlight Box for Selected Feature */}
        <motion.div
          key={activeFeature.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-quantum-panel rounded-2xl border border-amber-400/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-mono font-bold border border-amber-400/30 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>FEATURE SPOTLIGHT: {activeFeature.title}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide font-sans">
                {activeFeature.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeFeature.fullDesc}
              </p>

              <div className="space-y-2.5 pt-2">
                {activeFeature.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenAuth}
                  className="btn-quantum-gold px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>LAUNCH {activeFeature.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
                <a
                  href="#playground"
                  className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 hover:text-amber-300 underline underline-offset-4"
                >
                  TEST IN SANDBOX BELOW
                </a>
              </div>
            </div>

            {/* Right Visual Graphic Box / 3D Neural Brain */}
            <div className="lg:col-span-5 bg-[#040914] p-5 rounded-xl border border-amber-500/20 flex flex-col justify-center space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-amber-500/20 font-mono">
                <span className="text-amber-400 font-bold">QUANTUM TELEMETRY</span>
                <span className="text-amber-400 font-bold">ACTIVE</span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#081220] p-3 rounded-lg border border-amber-500/20 font-mono">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-200">Study Speedup Factor</span>
                    <span className="text-amber-400 font-extrabold">10x Faster</span>
                  </div>
                  <div className="w-full bg-[#040914] h-2 rounded-full overflow-hidden border border-amber-500/20">
                    <div className="bg-amber-400 h-full w-[94%] shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                  </div>
                </div>

                <div className="bg-[#081220] p-3 rounded-lg border border-amber-500/20 font-mono">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-200">Exam Memory Recall</span>
                    <span className="text-amber-400 font-extrabold">98.4% Retention</span>
                  </div>
                  <div className="w-full bg-[#040914] h-2 rounded-full overflow-hidden border border-amber-500/20">
                    <div className="bg-amber-400 h-full w-[98%]" />
                  </div>
                </div>

                <div className="bg-[#081220] p-3 rounded-lg border border-amber-500/20 font-mono">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-200">Weekly Study Hours Saved</span>
                    <span className="text-amber-300 font-extrabold">14.5 Hours</span>
                  </div>
                  <div className="w-full bg-[#040914] h-2 rounded-full overflow-hidden border border-amber-500/20">
                    <div className="bg-amber-300 h-full w-[88%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

