import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServicePage } from '../../hooks/useServicePage';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

// Import academic levels and deadlines from your existing service page
const academicLevels = ["High School", "College", "University", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];

// Map deadline display names to Sanity field names
const deadlineFieldMap: Record<string, string> = {
  "3 hours": "threeHours",
  "6 hours": "sixHours",
  "12 hours": "twelveHours",
  "24 hours": "twentyFourHours",
  "48 hours": "fortyEightHours",
  "3 days": "threeDays",
  "5 days": "fiveDays",
  "7 days": "sevenDays",
  "10 days": "tenDays",
  "14 days": "fourteenDays"
};

// Map academic levels to Sanity field names
const levelFieldMap: Record<string, string> = {
  "High School": "highSchool",
  "College": "college",
  "University": "university",
  "PhD": "phd"
};

// Icon mapping function
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Star':
      return (
        <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      );
    case 'Report':
      return (
        <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <path d="M9 9h6M9 13h6M9 17h6"/>
        </svg>
      );
    case 'Lock':
      return (
        <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
          <rect x="6" y="11" width="12" height="8" rx="2"/>
          <path d="M12 11V7a4 4 0 1 1 8 0v4"/>
        </svg>
      );
    case 'Clock':
      return (
        <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      );
    case 'Dollar':
      return (
        <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M12 1v22"/>
          <path d="M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7"/>
        </svg>
      );
    case 'Refund':
      return (
        <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M17 1l4 4-4 4"/>
          <path d="M21 5H7a4 4 0 0 0 0 8h1"/>
        </svg>
      );
    default:
      return (
        <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <path d="M9 9h6M9 13h6M9 17h6"/>
        </svg>
      );
  }
};

const DynamicServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useServicePage(slug || '');
  
  const [academicLevel, setAcademicLevel] = useState("College");
  const [pages, setPages] = useState(1);
  const [deadline, setDeadline] = useState("48 hours");
  
  const WORDS_PER_PAGE = 275;
  const totalWords = pages * WORDS_PER_PAGE;
  
  // Calculate price based on Sanity data
  const price = data?.pricingBase 
    ? (data.pricingBase as any)[levelFieldMap[academicLevel]][deadlineFieldMap[deadline]] * pages
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p className="text-gray-600">The requested service page could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="background-icons min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7FAFC' }}>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-8 md:py-10 relative">
        <main className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
              <span className="bg-white text-gray-800 rounded-full h-6 w-6 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <text x="12" y="14" fontFamily="sans-serif" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">AI</text>
                </svg>
              </span>
              PLAGIARISM & AI FREE
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {data.heroHeading || data.title}
            </h1>
            <p className="text-lg text-gray-600">
              {data.heroDescription}
            </p>
            {/* Ratings - using placeholder data for now */}
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
            <form className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Academic Level</label>
                <select 
                  value={academicLevel} 
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition mt-1"
                >
                  {academicLevels.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-1 mt-4">
                <button 
                  type="button" 
                  onClick={() => setPages(Math.max(1, pages - 1))} 
                  className="px-4 py-2 text-2xl font-light text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  -
                </button>
                <div className="text-center">
                  <input 
                    type="number" 
                    min={1} 
                    value={pages} 
                    onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="text-lg font-semibold text-gray-800 w-16 text-center border-none outline-none" 
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => setPages(pages + 1)} 
                  className="px-4 py-2 text-2xl font-light text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  +
                </button>
                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-md">{totalWords} words</span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Deadline</label>
                <select 
                  value={deadline} 
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition mt-1"
                >
                  {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {/* Price display */}
              <div className="flex flex-col items-center justify-center mt-4">
                <span className="text-xs text-gray-500">From</span>
                <span className="font-bold text-2xl text-primary-600">${price.toFixed(2)}</span>
              </div>
              <button 
                type="submit" 
                className="w-full mt-8 bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Place your order
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account? <a href="/login" className="font-medium text-teal-600 hover:underline">Log in</a>
            </p>
          </div>
        </main>
      </section>

      {/* Writers Section */}
      {data.writersSectionTitle && (
        <section className="w-full bg-[#F7FAFC] pt-8 pb-2">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{data.writersSectionTitle}</h2>
            <div className="text-lg md:text-xl text-gray-700 mb-1 leading-snug">
              {data.writersSectionDescription}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mt-4 w-full">
              <div className="text-base text-gray-600 mb-2 md:mb-0 md:mr-6 whitespace-nowrap">
                Cooperate with those who graduated<br className="hidden md:block" />
                from the best universities and colleges
              </div>
              <div className="hidden md:block h-8 border-l border-emerald-400 mx-4"></div>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 w-full md:w-auto">
                <img src="/images/univ-logos.svg" alt="Top Universities" className="h-10 md:h-12 my-2" style={{maxWidth: '100%', height: 'auto'}} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {data.features && data.features.length > 0 && (
        <section className="w-full bg-[#F7FAFC] py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-14 tracking-wide text-gray-900 drop-shadow-md" style={{letterSpacing: '0.03em'}}>
              Why Our Service is the Right Choice
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
                >
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                    {getIcon(feature.icon)}
                  </span>
                  <div className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</div>
                  <div className="text-gray-500 text-base leading-relaxed font-normal">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {data.statistics && data.statistics.length > 0 && (
        <section className="w-full bg-[#F7FAFC] py-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">Why Choose Us</h2>
            <div className="flex flex-col md:flex-row justify-center items-stretch md:space-x-0 gap-4 md:gap-0">
              {data.statistics.map((stat, index) => (
                <React.Fragment key={index}>
                  <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
                    <span className="text-3xl md:text-4xl font-bold text-emerald-500">{stat.value}</span>
                    <span className="text-sm md:text-base font-medium text-gray-500 mt-1">{stat.label}</span>
                  </div>
                  {index < data.statistics!.length - 1 && (
                    <div className="hidden md:flex items-center">
                      <div className="h-12 border-l border-gray-200 mx-2"></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Samples Section */}
      {(data.samplesTitle || data.samplesDescription || (data.samples && data.samples.length > 0)) && (
        <section className="w-full py-10 px-2 bg-[#F7FAFC]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2 drop-shadow-sm text-center" style={{fontFamily: 'Inter, sans-serif'}}>
              {data.samplesTitle || 'Service Samples'}
            </h2>
            {data.samplesDescription && (
              <div className="border-b border-gray-200/70 w-16 mx-auto mb-6"></div>
            )}
            {data.samplesDescription && (
              <p className="text-lg md:text-xl text-gray-500/90 font-light text-center max-w-2xl mx-auto mb-10" style={{fontFamily: 'Inter, sans-serif', lineHeight: '1.6'}}>
                {data.samplesDescription}
              </p>
            )}
            {data.samples && data.samples.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.samples.map((sample, index) => (
                  <div key={index} className="bg-white border border-blue-200 rounded-2xl shadow-sm p-6 flex flex-col min-h-[270px] text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-red-100 rounded-md">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="4" fill="#EF4444"/>
                            <text x="6" y="15" fontSize="9" fill="white" fontWeight="bold">PDF</text>
                          </svg>
                        </span>
                        <span className="font-bold text-gray-900 text-base">{sample.title}</span>
                      </div>
                      <span className="text-gray-400 text-sm font-medium">{sample.pages} Pages</span>
                    </div>
                    <hr className="my-3 border-gray-200" />
                    <div className="flex-1 flex flex-col gap-2 text-sm">
                      <div className="flex flex-row flex-nowrap items-center">
                        <span className="w-32 text-left text-gray-500 flex-shrink-0">Academic Level:</span> 
                        <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.level}</span>
                      </div>
                      <div className="flex flex-row flex-nowrap items-center">
                        <span className="w-32 text-left text-gray-500 flex-shrink-0">Document Type:</span> 
                        <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.type}</span>
                      </div>
                      <div className="flex flex-row flex-nowrap items-center">
                        <span className="w-32 text-left text-gray-500 flex-shrink-0">Citation Style:</span> 
                        <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.citation}</span>
                      </div>
                    </div>
                    <a 
                      href={sample.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-full shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 text-left pl-6 flex items-center"
                    >
                      Read Sample
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faq && data.faq.length > 0 && (
        <section className="w-full bg-[#F7FAFC] py-10">
          <div className="max-w-5xl mx-auto px-2 md:px-4">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-start">
              <div className="flex-1 w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-6 text-gray-900">Frequently Asked Questions</h2>
                <div className="bg-white/80 rounded-3xl shadow-lg p-4 md:p-8">
                  <div className="space-y-2">
                    {data.faq.map((faqItem, index) => (
                      <div
                        key={index}
                        className="transition-all duration-300 rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden"
                      >
                        <button
                          type="button"
                          className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none transition-colors duration-300 hover:bg-gray-50"
                          aria-expanded="false"
                        >
                          <span className="text-sm md:text-base font-medium text-gray-900">{faqItem.question}</span>
                          <svg
                            className="w-4 h-4 ml-2 text-emerald-400 transform transition-transform duration-300"
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className="px-4 pb-2 text-gray-600 text-sm transition-all duration-300 ease-in-out max-h-0 opacity-0 py-0 overflow-hidden">
                          {faqItem.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Support Widget */}
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
                  <a
                    href="/contact"
                    className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transform hover:scale-105 active:scale-95 hover:shadow-lg"
                    aria-label="Contact support"
                    tabIndex={0}
                  >
                    Contact support
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DynamicServicePage;