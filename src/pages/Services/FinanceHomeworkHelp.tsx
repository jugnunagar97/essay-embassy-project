import React, { useState, ChangeEvent } from 'react';
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
    Globe,
    LineChart
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

// ─── Price Calculator ─────────────────────────────────────────────────────────
const PriceCalculator = () => {
    const [academicLevel, setAcademicLevel] = useState('undergraduate');
    const [pages, setPages] = useState(1);
    const [deadline, setDeadline] = useState('7days');

    const baseRates: Record<string, number> = {
        highschool: 13.99,
        undergraduate: 17.99,
        masters: 23.99,
        phd: 29.99,
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
        const base = baseRates[academicLevel] || 17.99;
        const mult = deadlineMultipliers[deadline] || 1.0;
        return (base * pages * mult).toFixed(2);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your Live Price</h3>
                <p className="text-gray-600 text-sm">Expert finance homework help starting at just $13.99 per page. Pricing updates in real time — zero hidden fees.</p>
            </div>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#1652A0]" />
                        Academic Level
                    </label>
                    <select
                        value={academicLevel}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setAcademicLevel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50 font-medium"
                    >
                        <option value="highschool">High School</option>
                        <option value="undergraduate">Undergraduate</option>
                        <option value="masters">Master's Degree</option>
                        <option value="phd">PhD / Doctoral</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#1652A0]" />
                            Number of Pages or Problems
                        </span>
                        <span className="text-[#1652A0] font-bold">{pages} {pages === 1 ? 'page' : 'pages'}</span>
                    </label>
                    <input
                        type="range" min="1" max="50" value={pages}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPages(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1652A0]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                        <span>1 unit</span>
                        <span className="text-gray-700">Standard task</span>
                        <span>50 units</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#1652A0]" />
                        Deadline
                    </label>
                    <select
                        value={deadline}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setDeadline(e.target.value)}
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
                        Do My Finance Homework <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-gray-600">
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Originality Report</span>
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Formatting & Title Page</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Finance Sub-Services Grid ─────────────────────────────────────────────
const FinanceServicesGrid = () => {
    const services = [
        {
            emoji: '🏢',
            title: 'Corporate Finance Help',
            description: 'We act as a fast business wealth coursework solver for your complex corporate finance tasks. We offer perfect support so your writing is clear and logical.',
            features: ['Corporate budgets', 'Business wealth solver', 'Clear & logical writing', 'Expert coursework support'],
            cta: 'Get Corporate Help',
            slug: '/homework-help/finance/corporate',
            popular: true,
        },
        {
            emoji: '📈',
            title: 'Financial Analysis Help',
            description: 'Our experts handle advanced data and numbers. We provide accurate university financial studies answers for your hardest financial analysis classes.',
            features: ['Advanced data handling', 'Financial studies answers', 'Accurate calculations', 'Hardest classes covered'],
            cta: 'Get Analysis Help',
            slug: '/homework-help/finance/financial-analysis',
            popular: true,
        },
        {
            emoji: '📊',
            title: 'Investment & Portfolio',
            description: 'College classes require you to understand stock markets and diversifying risks. You can always trust our team to value stocks and build the best charts.',
            features: ['Stock valuation', 'Diversifying risks', 'Best charts built', 'Investment portfolio help'],
            cta: 'Get Portfolio Help',
            slug: '/homework-help/finance/investment-portfolio',
            popular: true,
        },
        {
            emoji: '🌍',
            title: 'International Finance Help',
            description: 'We explore the financial world with you. Our tutors cover international finance, helping you with complex global market tasks and currency equations.',
            features: ['Global market tasks', 'Currency equations', 'Financial world exploration', 'International finance'],
            cta: 'Get International Help',
            slug: '/homework-help/finance/international',
            popular: false,
        },
        {
            emoji: '💼',
            title: 'Managerial Finance Help',
            description: 'If you need to hire an expert for managerial finance coursework, our team is ready. We provide deep financial equations and formulas help.',
            features: ['Managerial finance', 'Financial equations', 'Expert coursework help', 'Formulas assistance'],
            cta: 'Get Managerial Help',
            slug: '/homework-help/finance/managerial',
            popular: false,
        },
        {
            emoji: '💻',
            title: 'Financial Modeling Help',
            description: 'Need help with financial modeling? Our experts handle advanced data and numbers. We provide accurate models and forecasts for your university assignments.',
            features: ['Advanced models', 'Financial forecasts', 'Data and numbers', 'University assignments'],
            cta: 'Get Modeling Help',
            slug: '/homework-help/finance/financial-modeling',
            popular: false,
        },
        {
            emoji: '🛡️',
            title: 'Risk & Insurance Help',
            description: 'We specialize in providing top quality financial principles academic help, including deep analysis on risk management, insurance policies, and public funds.',
            features: ['Risk management', 'Insurance policies', 'Public funds analysis', 'Financial principles'],
            cta: 'Get Risk Help',
            slug: '/homework-help/finance/risk-insurance',
            popular: false,
        },
        {
            emoji: '💰',
            title: 'Personal Finance Help',
            description: 'Our tutors cover personal wealth and budgeting. If you find yourself thinking "I need to pay someone to do my finance homework", we are here for you.',
            features: ['Personal wealth', 'Budgeting tasks', 'Finance homework', 'Online coursework help'],
            cta: 'Get Personal Help',
            slug: '/homework-help/finance/personal',
            popular: false,
        },
        {
            emoji: '🏦',
            title: 'Money and Banking',
            description: 'We offer excellent money and banking coursework assistance so you can easily understand your class materials and financial systems.',
            features: ['Banking coursework', 'Financial systems', 'Understand materials', 'Class assistance'],
            cta: 'Get Banking Help',
            slug: '/homework-help/finance/banking',
            popular: false,
        },
        {
            emoji: '🔢',
            title: 'Quantitative Finance Help',
            description: 'We offer perfect quantitative finance coursework support. Our experts handle advanced data, formulas, and statistical models for complex assignments.',
            features: ['Quantitative support', 'Statistical models', 'Advanced formulas', 'Complex assignments'],
            cta: 'Get Quantitative Help',
            slug: '/homework-help/finance/quantitative',
            popular: false,
        },
        {
            emoji: '🎓',
            title: 'College Finance Help',
            description: 'If you need to hire an expert for college finance coursework, our team is ready. We provide deep financial equations and formulas help.',
            features: ['College coursework', 'Financial equations', 'Expert team ready', 'Top grades easily'],
            cta: 'Get College Help',
            slug: '/homework-help/finance/college',
            popular: false,
        },
        {
            emoji: '🏛️',
            title: 'University Finance Help',
            description: 'Our team of experienced professionals provide accurate university financial studies answers for your hardest classes to help you succeed.',
            features: ['University studies', 'Hardest classes', 'Accurate answers', 'Experienced professionals'],
            cta: 'Get University Help',
            slug: '/homework-help/finance/university',
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
export default function FinanceHomeworkHelp() {
    return (
        <>
            <Helmet>
                <title>Best Finance Homework Help | Finance Homework Solver Service</title>
                <meta name="description" content="Need to pay for finance homework? Get reliable online finance coursework help and financial calculations assistance from our top experts today." />
                <meta name="keywords" content="finance homework help, pay for finance homework, online finance coursework help, financial calculations assistance, finance degree homework solver, do my finance homework" />
            </Helmet>
            <div className="min-h-screen bg-white font-sans">

                {/* ── HERO ─────────────────────────────────────────────────────────── */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gray-50 overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto text-center mb-10">
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                                    <ShieldCheck className="w-4 h-4 text-[#1652A0]" />
                                    <span className="text-sm font-bold text-gray-700">100% Original Answers</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                                    <Globe className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-bold text-gray-700">Native English Experts</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-sm">
                                    <Clock className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-bold text-green-700">On Time Delivery</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-[#0B1F42] mb-10 leading-[1.2] tracking-tight">
                                Professional Finance Homework Help Online
                            </h1>
                            <p className="text-[20px] text-gray-600 mb-14 max-w-3xl mx-auto leading-[1.9] font-medium opacity-90">
                                Are you struggling with complex market charts and budgets? Use our finance homework writing service today. Just ask us to do my finance homework and get perfect grades every time.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/order-now"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                                >
                                    Do My Finance Homework <ArrowRight className="w-5 h-5" />
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
                                    { value: '250K+', label: 'Happy Students', color: 'text-[#1652A0]' },
                                    { value: '95%', label: 'On Time Delivery', color: 'text-[#1652A0]' },
                                    { value: '10+', label: 'Years of Experience', color: 'text-[#1652A0]' },
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
                                    Why Choose Our Finance Homework Help Service?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    We offer the best finance homework help for students tackling demanding financial projects. Here is why students worldwide trust us to help them get better grades.
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
                                        <h3 className="text-3xl font-black mb-4">100% Original Work and Free Reports</h3>
                                        <p className="text-gray-300 text-lg mb-6 leading-loose">
                                            We offer strict guarantees for completely original work. You get <span className="text-white font-bold">custom answers built from scratch</span> with <span className="text-white font-bold">zero copied content</span>. Every order includes a <span className="text-white font-bold">free originality report</span> to prove your work is unique and safe. We guarantee your papers are <span className="text-white font-bold">100 percent human written</span> without any artificial intelligence tools.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {[
                                                { icon: CheckCircle2, color: 'text-green-300', title: 'Free Originality Report', sub: 'Prove work is unique' },
                                                { icon: Brain, color: 'text-purple-300', title: '100% Human Written', sub: 'Zero AI involvement' },
                                                { icon: LineChart, color: 'text-yellow-300', title: 'Built From Scratch', sub: 'Custom answers guaranteed' },
                                                { icon: Lock, color: 'text-pink-300', title: 'Safe & Secure', sub: 'Strict guarantees' },
                                            ].map((item, i) => (
                                                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                                    <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                                                    <p className="font-bold text-lg">{item.title}</p>
                                                    <p className="text-gray-300 text-sm">{item.sub}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-green-500 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 font-bold text-lg shadow-xl">
                                            <Trophy className="w-6 h-6" /> Your Coursework, Calculated to Perfection
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 — Qualified University Experts */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualified University Experts</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        We employ a team of experienced professionals who hold Master and PhD degrees. Finding a reliable finance degree homework solver is easy with us. They provide highly accurate financial calculations assistance to help you get top grades easily.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Master and PhD degrees', 'Reliable degree solvers', 'Accurate financial calculations', 'Get top grades easily'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 3 — On Time Delivery Commitment */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-purple-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Zap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">On Time Delivery Commitment</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        You will never miss a deadline again. We offer rush turnaround options to help you avoid late penalties. We can finish your coursework in just a few hours if you are in a rush.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Rush turnaround options', 'Avoid late penalties', 'Finished in hours', 'Guaranteed on time'].map((item, i) => (
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
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support and Direct Communication</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        Do you need help right now? Our customer support team works around the clock. You can chat directly with your tutor to share ideas and ask questions about your coursework on our secure chatboard.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Around the clock support', 'Direct tutor chat', 'Share ideas instantly', 'Secure chatboard'].map((item, i) => (
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
                                        Your happiness is our main goal. We are ready to provide multiple revisions so your coursework turns out exactly as you want. We will fix any details and make free adjustments without any extra charges.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Multiple revisions available', 'Ensures your happiness', 'Fix any details', 'Zero extra charges'].map((item, i) => (
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
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Guaranteed</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        We offer a completely secure service. We protect your academic data with strong encryption when you pay for finance homework on our site. Your personal details are never shared with third parties or your writer.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Completely secure service', 'Strong encryption', 'Secure payments', 'Data never shared'].map((item, i) => (
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
                                    Get My Finance Homework Done Today <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── HOMEWORK HELP SERVICES ───────────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                                    HOMEWORK HELP SERVICES WE OFFER
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                                    Finance Homework Help & Other Academic Services
                                </h2>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8]">
                                    At EssayEmbassy, we specialize in providing top quality financial principles academic help. College classes require you to understand many different complex topics like the time value of money, stock markets, and diversifying risks. When you find yourself thinking "I need to pay someone to do my finance homework", we are here for you. We are the best website to pay for finance coursework worldwide.
                                </p>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8] mt-4">
                                    If you need to hire an expert for finance coursework, our team is ready. We provide deep financial equations and formulas help. We also offer excellent money and banking coursework assistance so you can easily understand your class materials. In addition to financial tasks, we also offer a broad range of other academic services:
                                </p>
                            </div>
                            <FinanceServicesGrid />
                            <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Ready to Get Perfect Grades on Your Finance Homework?</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Every solution is built by a verified finance expert — accurate calculations, clean charts, and proper formatting included.
                                </p>
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                                >
                                    Order Finance Homework Help Now <ArrowRight className="w-5 h-5" />
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
                                    Simple Process, Powerful Results
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    A streamlined four-step process designed to get your finance homework completed and submitted on time. Get started in minutes.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                                {[
                                    {
                                        step: '1', icon: FileText,
                                        stepBg: 'bg-[#1652A0]', iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                                        badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]', checkColor: 'text-[#1652A0]',
                                        title: 'Submit Your Requirements',
                                        desc: 'Provide us with your details. Enter your name, the subject you require help with, specific instructions, and your deadline date. If you are wondering who can help me with my university finance homework, just let us know here.',
                                        highlight: 'Takes 2 minutes',
                                        features: ['Secure details upload', 'Simple order form', 'Set your deadline', 'Share your instructions'],
                                    },
                                    {
                                        step: '2', icon: Users,
                                        stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                                        badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                                        title: 'Get Matched with an Expert',
                                        desc: 'We will get back to you with a price quote. We match you with an expert who understands your exact subject.',
                                        highlight: 'Subject-matched expert',
                                        features: ['Expert tutor profiles', 'Subject-area match', 'Right academic background', 'Help you succeed'],
                                    },
                                    {
                                        step: '3', icon: DollarSign,
                                        stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                                        badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                                        title: 'Complete Payment',
                                        desc: 'Complete the transaction through a debit card, credit card, or an online payment app. Stay in touch with your tutor to monitor the progress of your coursework.',
                                        highlight: 'Full transparency guaranteed',
                                        features: ['Flexible payment', 'Live tracking', 'Direct tutor chat', 'Monitor coursework'],
                                    },
                                    {
                                        step: '4', icon: Trophy,
                                        stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                                        badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                                        title: 'Receive Your Solution',
                                        desc: 'Receive your completed task by the deadline. Download your finished files and submit your coursework with total confidence.',
                                        highlight: 'On time guarantee',
                                        features: ['Instant download', 'Receive by deadline', 'Submit with confidence', 'Finished files ready'],
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
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Top Grades on Your Finance Homework?</h3>
                                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Your expertly calculated, submission-ready coursework is just one step away.</p>
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
                                <div>
                                    <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                        TRANSPARENT PRICING
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                                        Affordable Finance Homework Help Pricing
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-loose">
                                        Our rates start very low at just $13.99 per page. Prices depend on the deadline, page count, and the difficulty of the task. Pricing updates in real time with no surprises.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { icon: DollarSign, title: 'Rates Start Very Low', desc: 'Prices depend on the deadline, page count, and the difficulty of the task.' },
                                            { icon: FileCheck, title: 'No Hidden Fees', desc: 'Pay only for the text or data you need. We offer flexible payment options.' },
                                            { icon: Award, title: 'Free Features Included', desc: 'Get free formatting, a title page, and a reference page with every order.' },
                                            { icon: Shield, title: 'Satisfaction Promise', desc: 'We offer free revisions and a secure money back guarantee to protect your funds.' },
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
                                    Commitments we take seriously with every finance homework order we deliver.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {[
                                    {
                                        icon: Trophy,
                                        title: 'Quality Commitment',
                                        description: 'Our experts write perfectly structured papers. We make sure your research and data are completely accurate.',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'On Time Delivery',
                                        description: 'We always meet your deadlines so you can submit your coursework on time. Missing a submission window is never an option.',
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: 'Free Revisions',
                                        description: 'We revise your paper for free until it matches your exact needs perfectly.',
                                    },
                                    {
                                        icon: Lock,
                                        title: 'Privacy First',
                                        description: 'Strict confidentiality policies keep your academic and payment data completely safe. Your work is never shared with anyone.',
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
                                <h3 className="text-2xl font-bold mb-3">We Stand Behind Every Calculation We Deliver</h3>
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
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">Testimonials & Reviews</h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    Authentic reviews from verified students who improved their grades with our finance homework help.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'Lucas S.', tag: 'Verified', date: 'Oct 12, 2025', subject: 'Corporate Wealth', rating: 5, text: 'I had to ask them to do my college finance homework for me. The research was perfect. This is the best finance homework writing service online.' },
                                    { name: 'Fahid B.', tag: 'Returning Client', date: 'Nov 02, 2025', subject: 'Investment Banking', rating: 5, text: 'I needed to pay someone to do my finance homework online. The formulas were completely accurate and delivered early.' },
                                    { name: 'Johanna T.', tag: 'First-Time User', date: 'Nov 18, 2025', subject: 'Personal Budgets', rating: 4.9, text: 'I asked who can help me with my university finance homework and they answered instantly. I will definitely use this service here again.' },
                                    { name: 'Ryan P.', tag: 'Returning Client', date: 'Dec 05, 2025', subject: 'Public Funds', rating: 5, text: 'Long time fan here. I decided to hire an expert for finance coursework and they delivered fast. This is the best website to pay for finance coursework.' },
                                    { name: 'Darious D.', tag: 'Verified', date: 'Jan 14, 2026', subject: 'Risk Management', rating: 5, text: 'I needed college finance homework help for my class. The financial equations and formulas help was deeply engaging and very professional.' },
                                    { name: 'Liam K.', tag: 'First-Time User', date: 'Feb 22, 2026', subject: 'Working Capital', rating: 4.8, text: 'If you need an affordable college finance homework solver online, use this site. They provided great money and banking coursework assistance.' },
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
                                question="Can I pay someone to do my finance homework?"
                                answer="Yes, you can absolutely pay us to complete your tasks. Our experts are ready to provide excellent academic assistance so you can get better grades easily."
                            />
                            <FAQItem
                                question="How much does it cost to hire a finance homework solver?"
                                answer="Our pricing starts at just $13.99 per page. A simple high school problem costs less than a complex university research project. Ordering early ensures the best price."
                            />
                            <FAQItem
                                question="Who can do my finance coursework online?"
                                answer="Our team of qualified professionals can handle your workload. We hire experts with Master and PhD degrees to ensure you receive the best finance homework help available."
                            />
                            <FAQItem
                                question="Are finance homework writing services confidential?"
                                answer="Yes. We keep your personal details completely private and never share them with third parties. It is entirely safe to use our website for your school tasks."
                            />
                            <FAQItem
                                question="How fast can I get my college finance homework done?"
                                answer="Our professional writers can handle urgent tasks easily. We can complete your order quickly and offer rush turnaround options to help you avoid last minute stress."
                            />
                            <FAQItem
                                question="Where can I find accurate answers for my finance coursework?"
                                answer="You can find the best financial principles academic help and research solutions right here. We offer student friendly prices and highly accurate work for all advanced degrees."
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
                                Ready to Get Better Grades Today?
                            </h2>
                            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-loose">
                                Stop stressing over your financial coursework. Let our professional experts handle your research, data, and market charts. Get reliable finance homework help today.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                                <Link
                                    to="/order-now"
                                    className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                                >
                                    Start Your Finance Homework Now <ArrowRight className="w-5 h-5" />
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
                                    { icon: ShieldCheck, text: '100% Original Answers' },
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