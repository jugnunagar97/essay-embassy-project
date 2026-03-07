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
    BookOpen
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
        highschool: 10.80,
        undergraduate: 12.80,
        masters: 16.80,
        phd: 20.80,
    };

    const deadlineMultipliers: Record<string, number> = {
        '3hours': 2.3,
        '6hours': 2.0,
        '12hours': 1.7,
        '24hours': 1.4,
        '3days': 1.2,
        '7days': 1.0,
        '14days': 0.9,
    };

    const calculatePrice = () => {
        const base = baseRates[academicLevel] || 12.80;
        const mult = deadlineMultipliers[deadline] || 1.0;
        return (base * pages * mult).toFixed(2);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your Live Price</h3>
                <p className="text-gray-600 text-sm">Expert persuasive essay writing starting at just $10.80/page with zero hidden fees.</p>
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
                        <option value="3hours">3 Hours (Super Urgent)</option>
                        <option value="6hours">6 Hours (Urgent)</option>
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
                        Write My Persuasive Essay <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-gray-600">
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Turnitin Report</span>
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Formatting</span>
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
            emoji: '🎯',
            icon: Target,
            title: 'Argumentative Essay Writing',
            description: 'Build powerful arguments with evidence-based reasoning. Perfect for debate-focused assignments requiring strong logical structure.',
            features: ['Strong thesis development', 'Evidence-based claims', 'Counterargument handling', 'Logical progression'],
            cta: 'Order Argumentative Essay',
            popular: true,
        },
        {
            emoji: '📖',
            icon: BookOpen,
            title: 'Narrative Essay Writing',
            description: 'Engaging personal stories with vivid descriptions. Ideal for creative assignments that connect experiences with themes.',
            features: ['Compelling storytelling', 'Vivid imagery', 'Clear story arc', 'Thematic depth'],
            cta: 'Write My Narrative',
            popular: false,
        },
        {
            emoji: '✨',
            icon: Sparkles,
            title: 'Descriptive Essay Writing',
            description: 'Rich sensory details that immerse readers. Perfect for assignments requiring detailed observations and imagery.',
            features: ['Sensory language', 'Vivid descriptions', 'Literary devices', 'Engaging prose'],
            cta: 'Get Descriptive Help',
            popular: false,
        },
        {
            emoji: '📚',
            icon: FileText,
            title: 'Expository Essay Writing',
            description: 'Clear, factual explanations of complex topics. Great for informative assignments requiring unbiased analysis.',
            features: ['Factual accuracy', 'Clear structure', 'Credible sources', 'Logical flow'],
            cta: 'Order Expository Essay',
            popular: true,
        },
        {
            emoji: '🔍',
            icon: TrendingUp,
            title: 'Analytical Essay Writing',
            description: 'Deep critical analysis with scholarly insight. Perfect for literature analysis and concept examination.',
            features: ['Critical examination', 'Multiple perspectives', 'Detailed analysis', 'Academic rigor'],
            cta: 'Get Analytical Help',
            popular: false,
        },
        {
            emoji: '⚖️',
            icon: Scale,
            title: 'Compare & Contrast Essay',
            description: 'Balanced comparison highlighting similarities and differences. Ideal for comparative analysis assignments.',
            features: ['Balanced analysis', 'Clear comparisons', 'Structured approach', 'Insightful synthesis'],
            cta: 'Order Comparison Essay',
            popular: false,
        },
        {
            emoji: '🔗',
            icon: TrendingUp,
            title: 'Cause & Effect Essay',
            description: 'Explore relationships between events and outcomes. Perfect for analyzing consequences and connections.',
            features: ['Clear causation', 'Logical connections', 'Supporting evidence', 'Strong conclusions'],
            cta: 'Write Cause & Effect',
            popular: false,
        },
        {
            emoji: '💡',
            icon: Lightbulb,
            title: 'Problem Solution Essay',
            description: 'Identify problems and propose practical solutions. Great for assignments requiring critical thinking.',
            features: ['Problem identification', 'Solution proposals', 'Feasibility analysis', 'Action plans'],
            cta: 'Get Solution Help',
            popular: false,
        },
        {
            emoji: '🎓',
            icon: Award,
            title: 'Admission Essay Writing',
            description: 'Stand-out personal statements for college applications. Showcase your unique story to admissions.',
            features: ['Personal branding', 'Authentic voice', 'Strategic positioning', 'Memorable narratives'],
            cta: 'Write Admission Essay',
            popular: true,
        },
        {
            emoji: '🏆',
            icon: Trophy,
            title: 'Scholarship Essay Writing',
            description: 'Compelling essays that win funding. Highlight achievements and demonstrate why you deserve support.',
            features: ['Achievement focus', 'Goal articulation', 'Impact demonstration', 'Persuasive appeals'],
            cta: 'Win Scholarship',
            popular: false,
        },
        {
            emoji: '✏️',
            icon: Edit3,
            title: 'Essay Editing & Proofreading',
            description: 'Polish your work to perfection. Professional editing for grammar, structure, and clarity.',
            features: ['Grammar correction', 'Style improvement', 'Structure refinement', 'Citation checking'],
            cta: 'Get Editing Help',
            popular: false,
        },
        {
            emoji: '🔄',
            icon: RefreshCw,
            title: 'Essay Rewriting Services',
            description: 'Transform existing essays into better versions. Improve clarity, flow, and overall quality.',
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
export default function PersuasiveEssayWriting() {
    return (
        <>
            <Helmet>
                <title>Persuasive Essay Writing Service | Hire Expert Persuasive Essay Writers</title>
                <meta name="description" content="Need a reliable persuasive essay writing service online? Buy a persuasive essay from expert writers. Get affordable persuasive essay help and top grades today." />
                <meta name="keywords" content="persuasive essay writing service, persuasive essay help, hire persuasive essay writer, buy persuasive essay, persuasive essay writing help" />
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
                                Top Persuasive Essay Writing Service Online
                            </h1>

                            <p className="text-[20px] text-gray-600 mb-14 max-w-3xl mx-auto leading-[1.9] font-medium opacity-90">
                                Get expert persuasive essay help to win over your readers. Fast delivery, completely original work, and perfect formatting every single time.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/order-now"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                                >
                                    Write My Persuasive Essay <ArrowRight className="w-5 h-5" />
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
                                    { value: '1.5M+', label: 'Happy Students', color: 'text-[#1652A0]' },
                                    { value: '99%', label: 'On-Time Delivery', color: 'text-[#1652A0]' },
                                    { value: '5+', label: 'Years of Experience', color: 'text-[#1652A0]' },
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
                                    Why Choose Our Custom Persuasive Essay Writing Service?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    We offer the best persuasive essay help online cheap. Here is why students trust us to handle their assignments.
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

                                        <h3 className="text-3xl font-black mb-4">Plagiarism-Free Guarantee + Turnitin Report</h3>

                                        <p className="text-gray-300 text-lg mb-6 leading-loose">
                                            Every paper is totally unique. When you pay someone to write persuasive essay assignments, we craft them from scratch. You will receive a <span className="text-white font-bold">free originality report</span> with your order.
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {[
                                                { icon: CheckCircle2, color: 'text-green-300', title: 'Free Turnitin Report', sub: 'Proves 0% plagiarism' },
                                                { icon: Brain, color: 'text-purple-300', title: 'Zero AI Generation', sub: '100% human written' },
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

                                {/* Card 2 — Professional Writers */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Persuasive Essay Writer</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        We hire only the best. Your persuasive essay writer online will have a Master's or PhD degree. They know how to build strong persuasive essay arguments that impress teachers.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Master\'s & PhD experts', 'Strong argument builders', 'Subject specialists', 'Proven track record'].map((item, i) => (
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
                                        We offer a fast persuasive essay writing service in 24 hours. If you are in a major rush, our experts can finish your paper in just 3 hours. We never miss a deadline.
                                    </p>
                                    <ul className="space-y-3">
                                        {['3-hour urgent delivery', '24-hour standard rush', 'Real-time tracking', 'Guaranteed deadlines'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Rocket className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 4 — Support */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-orange-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support / Direct Communication</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        You can chat directly with your persuasive essay writer. Feel free to share your persuasive essay outline or ask questions anytime during the process.
                                    </p>
                                    <ul className="space-y-3">
                                        {['24/7 Priority support', 'Direct writer chat', 'Outline sharing', 'Instant responses'].map((item, i) => (
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
                                        We want you to be totally happy. If you need changes to your persuasive essay conclusion or persuasive essay format, we provide free persuasive essay editing and proofreading help.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Unlimited edits (14-30 days)', 'Format adjustments', 'Conclusion refinement', 'Zero hidden costs'].map((item, i) => (
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
                                        We keep your personal information completely safe. Your school will never know you used a persuasive essay paper writing service.
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
                                    Academic Persuasive Essay Help & Core Writing Services We Offer
                                </h2>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8]">
                                    At EssayEmbassy, we offer a top-rated persuasive essay writing service for university students. Finding good persuasive essay topics and building a strong persuasive essay thesis statement can be very hard. Our experts know exactly how to do it.
                                </p>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8] mt-4">
                                    If you ever find yourself thinking, "I need someone write my persuasive essay," we are ready to help. We provide a cheap persuasive essay writing service that does not cut corners on quality. You can buy persuasive essay assignments easily to save time and reduce stress.
                                </p>
                            </div>

                            <EssayServicesGrid />

                            <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Need Help With Your Essay?</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Each service is customized to fit your academic needs, providing a structured, compelling, and original essay that meets the highest standards.
                                </p>
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                                >
                                    Order Your Essay Now <ArrowRight className="w-5 h-5" />
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
                                        desc: 'Share your persuasive essay structure, prompt, and specific deadline.',
                                        highlight: 'Takes 2 minutes',
                                        features: ['Secure form', 'Upload files', 'Set deadline', 'Pick level'],
                                    },
                                    {
                                        step: '2', icon: Users,
                                        stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                                        badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                                        title: 'Get Matched with an Expert',
                                        desc: 'We connect you with a professional persuasive essay writer who knows your subject.',
                                        highlight: 'Expert matching',
                                        features: ['Expert profiles', 'Real reviews', 'Subject match', 'Choose writer'],
                                    },
                                    {
                                        step: '3', icon: Rocket,
                                        stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                                        badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                                        title: 'Track Progress / Communicate',
                                        desc: 'Stay updated. Provide your persuasive essay introduction ideas or give direct feedback to your writer.',
                                        highlight: 'Direct communication',
                                        features: ['24/7 Access', 'Live tracking', 'Share ideas', 'Instant chat'],
                                    },
                                    {
                                        step: '4', icon: Trophy,
                                        stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                                        badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                                        title: 'Download & Submit',
                                        desc: 'Get your finished paper on time. Download your essay and turn it in for a great grade.',
                                        highlight: 'On-time guarantee',
                                        features: ['Instant download', 'Free report', 'Free edits', 'Submit & win'],
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
                                        Affordable Persuasive Essay Writing Service Pricing
                                    </h2>

                                    <p className="text-lg text-gray-600 mb-8 leading-loose">
                                        Transparent pricing with no hidden fees. Rates start at just $10.80 per page for high-quality persuasive essay help.
                                    </p>

                                    <div className="space-y-4">
                                        {[
                                            { icon: DollarSign, title: 'Starting at $10.80/page', desc: 'Transparent pricing with zero hidden costs.' },
                                            { icon: FileCheck, title: 'No Hidden Fees', desc: 'You only pay the listed price for your assignment.' },
                                            { icon: Award, title: 'Free Extras Included', desc: 'Get a free title page, formatting, and bibliography with every order.' },
                                            { icon: Shield, title: 'Satisfaction Promise', desc: 'We offer unlimited revisions and a strict money-back guarantee.' },
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
                                    Commitments we take seriously with every persuasive essay we deliver.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {[
                                    {
                                        icon: Trophy,
                                        title: 'Quality Commitment',
                                        description: 'We promise top academic quality. Our experts craft strong essays every time.',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'On-Time Delivery',
                                        description: 'We respect your deadlines. We deliver fast so you always have time to review your paper.',
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: 'Free Revisions',
                                        description: 'We refine and fix your essay for free until it matches your exact instructions.',
                                    },
                                    {
                                        icon: Lock,
                                        title: 'Privacy First',
                                        description: 'Your data is completely secure. We use strict privacy rules and strong encryption.',
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
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">Testimonials & Persuasive Essay Examples</h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    Authentic reviews from verified students who achieved real academic results.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'Sarah M.', tag: 'Verified', date: 'Oct 10, 2025', subject: 'Management', rating: 5, text: 'I told them to write my persuasive essay for me. The writer used amazing logic and data for my management class. Great service!' },
                                    { name: 'John D.', tag: 'Returning Client', date: 'Nov 01, 2025', subject: 'History', rating: 5, text: 'I needed a persuasive essay writing service for university assignments. The historical references were perfect. I highly recommend them.' },
                                    { name: 'Emily R.', tag: 'First-Time User', date: 'Nov 15, 2025', subject: 'Science', rating: 4.9, text: 'They provide an amazing affordable persuasive essay writing service. The science facts were totally accurate and clearly explained.' },
                                    { name: 'Mark T.', tag: 'Verified', date: 'Dec 02, 2025', subject: 'Computer Science', rating: 5, text: 'I decided to hire persuasive essay writer for my final. The arguments were very strong and the formatting was flawless. Thank you!' },
                                    { name: 'Lisa P.', tag: 'Returning Client', date: 'Jan 08, 2026', subject: 'Economics', rating: 5, text: 'This is the best persuasive essay writing help for college students! The writer followed my exact economic models and instructions.' },
                                    { name: 'David K.', tag: 'Verified', date: 'Feb 14, 2026', subject: 'Law', rating: 4.8, text: 'They offer a great persuasive essay writing service with citations. I needed persuasive essay help with references, and the legal citations were spot on.' },
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
                                question="Can someone write my persuasive essay for me?"
                                answer="Yes. Our professional writers are ready to give you persuasive essay assignment help right now. Just send us your instructions, and we will do the hard work for you."
                            />
                            <FAQItem
                                question="How much does persuasive essay writing service cost?"
                                answer="Our prices start as low as $10.80 per page. The total cost depends on your academic level, page count, and deadline."
                            />
                            <FAQItem
                                question="Where can I get persuasive essay help online?"
                                answer="You can get it right here on our secure website. We offer a simple ordering process to get you the exact help you need."
                            />
                            <FAQItem
                                question="Is persuasive essay writing service legal?"
                                answer="Yes, it is completely legal to hire a writer. Our papers are meant to be used as study models, outlines, and research guides to help you write better."
                            />
                            <FAQItem
                                question="How long should a persuasive essay be?"
                                answer="The length depends entirely on your specific assignment instructions. Most college essays range from 3 to 5 pages, but we can write essays of any length you need."
                            />
                            <FAQItem
                                question="What is the structure of a persuasive essay?"
                                answer="A standard structure includes an introduction with a clear thesis, body paragraphs with strong evidence, and a conclusion that summarizes the main points. We use this proven format for every paper."
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
                                Ready to Get Top Grades Today?
                            </h2>
                            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-loose">
                                Do not let a hard assignment stress you out. Get persuasive essay writing help from our experts and submit a perfect paper.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                                <Link
                                    to="/order-now"
                                    className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                                >
                                    Start Your Persuasive Essay <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/samples"
                                    className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all border border-white/20 inline-flex items-center gap-3"
                                >
                                    <FileCheck className="w-5 h-5" /> Browse Persuasive Essay Examples
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