import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, FileText, Lightbulb, Layers, Bot, Send, RefreshCw, Copy, Check, ArrowRight, Play, Brain, Code2, FlaskConical, Globe } from 'lucide-react';
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
  const activeContent = customInputText.trim() ? customInputText : currentSample.rawText;

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
    <section id="playground" className="py-24 relative bg-zinc-950 border-y border-emerald-950">
      {/* Radial Background Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Live AI Sandbox</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Try StudyMind AI Right Now
          </h2>

          <p className="mt-3 text-base text-slate-300">
            Select a preset course note or paste your own raw text below. Watch our AI engine process it instantly in real time!
          </p>
        </div>

        {/* Playground Container */}
        <div className="glass-card rounded-2xl border border-emerald-500/30 p-4 sm:p-6 shadow-2xl bg-zinc-950">
          {/* Top Control Bar: Subject Selection */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-emerald-950">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Preset Subjects:
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_STUDY_NOTES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setSelectedSubjectId(sample.id);
                      setCustomInputText('');
                      handleRunAi();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      selectedSubjectId === sample.id && !customInputText
                        ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                        : 'bg-zinc-900 border border-emerald-500/20 text-slate-300 hover:text-white'
                    }`}
                  >
                    {sample.subject === 'Neuroscience' && <Brain className="w-3.5 h-3.5 text-emerald-400" />}
                    {sample.subject === 'Chemistry' && <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />}
                    {sample.subject === 'Computer Science' && <Code2 className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{sample.subject}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Toggles */}
            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-emerald-500/20">
              <button
                onClick={() => {
                  setActiveAction('summary');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeAction === 'summary'
                    ? 'bg-emerald-500 text-black font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-current" />
                <span>Summarize</span>
              </button>

              <button
                onClick={() => {
                  setActiveAction('eli5');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeAction === 'eli5'
                    ? 'bg-emerald-500 text-black font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-current" />
                <span>ELI5</span>
              </button>

              <button
                onClick={() => {
                  setActiveAction('flashcards');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeAction === 'flashcards'
                    ? 'bg-emerald-500 text-black font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-current" />
                <span>Flashcards</span>
              </button>

              <button
                onClick={() => {
                  setActiveAction('tutor');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeAction === 'tutor'
                    ? 'bg-emerald-500 text-black font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-current" />
                <span>AI Tutor Chat</span>
              </button>
            </div>
          </div>

          {/* Main Sandbox Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" /> Input Study Notes / Textbook Text:
                  </label>
                  {customInputText && (
                    <button
                      onClick={() => setCustomInputText('')}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Reset to Preset
                    </button>
                  )}
                </div>
                <textarea
                  value={customInputText || currentSample.rawText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  placeholder="Paste any class notes, syllabus text, or textbook excerpt here..."
                  className="w-full h-56 bg-zinc-900 border border-emerald-500/20 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 transition-colors resize-none font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-950">
                <span className="text-[11px] text-slate-400">
                  {customInputText.length ? `${customInputText.length} chars` : 'Using preset sample notes'}
                </span>
                <button
                  onClick={handleRunAi}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-lg text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-black ${isProcessing ? 'animate-spin' : ''}`} />
                  <span>{isProcessing ? 'AI Processing...' : 'Process with AI'}</span>
                </button>
              </div>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-7 bg-zinc-900/90 border border-emerald-500/30 rounded-xl p-5 flex flex-col justify-between relative min-h-[340px]">
              {isProcessing && (
                <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mb-3" />
                  <p className="text-xs font-bold text-emerald-300 animate-pulse">
                    StudyMind AI Analyzing Concepts & Structuring Output...
                  </p>
                </div>
              )}

              {/* ACTION = SUMMARY */}
              {activeAction === 'summary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" /> Generated Executive Summary
                    </span>
                    <button
                      onClick={() => handleCopy(currentSample.summary.keyTakeaways.join('\n'))}
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded border border-emerald-500/30"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Key Takeaways ({currentSample.summary.keyTakeaways.length}):
                    </span>
                    <ul className="space-y-2">
                      {currentSample.summary.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="text-xs text-slate-200 bg-zinc-950 p-2.5 rounded-lg border border-emerald-500/20 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
                      Core Terms & Vocabulary:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSample.summary.coreFormulasOrTerms.map((term, i) => (
                        <span key={i} className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-1 rounded-md">
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
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-emerald-400" /> "Explain Like I'm 5" Analogy Breakdown
                    </span>
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-100 leading-relaxed font-sans">
                    {currentSample.eli5Explanation}
                  </div>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">
                      🧠 Why this works:
                    </span>
                    <p className="text-xs text-slate-300">
                      Cognitive psychology shows that mapping abstract academic concepts onto familiar physical metaphors increases exam recall speed by up to 340%.
                    </p>
                  </div>
                </div>
              )}

              {/* ACTION = FLASHCARDS */}
              {activeAction === 'flashcards' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" /> Generated Active Recall Cards ({currentSample.flashcards.length})
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                      Anki / Quizlet Ready
                    </span>
                  </div>
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {currentSample.flashcards.map((fc, i) => (
                      <div key={i} className="bg-zinc-950 p-3 rounded-xl border border-emerald-500/20 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-bold text-emerald-400">QUESTION #{i + 1}</span>
                          <span className="text-emerald-300 font-semibold">{fc.difficulty}</span>
                        </div>
                        <p className="text-xs text-white font-medium">{fc.question}</p>
                        <p className="text-[11px] text-slate-300 pt-1.5 border-t border-emerald-950">
                          <strong className="text-emerald-400">Answer:</strong> {fc.answer}
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
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-950 mb-3">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-emerald-400" /> 24/7 Course AI Tutor
                      </span>
                      <span className="text-[10px] text-slate-400">Grounded in Course Syllabus</span>
                    </div>

                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                      <div className="bg-zinc-950 p-2.5 rounded-lg border border-emerald-500/20 text-xs text-slate-200">
                        <span className="text-emerald-400 font-bold block text-[10px]">TUTOR DEFAULT:</span>
                        I have indexed your notes for {currentSample.title}. Ask me any specific question about equations, mechanisms, or exam prep!
                      </div>

                      {customTutorChat.map((chat, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="bg-zinc-950 p-2 rounded-lg text-xs text-slate-200 border border-emerald-500/20">
                            <strong className="text-emerald-400 block text-[10px]">YOU:</strong>
                            {chat.q}
                          </div>
                          <div className="bg-emerald-950/40 border border-emerald-500/30 p-2 rounded-lg text-xs text-emerald-100">
                            <strong className="text-emerald-300 block text-[10px]">STUDYMIND AI:</strong>
                            {chat.a}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleAskTutor} className="flex gap-2 pt-2 border-t border-emerald-950">
                    <input
                      type="text"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      placeholder={`Ask tutor about ${currentSample.subject}...`}
                      className="flex-1 bg-zinc-950 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      type="submit"
                      disabled={!userQuestion.trim()}
                      className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-extrabold disabled:opacity-40 flex items-center gap-1"
                    >
                      <span>Ask</span>
                      <Send className="w-3 h-3 text-black" />
                    </button>
                  </form>
                </div>
              )}

              {/* Bottom Unlock Full Power Banner */}
              <div className="mt-4 pt-3 border-t border-emerald-950 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  Ready to unlock unlimited PDF uploads, Anki exports & OCR handwriting?
                </span>
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 transition-opacity flex items-center gap-1.5"
                >
                  <span>Unlock Unlimited AI Free</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
