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
  Minus,
  Plus
} from 'lucide-react';

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
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

// â”€â”€â”€ Price Calculator (USD) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PriceCalculator = () => {
  const [academicLevel, setAcademicLevel] = useState<'highschool' | 'undergraduate' | 'masters' | 'phd'>('undergraduate');
  const [pages, setPages] = useState(1);
  const [deadline, setDeadline] = useState<'3hours' | '6hours' | '12hours' | '24hours' | '3days' | '7days' | '14days' | '30days'>('7days');

  const baseRates = {
    highschool: 10,
    undergraduate: 12,
    masters: 16,
    phd: 20,
  };
  const deadlineMultipliers = {
    '3hours': 2.2,
    '6hours': 1.9,
    '12hours': 1.6,
    '24hours': 1.4,
    '3days': 1.2,
    '7days': 1.0,
    '14days': 0.9,
    '30days': 0.85,
  };

  const calculatePrice = () => {
    const base = baseRates[academicLevel] || 12;
    const mult = deadlineMultipliers[deadline] || 1.0;
    return Math.round(base * pages * mult);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Get a Free Instant Quote</h3>
        <p className="text-gray-600 text-sm">Expert help starting at just $10/page â€” no hidden fees.</p>
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
            onChange={(e) => setAcademicLevel(e.target.value as typeof academicLevel)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50"
          >
            <option value="highschool">High School</option>
            <option value="undergraduate">Undergraduate (Bachelor's)</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD / Doctoral</option>
          </select>
        </div>

        {/* Pages â€” stepper */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1652A0]" />
              Number of Pages
            </span>
            <span className="text-[#1652A0] font-bold">{pages} {pages === 1 ? 'page' : 'pages'} / {pages * 250} words</span>
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPages(Math.max(1, pages - 1))}
              className="w-11 h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1652A0] hover:text-[#1652A0] transition-all font-bold"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center">
              <span className="text-3xl font-black text-[#0B1F42]">{pages}</span>
            </div>
            <button
              onClick={() => setPages(Math.min(50, pages + 1))}
              className="w-11 h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1652A0] hover:text-[#1652A0] transition-all font-bold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <input
            type="range" min="1" max="50" value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1652A0] mt-3"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1652A0]" />
            Deadline
          </label>
          <select
            value={deadline}
            onChange={(e) => setDeadline(e.target.value as typeof deadline)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50"
          >
            <option value="3hours">3 Hours (Super Urgent)</option>
            <option value="6hours">6 Hours (Urgent)</option>
            <option value="12hours">12 Hours</option>
            <option value="24hours">24 Hours</option>
            <option value="3days">3 Days</option>
            <option value="7days">7 Days (Standard)</option>
            <option value="14days">14 Days</option>
            <option value="30days">30 Days (Relaxed)</option>
          </select>
        </div>

        {/* Price Display */}
        <div className="bg-[#0B1F42]/5 rounded-2xl p-6 border border-[#0B1F42]/10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[#0B1F42] text-sm font-semibold mb-1 leading-relaxed">Estimated Total:</p>
              <p className="text-4xl font-black text-[#0B1F42]">${calculatePrice()}</p>
            </div>
            <div className="text-right bg-white rounded-lg px-3 py-2 border border-[#0B1F42]/10">
              <p className="text-xs text-gray-500 font-medium">Per Page</p>
              <p className="text-xl font-bold text-gray-900">${Math.round(calculatePrice() / pages)}</p>
            </div>
          </div>
          <Link
            to="/order-now"
            className="w-full px-6 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Get Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-gray-600">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Plagiarism Report</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free AI-Detection Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// â”€â”€â”€ Homework Types Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const HomeworkTypesGrid = () => {
  const types = [
    {
      emoji: 'ï¿½',
      title: 'Homework Help Management',
      description: 'MBA-level analysis and corporate financial reporting with real-world strategic application.',
      features: ['GAAP-compliant accounting solutions', 'Macroeconomics and trade policy', 'Strategic business analysis', 'Data-driven results'],
      cta: 'Get Management Help',
      popular: true,
      color: 'blue',
      link: '/assignment-help/management',
    },
    {
      emoji: 'âš™ï¸',
      title: 'Homework Help Engineering',
      description: 'Specialized support for Civil, Mechanical, and Electrical engineering technical problem sets.',
      features: ['Technical diagrams & CAD', 'Complex equation solving', 'Lab documentation support', 'System design analysis'],
      cta: 'Get Engineering Help',
      popular: true,
      color: 'purple',
      link: '/assignment-help/engineering',
    },
    {
      emoji: 'ðŸ”¬',
      title: 'Homework Help Science',
      description: 'Step-by-step solutions for Biology, Chemistry, and Physics with verified methodology.',
      features: ['Accurate data interpretation', 'Biochemical pathway analysis', 'Nuclear physics problem sets', 'Certified lab procedures'],
      cta: 'Get Science Help',
      popular: false,
      color: 'green',
      link: '/assignment-help/science',
    },
    {
      emoji: 'ðŸ’»',
      title: 'Homework Help Programming',
      description: 'Bug-free code in Python, Java, C++, and Web Dev with full logical documentation.',
      features: ['Clean, runnable code', 'Full logical flowcharts', 'Database normalization', 'Debugging & optimization'],
      cta: 'Get Coding Help',
      popular: true,
      color: 'red',
      link: '/assignment-help/computer',
    },
    {
      emoji: 'ï¿½',
      title: 'Homework Help Math',
      description: 'Calculus, Statistics, and Linear Algebra solutions with crystal-clear working steps.',
      features: ['Step-by-step derivations', 'Statistical data distribution', 'Multivariable calculus', 'Expert-verified proofs'],
      cta: 'Get Math Help',
      popular: false,
      color: 'orange',
      link: '/assignment-help/math',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {types.map((type, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-6 border-2 ${type.popular ? 'border-[#1652A0] shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
        >
          {type.popular && (
            <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> POPULAR
            </div>
          )}
          <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-all text-3xl">
            {type.emoji}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1652A0] transition-colors">{type.title}</h3>
          <p className="text-gray-600 mb-5 leading-relaxed text-sm">{type.description}</p>
          <ul className="space-y-2.5 mb-6">
            {type.features.map((f, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            to={type.link || "/order-now"}
            className="w-full px-4 py-3 bg-[#1652A0]/10 text-[#1652A0] hover:bg-[#1652A0] hover:text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            {type.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  );
};

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function HomeworkHelp() {
  return (
    <>
      <Helmet>
        <title>Professional Homework Help | Expert Writers | EssayEmbassy.com</title>
        <meta name="description" content="Get 100% original, human-written homework help from verified academic experts. Starting at $10/page. 3-hour turnaround. Trusted by 500+ students. Free plagiarism & AI-detection report included." />
        <meta name="keywords" content="homework help, do my homework, online homework help, homework writing service, pay for homework help, college homework help, urgent homework help" />
      </Helmet>

      <div className="min-h-screen bg-white font-sans">

        {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-[#1652A0]" />
                    <span className="text-sm font-bold text-gray-700">100% Original Work (No AI)</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                    <GraduationCap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-bold text-gray-700">Verified Expert Writers</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-green-700">On-Time Delivery (3-Hour Turnaround)</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1F42] mb-6 leading-tight">
                  Professional Homework Help <br />
                  <span className="text-[#1652A0]">for Every Subject</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-loose font-medium">
                  Get on-time, 100% original, human-written solutions from verified academic experts starting at just <span className="text-[#1652A0] font-bold">$10/page</span>. We bridge the gap between classroom confusion and academic clarity by delivering custom-engineered solutions tailored perfectly to your rubric.
                </p>

                {/* Inline value props */}
                <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
                  {[
                    { icon: Shield, text: 'Free AI-Detection Report' },
                    { icon: Award, text: 'Verified Expert Network' },
                    { icon: RefreshCw, text: 'Unlimited Free Revisions' },
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
                    Start Your Project <ArrowRight className="w-5 h-5" />
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

        {/* â”€â”€ STATISTICS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                {[
                  { value: '500+', label: 'Happy Students', color: 'text-[#1652A0]' },
                  { value: '99%', label: 'On-Time Delivery', color: 'text-[#1652A0]' },
                  { value: '5+', label: 'Years Experience', color: 'text-[#1652A0]' },
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
                  What Sets Our Service Apart
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-loose text-center">
                  We focus on <span className="text-[#1652A0] font-medium">quality, speed, and total academic integrity</span> â€” the fundamentals every student deserves.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* â”€â”€ Hero Feature Card â”€â”€ */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1F42] to-[#1652A0] p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 leading-tight">100% Originality & Plagiarism-Free Guarantee</h3>
                    <p className="text-gray-300 text-lg mb-6 leading-loose">
                      Every paper is drafted from scratch by a subject expert, guaranteeing <span className="text-white font-bold">zero AI involvement</span>. We include a Free Plagiarism & AI-Detection Report with every order to give you total peace of mind regarding your academic integrity.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { icon: CheckCircle2, color: 'text-green-300', title: 'Free Turnitin Report', sub: 'Proves 0% plagiarism' },
                        { icon: Brain, color: 'text-purple-300', title: 'Free AI-Detection', sub: 'Zero AI content' },
                        { icon: FileCheck, color: 'text-yellow-300', title: 'Scratch-Written', sub: 'No templates ever' },
                        { icon: Lock, color: 'text-pink-300', title: 'Full Ownership Rights', sub: 'Yours forever' },
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

                {/* Card 2 â€” Qualified Writers */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualified Academic Writers</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    You are never paired with a generalist. Our network features <span className="text-[#1652A0] font-medium">verified academic specialists</span> holding advanced degrees (Master's and PhDs) in your specific field of study.
                  </p>
                  <ul className="space-y-3 leading-loose">
                    {['Verified PhD & Master\'s holders', 'Matched to your exact subject', 'Published academic authors', 'Average 8+ years experience'].map((item, i) => (
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
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Deadlines are the primary source of academic stress, which is why our infrastructure is optimized for a critical <span className="text-[#1652A0] font-medium">3-hour window</span>. We specialize in urgent requests without ever sacrificing depth or quality.
                  </p>
                  <ul className="space-y-3 leading-loose">
                    {['3-hour urgent delivery', 'Real-time progress tracking', 'Proactive status updates', 'On-time, every time'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Rocket className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 4 â€” Responsive Support */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-orange-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support & Direct Communication</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We offer a <span className="text-orange-600 font-bold">24/7 global network</span> of support. You can chat directly with your helper to ensure every specific instruction is met and receive real-time tracking updates.
                  </p>
                  <ul className="space-y-3 leading-loose">
                    {['24/7 global support network', 'Direct expert chat access', 'Real-time progress updates', 'Personal account manager'].map((item, i) => (
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
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We value your grade and satisfaction. If you need modifications, we offer an <span className="text-[#1652A0] font-medium">unlimited free revision policy</span> to ensure the final product aligns perfectly with your expectations.
                  </p>
                  <ul className="space-y-3">
                    {['Unlimited revisions (14 days)', 'Same expert handles edits', 'Zero additional charges', 'Fast turnaround on edits'].map((item, i) => (
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
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Your digital privacy is paramount. We use <span className="text-[#1652A0] font-medium">bank-grade SSL encryption</span> for all payments, maintain strict non-disclosure policies, and ensure your uploaded documents remain 100% private and secure.
                  </p>
                  <ul className="space-y-3">
                    {['Bank-grade SSL encryption', 'Strict NDA & non-disclosure', 'Zero data-retention policy', 'Documents stay 100% private'].map((item, i) => (
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

        {/* â”€â”€ HOMEWORK TYPES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                  HOMEWORK TYPES WE COVER
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  Expertise Across Every Subject
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Whether you need help with a technical lab or a humanities course, our homework writing service covers it all with <span className="text-[#1652A0] font-medium">academic precision</span>.
                </p>
              </div>

              <HomeworkTypesGrid />

              <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Don't See Your Subject?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We have specialized experts across more than 150 disciplines. Reach out and we'll match you with the right expert instantly.
                </p>
                <Link
                  to="/order-now"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                >
                  Request Custom Homework Help <ArrowRight className="w-5 h-5" />
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
                  Simple Process, Quality Results
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-loose">
                  Getting professional homework help has never been easier. Just follow these <span className="text-[#1652A0] font-medium">4 simple steps</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    step: '1', icon: FileText,
                    stepBg: 'bg-[#1652A0]', iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                    badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]', checkColor: 'text-[#1652A0]',
                    title: 'Submit Your Requirements',
                    desc: 'Simply tell us "do my homework" and share your prompt, deadline, formatting rules, and any attached files. Our secure form takes under 2 minutes.',
                    highlight: 'Takes just 2 minutes',
                    features: ['Secure order form', 'Upload any files', 'Set your deadline', 'Specify your rubric'],
                  },
                  {
                    step: '2', icon: Users,
                    stepBg: 'bg-[#0B1F42]', iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                    badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]', checkColor: 'text-[#0B1F42]',
                    title: 'Get Matched With an Expert',
                    desc: 'Our system evaluates your requirements and matches you with a verified subject-matter expert in seconds â€” always a specialist, never a generalist.',
                    highlight: 'Subject-matched in seconds',
                    features: ['See expert profiles', 'Check ratings', 'View sample work', 'Confirm your match'],
                  },
                  {
                    step: '3', icon: Rocket,
                    stepBg: 'bg-[#10B981]', iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                    badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]', checkColor: 'text-[#10B981]',
                    title: 'Track Progress & Communicate',
                    desc: 'Chat directly with your helper to ensure every instruction is understood. Track the progress in real-time via your personal dashboard.',
                    highlight: 'Real-time progress tracking',
                    features: ['Live dashboard', 'Direct expert chat', 'Send extra notes', 'Full transparency'],
                  },
                  {
                    step: '4', icon: Trophy,
                    stepBg: 'bg-[#D4A853]', iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                    badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]', checkColor: 'text-[#D4A853]',
                    title: 'Download & Submit',
                    desc: 'Receive your polished, human-written solution well before the deadline. Request any free edits needed, then submit with total confidence.',
                    highlight: 'Free plagiarism + AI report included',
                    features: ['Download solution', 'Plagiarism report', 'AI-detection report', 'Free revisions'],
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
                          âœ“ {item.highlight}
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
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Take the first step toward stress-free academic success today.</p>
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
                    PhD-Level Support That Won't Break the Bank
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-loose">
                    Premium PhD-level support shouldn't be out of reach. We prove that you can pay for online homework help without sacrificing quality or receiving <span className="text-[#1652A0] font-medium">AI-generated content</span>.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: DollarSign, title: 'Starting at just $10/page', desc: 'Expert help with no hidden service fees, ever.' },
                      { icon: FileCheck, title: 'Everything included free', desc: 'Title pages, bibliographies, formatting & plagiarism reports.' },
                      { icon: RefreshCw, title: 'Unlimited revisions', desc: 'Enjoy unlimited revisions at absolutely no extra cost.' },
                      { icon: Shield, title: 'Money-back guarantee', desc: 'Protected if we miss a deadline or fail your instructions.' },
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

                {/* Right â€” Calculator */}
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
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Our Unshakable Guarantees to You</h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Commitments we take seriously with every single order we deliver.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    icon: Trophy,
                    title: 'Quality Commitment',
                    description: 'We utilize high-tier academic databases (JSTOR, PubMed) to ensure every argument is evidence-based and aligned exactly with your professor\'s rubric.',
                  },
                  {
                    icon: Clock,
                    title: 'On-Time Delivery',
                    description: 'Deadlines are sacred. Our 24/7 global "follow-the-sun" network ensures that even urgent 3-hour requests are delivered right on time.',
                  },
                  {
                    icon: RefreshCw,
                    title: 'Free Revisions',
                    description: 'Not perfectly satisfied? We will gladly revise your work until you are completely content with the final result.',
                  },
                  {
                    icon: Lock,
                    title: 'Privacy First',
                    description: 'We operate under strict Non-Disclosure Agreements and a "No-Data-Retention" policy so your academic journey remains 100% confidential.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all group">
                    <div className="w-16 h-16 rounded-xl bg-[#1652A0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-4">{item.title}</h3>
                    <p className="text-gray-300 leading-loose text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-3">We Stand Behind Every Submission</h3>
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
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.06) 100%)', border: '1px solid rgba(212,168,83,0.3)', color: '#D4A853' }}>
                  <Star className="w-4 h-4" /> CLIENT REVIEWS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">Real Results From Real Students</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Read real results from students who asked us for homework help and received A+ results.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Marcus J.', tag: 'Verified Client', date: 'Apr 22, 2024', subject: 'Engineering / Math', rating: 5, text: 'The quality of help I received with my math homework was top-tier. I just got an A on my stats assignment thanks to the crystal-clear explanations provided by the expert here.' },
                  { name: 'Clara M.', tag: 'Returning Client', date: 'Aug 30, 2025', subject: 'Management', rating: 5, text: 'The expert has done a really good job and delivered right on time. The work showcases in-depth study and dedication. Very happy with the final submission.' },
                  { name: 'Philip W.', tag: 'First-Time User', date: 'Dec 06, 2023', subject: 'Science (Physics)', rating: 5, text: 'The assignment involved a complex Physics experiment on wave-particle duality, and the level of expertise shown by the team was exceptional.' },
                  { name: 'Daniel C.', tag: 'Verified Client', date: 'Sep 03, 2025', subject: 'Computer Science', rating: 4.8, text: 'The code quality was excellent and I received the files right on time. Everything I needed for my final project was covered perfectly.' },
                  { name: 'Katherine B.', tag: 'Returning Client', date: 'Sep 05, 2025', subject: 'Economics', rating: 5, text: 'Professional and fast service. The economic analysis was thorough and the formatting was spot on. Highly recommend for college students.' },
                  { name: 'Victor G.', tag: 'First-Time User', date: 'Mar 08, 2024', subject: 'Law', rating: 5, text: 'Needed urgent help with my law coursework and the writer was super helpful. They really know their stuff and got me out of a tight spot with solid legal arguments.' },
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
                        {[...Array(Math.floor(review.rating))].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 text-[#D4A853] fill-[#D4A853]" />
                        ))}
                        {review.rating % 1 !== 0 && (
                          <span className="text-xs text-[#D4A853] font-bold self-center ml-0.5">{review.rating}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-loose text-[14px]">"{review.text}"</p>
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
                answer="We have specialized experts across more than 150 disciplines, ranging from technical STEM subjects (Math, Chemistry, Programming) to Humanities, Law, Nursing, and Business. Whatever your subject, we have a vetted expert ready to help."
              />
              <FAQItem
                question="How fast can you deliver?"
                answer="Most students receive their completed work within 3 to 6 hours. When you place an order, we match you with an expert who can deliver ready-to-submit results immediately. For longer or more complex tasks, we'll give you a realistic timeline upfront."
              />
              <FAQItem
                question="Is the work original?"
                answer="Absolutely. Every task is 100% human-written from scratch. We strictly avoid AI tools and include a free AI-detection and plagiarism report with every completed order to ensure complete academic integrity."
              />
              <FAQItem
                question="Can I communicate with the writer?"
                answer="Yes! You can chat directly with your assigned expert to clarify instructions, request updates, and ensure your specific requirements are being met throughout the entire process via our secure dashboard."
              />
              <FAQItem
                question="What if I'm not satisfied?"
                answer="We offer an unlimited free revision policy to make any necessary adjustments. If we fail to write your homework to your instructions even after revisions, you are protected by a full money-back guarantee. No hassle, no fine print."
              />
              <FAQItem
                question="How does pricing work?"
                answer="Our pricing is completely transparent, starting at just $10 per page. The final price depends on your academic level, page count, and deadline, with absolutely no hidden fees. Title pages, bibliographies, formatting, and plagiarism reports are all included free."
              />
              <FAQItem
                question="Is my information secure?"
                answer="Yes. Your privacy is our priority. We use SSL-encrypted gateways for payments and follow a rigorous non-disclosure policy, meaning your details are never shared with third parties, universities, or anyone else."
              />
              <FAQItem
                question="Do you handle urgent assignments?"
                answer="Yes, our experts specialize in urgent requests. Thanks to our 24/7 global network, we can handle 'do my homework fast' requests in as little as 3 hours without sacrificing quality or academic rigor."
              />
            </div>

            <div className="mt-12 bg-[#1652A0] rounded-2xl p-10 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-gray-200 mb-6">Our support team is available 24/7 around the globe to help you.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1652A0] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-md"
                >
                  <Headphones className="w-5 h-5" /> Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ FINAL CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-24 bg-[#0B1F42]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Turn Academic Stress <br /> Into Success Today!
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto leading-loose">
                Connect with verified PhD specialists, get your assignments done exactly to your instructions, and save time for what matters most.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <Link
                  to="/order-now"
                  className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                >
                  Start Your Project <ArrowRight className="w-5 h-5" />
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
                  { icon: CheckCircle, text: '100% Original Work' },
                  { icon: CheckCircle, text: 'Unlimited Revisions Included' },
                  { icon: CheckCircle, text: '100% Confidential & Secure' },
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
