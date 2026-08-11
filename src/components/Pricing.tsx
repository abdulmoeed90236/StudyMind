import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, HelpCircle, ChevronDown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PRICING_PLANS, FAQ_ITEMS } from '../data/mockData';

interface PricingProps {
  onOpenAuth: (planName?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenAuth }) => {
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="pricing" className="py-24 relative bg-[#040914] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081220] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>QUANTUM ACADEMIC PASSES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight font-sans">
            INVEST IN YOUR <span className="text-gold-gradient text-gold-bright">ACADEMIC FUTURE</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Cancel anytime with one click. Cheaper than a single tutor hour, 100x more versatile.
          </p>

          {/* Billing Period Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3 font-mono">
            <span className={`text-xs font-extrabold uppercase tracking-wider ${!isYearly ? 'text-amber-400' : 'text-zinc-500'}`}>
              Monthly Pass
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-[#081220] border border-amber-500/30 p-1 transition-colors duration-200 focus:outline-none"
            >
              <div
                className={`w-5 h-5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] transform transition-transform duration-200 ${
                  isYearly ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>

            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-extrabold uppercase tracking-wider ${isYearly ? 'text-amber-400' : 'text-zinc-500'}`}>
                Annual Gold Pass
              </span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                SAVE 25%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? 'glass-quantum-card border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
                    : 'glass-quantum-panel border border-amber-500/20'
                }`}
              >
                {/* Popular Tag */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg font-mono">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-wide text-white font-sans">{plan.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price Header */}
                  <div className="my-6 pb-6 border-b border-amber-500/20">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white font-mono">${price}</span>
                      <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider font-mono">/ month</span>
                    </div>
                    {isYearly && price > 0 && (
                      <span className="text-[10px] text-amber-400 font-mono font-bold block mt-1 uppercase">
                        Billed annually (${price * 12}/yr)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block font-mono">
                      Included Capabilities:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onOpenAuth(plan.name)}
                  className={`w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'btn-quantum-gold'
                      : 'bg-[#040914] border border-amber-500/30 text-amber-300 hover:border-amber-400 hover:text-white font-mono'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-current" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mb-20 glass-quantum-panel rounded-2xl p-6 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#040914] border border-amber-500/20 text-amber-400 shrink-0">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase text-white font-sans">100% Student Satisfaction Guarantee</h4>
              <p className="text-xs text-zinc-300 mt-0.5">
                Try StudyMind AI risk-free. If you don't save at least 5 hours in your first week, cancel with zero hassle.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenAuth('Pro Learner')}
            className="btn-quantum-gold px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap"
          >
            START 7-DAY FREE TRIAL
          </button>
        </div>

        {/* FAQ Accordion Section */}
        <div id="faq" className="max-w-3xl mx-auto pt-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081220] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans">
              QUESTIONS & ANSWERS
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="glass-quantum-card rounded-xl border border-amber-500/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-[#081220]/50 transition-colors"
                  >
                    <span className="text-sm font-extrabold text-white font-sans">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 text-xs text-zinc-300 leading-relaxed border-t border-amber-500/20 pt-3 bg-[#040914]/60"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

