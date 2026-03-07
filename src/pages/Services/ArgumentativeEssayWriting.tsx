import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import UnifiedPriceCalculator from '../../components/Services/UnifiedPriceCalculator';
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
    BookOpen,
    Globe,
    PenTool,
    Lightbulb,
    BarChart2,
    Scale,
    Search,
    Layers
} from 'lucide-react';

// FAQ Item Component
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

// Service Types Grid
const ServiceTypesGrid = () => {
    const serviceTypes = [
        {
            title: 'Argumentative Essay Writing',
            icon: Target,
            description: 'Craft compelling arguments backed by solid evidence. We build persuasive essays with airtight logic, strong counterarguments, and authoritative sources.',
            features: ['Debatable thesis statements', 'Peer-reviewed evidence', 'Counterargument handling', 'Logical flow mastery'],
            popular: true,
            color: 'blue'
        },
        {
            title: 'Persuasive Essay Writing',
            icon: MessageCircle,
            description: 'Influence opinions with powerful rhetorical strategies. Our writers employ emotional and logical appeals to create essays that move readers to action.',
            features: ['Rhetorical persuasion', 'Emotional + logical appeals', 'Strong calls to action', 'Academic credibility'],
            popular: true,
            color: 'purple'
        },
        {
            title: 'Narrative Essay Writing',
            icon: BookOpen,
            description: 'Transform personal experiences into captivating academic stories with clear structure, vivid detail, and meaningful thematic connections.',
            features: ['Engaging storytelling', 'Vivid sensory details', 'Character development', 'Thematic depth'],
            popular: false,
            color: 'green'
        },
        {
            title: 'Analytical Essay Writing',
            icon: Brain,
            description: 'Dissect complex topics with scholarly precision. We break down literature, events, and concepts to reveal deeper meaning and critical insights.',
            features: ['Deep critical analysis', 'Multiple perspectives', 'Interpretation techniques', 'Scholarly precision'],
            popular: true,
            color: 'indigo'
        },
        {
            title: 'Compare & Contrast Essay',
            icon: Scale,
            description: 'Master the art of balanced comparison. We highlight meaningful similarities and differences with sophisticated organizational structures.',
            features: ['Balanced analysis', 'Block or point-by-point', 'Insightful synthesis', 'Clear transitions'],
            popular: false,
            color: 'teal'
        },
        {
            title: 'Cause & Effect Essay',
            icon: Layers,
            description: 'Explore the chain reactions behind events and phenomena. Our writers trace causal relationships with clarity and academic depth.',
            features: ['Causal chain analysis', 'Evidence-backed claims', 'Logical structuring', 'Real-world applications'],
            popular: false,
            color: 'orange'
        },
        {
            title: 'Admission Essay Writing',
            icon: Award,
            description: 'Get accepted with a personal statement that stands out. We craft authentic stories that showcase your strengths to admissions committees.',
            features: ['Personal branding', 'Authentic voice', 'Strategic positioning', 'Memorable narratives'],
            popular: true,
            color: 'red'
        },
        {
            title: 'Scholarship Essay Writing',
            icon: Trophy,
            description: 'Win funding with compelling scholarship essays designed to highlight your achievements, goals, and unique perspective.',
            features: ['Achievement showcase', 'Goal articulation', 'Competitive edge', 'Committee-focused'],
            popular: false,
            color: 'yellow'
        },
        {
            title: 'Essay Editing & Proofreading',
            icon: Edit3,
            description: 'Polish your existing work to perfection. Our editors refine grammar, strengthen arguments, and ensure flawless academic formatting.',
            features: ['Grammar & syntax', 'Argument strengthening', 'Citation formatting', 'Clarity improvements'],
            popular: false,
            color: 'pink'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTypes.map((type, index) => (
                <div
                    key={index}
                    className={`bg-white rounded-2xl p-6 border-2 ${type.popular ? 'border-[#1652A0] shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                >
                    {type.popular && (
                        <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> POPULAR
                        </div>
                    )}
                    <div className={`w-16 h-16 rounded-xl bg-${type.color}-50 flex items-center justify-center text-${type.color}-600 mb-5 group-hover:scale-110 group-hover:bg-${type.color}-100 transition-all`}>
                        <type.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1652A0] transition-colors leading-snug">{type.title}</h3>
                    <p className="text-gray-600 mb-6 leading-[1.7] text-[15px]">{type.description}</p>
                    <ul className="space-y-2.5 mb-6">
                        {type.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        to="/order-now"
                        className={`w-full px-4 py-3 ${type.popular ? 'bg-[#1652A0] text-white hover:bg-[#0B1F42]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg`}
                    >
                        Order Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ))}
        </div>
    );
};


// Main Component
export default function ArgumentativeEssayWriting() {
    return (
        <>
            <Helmet>
                <title>Professional Argumentative Essay Writing Service | Top Grades Guaranteed</title>
                <meta name="description" content="Looking for a reliable argumentative essay writing service? Hire expert argumentative essay writers for 100% original, on-time, and affordable academic papers." />
                <meta name="keywords" content="argumentative essay writing service, argumentative essay help, buy argumentative essay, write argumentative essay for me, argumentative essay writer" />
            </Helmet>

            <div className="min-h-screen bg-white font-sans">
                {/* ── HERO SECTION ─────────────────────────────────────────── */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gray-50 overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-10">
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

                                {/* Headline */}
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1F42] mb-10 leading-[1.2] tracking-tight">
                                    Professional Argumentative <br />
                                    <span className="text-[#1652A0] block mt-4">Essay Writing Service</span>
                                </h1>

                                {/* Subheadline */}
                                <p className="text-[20px] text-gray-600 mb-14 max-w-3xl mx-auto leading-[1.9] font-medium opacity-90">
                                    Expert Writers, Original Work, On-Time Delivery – Perfect Essays Every Time. Hire qualified argumentative essay writers starting at just <span className="text-[#1652A0] font-bold">$10.80/page</span>.
                                </p>

                                {/* Value Props */}
                                <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
                                    {[
                                        { icon: Shield, text: 'Strict Copyright Safety' },
                                        { icon: Award, text: 'Expert Researchers' },
                                        { icon: RefreshCw, text: 'Client-focused Revisions' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                                            <item.icon className="w-4 h-4 text-[#1652A0]" />
                                            <span className="font-semibold">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTAs */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        to="/order-now"
                                        className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                                    >
                                        Start Your Argumentative Essay <ArrowRight className="w-5 h-5" />
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
                    </div>
                </section>

                {/* ── STATISTICS BAR ──────────────────────────────────────── */}
                <section className="py-16 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                                {[
                                    { value: '100k+', label: 'Happy Students', color: 'text-[#1652A0]' },
                                    { value: '99%', label: 'On-Time Delivery', color: 'text-[#1652A0]' },
                                    { value: '5+', label: 'Years of Experience', color: 'text-[#1652A0]' },
                                    { value: '4.9/5', label: 'Average Rating', color: 'text-[#D4A853]' }
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

                {/* ── WHY CHOOSE US ───────────────────────────────────────── */}
                <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1652A0] via-transparent to-transparent"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-7xl mx-auto">
                            {/* Section Header */}
                            <div className="text-center mb-16">
                                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    WHY CHOOSE US
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                                    What Sets Our Argumentative Essay Service Apart
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8] text-center">
                                    We focus on <span className="text-[#1652A0] font-medium">quality, reliability, and transparency</span> — the fundamentals that matter to every student.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Feature 1 - HERO FEATURE */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1F42] to-[#1652A0] p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                    <div className="relative z-10">
                                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-black mb-4">Plagiarism-Free Guarantee + Turnitin Report</h3>
                                        <p className="text-gray-300 text-lg mb-6 leading-[1.8]">
                                            We guarantee 100% original work with zero AI involvement. Every paper is crafted from scratch and includes a <span className="text-white font-bold">FREE originality report</span> to ensure it passes all plagiarism checks.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                                <CheckCircle2 className="w-6 h-6 text-green-300 mb-2" />
                                                <p className="font-bold text-lg">Free Turnitin Report</p>
                                                <p className="text-gray-300 text-sm">Proves 0% plagiarism</p>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                                <Brain className="w-6 h-6 text-purple-300 mb-2" />
                                                <p className="font-bold text-lg">100% Human Written</p>
                                                <p className="text-gray-300 text-sm">Zero AI content</p>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                                <FileCheck className="w-6 h-6 text-yellow-300 mb-2" />
                                                <p className="font-bold text-lg">Original Research</p>
                                                <p className="text-gray-300 text-sm">Fresh sources only</p>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                                <Lock className="w-6 h-6 text-pink-300 mb-2" />
                                                <p className="font-bold text-lg">Ownership Rights</p>
                                                <p className="text-gray-300 text-sm">It's yours forever</p>
                                            </div>
                                        </div>
                                        <div className="bg-green-500 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 font-bold text-lg shadow-xl">
                                            <Trophy className="w-6 h-6" />
                                            Your Work, Your Success
                                        </div>
                                    </div>
                                </div>

                                {/* Feature 2 - Qualified Writers */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualified Academic Writers</h3>
                                    <p className="text-gray-600 leading-[1.8] mb-6">
                                        Work with top-tier experts holding <span className="text-[#1652A0] font-medium">Master's and PhD degrees</span>. Our rigorous hiring process ensures your argumentative essay writer has deep subject expertise.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Verified PhD & Master\'s degrees', 'Years of academic writing experience', 'Deep subject matter expertise', 'Native English speakers'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Feature 3 - On-Time Delivery */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-purple-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Zap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">On-Time Delivery Commitment</h3>
                                    <p className="text-gray-600 leading-[1.8] mb-6">
                                        Never miss a due date again. We guarantee punctual delivery for every order, offering <span className="text-[#1652A0] font-medium">urgent argumentative essay help</span> in as little as 3 to 6 hours.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Urgent orders (3-6 hours)', 'Real-time progress tracking', 'Proactive delivery updates', '99% on-time guarantee'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Rocket className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Feature 4 - Responsive Support */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-orange-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support & Direct Communication</h3>
                                    <p className="text-gray-600 leading-[1.8] mb-6">
                                        Enjoy <span className="text-orange-600 font-bold">24/7 friendly customer support</span> and use our secure dashboard to communicate directly with your assigned writer.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Instant chat response', 'Direct writer communication', 'Share ideas & track progress', 'Personal account manager'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Headphones className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Feature 5 - Free Revisions */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-red-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <RefreshCw className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Revisions Policy</h3>
                                    <p className="text-gray-600 leading-[1.8] mb-6">
                                        Your satisfaction is our priority. We offer <span className="text-[#1652A0] font-medium">unlimited free revisions for up to 30 days</span> to ensure your thesis, arguments, and formatting meet your exact expectations.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Unlimited revisions (30 days)', 'Same writer guarantee', 'Zero additional charges', 'Fast revision turnaround'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Edit3 className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Feature 6 - Privacy */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-indigo-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Lock className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Confidentiality Guaranteed</h3>
                                    <p className="text-gray-600 leading-[1.8] mb-6">
                                        Your personal information is safeguarded with robust <span className="text-[#1652A0] font-medium">256-bit SSL encryption</span>. Order details are kept strictly confidential.
                                    </p>
                                    <ul className="space-y-3">
                                        {['256-bit SSL encryption', 'Anonymous payments', 'Zero chance of discovery', 'GDPR & Data Protection compliant'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Shield className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-16 text-center">
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg"
                                >
                                    Start Your Argumentative Essay Today <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SERVICES WE OFFER ───────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-7xl mx-auto">
                            {/* Section Header */}
                            <div className="text-center mb-10">
                                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                                    OUR WRITING SERVICES
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                                    Argumentative Essay Writing Service & Core Writing Services
                                </h2>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-[1.8]">
                                    At EssayEmbassy, we specialize in providing a top-quality <span className="text-[#1652A0] font-medium">argumentative essay writing service</span>. Our expert writers ensure your essays are well-researched, structured, and persuasive, helping you craft compelling arguments for any academic level. Whether you need to defend a controversial topic or simply want to buy argumentative essay assignments to free up your schedule, we deliver highly customized academic excellence.
                                </p>
                            </div>

                            <ServiceTypesGrid />

                            {/* Bottom Section */}
                            <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Each service is customized to fit your academic needs</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-[1.8]">
                                    Providing a structured, compelling, and original essay that meets the highest standards — every single time.
                                </p>
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                                >
                                    Request a Custom Essay <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ────────────────────────────────────────── */}
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
                                    A straightforward process designed for busy students. <span className="text-[#1652A0] font-medium">Get started in minutes</span>.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                                {[
                                    {
                                        step: '1', icon: FileText,
                                        title: 'Submit Your Requirements',
                                        desc: 'Share your essay guidelines, topic, academic level, and any specific instructions or rubrics through our simple order form.',
                                        highlight: 'Takes just 2 minutes',
                                        stepBg: 'bg-[#1652A0]', iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                                        badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]', checkColor: 'text-[#1652A0]',
                                        features: ['Easy order form', 'Upload rubric', 'Set deadline', 'Choose level']
                                    },
                                    {
                                        step: '2', icon: Users,
                                        title: 'Get Matched with an Expert',
                                        desc: 'We connect you with an expert writer who specializes in your subject and has the right background to build strong arguments.',
                                        highlight: 'You choose your writer',
                                        stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                                        badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                                        features: ['Expert profiles', 'Check ratings', 'View samples', 'Subject match']
                                    },
                                    {
                                        step: '3', icon: Rocket,
                                        title: 'Track Progress / Communicate',
                                        desc: 'Stay updated and communicate directly with your writer throughout the process to add materials or ask questions.',
                                        highlight: 'Direct writer communication',
                                        stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                                        badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                                        features: ['Live chat', 'Progress updates', 'File exchange', 'Full control']
                                    },
                                    {
                                        step: '4', icon: Trophy,
                                        title: 'Download & Submit',
                                        desc: 'Once completed, download your essay. Review the work, request free revisions if needed, and submit it with confidence.',
                                        highlight: 'Free plagiarism report included',
                                        stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                                        badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                                        features: ['Download essay', 'Plagiarism report', 'Free revisions', 'Submit & succeed']
                                    }
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
                                                <p className="text-gray-600 leading-[1.8] mb-4">{item.desc}</p>
                                                <div className={`inline-block ${item.badgeBg} ${item.badgeText} px-4 py-2 rounded-lg text-sm font-semibold mb-4`}>
                                                    ✓ {item.highlight}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {item.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-center text-sm text-gray-600">
                                                            <CheckCircle className={`w-4 h-4 ${item.checkColor} mr-2`} /> {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="text-center bg-[#0B1F42] rounded-2xl p-10">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h3>
                                <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-[1.8]">
                                    Take the first step toward your next top-grade argumentative essay.
                                </p>
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

                {/* ── PRICING SECTION ─────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                {/* Left Content */}
                                <div>
                                    <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                        TRANSPARENT PRICING
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                                        Get Your Exact Estimate in Seconds
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-[1.8]">
                                        No surprises. No hidden fees. Just honest, <span className="text-[#1652A0] font-medium">student-friendly pricing</span> aligned with the quality of work.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { icon: DollarSign, title: 'Starting at $10.80/page', desc: 'Transparent rates without sacrificing quality' },
                                            { icon: Zap, title: 'No Hidden Fees', desc: 'Pay only for the content you need' },
                                            { icon: FileCheck, title: 'Free Features Included', desc: 'Title page, formatting, bibliography, and outline at no extra cost' },
                                            { icon: Shield, title: 'Satisfaction Promise', desc: 'Backed by unlimited revisions and a money-back guarantee' }
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
                                {/* Right - Calculator */}
                                <div>
                                    <UnifiedPriceCalculator />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── GUARANTEES SECTION ───────────────────────────────────── */}
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
                                    Commitments we take seriously with every argumentative essay we deliver — no exceptions.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                                {[
                                    { icon: Trophy, title: 'Quality Commitment', description: 'Every paper is written to top academic standards with rigorous proofreading, formatting, and verified scholarly sources.' },
                                    { icon: Clock, title: 'On-Time Delivery', description: 'Whether your deadline is 14 days or 3 hours away, your paper will arrive in your inbox exactly when you need it.' },
                                    { icon: RefreshCw, title: 'Free Revisions', description: 'We refine and edit your essay for free until it aligns perfectly with your vision and grading rubric.' },
                                    { icon: Lock, title: 'Privacy First', description: 'Strict confidentiality policies ensure your data is never shared with third parties or even the writers handling your project.' }
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
                        </div>
                    </div>
                </section>

                {/* ── TESTIMONIALS ────────────────────────────────────────── */}
                <section className="py-24 bg-[#F8FAFC]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.12) 0%, rgba(212, 168, 83, 0.06) 100%)', border: '1px solid rgba(212, 168, 83, 0.3)', color: '#D4A853' }}>
                                    <Star className="w-4 h-4" /> CLIENT REVIEWS
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">What Our Clients Say</h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    Authentic reviews from verified students who achieved real academic results.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: "Lucas S.", tag: "Verified", date: "Oct 12, 2025", subject: "Management", rating: 5, text: "For my MBA program, I needed a detailed case study analysis. The writer had a deep understanding of business strategies. Their professionalism and quality of work are worth the money spent!" },
                                    { name: "Fahid B.", tag: "Returning Client", date: "Nov 02, 2025", subject: "Engineering", rating: 5, text: "On point and delivered before the expected due date. Absolutely no AI garbage detected in my engineering work. This argumentative essay writing service is top-tier." },
                                    { name: "Johanna T.", tag: "First-Time User", date: "Nov 18, 2025", subject: "Computer Science", rating: 5, text: "I was stuck on a complex internet-of-things paper. My writer used amazing logic and coding context. I will definitely be using this argumentative essay help again!" },
                                    { name: "Ryan P.", tag: "Returning Client", date: "Dec 05, 2025", subject: "Economics", rating: 5, text: "Long-time fan here. I buy argumentative essay assignments every month to get the time I need. They always nail the economic models and statistical reasoning." },
                                    { name: "Darious D.", tag: "Verified", date: "Jan 14, 2026", subject: "Law", rating: 5, text: "I needed someone to write an essay on corporate ethics. The legal precedents used were spot-on. I highly recommend them if you ever think, 'I need someone to write argumentative essay for me'." },
                                    { name: "Liam K.", tag: "First-Time User", date: "Feb 22, 2026", subject: "Science", rating: 5, text: "Perfect thesis, counterarguments, and academic sources! The environmental science evidence was flawless and well-cited." }
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
                                            <div className="flex gap-0.5">
                                                {[...Array(review.rating)].map((_, idx) => (
                                                    <Star key={idx} className="w-3.5 h-3.5 text-[#D4A853] fill-[#D4A853]" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 leading-[1.8] text-[14px]">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 text-center">
                                <Link to="/reviews" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1F42] hover:bg-[#1652A0] text-white font-bold rounded-xl transition-all shadow-md">
                                    See All Reviews <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FAQ ──────────────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-16">
                            <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-6">
                                FREQUENTLY ASKED QUESTIONS
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Common Questions Answered</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                Clear, honest answers to help you make an informed decision.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <FAQItem question="What essay types do you cover?" answer="We cover over 50+ disciplines and assignment types, including argumentative, persuasive, analytical, admission essays, research papers, and case studies across subjects like Business, Law, Science, Nursing, and Literature." />
                            <FAQItem question="How fast can you deliver?" answer="Our fastest turnaround time is 3 hours for urgent assignments. However, to secure the best price, we recommend placing your order with a deadline of 24 hours or more." />
                            <FAQItem question="Is the work original?" answer="Yes. Every essay is written entirely from scratch without the use of AI. We run every document through advanced plagiarism checkers and provide a free originality report." />
                            <FAQItem question="Can I communicate with the writer?" answer="Absolutely. Once you place an order, you can use your secure client dashboard to chat directly with your assigned writer, share extra files, or clarify instructions." />
                            <FAQItem question="What if I'm not satisfied?" answer="We offer a 100% happiness guarantee. You can request unlimited free revisions within 30 days of delivery. If the paper still doesn't meet your initial instructions, you are protected by our money-back guarantee." />
                            <FAQItem question="How does pricing work?" answer="Our pricing is transparent and highly affordable, starting from $10.80 per page. The final price is determined by your academic level, the number of pages, and your deadline. There are never any hidden charges." />
                            <FAQItem question="Is my information secure?" answer="Yes. We utilize secure payment gateways and 256-bit SSL encryption to protect your financial and personal data. Your identity is kept completely anonymous." />
                            <FAQItem question="Do you handle urgent essay assignments?" answer="Yes! Our experts thrive under pressure and can successfully deliver well-researched, submission-ready essays in as little as 3 to 6 hours." />
                        </div>

                        {/* Bottom Support Section */}
                        <div className="mt-12 bg-[#1652A0] rounded-2xl p-10 text-white text-center">
                            <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
                            <p className="text-gray-200 mb-6">Our support team is happy to help you.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1652A0] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-md">
                                    <Headphones className="w-5 h-5" /> Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FINAL CTA ───────────────────────────────────────────── */}
                <section className="py-24 bg-[#0B1F42]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-[1.2] tracking-tight">
                                Ready to Secure Top Grades <br />
                                <span className="text-[#D4A853] block mt-4">with an Expert?</span>
                            </h2>

                            <p className="text-[20px] text-gray-400 mb-12 max-w-3xl mx-auto leading-[1.9] font-medium">
                                Stop stressing over your assignments. Let our professional writers craft a highly persuasive, perfectly formatted essay tailored to your exact prompt.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                                <Link to="/order-now" className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3">
                                    Start Your Argumentative Essay <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/samples" className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all border border-white/20 inline-flex items-center gap-3">
                                    <FileCheck className="w-5 h-5" /> Browse Samples
                                </Link>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                                {[
                                    { icon: ShieldCheck, text: 'Plagiarism-Free Guarantee' },
                                    { icon: RefreshCw, text: 'Revisions Included' },
                                    { icon: Lock, text: '100% Confidential' }
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
