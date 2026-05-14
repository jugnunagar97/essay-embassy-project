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
    Settings,
    FlaskConical,
    Beaker
} from 'lucide-react';
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
                <p className="text-gray-600 text-sm">Expert science homework help starting very low. Pricing updates in real time — zero hidden fees.</p>
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
                            <FlaskConical className="w-4 h-4 text-[#1652A0]" />
                            Number of Pages/Problems
                        </span>
                        <span className="text-[#1652A0] font-bold">{pages} {pages === 1 ? 'task' : 'tasks'}</span>
                    </label>
                    <input
                        type="range" min="1" max="50" value={pages}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPages(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1652A0]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                        <span>1 task</span>
                        <span className="text-gray-700">Standard project</span>
                        <span>50 tasks</span>
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
                            <p className="text-xs text-gray-500 font-medium">Per Task</p>
                            <p className="text-xl font-bold text-gray-900">${(Number(calculatePrice()) / pages).toFixed(2)}</p>
                        </div>
                    </div>
                    <Link
                        to="/order-now"
                        className="w-full px-6 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        Do My Science Homework <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-gray-600">
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Originality Report</span>
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Formatting & 24/7 Support</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Science Sub-Services Grid ─────────────────────────────────────────────
const ScienceServicesGrid = () => {
    const services = [
        {
            emoji: '🔬',
            title: 'General Science Homework',
            description: 'If you need to hire an expert for general science homework, our team is ready. We provide deep scientific method coursework answers and step-by-step explanations so you can easily understand your class materials.',
            features: ['Scientific method answers', 'Step-by-step explanations', 'Hire an expert easily', 'General science help'],
            cta: 'Get Science Help',
            slug: '/homework-help/science/general',
            popular: true,
        },
        {
            emoji: '🌿',
            title: 'Natural Science Homework',
            description: 'We explore the physical world with you. Our tutors cover biology, chemistry, and physics. We provide excellent lab report writing help so your experiments look highly professional and well researched.',
            features: ['Biology, Chemistry, Physics', 'Lab report writing help', 'Professional experiments', 'Well researched papers'],
            cta: 'Get Natural Science Help',
            slug: '/homework-help/science/natural',
            popular: true,
        },
        {
            emoji: '⚙️',
            title: 'Applied Science Homework',
            description: 'Applied sciences can be very difficult. Our team acts as a fast science project solver for your complex tasks. We offer deep scientific research paper assistance so your writing is clear and logical.',
            features: ['Fast project solver', 'Research paper assistance', 'Clear & logical writing', 'Backed by strong evidence'],
            cta: 'Get Applied Science Help',
            slug: '/homework-help/science/applied',
            popular: true,
        },
        {
            emoji: '💻',
            title: 'STEM Homework Help',
            description: 'Our experts handle advanced technology and data. We provide accurate scientific data analysis help for your hardest classes. You can always trust our experts to calculate the right numbers and build the best charts.',
            features: ['Scientific data analysis', 'Advanced technology', 'Calculate right numbers', 'Build the best charts'],
            cta: 'Get STEM Help',
            slug: '/homework-help/science/stem',
            popular: false,
        },
        {
            emoji: '⚛️',
            title: 'Physics Homework Help',
            description: 'Get expert physics homework help online. Our professional tutors solve complex formulas and equations perfectly, providing you with deep understanding and accurate physics answers.',
            features: ['Complex formulas', 'Accurate equations', 'Deep understanding', 'Expert physics tutors'],
            cta: 'Get Physics Help',
            slug: '/homework-help/science/physics',
            popular: false,
        },
        {
            emoji: '🧪',
            title: 'Chemistry Homework Help',
            description: 'Need chemistry homework help? From balancing chemical equations to complex lab reports, we have you covered. Get reliable solutions for all your chemistry assignments.',
            features: ['Chemical equations', 'Complex lab reports', 'Reliable solutions', 'Chemistry assignments'],
            cta: 'Get Chemistry Help',
            slug: '/homework-help/science/chemistry',
            popular: false,
        },
        {
            emoji: '🧬',
            title: 'Biology Homework Help',
            description: 'Find excellent biology homework help for all your assignments. Our experts assist with cellular biology, ecology, and anatomy tasks ensuring you get perfect grades every time.',
            features: ['Cellular biology', 'Ecology and anatomy', 'Perfect grades', 'Expert biology help'],
            cta: 'Get Biology Help',
            slug: '/homework-help/science/biology',
            popular: false,
        },
        {
            emoji: '⚗️',
            title: 'Organic Chemistry Help',
            description: 'Master organic chemistry with our expert tutors. We help with reactions, mechanisms, and complex structures, offering step-by-step organic chemistry solutions online.',
            features: ['Chemical reactions', 'Reaction mechanisms', 'Complex structures', 'Step-by-step solutions'],
            cta: 'Get Organic Chem Help',
            slug: '/homework-help/science/organic-chemistry',
            popular: false,
        },
        {
            emoji: '🌍',
            title: 'Environmental Science',
            description: 'Need environmental science homework help? We provide expert assistance on ecology, conservation, and climate change coursework, ensuring your research is completely accurate.',
            features: ['Ecology coursework', 'Conservation studies', 'Climate change research', 'Accurate assistance'],
            cta: 'Get Environmental Help',
            slug: '/homework-help/science/environmental',
            popular: false,
        },
        {
            emoji: '🔭',
            title: 'Astronomy Homework Help',
            description: 'Explore the universe with our astronomy homework help. Get accurate answers for all your celestial tasks, planetary models, and deep space research assignments.',
            features: ['Celestial tasks', 'Planetary models', 'Deep space research', 'Accurate astronomy answers'],
            cta: 'Get Astronomy Help',
            slug: '/homework-help/science/astronomy',
            popular: false,
        },
        {
            emoji: '👨‍🔬',
            title: 'Genetics Homework Help',
            description: 'We offer specialized genetics homework help. Let our experts handle your DNA research, inheritance models, and complex biological data analysis with total precision.',
            features: ['DNA research', 'Inheritance models', 'Biological data analysis', 'Total precision'],
            cta: 'Get Genetics Help',
            slug: '/homework-help/science/genetics',
            popular: false,
        },
        {
            emoji: '🌋',
            title: 'Earth Science Help',
            description: 'Expert earth science homework help is just a click away. We cover geology, meteorology, and oceanography to give you top-quality academic assistance.',
            features: ['Geology studies', 'Meteorology tasks', 'Oceanography research', 'Top-quality assistance'],
            cta: 'Get Earth Science Help',
            slug: '/homework-help/science/earth',
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
export default function ScienceHomeworkHelp() {
    return (
        <>
            <Helmet>
                <title>Best Science Homework Help | Science Homework Solver Service</title>
                <meta name="description" content="Need to pay for science homework? Get reliable online science coursework help and lab report writing help from our expert science homework solver team today." />
                <meta name="keywords" content="science homework help, do my science homework, pay for science homework, science homework solver, online science coursework help, lab report writing help" />
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
                                Professional Science Homework Help Online
                            </h1>
                            <p className="text-[20px] text-gray-600 mb-14 max-w-3xl mx-auto leading-[1.9] font-medium opacity-90">
                                Are you struggling with complex formulas and research? Use our science homework writing service today. Just ask us to do my science homework and get perfect grades every time.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/order-now"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                                >
                                    Do My Science Homework <ArrowRight className="w-5 h-5" />
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
                                    { value: '10K+', label: 'Happy Students', color: 'text-[#1652A0]' },
                                    { value: '99%', label: 'On Time Delivery', color: 'text-[#1652A0]' },
                                    { value: '30K+', label: 'Subject Experts', color: 'text-[#1652A0]' },
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
                                    Why Choose Our Science Homework Help Service?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    We offer the best science homework help for students tackling demanding research and formulas. Here is why students worldwide trust us to help them get better grades.
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
                                            We offer strict guarantees for completely original work. You get <span className="text-white font-bold">custom answers built from scratch</span> with <span className="text-white font-bold">zero copied content</span>. Every order includes a <span className="text-white font-bold">free originality report</span> to prove your work is unique and safe.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {[
                                                { icon: CheckCircle2, color: 'text-green-300', title: 'Free Originality Report', sub: 'Prove work is unique' },
                                                { icon: Brain, color: 'text-purple-300', title: 'Zero Copied Content', sub: 'Completely original work' },
                                                { icon: Beaker, color: 'text-yellow-300', title: 'Built From Scratch', sub: 'Custom answers guaranteed' },
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
                                            <Trophy className="w-6 h-6" /> Your Research, Handled to Perfection
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
                                        We hire experienced professionals with advanced degrees. Finding a great college STEM tutor online is easy with us. They provide highly accurate university science solutions to help you get top grades easily.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Advanced university degrees', 'College STEM tutors', 'Accurate science solutions', 'Get top grades easily'].map((item, i) => (
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
                                        You will never miss a deadline again. We offer fast delivery options to help you avoid late penalties. We can finish your coursework in just a few hours if you are in a rush.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Fast delivery options', 'Avoid late penalties', 'Finished in hours', 'Guaranteed on time'].map((item, i) => (
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
                                        Do you need an affordable science homework solver right now? Our customer support team works around the clock. You can chat directly with your tutor to share ideas and ask questions.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Around the clock support', 'Direct tutor chat', 'Share ideas instantly', 'Ask questions anytime'].map((item, i) => (
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
                                        Your happiness is our main goal. We offer a free revision period so your coursework turns out exactly as you want without any extra charges.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Free revision period', 'Ensures your happiness', 'Turns out exactly as wanted', 'Zero extra charges'].map((item, i) => (
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
                                        Your personal details are completely safe with us. We protect your academic data with strong encryption when you pay for science homework on our site.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Details completely safe', 'Strong encryption', 'Secure payments', 'Data never shared'].map((item, i) => (
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
                                    Get My Science Homework Done Today <ArrowRight className="w-5 h-5" />
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
                                    Science Homework Help & Other Academic Services
                                </h2>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8]">
                                    At EssayEmbassy, we specialize in providing top quality online science coursework help. Science classes require you to understand many different complex topics. When you find yourself thinking "I need to pay someone to do my science homework", we are here for you.
                                </p>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8] mt-4">
                                    We are the best website to pay for science coursework worldwide. In addition to science tasks, we also offer a broad range of other academic services:
                                </p>
                            </div>
                            <ScienceServicesGrid />
                            <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Ready to Get Perfect Grades on Your Science Homework?</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Every solution is built by a verified science expert — accurate formulas, clean research, and proper formatting included.
                                </p>
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                                >
                                    Order Science Homework Help Now <ArrowRight className="w-5 h-5" />
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
                                    A streamlined four-step process designed to get your science homework completed and submitted on time. Get started in minutes.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                                {[
                                    {
                                        step: '1', icon: FileText,
                                        stepBg: 'bg-[#1652A0]', iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                                        badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]', checkColor: 'text-[#1652A0]',
                                        title: 'Submit Your Requirements',
                                        desc: 'Fill out our simple order form. Upload your instructions and tell us your deadline. Let us know if you need basic worksheet answers or complex research assistance.',
                                        highlight: 'Takes 2 minutes',
                                        features: ['Secure file upload', 'Simple order form', 'Set your deadline', 'Share your instructions'],
                                    },
                                    {
                                        step: '2', icon: Users,
                                        stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                                        badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                                        title: 'Get Matched with an Expert',
                                        desc: 'We match you with an expert who understands your exact subject. Your writer will have the right academic background to help you succeed.',
                                        highlight: 'Subject-matched expert',
                                        features: ['Expert tutor profiles', 'Subject-area match', 'Right academic background', 'Help you succeed'],
                                    },
                                    {
                                        step: '3', icon: Settings,
                                        stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                                        badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                                        title: 'Track Progress',
                                        desc: 'Stay in touch with your tutor. You can monitor the progress of your coursework and ask questions at any time.',
                                        highlight: 'Full transparency guaranteed',
                                        features: ['Stay in touch', 'Live tracking', 'Direct tutor chat', 'Monitor coursework'],
                                    },
                                    {
                                        step: '4', icon: Trophy,
                                        stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                                        badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                                        title: 'Download and Submit',
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
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Top Grades on Your Science Homework?</h3>
                                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Your expertly researched, submission-ready coursework is just one step away.</p>
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
                                        Affordable Science Homework Help Pricing
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-loose">
                                        Our rates start very low. Prices depend on the difficulty of the task. Pricing updates in real time with no surprises — making professional science homework help accessible for every student.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { icon: DollarSign, title: 'Rates Start Very Low', desc: 'Prices depend on the difficulty of the task with zero hidden costs.' },
                                            { icon: FileCheck, title: 'No Hidden Fees', desc: 'Pay only for the text or data you need. Pricing updates in real time with no surprises.' },
                                            { icon: Award, title: 'Free Features Included', desc: 'Get free formatting and direct chat with every order.' },
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
                                    Commitments we take seriously with every science homework order we deliver.
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
                                <h3 className="text-2xl font-bold mb-3">We Stand Behind Every Lab Report We Deliver</h3>
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
                                    Authentic reviews from verified students who improved their grades with our science homework help.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'Lucas S.', tag: 'Verified', date: 'Oct 12, 2025', subject: 'Biology', rating: 5, text: 'I told them to do my science homework for my class. The research was perfect. This is the best science homework writing service online.' },

                                    { name: 'Fahid B.', tag: 'Returning Client', date: 'Nov 02, 2025', subject: 'Physics', rating: 5, text: 'I needed to pay someone to do my science homework online. The physics equations were completely accurate and delivered early.' },

                                    { name: 'Johanna T.', tag: 'First-Time User', date: 'Nov 18, 2025', subject: 'Chemistry', rating: 4.9, text: 'I asked who can help me with my lab report homework and they answered instantly. I will definitely use this service here again.' },

                                    { name: 'Ryan P.', tag: 'Returning Client', date: 'Dec 05, 2025', subject: 'Natural Sciences', rating: 5, text: 'Long time fan here. I decided to hire an expert for general science homework and they delivered fast. This is the best website to pay for science coursework.' },

                                    { name: 'Darious D.', tag: 'Verified', date: 'Jan 14, 2026', subject: 'Advanced Science', rating: 5, text: 'I had to ask them to do my college science homework for me. The university science solutions were deeply engaging and very professional.' },

                                    { name: 'Liam K.', tag: 'First-Time User', date: 'Feb 22, 2026', subject: 'Earth Science', rating: 4.8, text: 'If you need an affordable science homework solver, use this site. They provided great STEM homework help online.' },
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
                                question="Can I pay someone to do my science homework?"
                                answer="Yes, you can absolutely pay us to complete your tasks. Our experts are ready to provide excellent academic assistance so you can get better grades easily."
                            />
                            <FAQItem
                                question="How much does it cost to hire a science homework solver?"
                                answer="Our pricing starts low and depends heavily on your academic level. A simple high school problem costs less than a complex university lab project. Ordering early ensures the best price."
                            />
                            <FAQItem
                                question="Who can do my science lab report online?"
                                answer="Our team of qualified professionals can handle your workload. We hire experts with master and PhD degrees to ensure you receive the best lab report writing help available."
                            />
                            <FAQItem
                                question="Are science homework writing services confidential?"
                                answer="Yes. We keep your personal details completely private and never share them with third parties. It is entirely safe to use our website for your school tasks."
                            />
                            <FAQItem
                                question="How fast can I get my general science homework done?"
                                answer="Our professional writers can handle urgent tasks easily. We can complete your order in just a few hours to help you avoid last minute stress."
                            />
                            <FAQItem
                                question="Where can I find accurate answers for my STEM homework?"
                                answer="You can find the best scientific data analysis help and research solutions right here. We offer student friendly prices and highly accurate work for all advanced degrees."
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
                                Stop stressing over your science coursework. Let our professional experts handle your research, data, and lab reports. Get reliable science homework help today.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                                <Link
                                    to="/order-now"
                                    className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                                >
                                    Start Your Science Homework Now <ArrowRight className="w-5 h-5" />
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