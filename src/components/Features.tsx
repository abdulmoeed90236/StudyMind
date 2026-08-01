import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Layers, Bot, ArrowRight, CheckCircle2, Zap, BrainCircuit, Lightbulb, Compass, BarChart2 } from 'lucide-react';
import { FEATURES_DATA } from '../data/mockData';
import { Feature } from '../types';

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
        return <FileText className="w-6 h-6 text-[#6366F1]" />;
      case 'Sparkles':
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-[#6366F1]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#6366F1]" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#6366F1]" />;
      default:
        return <Zap className="w-6 h-6 text-[#6366F1]" />;
    }
  };

  return (
    <section id="features" className="py-24 relative bg-[#0F172A] overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#334155] text-[#818CF8] text-xs font-bold mb-4"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>Built For Academic Mastery</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight"
          >
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#10B981]">
              Destroy Your Exams
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#94A3B8]"
          >
            Stop spending hours re-reading dry textbooks. StudyMind converts raw study materials into high-yield study assets in seconds.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
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
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => {
                  setActiveFeatureId(feature.id);
                  onSelectFeature(feature);
                }}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-[#1E293B] border-2 border-[#6366F1] shadow-xl shadow-indigo-500/20'
                    : 'bg-[#1E293B] border border-[#334155] hover:border-[#6366F1]/50'
                }`}
              >
                {/* Badge Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#0F172A] border border-[#334155] shadow-inner">
                    {getIcon(feature.iconName)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0F172A] text-[#a5b4fc] border border-[#334155]">
                    {feature.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">{feature.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                    {feature.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#334155] flex items-center justify-between text-xs font-bold text-[#6366F1] group">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
          className="glass-card rounded-2xl border border-[#334155] p-6 sm:p-8 bg-[#1E293B] relative overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/20 text-[#a5b4fc] text-xs font-bold border border-[#6366F1]/30">
                <Zap className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Feature Spotlight: {activeFeature.title}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
                {activeFeature.title}
              </h3>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {activeFeature.fullDesc}
              </p>

              <div className="space-y-2.5 pt-2">
                {activeFeature.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-[#6366F1] hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
                >
                  <span>Start Using {activeFeature.title}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
                <a
                  href="#playground"
                  className="text-xs font-semibold text-[#94A3B8] hover:text-[#6366F1] underline underline-offset-4"
                >
                  Try in Interactive Playground below
                </a>
              </div>
            </div>

            {/* Right Visual Graphic Box */}
            <div className="lg:col-span-5 bg-[#0F172A] p-6 rounded-xl border border-[#334155] shadow-inner flex flex-col justify-center space-y-4">
              <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-2 border-b border-[#334155]">
                <span className="font-mono text-[#6366F1] font-bold">STUDYMIND AI PERFORMANCE</span>
                <span className="text-[#10B981] font-semibold">Ready</span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Study Speedup Factor</span>
                    <span className="text-[#6366F1] font-bold">10x Faster</span>
                  </div>
                  <div className="w-full bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#6366F1] h-full w-[92%]" />
                  </div>
                </div>

                <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Exam Memory Retention</span>
                    <span className="text-[#10B981] font-bold">94% Retention</span>
                  </div>
                  <div className="w-full bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full w-[94%]" />
                  </div>
                </div>

                <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Time Saved Per Week</span>
                    <span className="text-[#a5b4fc] font-bold">14.5 Hours</span>
                  </div>
                  <div className="w-full bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#818CF8] h-full w-[88%]" />
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
