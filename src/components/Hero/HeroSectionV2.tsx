import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Check, Shield, Zap } from 'lucide-react';

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
    "5 days": { base: 12, urgent: 1.0 }, "7 days": { base: 12, urgent: 1.0 }, "10 days": { base: 12, urgent: 1.0 }, "14 days": { base: 11, urgent: 1.0 }
  },
  "College": {
    "3 hours": { base: 25, urgent: 1.8 }, "6 hours": { base: 22, urgent: 1.6 }, "12 hours": { base: 18, urgent: 1.4 },
    "24 hours": { base: 15, urgent: 1.2 }, "48 hours": { base: 15, urgent: 1.0 }, "3 days": { base: 15, urgent: 1.0 },
    "5 days": { base: 15, urgent: 1.0 }, "7 days": { base: 15, urgent: 1.0 }, "10 days": { base: 15, urgent: 1.0 }, "14 days": { base: 14, urgent: 1.0 }
  },
  "University": {
    "3 hours": { base: 28, urgent: 1.8 }, "6 hours": { base: 25, urgent: 1.6 }, "12 hours": { base: 21, urgent: 1.4 },
    "24 hours": { base: 18, urgent: 1.2 }, "48 hours": { base: 18, urgent: 1.0 }, "3 days": { base: 18, urgent: 1.0 },
    "5 days": { base: 18, urgent: 1.0 }, "7 days": { base: 18, urgent: 1.0 }, "10 days": { base: 18, urgent: 1.0 }, "14 days": { base: 17, urgent: 1.0 }
  },
  "PhD": {
    "3 hours": { base: 38, urgent: 1.8 }, "6 hours": { base: 35, urgent: 1.6 }, "12 hours": { base: 31, urgent: 1.4 },
    "24 hours": { base: 28, urgent: 1.2 }, "48 hours": { base: 25, urgent: 1.0 }, "3 days": { base: 25, urgent: 1.0 },
    "5 days": { base: 25, urgent: 1.0 }, "7 days": { base: 25, urgent: 1.0 }, "10 days": { base: 25, urgent: 1.0 }, "14 days": { base: 24, urgent: 1.0 }
  }
};

const assignmentTypes = [
  "Essay (Any Type)", "Argumentative Essay", "Admission Essay", "Analytical Essay",
  "Research Paper", "Term Paper", "Case Study", "Coursework", "Dissertation",
  "Dissertation Chapter", "Literature Review", "Book/Movie Review", "Article Review",
  "Research Proposal", "Thesis/Thesis Chapter", "Lab Report", "Critical Thinking",
  "Creative Writing", "Business Plan", "Presentation/PPT", "Other"
];

const academicLevels = ["High School", "College", "University", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];

