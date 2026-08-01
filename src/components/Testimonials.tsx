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
    <section id="testimonials" className="py-24 relative bg-[#0F172A] border-t border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#334155] text-[#818CF8] text-xs font-bold mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>Real Student Outcomes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Loved by 150,000+ Students Worldwide
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#94A3B8]">
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
                    ? 'bg-[#6366F1] text-white shadow-md shadow-indigo-500/30'
                    : 'bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-white'
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
              className="glass-card rounded-2xl p-6 border border-[#334155] bg-[#1E293B] flex flex-col justify-between relative overflow-hidden shadow-lg hover:border-[#6366F1]/50 transition-all"
            >
              <div className="absolute top-4 right-4 text-[#334155]/60 pointer-events-none">
                <Quote className="w-16 h-16" />
              </div>

              <div>
                {/* Header: Stars & GPA Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#6366F1] gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#6366F1] text-[#6366F1]" />
                    ))}
                  </div>

                  <span className="text-xs font-extrabold text-[#10B981] bg-[#0F172A] border border-[#334155] px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                    {item.gpaBoost}
                  </span>
                </div>

                {/* Review Highlight Banner */}
                <div className="mb-3 text-xs font-bold text-[#a5b4fc] bg-[#0F172A] border border-[#334155] px-3 py-1.5 rounded-lg inline-block">
                  ✨ "{item.highlight}"
                </div>

                {/* Review Body */}
                <p className="text-sm text-slate-200 leading-relaxed mb-6 italic">
                  "{item.content}"
                </p>
              </div>

              {/* Student Footer */}
              <div className="pt-4 border-t border-[#334155] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#334155]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    </h4>
                    <p className="text-xs text-[#94A3B8]">
                      {item.role} • {item.major}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-300 bg-[#0F172A] border border-[#334155] px-2.5 py-1 rounded-md">
                  {item.university}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate Proof Bar */}
        <div className="mt-12 bg-[#1E293B] border border-[#334155] rounded-2xl p-6 text-center max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 shadow-xl">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">150,000+</div>
            <p className="text-xs text-[#94A3B8] mt-1">Active Students</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-[#334155]" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#6366F1]">1.2M+</div>
            <p className="text-xs text-[#94A3B8] mt-1">PDFs Summarized</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-[#334155]" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981]">98.4%</div>
            <p className="text-xs text-[#94A3B8] mt-1">Pass Rate Improvement</p>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-[#334155]" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#6366F1]">4.9/5</div>
            <p className="text-xs text-[#94A3B8] mt-1">Student Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};
