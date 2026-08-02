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
    <section id="playground" className="py-24 relative bg-[#FBF9F5] border-y border-[#E6E1DA]">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#4A6B5D]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E6E1DA] text-[#4A6B5D] text-xs font-bold mb-4 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#4A6B5D]" />
            <span>Interactive Live AI Sandbox</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2D2B2A] tracking-tight">
            Try StudyMind AI Right Now
          </h2>

          <p className="mt-3 text-base text-[#736E65]">
            Select a preset course note or paste your own raw text below. Watch our AI engine process it instantly in real time!
          </p>
        </div>

        {/* Playground Container */}
        <div className="glass-card rounded-2xl border border-[#E6E1DA] p-4 sm:p-6 shadow-sm bg-[#FFFFFF]">
          {/* Top Control Bar: Subject Selection */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#E6E1DA] max-w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4A6B5D] shrink-0">
                Preset Subjects:
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all truncate max-w-full ${
                      selectedSubjectId === sample.id && !customInputText
                        ? 'bg-[#4A6B5D] text-white shadow-xs'
                        : 'bg-[#FBF9F5] border border-[#E6E1DA] text-[#736E65] hover:text-[#2D2B2A]'
                    }`}
                  >
                    {sample.subject === 'Neuroscience' && <Brain className="w-3.5 h-3.5 text-[#4A6B5D] shrink-0" />}
                    {sample.subject === 'Chemistry' && <FlaskConical className="w-3.5 h-3.5 text-[#4A6B5D] shrink-0" />}
                    {sample.subject === 'Computer Science' && <Code2 className="w-3.5 h-3.5 text-[#4A6B5D] shrink-0" />}
                    <span className="truncate">{sample.subject}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Toggles */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1 bg-[#FBF9F5] p-1 rounded-xl border border-[#E6E1DA] max-w-full">
              <button
                onClick={() => {
                  setActiveAction('summary');
                  handleRunAi();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeAction === 'summary'
                    ? 'bg-[#4A6B5D] text-white font-extrabold shadow-xs'
                    : 'text-[#736E65] hover:text-[#2D2B2A]'
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeAction === 'eli5'
                    ? 'bg-[#4A6B5D] text-white font-extrabold shadow-xs'
                    : 'text-[#736E65] hover:text-[#2D2B2A]'
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeAction === 'flashcards'
                    ? 'bg-[#4A6B5D] text-white font-extrabold shadow-xs'
                    : 'text-[#736E65] hover:text-[#2D2B2A]'
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeAction === 'tutor'
                    ? 'bg-[#4A6B5D] text-white font-extrabold shadow-xs'
                    : 'text-[#736E65] hover:text-[#2D2B2A]'
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
                  <label className="text-xs font-bold text-[#736E65] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#4A6B5D]" /> Input Study Notes / Textbook Text:
                  </label>
                  {customInputText && (
                    <button
                      onClick={() => setCustomInputText('')}
                      className="text-[10px] text-[#4A6B5D] hover:text-[#3D5A4E] underline"
                    >
                      Reset to Preset
                    </button>
                  )}
                </div>
                <textarea
                  value={customInputText || currentSample.rawText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  placeholder="Paste any class notes, syllabus text, or textbook excerpt here..."
                  className="w-full h-56 bg-[#FBF9F5] border border-[#E6E1DA] rounded-xl p-3 text-xs text-[#2D2B2A] focus:outline-none focus:border-[#4A6B5D] transition-colors resize-none font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E6E1DA]">
                <span className="text-[11px] text-[#736E65]">
                  {customInputText.length ? `${customInputText.length} chars` : 'Using preset sample notes'}
                </span>
                <button
                  onClick={handleRunAi}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-[#4A6B5D] hover:bg-[#3D5A4E] shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-white ${isProcessing ? 'animate-spin' : ''}`} />
                  <span>{isProcessing ? 'AI Processing...' : 'Process with AI'}</span>
                </button>
              </div>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-7 bg-[#FBF9F5] border border-[#E6E1DA] rounded-xl p-5 flex flex-col justify-between relative min-h-[340px]">
              {isProcessing && (
                <div className="absolute inset-0 bg-[#FBF9F5]/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20">
                  <div className="w-10 h-10 rounded-full border-2 border-[#4A6B5D] border-t-transparent animate-spin mb-3" />
                  <p className="text-xs font-bold text-[#4A6B5D] animate-pulse">
                    StudyMind AI Analyzing Concepts & Structuring Output...
                  </p>
                </div>
              )}

              {/* ACTION = SUMMARY */}
              {activeAction === 'summary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6E1DA]">
                    <span className="text-xs font-bold text-[#4A6B5D] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#4A6B5D]" /> Generated Executive Summary
                    </span>
                    <button
                      onClick={() => handleCopy(currentSample.summary.keyTakeaways.join('\n'))}
                      className="text-xs text-[#736E65] hover:text-[#2D2B2A] flex items-center gap-1 bg-[#FFFFFF] px-2.5 py-1 rounded-lg border border-[#E6E1DA]"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#4A6B5D]" /> : <Copy className="w-3.5 h-3.5 text-[#4A6B5D]" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#4A6B5D] uppercase tracking-wider block">
                      Key Takeaways ({currentSample.summary.keyTakeaways.length}):
                    </span>
                    <ul className="space-y-2">
                      {currentSample.summary.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="text-xs text-[#2D2B2A] bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E6E1DA] flex items-start gap-2">
                          <span className="text-[#C85A32] font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#4A6B5D] uppercase tracking-wider block mb-1.5">
                      Core Terms & Vocabulary:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSample.summary.coreFormulasOrTerms.map((term, i) => (
                        <span key={i} className="text-[10px] font-mono bg-[#FFFFFF] text-[#4A6B5D] border border-[#E6E1DA] px-2 py-1 rounded-lg">
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
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6E1DA]">
                    <span className="text-xs font-bold text-[#4A6B5D] flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#4A6B5D]" /> "Explain Like I'm 5" Analogy Breakdown
                    </span>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E6E1DA] p-4 rounded-xl text-xs text-[#2D2B2A] leading-relaxed font-sans">
                    {currentSample.eli5Explanation}
                  </div>
                  <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E6E1DA]">
                    <span className="text-xs font-bold text-[#4A6B5D] block mb-1">
                      🧠 Why this works:
                    </span>
                    <p className="text-xs text-[#736E65]">
                      Cognitive psychology shows that mapping abstract academic concepts onto familiar physical metaphors increases exam recall speed by up to 340%.
                    </p>
                  </div>
                </div>
              )}

              {/* ACTION = FLASHCARDS */}
              {activeAction === 'flashcards' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6E1DA]">
                    <span className="text-xs font-bold text-[#4A6B5D] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#4A6B5D]" /> Generated Active Recall Cards ({currentSample.flashcards.length})
                    </span>
                    <span className="text-[10px] bg-[#FFFFFF] text-[#4A6B5D] px-2 py-0.5 rounded-lg font-mono border border-[#E6E1DA]">
                      Anki / Quizlet Ready
                    </span>
                  </div>
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {currentSample.flashcards.map((fc, i) => (
                      <div key={i} className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E6E1DA] space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-[#736E65]">
                          <span className="font-bold text-[#4A6B5D]">QUESTION #{i + 1}</span>
                          <span className="text-[#4A6B5D] font-semibold">{fc.difficulty}</span>
                        </div>
                        <p className="text-xs text-[#2D2B2A] font-medium">{fc.question}</p>
                        <p className="text-[11px] text-[#736E65] pt-1.5 border-t border-[#E6E1DA]">
                          <strong className="text-[#C85A32]">Answer:</strong> {fc.answer}
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
                    <div className="flex items-center justify-between pb-2 border-b border-[#E6E1DA] mb-3">
                      <span className="text-xs font-bold text-[#4A6B5D] flex items-center gap-2">
                        <Bot className="w-4 h-4 text-[#4A6B5D]" /> 24/7 Course AI Tutor
                      </span>
                      <span className="text-[10px] text-[#736E65]">Grounded in Course Syllabus</span>
                    </div>

                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                      <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E6E1DA] text-xs text-[#2D2B2A]">
                        <span className="text-[#4A6B5D] font-bold block text-[10px]">TUTOR DEFAULT:</span>
                        I have indexed your notes for {currentSample.title}. Ask me any specific question about equations, mechanisms, or exam prep!
                      </div>

                      {customTutorChat.map((chat, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="bg-[#FFFFFF] p-2 rounded-xl text-xs text-[#2D2B2A] border border-[#E6E1DA]">
                            <strong className="text-[#4A6B5D] block text-[10px]">YOU:</strong>
                            {chat.q}
                          </div>
                          <div className="bg-[#F3EFEA] border border-[#E6E1DA] p-2 rounded-xl text-xs text-[#2D2B2A]">
                            <strong className="text-[#C85A32] block text-[10px]">STUDYMIND AI:</strong>
                            {chat.a}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleAskTutor} className="flex gap-2 pt-2 border-t border-[#E6E1DA]">
                    <input
                      type="text"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      placeholder={`Ask tutor about ${currentSample.subject}...`}
                      className="flex-1 bg-[#FFFFFF] border border-[#E6E1DA] rounded-xl px-3 py-1.5 text-xs text-[#2D2B2A] focus:outline-none focus:border-[#4A6B5D]"
                    />
                    <button
                      type="submit"
                      disabled={!userQuestion.trim()}
                      className="px-3 py-1.5 rounded-xl bg-[#4A6B5D] hover:bg-[#3D5A4E] text-white text-xs font-extrabold disabled:opacity-40 flex items-center gap-1"
                    >
                      <span>Ask</span>
                      <Send className="w-3 h-3 text-white" />
                    </button>
                  </form>
                </div>
              )}

              {/* Bottom Unlock Full Power Banner */}
              <div className="mt-4 pt-3 border-t border-[#E6E1DA] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
                <span className="text-[11px] text-[#736E65]">
                  Ready to unlock unlimited PDF uploads, Anki exports & OCR handwriting?
                </span>
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white bg-[#4A6B5D] hover:bg-[#3D5A4E] transition-opacity flex items-center justify-center gap-1.5 shrink-0 w-full sm:w-auto shadow-xs"
                >
                  <span>Unlock Unlimited AI Free</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
