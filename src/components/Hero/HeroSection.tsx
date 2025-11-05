import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, ChevronDown, Plus, Minus, Search, X } from 'lucide-react';
import EvolvingDocumentVisual from './EvolvingDocumentVisual'; // Import the new visual component

// ==================================================================================
// === TYPE DEFINITIONS & CONSTANTS ===
// ==================================================================================
interface PriceConfig {
  [key: string]: {
    [key: string]: {
      base: number;
      urgent: number;
    };
  };
}

const priceConfig: PriceConfig = {
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

const paperTypes = [
  "Acceptance Letter", "Admission Essay", "Analysis", "Annotated Bibliography", "Application Paper",
  "Article (Any Type)", "Article Review", "Assignment", "Blog Writing", "Book/Movie Review",
  "Brochure", "Business Plan", "Capstone Project", "Case Study", "Combined Sections",
  "Content (Any Type)", "Coursework", "Creative Writing", "Critical Thinking", "Dissertation",
  "Dissertation Chapter", "Dissertation Editing", "Essay (Any Type)", "Executive Summary",
  "Extended Revision", "Grant Proposal", "Lab Report", "Math Problem", "Memo/Letter",
  "Microsoft Project", "Nursing Calculations", "Online Exam", "Other", "Outline",
  "Paper Editing", "Pages (increase/decrease functionality only)", "Personal Reflection",
  "Presentation or Speech", "Presentation/PPT", "Progressive Paper", "Proofreading/Editing",
  "Q&A", "Report (Any Type)", "Research Paper", "Research Proposal", "Research Summary",
  "Response Essay", "Revision Paper", "Scholarship Essay", "Speech", "Speech Work",
  "Statistic Project", "Term Paper", "Thesis/Thesis Chapter"
];

const academicLevels = ["High School", "College", "University", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];


// ==================================================================================
// === HeroSection Component ===
// ==================================================================================
export default function HeroSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    academicLevel: "College",
    paperType: "Essay (Any Type)",
    pages: 1,
    deadline: "48 hours"
  });
  const [price, setPrice] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    const config = priceConfig[formData.academicLevel]?.[formData.deadline];
    if (config) {
      const totalPrice = formData.pages * config.base * config.urgent;
      setPrice(Math.round(totalPrice * 100) / 100);
    } else {
      setPrice(0);
    }
  }, [formData]);

  const handleOrderNow = () => {
    const params = new URLSearchParams({
      academicLevel: formData.academicLevel,
      paperType: formData.paperType,
      pages: formData.pages.toString(),
      deadline: formData.deadline,
      price: price.toString()
    });
    navigate(`/order-now?${params.toString()}`);
  };

  // Helper for star rendering
  function renderStars(rating: number, color: string) {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < full; i++) {
      stars.push(<svg key={i} className={`w-4 h-4 ${color}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>);
    }
    if (half) {
      stars.push(<svg key="half" className={`w-4 h-4 ${color}`} viewBox="0 0 20 20"><defs><linearGradient id="half-grad" x1="0" x2="100%" y1="0" y2="0"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="#e5e7eb"/></linearGradient></defs><path fill="url(#half-grad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>);
    }
    for (let i = 0; i < empty; i++) {
      stars.push(<svg key={full + i + (half ? 1 : 0)} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>);
    }
    return stars;
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-10 md:py-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          {/* Left: Headline & Trust */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              The #1 <span className="text-primary-600">Essay Writing Service</span> for Stress-Free Academic Success
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-md">
              Join 2,300+ students who trust our PhD & Master's writers for 100% original, confidential, and plagiarism-free papers. Starting at just <span className="font-semibold text-primary-600">$12/page</span>.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start mt-2">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-gray-700">4.5/5 Rating</span>
              </div>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
                <Users className="w-5 h-5 text-blue-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">500+ Writers</span>
              </div>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
                <span className="text-green-600 font-bold text-lg mr-1">✓</span>
                <span className="text-sm font-medium text-gray-700">Money-back Guarantee</span>
              </div>
            </div>
            {/* Confidentiality Badge */}
            <div className="flex items-center justify-center md:justify-start mt-4">
              <span className="inline-flex items-center bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200">
                <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                100% Confidential
              </span>
            </div>
            {/* Review Bar */}
            <div className="w-full flex flex-col items-center md:items-start text-center md:text-left mt-8">
              <div className="font-bold text-lg sm:text-xl text-gray-900 mb-1">Trusted by Students Worldwide</div>
              <div className="text-gray-500 text-sm mb-4">Join thousands of satisfied customers</div>
              <div className="flex flex-row justify-center md:justify-start items-end gap-6 pt-2">
                {/* Google Reviews */}
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                    <img src="/images/google-icon.svg" alt="Google Logo" className="h-5 w-5" />
                  </span>
                  <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                    4.1/5
                    <span className="ml-1 text-yellow-400 text-sm">★</span>
                  </span>
                  <span className="text-gray-600 text-xs mt-1 font-medium">Google</span>
                  <span className="text-gray-400 text-[11px] mt-0.5">59 reviews</span>
                </div>
                {/* Trustpilot */}
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2 transition duration-200 hover:-translate-y-1 hover:scale-105">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                    <img src="/images/trustpilot-icon.svg" alt="Trustpilot Logo" className="h-5 w-5" />
                  </span>
                  <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                    4.4/5
                    <span className="ml-1 text-green-500 text-sm">★</span>
                  </span>
                  <span className="text-gray-600 text-xs mt-1 font-medium">Trustpilot</span>
                  <span className="text-gray-400 text-[11px] mt-0.5">81 reviews</span>
                </div>
                {/* Sitejabber */}
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2 transition duration-200 hover:-translate-y-1 hover:scale-105">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                    <img src="/images/sitejabber-icon.webp" alt="Sitejabber Logo" className="h-5 w-5" />
                  </span>
                  <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                    4.0/5
                    <span className="ml-1 text-orange-400 text-sm">★</span>
                  </span>
                  <span className="text-gray-600 text-xs mt-1 font-medium">Sitejabber</span>
                  <span className="text-gray-400 text-[11px] mt-0.5">75 reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Compact Calculator Card */}
          <div className="w-full max-w-md mx-auto md:mx-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900 text-center mb-2">Quick Price Calculator</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Level</label>
                <select
                  className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  value={formData.academicLevel}
                  onChange={e => setFormData(f => ({ ...f, academicLevel: e.target.value }))}
                >
                  {academicLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Deadline</label>
                <select
                  className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  value={formData.deadline}
                  onChange={e => setFormData(f => ({ ...f, deadline: e.target.value }))}
                >
                  {deadlines.map(dl => (
                    <option key={dl} value={dl}>{dl}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                <select
                  className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  value={formData.paperType}
                  onChange={e => setFormData(f => ({ ...f, paperType: e.target.value }))}
                >
                  {paperTypes.slice(0, 10).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                  <option value={formData.paperType}>{formData.paperType}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Pages</label>
                <input
                  type="number"
                  min={1}
                  value={formData.pages}
                  onChange={e => setFormData(f => ({ ...f, pages: Math.max(1, parseInt(e.target.value) || 1) }))}
                  className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-sm text-center"
                />
                <div className="text-[11px] text-gray-400 text-center">{formData.pages * 275} words</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs text-gray-500">From</span>
                <span className="font-bold text-xl text-primary-600">${price.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOrderNow}
              className="w-full mt-2 font-bold text-white rounded-lg transition-all duration-200 bg-primary-600 hover:bg-primary-700 py-3 shadow-md text-base"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
