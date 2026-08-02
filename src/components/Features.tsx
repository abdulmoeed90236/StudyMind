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
        return <FileText className="w-6 h-6 text-[#4A6B5D]" />;
      case 'Sparkles':
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-[#4A6B5D]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#4A6B5D]" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#4A6B5D]" />;
      default:
        return <Zap className="w-6 h-6 text-[#4A6B5D]" />;
    }
  };

  return (
    <section id="features" className="py-24 relative bg-[#FBF9F5] overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4A6B5D]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C85A32]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E6E1DA] text-[#4A6B5D] text-xs font-bold mb-4 shadow-xs"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-[#4A6B5D]" />
            <span>Built For Academic Mastery</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#2D2B2A] tracking-tight leading-tight"
          >
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A6B5D] via-[#3D5A4E] to-[#C85A32]">
              Destroy Your Exams
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#736E65]"
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
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => {
                  setActiveFeatureId(feature.id);
                  onSelectFeature(feature);
                }}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-2 border-[#4A6B5D] shadow-sm'
                    : 'bg-[#FFFFFF] border border-[#E6E1DA] hover:border-[#4A6B5D]/60 shadow-xs'
                }`}
              >
                {/* Badge Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#FBF9F5] border border-[#E6E1DA]">
                    {getIcon(feature.iconName)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FBF9F5] text-[#4A6B5D] border border-[#E6E1DA]">
                    {feature.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#2D2B2A] mb-2">{feature.title}</h3>
                  <p className="text-xs text-[#736E65] leading-relaxed mb-4">
                    {feature.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6E1DA] flex items-center justify-between text-xs font-bold text-[#4A6B5D] group">
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
          className="glass-card rounded-2xl border border-[#E6E1DA] p-6 sm:p-8 bg-[#FFFFFF] relative overflow-hidden shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-bold border border-[#4A6B5D]/20">
                <Zap className="w-3.5 h-3.5 text-[#4A6B5D]" />
                <span>Feature Spotlight: {activeFeature.title}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D2B2A]">
                {activeFeature.title}
              </h3>

              <p className="text-sm sm:text-base text-[#736E65] leading-relaxed">
                {activeFeature.fullDesc}
              </p>

              <div className="space-y-2.5 pt-2">
                {activeFeature.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#2D2B2A]">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-[#4A6B5D] hover:bg-[#3D5A4E] shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Start Using {activeFeature.title}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
                <a
                  href="#playground"
                  className="text-xs font-semibold text-[#736E65] hover:text-[#4A6B5D] underline underline-offset-4"
                >
                  Try in Interactive Playground below
                </a>
              </div>
            </div>

            {/* Right Visual Graphic Box */}
            <div className="lg:col-span-5 bg-[#FBF9F5] p-6 rounded-xl border border-[#E6E1DA] flex flex-col justify-center space-y-4">
              <div className="flex items-center justify-between text-xs text-[#736E65] pb-2 border-b border-[#E6E1DA]">
                <span className="font-mono text-[#4A6B5D] font-bold">STUDYMIND AI PERFORMANCE</span>
                <span className="text-[#4A6B5D] font-semibold">Ready</span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E6E1DA]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#2D2B2A] font-medium">Study Speedup Factor</span>
                    <span className="text-[#4A6B5D] font-bold">10x Faster</span>
                  </div>
                  <div className="w-full bg-[#E6E1DA] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4A6B5D] h-full w-[92%]" />
                  </div>
                </div>

                <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E6E1DA]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#2D2B2A] font-medium">Exam Memory Retention</span>
                    <span className="text-[#4A6B5D] font-bold">94% Retention</span>
                  </div>
                  <div className="w-full bg-[#E6E1DA] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4A6B5D] h-full w-[94%]" />
                  </div>
                </div>

                <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E6E1DA]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#2D2B2A] font-medium">Time Saved Per Week</span>
                    <span className="text-[#C85A32] font-bold">14.5 Hours</span>
                  </div>
                  <div className="w-full bg-[#E6E1DA] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C85A32] h-full w-[88%]" />
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
