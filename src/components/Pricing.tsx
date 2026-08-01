import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, HelpCircle, ChevronDown, ArrowRight, ShieldCheck, Zap, Users, GraduationCap } from 'lucide-react';
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
    <section id="pricing" className="py-24 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fair Student Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Invest in Your Academic Future
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Cancel anytime with one click. Cheaper than a single tutor hour, 100x more versatile.
          </p>

          {/* Billing Period Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-zinc-900 border border-emerald-500/30 p-1 transition-colors duration-200 focus:outline-none"
            >
              <div
                className={`w-5 h-5 rounded-full bg-emerald-400 shadow-md transform transition-transform duration-200 ${
                  isYearly ? 'translate-x-7 bg-emerald-300' : 'translate-x-0'
                }`}
              />
            </button>

            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${isYearly ? 'text-white' : 'text-slate-400'}`}>
                Yearly Billing
              </span>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
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
                    ? 'bg-zinc-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-950/90'
                    : 'glass-card bg-zinc-950 border border-emerald-500/20'
                }`}
              >
                {/* Popular Tag */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-400 text-black text-[11px] font-extrabold px-3.5 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price Header */}
                  <div className="my-6 pb-6 border-b border-emerald-950">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white">${price}</span>
                      <span className="text-xs text-slate-400 font-medium">/ month</span>
                    </div>
                    {isYearly && price > 0 && (
                      <span className="text-[10px] text-emerald-400 font-semibold block mt-1">
                        Billed annually (${price * 12}/yr)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Included Features:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onOpenAuth(plan.name)}
                  className={`w-full py-3.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-300'
                      : 'bg-zinc-900 border border-emerald-500/30 text-slate-200 hover:bg-zinc-800 hover:text-white'
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
        <div className="mb-20 glass-card bg-zinc-900 rounded-2xl p-6 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 shrink-0">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Student Satisfaction Guarantee</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Try StudyMind AI risk-free. If you don't save at least 5 hours in your first week, cancel with zero hassle.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenAuth('Pro Learner')}
            className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-extrabold whitespace-nowrap shadow-md"
          >
            Start 7-Day Free Trial
          </button>
        </div>

        {/* FAQ Accordion Section */}
        <div id="faq" className="max-w-3xl mx-auto pt-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Got Questions?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="glass-card bg-zinc-900 rounded-xl border border-emerald-500/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-800/50 transition-colors"
                  >
                    <span className="text-sm font-bold text-white">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-400 transition-transform duration-200 shrink-0 ${
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
                        className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-emerald-950 pt-3 bg-zinc-950/60"
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
