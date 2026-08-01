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
    <section id="testimonials" className="py-24 relative bg-zinc-950 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Real Student Outcomes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Loved by 150,000+ Students Worldwide
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            See how students from top universities transformed their study habits, raised their GPAs, and reclaimed their free time.
          </p>

          {/* University Filter Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {universities.map((uni) => (
              <button
                key={uni}
                onClick={() => setFilterUni(uni)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterUni === uni
                    ? 'bg-emerald-400 text-black shadow-md shadow-emerald-500/30'
                    : 'bg-zinc-900 border border-emerald-500/20 text-slate-300 hover:text-white'
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
              className="glass-card glass-card-hover rounded-2xl p-6 border border-emerald-500/30 bg-zinc-900 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-emerald-950/80 pointer-events-none">
                <Quote className="w-16 h-16" />
              </div>

              <div>
                {/* Header: Stars & GPA Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-emerald-400 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>

                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/90 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    {item.gpaBoost}
                  </span>
                </div>

                {/* Review Highlight Banner */}
                <div className="mb-3 text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg inline-block">
                  ✨ "{item.highlight}"
                </div>

                {/* Review Body */}
                <p className="text-sm text-slate-200 leading-relaxed mb-6 italic">
                  "{item.content}"
                </p>
              </div>

              {/* Student Footer */}
              <div className="pt-4 border-t border-emerald-950 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-slate-400">
                      {item.role} • {item.major}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-300 bg-zinc-950 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                  {item.university}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate Proof Bar */}
        <div className="mt-12 bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6 text-center max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">150,000+</div>
            <p className="text-xs text-slate-400 mt-1">Active Students</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-emerald-950" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1.2M+</div>
            <p className="text-xs text-slate-400 mt-1">PDFs Summarized</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-emerald-950" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">98.4%</div>
            <p className="text-xs text-slate-400 mt-1">Pass Rate Improvement</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-emerald-950" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4.9/5</div>
            <p className="text-xs text-slate-400 mt-1">Student Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};
