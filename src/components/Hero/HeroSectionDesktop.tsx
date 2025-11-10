import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users } from 'lucide-react';

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

export default function HeroSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    academicLevel: "College",
    paperType: "Essay (Any Type)",
    pages: 1,
    deadline: "48 hours"
  });
  const [price, setPrice] = useState(0);

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

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10"></div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Left Content - Mobile First */}
          <div className="w-full lg:flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              The #1 <span className="text-primary-500">Essay Writing Service</span> for Stress-Free Academic Success
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Join 2,300+ students who trust our PhD & Master's writers for 100% original, confidential, and plagiarism-free papers. Starting at just <span className="font-semibold text-primary-600">$12/page</span>.
            </p>
            
            {/* Trust Badges - Stack on Mobile */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">4.5/5 Rating</span>
              </div>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                <Users className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">500+ Writers</span>
              </div>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                <span className="text-green-600 font-bold text-lg mr-2">✓</span>
                <span className="text-sm font-medium text-gray-700">Money-back</span>
              </div>
            </div>

            {/* Reviews - Hide on Mobile, Show on Tablet+ */}
            <div className="hidden md:block mt-12">
              <div className="font-bold text-xl text-gray-900 mb-2">Trusted by Students Worldwide</div>
              <div className="text-gray-500 text-sm mb-6">Join thousands of satisfied customers</div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow p-3 w-24">
                  <img src="/images/google-icon.svg" alt="Google" className="h-6 w-6 mb-2" />
                  <span className="text-base font-semibold text-gray-900">4.1/5 ★</span>
                  <span className="text-xs text-gray-600 mt-1">Google</span>
                </div>
                <div className="flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow p-3 w-24">
                  <img src="/images/trustpilot-icon.svg" alt="Trustpilot" className="h-6 w-6 mb-2" />
                  <span className="text-base font-semibold text-gray-900">4.4/5 ★</span>
                  <span className="text-xs text-gray-600 mt-1">Trustpilot</span>
                </div>
                <div className="flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow p-3 w-24">
                  <img src="/images/sitejabber-icon.webp" alt="Sitejabber" className="h-6 w-6 mb-2" />
                  <span className="text-base font-semibold text-gray-900">4.0/5 ★</span>
                  <span className="text-xs text-gray-600 mt-1">Sitejabber</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Card - Full Width on Mobile */}
          <div className="w-full lg:w-auto lg:max-w-md">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 text-center mb-6">Quick Price Calculator</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Level</label>
                    <select
                      className="w-full rounded-lg border-gray-300 text-sm py-2.5"
                      value={formData.academicLevel}
                      onChange={e => setFormData(f => ({ ...f, academicLevel: e.target.value }))}
                    >
                      {academicLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Deadline</label>
                    <select
                      className="w-full rounded-lg border-gray-300 text-sm py-2.5"
                      value={formData.deadline}
                      onChange={e => setFormData(f => ({ ...f, deadline: e.target.value }))}
                    >
                      {deadlines.map(dl => (
                        <option key={dl} value={dl}>{dl}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Type</label>
                  <select
                    className="w-full rounded-lg border-gray-300 text-sm py-2.5"
                    value={formData.paperType}
                    onChange={e => setFormData(f => ({ ...f, paperType: e.target.value }))}
                  >
                    {paperTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Pages</label>
                    <input
                      type="number"
                      min={1}
                      value={formData.pages}
                      onChange={e => setFormData(f => ({ ...f, pages: Math.max(1, parseInt(e.target.value) || 1) }))}
                      className="w-full rounded-lg border-gray-300 text-sm text-center py-2.5"
                    />
                    <div className="text-xs text-gray-400 text-center mt-1">{formData.pages * 275} words</div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg px-4">
                    <span className="text-xs text-gray-500 mb-1">From</span>
                    <span className="text-2xl font-bold text-primary-600">${price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleOrderNow}
                className="w-full mt-6 font-bold text-white rounded-lg bg-primary-600 hover:bg-primary-700 py-3.5 shadow-md text-base transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
