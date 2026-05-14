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
    BarChart2,
    Microscope,
    BookMarked,
    ListOrdered,
    Flag
} from 'lucide-react';
import ScrollableContentPanel from '../../components/Services/ScrollableContentPanel';
import { SERVICE_SEO_PLACEHOLDER_CARDS } from '../../components/Services/serviceSeoPlaceholderCards';

// â”€â”€â”€ FAQ Item â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Price Calculator (USD) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€


// â”€â”€â”€ Paper Sections Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ThesisSectionsGrid = () => {
    const sections = [
        {
            icon: BookMarked,
            title: 'Thesis Research Assistance',
            description: 'Gather credible, peer-reviewed sources and build a strong academic foundation for your topic.',
            features: ['Peer-reviewed sources', 'Topic-focused evidence', 'Research mapping', 'Strong academic base'],
            cta: 'Get Research Help',
            popular: true,
        },
        {
            icon: Target,
            title: 'Thesis Proposal Writing',
            description: 'Craft a persuasive and structured proposal to win approval from your academic committee.',
            features: ['Clear objectives', 'Method overview', 'Strong rationale', 'Approval-focused structure'],
            cta: 'Build Proposal',
            popular: true,
        },
        {
            icon: Microscope,
            title: 'Literature Review Writing',
            description: 'Critically analyze prior research and identify key gaps that justify your unique study.',
            features: ['Thematic synthesis', 'Gap identification', 'Critical analysis', 'Scholarly positioning'],
            cta: 'Write Literature Review',
            popular: false,
        },
        {
            icon: BarChart2,
            title: 'Data Analysis and Interpretation',
            description: 'From qualitative themes to advanced quantitative testing in SPSS or R, we handle complex methods precisely.',
            features: ['SPSS/R support', 'Method fit', 'Accurate interpretation', 'Clear findings'],
            cta: 'Analyze Data',
            popular: true,
        },
        {
            icon: FileText,
            title: 'Thesis Writing and Structuring',
            description: 'Get chapter-by-chapter custom thesis writing support across introduction, methodology, findings, and discussion.',
            features: ['Chapter flow', 'Logical structure', 'Argument coherence', 'Academic depth'],
            cta: 'Write My Thesis',
            popular: false,
        },
        {
            icon: Edit3,
            title: 'Thesis Editing and Proofreading',
            description: 'Polish existing drafts by fixing grammar, improving flow, and elevating academic tone.',
            features: ['Grammar correction', 'Flow refinement', 'Tone enhancement', 'Final polish'],
            cta: 'Polish My Draft',
            popular: false,
        },
        {
            icon: Flag,
            title: 'Thesis Conclusion',
            description: 'Synthesize findings and reconnect them to your core objectives for strong final impact.',
            features: ['Findings summary', 'Objective alignment', 'Strong closure', 'Future recommendations'],
            cta: 'Complete Conclusion',
            popular: false,
        },
        {
            icon: ListOrdered,
            title: 'Thesis Formatting',
            description: 'Meet strict university guidelines and citation rules including APA, MLA, Harvard, and Chicago.',
            features: ['Style compliance', 'Reference consistency', 'Layout checks', 'Submission-ready formatting'],
            cta: 'Format My Thesis',
            popular: false,
        },
        {
            icon: FileCheck,
            title: 'Final Review and Submission Check',
            description: 'Receive a meticulous final check so your thesis meets the highest academic standards before submission.',
            features: ['Final quality review', 'Citation validation', 'Checklist audit', 'Submission confidence'],
            cta: 'Run Final Review',
            popular: false,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
                <div
                    key={index}
                    className={`bg-white rounded-2xl p-6 border-2 ${section.popular ? 'border-[#1652A0] shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                >
                    {section.popular && (
                        <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> POPULAR
                        </div>
                    )}
                    <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
                        <section.icon className="w-8 h-8 text-[#1652A0]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1652A0] transition-colors leading-snug">{section.title}</h3>
                    <p className="text-gray-600 mb-6 leading-[1.7] text-[15px]">{section.description}</p>
                    <ul className="space-y-2.5 mb-6">
                        {section.features.map((f, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="font-medium">{f}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        to="/order-now"
                        className={`w-full px-4 py-3 ${section.popular ? 'bg-[#1652A0] text-white hover:bg-[#0B1F42]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg`}
                    >
                        {section.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ))}
        </div>
    );
};

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function ThesisWritingServices() {
    return (
        <>
            <Helmet>
                <title>Premium Thesis Writing Services | Expert PhD Writers & 100% Original Work</title>
                <meta name="description" content="Get top-tier thesis help from professional thesis writers. Our custom thesis writing services offer plagiarism-free, on-time delivery for every academic level." />
                <meta name="keywords" content="thesis writing services, thesis help, professional thesis writers, dissertation support, academic thesis assistance" />
            </Helmet>

            <div className="min-h-screen bg-white font-sans">

                {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                                    <span className="text-sm font-bold text-gray-700">Expert Thesis Writers</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-sm">
                                    <Clock className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-bold text-green-700">On-Time Delivery</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-[#0B1F42] mb-10 leading-[1.2] tracking-tight">
                                Professional Thesis Writing Services for Every Academic Level
                            </h1>

                            <p className="text-[20px] text-gray-600 mb-14 max-w-3xl mx-auto leading-[1.9] font-medium opacity-90">
                                Are you feeling overwhelmed by the demands of your degree and searching for reliable thesis writing services? You have come to the right place. Our premium online thesis writing services are designed to help you navigate the complexities of academic research, ensuring you submit a flawless, stress-free paper.
                            </p>

                            <p className="text-lg text-[#1652A0] font-bold mb-10">
                                Expert Writers, On-Time Delivery, 100% Original Work
                            </p>

                            {/* Value Props */}
                            <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
                                {[
                                    { icon: Shield, text: 'Plagiarism-Free Guarantee' },
                                    { icon: Award, text: 'Expert Thesis Writers' },
                                    { icon: RefreshCw, text: 'On-Time Delivery' },
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
                                    Start Your Thesis <ArrowRight className="w-5 h-5" />
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

                {/* â”€â”€ STATISTICS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <section className="py-16 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                                {[
                                    { value: '650,000+', label: 'Happy Students', color: 'text-[#1652A0]' },
                                    { value: '98%', label: 'On-Time Delivery Rate', color: 'text-[#1652A0]' },
                                    { value: '10+', label: 'Years of Academic Excellence', color: 'text-[#1652A0]' },
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

                {/* â”€â”€ WHY CHOOSE US â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                                    Why Students Choose Our Thesis Writing Service
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    We combine expert academic talent, strict originality standards, and dependable delivery to keep your thesis journey stress-free.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                {/* â”€â”€ Hero Feature â”€â”€ */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1F42] to-[#1652A0] p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                    <div className="relative z-10">
                                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-black mb-4">Plagiarism-Free Guarantee + Turnitin Report</h3>
                                        <p className="text-gray-300 text-lg mb-6 leading-loose">
                                            Every document is 100% human-written and created from scratch. We scan each thesis with trusted plagiarism and AI detection tools and provide an originality report upon request.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {[
                                                { icon: CheckCircle2, color: 'text-green-300', title: 'Human-Written Only', sub: 'No AI-generated text' },
                                                { icon: Brain, color: 'text-purple-300', title: 'Original Drafting', sub: 'Built from scratch' },
                                                { icon: FileCheck, color: 'text-yellow-300', title: 'Detection Scans', sub: 'Plagiarism and AI checks' },
                                                { icon: Lock, color: 'text-pink-300', title: 'Integrity Focused', sub: 'Academic-safe delivery' },
                                            ].map((item, i) => (
                                                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                                    <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                                                    <p className="font-bold text-lg">{item.title}</p>
                                                    <p className="text-gray-300 text-sm">{item.sub}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-green-500 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 font-bold text-lg shadow-xl">
                                            <Trophy className="w-6 h-6" /> 100% Original Thesis Delivery
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 â€” Qualified Writers */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualified Academic Writers</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        Your project is handled by verified experts with advanced degrees and proven experience in specialized academic fields.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Verified Master\'s and PhD writers', 'Field-specific expertise', 'Strict writer selection process', 'Proven thesis experience'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 3 â€” On-Time Delivery */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-purple-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Zap className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">On-Time Delivery Commitment</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        Whether your deadline is months away or just a few days out, we ensure punctual submissions so you never miss a due date.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Flexible timelines', 'Urgent thesis support', 'Strict deadline tracking', 'Always on-time handoff'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Rocket className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 4 â€” Support */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-orange-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support and Direct Communication</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        Enjoy direct, anonymous communication with your writer through our secure platform while our 24/7 team keeps you updated.
                                    </p>
                                    <ul className="space-y-3">
                                        {['24/7 customer support', 'Secure writer messaging', 'Real-time updates', 'Fast response times'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Headphones className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 5 â€” Free Revisions */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-red-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <RefreshCw className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Revisions Policy</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        We offer unlimited free revisions for 14 to 30 days after delivery so your thesis fully matches your expectations.
                                    </p>
                                    <ul className="space-y-3">
                                        {['Unlimited free edits', '14 to 30 day revision window', 'Satisfaction-first policy', 'No extra revision charges'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                                <Edit3 className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 6 â€” Privacy */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-indigo-500">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Lock className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Confidentiality</h3>
                                    <p className="text-gray-600 leading-loose mb-6">
                                        We use robust 256-bit SSL encryption and strict privacy policies so your personal data, payment details, and identity stay protected.
                                    </p>
                                    <ul className="space-y-3">
                                        {['256-bit SSL encryption', 'Confidential project handling', 'Protected personal data', 'No third-party sharing'].map((item, i) => (
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
                                    Start Your Thesis <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* â”€â”€ PAPER SECTIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                                    THESIS WRITING SERVICES TYPES WE COVER
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                                    Custom Support for Every Stage of Your Thesis Journey
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    Choose exactly the support you need, from proposal drafting to final submission checks, with full academic customization.
                                </p>
                            </div>

                            <ThesisSectionsGrid />

                            <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Need the Full Thesis Written?</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Every service is customizable so you can order complete thesis writing or only the sections where you need expert support.
                                </p>
                                <Link
                                    to="/order-now"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                                >
                                    Order Full Thesis Writing Help <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* â”€â”€ HOW IT WORKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <section className="py-24 bg-[#F8FAFC]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                                    HOW IT WORKS
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                                    Simple Process From Brief to Submission
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    Submit your requirements, get matched with a specialist, track progress, and download with full confidence.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                                {[
                                    {
                                        step: '1', icon: FileText,
                                        stepBg: 'bg-[#1652A0]', iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                                        badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]', checkColor: 'text-[#1652A0]',
                                        title: 'Submit Your Requirements',
                                        desc: 'Fill out our secure order form with thesis guidelines, topic, word count, deadline, and any grading rubric files.',
                                        highlight: 'Secure order form',
                                        features: ['Guidelines included', 'Topic clarity', 'Deadline setup', 'File attachments'],
                                    },
                                    {
                                        step: '2', icon: Users,
                                        stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                                        badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                                        title: 'Get Matched With an Expert',
                                        desc: 'We instantly match you with an experienced thesis writer in your exact academic field with relevant credentials.',
                                        highlight: 'Field-specific matching',
                                        features: ['Credentialed experts', 'Subject alignment', 'Advanced degrees', 'Thesis experience'],
                                    },
                                    {
                                        step: '3', icon: Rocket,
                                        stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                                        badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                                        title: 'Track Progress and Communicate',
                                        desc: 'Use your client area to track progress, request drafts, and communicate directly with your writer throughout the process.',
                                        highlight: 'Dedicated client area',
                                        features: ['Progress tracking', 'Draft requests', 'Secure messaging', 'Live updates'],
                                    },
                                    {
                                        step: '4', icon: Trophy,
                                        stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                                        badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                                        title: 'Download and Submit',
                                        desc: 'Review the completed thesis, request free revisions if needed, and download the final version for confident submission.',
                                        highlight: 'Submission-ready delivery',
                                        features: ['Final review', 'Free revisions', 'Secure download', 'Confident submission'],
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
                                                    {item.highlight}
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
                                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Submit your requirements in minutes and get matched with the right thesis specialist.</p>
                                <Link
                                    to="/order-now"
                                    className="px-10 py-4 bg-[#D4A853] text-[#0B1F42] font-bold text-lg rounded-xl hover:bg-[#C49843] transition-all shadow-md inline-flex items-center gap-3"
                                >
                                    Start Your Thesis <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* â”€â”€ PRICING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                                        Our Value Promise
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-loose">
                                        Transparent pricing means you always know the cost upfront, with free formatting elements and revision support included.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { icon: DollarSign, title: 'Transparent Pricing', desc: 'Know exactly what you are paying upfront.' },
                                            { icon: FileCheck, title: 'No Hidden Fees', desc: 'Title pages, bibliographies, and formatting are included for free.' },
                                            { icon: RefreshCw, title: 'Revisions Included', desc: 'Enjoy unlimited free edits to perfect your paper.' },
                                            { icon: Shield, title: 'Satisfaction Promise', desc: 'Backed by our reliable money-back guarantee.' },
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
                                    <UnifiedPriceCalculator />
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* â”€â”€ GUARANTEES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                                    Core protections and quality standards applied to every thesis project.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {[
                                    {
                                        icon: Trophy,
                                        title: 'Quality Commitment',
                                        description: 'Every thesis is checked for academic excellence, proper structure, and evidence-based argumentation.',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'On-Time Delivery',
                                        description: 'We maintain a strong track record of meeting tight deadlines without sacrificing quality.',
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: 'Free Revisions',
                                        description: 'Request amendments as needed, and we keep refining your thesis until it meets expectations.',
                                    },
                                    {
                                        icon: Lock,
                                        title: 'Privacy First',
                                        description: 'Your personal information and project details stay encrypted and fully secure.',
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
                                <h3 className="text-2xl font-bold mb-3">We Stand Behind Every Thesis We Deliver</h3>
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

                {/* â”€â”€ TESTIMONIALS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">What Our Clients Say</h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-[1.8]">
                                    Authentic reviews from verified students who achieved real academic results.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'J. Smith', tag: 'Returning Client', date: 'Feb 12, 2026', subject: 'Management', rating: 5, text: 'For my MBA program, I needed a detailed and professional thesis chapter. The writer assigned had a deep understanding of business strategies and delivered an insightful, well-researched analysis. Best thesis writing service I\'ve used!' },

                                    { name: 'A. Reynolds', tag: 'Verified', date: 'Feb 21, 2026', subject: 'Engineering', rating: 5, text: 'No AI garbage detected in my engineering work! The methodology was fully linked to the data and delivered well before my expected due date. Truly professional thesis writers.' },

                                    { name: 'T. Vance', tag: 'First-Time User', date: 'Jan 14, 2026', subject: 'Computer Science', rating: 5, text: 'I was skeptical about online thesis writing services, but my group project contribution looked fully original and meticulously coded. I didn\'t need to stress at all. Fantastic results.' },

                                    { name: 'M. O\'Connor', tag: 'Verified', date: 'Dec 11, 2025', subject: 'Economics', rating: 4.5, text: 'The assigned writer created a strong paper with a logical flow. I appreciated the quick direct communication and transparent pricing. Handled the statistical data perfectly.' },

                                    { name: 'L. Davis', tag: 'Returning Client', date: 'Jan 17, 2026', subject: 'Law', rating: 5, text: 'It is very organized, and I felt confident leaving my legal thesis to someone who knows exactly what they are doing. The citations were flawless and passed all plagiarism checks easily.' },

                                    { name: 'S. Chen', tag: 'Verified', date: 'Mar 4, 2026', subject: 'Science', rating: 5, text: 'I needed an expert in biology to analyze my lab data for my Master\'s thesis. Excellent work, incredibly fast delivery, and the free revisions polished it to absolute perfection. Will use this thesis help again.' },
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

                {/* â”€â”€ FAQ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                                question="What subjects do you cover?"
                                answer="We have verified experts across 80+ academic disciplines, including Management, Nursing, Law, Computer Science, Literature, and Engineering, so you get field-matched thesis support."
                            />
                            <FAQItem
                                question="How fast can you deliver?"
                                answer="Deadlines are flexible. Full theses require proper research time, but urgent support can be provided in as little as 3 to 4 hours for specific chapters or proposals."
                            />
                            <FAQItem
                                question="Is the work original?"
                                answer="Absolutely. Every thesis is 100% human-written from scratch. We enforce strict anti-plagiarism and anti-AI policies and verify each submission with trusted detection software."
                            />
                            <FAQItem
                                question="Can I communicate with the writer?"
                                answer="Yes. You can communicate through our secure chat platform to monitor progress, clarify instructions, and share feedback directly with your assigned writer."
                            />
                            <FAQItem
                                question="What if I'm not satisfied?"
                                answer="You can request unlimited free revisions within 14 to 30 days if your thesis does not match initial instructions. If concerns remain unresolved, our money-back guarantee applies."
                            />
                            <FAQItem
                                question="How does pricing work?"
                                answer="Pricing is calculated based on your academic level, page or word count, and deadline. Longer deadlines usually mean a lower per-page rate, and there are no hidden fees."
                            />
                            <FAQItem
                                question="Is my privacy protected?"
                                answer="Yes. We use bank-level 256-bit SSL encryption to protect browsing and payment activity. Your personal identity and payment details are never shared with unauthorized third parties."
                            />
                            <FAQItem
                                question="Do you handle urgent thesis assignments?"
                                answer="Yes. Our 24/7 support team and global writer network can quickly match you with an expert who can work fast and help you meet tight deadlines."
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

                {/* â”€â”€ FINAL CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <section className="py-24 bg-[#0B1F42]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                                Ready to Complete Your Degree with Confidence?
                            </h2>
                            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-loose">
                                Don't let a heavy workload stand between you and graduation. Join thousands of successful students who rely on our premium academic assistance.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                                <Link
                                    to="/order-now"
                                    className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                                >
                                    Start Your Thesis <ArrowRight className="w-5 h-5" />
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
                                    { icon: Lock, text: 'Confidential & Secure' },
                                    { icon: RefreshCw, text: 'Free Revisions Included' },
                                    { icon: Sparkles, text: '100% Plagiarism-Free Guarantee' },
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




