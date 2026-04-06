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
    Monitor,
    Ruler,
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
    const [taskType, setTaskType] = useState('excel');
    const [deadline, setDeadline] = useState('7days');

    const baseRates: Record<string, number> = {
        highschool: 10.00,
        undergraduate: 14.00,
        masters: 18.00,
        phd: 24.00,
    };

    const taskMultipliers: Record<string, number> = {
        excel: 1.0,
        word: 0.9,
        powerpoint: 1.0,
        access: 1.3,
        vba: 1.5,
        integrated: 1.4,
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
        const base = baseRates[academicLevel] || 14.00;
        const tMult = taskMultipliers[taskType] || 1.0;
        const dMult = deadlineMultipliers[deadline] || 1.0;
        return (base * tMult * dMult).toFixed(2);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your Live Price</h3>
                <p className="text-gray-600 text-sm">MS Office assignment help starting at just $10.00 per task. Pricing updates in real time with zero hidden fees.</p>
            </div>
            <div className="space-y-6">
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
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-[#1652A0]" />
                        Task Type
                    </label>
                    <select
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50 font-medium"
                    >
                        <option value="excel">Microsoft Excel</option>
                        <option value="word">Microsoft Word</option>
                        <option value="powerpoint">PowerPoint Presentation</option>
                        <option value="access">Microsoft Access / Database</option>
                        <option value="vba">Excel VBA / Macro</option>
                        <option value="integrated">Integrated Office Project</option>
                    </select>
                </div>
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
                <div className="bg-[#0B1F42]/5 rounded-2xl p-6 border border-[#0B1F42]/10">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-[#0B1F42] text-sm font-semibold mb-1">Estimated Total:</p>
                            <p className="text-4xl font-black text-[#0B1F42]">${calculatePrice()}</p>
                        </div>
                        <div className="text-right bg-white rounded-lg px-3 py-2 border border-[#0B1F42]/10">
                            <p className="text-xs text-gray-500 font-medium">Per Task</p>
                            <p className="text-xl font-bold text-gray-900">${calculatePrice()}</p>
                        </div>
                    </div>
                    <Link
                        to="/order-now"
                        className="w-full px-6 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        Do My Microsoft Office Assignment <ArrowRight className="w-5 h-5" />
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

// ─── MS Office Sub-Services Grid ─────────────────────────────────────────────
const MSOfficeServicesGrid = () => {
    const services = [
        {
            emoji: '📝',
            title: 'Microsoft Word Help',
            description: 'Use our Microsoft Word assignment writing service to get your essays and reports done. We give you help with MS Word assignment tasks and offer professional Word document formatting help to make your pages look clean.',
            features: ['Clean page layouts', 'Help with MS Word tasks', 'Essay and report writing', 'Fixing Word errors'],
            cta: 'Get Word Help',
            slug: '/assignment-help/ms-office/word',
            popular: false,
        },
        {
            emoji: '📊',
            title: 'Microsoft Excel Help',
            description: 'Work with a Microsoft Excel assignment expert to fix your spreadsheets. We offer Excel assignment help online for any level. Just say, "Do my Microsoft Excel assignment," and we will handle the rows and columns for you.',
            features: ['Expert spreadsheet help', 'Do my Excel work', 'Fixing sheet errors', 'Online Excel support'],
            cta: 'Get Excel Help',
            slug: '/assignment-help/ms-office/excel',
            popular: true,
        },
        {
            emoji: '🎭',
            title: 'PowerPoint Help',
            description: 'Get PowerPoint presentation assignment help to make slides that look great. We provide help with MS PowerPoint assignment work and professional PPT assignment writing so you can give a great talk.',
            features: ['Cool slide designs', 'PPT writing service', 'Help with MS slides', 'Better presentations'],
            cta: 'Get PPT Help',
            slug: '/assignment-help/ms-office/powerpoint',
            popular: false,
        },
        {
            emoji: '🗄️',
            title: 'Microsoft Access Help',
            description: 'Our Microsoft Access database assignment help makes sorting info easy. Use our MS Access assignment solver to fix your tables. We give you help with Access database assignment tasks so your data stays organized.',
            features: ['Database table help', 'Access solver service', 'Organizing big lists', 'Data entry help'],
            cta: 'Get Access Help',
            slug: '/assignment-help/ms-office/access',
            popular: false,
        },
        {
            emoji: '📧',
            title: 'Microsoft Outlook Help',
            description: 'Find Microsoft Outlook assignment help online for email tasks. Our MS Outlook assignment writing service explains how to manage your inbox. Get Outlook configuration assignment help to set up your account the right way.',
            features: ['Email setup help', 'Outlook writing service', 'Inbox management', 'Account config help'],
            cta: 'Get Outlook Help',
            slug: '/assignment-help/ms-office/outlook',
            popular: false,
        },
        {
            emoji: '🧮',
            title: 'Excel Formula Help',
            description: 'Get Excel formulas and functions assignment help for your math tasks. We provide help with complex Excel formulas that are hard to remember. Our advanced Excel function solver makes sure your math is always right.',
            features: ['Hard math formulas', 'Advanced function solver', 'Complex math help', 'Formula error fixing'],
            cta: 'Get Formula Help',
            slug: '/assignment-help/ms-office/excel-formulas',
            popular: false,
        },
        {
            emoji: '🤖',
            title: 'Excel VBA Macro Help',
            description: 'Our Excel VBA macro assignment help makes your sheets work on their own. Tell us, "Write my Excel VBA macro," to save time. Work with an Excel automation assignment expert to make your work fly.',
            features: ['Write my VBA code', 'Automation expert help', 'Speed up your work', 'Macro error fixing'],
            cta: 'Get VBA Help',
            slug: '/assignment-help/ms-office/excel-vba-macro',
            popular: false,
        },
        {
            emoji: '📈',
            title: 'Excel Data Analysis',
            description: 'Get data analysis in Excel assignment help to understand your numbers. Our Excel data visualization assignment service makes pretty charts. We give you help with Excel pivot tables and analysis today.',
            features: ['Pivot table help', 'Making data charts', 'Reading your numbers', 'Data analysis service'],
            cta: 'Get Analysis Help',
            slug: '/assignment-help/ms-office/excel-data-analysis',
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
export default function MSOfficeAssignmentHelp() {
    return (
        <>
            <Helmet>
                <title>Best MS Office Assignment Help for College Students</title>
                <meta name="description" content="Need microsoft office homework help? Pay someone to do microsoft office assignment tasks today. Hire cheap office 365 homework helpers online for top grades." />
                <meta name="keywords" content="ms office assignment help, microsoft office homework help, do my microsoft office assignment, office 365 homework help, excel assignment help, powerpoint assignment help, word assignment help" />
            </Helmet>
            <div className="min-h-screen bg-white font-sans">

                {/* ── HERO ─────────────────────────────────────────────────────────── */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gray-50 overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto text-center mb-10">
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                                    <ShieldCheck className="w-4 h-4 text-[#1652A0]" />
                                    <span className="text-sm font-bold text-gray-700">Plagiarism-Free Solutions</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                                    <Monitor className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-bold text-gray-700">Native English Experts</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-sm">
                                    <Clock className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-bold text-green-700">On-Time Delivery</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-[#0B1F42] mb-10 leading-[1.2] tracking-tight">
                                Professional MS Office Assignment Help Online
                            </h1>
                            <p className="text-[20px] text-gray-600 mb-14 max-w-3xl mx-auto leading-[1.9] font-medium opacity-90">
                                Expert Helpers, Error-Free Files, and On-Time Delivery. Get Perfect Grades Every Time.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/order-now"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                                >
                                    Do My Microsoft Office Assignment <ArrowRight className="w-5 h-5" />
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
                                    { value: '150K+', label: 'Happy Students', color: 'text-[#1652A0]' },
                                    { value: '99%', label: 'On-Time Delivery', color: 'text-[#1652A0]' },
                                    { value: '500+', label: 'Verified Experts', color: 'text-[#1652A0]' },
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
                                    Why Choose Our MS Office Assignment Help Service?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    We offer the best MS Office assignment help for college students dealing with complex spreadsheets, documents, and presentations. Here is why students worldwide trust us to help them get better grades.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                {/* Hero Feature */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1F42] to-[#1652A0] p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                    <div className="relative z-10">
                                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-black mb-4">Plagiarism-Free Solutions and Free Originality Report</h3>
                                        <p className="text-gray-300 text-lg mb-6 leading-loose">
                                            We offer strict guarantees for original work on every project. You get <span className="text-white font-bold">custom files built completely from scratch</span>. Every order includes a <span className="text-white font-bold">free originality report</span> to prove your work is unique and safe to submit. We guarantee <span className="text-white font-bold">zero copied content</span> in your files.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {[
                                                { icon: CheckCircle2, color: 'text-green-300', title: 'Free Originality Report', sub: '0% plagiarism guaranteed' },
                                                { icon: Brain, color: 'text-purple-300', title: 'Zero AI Involvement', sub: '100% human written' },
                                                { icon: Ruler, color: 'text-yellow-300', title: 'Built From Scratch', sub: 'No recycled files' },
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
                                            <Trophy className="w-6 h-6" /> Your Files, Built to Work Perfectly
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Native English Experts</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        We hire experienced writers who know exactly how to use business software applications. They are experts in Excel, Word, and PowerPoint. They can easily handle complex office automation assignments so you get the best grades.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Advanced software knowledge', 'Excel, Word & PowerPoint experts', 'Office automation specialists', 'All Office 365 tools covered'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 3 */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-purple-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Zap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">On-Time Delivery Commitment</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        You will never miss a deadline again. We offer fast delivery options to help you avoid late penalties. Our cheap office 365 homework helpers online can finish your project quickly if you are in a rush.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Rush delivery available', 'Same-day turnaround', 'Late penalty protection', 'Guaranteed on-time delivery'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Rocket className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 4 */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-orange-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support and Direct Communication</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        Need MS Office assignment help right now? Our customer support team works around the clock. You can chat with your MS Office assignment helper online directly to share ideas and ask questions at any stage.
                                    </p>
                                    <ul className="space-y-3">
                                        {['24/7 customer support', 'Direct expert chat', 'Share your rubric & files', 'Instant responses'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Headphones className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 5 */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-red-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <RefreshCw className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Revisions Policy</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        Your happiness is our main goal. We offer a free revision period so your project turns out exactly as you want. We make sure your files work perfectly before you submit them.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Free revision window', 'Files tested before delivery', 'Formulas & links re-checked', 'Zero additional costs'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Edit3 className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 6 */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-indigo-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Lock className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Guaranteed</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        Your personal details are completely safe with us. We protect your academic data with strong encryption when you pay for MS Office assignment help in Canada, the UK, the US, or anywhere else.
                                    </p>
                                    <ul className="space-y-3">
                                        {['256-bit SSL encryption', 'Work never shared', 'Zero data sharing', 'GDPR compliant'].map((item, i) => (
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
                                    Get My MS Office Assignment Done Today <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── ASSIGNMENT SERVICES ───────────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                                    ASSIGNMENT HELP SERVICES WE OFFER
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                                    MS Office Assignment Help and Other Academic Services We Offer
                                </h2>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8]">
                                    At EssayEmbassy, we specialize in providing top-quality university Microsoft Office assignment help. Microsoft Office is an integrated suite of tools used to run a business office. These classes require you to master spreadsheets, documents, and presentations. When you find yourself thinking "I need to pay someone to do Microsoft Office assignment tasks," we are here for you. We offer the best MS Office assignment help for college students worldwide.
                                </p>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8] mt-4">
                                    Whether you need MS Office assignment help in the UK or Microsoft Office assignment help in Australia, our experts can assist. We provide the best MS Office assignment writing service to help you pass your classes. Our team handles everything from basic digital literacy assignments to complex Microsoft Office suite projects. We cover advanced Excel charts, Word formatting, and PowerPoint themes.
                                </p>
                            </div>
                            <MSOfficeServicesGrid />
                            <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Ready to Get Top Grades on Your MS Office Assignment?</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Every file is built by a verified Office expert with accurate formulas, clean formatting, and fully working output.
                                </p>
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                                >
                                    Order MS Office Assignment Help Now <ArrowRight className="w-5 h-5" />
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
                                    A straightforward four-step process designed to get your MS Office assignment completed and submitted on time. Get started in minutes.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                                {[
                                    {
                                        step: '1', icon: FileText,
                                        stepBg: 'bg-[#1652A0]', iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                                        badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]', checkColor: 'text-[#1652A0]',
                                        title: 'Submit Your Requirements',
                                        desc: 'Upload your instructions and tell us your deadline. Provide your grading rubric. Let us know if you need help with Microsoft suite integration project tasks and we will take it from there.',
                                        highlight: 'Takes 2 minutes',
                                        features: ['Secure file upload', 'Share your rubric', 'Set your deadline', 'Attach existing files'],
                                    },
                                    {
                                        step: '2', icon: Users,
                                        stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                                        badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                                        title: 'Get Matched with an Expert',
                                        desc: 'We match you with an expert who understands your exact software needs. Your helper will have the right background and practical experience to help you succeed in your Office 365 coursework.',
                                        highlight: 'Software-matched expert',
                                        features: ['Expert Office profiles', 'Tool-specific matching', 'Verified credentials', 'Choose your expert'],
                                    },
                                    {
                                        step: '3', icon: Monitor,
                                        stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                                        badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                                        title: 'Track Progress and Communicate',
                                        desc: 'Stay in touch with your expert throughout the process. You can monitor the progress of your integrated Office tasks and ask questions at any time to make sure your project meets every requirement.',
                                        highlight: 'Full transparency guaranteed',
                                        features: ['24/7 access', 'Live tracking', 'Direct expert chat', 'Monitor file progress'],
                                    },
                                    {
                                        step: '4', icon: Trophy,
                                        stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                                        badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                                        title: 'Download and Submit',
                                        desc: 'Receive your completed task by the deadline. Download your finished files and submit your assignment with total confidence. Every file is tested and ready to open.',
                                        highlight: 'On-time guarantee',
                                        features: ['Instant download', 'Free originality report', 'Free revisions', 'Submit with confidence'],
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
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Top Grades on Your MS Office Assignment?</h3>
                                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Your expertly built, submission-ready files are just one step away.</p>
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
                                        Affordable MS Office Assignment Help Pricing
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-loose">
                                        Our rates start at just $10.00 per task for basic college levels. Pricing updates in real time with no surprises, making professional Office homework help accessible for every student.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { icon: DollarSign, title: 'Starting at $10.00 per task', desc: 'Transparent pricing with zero hidden costs.' },
                                            { icon: FileCheck, title: 'No Hidden Fees', desc: 'Pay only for the work you need. Pricing updates in real time.' },
                                            { icon: Award, title: 'Free Features Included', desc: 'Free formatting, 24/7 support, and direct chat with every order.' },
                                            { icon: Shield, title: 'Satisfaction Promise', desc: 'Free revisions and a secure money-back guarantee to protect your funds.' },
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
                                    Commitments we stand behind with every MS Office assignment we deliver.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {[
                                    {
                                        icon: Trophy,
                                        title: 'Quality Commitment',
                                        description: 'Our experts create perfectly formatted files. We make sure your Excel formulas are completely accurate and your documents meet all formatting requirements.',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'On-Time Delivery',
                                        description: 'We always meet your deadlines so you can submit your assignment on time. Missing a submission window is never an option.',
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: 'Free Revisions',
                                        description: 'We revise your files for free until they match your exact needs. Formulas, layouts, slide designs, and database structures all adjusted at no extra cost.',
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
                                <h3 className="text-2xl font-bold mb-3">We Stand Behind Every MS Office Assignment We Deliver</h3>
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
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">What Students Say About Our MS Office Assignment Help</h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    Real reviews from verified students who improved their grades with our Microsoft Office assignment help.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'Lucas S.', tag: 'Verified', date: 'Oct 12, 2025', subject: 'Excel', rating: 5, text: 'I told them to do my Microsoft Office assignment for my accounting class. The Excel formulas were perfect. This is the best MS Office assignment writing service.' },

                                    { name: 'Fahid B.', tag: 'Returning Client', date: 'Nov 02, 2025', subject: 'PowerPoint', rating: 5, text: 'I needed university Microsoft Office assignment help for a big presentation. The slides were completely accurate and delivered early.' },

                                    { name: 'Johanna T.', tag: 'First-Time User', date: 'Nov 18, 2025', subject: 'Word', rating: 4.9, text: 'My expert provided amazing help with Microsoft suite integration project files. The formatting was excellent and totally original.' },

                                    { name: 'Ryan P.', tag: 'Returning Client', date: 'Dec 05, 2025', subject: 'Access', rating: 5, text: 'Long-time fan here. I use this MS Office assignment helper online often. The database files always work flawlessly.' },

                                    { name: 'Darious D.', tag: 'Verified', date: 'Jan 14, 2026', subject: 'Project Management', rating: 5, text: 'I had to pay someone to do Microsoft Office assignment tasks for my management class. The Gantt chart in Excel was deeply engaging and very professional.' },

                                    { name: 'Liam K.', tag: 'First-Time User', date: 'Feb 22, 2026', subject: 'Office 365', rating: 4.8, text: 'If you need cheap Office 365 homework helpers online, use this site. They used excellent logic and helped me meet a very tight deadline.' },
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
                                question="How much does MS Office assignment help cost?"
                                answer="Our pricing starts at $10.00 per task for high school and basic college levels. The final cost depends on your academic level, deadline, and the complexity of the files. Ordering early gets you the lowest price possible."
                            />
                            <FAQItem
                                question="Who can do my Microsoft Office assignment fast?"
                                answer="Our professional experts can handle urgent tasks easily. We can complete your order in just a few hours to help you avoid last-minute stress, whether your deadline is days away or just a few hours."
                            />
                            <FAQItem
                                question="How do your experts handle integrated MS Office projects?"
                                answer="Our experts are highly trained in using all the tools together. They know how to link Excel charts into Word documents or export data into PowerPoint presentations perfectly. They handle cross-application projects from start to finish."
                            />
                            <FAQItem
                                question="Is it safe to get Microsoft Office homework help online?"
                                answer="Yes. We keep your personal details completely private and never share them with third parties. We also use secure payment methods to protect your financial information. Our service is completely safe to use anywhere in the world."
                            />
                            <FAQItem
                                question="Can I get help with a university-level Office 365 assignment?"
                                answer="Absolutely. We provide excellent Microsoft Office homework help for all college and university levels. Our native English experts have advanced training in all Office applications. They can easily tackle the most complex software projects for higher education."
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
                                Stop stressing over your computer coursework. Let our professional experts handle your documents, spreadsheets, and presentations. Get reliable MS Office assignment help today.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                                <Link
                                    to="/order-now"
                                    className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                                >
                                    Start Your Assignment Now <ArrowRight className="w-5 h-5" />
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
                                    { icon: ShieldCheck, text: 'Plagiarism-Free Solutions' },
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