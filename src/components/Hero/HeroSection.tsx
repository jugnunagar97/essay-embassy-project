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
  const [paperTypeSearch, setPaperTypeSearch] = useState("");
  const [showPaperTypes, setShowPaperTypes] = useState(false);
  const [showAcademicLevels, setShowAcademicLevels] = useState(false);
  const [showDeadlines, setShowDeadlines] = useState(false);

  const filteredPaperTypes = paperTypes.filter(type =>
    type.toLowerCase().includes(paperTypeSearch.toLowerCase())
  );

  const calculatePrice = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const config = priceConfig[formData.academicLevel]?.[formData.deadline];
      if (config) {
        const totalPrice = formData.pages * config.base * config.urgent;
        setPrice(Math.round(totalPrice * 100) / 100);
      } else {
        setPrice(0); 
        console.warn(`Price config not found for: Level=${formData.academicLevel}, Deadline=${formData.deadline}`);
      }
      setIsCalculating(false);
    }, 300);
  };

  useEffect(() => {
    calculatePrice();
  }, [formData]);

  const handlePagesChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      pages: increment ? prev.pages + 1 : Math.max(1, prev.pages - 1)
    }));
  };

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
    <section className="bg-gradient-to-br from-gray-50 to-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Hero Content & Evolving Document Visual */}
          <div className="space-y-6 lg:pt-6 flex flex-col justify-between h-full">
            <div className="space-y-5">
              <h1
                className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-gray-900" // Removed inline style, added Tailwind class
              >
                Looking For An Expert To <span className="text-primary-500">Write My Essay</span>? {/* Highlighted key phrase */}
              </h1>
              
              <p
                className="text-lg lg:text-xl leading-relaxed max-w-xl text-gray-700" // Removed inline style, added Tailwind class
              >
                Have a native essay writer do your task from scratch for a student-friendly price of just <span className="font-semibold text-primary-600">$12 per page</span>. Free edits and originality reports.
              </p>
            </div>

            {/* Evolving Document Visual Component */}
            <div className="pt-8 mt-auto">
              <EvolvingDocumentVisual />
            </div>
          </div>

          {/* Right Column - Compact Quick Order Form and Trust Indicators */}
          <div className="flex flex-col h-full">
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2
                className="text-center mb-6 font-bold text-gray-900" // Removed inline style, added Tailwind class
              >
                Calculate Your Paper Price
              </h2>

              <form className="space-y-4">
                {/* Academic Level and Type of Paper - Combined into a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Academic Level
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowAcademicLevels(!showAcademicLevels)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                      >
                        <span className="font-medium">{formData.academicLevel}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showAcademicLevels ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showAcademicLevels && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                          {academicLevels.map(level => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, academicLevel: level }));
                                setShowAcademicLevels(false);
                              }}
                              className="w-full px-3 py-2.5 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none font-medium transition-colors"
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Type of Paper */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Type of Paper
                    </label>
                    <div className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          value={showPaperTypes ? paperTypeSearch : formData.paperType}
                          onChange={(e) => {
                            setPaperTypeSearch(e.target.value);
                            setShowPaperTypes(true);
                          }}
                          onFocus={() => {
                            setShowPaperTypes(true);
                            setPaperTypeSearch("");
                          }}
                          className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-gray-400 transition-colors"
                          placeholder="Search paper type..."
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          {showPaperTypes && paperTypeSearch && (
                            <button
                              type="button"
                              onClick={() => {
                                setPaperTypeSearch("");
                                setShowPaperTypes(false);
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                          <Search className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      
                      {showPaperTypes && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                          {filteredPaperTypes.length > 0 ? (
                            filteredPaperTypes.map((type, index) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, paperType: type }));
                                  setPaperTypeSearch("");
                                  setShowPaperTypes(false);
                                }}
                                className={`w-full px-3 py-2.5 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors ${
                                  index !== filteredPaperTypes.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                              >
                                {type}
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2.5 text-gray-500 text-center">
                              No paper types found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Number of Pages and Deadline - Combined into a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Number of Pages */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Pages
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => handlePagesChange(false)}
                        className="w-10 h-10 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formData.pages <= 1}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <div className="flex-1 text-center">
                        <input
                          type="number"
                          value={formData.pages}
                          onChange={(e) => setFormData(prev => ({ ...prev, pages: Math.max(1, parseInt(e.target.value) || 1) }))}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-semibold text-lg hover:border-gray-400 transition-colors"
                          min="1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.pages * 275} words
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handlePagesChange(true)}
                        className="w-10 h-10 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Deadline
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowDeadlines(!showDeadlines)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                      >
                        <span className="font-medium">{formData.deadline}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDeadlines ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showDeadlines && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                          {deadlines.map(deadline => (
                            <button
                              key={deadline}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, deadline }));
                                setShowDeadlines(false);
                              }}
                              className="w-full px-3 py-2.5 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none font-medium transition-colors"
                            >
                              {deadline}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-1">Price (USD)</p>
                  <p
                    className="font-bold"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      color: '#1A1A1A',
                      fontSize: '24px'
                    }}
                  >
                    {isCalculating ? (
                      <span className="animate-pulse">$</span>
                    ) : (
                      `$${price.toFixed(2)}`
                    )}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={handleOrderNow}
                  className="w-full font-bold text-white rounded-xl transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-primary-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl bg-primary-500 hover:bg-primary-600"
                  style={{
                    padding: '14px 28px',
                    fontSize: '15px',
                    letterSpacing: '0.5px'
                  }}
                  disabled={isCalculating}
                >
                  ORDER NOW
                </button>
              </form>
            </div>

            {/* Trust Indicators - Moved below the form */}
            <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2.5 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#2E2E2E',
                      fontSize: '15px'
                    }}
                  >
                    4500+ Professional Writers
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-yellow-50 p-2.5 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600 fill-current" />
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#2E2E2E',
                      fontSize: '15px'
                    }}
                  >
                    Rated 4.9/5 based on 6015 reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showPaperTypes || showAcademicLevels || showDeadlines) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowPaperTypes(false);
            setShowAcademicLevels(false);
            setShowDeadlines(false);
          }}
        />
      )}
    </section>
  );
}
