import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users } from 'lucide-react';

const priceConfig: any = {
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

// COMPLETE LIST - Same as your original
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

export default function HeroSectionSimple() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    academicLevel: "College",
    paperType: "Essay (Any Type)",
    pages: 1,
    deadline: "48 hours"
  });
  const [price, setPrice] = useState(0);

  // EXACT SAME CALCULATION LOGIC AS YOUR ORIGINAL
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
    <>
      <style>{`
        .hero-responsive {
          width: 100%;
          max-width: 100vw;
          padding: 2rem 1rem;
          background: linear-gradient(to bottom right, #f9fafb, #ffffff);
          box-sizing: border-box;
        }
        
        .hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }
        
        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }
        
        .hero-text {
          width: 100%;
          text-align: center;
        }
        
        .hero-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #111;
          line-height: 1.4;
        }
        
        .hero-title-accent {
          color: #268579;
        }
        
        .hero-desc {
          font-size: 0.875rem;
          margin-bottom: 2rem;
          color: #666;
          line-height: 1.6;
        }
        
        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        
        .hero-badge {
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          font-size: 0.875rem;
        }
        
        .hero-calculator {
          width: 100%;
          max-width: 500px;
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        @media (min-width: 1024px) {
          .hero-responsive {
            padding: 5rem 2rem;
          }
          
          .hero-content {
            flex-direction: row;
            gap: 4rem;
            align-items: flex-start;
          }
          
          .hero-text {
            flex: 1;
            text-align: left;
          }
          
          .hero-title {
            font-size: 3rem;
            margin-bottom: 1.5rem;
          }
          
          .hero-desc {
            font-size: 1.125rem;
            max-width: 36rem;
          }
          
          .hero-badges {
            justify-content: flex-start;
          }
          
          .hero-calculator {
            width: auto;
            min-width: 28rem;
            flex-shrink: 0;
          }
        }
      `}</style>

      <div className="hero-responsive">
        <div className="hero-inner">
          <div className="hero-content">
            
            <div className="hero-text">
              <h1 className="hero-title">
                The #1 <span className="hero-title-accent">Essay Writing Service</span> for Stress-Free Academic Success
              </h1>
              
              <p className="hero-desc">
                Join 2,300+ students who trust our PhD & Master's writers for 100% original, confidential, and plagiarism-free papers. Starting at just <strong style={{color: '#268579'}}>$12/page</strong>.
              </p>
              
              <div className="hero-badges">
                <div className="hero-badge">
                  <Star size={16} style={{color: '#facc15', marginRight: '0.5rem'}} />
                  <span>4.5/5 Rating</span>
                </div>
                <div className="hero-badge">
                  <Users size={16} style={{color: '#3b82f6', marginRight: '0.5rem'}} />
                  <span>500+ Writers</span>
                </div>
                <div className="hero-badge">
                  <span style={{color: '#10b981', fontWeight: 'bold', fontSize: '1.125rem', marginRight: '0.5rem'}}>✓</span>
                  <span>Money-back</span>
                </div>
              </div>
            </div>

            <div className="hero-calculator">
              <h2 style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '1.5rem',
                color: '#111'
              }}>Quick Price Calculator</h2>

              <div style={{marginBottom: '1rem'}}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4b5563'
                }}>Level</label>
                <select
                  value={formData.academicLevel}
                  onChange={e => setFormData(f => ({ ...f, academicLevel: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {academicLevels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4b5563'
                }}>Deadline</label>
                <select
                  value={formData.deadline}
                  onChange={e => setFormData(f => ({ ...f, deadline: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4b5563'
                }}>Type</label>
                <select
                  value={formData.paperType}
                  onChange={e => setFormData(f => ({ ...f, paperType: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {paperTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4b5563'
                }}>Pages</label>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {/* Minus Button */}
                  <button
                    type="button"
                    onClick={() => setFormData(f => ({ ...f, pages: Math.max(1, f.pages - 1) }))}
                    style={{
                      width: '3rem',
                      height: '2.5rem',
                      backgroundColor: '#268579',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#268579'}
                  >
                    −
                  </button>
      
                  {/* Input Field */}
                  <input
                    type="number"
                    min={1}
                    value={formData.pages}
                    onChange={e => setFormData(f => ({ ...f, pages: Math.max(1, parseInt(e.target.value) || 1) }))}
                    style={{
                      flex: 1,
                      padding: '0.625rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      textAlign: 'center'
                    }}
                  />
      
                  {/* Plus Button */}
                  <button
                    type="button"
                    onClick={() => setFormData(f => ({ ...f, pages: f.pages + 1 }))}
                    style={{
                      width: '3rem',
                      height: '2.5rem',
                      backgroundColor: '#268579',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#268579'}
                  >
                    +
                  </button>
                </div>
                
                <div style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  textAlign: 'center',
                  marginTop: '0.25rem'
                }}>{formData.pages * 275} words</div>
              </div>

              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem'}}>From</div>
                <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#268579'}}>
                  ${price.toFixed(2)}
                </div>
              </div>

              <button
                onClick={handleOrderNow}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  backgroundColor: '#268579',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#268579'}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
