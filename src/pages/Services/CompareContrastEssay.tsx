import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star, ShieldCheck, ArrowRight, Shield, Headphones, GraduationCap, FileText, ChevronDown, Clock, Award, Users, Zap, Sparkles, MessageCircle, DollarSign, CheckCircle, RefreshCw, Brain, Rocket, Trophy, Lock, Edit3, FileCheck, Target, Lightbulb, TrendingUp, Scale, BookOpen, Search, AlignLeft, Microscope, Pen } from 'lucide-react';
import ScrollableContentPanel from '../../components/Services/ScrollableContentPanel';
import { SERVICE_SEO_PLACEHOLDER_CARDS } from '../../components/Services/serviceSeoPlaceholderCards';

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl bg-white mb-4 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        className="w-full px-6 py-5 text-left font-semibold text-gray-800 flex justify-between items-center hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg pr-4">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#0B1F42]/5 flex items-center justify-center text-[#1652A0] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 text-gray-600 leading-[1.8] text-[15px]">{answer}</div>
      </div>
    </div>
  );
};

// ─── Price Calculator (USD) ───────────────────────────────────────────────────
const PriceCalculator = () => {
  const [academicLevel, setAcademicLevel] = useState('undergraduate');
  const [pages, setPages] = useState(1);
  const [deadline, setDeadline] = useState('7days');

  const baseRates: Record<string, number> = {
    highschool: 11.00,
    undergraduate: 13.00,
    masters: 17.00,
    phd: 21.00,
  };
  const deadlineMultipliers: Record<string, number> = {
    '6hours': 2.0,
    '12hours': 1.7,
    '24hours': 1.4,
    '3days': 1.2,
    '7days': 1.0,
    '14days': 0.9,
  };

  const calculatePrice = () => {
    const base = baseRates[academicLevel] || 13.00;
    const mult = deadlineMultipliers[deadline] || 1.0;
    return (base * pages * mult).toFixed(2);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your Live Price</h3>
        <p className="text-gray-600 text-sm">Expert compare and contrast essay writing starting at just $11.00/page with zero hidden fees.</p>
      </div>
      <div className="space-y-6">
        {/* Academic Level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#1652A0]" />
            Academic Level
          </label>
          <select
            value={academicLevel}
            onChange={(e) => setAcademicLevel(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50 font-medium"
          >
            <option value="highschool">High School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD / Doctoral</option>
          </select>
        </div>
        {/* Pages */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1652A0]" />
              Number of Pages
            </span>
            <span className="text-[#1652A0] font-bold">{pages} {pages === 1 ? 'page' : 'pages'}</span>
          </label>
          <input
            type="range" min="1" max="50" value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1652A0]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>1 page</span>
            <span className="text-gray-700">{pages * 275} words</span>
            <span>50 pages</span>
          </div>
        </div>
        {/* Deadline */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1652A0]" />
            Deadline
          </label>
          <select
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50"
          >
            <option value="6hours">6 Hours (Rush)</option>
            <option value="12hours">12 Hours</option>
            <option value="24hours">24 Hours</option>
            <option value="3days">3 Days</option>
            <option value="7days">7 Days (Standard)</option>
            <option value="14days">14 Days (Relaxed)</option>
          </select>
        </div>
        {/* Price Display */}
        <div className="bg-[#0B1F42]/5 rounded-2xl p-6 border border-[#0B1F42]/10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[#0B1F42] text-sm font-semibold mb-1">Estimated Total:</p>
              <p className="text-4xl font-black text-[#0B1F42]">${calculatePrice()}</p>
            </div>
            <div className="text-right bg-white rounded-lg px-3 py-2 border border-[#0B1F42]/10">
              <p className="text-xs text-gray-500 font-medium">Per Page</p>
              <p className="text-xl font-bold text-gray-900">${(Number(calculatePrice()) / pages).toFixed(2)}</p>
            </div>
          </div>
          <Link
            to="/order-now"
            className="w-full px-6 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Write My Compare and Contrast Essay <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-gray-600">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Turnitin Report</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free GPTZero Scan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Essay Services Grid ──────────────────────────────────────────────────────
// ─── Essay Services Grid ──────────────────────────────────────────────────────
const EssayServicesGrid = () => {
    const services = [
        {
            emoji: '📝',
            icon: Pen,
            title: 'Personal Statement Writing',
            description: 'A polished personal statement built entirely from scratch that tells your story compellingly. Perfect for graduate programs, medical schools, law schools, and undergraduate applications worldwide.',
            features: ['Compelling story arc', 'Program-specific tailoring', 'Authentic voice preserved', 'Free Turnitin & AI detection reports'],
            cta: 'Write My Personal Statement',
            slug: '/essay-writing/personal-statement',
            popular: true,
        },
        {
            emoji: '🎯',
            icon: Target,
            title: 'Argumentative Essay Writing',
            description: 'Build powerful arguments with evidence-based reasoning. Perfect for debate-focused assignments requiring strong logical structure.',
            features: ['Strong thesis development', 'Evidence-based claims', 'Counterargument handling', 'Logical progression'],
            cta: 'Order Argumentative Essay',
            slug: '/essay-writing/argumentative',
            popular: false,
        },
        {
            emoji: '💬',
            icon: MessageCircle,
            title: 'Persuasive Essay Writing',
            description: 'Craft persuasive essays that move readers to action. Ideal for any assignment requiring compelling rhetoric and powerful appeals.',
            features: ['Ethos, pathos, logos balance', 'Audience-targeted tone', 'Strong call to action', 'Polished argumentation'],
            cta: 'Write My Persuasive Essay',
            slug: '/essay-writing/persuasive',
            popular: false,
        },
        {
            emoji: '📖',
            icon: BookOpen,
            title: 'Narrative Essay Writing',
            description: 'Engaging personal stories with vivid descriptions. Ideal for creative assignments that connect real experiences with deeper themes.',
            features: ['Compelling storytelling', 'Vivid imagery', 'Clear story arc', 'Thematic depth'],
            cta: 'Write My Narrative Essay',
            slug: '/essay-writing/narrative',
            popular: false,
        },
        {
            emoji: '✨',
            icon: Sparkles,
            title: 'Descriptive Essay Writing',
            description: 'Rich sensory details that immerse readers. Perfect for assignments requiring detailed observations and vivid imagery.',
            features: ['Sensory language mastery', 'Vivid descriptions', 'Literary devices', 'Engaging prose'],
            cta: 'Get Descriptive Help',
            slug: '/essay-writing/descriptive',
            popular: false,
        },
        {
            emoji: '📋',
            icon: AlignLeft,
            title: 'Expository Essay Writing',
            description: 'Clear, informative essays that explain topics with precision. Perfect for assignments requiring balanced facts and structured explanation.',
            features: ['Fact-based explanations', 'Logical organization', 'Clear topic sentences', 'Neutral, academic tone'],
            cta: 'Order Expository Essay',
            slug: '/essay-writing/expository',
            popular: false,
        },
        {
            emoji: '🔍',
            icon: Search,
            title: 'Analytical Essay Writing',
            description: 'Deep critical analysis that breaks down complex ideas, texts, or events into clear, structured arguments with academic rigor.',
            features: ['Critical idea breakdown', 'Strong analytical thesis', 'Evidence-based paragraphs', 'Correct academic format'],
            cta: 'Get Analytical Help',
            slug: '/essay-writing/analytical',
            popular: false,
        },
        {
            emoji: '⚖️',
            icon: Scale,
            title: 'Compare & Contrast Essay',
            description: 'Balanced comparison highlighting similarities and differences. Ideal for comparative analysis assignments across any subject.',
            features: ['Point-by-point & block method', 'Balanced analysis', 'Clear comparisons', 'Insightful synthesis'],
            cta: 'Order Comparison Essay',
            slug: '/essay-writing/compare-contrast',
            popular: false,
        },
        {
            emoji: '🔗',
            icon: TrendingUp,
            title: 'Cause & Effect Essay',
            description: 'Explore relationships between events and their outcomes. Perfect for analyzing consequences and meaningful academic connections.',
            features: ['Chain & block structure', 'Logical causal reasoning', 'Supporting evidence', 'Strong conclusions'],
            cta: 'Write Cause & Effect',
            slug: '/essay-writing/cause-effect',
            popular: false,
        },
        {
            emoji: '💡',
            icon: Lightbulb,
            title: 'Problem Solution Essay',
            description: 'Identify problems and propose practical, well-reasoned solutions. Great for assignments that require structured critical thinking.',
            features: ['Actionable thesis statements', 'Viable real-world solutions', 'Right transition words', 'Peer-reviewed sources'],
            cta: 'Get Solution Help',
            slug: '/essay-writing/problem-solution',
            popular: false,
        },
        {
            emoji: '🔬',
            icon: Microscope,
            title: 'Critical Analysis Essay',
            description: 'In-depth evaluation of texts, theories, or works. Perfect for literature, film, philosophy, and any course requiring analytical depth.',
            features: ['Evaluative framework', 'Textual evidence', 'Author intent analysis', 'Scholarly citations'],
            cta: 'Order Critical Analysis',
            slug: '/essay-writing/critical-analysis',
            popular: false,
        },
        {
            emoji: '🎓',
            icon: Award,
            title: 'Admission Essay Writing',
            description: 'Expert admission essays built to match your authentic voice. Our writers understand admissions committee expectations and craft narratives that get you accepted.',
            features: ['Authentic personal narrative', 'Admissions committee insight', 'Leadership & extracurriculars highlighted', 'Free Turnitin & AI detection reports'],
            cta: 'Write My Admission Essay',
            slug: '/essay-writing/admission',
            popular: false,
        },
        {
            emoji: '🏆',
            icon: Trophy,
            title: 'Scholarship Essay Writing',
            description: 'Compelling scholarship essays that help you win funding. We highlight your achievements and demonstrate why you deserve support — all in your authentic voice.',
            features: ['Achievement-focused narrative', 'Winning scholarship format', 'Selection committee insight', 'Free Turnitin & AI detection reports'],
            cta: 'Win My Scholarship',
            slug: '/essay-writing/scholarship',
            popular: false,
        },
        {
            emoji: '✏️',
            icon: Edit3,
            title: 'Essay Editing',
            description: 'Polish your existing work to perfection. Professional editing for grammar, structure, flow, and citation accuracy.',
            features: ['Grammar correction', 'Style improvement', 'Structure refinement', 'Citation checking'],
            cta: 'Edit My Essay',
            slug: '/essay-writing/editing',
            popular: false,
        },
        {
            emoji: '🔎',
            icon: FileCheck,
            title: 'Essay Proofreading',
            description: 'Final review to catch every error before submission. Spelling, punctuation, formatting, and citation accuracy covered.',
            features: ['Spelling & punctuation', 'Citation checking', 'Formatting compliance', 'Final accuracy check'],
            cta: 'Proofread My Essay',
            slug: '/essay-writing/proofreading',
            popular: false,
        },
        {
            emoji: '🔄',
            icon: RefreshCw,
            title: 'Essay Rewriting',
            description: 'Transform existing essays into stronger, clearer versions. Improve clarity, flow, originality, and overall academic quality.',
            features: ['Content improvement', 'Better flow', 'Enhanced clarity', 'Originality boost'],
            cta: 'Rewrite My Essay',
            slug: '/essay-writing/rewriting',
            popular: false,
        },
        {
            emoji: '🤔',
            icon: Users,
            title: 'Reflective Essay Writing',
            description: 'Connect experiences to learning. We help you articulate personal growth with academic depth, linking self-reflection to broader concepts.',
            features: ['Meaningful self-reflection', 'Personal-academic integration', 'Growth demonstration', 'Scholarly connections'],
            cta: 'Write Reflective Essay',
            slug: '/essay-writing/reflective',
            popular: false,
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
                <div
                    key={index}
                    className={`bg-white rounded-2xl p-6 border-2 ${service.popular ? 'border-[#1652A0] shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                >
                    {service.popular && (
                        <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> POPULAR
                        </div>
                    )}
                    <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-all text-3xl">
                        {service.emoji}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1652A0] transition-colors leading-snug">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-[1.7] text-[15px]">{service.description}</p>
                    <ul className="space-y-2.5 mb-6">
                        {service.features.map((f, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="font-medium">{f}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        to={service.slug}
                        className="w-full px-4 py-3 bg-[#1652A0]/10 text-[#1652A0] hover:bg-[#1652A0] hover:text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                    >
                        {service.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ))}
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CompareContrastEssayWritingService() {
  return (
    <>
      <Helmet>
        <title>Compare and Contrast Essay Writing Service | Expert Essay Writers</title>
        <meta name="description" content="Need a compare and contrast essay writing service online? Buy compare and contrast essay online from our expert team. Say write my compare and contrast essay and get top grades." />
        <meta name="keywords" content="compare and contrast essay writing service, compare and contrast essay help, hire compare and contrast essay writer, buy compare and contrast essay, write my compare and contrast essay" />
      </Helmet>

      <div className="min-h-screen bg-white font-sans">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center mb-10">
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#1652A0]" />
                  <span className="text-sm font-bold text-gray-700">Plagiarism-Free Guarantee</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <GraduationCap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold text-gray-700">Expert Writers</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-sm">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-700">On-Time Delivery</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-[#0B1F42] mb-10 leading-[1.2] tracking-tight">
                Compare and Contrast Essay Writing Service Online
              </h1>

              <p className="text-[20px] text-gray-600 mb-14 max-w-3xl mx-auto leading-[1.9] font-medium opacity-90">
                Expert Writers, Original Work, On-Time Delivery. Perfect Essays Every Time.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/order-now"
                  className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                >
                  Write My Compare and Contrast Essay <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/samples"
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold text-lg rounded-xl transition-all border border-gray-200 shadow-sm flex items-center justify-center gap-3"
                >
                  <FileCheck className="w-5 h-5" /> Review Our Samples
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATISTICS ───────────────────────────────────────────────────── */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                {[
                  { value: '98.2%', label: 'Orders Arrive Timely', color: 'text-[#1652A0]' },
                  { value: '9/10', label: 'Report Better Grades', color: 'text-[#1652A0]' },
                  { value: '500+', label: 'Verified Essay Writers', color: 'text-[#1652A0]' },
                  { value: '4.8/5', label: 'Average Rating', color: 'text-[#D4A853]' },
                ].map((stat, i) => (
                  <div key={i} className="px-4">
                    <div className={`text-4xl font-extrabold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1652A0] via-transparent to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  WHY CHOOSE US
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  Why Choose Our Custom Compare and Contrast Essay Writing Service?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  We offer the best compare and contrast essay help online cheap. Here is why students trust us to handle their comparison assignments with balance, precision, and speed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* ── Hero Feature ── */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1F42] to-[#1652A0] p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black mb-4">Plagiarism-Free Guarantee + Turnitin & GPTZero Report</h3>
                    <p className="text-gray-300 text-lg mb-6 leading-loose">
                      We guarantee completely original work. Every paper is checked for artificial intelligence before delivery. We provide a <span className="text-white font-bold">free Turnitin report</span> and a <span className="text-white font-bold">free GPTZero scan</span> with every single order so you can submit with complete confidence.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { icon: CheckCircle2, color: 'text-green-300', title: 'Free Turnitin Report', sub: 'Proves 0% plagiarism' },
                        { icon: Brain, color: 'text-purple-300', title: 'Free GPTZero Scan', sub: '100% human written' },
                        { icon: FileCheck, color: 'text-yellow-300', title: 'Written From Scratch', sub: 'No templates used' },
                        { icon: Lock, color: 'text-pink-300', title: 'Full Ownership Rights', sub: 'Yours permanently' },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                          <p className="font-bold text-lg">{item.title}</p>
                          <p className="text-gray-300 text-sm">{item.sub}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-green-500 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 font-bold text-lg shadow-xl">
                      <Trophy className="w-6 h-6" /> Your Work, Your Success
                    </div>
                  </div>
                </div>

                {/* Card 2 — Qualified Writers */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualified Academic Writers</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    Work with top experts holding Master's and PhD degrees. Your professional compare and contrast essay writer knows exactly how to build a perfect comparison essay structure using whichever format your assignment requires.
                  </p>
                  <ul className="space-y-3">
                    {["Master's & PhD degree holders", 'Comparison structure experts', 'Point-by-point & block method', 'Verified subject specialists'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 3 — On-Time Delivery */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-purple-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">On-Time Delivery Commitment</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    Never miss a due date again. We guarantee punctual delivery for every order. We offer a fast compare and contrast essay writing service in 24 hours — or even as little as 6 hours for rush tasks.
                  </p>
                  <ul className="space-y-3">
                    {['6-hour rush delivery', '24-hour standard turnaround', 'Real-time progress tracking', 'Guaranteed deadlines'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Rocket className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 4 — Direct Communication */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-orange-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support & Direct Communication</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    Enjoy friendly customer support around the clock. You can message your assigned compare and contrast essay writer online directly through your dashboard at any point during the process.
                  </p>
                  <ul className="space-y-3">
                    {['24/7 customer support', 'Direct dashboard messaging', 'Outline review on request', 'Instant responses'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Headphones className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 5 — Free Revisions */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-red-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Revisions Policy</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    Your happiness is our priority. We offer unlimited free revisions for 14 days to ensure your paper meets your exact expectations — including any changes to the compare and contrast essay structure or conclusion.
                  </p>
                  <ul className="space-y-3">
                    {['Unlimited edits (14 days)', 'Structure & format fixes', 'Conclusion refinement', 'Zero additional costs'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Edit3 className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 6 — Privacy */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-indigo-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Confidentiality Guaranteed</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    Your personal information and order details are never shared with third parties. We use 256-bit secure encryption so your privacy is completely safe at every step.
                  </p>
                  <ul className="space-y-3">
                    {['256-bit SSL encryption', 'Anonymous payments', 'Zero data sharing', 'GDPR compliant'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Shield className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="mt-16 text-center">
                <Link
                  to="/order-now"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Start Your Project Today <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── ESSAY SERVICES ────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                  ESSAY WRITING SERVICES WE OFFER
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  Academic Comparison Essay Help & Core Writing Services We Offer
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8]">
                  At EssayEmbassy, we specialize in providing top-quality compare and contrast essay writing help. A compare and contrast essay looks at what is similar and different between two or more topics. Our experts ensure your essays follow the correct compare and contrast essay format perfectly — whether that means point-by-point or the block method.
                </p>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8] mt-4">
                  When you find yourself thinking, "I need someone write my compare and contrast essay," our platform provides the perfect solution. We offer an affordable compare and contrast essay writing service that never cuts corners on quality. Finding good compare and contrast essay topics can be hard, but our team makes it easy — and we deliver academic excellence every time.
                </p>
              </div>

              <EssayServicesGrid />

              <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Need Help With Your Comparison Essay?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Each service is customized to fit your academic needs, providing a structured, compelling, and original similarities and differences essay that meets the highest standards.
                </p>
                <Link
                  to="/order-now"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                >
                  Order Your Compare and Contrast Essay Now <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                  HOW IT WORKS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  Simple Process, Quality Results
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                  A streamlined four-step process designed for busy students. Get started in minutes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    step: '1', icon: FileText,
                    stepBg: 'bg-[#1652A0]', iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                    badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]', checkColor: 'text-[#1652A0]',
                    title: 'Submit Your Requirements',
                    desc: 'Fill out the order form. Tell us your topic, academic level, and your preferred format — point-by-point or the block method. The more detail you share, the better your result.',
                    highlight: 'Takes 2 minutes',
                    features: ['Secure order form', 'Upload files', 'Choose your format', 'Set your deadline'],
                  },
                  {
                    step: '2', icon: Users,
                    stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                    badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                    title: 'Get Matched with an Expert',
                    desc: 'We connect you with a professional writer who has a verified background in your exact field and a strong track record with comparison and analysis writing.',
                    highlight: 'Verified subject specialist',
                    features: ['Expert profiles', 'Verified reviews', 'Subject match', 'Choose writer'],
                  },
                  {
                    step: '3', icon: Rocket,
                    stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                    badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                    title: 'Track Progress & Communicate',
                    desc: 'Stay updated and communicate directly with your writer. You can ask to review the compare and contrast essay outline before they finish the paper and send feedback at any stage.',
                    highlight: 'Direct communication',
                    features: ['24/7 access', 'Live tracking', 'Review outline', 'Instant chat'],
                  },
                  {
                    step: '4', icon: Trophy,
                    stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                    badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                    title: 'Download & Submit',
                    desc: 'Once completed, download your essay. You will receive your paper along with a free Turnitin report and GPTZero scan — then submit it with complete confidence.',
                    highlight: 'On-time guarantee',
                    features: ['Instant download', 'Free Turnitin + GPTZero', 'Free edits', 'Submit & win'],
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-[#1652A0] group">
                    <div className="flex items-start gap-6">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-full ${item.stepBg} flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-110 transition-transform`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconText}`}>
                            <item.icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-[#0B1F42]">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-loose mb-4">{item.desc}</p>
                        <div className={`inline-block ${item.badgeBg} ${item.badgeText} px-4 py-2 rounded-lg text-sm font-semibold mb-4`}>
                          ✓ {item.highlight}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {item.features.map((f, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className={`w-4 h-4 ${item.checkColor} mr-2`} /> {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center bg-[#0B1F42] rounded-2xl p-10">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Take the first step toward academic excellence today.</p>
                <Link
                  to="/order-now"
                  className="px-10 py-4 bg-[#D4A853] text-[#0B1F42] font-bold text-lg rounded-xl hover:bg-[#C49843] transition-all shadow-md inline-flex items-center gap-3"
                >
                  Place Your Order <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left */}
                <div>
                  <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    TRANSPARENT PRICING
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Affordable Compare and Contrast Essay Writing Service Pricing
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-loose">
                    We provide a cheap compare and contrast essay writing service with transparent rates starting at just $11.00 per page. No hidden fees, no surprises.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: DollarSign, title: 'Starting at $11.00/page', desc: 'Transparent pricing with zero hidden costs.' },
                      { icon: FileCheck, title: 'No Hidden Fees', desc: 'Pay only for the content you actually need.' },
                      { icon: Award, title: 'Free Features Included', desc: 'Free title page, references, and in-text citations at no extra cost.' },
                      { icon: Shield, title: 'Satisfaction Promise', desc: 'Backed by free revisions within 14 days and a money-back guarantee.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#1652A0] flex-shrink-0 border border-gray-200">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-0.5">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right */}
                <div>
                  <PriceCalculator />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GUARANTEES ───────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0B1F42] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                  OUR COMMITMENTS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Our Guarantees to You</h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-[1.8]">
                  Commitments we take seriously with every compare and contrast essay we deliver.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    icon: Trophy,
                    title: 'Quality Commitment',
                    description: 'Every paper meets top academic standards. Our writers create a strong compare and contrast essay introduction and a powerful conclusion every time.',
                  },
                  {
                    icon: Clock,
                    title: 'On-Time Delivery',
                    description: 'If your essay is delivered after the deadline you selected, you are entitled to a full refund. We never miss a due date.',
                  },
                  {
                    icon: RefreshCw,
                    title: 'Free Revisions',
                    description: 'We refine your paper for free within 14 days until it aligns perfectly with your grading rubric and instructor expectations.',
                  },
                  {
                    icon: Lock,
                    title: 'Privacy First',
                    description: 'Strict confidentiality policies ensure your data is never shared with your university or anyone else. Your privacy is guaranteed.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all group">
                    <div className="w-16 h-16 rounded-xl bg-[#1652A0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-4">{item.title}</h3>
                    <p className="text-gray-300 leading-[1.8] text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-3">We Stand Behind Every Essay We Deliver</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Confidence in quality and integrity is at the core of everything we do.</p>
                <Link
                  to="/guarantees"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1652A0] font-bold rounded-xl hover:bg-gray-100 transition-all"
                >
                  Learn More About Our Guarantees <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6"
                  style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.06) 100%)', border: '1px solid rgba(212,168,83,0.3)', color: '#D4A853' }}
                >
                  <Star className="w-4 h-4" /> CLIENT REVIEWS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">Testimonials & Compare and Contrast Essay Examples</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                  Authentic reviews from verified students who achieved real academic results.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Lucas S.', tag: 'Verified', date: 'Oct 12, 2025', subject: 'Management', rating: 5, text: 'I told them to write my compare and contrast essay for me. The writer had a deep understanding of business management. This is the best compare and contrast essay writing service for university students!' },

                  { name: 'Fahid B.', tag: 'Returning Client', date: 'Nov 02, 2025', subject: 'Engineering', rating: 5, text: 'I needed compare and contrast essay help for university assignments. The engineering analysis was accurate and completely free of AI.' },

                  { name: 'Johanna T.', tag: 'First-Time User', date: 'Nov 18, 2025', subject: 'Computer Science', rating: 4.9, text: 'I used their compare and contrast essay editing and proofreading service. My writer fixed all the errors in my software analysis perfectly. I will definitely hire compare and contrast essay writer experts here again.' },

                  { name: 'Ryan P.', tag: 'Returning Client', date: 'Dec 05, 2025', subject: 'Economics', rating: 5, text: 'Long-time fan here. I buy compare and contrast essay online assignments every month. This site always nails the economic details perfectly.' },

                  { name: 'Darious D.', tag: 'Verified', date: 'Jan 14, 2026', subject: 'Law', rating: 5, text: 'I needed to pay someone to write comparison essay tasks for my legal class. They offer a great compare and contrast essay writing service with references. The citations were flawless.' },

                  { name: 'Liam K.', tag: 'First-Time User', date: 'Feb 22, 2026', subject: 'Science', rating: 4.8, text: 'If you want to get compare and contrast essay help online cheap, use this service. The writer used the point-by-point method perfectly for my biology paper.' },
                ].map((review, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1652A0]/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#0B1F42]">{review.name}</span>
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981]">{review.tag}</span>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-[#1652A0] bg-[#1652A0]/5 px-3 py-1 rounded-full">{review.subject}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(review.rating))].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 text-[#D4A853] fill-[#D4A853]" />
                        ))}
                        {review.rating % 1 !== 0 && (
                          <span className="text-xs text-[#D4A853] font-bold ml-0.5">{review.rating}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-[1.8] text-[14px]">"{review.text}"</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1F42] hover:bg-[#1652A0] text-white font-bold rounded-xl transition-all shadow-md"
                >
                  See All Reviews <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Service SEO scroll panel (placeholder) ── */}
        <section className="bg-slate-50 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollableContentPanel
              ariaLabel="Service overview"
              cards={SERVICE_SEO_PLACEHOLDER_CARDS}
            />
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-6">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Common Questions Answered</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Clear, honest answers to help you make an informed decision.</p>
            </div>
            <div className="space-y-4">
              <FAQItem
                question="Can someone write my compare and contrast essay for me?"
                answer="Yes. Our experts provide excellent compare and contrast essay writing help for college students right now. Just send us your prompt, topics, and preferred format and we will do the hard work for you."
              />
              <FAQItem
                question="Where can I get compare and contrast essay help online?"
                answer="You can get it right here on our secure website. We offer a simple ordering process to get you the exact assistance you need — whether it is a full essay, an outline, or editing and proofreading."
              />
              <FAQItem
                question="How much does a compare and contrast essay writing service cost?"
                answer="Our prices start at just $11.00 per page for high school level. The final cost depends on your academic level, the number of pages, and your deadline. Use our live calculator above for an instant, transparent quote."
              />
              <FAQItem
                question="How long should a compare and contrast essay be?"
                answer="The length depends entirely on your specific assignment instructions. Most college essays range from 3 to 5 pages. We can write essays of any length you require, from a brief comparison to a full research-level paper."
              />
              <FAQItem
                question="What is a compare and contrast essay?"
                answer="It is a type of writing that examines the similarities and differences between two or more subjects. These subjects usually belong to the same category, like two historical events, two books, two technologies, or two scientific theories."
              />
              <FAQItem
                question="How to write a compare and contrast essay?"
                answer="You must start by organizing your ideas. You can use a point-by-point format where you discuss one specific feature for both subjects in each paragraph. Another option is the block method, where you discuss everything about the first subject and then move to the second. If you need inspiration, we provide free compare and contrast essay examples on our blog."
              />
            </div>
            <div className="mt-12 bg-[#1652A0] rounded-2xl p-10 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-gray-200 mb-6">Our 24/7 support team is always ready to help you.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1652A0] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-md"
              >
                <Headphones className="w-5 h-5" /> Contact Support
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0B1F42]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                Ready to Secure Top Grades with an Expert?
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-loose">
                Stop stressing over your assignments. Let our professional writers craft a highly engaging, perfectly formatted paper tailored to your exact prompt. Get reliable help today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <Link
                  to="/order-now"
                  className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                >
                  Start Your Compare and Contrast Essay <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/samples"
                  className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all border border-white/20 inline-flex items-center gap-3"
                >
                  <FileCheck className="w-5 h-5" /> Browse Samples
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                {[
                  { icon: ShieldCheck, text: 'Plagiarism-Free Guarantee' },
                  { icon: RefreshCw, text: 'Revisions Included' },
                  { icon: Lock, text: '100% Confidential' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-[#D4A853]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}