export default function HeroSectionV2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assignmentType: "Argumentative Essay",
    academicLevel: "High School",
    deadline: "14 days",
    pages: 1
  });
  const [price, setPrice] = useState(0);
  const [pricePerPage, setPricePerPage] = useState(0);

  useEffect(() => {
    const config = priceConfig[formData.academicLevel]?.[formData.deadline];
    if (config) {
      const perPage = config.base * config.urgent;
      const totalPrice = formData.pages * perPage;
      setPricePerPage(Math.round(perPage * 100) / 100);
      setPrice(Math.round(totalPrice * 100) / 100);
    } else {
      setPrice(0);
      setPricePerPage(0);
    }
  }, [formData]);

  const handlePlaceOrder = () => {
    const params = new URLSearchParams({
      academicLevel: formData.academicLevel,
      paperType: formData.assignmentType,
      pages: formData.pages.toString(),
      deadline: formData.deadline,
      price: price.toString()
    });
    navigate(`/order-now?${params.toString()}`);
  };

  return (
    <section className="hero-v2-section">
      {/* Owl Mascot - BEHIND the form, bottom-right, creates depth */}
      <div className="hero-v2-owl-wrapper">
        <img
          src="/images/Owl/hero-section-owl2.png"
          alt="Essay Embassy Owl Mascot"
          className="hero-v2-owl-mascot"
        />
      </div>

      <div className="hero-v2-container">
        {/* Left Content */}
        <div className="hero-v2-left">
          <h1 className="hero-v2-headline">
            College Essay Writing Service — Academic Papers & Admission Essays
          </h1>

          <p className="hero-v2-subtext">
            From coursework assignments to college applications, hire expert essay writers from our team who deliver polished, original work on your deadline.
          </p>

          {/* Trust Bar - Social Proof Above The Fold */}
          <div className="hero-v2-trust-bar">
            <div className="trust-bar-rating">
              <span className="trust-bar-stars">★★★★★</span>
              <span className="trust-bar-score">Rated 4.8/5</span>
              <span className="trust-bar-divider">•</span>
              <span className="trust-bar-reviews">14,247 Student Reviews</span>
            </div>
            <div className="trust-bar-stats">
              <span className="trust-stat">
                <span className="trust-stat-check">✓</span>
                98% On-Time Delivery
              </span>
              <span className="trust-stat">
                <span className="trust-stat-check">✓</span>
                A+ Average Grade
              </span>
              <span className="trust-stat">
                <span className="trust-stat-check">✓</span>
                Money-Back Guarantee
              </span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="hero-v2-badges">
            <div className="hero-v2-badge">
              <span className="badge-icon badge-icon-check">
                <Check size={14} strokeWidth={3} />
              </span>
              <span>100% Human-Written</span>
            </div>
            <div className="hero-v2-badge">
              <span className="badge-icon badge-icon-zap">
                <Zap size={14} strokeWidth={2.5} />
              </span>
              <span>3-24h Delivery</span>
            </div>
            <div className="hero-v2-badge">
              <span className="badge-icon badge-icon-flag">
                🇺🇸
              </span>
              <span>200+ Expert Writers</span>
            </div>
          </div>

          {/* Social Proof Row */}
          <div className="hero-v2-social-proof">
            <div className="social-proof-avatars">
              <img src="/images/Jessica Miller.jpg" alt="Student" className="social-avatar" />
              <img src="/images/Michael Johnson.jpg" alt="Student" className="social-avatar" />
              <img src="/images/Christina.jpg" alt="Student" className="social-avatar" />
            </div>
            <span className="social-proof-text">14000+ Students Served</span>

            <div className="social-proof-rating">
              <span className="rating-star">★</span>
              <span>4.8 Sitejabber</span>
              <img src="/images/sitejabber-icon.webp" alt="Sitejabber" className="rating-logo" />
            </div>

            <div className="social-proof-rating">
              <span className="rating-star">★</span>
              <span>4.9 Trustpilot</span>
              <img src="/images/trustpilot-icon.svg" alt="Trustpilot" className="rating-logo" />
            </div>
          </div>
        </div>

        {/* Right Side - Order Form (ABOVE owl, higher z-index) */}
        <div className="hero-v2-right">
          <div className="hero-v2-form-card">
            <div className="form-card-header">
              <h2>Get Your Essay Started</h2>
              <p>No signup required to see pricing</p>
            </div>

            <div className="form-card-body">
              {/* Assignment Type */}
              <div className="form-group">
                <label>Assignment Type</label>
                <div className="select-wrapper">
                  <select
                    value={formData.assignmentType}
                    onChange={e => setFormData(f => ({ ...f, assignmentType: e.target.value }))}
                  >
                    {assignmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="select-arrow" size={18} />
                </div>
              </div>

              {/* Academic Level & Deadline Row */}
              <div className="form-row">
                <div className="form-group">
                  <label>Academic Level</label>
                  <div className="select-wrapper">
                    <select
                      value={formData.academicLevel}
                      onChange={e => setFormData(f => ({ ...f, academicLevel: e.target.value }))}
                    >
                      {academicLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <ChevronDown className="select-arrow" size={18} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Deadline</label>
                  <div className="select-wrapper">
                    <select
                      value={formData.deadline}
                      onChange={e => setFormData(f => ({ ...f, deadline: e.target.value }))}
                    >
                      {deadlines.map(dl => (
                        <option key={dl} value={dl}>{dl}</option>
                      ))}
                    </select>
                    <ChevronDown className="select-arrow" size={18} />
                  </div>
                </div>
              </div>

              {/* Number of Pages */}
              <div className="form-group">
                <label>Number of pages</label>
                <div className="select-wrapper">
                  <select
                    value={`${formData.pages} Page – ${formData.pages * 300} Words`}
                    onChange={e => {
                      const match = e.target.value.match(/^(\d+)/);
                      if (match) setFormData(f => ({ ...f, pages: parseInt(match[1]) }));
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={`${num} Page – ${num * 300} Words`}>
                        {num} Page{num > 1 ? 's' : ''} – {num * 300} Words
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-arrow" size={18} />
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="form-card-price">
              <div className="price-label">Estimated Price</div>
              <div className="price-value">${price.toFixed(2)}</div>
              <div className="price-per-page">From ${pricePerPage.toFixed(2)}/page • Academic Essay</div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="form-card-cta"
            >
              Place an Order <span className="cta-arrow">→</span>
            </button>

            {/* Trust Indicators */}
            <div className="form-card-trust">
              <div className="trust-item">
                <Shield size={14} className="trust-icon" />
                <span>Secure</span>
              </div>
              <div className="trust-item">
                <Check size={14} className="trust-icon" />
                <span>AI-Free</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon-money">💰</span>
                <span>Money-Back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        /* ========== MOBILE-FIRST / RESPONSIVE STYLES ========== */
        
        .hero-v2-section {
          background: linear-gradient(135deg, #1652A0 0%, #0D3B7A 50%, #0A2E5E 100%);
          padding: 80px 0 100px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-v2-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 60px;
          position: relative;
          z-index: 2;
        }

        /* ========== LEFT SIDE ========== */
        .hero-v2-left {
          flex: 1;
          max-width: 600px;
        }

        .hero-v2-headline {
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          line-height: 1.15;
          color: #ffffff;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .hero-v2-subtext {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 32px;
          max-width: 540px;
        }

        /* Trust Bar */
        .hero-v2-trust-bar {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 16px 24px;
          margin-bottom: 32px;
          display: inline-flex;
          flex-direction: column;
          gap: 12px;
        }

        .trust-bar-rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .trust-bar-stars {
          color: #FBBF24;
          letter-spacing: 2px;
        }

        .trust-bar-score {
          font-weight: 700;
          color: #fff;
        }
        
        .trust-bar-divider {
           color: rgba(255,255,255,0.4);
        }

        .trust-bar-reviews {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
        }

        .trust-bar-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .trust-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .trust-stat-check {
            color: #22C55E;
            font-weight: 800;
        }

        /* Trust Badges */
        .hero-v2-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 40px;
        }

        .hero-v2-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          color: #fff;
        }

        .badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        
        .badge-icon-check { background: #22C55E; color: white; }
        .badge-icon-zap { background: #F59E0B; color: white; }
        .badge-icon-flag { font-size: 14px; }

        /* Social Proof Row */
        .hero-v2-social-proof {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-proof-avatars {
          display: flex;
        }
        
        .social-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #1652A0; /* Matches bg */
          margin-left: -10px;
        }
        .social-avatar:first-child { margin-left: 0; }

        .social-proof-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          font-weight: 500;
        }

        .rating-logo {
          height: 16px;
          margin-left: 4px;
        }

        /* ========== RIGHT SIDE - FORM CARD ========== */
        .hero-v2-right {
          flex-shrink: 0;
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 10;
        }

        .hero-v2-form-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          overflow: hidden;
        }

        .form-card-header {
          padding: 24px;
          text-align: center;
          border-bottom: 1px solid #f0f0f0;
        }

        .form-card-header h2 {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          margin-bottom: 4px;
        }

        .form-card-header p {
          font-size: 13px;
          color: #666;
        }

        .form-card-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 6px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #555;
        }

        .select-wrapper {
          position: relative;
        }

        .select-wrapper select {
          width: 100%;
          padding: 12px;
          padding-right: 36px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          appearance: none;
          background-color: #fff;
          color: #333;
        }
        
        .select-arrow {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            pointer-events: none;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-card-price {
          background: #f9fafb;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #eee;
        }

        .price-value {
          font-size: 32px;
          font-weight: 800;
          color: #1652A0;
          line-height: 1.2;
        }
        
        .price-label { font-size: 12px; color: #666; text-transform: uppercase; }
        .price-per-page { font-size: 12px; color: #777; margin-top: 4px; }

        .form-card-cta {
          width: calc(100% - 48px);
          margin: 0 24px 24px 24px;
          padding: 16px;
          background: linear-gradient(135deg, #1652A0 0%, #0D3B7A 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s;
        }
        
        .form-card-cta:active { transform: scale(0.98); }

        .form-card-trust {
          display: flex;
          justify-content: center;
          gap: 16px;
          padding-bottom: 20px;
          font-size: 11px;
          color: #666;
        }
        
        .trust-item { display: flex; align-items: center; gap: 4px; }

        /* Owl Mascot */
        .hero-v2-owl-wrapper {
          position: absolute;
          bottom: 0;
          right: 5%;
          z-index: 1;
          pointer-events: none;
          display: none;
        }
        
        @media (min-width: 1024px) {
            .hero-v2-owl-wrapper { display: block; }
        }

        .hero-v2-owl-mascot {
          width: 280px; 
          transform: scaleX(-1); 
        }

        /* ========== RESPONSIVE BREAKPOINTS ========== */
        
        /* TABLET / SMALL LAPTOP (Max 1024px) */
        @media (max-width: 1024px) {
          .hero-v2-section {
            padding: 40px 0;
            min-height: auto;
            flex-direction: column;
          }
          
          .hero-v2-container {
            flex-direction: column;
            gap: 40px;
          }

          .hero-v2-left {
            text-align: center;
            max-width: 100%;
          }

          .hero-v2-headline {
            font-size: 36px;
            margin-bottom: 16px;
          }

          .hero-v2-subtext {
            margin: 0 auto 24px;
          }

          .hero-v2-trust-bar {
            align-items: center;
            display: inline-flex;
          }
          
          .trust-bar-rating, .trust-bar-stats {
             justify-content: center;
          }

          .hero-v2-badges {
            justify-content: center;
          }

          .hero-v2-social-proof {
            justify-content: center;
          }
          
          .hero-v2-right {
             max-width: 450px;
          }
        }

        /* MOBILE (Max 640px) */
        @media (max-width: 640px) {
          .hero-v2-section {
             padding: 20px 0 40px;
          }
          
          .hero-v2-container {
             padding: 0 16px;
             gap: 32px;
          }
          
          .hero-v2-headline {
             font-size: 28px;
          }
          
          .hero-v2-subtext {
             font-size: 16px;
          }

          .trust-bar-stats {
             flex-direction: column;
             gap: 8px;
             align-items: center;
          }

          .hero-v2-right {
             width: 100%;
             max-width: 100%;
          }
          
          .hero-v2-form-card {
             box-shadow: 0 10px 30px rgba(0,0,0,0.15);
             border-radius: 12px;
          }
          
          .form-card-header, .form-card-body, .form-card-price {
             padding: 16px;
          }
          
          .form-card-cta {
             width: calc(100% - 32px);
             margin: 0 16px 16px 16px;
          }
        }
      `}</style>
    </section>
  );
}
