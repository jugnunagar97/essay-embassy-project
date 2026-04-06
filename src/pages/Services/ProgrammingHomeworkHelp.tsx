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
    Code,
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
                <p className="text-gray-600 text-sm">Expert coding homework help starting very low. Pricing updates in real time — zero hidden fees.</p>
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
                            <Code className="w-4 h-4 text-[#1652A0]" />
                            Number of Problems/Pages
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
                        <span className="text-gray-700">Standard script</span>
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
                        Do My Programming Homework <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-gray-600">
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Originality Report</span>
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Comments & 24/7 Support</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Programming Sub-Services Grid ─────────────────────────────────────────────
const ProgrammingServicesGrid = () => {
    const services = [
        {
            emoji: '🐍',
            title: 'Python Homework Help',
            description: 'Python is popular but can be very tricky. If you want to pay someone to do my python homework online, our experts can handle it. We offer fast script writing and logic building.',
            features: ['Fast script writing', 'Logic building', 'Tricky code solved', 'Python homework online'],
            cta: 'Get Python Help',
            slug: '/homework-help/programming/python',
            popular: true,
        },
        {
            emoji: '☕',
            title: 'Java Homework Help',
            description: 'Java requires strict rules and object-oriented logic. We provide an affordable java homework solver for all your classes. We make sure your programs compile without any errors.',
            features: ['Object-oriented logic', 'Affordable solver', 'Compile without errors', 'Java homework help'],
            cta: 'Get Java Help',
            slug: '/homework-help/programming/java',
            popular: true,
        },
        {
            emoji: '⚙️',
            title: 'C / C++ Homework Help',
            description: 'C++ is great for building heavy software and games. Our tutors know exactly how to write fast and clean code for your C++ homework help tasks.',
            features: ['Heavy software & games', 'Fast & clean code', 'C++ homework tasks', 'Expert tutors'],
            cta: 'Get C++ Help',
            slug: '/homework-help/programming/c-cpp',
            popular: true,
        },
        {
            emoji: '🌐',
            title: 'JavaScript Homework Help',
            description: 'Web development tasks need strong skills. If you need to write my script online, our experts offer excellent Javascript homework help. We can make your web pages interactive and smooth.',
            features: ['Web development', 'Interactive pages', 'Script writing online', 'Javascript help'],
            cta: 'Get JS Help',
            slug: '/homework-help/programming/javascript',
            popular: false,
        },
        {
            emoji: '🗄️',
            title: 'SQL Database Homework Help',
            description: 'We can fix your database queries easily. If you ask who can help me with my php homework or need SQL database homework help, we have you covered. We also manage tables and data relations.',
            features: ['Fix database queries', 'Manage tables', 'Data relations', 'SQL homework help'],
            cta: 'Get SQL Help',
            slug: '/homework-help/programming/sql-database',
            popular: false,
        },
        {
            emoji: '🤖',
            title: 'Machine Learning Help',
            description: 'Artificial intelligence coursework is very advanced and requires deep logic. We offer expert machine learning homework help to guide you through these tough topics.',
            features: ['AI coursework', 'Deep logic', 'Expert ML help', 'Tough topics guided'],
            cta: 'Get ML Help',
            slug: '/homework-help/programming/machine-learning',
            popular: false,
        },
        {
            emoji: '🔣',
            title: 'Data Structures & Algorithms',
            description: 'We offer great algorithm solutions online. You can hire an expert for data structures homework today. We provide complete data structures and algorithms homework help so your programs run fast.',
            features: ['Algorithm solutions', 'Hire an expert', 'Complete data help', 'Fast running programs'],
            cta: 'Get Algorithms Help',
            slug: '/homework-help/programming/data-structures-algorithms',
            popular: false,
        },
        {
            emoji: '📐',
            title: 'MATLAB Homework Help',
            description: 'Do you need to say do my matlab homework for me? We cover that and many other languages too! Get accurate computations and visualizations from our programming experts.',
            features: ['Matlab homework', 'Accurate computations', 'Visualizations', 'Expert help'],
            cta: 'Get MATLAB Help',
            slug: '/homework-help/programming/matlab',
            popular: false,
        },
        {
            emoji: '📊',
            title: 'R Programming Homework',
            description: 'Computer classes require you to understand many different complex topics. Get professional R programming homework help for your data analysis and statistical computing.',
            features: ['Data analysis', 'Statistical computing', 'Complex topics', 'R programming'],
            cta: 'Get R Help',
            slug: '/homework-help/programming/r',
            popular: false,
        },
        {
            emoji: '🧠',
            title: 'Artificial Intelligence Help',
            description: 'Artificial intelligence coursework is very advanced and requires deep logic. We provide top quality help for students worldwide to ensure perfect grades on complex models.',
            features: ['AI coursework', 'Deep logic', 'Top quality help', 'Students worldwide'],
            cta: 'Get AI Help',
            slug: '/homework-help/programming/artificial-intelligence',
            popular: false,
        },
        {
            emoji: '🐘',
            title: 'PHP Homework Help',
            description: 'If you ask who can help me with my php homework, we have you covered. We can fix your queries and server-side scripts easily so your web applications run flawlessly.',
            features: ['PHP homework', 'Fix queries', 'Server-side scripts', 'Expert help'],
            cta: 'Get PHP Help',
            slug: '/homework-help/programming/php',
            popular: false,
        },
        {
            emoji: '🎨',
            title: 'HTML & CSS Homework Help',
            description: 'Web development tasks need strong skills. We make sure your web pages compile perfectly and look exactly as required for your frontend development assignments.',
            features: ['Web development', 'HTML & CSS', 'Compile perfectly', 'Exact requirements'],
            cta: 'Get HTML/CSS Help',
            slug: '/homework-help/programming/html-css',
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
export default function ProgrammingHomeworkHelp() {
    return (
        <>
            <Helmet>
                <title>Best Programming Homework Help | Coding Homework Service</title>
                <meta name="description" content="Need to do my programming homework? Pay for programming homework today. Get a fast programming homework solver and accurate computer science coursework assistance." />
                <meta name="keywords" content="programming homework help, do my programming homework, coding homework service, pay for programming homework, programming homework solver, computer science coursework assistance" />
            </Helmet>
            <div className="min-h-screen bg-white font-sans">

                {/* ── HERO ─────────────────────────────────────────────────────────── */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gray-50 overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto text-center mb-10">
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                                    <Code className="w-4 h-4 text-[#1652A0]" />
                                    <span className="text-sm font-bold text-gray-700">100% Accurate Code</span>
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
                                Professional Programming Homework Help Online
                            </h1>
                            <p className="text-[20px] text-gray-600 mb-14 max-w-3xl mx-auto leading-[1.9] font-medium opacity-90">
                                Are you struggling with your code? Use our coding homework service today. Just ask us to do my programming homework and get perfect grades every time.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/order-now"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                                >
                                    Do My Programming Homework <ArrowRight className="w-5 h-5" />
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
                                    { value: '520+', label: 'PhD Programmers', color: 'text-[#1652A0]' },
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
                                    Why Choose Our Programming Homework Help Service?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    We offer the best programming homework help for students tackling demanding coding projects. Here is why students worldwide trust us to help them get better grades.
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
                                        <h3 className="text-3xl font-black mb-4">100% Original Code and Free Reports</h3>
                                        <p className="text-gray-300 text-lg mb-6 leading-loose">
                                            We offer strict guarantees for completely original work. You get <span className="text-white font-bold">custom code built from scratch</span> with <span className="text-white font-bold">zero copied content</span>. Every order includes a <span className="text-white font-bold">free originality report</span> to prove your work is unique and safe.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {[
                                                { icon: CheckCircle2, color: 'text-green-300', title: 'Free Originality Report', sub: 'Prove work is unique' },
                                                { icon: Brain, color: 'text-purple-300', title: 'Zero Copied Content', sub: 'Completely original work' },
                                                { icon: Code, color: 'text-yellow-300', title: 'Built From Scratch', sub: 'Custom code guaranteed' },
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
                                            <Trophy className="w-6 h-6" /> Your Project, Coded to Perfection
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
                                        We hire experienced professionals with advanced master and PhD degrees. Finding a great programming homework solver is easy with us. They provide highly accurate computer science coursework assistance to help you get top grades easily.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Advanced master and PhDs', 'Great homework solvers', 'Accurate computer science', 'Get top grades easily'].map((item, i) => (
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
                                        Do you need debugging help right now? Our customer support team works around the clock. You can chat directly with your tutor to share ideas and ask questions.
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
                                        Your happiness is our main goal. We offer a free revision period so your coding project turns out exactly as you want. We will fix any bugs until the program runs perfectly.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Free revision period', 'Ensures your happiness', 'Fix any bugs', 'Program runs perfectly'].map((item, i) => (
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
                                        Your personal details are completely safe with us. We protect your academic data with strong encryption when you pay for programming homework on our site.
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
                                    Get My Programming Homework Done Today <ArrowRight className="w-5 h-5" />
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
                                    CODING HOMEWORK SERVICE OPTIONS
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                                    Programming Homework Help & Other Academic Services
                                </h2>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8]">
                                    At EssayEmbassy, we specialize in providing top quality help for students. Computer classes require you to understand many different complex topics. When you find yourself thinking "I need to pay someone to do my programming homework", we are here for you.
                                </p>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8] mt-4">
                                    We are the best website to pay for coding coursework worldwide. If you want to write my code for money, our team is ready. In addition to programming tasks, we also offer a broad range of other academic services:
                                </p>
                            </div>
                            <ProgrammingServicesGrid />
                            <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Ready to Get Perfect Grades on Your Coding Project?</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Every solution is built by a verified programming expert — accurate code, clean syntax, and proper comments included.
                                </p>
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                                >
                                    Order Programming Homework Help Now <ArrowRight className="w-5 h-5" />
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
                                    A streamlined four-step process designed to get your programming homework completed and submitted on time. Get started in minutes.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                                {[
                                    {
                                        step: '1', icon: FileText,
                                        stepBg: 'bg-[#1652A0]', iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                                        badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]', checkColor: 'text-[#1652A0]',
                                        title: 'Submit Your Requirements',
                                        desc: 'Fill out our simple order form. Upload your instructions and tell us your deadline. Let us know if you need help with simple HTML or complex machine learning tasks.',
                                        highlight: 'Takes 2 minutes',
                                        features: ['Secure file upload', 'Simple order form', 'Set your deadline', 'Share your instructions'],
                                    },
                                    {
                                        step: '2', icon: Users,
                                        stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                                        badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                                        title: 'Get Matched with an Expert',
                                        desc: 'We match you with an expert who understands your exact coding language. Your writer will have the right academic background to help you succeed.',
                                        highlight: 'Language-matched expert',
                                        features: ['Expert coder profiles', 'Language-area match', 'Right academic background', 'Help you succeed'],
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
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Top Grades on Your Programming Homework?</h3>
                                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Your expertly coded, submission-ready coursework is just one step away.</p>
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
                                        Affordable Programming Homework Help Pricing
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-loose">
                                        Our rates start very low. Prices depend on the difficulty of the task. Pricing updates in real time with no surprises — making professional programming homework help accessible for every student.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { icon: DollarSign, title: 'Rates Start Very Low', desc: 'Prices depend on the difficulty of the task with zero hidden costs.' },
                                            { icon: FileCheck, title: 'No Hidden Fees', desc: 'Pay only for the code you need. Pricing updates in real time with no surprises.' },
                                            { icon: Award, title: 'Free Features Included', desc: 'Get free comments in the code and direct chat with every order.' },
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
                                    Commitments we take seriously with every programming homework order we deliver.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {[
                                    {
                                        icon: Trophy,
                                        title: 'Quality Commitment',
                                        description: 'Our experts write perfectly structured code. We make sure your loops and logic are completely accurate.',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'On Time Delivery',
                                        description: 'We always meet your deadlines so you can submit your coursework on time. Missing a submission window is never an option.',
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: 'Free Revisions',
                                        description: 'We revise your program for free until it matches your exact needs perfectly and runs without bugs.',
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
                                <h3 className="text-2xl font-bold mb-3">We Stand Behind Every Script We Deliver</h3>
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
                                    Authentic reviews from verified students who improved their grades with our programming homework help.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'Lucas S.', tag: 'Verified', date: 'Oct 12, 2025', subject: 'Python', rating: 5, text: 'I told them to do my programming homework for my class. The code was perfect. This is the best coding homework service online.' },

                                    { name: 'Fahid B.', tag: 'Returning Client', date: 'Nov 02, 2025', subject: 'Java', rating: 5, text: 'I needed an affordable java homework solver. The program was completely accurate, compiled on the first try, and was delivered early.' },

                                    { name: 'Johanna T.', tag: 'First-Time User', date: 'Nov 18, 2025', subject: 'SQL', rating: 4.9, text: 'I asked who can help me with my php homework and database tasks, and they answered instantly. I will definitely pay for programming homework here again.' },

                                    { name: 'Ryan P.', tag: 'Returning Client', date: 'Dec 05, 2025', subject: 'Algorithms', rating: 5, text: 'Long time fan here. I decided to hire an expert for data structures homework and they delivered fast. This is the best website to pay for coding coursework.' },

                                    { name: 'Darious D.', tag: 'Verified', date: 'Jan 14, 2026', subject: 'Machine Learning', rating: 5, text: 'I had to ask them to do my matlab homework for me. The artificial intelligence coursework help was deeply engaging and very professional.' },

                                    { name: 'Liam K.', tag: 'First-Time User', date: 'Feb 22, 2026', subject: 'C++', rating: 4.8, text: 'If you need to pay someone to do my python homework online or C++, use this site. They provided great algorithm solutions online.' },
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
                                question="Can I pay someone to do my programming homework?"
                                answer="Yes, you can absolutely pay us to complete your coding tasks. Our experts are ready to provide excellent computer science coursework assistance so you can get better grades."
                            />
                            <FAQItem
                                question="How much does it cost to hire a coding homework solver?"
                                answer="Our pricing starts low and depends heavily on your academic level. A simple high school script costs less than an advanced university database project. Ordering early ensures the best price."
                            />
                            <FAQItem
                                question="Who can write my Python code online?"
                                answer="Our team of qualified professionals can handle your workload. We hire experts with master and PhD degrees to ensure you receive the best programming homework solver available."
                            />
                            <FAQItem
                                question="Are programming homework services confidential?"
                                answer="Yes. We keep your personal details completely private and never share them with third parties. It is entirely safe to use our website to write your scripts."
                            />
                            <FAQItem
                                question="How fast can I get my Java script done?"
                                answer="Our professional coders can handle urgent tasks easily. We can complete your order in just a few hours to help you avoid last minute stress."
                            />
                            <FAQItem
                                question="Where can I find accurate answers for my computer science homework?"
                                answer="You can find the best debugging help and web development tasks right here. We offer student friendly prices and highly accurate work for all advanced degrees."
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
                                Stop stressing over your computer coursework. Let our professional experts handle your code, bugs, and databases. Get reliable programming homework help today.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                                <Link
                                    to="/order-now"
                                    className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                                >
                                    Start Your Coding Homework Now <ArrowRight className="w-5 h-5" />
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
                                    { icon: ShieldCheck, text: '100% Accurate Code' },
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