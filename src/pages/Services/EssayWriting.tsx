import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import WritersCarousel from './WritersCarousel';
import { SpecialAssignmentHelpCarousel } from './AdmissionEssayWriting';


const academicLevels = ["High School", "College", "University", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];

const sampleCards = [
  {
    title: "Impact of Social Media on Mental Health",
    pages: 5,
    level: "College",
    type: "Argumentative Essay",
    citation: "APA"
  },
  {
    title: "The Symbolism in The Great Gatsby",
    pages: 4,
    level: "University",
    type: "Literary Analysis",
    citation: "MLA"
  },
  {
    title: "Environmental Conservation Methods",
    pages: 6,
    level: "Masters",
    type: "Expository Essay",
    citation: "Chicago"
  },
  {
    title: "Digital Privacy in Modern Era",
    pages: 8,
    level: "PhD",
    type: "Research Essay",
    citation: "Harvard"
  },
];

export default function EssayWriting() {
  // FAQ state and data for FAQ block
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const faqData = [
    {
      question: 'What types of essays do you write?',
      answer: 'We specialize in all types of essays including argumentative, expository, narrative, descriptive, analytical, and persuasive essays. Our expert writers are skilled in various writing styles and academic formats.'
    },
    {
      question: 'How do you ensure essay quality and originality?',
      answer: 'Every essay is written from scratch and goes through thorough research, drafting, and multiple rounds of editing. We use advanced plagiarism detection software and provide originality reports upon request.'
    },
    {
      question: 'What is your essay writing process?',
      answer: 'Our process involves understanding your requirements, research, outline creation, writing multiple drafts, and thorough editing. Each essay is reviewed by our quality assurance team before delivery.'
    },
    {
      question: 'Do you offer essay revisions?',
      answer: 'Yes, we offer unlimited free revisions within 14 days of delivery. Our writers will refine your essay based on your feedback until you\'re completely satisfied with the final version.'
    },
  ];
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm<{
    academicLevel: string;
    pages: number;
    deadline: string;
  }>({
    defaultValues: {
      academicLevel: "College",
      pages: 1,
      deadline: "48 hours",
    },
  });


  const watchedValues = watch();
  const WORDS_PER_PAGE = 275;
  const totalWords = (watchedValues.pages || 1) * WORDS_PER_PAGE;

  // Price config copied from OrderNow
  const priceConfig = {
    "High School": {
      "3 hours": { base: 18, urgent: 1.8 }, "6 hours": { base: 16, urgent: 1.6 }, "12 hours": { base: 14, urgent: 1.4 },
      "24 hours": { base: 12, urgent: 1.2 }, "48 hours": { base: 12, urgent: 1.0 }, "3 days": { base: 12, urgent: 1.0 },
      "5 days": { base: 12, urgent: 1.0 }, "7 days": { base: 12, urgent: 1.0 }, "10 days": { base: 12, urgent: 1.0 }, "14 days": { base: 12, urgent: 1.0 }
    },
    "College": {
      "3 hours": { base: 25, urgent: 1.8 }, "6 hours": { base: 22, urgent: 1.6 }, "12 hours": { base: 18, urgent: 1.4 },
      "24 hours": { base: 15, urgent: 1.2 }, "48 hours": { base: 15, urgent: 1.0 }, "3 days": { base: 15, urgent: 1.0 },
      "5 days": { base: 15, urgent: 1.0 }, "7 days": { base: 15, urgent: 1.0 }, "10 days": { base: 15, urgent: 1.0 }, "14 days": { base: 15, urgent: 1.0 }
    },
    "University": {
      "3 hours": { base: 28, urgent: 1.8 }, "6 hours": { base: 25, urgent: 1.6 }, "12 hours": { base: 21, urgent: 1.4 },
      "24 hours": { base: 18, urgent: 1.2 }, "48 hours": { base: 18, urgent: 1.0 }, "3 days": { base: 18, urgent: 1.0 },
      "5 days": { base: 18, urgent: 1.0 }, "7 days": { base: 18, urgent: 1.0 }, "10 days": { base: 18, urgent: 1.0 }, "14 days": { base: 18, urgent: 1.0 }
    },
    "PhD": {
      "3 hours": { base: 38, urgent: 1.8 }, "6 hours": { base: 35, urgent: 1.6 }, "12 hours": { base: 31, urgent: 1.4 },
      "24 hours": { base: 28, urgent: 1.2 }, "48 hours": { base: 25, urgent: 1.0 }, "3 days": { base: 25, urgent: 1.0 },
      "5 days": { base: 25, urgent: 1.0 }, "7 days": { base: 25, urgent: 1.0 }, "10 days": { base: 25, urgent: 1.0 }, "14 days": { base: 25, urgent: 1.0 }
    }
  };
  function getBasePrice(academicLevel: keyof typeof priceConfig, deadline: string): number {
    const config = (priceConfig[academicLevel] as Record<string, { base: number; urgent: number }>)[deadline];
    return config ? config.base : 0;
  }
  // Update price calculation to multiply by number of pages
  const price = getBasePrice(watchedValues.academicLevel as keyof typeof priceConfig, watchedValues.deadline) * (watchedValues.pages || 1);

  const onSubmit = (data: { academicLevel: string; pages: number; deadline: string }) => {
    const params = new URLSearchParams({
      academicLevel: data.academicLevel,
      pages: data.pages.toString(),
      deadline: data.deadline,
    });
    navigate(`/order-now?${params.toString()}`);
  };


  return (
    <div className="background-icons min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7FAFC' }}>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-6 md:py-10 relative">
        <main className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
              <span className="bg-white text-gray-800 rounded-full h-6 w-6 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <text x="12" y="14" fontFamily="sans-serif" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">AI</text>
                </svg>
              </span>
              PLAGIARISM & AI FREE
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Assignment Help Service
            </h1>
            <p className="text-lg text-gray-600">
              Get expert help with your assignments and never miss a deadline again. Our professionals handle all subjects and academic levels.
            </p>
            {/* Ratings */}
            <div className="flex flex-row justify-start items-end gap-6 pt-4">
              {/* Google Reviews */}
              <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                  <img src="/images/google logo.svg" alt="Google Logo" className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                  4.1/5
                  <span className="ml-1 text-yellow-400 text-sm">★</span>
                </span>
                <span className="text-gray-600 text-xs mt-1 font-medium">Google</span>
              </div>
              {/* Trustpilot */}
              <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2 transition duration-200 hover:-translate-y-1 hover:scale-105">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                  <img src="/images/trustpilot logo 2.png" alt="Trustpilot Logo" className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                  4.4/5
                  <span className="ml-1 text-green-500 text-sm">★</span>
                </span>
                <span className="text-gray-600 text-xs mt-1 font-medium">Trustpilot</span>
              </div>
              {/* Sitejabber */}
              <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2 transition duration-200 hover:-translate-y-1 hover:scale-105">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                  <img src="/images/sitejabber-logo-2.png" alt="Sitejabber Logo" className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                  4.0/5
                  <span className="ml-1 text-orange-400 text-sm">★</span>
                </span>
                <span className="text-gray-600 text-xs mt-1 font-medium">Sitejabber</span>
              </div>
            </div>
          </div>
          {/* Right Column: Order Form */}
          <div className="bg-white p-8 rounded-2xl max-w-md mx-auto shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-2px_rgba(0,0,0,0.04)]">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Place an order</h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium text-gray-700">Academic Level</label>
                <select {...register('academicLevel')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition mt-1">
                  {academicLevels.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-1 mt-4">
                <button type="button" onClick={() => setValue('pages', Math.max(1, (watchedValues.pages || 1) - 1))} className="px-4 py-2 text-2xl font-light text-gray-600 hover:bg-gray-100 rounded-md">-</button>
                <div className="text-center">
                  <input type="number" min={1} {...register('pages', { valueAsNumber: true })} className="text-lg font-semibold text-gray-800 w-16 text-center border-none outline-none" />
                </div>
                <button type="button" onClick={() => setValue('pages', (watchedValues.pages || 1) + 1)} className="px-4 py-2 text-2xl font-light text-gray-600 hover:bg-gray-100 rounded-md">+</button>
                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-md">{totalWords} words</span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Deadline</label>
                <select {...register('deadline')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition mt-1">
                  {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {/* Price display */}
              <div className="flex flex-col items-center justify-center mt-4">
                <span className="text-xs text-gray-500">From</span>
                <span className="font-bold text-2xl text-primary-600">${price.toFixed(2)}</span>
              </div>
              <button type="submit" className="w-full mt-8 bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Place your order
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account? <Link to="/login" className="font-medium text-teal-600 hover:underline">Log in</Link>
            </p>
            <p className="text-center text-xs text-gray-400 mt-6">
              This site is protected by reCAPTCHA and the Google
              <Link to="/privacy-policy" className="text-blue-500 hover:underline ml-1">Privacy Policy</Link> and
              <Link to="/terms-and-conditions" className="text-blue-500 hover:underline ml-1">Terms of Service</Link> apply.
            </p>
          </div>
        </main>
      </section>
      {/* Writers Block Section */}
      <section className="container mx-auto px-6 py-6 md:py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Meet the Verified Experts Behind Your Assignments
          </h2>
          <p className="text-gray-500 text-base">
            Every applicant undergoes a rigorous multi-stage verification process, confirming their credentials, subject matter expertise, and commitment to our strict plagiarism-free and AI-free standards.
          </p>
        </div>
        {/* University Logos Bar */}
        <div className="flex items-center justify-center max-w-4xl mx-auto mt-2 mb-8 px-4">
          <p className="text-sm text-gray-600 whitespace-nowrap mr-4">Cooperate with those who graduated<br />from the best universities and colleges</p>
          <div className="h-8 w-1 bg-primary-600 mx-4 rounded" />
          <div className="flex items-center gap-4">
            <img src="/images/univ-logos.svg" alt="University Logos" className="h-8 filter grayscale" />
            <img src="/images/univ-logos-1.svg" alt="University Logos 2" className="h-8 filter grayscale" />
          </div>
        </div>
      </section>
      {/* Writers Scrollable Area */}
      <div className="container mx-auto px-6 pb-10">
        <WritersCarousel />
      </div>
      {/* Next-Gen Features Grid Block */}
      <section className="w-full bg-[#F7FAFC] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-light tracking-wider text-center mb-20 animate-fade-in-up">
            We go beyond <span className="bg-gradient-to-r from-primary-500 via-blue-400 to-primary-600 bg-clip-text text-transparent animate-gradient-x font-semibold">essay writing help services</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-3 py-4 transition-all duration-300 animate-fade-in-up hover:scale-105 hover:shadow-xl">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-3 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Star icon */}
                <svg width="40" height="40" fill="none" stroke="url(#star-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="star-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Human-written content only</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Whenever you ask us for assignment help and hire a professional writer, your paper will contain zero AI content.</div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Report icon */}
                <svg width="40" height="40" fill="none" stroke="url(#report-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="report-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <path d="M9 9h6M9 13h6M9 17h6"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Originality report included</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">We're ready to prove that our papers are written from scratch with free reports for all "assignment help" requests.</div>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Refund icon */}
                <svg width="40" height="40" fill="none" stroke="url(#refund-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="refund-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <path d="M17 1l4 4-4 4"/>
                  <path d="M21 5H7a4 4 0 0 0 0 8h1"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Comprehensive refund policy</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Have peace of mind knowing your money is protected by our fair refund policy that covers a variety of scenarios.</div>
            </div>
            {/* Divider */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 my-2">
              <div className="border-t border-white/30 w-full"></div>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Lock icon */}
                <svg width="40" height="40" fill="none" stroke="url(#lock-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="lock-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <rect x="6" y="11" width="12" height="8" rx="2"/>
                  <path d="M12 11V7a4 4 0 1 1 8 0v4"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Robust data protections</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Essay Embassy secures your data according to the strictest standards, from PCI DSS compliance for payment processing to end-to-end platform encryption.</div>
            </div>
            {/* Card 5 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Clock icon */}
                <svg width="40" height="40" fill="none" stroke="url(#clock-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="clock-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Prompt delivery without quality risks</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Our assignment experts leverage their experience to deliver well-researched and carefully put-together papers with deadlines starting from three hours.</div>
            </div>
            {/* Card 6 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Dollar icon */}
                <svg width="40" height="40" fill="none" stroke="url(#dollar-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="dollar-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <path d="M12 1v22"/>
                  <path d="M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Pocket-friendly rates</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Prices for our assignment help services start at $10.80/page. You get all the essentials and even enjoy some freebies.</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 animate-fade-in-up">
          <a
            href="/order-now"
            className="inline-block px-10 py-4 rounded-full bg-primary-600 text-white text-lg font-semibold shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          >
            Get Started
          </a>
        </div>
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease-in-out infinite;
          }
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </section>
      {/* Prices and Services Block */}
      <section className="w-full bg-white py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">Prices and services</h2>
          <div className="text-center text-lg text-gray-600 mb-4">
            Prices start at <span className="font-bold text-gray-900 relative inline-block"><span className="z-10 relative">$13.99/page</span><span className="absolute left-0 right-0 bottom-0 h-2 bg-yellow-300 rounded -z-10" style={{height:'0.5em', bottom:'0.1em'}}></span></span> and depend on the page count, deadline, and expert's level
          </div>
          <div className="flex justify-center mb-4">
            <Link to="/refund-policy" className="flex items-center gap-2 text-primary-600 text-base font-medium hover:underline">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01"/><path d="M12 7v4"/><circle cx="12" cy="12" r="10"/></svg>
              How we secure your payment
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mt-12 mb-10">
            {/* Included services */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Included services</h3>
              <div className="text-gray-400 text-base mb-4">You'll always get them for free</div>
              <div className="border-t border-gray-100 mb-4"></div>
              <ul className="flex-1 space-y-3">
                <li className="flex justify-between items-center font-semibold text-gray-800">Topic suggestion <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Formatting <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Title page & references <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Editor quality check <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Unlimited revisions <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
              </ul>
            </div>
            {/* Additional services */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Additional services</h3>
              <div className="text-gray-400 text-base mb-4">You can add them for an extra payment</div>
              <div className="border-t border-gray-100 mb-4"></div>
              <ul className="flex-1 space-y-3">
                <li className="flex justify-between items-center font-semibold text-gray-800">Grade A guarantee <span className="text-gray-500 font-normal">from $2.99</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Early draft <span className="text-gray-500 font-normal">+15% to the price</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">1-Page abstract <span className="text-gray-500 font-normal">from $13.99</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">VIP support <span className="text-gray-500 font-normal">$12.99</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Detailed outline <span className="text-gray-500 font-normal">$12.00</span></li>
              </ul>
            </div>
          </div>
          {/* Payment methods */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="text-gray-500 text-base">We accept:</div>
            <div className="flex items-center gap-4">
              <img src="/images/visa.svg" alt="Visa" className="h-10" />
              <img src="/images/mastercard.svg" alt="Mastercard" className="h-10" />
              <img src="/images/amex.svg" alt="Amex" className="h-10" />
              <img src="/images/discover.svg" alt="Discover" className="h-10" />
              <img src="/images/paypal.svg" alt="PayPal" className="h-10" />
            </div>
          </div>
          {/* Create an order button */}
          <div className="flex justify-center mt-2">
            <a
              href="/order-now"
              className="inline-block px-12 py-4 rounded-full bg-primary-600 text-white text-lg font-bold shadow-md hover:bg-primary-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              Create an order
            </a>
          </div>
        </div>
      </section>
      {/* Samples Block - Clean, Professional, Reference Style */}
      <section className="w-full py-20 px-2 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">Sample Assignments</h2>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Preview real assignment samples completed by our experts. Each sample demonstrates our commitment to quality, originality, and academic integrity—so you can trust us with your most important work.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleCards.map((sample, idx) => (
              <div key={idx} className="bg-white border border-blue-200 rounded-2xl shadow-sm p-6 flex flex-col min-h-[270px] text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-red-100 rounded-md">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#EF4444"/><text x="6" y="15" fontSize="9" fill="white" fontWeight="bold">PDF</text></svg>
                    </span>
                    <span className="font-bold text-gray-900 text-base">{sample.title}</span>
                  </div>
                  <span className="text-gray-400 text-sm font-medium">{sample.pages} Pages</span>
                </div>
                <hr className="my-3 border-gray-200" />
                <div className="flex-1 flex flex-col gap-2 text-sm">
                  <div className="flex flex-row flex-nowrap items-center"><span className="w-32 text-left text-gray-500 flex-shrink-0">Academic Level:</span> <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.level}</span></div>
                  <div className="flex flex-row flex-nowrap items-center"><span className="w-32 text-left text-gray-500 flex-shrink-0">Document Type:</span> <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.type}</span></div>
                  <div className="flex flex-row flex-nowrap items-center"><span className="w-32 text-left text-gray-500 flex-shrink-0">Citation Style:</span> <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.citation}</span></div>
                </div>
                <button className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-full shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 text-left pl-6">Read</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Journey Block */}
      <section className="w-full bg-white py-24">
        <div className="max-w-md mx-auto px-4 relative flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">Your Assignment Help journey</h2>
            <div className="flex flex-col items-center relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center mb-3 animate-fade-in-up">
              <span className="text-2xl mb-1">✍️</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">1. Create your order <span className="text-primary-600">(it's free)</span></div>
              <div className="text-gray-400 text-sm mb-2">Fill out our order form to be matched with the best experts</div>
              <a href="/order-now" className="inline-block px-5 py-2 rounded-full bg-primary-600 text-white text-sm font-medium shadow hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 mb-1">Get started</a>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center mb-3">
              <svg width="18" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 0v18m0 0l-5-5m5 5l5-5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center mb-3 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="text-2xl mb-1">💳</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">2. Make a payment</div>
              <div className="text-gray-400 text-sm">The deposit will stay on your balance until the order is ready</div>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center mb-3">
              <svg width="18" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 0v18m0 0l-5-5m5 5l5-5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <span className="text-2xl mb-1">📄</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">3. Get your assignment</div>
              <div className="text-gray-400 text-sm">Your money stays in your account until you approve the result</div>
            </div>
          </div>
        </div>
        </div>
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
          }
        `}</style>
      </section>
      {/* Why Assignment Help Stats Block (Compact, Themed) */}
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">Why Assignment Help at Essay Embassy</h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch md:space-x-0 gap-4 md:gap-0">
            {/* Stat 1 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">12+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Years helping students<br className='hidden md:block'/>in their studies</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 2 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">5K+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Highly qualified<br className='hidden md:block'/>and trusted experts</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 3 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">400K+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Successfully<br className='hidden md:block'/>completed assignments</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 4 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-emerald-500">4.8</span>
                <span className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" fill="#FACC15" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </span>
              </div>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Average<br className='hidden md:block'/>user rating</span>
            </div>
          </div>
        </div>
      </section>
      {/* What Makes Assignment Help From Our Experts So Special? Block */}
      <section className="w-full bg-[#F7FAFC] py-10">
        <div className="max-w-6xl mx-auto px-4 bg-[#F7FAFC] shadow-none border-none">
          <SpecialAssignmentHelpCarousel />
        </div>
      </section>
      
      {/* Why You Need Our Assignment Help - Scrollable Block (Polished, Compact) */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl border border-gray-200 shadow-md relative overflow-hidden p-6 md:p-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-10 md:h-12 bg-yellow-400 rounded-full mr-4" />
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900 text-left">Why You Need Our Assignment Help</h2>
          </div>
          <p className="text-base text-gray-700 text-left mb-4">
            Tackling assignments across multiple subjects can be overwhelming, especially with tight deadlines and high academic standards. Our expert assignment help service is designed to relieve your stress and ensure you never miss a deadline.
          </p>
          <p className="text-sm text-gray-600 mb-3 text-left">
            Students turn to Essay Embassy for assignment help because:
          </p>
          <div className="custom-scrollbar max-h-60 overflow-y-auto pr-1 mb-3 bg-gray-50 rounded-lg border border-gray-100">
            <ul className="list-disc pl-5 mb-3">
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Time Management:</span> Balancing coursework, part-time jobs, and personal life leaves little time for quality assignments.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Complex Topics:</span> Some assignments require deep research and advanced subject knowledge.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Formatting & Guidelines:</span> Strict adherence to academic formats (APA, MLA, Chicago, etc.) can be confusing and time-consuming.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Originality Concerns:</span> Avoiding plagiarism and ensuring unique content is a must for top grades.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Performance Pressure:</span> The pressure to maintain high grades can be overwhelming without the right support.</li>
            </ul>
            <p className="text-sm text-gray-700 mb-3">
              Our service ensures you submit well-researched, original, and properly formatted assignments on time, every time.
            </p>
            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Assignment Types We Handle</h3>
            <ul className="list-disc pl-5 mb-3">
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Essays & Reports:</span> Analytical, argumentative, narrative, and more.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Case Studies:</span> In-depth analysis and solutions for real-world scenarios.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Lab Reports:</span> Detailed scientific documentation and analysis.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Research Papers:</span> Comprehensive research and critical evaluation.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Presentations:</span> Visually engaging and content-rich slides.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">STEM Assignments:</span> Programming, mathematics, engineering, and more.</li>
            </ul>
            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">The Essay Embassy Guarantee: What Sets Us Apart</h3>
            <ul className="list-none pl-0 mb-3">
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Verified Academic Professionals, Not AI:</span> Your assignment will be crafted by a real human expert with an advanced degree in a relevant field. We rigorously verify every writer's credentials and expertise.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Guaranteed 100% Original, AI-Free Content:</span> Every assignment is built from scratch. You'll receive a comprehensive plagiarism report with your order to prove its authenticity.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Transparent and Fair Pricing:</span> No hidden fees, ever. Our pricing is clearly laid out based on your academic level, page count, and deadline, so you know the exact cost upfront.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Real Reviews and Quality Samples:</span> We believe in transparency. We encourage you to read authentic client testimonials and review our sample work to see the high standard of quality we deliver.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Free Revisions & Money-Back Guarantee:</span> Your satisfaction is our priority. We offer unlimited free revisions to ensure the final paper meets your requirements. If we miss a confirmed deadline, you are covered by our money-back guarantee.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Ironclad Security & Confidentiality:</span> We use end-to-end encryption to protect your personal and payment information. Your privacy is absolute, and your data will never be shared.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Punctuality is Non-Negotiable:</span> We respect your deadlines. Our experts have a proven track record of on-time delivery, and you can track your order's progress every step of the way.</span></li>
            </ul>
            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Get Your Expertly-Completed Assignment Today</h3>
            <p className="text-sm text-gray-700 mb-1">
              Stop wondering, "Who can help with my assignment and guarantee quality?" The answer is right here.
            </p>
            <p className="text-sm text-gray-700 mb-1">
              At Essay Embassy, we deliver high-quality, custom-written assignments that are guaranteed to be 100% original and AI-free. Our affordable service is designed to help you succeed while protecting your privacy.
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Place your order now and let a true subject matter expert handle the hard work for you.
            </p>
          </div>
        </div>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
      </section>
      {/* FAQ Block */}
      <section className="w-full bg-[#F7FAFC] py-16">
        <div className="max-w-5xl mx-auto px-2 md:px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-start">
            {/* FAQ Column */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-6 text-gray-900">Frequently Asked Questions</h2>
              <div className="bg-white/80 rounded-3xl shadow-lg p-4 md:p-8">
                <div className="space-y-2">
                  {faqData.map((faq, idx) => {
                    const isOpen = openFAQ === idx;
                    return (
                      <div
                        key={idx}
                        className={`transition-all duration-300 rounded-xl border border-gray-200 shadow-sm ${isOpen ? 'bg-gray-50' : 'bg-white'} overflow-hidden`}
                      >
                        <button
                          type="button"
                          className={`w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none transition-colors duration-300 ${isOpen ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                          style={{ background: isOpen ? '#f9fafb' : 'inherit' }}
                          onClick={() => setOpenFAQ(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-content-${idx}`}
                        >
                          <span className={`text-sm md:text-base font-medium transition-colors duration-300 ${isOpen ? 'text-emerald-600' : 'text-gray-900'}`}>{faq.question}</span>
                          <svg
                            className={`w-4 h-4 ml-2 text-emerald-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          id={`faq-content-${idx}`}
                          className={`px-4 pb-2 text-gray-600 text-sm transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100 py-1' : 'max-h-0 opacity-0 py-0 overflow-hidden'}`}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Support Widget Column */}
            <aside className="w-full md:w-80 flex-shrink-0 flex flex-col items-center md:items-start">
              <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 mt-0 md:mt-[38px] w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Have more questions?</h3>
                <img
                  src="/images/andrea head of support.avif"
                  alt="Andrea, Head of Support"
                  className="w-32 h-32 object-cover rounded-2xl shadow ring-2 ring-transparent hover:ring-emerald-200 focus:ring-emerald-300 transition-all duration-200 mb-4"
                  loading="lazy"
                  tabIndex={0}
                />
                <div className="font-medium text-gray-800 mb-1">Andrea, Head of Support</div>
                <Link
                  to="/contact"
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transform hover:scale-105 active:scale-95 hover:shadow-lg"
                  aria-label="Contact support"
                  tabIndex={0}
                >
                  Contact support
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      {/* Services Interlink Block - Tabbed Professional Version (Only Existing Services, Improved Link UI, No Duplicates) */}
            <section className="w-full py-12 rounded-2xl border-t border-gray-100 shadow-sm" style={{background: '#F7FAFC'}}>
              <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center md:items-start">
                {/* Left Side: Heading, Description, CTA */}
                <div className="flex-1 min-w-[320px] flex flex-col justify-center items-start mb-10 md:mb-0">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight" style={{fontFamily: 'Inter, sans-serif'}}>Your #1 paper writing service</h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-md">Our expert essay writers can tackle any academic task you entrust them with. Here are some of the services we offer.</p>
                  <Link
                    to="/writers"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
                    style={{textAlign: 'center'}}
                  >
                    Find your writer <span className="ml-2">→</span>
                  </Link>
                </div>
                {/* Right Side: Tabs and Service List */}
                <div className="flex-1 w-full">
                  {(() => {
                    // Only include services that have a corresponding file in src/pages/Services
                    const allServices = [
                      { name: 'Essay Writing', link: '/services/essay-writing' },
                      { name: 'Book Review', link: '/services/book-review' },
                      { name: 'Term Paper', link: '/services/term-paper' },
                      { name: 'Research Paper Writing', link: '/services/research-paper-writing' },
                      { name: 'Research Proposal', link: '/services/research-proposal' },
                      { name: 'Thesis Writing', link: '/services/thesis-writing' },
                      { name: 'Dissertation Writing', link: '/services/dissertation-writing' },
                      { name: 'Scholarship Essay', link: '/services/scholarship-essay' },
                      { name: 'Argumentative Essay', link: '/services/argumentative-essay' },
                      { name: 'Admission Essay', link: '/services/admission-essay' },
                      { name: 'Admission Essay Writing', link: '/services/admission-essay-writing' },
                      { name: 'Case Study', link: '/services/case-study' },
                      { name: 'Case Study Help', link: '/services/case-study-help' },
                      { name: 'Lab Report', link: '/services/lab-report' },
                      { name: 'Homework Help', link: '/services/homework-help' },
                      { name: 'English Assignment Help', link: '/services/english-assignment-help' },
                      { name: 'Programming Help', link: '/services/programming-help' },
                      { name: 'Ruby Programming Help', link: '/programming-help/ruby' },
                      { name: 'Physics Assignment Help', link: '/services/physics-assignment-help' },
                      { name: 'Assignment Help', link: '/services/assignment-help' },
                      { name: 'Narrative Essay', link: '/services/narrative-essay' },
                    ];
                    // Remove duplicates for each tab
                    const paperwork = [
                      'Essay Writing', 'Book Review', 'Term Paper', 'Research Paper Writing', 'Research Proposal', 'Thesis Writing', 'Dissertation Writing', 'Scholarship Essay', 'Argumentative Essay', 'Admission Essay', 'Admission Essay Writing', 'Case Study', 'Case Study Help', 'Lab Report', 'Homework Help', 'English Assignment Help', 'Programming Help', 'C Programming Help', 'Physics Assignment Help', 'Assignment Help', 'Narrative Essay',
                    ];
                    const coursework = [
                      'Essay Writing', 'Book Review', 'Term Paper', 'Research Paper Writing', 'Case Study', 'Lab Report', 'Homework Help', 'English Assignment Help', 'Programming Help', 'Ruby Programming Help', 'Physics Assignment Help', 'Assignment Help',
                    ];
                    const other = [
                      'Book Review', 'Thesis Writing', 'Dissertation Writing', 'Scholarship Essay', 'Argumentative Essay', 'Admission Essay', 'Admission Essay Writing', 'Case Study Help', 'Ruby Programming Help',
                    ];
                    const tabData = [
                      {
                        key: 'paperwork',
                        label: 'Paperwork',
                        services: paperwork.map(name => allServices.find(s => s.name === name)).filter(Boolean),
                      },
                      {
                        key: 'coursework',
                        label: 'Coursework / homework',
                        services: coursework.map(name => allServices.find(s => s.name === name)).filter(Boolean),
                      },
                      {
                        key: 'other',
                        label: 'Other assignments',
                        services: other.map(name => allServices.find(s => s.name === name)).filter(Boolean),
                      },
                    ];
                    const [activeTab, setActiveTab] = React.useState('paperwork');
                    const active = tabData.find(t => t.key === activeTab) || tabData[0];
                    // Split services into 3 columns
                    const filteredServices: { name: string; link: string }[] = (active.services.filter(Boolean) as { name: string; link: string }[]);
                    const columns: { name: string; link: string }[][] = [[], [], []];
                    filteredServices.forEach((s, i) => columns[i % 3].push(s));
                    return (
                      <div className="w-full">
                        {/* Tabs */}
                        <div className="flex gap-8 border-b border-gray-200 mb-6">
                          {tabData.map(tab => {
                            const isActive = activeTab === tab.key;
                            return (
                              <button
                                key={tab.key}
                                className={`relative pb-2 text-lg font-semibold transition-colors duration-200 tracking-tight focus:outline-none ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-700'}`}
                                style={{background: 'none', outline: 'none'}}
                                onClick={() => setActiveTab(tab.key)}
                              >
                                <span className={isActive ? 'text-primary-600' : ''}>{tab.label}</span>
                                {isActive && (
                                  <span className="absolute left-0 right-0 -bottom-1 mx-auto h-[3px] w-8 rounded-full bg-primary-600" style={{content: '""'}}></span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {/* Service List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                          {columns.map((col, idx) => (
                            <ul key={idx} className="space-y-2">
                              {col.map(service => (
                                <li key={service.name} className="text-[15px] text-gray-800 flex items-center gap-2" >
                                  <span className="block w-2 h-2 rounded-full bg-primary-200"></span>
                                  <Link
                                    to={service.link}
                                    className="transition-colors duration-150 font-normal text-gray-800 hover:text-primary-700 hover:font-medium focus:text-primary-600 focus:font-medium active:text-primary-600 active:font-medium"
                                    style={{textDecoration: 'none'}}
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </section>
            {/* Final CTA Block - Join Our Happy Clients (Larger, Balanced, Modern) */}
            <section className="pt-10 pb-0 bg-[#F7FAFC] w-full px-4 md:px-0">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto py-14">
                <img
                  src="/images/logo.png"
                  alt="Essay Embassy Logo"
                  className="w-36 h-36 object-contain mb-4 md:mb-0 md:mr-10 shadow-lg rounded-2xl bg-white/80"
                  loading="lazy"
                  style={{ boxShadow: '0 8px 32px 0 rgba(16, 185, 129, 0.10)' }}
                />
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">Join our 5,000+ happy clients</h2>
                  <ul className="text-gray-700 text-base md:text-lg mb-6 list-disc list-inside">
                    <li className="flex items-center gap-3 mb-2"><span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>20,000+ papers delivered with a 98% success rate</li>
                    <li className="flex items-center gap-3 mb-2"><span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Get original papers written according to your instructions</li>
                    <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Save time for what matters most</li>
                  </ul>
                  <Link
                    to="/order-now"
                    className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
                  >
                    Place an order
                  </Link>
                </div>
              </div>
            </section>
          </div>
        );
      }