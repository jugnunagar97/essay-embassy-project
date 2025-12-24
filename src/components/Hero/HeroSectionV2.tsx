import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Check, Shield, Zap, Clock, Award, Star, ArrowRight, Sparkles } from 'lucide-react';

// Price configuration (unchanged)
const priceConfig = {
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const config = (priceConfig as Record<string, Record<string, { base: number; urgent: number }>>)[formData.academicLevel]?.[formData.deadline];
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
    <section className="hero-premium-section" data-testid="hero-section">
      {/* Animated Background Elements */}
      <div className="hero-bg-gradient"></div>
      <div className="hero-bg-pattern"></div>
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="hero-glow hero-glow-3"></div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-badge floating-badge-1">
          <Award size={16} />
          <span>Top Rated</span>
        </div>
        <div className="floating-badge floating-badge-2">
          <Clock size={16} />
          <span>24/7 Support</span>
        </div>
      </div>

      {/* Owl Mascot */}
      <div className="hero-owl-container">
        <img
          src="/images/Owl/hero-section-owl2.png"
          alt="Essay Embassy Owl Mascot"
          className="hero-owl-image"
        />
      </div>

      <div className={`hero-premium-container ${isVisible ? 'is-visible' : ''}`}>
        {/* Left Content */}
        <div className="hero-content-left">
          {/* Premium Badge */}
          <div className="premium-badge">
            <Sparkles size={14} />
            <span>Trusted by 14,000+ Students</span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-accent">Premium</span> College Essay Writing Service
            <span className="headline-sub">Academic Papers & Admission Essays</span>
          </h1>

          <p className="hero-description">
            From coursework assignments to college applications, our expert writers deliver
            polished, original work on your deadline. Excellence isn't just promised—it's guaranteed.
          </p>

          {/* Trust Metrics */}
          <div className="trust-metrics">
            <div className="metric-card">
              <div className="metric-value">4.8<span className="metric-star">★</span></div>
              <div className="metric-label">14,247 Reviews</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-card">
              <div className="metric-value">98%</div>
              <div className="metric-label">On-Time Delivery</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-card">
              <div className="metric-value">A+</div>
              <div className="metric-label">Average Grade</div>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="feature-badges">
            <div className="feature-badge">
              <div className="badge-icon-wrapper badge-icon-green">
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="badge-content">
                <span className="badge-title">100% Human-Written</span>
                <span className="badge-subtitle">No AI, guaranteed</span>
              </div>
            </div>
            <div className="feature-badge">
              <div className="badge-icon-wrapper badge-icon-amber">
                <Zap size={14} strokeWidth={3} />
              </div>
              <div className="badge-content">
                <span className="badge-title">Fast Delivery</span>
                <span className="badge-subtitle">As quick as 3 hours</span>
              </div>
            </div>
            <div className="feature-badge">
              <div className="badge-icon-wrapper badge-icon-blue">
                <Shield size={14} strokeWidth={3} />
              </div>
              <div className="badge-content">
                <span className="badge-title">Money-Back</span>
                <span className="badge-subtitle">100% refund policy</span>
              </div>
            </div>
          </div>

          {/* Social Proof Strip */}
          <div className="social-proof-strip">
            <div className="proof-avatars">
              <img src="/images/Jessica Miller.jpg" alt="Student" className="proof-avatar" />
              <img src="/images/Michael Johnson.jpg" alt="Student" className="proof-avatar" />
              <img src="/images/Christina.jpg" alt="Student" className="proof-avatar" />
              <div className="proof-avatar proof-avatar-more">+200</div>
            </div>
            <div className="proof-ratings">
              <div className="rating-item">
                <img src="/images/trustpilot-icon.svg" alt="Trustpilot" className="rating-logo" />
                <span className="rating-score">4.9</span>
                <Star size={12} className="rating-star-icon" fill="currentColor" />
              </div>
              <div className="rating-separator">•</div>
              <div className="rating-item">
                <img src="/images/sitejabber-icon.webp" alt="Sitejabber" className="rating-logo" />
                <span className="rating-score">4.8</span>
                <Star size={12} className="rating-star-icon" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Premium Order Form */}
        <div className="hero-form-wrapper">
          <div className="hero-form-card" data-testid="order-form">
            {/* Form Header */}
            <div className="form-header">
              <div className="form-header-badge">
                <span className="pulse-dot"></span>
                <span>Live Pricing</span>
              </div>
              <h2 className="form-title">Get Your Essay Started</h2>
              <p className="form-subtitle">See your price instantly — no signup required</p>
            </div>

            {/* Form Body */}
            <div className="form-body">
              {/* Assignment Type */}
              <div className="form-field">
                <label className="field-label">
                  <span className="label-text">Assignment Type</span>
                </label>
                <div className="select-container">
                  <select
                    value={formData.assignmentType}
                    onChange={e => setFormData(f => ({ ...f, assignmentType: e.target.value }))}
                    className="premium-select"
                    data-testid="assignment-type-select"
                  >
                    {assignmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="select-chevron" size={18} />
                </div>
              </div>

              {/* Academic Level & Deadline Row */}
              <div className="form-row-grid">
                <div className="form-field">
                  <label className="field-label">
                    <span className="label-text">Academic Level</span>
                  </label>
                  <div className="select-container">
                    <select
                      value={formData.academicLevel}
                      onChange={e => setFormData(f => ({ ...f, academicLevel: e.target.value }))}
                      className="premium-select"
                      data-testid="academic-level-select"
                    >
                      {academicLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <ChevronDown className="select-chevron" size={18} />
                  </div>
                </div>

                <div className="form-field">
                  <label className="field-label">
                    <span className="label-text">Deadline</span>
                  </label>
                  <div className="select-container">
                    <select
                      value={formData.deadline}
                      onChange={e => setFormData(f => ({ ...f, deadline: e.target.value }))}
                      className="premium-select"
                      data-testid="deadline-select"
                    >
                      {deadlines.map(dl => (
                        <option key={dl} value={dl}>{dl}</option>
                      ))}
                    </select>
                    <ChevronDown className="select-chevron" size={18} />
                  </div>
                </div>
              </div>

              {/* Number of Pages */}
              <div className="form-field">
                <label className="field-label">
                  <span className="label-text">Number of Pages</span>
                  <span className="label-hint">≈ {formData.pages * 300} words</span>
                </label>
                <div className="pages-selector">
                  <button
                    type="button"
                    onClick={() => setFormData(f => ({ ...f, pages: Math.max(1, f.pages - 1) }))}
                    className="page-btn page-btn-minus"
                    data-testid="pages-decrease"
                  >
                    −
                  </button>
                  <span className="pages-value" data-testid="pages-value">{formData.pages}</span>
                  <button
                    type="button"
                    onClick={() => setFormData(f => ({ ...f, pages: Math.min(50, f.pages + 1) }))}
                    className="page-btn page-btn-plus"
                    data-testid="pages-increase"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="price-display">
              <div className="price-breakdown">
                <span className="price-label">Estimated Price</span>
                <span className="price-per-page">${pricePerPage.toFixed(2)}/page</span>
              </div>
              <div className="price-total" data-testid="total-price">
                <span className="price-currency">$</span>
                <span className="price-amount">{price.toFixed(2)}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="cta-button"
              data-testid="place-order-btn"
            >
              <span>Place Your Order</span>
              <ArrowRight size={18} className="cta-arrow" />
            </button>

            {/* Trust Footer */}
            <div className="form-trust-footer">
              <div className="trust-badge-mini">
                <Shield size={14} />
                <span>Secure Checkout</span>
              </div>
              <div className="trust-badge-mini">
                <Check size={14} />
                <span>AI-Free Content</span>
              </div>
              <div className="trust-badge-mini">
                <Award size={14} />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* =====================================================
           PREMIUM HERO SECTION STYLES
           Sophisticated, conversion-focused design
           ===================================================== */

        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* ========== BASE SECTION ========== */
        .hero-premium-section {
          --primary-deep: #0B1F42;
          --primary-main: #1652A0;
          --primary-light: #2B6CB0;
          --accent-gold: #D4A853;
          --accent-amber: #F59E0B;
          --accent-green: #10B981;
          --surface-white: #FFFFFF;
          --surface-light: #F8FAFC;
          --text-primary: #0F172A;
          --text-secondary: #475569;
          --text-muted: #94A3B8;

          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0 80px;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ========== BACKGROUND LAYERS ========== */
        .hero-bg-gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(22, 82, 160, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(43, 108, 176, 0.1) 0%, transparent 50%),
            linear-gradient(165deg, #0B1F42 0%, #0D2B5A 30%, #0F3570 60%, #0B1F42 100%);
          z-index: 0;
        }

        .hero-bg-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0);
          background-size: 40px 40px;
          z-index: 1;
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          z-index: 1;
          animation: glowPulse 8s ease-in-out infinite;
        }

        .hero-glow-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(22, 82, 160, 0.5) 0%, transparent 70%);
          top: -200px;
          left: -100px;
          animation-delay: 0s;
        }

        .hero-glow-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212, 168, 83, 0.2) 0%, transparent 70%);
          bottom: -100px;
          right: 10%;
          animation-delay: 2s;
        }

        .hero-glow-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(43, 108, 176, 0.3) 0%, transparent 70%);
          top: 50%;
          left: 30%;
          animation-delay: 4s;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        /* ========== FLOATING ELEMENTS ========== */
        .floating-elements {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .floating-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          animation: floatBadge 6s ease-in-out infinite;
        }

        .floating-badge svg {
          color: var(--accent-gold);
        }

        .floating-badge-1 {
          top: 15%;
          right: 8%;
          animation-delay: 0s;
        }

        .floating-badge-2 {
          bottom: 20%;
          left: 5%;
          animation-delay: 3s;
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        /* ========== OWL MASCOT ========== */
        .hero-owl-container {
          position: absolute;
          bottom: 85px;
          right: 3%;
          z-index: 3;
          pointer-events: none;
          display: block;
        }

        .hero-owl-image {
          width: 300px;
          transform: scaleX(-1);
          filter: drop-shadow(0 25px 50px rgba(0,0,0,0.4));
          animation: owlFloat 5s ease-in-out infinite;
        }

        @keyframes owlFloat {
          0%, 100% { transform: scaleX(-1) translateY(0); }
          50% { transform: scaleX(-1) translateY(-12px); }
        }

        /* Owl visibility at different breakpoints */
        @media (max-width: 1279px) {
          .hero-owl-container {
            right: -5%;
            opacity: 0.35;
          }
          .hero-owl-image {
            width: 220px;
          }
        }

        @media (min-width: 1280px) {
          .hero-owl-container {
            right: 2%;
            opacity: 1;
          }
          .hero-owl-image {
            width: 340px;
          }
        }

        @media (max-width: 768px) {
          .hero-owl-container {
            display: none;
          }
        }

        /* ========== MAIN CONTAINER ========== */
        .hero-premium-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-premium-container.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (min-width: 1024px) {
          .hero-premium-container {
            grid-template-columns: 1fr 420px;
            gap: 60px;
          }
        }

        @media (min-width: 1280px) {
          .hero-premium-container {
            padding-right: 180px;
          }
        }

        /* ========== LEFT CONTENT ========== */
        .hero-content-left {
          max-width: 640px;
        }

        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(212, 168, 83, 0.15) 0%, rgba(212, 168, 83, 0.05) 100%);
          border: 1px solid rgba(212, 168, 83, 0.3);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-gold);
          margin-bottom: 24px;
          animation: shimmer 3s ease-in-out infinite;
        }

        .premium-badge svg {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { box-shadow: 0 0 20px rgba(212, 168, 83, 0.1); }
          50% { box-shadow: 0 0 30px rgba(212, 168, 83, 0.2); }
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(10deg); }
        }

        .hero-headline {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          color: var(--surface-white);
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }

        .headline-accent {
          background: linear-gradient(135deg, var(--accent-gold) 0%, #E8C47C 50%, var(--accent-gold) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 4s ease infinite;
        }

        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .headline-sub {
          display: block;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 12px;
          letter-spacing: -0.01em;
        }

        .hero-description {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 36px;
          max-width: 520px;
        }

        /* ========== TRUST METRICS ========== */
        .trust-metrics {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 28px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .trust-metrics {
            justify-content: flex-start;
          }
        }

        .metric-card {
          text-align: center;
        }

        .metric-value {
          font-size: 28px;
          font-weight: 800;
          color: var(--surface-white);
          line-height: 1;
        }

        .metric-star {
          color: var(--accent-gold);
          margin-left: 4px;
        }

        .metric-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent);
        }

        /* ========== FEATURE BADGES ========== */
        .feature-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 32px;
        }

        .feature-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .feature-badge:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        .badge-icon-wrapper {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .badge-icon-green {
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
        }

        .badge-icon-amber {
          background: rgba(245, 158, 11, 0.15);
          color: #FBBF24;
        }

        .badge-icon-blue {
          background: rgba(59, 130, 246, 0.15);
          color: #60A5FA;
        }

        .badge-content {
          display: flex;
          flex-direction: column;
        }

        .badge-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--surface-white);
        }

        .badge-subtitle {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        /* ========== SOCIAL PROOF STRIP ========== */
        .social-proof-strip {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
        }

        .proof-avatars {
          display: flex;
          align-items: center;
        }

        .proof-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid var(--primary-deep);
          margin-left: -10px;
          object-fit: cover;
        }

        .proof-avatar:first-child {
          margin-left: 0;
        }

        .proof-avatar-more {
          background: linear-gradient(135deg, var(--accent-gold) 0%, #B8942D 100%);
          color: var(--primary-deep);
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .proof-ratings {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .rating-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rating-logo {
          height: 18px;
          opacity: 0.9;
        }

        .rating-score {
          font-size: 14px;
          font-weight: 700;
          color: var(--surface-white);
        }

        .rating-star-icon {
          color: var(--accent-gold);
        }

        .rating-separator {
          color: rgba(255, 255, 255, 0.3);
        }

        /* ========== FORM CARD ========== */
        .hero-form-wrapper {
          position: relative;
          z-index: 20;
        }

        .hero-form-card {
          background: var(--surface-white);
          border-radius: 24px;
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.05),
            0 10px 20px rgba(0, 0, 0, 0.08),
            0 30px 60px rgba(0, 0, 0, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          transform: perspective(1000px) rotateY(0deg);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .hero-form-card:hover {
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.07),
            0 15px 30px rgba(0, 0, 0, 0.12),
            0 40px 80px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.15);
          transform: perspective(1000px) rotateY(-1deg) translateY(-4px);
        }

        /* Form Header */
        .form-header {
          padding: 28px 28px 24px;
          background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%);
          border-bottom: 1px solid #E2E8F0;
          text-align: center;
          position: relative;
        }

        .form-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: #059669;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .form-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .form-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Form Body */
        .form-body {
          padding: 24px 28px;
        }

        .form-field {
          margin-bottom: 18px;
        }

        .form-field:last-child {
          margin-bottom: 0;
        }

        .field-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .label-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .label-hint {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
        }

        .select-container {
          position: relative;
        }

        .premium-select {
          width: 100%;
          padding: 14px 44px 14px 16px;
          background: var(--surface-light);
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          appearance: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .premium-select:hover {
          border-color: #CBD5E1;
        }

        .premium-select:focus {
          outline: none;
          border-color: var(--primary-main);
          box-shadow: 0 0 0 4px rgba(22, 82, 160, 0.1);
        }

        .select-chevron {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .form-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Pages Selector */
        .pages-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          background: var(--surface-light);
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
        }

        .page-btn {
          width: 52px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          font-size: 20px;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-btn:hover {
          background: rgba(22, 82, 160, 0.08);
          color: var(--primary-main);
        }

        .page-btn:active {
          transform: scale(0.95);
        }

        .pages-value {
          flex: 1;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          padding: 0 16px;
          border-left: 1px solid #E2E8F0;
          border-right: 1px solid #E2E8F0;
        }

        /* Price Display */
        .price-display {
          padding: 24px 28px;
          background: linear-gradient(135deg, #0B1F42 0%, #1652A0 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0;
          border-radius: 0;
        }

        .price-breakdown {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .price-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-per-page {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }

        .price-total {
          display: flex;
          align-items: flex-start;
        }

        .price-currency {
          font-size: 20px;
          font-weight: 700;
          color: var(--surface-white);
          margin-top: 4px;
          margin-right: 2px;
        }

        .price-amount {
          font-size: 42px;
          font-weight: 800;
          color: var(--surface-white);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        /* CTA Button */
        .cta-button {
          width: calc(100% - 56px);
          margin: 24px 28px;
          padding: 18px 24px;
          background: linear-gradient(135deg, var(--accent-gold) 0%, #C49A3D 100%);
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          color: var(--primary-deep);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 
            0 4px 12px rgba(212, 168, 83, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #E8B84A 0%, #D4A853 100%);
          transform: translateY(-2px);
          box-shadow: 
            0 8px 20px rgba(212, 168, 83, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        .cta-arrow {
          transition: transform 0.3s ease;
        }

        .cta-button:hover .cta-arrow {
          transform: translateX(4px);
        }

        /* Trust Footer */
        .form-trust-footer {
          display: flex;
          justify-content: center;
          gap: 20px;
          padding: 0 28px 24px;
          flex-wrap: wrap;
        }

        .trust-badge-mini {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
        }

        .trust-badge-mini svg {
          color: var(--accent-green);
        }

        /* ========== RESPONSIVE DESIGN ========== */
        @media (max-width: 1023px) {
          .hero-premium-section {
            padding: 80px 0 60px;
            min-height: auto;
          }

          .hero-premium-container {
            text-align: center;
          }

          .hero-content-left {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .trust-metrics {
            justify-content: center;
          }

          .feature-badges {
            justify-content: center;
          }

          .social-proof-strip {
            justify-content: center;
          }

          .hero-form-wrapper {
            max-width: 440px;
            margin: 0 auto;
          }

          .floating-badge-1,
          .floating-badge-2 {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hero-premium-section {
            padding: 60px 0 40px;
          }

          .hero-premium-container {
            padding: 0 16px;
            gap: 36px;
          }

          .hero-headline {
            font-size: 32px;
          }

          .headline-sub {
            font-size: 18px;
          }

          .hero-description {
            font-size: 15px;
          }

          .trust-metrics {
            padding: 16px 20px;
            gap: 16px;
          }

          .metric-value {
            font-size: 24px;
          }

          .metric-divider {
            height: 30px;
          }

          .feature-badges {
            flex-direction: column;
            align-items: stretch;
          }

          .feature-badge {
            justify-content: flex-start;
          }

          .form-header,
          .form-body {
            padding-left: 20px;
            padding-right: 20px;
          }

          .price-display {
            padding: 20px;
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .price-breakdown {
            align-items: center;
          }

          .cta-button {
            width: calc(100% - 40px);
            margin-left: 20px;
            margin-right: 20px;
          }

          .form-trust-footer {
            padding-left: 20px;
            padding-right: 20px;
            gap: 12px;
          }

          .form-row-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
