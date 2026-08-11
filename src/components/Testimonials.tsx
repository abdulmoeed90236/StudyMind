import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Award, CheckCircle2, GraduationCap, TrendingUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  const [filterUni, setFilterUni] = useState<string>('All');

  const universities = ['All', 'Stanford University', 'MIT', 'Oxford University', 'UC Berkeley'];

  const filteredTestimonials = filterUni === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.university === filterUni);

  return (
    <section id="testimonials" className="py-24 relative bg-[#040914] border-t border-amber-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081220] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>VERIFIED SCHOLAR PROOF</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight font-sans">
            LOVED BY <span className="text-gold-gradient text-gold-bright">150,000+ SCHOLARS</span> WORLDWIDE
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            See how students from premier Ivy & global universities raised their GPAs, mastered complex syllabi, and reclaimed their study hours.
          </p>

          {/* University Filter Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 font-mono">
            {universities.map((uni) => (
              <button
                key={uni}
                onClick={() => setFilterUni(uni)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  filterUni === uni
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] font-extrabold'
                    : 'bg-[#081220] border border-amber-500/20 text-zinc-400 hover:text-white hover:border-amber-400/40'
                }`}
              >
                {uni}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-quantum-card rounded-2xl p-6 border border-amber-500/20 flex flex-col justify-between relative overflow-hidden shadow-xl hover:border-amber-400/50 transition-all"
            >
              <div className="absolute top-4 right-4 text-amber-500/10 pointer-events-none">
                <Quote className="w-16 h-16" />
              </div>

              <div>
                {/* Header: Stars & GPA Badge */}
                <div className="flex items-center justify-between mb-4 font-mono">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-xs font-extrabold text-amber-300 bg-[#040914] border border-amber-400/40 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    {item.gpaBoost}
                  </span>
                </div>

                {/* Review Highlight Banner */}
                <div className="mb-3 text-xs font-bold font-mono text-amber-300 bg-[#040914] border border-amber-500/20 px-3 py-1.5 rounded-lg inline-block">
                  ✨ "{item.highlight}"
                </div>

                {/* Review Body */}
                <p className="text-sm text-zinc-200 leading-relaxed mb-6 italic">
                  "{item.content}"
                </p>
              </div>

              {/* Student Footer */}
              <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-400/50"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                      <span>{item.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {item.role} • {item.major}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-amber-300 bg-[#040914] border border-amber-500/30 px-2.5 py-1 rounded-md font-mono">
                  {item.university}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate Proof Bar */}
        <div className="mt-12 glass-quantum-panel rounded-2xl p-6 text-center max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 shadow-2xl border border-amber-400/30 font-mono">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-sans">150,000+</div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Active Scholars</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-amber-500/20" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">1.2M+</div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Syllabi Summarized</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-amber-500/20" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">98.4%</div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Grade Improvement</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-amber-500/20" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-sans">4.98/5</div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Student Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};
