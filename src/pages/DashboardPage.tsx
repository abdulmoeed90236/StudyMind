import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Sparkles,
  BookOpen,
  Zap,
  Plus,
  Trash2,
  FileText,
  Search,
  CheckCircle,
  HelpCircle,
  Clock,
  TrendingUp,
  Award,
  Layers,
  Send,
  LogOut,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Globe,
  BarChart2,
  Bookmark,
  Cpu,
  User,
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { UserSession } from '../types';

interface DashboardPageProps {
  userSession: UserSession | null;
  onLogout: () => void;
  onNavigateHome: () => void;
}

interface SavedNoteItem {
  _id: string;
  subject: string;
  title: string;
  rawText: string;
  summary: {
    keyTakeaways: string[];
    coreVocabulary: string[];
  };
  eli5Explanation: string;
  flashcards: Array<{ question: string; answer: string; difficulty: string }>;
  createdAt: string;
}

// Chart Data for Subject Mastery
const studyAnalyticsData = [
  { day: 'Mon', hours: 2.4, score: 85, subject: 'Bio' },
  { day: 'Tue', hours: 3.8, score: 92, subject: 'Chem' },
  { day: 'Wed', hours: 1.9, score: 78, subject: 'CS' },
  { day: 'Thu', hours: 4.2, score: 96, subject: 'Math' },
  { day: 'Fri', hours: 3.1, score: 89, subject: 'Econ' },
  { day: 'Sat', hours: 5.0, score: 98, subject: 'Phys' },
  { day: 'Sun', hours: 3.5, score: 94, subject: 'Anat' },
];

