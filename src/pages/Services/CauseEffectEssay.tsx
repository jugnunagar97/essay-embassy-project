import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    Star,
    ShieldCheck,
    ArrowRight,
    Shield,
    Headphones,
    GraduationCap,
    FileText,
    ChevronDown,
    Clock,
    Award,
    Users,
    Zap,
    Sparkles,
    MessageCircle,
    DollarSign,
    CheckCircle,
    RefreshCw,
    Brain,
    Rocket,
    Trophy,
    Lock,
    Edit3,
    FileCheck,
    Target,
    Lightbulb,
    TrendingUp,
    Scale,
    BookOpen,
    Search,
    AlignLeft
} from 'lucide-react';

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
                <p className="text-gray-600 text-sm">Expert cause and effect essay writing starting at just $11.00/page with zero hidden fees.</p>
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
                        <option value="6hours">6 Hours (Urgent Rush)</option>
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
                        Write My Cause and Effect Essay <ArrowRight className="w-5 h-5" />
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
const EssayServicesGrid = () => {
    const services = [
        {
            emoji: '🔗',
            icon: TrendingUp,
            title: 'Cause and Effect Essay',
            description: 'Expert essays that trace causal logic clearly from action to outcome. Our writers use chain structure, block structure, or multiple-cause formats to match your assignment perfectly.',
            features: ['Chain & block essay structure', 'Logical causal reasoning', 'Peer-reviewed academic sources', 'Free Turnitin & GPTZero reports'],
            cta: 'Write My Cause and Effect Essay',
            popular: true,
        },
        {
            emoji: '🎯',
            icon: Target,
            title: 'Argumentative Essay Writing',
            description: 'Build powerful arguments with evidence-based reasoning. Perfect for debate-focused assignments requiring strong logical structure.',
            features: ['Strong thesis development', 'Evidence-based claims', 'Counterargument handling', 'Logical progression'],
            cta: 'Order Argumentative Essay',
            popular: false,
        },
        {
            emoji: '📖',
            icon: BookOpen,
            title: 'Narrative Essay Writing',
            description: 'Engaging personal stories with vivid descriptions. Ideal for creative assignments that connect real experiences with deeper themes.',
            features: ['Compelling storytelling', 'Vivid imagery', 'Clear story arc', 'Thematic depth'],
            cta: 'Write My Narrative Essay',
            popular: false,
        },
        {
            emoji: '✨',
            icon: Sparkles,
            title: 'Descriptive Essay Writing',
            description: 'Rich sensory details that immerse readers. Perfect for assignments requiring detailed observations and vivid imagery.',
            features: ['Sensory language mastery', 'Vivid descriptions', 'Literary devices', 'Engaging prose'],
            cta: 'Get Descriptive Help',
            popular: false,
        },
        {
            emoji: '📚',
            icon: AlignLeft,
            title: 'Expository Essay Writing',
            description: 'Clear, fact-based explanations of complex topics without personal opinion. Great for informative assignments requiring unbiased analysis.',
            features: ['Factual accuracy', 'Clear structure', 'Credible sources', 'Logical flow'],
            cta: 'Order Expository Essay',
            popular: false,
        },
        {
            emoji: '🔍',
            icon: Search,
            title: 'Analytical Essay Writing',
            description: 'Deep critical analysis that breaks down complex ideas, texts, or events into clear, structured arguments with academic rigor.',
            features: ['Critical idea breakdown', 'Strong analytical thesis', 'Evidence-based paragraphs', 'Correct academic format'],
            cta: 'Get Analytical Help',
            popular: false,
        },
        {
            emoji: '⚖️',
            icon: Scale,
            title: 'Compare & Contrast Essay',
            description: 'Balanced comparison highlighting similarities and differences. Ideal for comparative analysis assignments across any subject.',
            features: ['Point-by-point & block method', 'Balanced analysis', 'Clear comparisons', 'Insightful synthesis'],
            cta: 'Order Comparison Essay',
            popular: true,
        },
        {
            emoji: '💡',
            icon: Lightbulb,
            title: 'Problem Solution Essay',
            description: 'Identify problems and propose practical, well-reasoned solutions. Great for assignments that require structured critical thinking.',
            features: ['Problem identification', 'Solution proposals', 'Feasibility analysis', 'Action plans'],
            cta: 'Get Solution Help',
            popular: false,
        },
        {
            emoji: '🎓',
            icon: Award,
            title: 'Admission Essay Writing',
            description: 'Stand-out personal statements for college applications. Showcase your unique story compellingly to admissions committees.',
            features: ['Personal branding', 'Authentic voice', 'Strategic positioning', 'Memorable narratives'],
            cta: 'Write Admission Essay',
            popular: true,
        },
        {
            emoji: '🏆',
            icon: Trophy,
            title: 'Scholarship Essay Writing',
            description: 'Compelling essays that win funding. Highlight your achievements and demonstrate powerfully why you deserve support.',
            features: ['Achievement focus', 'Goal articulation', 'Impact demonstration', 'Persuasive appeals'],
            cta: 'Win My Scholarship',
            popular: false,
        },
        {
            emoji: '✏️',
            icon: Edit3,
            title: 'Essay Editing & Proofreading',
            description: 'Polish your existing work to perfection. Professional editing for grammar, structure, flow, and citation accuracy.',
            features: ['Grammar correction', 'Style improvement', 'Structure refinement', 'Citation checking'],
            cta: 'Edit My Essay',
            popular: false,
        },
        {
            emoji: '🔄',
            icon: RefreshCw,
            title: 'Essay Rewriting Services',
            description: 'Transform existing essays into stronger, clearer versions. Improve clarity, flow, originality, and overall academic quality.',
            features: ['Content improvement', 'Better flow', 'Enhanced clarity', 'Originality boost'],
            cta: 'Rewrite My Essay',
            popular: false,
        },
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
                        to="/order-now"
                        className={`w-full px-4 py-3 ${service.popular ? 'bg-[#1652A0] text-white hover:bg-[#0B1F42]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg`}
                    >
                        {service.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ))}
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CauseEffectEssayWritingService() {
    return (
        <>
            <Helmet>
                <title>Cause and Effect Essay Writing Service | Expert Help Online</title>
                <meta name="description" content="Need the best cause and effect essay writing service for college? Buy a custom cause and effect essay online. Get fast help and top grades today." />
                <meta name="keywords" content="cause and effect essay writing service, cause and effect essay help, write my cause and effect essay, buy cause and effect essay, cause and effect essay writing help online" />
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
                                Professional Cause and Effect Essay Writing Service
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
                                    Write My Cause and Effect Essay <ArrowRight className="w-5 h-5" />
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
                                    { value: '1M+', label: 'Happy Students', color: 'text-[#1652A0]' },
                                    { value: '99%', label: 'On-Time Delivery', color: 'text-[#1652A0]' },
                                    { value: '11+', label: 'Years of Experience', color: 'text-[#1652A0]' },
                                    { value: '4.9/5', label: 'Average Rating', color: 'text-[#D4A853]' },
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
                                    Why Choose Our Custom Cause and Effect Essay Writing Service?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    We offer the best cause and effect essay writing service for college students. Here is why thousands of students trust us to handle their most logic-driven assignments.
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
                                            We promise 100% original work. Every paper includes a <span className="text-white font-bold">free Turnitin report</span> and a <span className="text-white font-bold">free GPTZero scan</span> to prove it is human-written and completely unique — so you can submit with total confidence every time.
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
                                        We hire native English writers with Master's and PhD degrees. They meet the highest academic writing standards so your cause and effect paper will impress any professor at any level.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Native English writers', "Master's & PhD degree holders", 'Causal logic specialists', 'Peer-reviewed source experts'].map((item, i) => (
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
                                        Never miss a deadline. We deliver fast. We can even complete urgent orders in just 6 hours — and if your paper arrives late, you receive a full refund.
                                    </p>
                                    <ul className="space-y-3">
                                        {['6-hour urgent delivery', '24-hour standard turnaround', 'Real-time progress tracking', 'Late = full refund guarantee'].map((item, i) => (
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
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support / Direct Communication</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        You can chat directly with your cause and effect essay writer online at any time. Our support team works around the clock so you are never left waiting for answers.
                                    </p>
                                    <ul className="space-y-3">
                                        {['24/7 customer support', 'Direct writer chat', 'Share outline ideas', 'Instant responses'].map((item, i) => (
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
                                        Your happiness is our priority. We offer unlimited free revisions for 14 days to make sure your paper is perfect — including any adjustments to the essay logic, flow, or structure.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Unlimited edits (14 days)', 'Logic & flow refinement', 'Structure adjustments', 'Zero additional costs'].map((item, i) => (
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
                                        Your personal details are protected with strong encryption. It is completely safe to buy a cause and effect essay from anywhere in the world — the US, Canada, the UK, or Australia.
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
                                    Cause and Effect Essay Writing Service & Core Writing Services We Offer
                                </h2>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8]">
                                    At EssayEmbassy, we specialize in providing a top-quality cause and effect essay writing service. A cause and effect essay explores an action and the outcomes it leads to — helping readers understand why something happened and what followed as a result. Our experts ensure your papers are well-researched, structured, and easy to read at every academic level.
                                </p>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8] mt-4">
                                    When you find yourself thinking, "I need someone to write my cause and effect essay," we provide the perfect solution. If you want to pay someone to write cause and effect essay tasks, our experts are ready. Whether you need help in the US, UK, Canada, or Australia, we deliver customized academic excellence every single time.
                                </p>
                            </div>

                            <EssayServicesGrid />

                            <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Need Help With Your Cause and Effect Essay?</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Each service is customized to fit your academic needs. We offer different essay formatting styles to meet your exact instructions and grading requirements.
                                </p>
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                                >
                                    Order Your Cause and Effect Essay Now <ArrowRight className="w-5 h-5" />
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
                                        desc: 'Share your guidelines and deadline through our simple order form. You can request help with your cause and effect essay outline or ask us to generate thesis statement ideas for your topic.',
                                        highlight: 'Takes 2 minutes',
                                        features: ['Secure order form', 'Upload files', 'Set your deadline', 'Request outline help'],
                                    },
                                    {
                                        step: '2', icon: Users,
                                        stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                                        badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                                        title: 'Get Matched with an Expert',
                                        desc: 'We connect you with affordable cause and effect essay writers online who specialize in your specific subject — from business and law to science and engineering.',
                                        highlight: 'Subject-matched specialist',
                                        features: ['Expert profiles', 'Verified reviews', 'Subject match', 'Choose writer'],
                                    },
                                    {
                                        step: '3', icon: Rocket,
                                        stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                                        badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                                        title: 'Track Progress / Communicate',
                                        desc: 'Stay updated throughout the entire process. You can message your writer directly to share ideas, check on progress, or request an outline review at any stage.',
                                        highlight: 'Direct communication',
                                        features: ['24/7 access', 'Live tracking', 'Message writer', 'Instant chat'],
                                    },
                                    {
                                        step: '4', icon: Trophy,
                                        stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                                        badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                                        title: 'Download & Submit',
                                        desc: 'Once completed, download your essay. Review the peer-reviewed academic sources and free originality reports, then submit the paper with total confidence.',
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
                                        Affordable Cause and Effect Essay Writing Service Pricing
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-loose">
                                        Our rates start at just $11.00 per page — making us the best cause and effect essay writing service for college students on a tight budget. No hidden fees, ever.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { icon: DollarSign, title: 'Starting at $11.00/page', desc: 'Transparent pricing with zero hidden costs.' },
                                            { icon: FileCheck, title: 'No Hidden Fees', desc: 'Pay only for the words you need.' },
                                            { icon: Award, title: 'Free Features Included', desc: 'Title page, formatting, and bibliography included for free.' },
                                            { icon: Shield, title: 'Satisfaction Promise', desc: 'Unlimited revisions and a full money-back guarantee.' },
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
                                    Commitments we take seriously with every cause and effect essay we deliver.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {[
                                    {
                                        icon: Trophy,
                                        title: 'Quality Commitment',
                                        description: 'Every paper meets top academic standards. Our writers trace causal logic correctly using solid, peer-reviewed evidence throughout.',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'On-Time Delivery',
                                        description: 'If your paper is delivered late, you will receive a full refund — no questions asked. We take deadlines as seriously as you do.',
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: 'Free Revisions',
                                        description: 'We refine the essay logic and flow for free within 14 days until it aligns perfectly with your rubric and professor expectations.',
                                    },
                                    {
                                        icon: Lock,
                                        title: 'Privacy First',
                                        description: 'Strict confidentiality policies ensure your data is never shared with third parties — not your university, not anyone.',
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
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">Testimonials & Cause and Effect Essay Examples</h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    Authentic reviews from verified students who achieved real academic results.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'Lucas S.', tag: 'Verified', date: 'Oct 12, 2025', subject: 'Management', rating: 5, text: 'I told them to write my cause and effect essay for my business class. The writer used a perfect block and chain essay structure. Great job!' },
                                    { name: 'Fahid B.', tag: 'Returning Client', date: 'Nov 02, 2025', subject: 'Engineering', rating: 5, text: 'I needed university cause and effect essay help. The engineering analysis was completely accurate and delivered early.' },
                                    { name: 'Johanna T.', tag: 'First-Time User', date: 'Nov 18, 2025', subject: 'Computer Science', rating: 4.9, text: 'My writer explained the software failure effects perfectly. I will definitely use this cause and effect essay help again.' },
                                    { name: 'Ryan P.', tag: 'Returning Client', date: 'Dec 05, 2025', subject: 'Economics', rating: 5, text: 'Long-time fan here. I buy cause and effect essay assignments from them often. The economic logic is always flawless.' },
                                    { name: 'Darious D.', tag: 'Verified', date: 'Jan 14, 2026', subject: 'Law', rating: 5, text: 'They provide an amazing custom cause and effect essay. The legal citations were perfect and formatted correctly.' },
                                    { name: 'Liam K.', tag: 'First-Time User', date: 'Feb 22, 2026', subject: 'Science', rating: 4.8, text: 'This is the best cause and effect essay writing service for college. The environmental science paper was amazing and the writer used excellent peer-reviewed sources.' },
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
                                question="How much does a cause and effect essay writing service cost?"
                                answer="Prices start at $11.00 per page for a high school level essay. Undergraduate papers start at $13.00 per page. The final price depends on your academic level, page count, and deadline. Use our live calculator above for an instant, transparent quote."
                            />
                            <FAQItem
                                question="Who can write my cause and effect essay for me fast?"
                                answer="Our professional writers handle urgent requests every day. We can deliver a high-quality paper in as little as 6 hours if you are in a rush — without compromising on quality or originality."
                            />
                            <FAQItem
                                question="How do your writers structure a cause and effect essay?"
                                answer="Our experts build a logical argument where each step clearly produces the next. Depending on your specific assignment, they will use a chain structure, block structure, or multiple-cause format — whichever best fits your topic and instructions."
                            />
                            <FAQItem
                                question="Is it safe to buy a cause and effect essay online?"
                                answer="Yes. Your personal information is protected with strong encrypted technology and is never shared with anyone. Every essay is written from scratch specifically for you, and you receive full ownership of the final paper."
                            />
                            <FAQItem
                                question="Can I get help with a college-level cause and effect essay?"
                                answer="Absolutely. We write essays for high school, undergraduate, graduate, and PhD levels. College-level orders are our most common requests and our writers are fully equipped to meet every standard your professor expects."
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
                                    Start Your Cause and Effect Essay <ArrowRight className="w-5 h-5" />
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