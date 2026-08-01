import { Testimonial, PricingPlan, Feature, SampleStudyNote, FaqItem } from '../types';

export const UNIVERSITIES = [
  { name: 'Stanford University', logoText: 'Stanford' },
  { name: 'MIT', logoText: 'MIT' },
  { name: 'Harvard', logoText: 'Harvard' },
  { name: 'UC Berkeley', logoText: 'UC Berkeley' },
  { name: 'Oxford University', logoText: 'Oxford' },
  { name: 'Columbia University', logoText: 'Columbia' },
];

export const FEATURES_DATA: Feature[] = [
  {
    id: 'instant-summarizer',
    iconName: 'FileText',
    title: 'Instant Document Summarizer',
    shortDesc: 'Condense 50-page PDFs, lecture slides, and dense textbooks into 5-minute executive summaries.',
    fullDesc: 'Upload raw notes, research papers, or recorded lecture transcripts. StudyMind extracts critical takeaways, key formulas, bullet lists, and core definitions in seconds.',
    badge: '10x Faster Reading',
    gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
    highlights: [
      'PDF & DOCX Multi-File Upload',
      'Automatic Glossary & Key Terms Extraction',
      'Downloadable Markdown & PDF Cheatsheets'
    ],
    demoType: 'summary'
  },
  {
    id: 'explain-eli5',
    iconName: 'Sparkles',
    title: 'Explain Like I\'m 5',
    shortDesc: 'Deconstruct complex quantum physics, organic chemistry, or algorithms into crystal-clear analogies.',
    fullDesc: 'Stuck on a tricky concept? Ask StudyMind to re-explain it using relatable real-world analogies, step-by-step logic, visual diagrams, or beginner-friendly metaphors.',
    badge: 'Zero Jargon',
    gradient: 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20',
    highlights: [
      'Adjustable Explanation Depth (5-yr-old to PhD)',
      'Real-World Analogies & Intuitive Examples',
      'Interactive Concept Maps'
    ],
    demoType: 'explain'
  },
  {
    id: 'smart-flashcards',
    iconName: 'Layers',
    title: 'Smart Flashcard Generator',
    shortDesc: 'Automatically generate spaced-repetition flashcards from your notes for active recall.',
    fullDesc: 'Turn raw class material into interactive decks. Uses proven cognitive spaced-repetition algorithms to test your weakest areas right before exam day.',
    badge: 'Active Recall',
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    highlights: [
      'One-Click Anki & Quizlet Export',
      'Difficulty-based Spaced Repetition',
      'Practice Exam Simulation Mode'
    ],
    demoType: 'flashcards'
  },
  {
    id: 'ai-tutor-247',
    iconName: 'Bot',
    title: '24/7 Personal AI Tutor',
    shortDesc: 'Ask questions anytime. Get instant math step-by-step derivations, code debugging, and essay feedback.',
    fullDesc: 'Your personal TA that never sleeps. Grounded directly in your course syllabus and class notes so answers are 100% accurate without hallucinations.',
    badge: 'Context-Aware AI',
    gradient: 'from-violet-500/20 via-indigo-500/20 to-blue-500/20',
    highlights: [
      'Cites Specific Pages in Your Notes',
      'LaTeX Math Rendering & Code Execution',
      'Syllabus & Assignment Alignment'
    ],
    demoType: 'tutor'
  }
];

