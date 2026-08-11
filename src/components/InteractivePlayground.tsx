import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Lightbulb, Layers, Bot, Send, RefreshCw, Copy, Check, ArrowRight, Play, Brain, Code2, FlaskConical, Globe, Zap } from 'lucide-react';
import { SAMPLE_STUDY_NOTES } from '../data/mockData';

interface InteractivePlaygroundProps {
  onOpenAuth: () => void;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ onOpenAuth }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(SAMPLE_STUDY_NOTES[0].id);
  const [customInputText, setCustomInputText] = useState<string>('');
  const [activeAction, setActiveAction] = useState<'summary' | 'eli5' | 'flashcards' | 'tutor'>('summary');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [customTutorChat, setCustomTutorChat] = useState<{ q: string; a: string }[]>([]);

  const currentSample = SAMPLE_STUDY_NOTES.find((n) => n.id === selectedSubjectId) || SAMPLE_STUDY_NOTES[0];

  const handleRunAi = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  const handleAskTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newAnswer = `Based on your course notes for ${currentSample.subject}: "${userQuestion}" relates directly to ${currentSample.summary.coreFormulasOrTerms[0] || 'core concepts'}. Key factor: ${currentSample.summary.keyTakeaways[0] || 'See lecture summary'}.`;
      setCustomTutorChat([...customTutorChat, { q: userQuestion, a: newAnswer }]);
      setUserQuestion('');
      setIsProcessing(false);
    }, 500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-24 relative bg-[#040914] border-y border-amber-500/20 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081220] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>INTERACTIVE LIVE AI SANDBOX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight font-sans">
            TEST STUDYMIND AI <span className="text-gold-gradient text-gold-bright">RIGHT NOW</span>
          </h2>

          <p className="mt-3 text-base text-slate-300">
            Select a preset course note or paste your own raw text below. Watch our AI engine process it instantly in real time!
          </p>
        </div>

        {/* Playground Container */}
        <div className="glass-quantum-panel rounded-2xl border border-amber-400/30 p-4 sm:p-6 shadow-2xl relative">
          {/* Top Control Bar: Subject Selection */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-amber-500/20 max-w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 shrink-0 font-mono">
                Preset Dossiers:
              </span>
              <div className="flex flex-wrap gap-2 max-w-full">
                {SAMPLE_STUDY_NOTES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setSelectedSubjectId(sample.id);
                      setCustomInputText('');
                      handleRunAi();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all truncate max-w-full ${
                      selectedSubjectId === sample.id && !customInputText
                        ? 'bg-amber-400 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                        : 'bg-[#040914] border border-amber-500/20 text-zinc-300 hover:text-amber-300 hover:border-amber-400/40'
                    }`}
                  >
                    {sample.subject === 'Neuroscience' && <Brain className="w-3.5 h-3.5 shrink-0" />}
                    {sample.subject === 'Chemistry' && <FlaskConical className="w-3.5 h-3.5 shrink-0" />}
                    {sample.subject === 'Computer Science' && <Code2 className="w-3.5 h-3.5 shrink-0" />}
                    <span className="truncate">{sample.subject}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Toggles */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1 bg-[#040914] p-1 rounded-xl border border-amber-500/30 max-w-full font-mono">
              <button
                onClick={() => {
                  setActiveAction('summary');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                  activeAction === 'summary'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-zinc-400 hover:text-amber-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-current shrink-0" />
                <span>Summarize</span>
              </button>

              <button
                onClick={() => {
                  setActiveAction('eli5');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                  activeAction === 'eli5'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-zinc-400 hover:text-amber-300'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-current shrink-0" />
                <span>ELI5</span>
              </button>

              <button
                onClick={() => {
                  setActiveAction('flashcards');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                  activeAction === 'flashcards'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-zinc-400 hover:text-amber-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-current shrink-0" />
                <span>Flashcards</span>
              </button>

              <button
                onClick={() => {
                  setActiveAction('tutor');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                  activeAction === 'tutor'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-zinc-400 hover:text-amber-300'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-current shrink-0" />
                <span>AI Tutor</span>
              </button>
            </div>
          </div>

          {/* Main Sandbox Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <FileText className="w-3.5 h-3.5 text-amber-400" /> RAW INPUT DOSSIER:
                  </label>
                  {customInputText && (
                    <button
                      onClick={() => setCustomInputText('')}
                      className="text-[10px] text-amber-300 hover:underline font-mono"
                    >
                      Reset to Preset
                    </button>
                  )}
                </div>
                <textarea
                  value={customInputText || currentSample.rawText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  placeholder="Paste any class notes, syllabus text, or textbook excerpt here..."
                  className="w-full h-56 bg-[#040914] border border-amber-500/30 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors resize-none font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 font-mono">
                <span className="text-[11px] text-zinc-400">
                  {customInputText.length ? `${customInputText.length} chars` : 'Using preset sample notes'}
                </span>
                <button
                  onClick={handleRunAi}
                  disabled={isProcessing}
                  className="btn-quantum-gold px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-950 ${isProcessing ? 'animate-spin' : ''}`} />
                  <span>{isProcessing ? 'AI Processing...' : 'Process with AI'}</span>
                </button>
              </div>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-7 bg-[#040914] border border-amber-500/30 rounded-xl p-5 flex flex-col justify-between relative min-h-[340px]">
              {isProcessing && (
                <div className="absolute inset-0 bg-[#040914]/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20">
                  <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mb-3 shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                  <p className="text-xs font-mono font-bold text-amber-300 animate-pulse uppercase tracking-wider">
                    StudyMind AI Analyzing Concepts & Structuring Output...
                  </p>
                </div>
              )}

              {/* ACTION = SUMMARY */}
              {activeAction === 'summary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                    <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                      <FileText className="w-4 h-4 text-amber-400" /> Generated Executive Summary
                    </span>
                    <button
                      onClick={() => handleCopy(currentSample.summary.keyTakeaways.join('\n'))}
                      className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 bg-[#081220] px-2.5 py-1 rounded-lg border border-amber-500/30"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                      <span className="font-mono text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block font-mono">
                      Key Takeaways ({currentSample.summary.keyTakeaways.length}):
                    </span>
                    <ul className="space-y-2">
                      {currentSample.summary.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="text-xs text-zinc-200 bg-[#081220] p-2.5 rounded-lg border border-amber-500/20 flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1.5 font-mono">
                      Core Terms & Vocabulary:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSample.summary.coreFormulasOrTerms.map((term, i) => (
                        <span key={i} className="text-[10px] font-mono bg-[#081220] text-amber-300 border border-amber-400/30 px-2 py-1 rounded-md">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION = ELI5 */}
              {activeAction === 'eli5' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                    <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                      <Lightbulb className="w-4 h-4 text-amber-400" /> "Explain Like I'm 5" Analogy Breakdown
                    </span>
                  </div>
                  <div className="bg-[#081220] border border-amber-500/20 p-4 rounded-xl text-xs text-zinc-200 leading-relaxed">
                    {currentSample.eli5Explanation}
                  </div>
                  <div className="bg-[#081220] p-3 rounded-xl border border-amber-500/20">
                    <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider block mb-1 font-mono">
                      🧠 Why this works:
                    </span>
                    <p className="text-xs text-zinc-300">
                      Cognitive psychology shows that mapping abstract academic concepts onto familiar physical metaphors increases exam recall speed by up to 340%.
                    </p>
                  </div>
                </div>
              )}

              {/* ACTION = FLASHCARDS */}
              {activeAction === 'flashcards' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                    <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                      <Layers className="w-4 h-4 text-amber-400" /> Generated Active Recall Cards ({currentSample.flashcards.length})
                    </span>
                    <span className="text-[10px] bg-[#081220] text-amber-300 px-2 py-0.5 rounded-full font-mono border border-amber-400/30">
                      Anki / Quizlet Ready
                    </span>
                  </div>
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {currentSample.flashcards.map((fc, i) => (
                      <div key={i} className="bg-[#081220] p-3 rounded-xl border border-amber-500/20 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                          <span className="font-extrabold text-amber-400">QUESTION #{i + 1}</span>
                          <span className="text-amber-300 font-bold uppercase">{fc.difficulty}</span>
                        </div>
                        <p className="text-xs text-white font-medium">{fc.question}</p>
                        <p className="text-[11px] text-zinc-300 pt-1.5 border-t border-amber-500/20">
                          <strong className="text-amber-400">Answer:</strong> {fc.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION = TUTOR */}
              {activeAction === 'tutor' && (
                <div className="space-y-3 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-amber-500/20 mb-3 font-mono">
                      <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                        <Bot className="w-4 h-4 text-amber-400" /> 24/7 Course AI Tutor
                      </span>
                      <span className="text-[10px] text-zinc-400">Grounded in Course Syllabus</span>
                    </div>

                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 font-mono">
                      <div className="bg-[#081220] p-2.5 rounded-lg border border-amber-500/20 text-xs text-zinc-200">
                        <span className="text-amber-400 font-bold block text-[10px]">TUTOR DEFAULT:</span>
                        I have indexed your notes for {currentSample.title}. Ask me any specific question about equations, mechanisms, or exam prep!
                      </div>

                      {customTutorChat.map((chat, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="bg-[#081220] p-2 rounded-lg text-xs text-white border border-amber-500/20">
                            <strong className="text-amber-400 block text-[10px]">YOU:</strong>
                            {chat.q}
                          </div>
                          <div className="bg-[#040914] border border-amber-400/30 p-2 rounded-lg text-xs text-zinc-200">
                            <strong className="text-amber-300 block text-[10px]">STUDYMIND AI:</strong>
                            {chat.a}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleAskTutor} className="flex gap-2 pt-2 border-t border-amber-500/20 font-mono">
                    <input
                      type="text"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      placeholder={`Ask tutor about ${currentSample.subject}...`}
                      className="flex-1 bg-[#081220] border border-amber-500/30 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      disabled={!userQuestion.trim()}
                      className="btn-quantum-gold px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase disabled:opacity-40 flex items-center gap-1"
                    >
                      <span>Ask</span>
                      <Send className="w-3 h-3 text-slate-950" />
                    </button>
                  </form>
                </div>
              )}

              {/* Bottom Unlock Full Power Banner */}
              <div className="mt-4 pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
                <span className="text-[11px] text-zinc-300 font-mono">
                  Ready to unlock unlimited PDF uploads, Anki exports & OCR handwriting?
                </span>
                <button
                  onClick={onOpenAuth}
                  className="btn-quantum-gold px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 w-full sm:w-auto"
                >
                  <span>UNLOCK UNLIMITED FREE</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