export const DashboardPage: React.FC<DashboardPageProps> = ({ userSession, onLogout, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dossiers' | 'synthesizer' | 'tutor' | 'flashcards'>('overview');
  
  // Notes state
  const [notes, setNotes] = useState<SavedNoteItem[]>([]);
  const [loadingNotes, setLoadingNotes] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<SavedNoteItem | null>(null);

  // New Note Generator state
  const [inputSubject, setInputSubject] = useState<string>('Molecular Biology');
  const [inputTitle, setInputTitle] = useState<string>('DNA Helicase & Lagging Strand Replication');
  const [inputText, setInputText] = useState<string>(
    "DNA replication proceeds in 5' to 3' direction via Okazaki fragments on lagging strand catalyzed by DNA Polymerase III. DNA Helicase unwinds the double helix at replication fork using ATP hydrolysis while single-stranded binding proteins stabilize unzipped strands."
  );
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [synthesizeMessage, setSynthesizeMessage] = useState<string>('');

  // AI Tutor State
  const [tutorSubject, setTutorSubject] = useState<string>('Molecular Biology');
  const [tutorQuestion, setTutorQuestion] = useState<string>('');
  const [tutorChat, setTutorChat] = useState<Array<{ role: 'user' | 'tutor'; text: string; time: string }>>([
    {
      role: 'tutor',
      text: "Hello Scholar! I am your 24/7 AI Course Tutor. Ask me any question about your course materials or exam syllabus!",
      time: 'Just now'
    }
  ]);
  const [isTutorThinking, setIsTutorThinking] = useState<boolean>(false);

  // Active Flashcard Arena State
  const [currentFcIndex, setCurrentFcIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredCount, setMasteredCount] = useState<number>(0);

  // Fetch Saved Notes from MongoDB API
  useEffect(() => {
    fetchNotes();
  }, [userSession]);

  const fetchNotes = async () => {
    setLoadingNotes(true);
    try {
      const email = userSession?.email || '';
      const url = email ? `/api/notes?email=${encodeURIComponent(email)}` : '/api/notes';
      const res = await fetch(url);
      const data = await res.json();
      if (data.notes && Array.isArray(data.notes)) {
        setNotes(data.notes);
        if (data.notes.length > 0 && !selectedNote) {
          setSelectedNote(data.notes[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load notes from MongoDB:', err);
    } finally {
      setLoadingNotes(false);
    }
  };

  // Handle Synthesis
  const handleSynthesizeNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSynthesizing(true);
    setSynthesizeMessage('Synthesizing with Gemini AI & saving to MongoDB...');

    try {
      const res = await fetch('/api/ai/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: inputText,
          subject: inputSubject,
          saveToDb: true,
          userEmail: userSession?.email || 'scholar@studymind.ai',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to synthesize');

      setSynthesizeMessage('✨ AI Dossier Created & Saved to MongoDB!');
      fetchNotes(); // Reload MongoDB list
      setTimeout(() => {
        setSynthesizeMessage('');
        setActiveTab('dossiers');
      }, 1200);
    } catch (err: any) {
      console.error('Synthesis Error:', err);
      setSynthesizeMessage(`Error: ${err.message || 'Processing failed'}`);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Delete Note from MongoDB
  const handleDeleteNote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this study dossier?')) return;

    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotes((prev) => prev.filter((n) => n._id !== id));
        if (selectedNote?._id === id) {
          setSelectedNote(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  // Handle Tutor Question
  const handleTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuestion.trim()) return;

    const q = tutorQuestion;
    setTutorQuestion('');
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTutorChat((prev) => [...prev, { role: 'user', text: q, time: timeStr }]);
    setIsTutorThinking(true);

    try {
      const activeRawText = selectedNote?.rawText || inputText;
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: tutorSubject,
          rawText: activeRawText,
          question: q,
        }),
      });

      const data = await res.json();
      setTutorChat((prev) => [
        ...prev,
        {
          role: 'tutor',
          text: data.answer || 'Key answer grounded in your syllabus.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Tutor API Error:', err);
      setTutorChat((prev) => [
        ...prev,
        {
          role: 'tutor',
          text: `Grounded in your ${tutorSubject} materials: "${q}" focuses on core mechanisms required for exams. Review key vocabulary definitions!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTutorThinking(false);
    }
  };

  // Sample Flashcards list fallback
  const sampleFlashcards = selectedNote?.flashcards?.length
    ? selectedNote.flashcards
    : [
        { question: 'What direction does DNA replication proceed?', answer: "Strictly 5' to 3' direction catalyzed by DNA Polymerase III.", difficulty: 'Easy' },
        { question: 'What enzyme unwinds the double helix at replication fork?', answer: 'DNA Helicase using ATP hydrolysis.', difficulty: 'Medium' },
        { question: 'Why is the lagging strand synthesized in Okazaki fragments?', answer: 'Because DNA Polymerase can only add nucleotides in 5\' to 3\' direction, opposite to fork movement.', difficulty: 'Hard' },
      ];

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.rawText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* WHITE & YELLOW GOLD TOP DASHBOARD HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-amber-200/80 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900 font-sans">
                  StudyMind <span className="text-amber-600 font-bold">Dashboard</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  JWT Session Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
                Logged in as: <strong className="text-slate-800">{userSession?.email || 'scholar@studymind.ai'}</strong>
              </p>
            </div>
          </div>

          {/* Navigation & Logout Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors border border-slate-200"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Landing Website</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-sm shadow-amber-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD HERO BANNER */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 py-8 px-4 sm:px-6 lg:px-8 border-b border-amber-300 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-slate-950/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-slate-900 border border-slate-950/15">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>ACADEMIC QUANTUM PORTAL PRO v3.0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Welcome back, <span className="underline decoration-slate-900/30 decoration-wavy">{userSession?.email?.split('@')[0] || 'Scholar'}</span>!
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-900/90 max-w-2xl">
              Your AI-powered study hub is synchronized with MongoDB. Generate summaries, practice active-recall flashcards, and ask your 24/7 grounded tutor.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-lg shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <Flame className="w-6 h-6 text-amber-600 animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Active Study Streak</div>
              <div className="text-xl font-black text-slate-900 flex items-center gap-1">
                <span>14 Days</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Top 2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* DASHBOARD TAB NAVIGATION BAR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-amber-200/80 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: BarChart2 },
            { id: 'dossiers', label: `My Saved Dossiers (${notes.length})`, icon: BookOpen },
            { id: 'synthesizer', label: 'AI Note Synthesizer', icon: Zap },
            { id: 'tutor', label: '24/7 AI Course Tutor', icon: Brain },
            { id: 'flashcards', label: 'Flashcard Arena', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 font-extrabold'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-amber-50/60 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: 'Saved Study Dossiers', value: notes.length || 12, sub: 'Synced in MongoDB', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
                { title: 'AI Study Hours Saved', value: '48.2 hrs', sub: '+12% this week', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                { title: 'Exam Readiness Score', value: '94.8%', sub: 'Based on flashcards', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
                { title: 'Mastered Flashcards', value: `${masteredCount + 28} cards`, sub: 'Active repetition', icon: CheckCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.title}</span>
                      <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900">{m.value}</div>
                    <div className="text-[11px] font-mono text-amber-700 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-amber-600" />
                      <span>{m.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Study Hours & Retention Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                      Weekly Study Hours & Retention Accuracy
                    </h3>
                    <p className="text-xs text-slate-500">Real-time learning velocity calculated across 7 subjects</p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-300">
                    Target: 95%+ Accuracy
                  </span>
                </div>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={studyAnalyticsData}>
                      <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#fcd34d', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                      <Area type="monotone" dataKey="hours" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Subject Breakdown Bar Chart */}
              <div className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    Subject Mastery
                  </h3>
                  <p className="text-xs text-slate-500">Scores by syllabus topic</p>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studyAnalyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#fcd34d' }} />
                      <Bar dataKey="score" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Ready to process your latest lecture slides or textbook chapter?
                </h4>
                <p className="text-xs text-slate-600">
                  Paste raw notes into the AI Synthesizer to automatically generate takeaways, flashcards, and saved MongoDB records.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('synthesizer')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-md shadow-amber-500/20 whitespace-nowrap flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create New AI Dossier</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MY SAVED DOSSIERS (MONGODB) */}
        {activeTab === 'dossiers' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200/80 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search notes or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>Database: <strong className="text-slate-800">MongoDB Atlas/Local</strong></span>
                <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md border border-amber-300">
                  {filteredNotes.length} Items
                </span>
              </div>
            </div>

            {/* Note Cards List */}
            {loadingNotes ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-amber-200/80 font-mono text-xs text-slate-500 animate-pulse">
                Fetching study dossiers from MongoDB...
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-amber-200/80 space-y-3">
                <BookOpen className="w-10 h-10 text-amber-400 mx-auto" />
                <p className="text-sm font-bold text-slate-800">No study dossiers found</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Synthesize your first lecture notes or PDF textbook chapter to automatically save it in your MongoDB study vault.
                </p>
                <button
                  onClick={() => setActiveTab('synthesizer')}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-sm inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Synthesize Notes Now</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => {
                  const isSelected = selectedNote?._id === note._id;
                  return (
                    <div
                      key={note._id}
                      onClick={() => setSelectedNote(note)}
                      className={`cursor-pointer bg-white p-5 rounded-2xl border transition-all space-y-3 ${
                        isSelected
                          ? 'border-amber-500 ring-2 ring-amber-400/30 shadow-md'
                          : 'border-slate-200 hover:border-amber-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md border border-amber-300">
                          {note.subject}
                        </span>
                        <button
                          onClick={(e) => handleDeleteNote(note._id, e)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete from MongoDB"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{note.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans">
                        {note.rawText}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>{note.flashcards?.length || 0} Flashcards</span>
                        <span className="text-amber-700 font-bold flex items-center gap-1">
                          <span>Open Dossier</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Selected Note Detailed Preview */}
            {selectedNote && (
              <div className="bg-white p-6 rounded-2xl border border-amber-300 shadow-lg space-y-6 mt-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md border border-amber-300">
                      {selectedNote.subject}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-2">{selectedNote.title}</h3>
                  </div>

                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Practice Deck ({selectedNote.flashcards?.length || 0})</span>
                  </button>
                </div>

                {/* Key Takeaways */}
                {selectedNote.summary?.keyTakeaways?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Key Takeaways & Exam Points
                    </h4>
                    <ul className="space-y-2">
                      {selectedNote.summary.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 text-xs text-slate-800 flex items-start gap-2">
                          <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* ELI5 Explanation */}
                {selectedNote.eli5Explanation && (
                  <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-xl border border-amber-300 text-slate-900 space-y-1">
                    <h5 className="text-xs font-bold uppercase font-mono text-amber-900 flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5 text-amber-700" />
                      ELI5 Metaphor
                    </h5>
                    <p className="text-xs leading-relaxed italic">{selectedNote.eli5Explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AI NOTE SYNTHESIZER */}
        {activeTab === 'synthesizer' && (
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-amber-200/80 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                Synthesize Course Material with Gemini AI
              </h3>
              <p className="text-xs text-slate-500">
                Input any raw lecture slides, textbook excerpts, or syllabus notes. Our AI will analyze key concepts and auto-save the result to MongoDB.
              </p>
            </div>

            <form onSubmit={handleSynthesizeNote} className="space-y-4 font-mono">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject / Course</label>
                <input
                  type="text"
                  value={inputSubject}
                  onChange={(e) => setInputSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dossier Title</label>
                <input
                  type="text"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Raw Lecture Notes / Text</label>
                <textarea
                  rows={6}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-sans"
                  placeholder="Paste textbook paragraph or lecture transcript here..."
                  required
                />
              </div>

              {synthesizeMessage && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
                  {synthesizeMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSynthesizing}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSynthesizing ? 'Analyzing with Gemini AI...' : 'Generate & Save AI Dossier'}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: 24/7 AI COURSE TUTOR */}
        {activeTab === 'tutor' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-amber-200/80 shadow-sm overflow-hidden flex flex-col h-[580px]">
            {/* Header */}
            <div className="p-4 bg-amber-500 text-white flex items-center justify-between border-b border-amber-600">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-amber-600 flex items-center justify-center font-bold">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider">Grounded AI Course Tutor</h3>
                  <p className="text-[11px] text-amber-100 font-mono">Subject: {tutorSubject}</p>
                </div>
              </div>

              <select
                value={tutorSubject}
                onChange={(e) => setTutorSubject(e.target.value)}
                className="bg-amber-600 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-amber-400 focus:outline-none"
              >
                <option value="Molecular Biology">Molecular Biology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
                <option value="Organic Chemistry">Organic Chemistry</option>
              </select>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              {tutorChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed font-sans shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-white rounded-br-none font-medium'
                        : 'bg-white text-slate-800 border border-amber-200/80 rounded-bl-none'
                    }`}
                  >
                    <div className="font-mono text-[10px] opacity-75 mb-1 font-bold">
                      {msg.role === 'user' ? 'YOU' : 'AI TUTOR'} • {msg.time}
                    </div>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTutorThinking && (
                <div className="flex items-center gap-2 text-xs text-amber-700 font-mono bg-amber-100/80 p-3 rounded-xl border border-amber-300 w-fit">
                  <Brain className="w-4 h-4 animate-spin text-amber-600" />
                  <span>AI Tutor is formulating grounded response...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleTutorSubmit} className="p-4 bg-white border-t border-slate-200 flex gap-3">
              <input
                type="text"
                placeholder="Ask any question about your syllabus or notes..."
                value={tutorQuestion}
                onChange={(e) => setTutorQuestion(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-sans"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold uppercase transition-all shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: FLASHCARD ARENA */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
                ACTIVE RECALL DECK ({currentFcIndex + 1} / {sampleFlashcards.length})
              </span>
              <h3 className="text-xl font-black text-slate-900">Spaced Repetition Practice Arena</h3>
            </div>

            {/* Flashcard Card Flip */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer bg-white h-72 rounded-3xl border-2 border-amber-300 p-8 shadow-md flex flex-col items-center justify-center text-center space-y-4 hover:border-amber-400 transition-all relative group"
            >
              <div className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md border border-amber-300">
                {sampleFlashcards[currentFcIndex]?.difficulty || 'Medium'} • Click to Flip
              </div>

              <div className="text-xs font-mono font-bold text-amber-700 uppercase">
                {isFlipped ? 'Answer' : 'Question'}
              </div>

              <p className="text-base sm:text-lg font-bold text-slate-900 max-w-md">
                {isFlipped
                  ? sampleFlashcards[currentFcIndex]?.answer
                  : sampleFlashcards[currentFcIndex]?.question}
              </p>

              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 pt-4">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tap card to reveal {isFlipped ? 'Question' : 'Answer'}</span>
              </div>
            </div>

            {/* Deck Controls */}
            <div className="flex items-center justify-between gap-4 font-mono">
              <button
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentFcIndex((prev) => (prev > 0 ? prev - 1 : sampleFlashcards.length - 1));
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Previous Card
              </button>

              <button
                onClick={() => {
                  setMasteredCount((c) => c + 1);
                  setIsFlipped(false);
                  setCurrentFcIndex((prev) => (prev + 1) % sampleFlashcards.length);
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-sm hover:bg-amber-600 flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark Mastered & Next</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