export const SAMPLE_STUDY_NOTES: SampleStudyNote[] = [
  {
    id: 'neuroscience-101',
    subject: 'Neuroscience',
    icon: 'Brain',
    title: 'Synaptic Transmission & Neurotransmitters',
    rawText: `Synaptic transmission is the process by which signaling molecules called neurotransmitters are released by the axon terminal of a neuron (the presynaptic neuron), and bind to and activate the receptors on the dendrite of another neuron (the postsynaptic neuron). Action potential arrives at axon terminal causing voltage-gated Ca2+ channels to open. Calcium entry triggers exocytosis of synaptic vesicles containing neurotransmitters into the synaptic cleft. Glutamate is the primary excitatory neurotransmitter, while GABA is the primary inhibitory neurotransmitter in the central nervous system.`,
    summary: {
      keyTakeaways: [
        'Presynaptic axon terminal fires action potential -> opens Ca2+ channels.',
        'Ca2+ influx triggers exocytosis of synaptic vesicles into the cleft.',
        'Neurotransmitters bind to postsynaptic dendrite receptors.',
        'Glutamate = primary EXCITATORY; GABA = primary INHIBITORY.'
      ],
      coreFormulasOrTerms: ['Synaptic Cleft', 'Exocytosis', 'Ca2+ Influx', 'Glutamate vs GABA'],
      timeSaved: 'Saved 25 mins of reading'
    },
    eli5Explanation: 'Think of neurons like friends sending text messages across a gap. The presynaptic neuron unlocks its phone with Calcium (Ca2+), hits "Send" (exocytosis), and sends a tiny signal package (Neurotransmitter) across the street (Synaptic Cleft) to the friend\'s phone (Postsynaptic Receptor). Glutamate is like a hype message telling them to run, while GABA is a calm message telling them to relax!',
    flashcards: [
      {
        question: 'Which ion influx directly triggers neurotransmitter release at the presynaptic terminal?',
        answer: 'Calcium ions (Ca2+) through voltage-gated channels.',
        difficulty: 'Medium'
      },
      {
        question: 'What are the main excitatory and inhibitory neurotransmitters in the CNS?',
        answer: 'Glutamate is primary excitatory; GABA is primary inhibitory.',
        difficulty: 'Easy'
      },
      {
        question: 'Define the synaptic cleft.',
        answer: 'The microscopic gap (~20nm) separating the presynaptic membrane from the postsynaptic membrane.',
        difficulty: 'Easy'
      }
    ],
    tutorAnswers: [
      {
        question: 'Why does calcium influx happen when the action potential reaches the terminal?',
        answer: 'Depolarization opens voltage-gated calcium channels because calcium concentration outside the cell is ~10,000x higher than inside, causing a rapid electrochemical influx.'
      }
    ]
  },
  {
    id: 'organic-chemistry',
    subject: 'Chemistry',
    icon: 'FlaskConical',
    title: 'SN1 vs SN2 Reaction Mechanisms',
    rawText: `SN1 is a two-step nucleophilic substitution mechanism involving a carbocation intermediate. Rate law = k[Substrate] (first order). Favored by tertiary substrates, polar protic solvents, and weak nucleophiles. Racemization occurs. SN2 is a concerted, one-step bimolecular mechanism with backside attack. Rate law = k[Substrate][Nucleophile] (second order). Favored by primary substrates, polar aprotic solvents, and strong nucleophiles. Inversion of stereochemistry occurs (Walden inversion).`,
    summary: {
      keyTakeaways: [
        'SN1: 2-step process, forms carbocation, first-order rate law, racemization.',
        'SN2: 1-step concerted backside attack, second-order rate law, stereochemical inversion.',
        'Substrate preference: SN1 favors 3° (tertiary), SN2 favors 1° (primary).',
        'Solvents: SN1 prefers polar protic (water/alcohol); SN2 prefers polar aprotic (DMSO/acetone).'
      ],
      coreFormulasOrTerms: ['Rate = k[Substrate]', 'Rate = k[Substrate][Nuc]', 'Carbocation Intermediate', 'Walden Inversion'],
      timeSaved: 'Saved 40 mins of textbook reading'
    },
    eli5Explanation: 'SN2 is like swapping seats on a busy bus in one move: as someone pushes into your seat from behind, you pop out the front. It happens all at once! SN1 is like leaving your seat first (creating an empty spot / carbocation), waiting for a moment, and then a new person chooses to sit on either side of the empty seat.',
    flashcards: [
      {
        question: 'What is the rate law difference between SN1 and SN2?',
        answer: 'SN1 rate = k[Substrate] (1st order). SN2 rate = k[Substrate][Nucleophile] (2nd order).',
        difficulty: 'Medium'
      },
      {
        question: 'Which mechanism results in complete inversion of stereochemistry?',
        answer: 'SN2 mechanism (via backside attack / Walden inversion).',
        difficulty: 'Easy'
      }
    ],
    tutorAnswers: [
      {
        question: 'How do I choose between SN1 and SN2 on an exam question?',
        answer: 'Check the substrate first! 1° alkyl halide = SN2; 3° alkyl halide = SN1. If 2°, check the nucleophile/solvent: strong nucleophile + aprotic solvent = SN2.'
      }
    ]
  },
  {
    id: 'data-structures',
    subject: 'Computer Science',
    icon: 'Code2',
    title: 'Dijkstra\'s Shortest Path Algorithm',
    rawText: `Dijkstra\'s algorithm finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights. Uses a min-priority queue (min-heap) to select the vertex with the smallest tentative distance. Relaxes adjacent edges: if dist[u] + weight(u, v) < dist[v], update dist[v] = dist[u] + weight(u, v). Time complexity with binary min-heap: O((V + E) log V). Does NOT work with negative edge weights (use Bellman-Ford instead).`,
    summary: {
      keyTakeaways: [
        'Finds shortest paths from single source node in weighted graphs.',
        'Requires NON-NEGATIVE edge weights.',
        'Uses Min-Heap Priority Queue for optimal vertex selection.',
        'Time Complexity: O((V + E) log V); Space Complexity: O(V).'
      ],
      coreFormulasOrTerms: ['Relaxation Condition', 'Min-Heap Priority Queue', 'O((V + E) log V)', 'Bellman-Ford Alternative'],
      timeSaved: 'Saved 30 mins of coding prep'
    },
    eli5Explanation: 'Dijkstra is like Google Maps finding the fastest driving route. It starts at your home, looks at all neighboring intersections, picks the absolute closest one, updates estimated drive times, and keeps expanding outward step-by-step until all destinations have their guaranteed fastest route calculated!',
    flashcards: [
      {
        question: 'What is the time complexity of Dijkstra\'s algorithm using a Min-Heap?',
        answer: 'O((V + E) log V), where V is vertices and E is edges.',
        difficulty: 'Hard'
      },
      {
        question: 'Why does Dijkstra\'s algorithm fail on negative edge weights?',
        answer: 'Because once a node is finalized from the priority queue, Dijkstra assumes its shortest path is permanently set and will not revisit it even if a negative shortcut appears.',
        difficulty: 'Medium'
      }
    ],
    tutorAnswers: [
      {
        question: 'When should I use Bellman-Ford instead of Dijkstra?',
        answer: 'Use Bellman-Ford whenever the graph contains negative edge weights or when you need to detect negative cycles.'
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Junior Pre-Med Student',
    university: 'Stanford University',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    major: 'Human Biology',
    gpaBoost: '3.4 → 3.95 GPA',
    content: 'StudyMind turned my 300-page Organic Chem slide decks into bite-sized flashcards in 30 seconds. I cut my daily review time by 3 hours and aced my MCAT prep!',
    rating: 5,
    highlight: 'Cut daily study time by 3 hours'
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Computer Science Major',
    university: 'MIT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    major: 'EECS',
    gpaBoost: '3.2 → 3.8 GPA',
    content: 'The "Explain Like I\'m 5" feature is pure magic. It broke down complex dynamic programming algorithms with analogies that actually made sense before midterms.',
    rating: 5,
    highlight: 'Mastered Algorithms in 1 day'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Law Student',
    university: 'Oxford University',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    major: 'Constitutional Law',
    gpaBoost: 'Top 5% of Class',
    content: 'I upload 80-page legal case briefs before lectures. The AI Tutor highlights exact precedents, ratio decidendi, and dissenting opinions with zero fluff.',
    rating: 5,
    highlight: 'Top 5% Class Ranking'
  },
  {
    id: '4',
    name: 'Devon Wright',
    role: 'Engineering Senior',
    university: 'UC Berkeley',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    major: 'Mechanical Engineering',
    gpaBoost: '3.1 → 3.7 GPA',
    content: 'The instant LaTeX formula extraction and practice exam generator saved my thermodynamics grade. I can\'t imagine studying without StudyMind anymore.',
    rating: 5,
    highlight: 'Passed Finals with A+'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Student',
    tagline: 'Essential AI study tools for casual note-taking and revision.',
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    features: [
      '5 PDF / Note Summaries per month',
      'Basic "Explain Like I\'m 5" mode',
      '50 Auto-Generated Flashcards',
      'Standard AI Tutor (10 queries/day)',
      'Web & Mobile access'
    ],
    ctaText: 'Get Started Free',
    ctaVariant: 'outline'
  },
  {
    id: 'pro',
    name: 'Pro Learner',
    tagline: 'Unlimited power for high-achieving students preparing for exams.',
    priceMonthly: 12,
    priceYearly: 9,
    popular: true,
    badge: '🔥 Most Popular (Save 25%)',
    features: [
      'Unlimited PDF, DOCX & Voice Note Summaries',
      'Advanced ELI5 + Interactive Concept Maps',
      'Unlimited Smart Flashcards & Anki Export',
      '24/7 Priority AI Tutor with Course Context',
      'Exam Predictor & Practice Quiz Builder',
      'OCR Handwritten Note Recognition',
      '100% No-Hallucination Guarantee'
    ],
    ctaText: 'Start 7-Day Free Trial',
    ctaVariant: 'primary'
  },
  {
    id: 'campus',
    name: 'Campus / Study Group',
    tagline: 'Collaborative AI study workspace for study groups and lab teams.',
    priceMonthly: 29,
    priceYearly: 22,
    popular: false,
    badge: 'Best for Groups',
    features: [
      'Everything in Pro for up to 5 members',
      'Shared Team Knowledge Base & Class Hub',
      'Collaborative Flashcard Decks',
      'Group Study Sessions & Quiz Competitions',
      'Dedicated Customer Support Manager',
      'Custom University Syllabus Integration'
    ],
    ctaText: 'Start Group Trial',
    ctaVariant: 'secondary'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How accurate is the AI Study Assistant?',
    answer: 'StudyMind AI is engineered specifically for academic rigor. Unlike general chatbots, our engine grounds its responses directly in your uploaded notes, slides, and syllabus to eliminate hallucinations and cite exact source pages.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'Can I upload handwritten notes or photos of textbooks?',
    answer: 'Yes! Pro and Campus members can upload photos of handwritten lecture notes, whiteboard diagrams, and textbook pages. Our advanced OCR parses handwriting with high accuracy.',
    category: 'features'
  },
  {
    id: 'faq-3',
    question: 'Is there a student discount for annual plans?',
    answer: 'Absolutely. Choosing yearly billing gives you an immediate 25% discount, bringing Pro Learner down to just $9/month. We also offer financial aid for verified student hardship.',
    category: 'pricing'
  },
  {
    id: 'faq-4',
    question: 'Can I export flashcards to Anki or Quizlet?',
    answer: 'Yes! With one click you can export generated flashcards directly to .apkg (Anki) format or copy formatted text for seamless import into Quizlet.',
    category: 'features'
  },
  {
    id: 'faq-5',
    question: 'How does the 7-day free trial work?',
    answer: 'You get full access to all Pro Learner features for 7 days. No charge will occur until day 8, and you can cancel anytime with a single click in your settings.',
    category: 'pricing'
  }
];
