import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Award, Clock, Users, Quote, ExternalLink, Shield, CheckCircle2, Sparkles } from 'lucide-react';

// Proof gallery data with actual images
const proofItems = [
  { id: 1, image: "/images/proofs/G1atLIAaIAArANJ.jfif" },
  { id: 2, image: "/images/proofs/G2eAWjIbEAAjjMv.png" },
  { id: 3, image: "/images/proofs/G3ISCIZXwAAoXOd.jfif" },
  { id: 4, image: "/images/proofs/G3ISCIcXcAAqJBG.jfif" },
  { id: 5, image: "/images/proofs/G3ISCIeW8AAxjeC.jfif" },
  { id: 6, image: "/images/proofs/G3ISCIeWcAEQXES.jfif" },
  { id: 7, image: "/images/proofs/G3jVEzEXoAAlsJI.jfif" },
  { id: 8, image: "/images/proofs/G3kUNblWoAAgk-i.jfif" },
  { id: 9, image: "/images/proofs/G3kW1E0WEAAPcHJ.jfif" },
  { id: 10, image: "/images/proofs/G55CrCSWEAAe2-D.jfif" },
  { id: 11, image: "/images/proofs/G6OSJr9WgAAxTV-.jfif" },
  { id: 12, image: "/images/proofs/GuYOmM7aQAAe-VN.jfif" }
];

// Written testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    major: "Psychology Major",
    university: "UCLA",
    avatar: "/images/Jessica Miller.jpg",
    rating: 5,
    text: "I was skeptical at first, but they delivered an A+ paper that exceeded my expectations. The writer understood my topic perfectly and the revisions were done within hours.",
    grade: "A+",
    essayType: "Research Paper"
  },
  {
    id: 2,
    name: "Michael T.",
    major: "MBA Student",
    university: "NYU Stern",
    avatar: "/images/Michael Johnson.jpg",
    rating: 5,
    text: "Saved my semester! Had a complex case study due in 48 hours and they delivered exceptional quality. My professor even complimented the analysis.",
    grade: "A",
    essayType: "Case Study"
  },
  {
    id: 3,
    name: "Emily R.",
    major: "English Literature",
    university: "Columbia",
    avatar: "/images/Christina.jpg",
    rating: 5,
    text: "The attention to detail was incredible. They followed my professor's specific formatting requirements perfectly. This is the third time I've used them - always impressed.",
    grade: "A+",
    essayType: "Thesis Chapter"
  }
];

// Stats data
const statsData = [
  { value: "96%", label: "A/A+ Grades", icon: Award, description: "Consistently exceptional" },
  { value: "4.9", label: "Average Rating", icon: Star, description: "Out of 5 stars" },
  { value: "14,247", label: "Essays Delivered", icon: Users, description: "Satisfied students" },
  { value: "98.7%", label: "On-Time Delivery", icon: Clock, description: "Never miss a deadline" }
];

// Trust badges
const trustBadges = [
  { icon: Shield, label: "100% Confidential", sublabel: "Your privacy guaranteed" },
  { icon: CheckCircle2, label: "Plagiarism-Free", sublabel: "Original work always" },
  { icon: Sparkles, label: "Expert Writers", sublabel: "PhD & Masters holders" }
];

export default function SocialProofSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.ceil(proofItems.length / itemsPerView) - 1;

  // Reset slide when itemsPerView changes
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(0);
    }
  }, [itemsPerView, maxSlide, currentSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxSlide]);

  // Testimonial auto-rotate
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section className="social-proof-section" data-testid="social-proof-section">
      {/* Subtle Background Pattern */}
      <div className="background-pattern" aria-hidden="true" />

      <div className="social-proof-container">
        {/* Section Header with Premium Badge */}
        <div className="section-header" data-testid="section-header">
          <div className="premium-badge">
            <Sparkles size={14} />
            <span>TRUSTED BY 14,000+ STUDENTS</span>
          </div>
          <h2 className="section-heading">
            Real Results from <span className="gradient-text">Real Students</span>
          </h2>
          <p className="section-subheading">
            Don't just take our word for it—see actual graded assignments from students
            at top universities who trusted us with their academic success.
          </p>
        </div>

        {/* Trust Badges Row */}
        <div className="trust-badges-row" data-testid="trust-badges">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="trust-badge-item">
                <div className="trust-badge-icon">
                  <Icon size={20} />
                </div>
                <div className="trust-badge-content">
                  <span className="trust-badge-label">{badge.label}</span>
                  <span className="trust-badge-sublabel">{badge.sublabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Proof Gallery */}
        <div
          className="proof-gallery"
          data-testid="proof-gallery"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="gallery-header">
            <div className="gallery-title-wrapper">
              <Award size={24} className="gallery-title-icon" />
              <div>
                <h3>Proof of Excellence Gallery</h3>
                <p>Verified student results from top universities</p>
              </div>
            </div>
            <div className="gallery-nav-hint">
              <span>Swipe to explore</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="gallery-arrow gallery-arrow-left"
            onClick={handlePrev}
            aria-label="Previous slide"
            data-testid="gallery-prev-btn"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="gallery-arrow gallery-arrow-right"
            onClick={handleNext}
            aria-label="Next slide"
            data-testid="gallery-next-btn"
          >
            <ChevronRight size={24} />
          </button>

          {/* Proof Cards Container */}
          <div className="gallery-viewport" ref={scrollRef}>
            <div
              className="gallery-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(proofItems.length / itemsPerView) }).map((_, slideIndex) => (
                <div key={slideIndex} className="gallery-slide">
                  {proofItems.slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView).map((item) => (
                    <div key={item.id} className="proof-card" data-testid={`proof-card-${item.id}`}>
                      <div className="proof-image-container">
                        <img
                          src={item.image}
                          alt="Student grade proof"
                          className="proof-image"
                          loading="lazy"
                        />
                        <div className="proof-overlay">
                          <div className="proof-verified-badge">
                            <CheckCircle2 size={14} />
                            <span>Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="gallery-dots" data-testid="gallery-dots">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                className={`gallery-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                data-testid={`gallery-dot-${index}`}
              />
            ))}
          </div>

          {/* Gallery Footer */}
          <div className="gallery-footer">
            <span className="proof-count">
              Showing <strong>{Math.min((currentSlide + 1) * itemsPerView, proofItems.length)}</strong> of <strong>{proofItems.length}</strong> success stories
            </span>
          </div>
        </div>

        {/* Featured Testimonial (Large) */}
        <div className="featured-testimonial-section" data-testid="featured-testimonial">
          <div className="featured-testimonial-wrapper">
            <div className="featured-quote-mark">
              <Quote size={48} />
            </div>

            <div className="featured-testimonial-content">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`featured-testimonial-item ${activeTestimonial === index ? 'active' : ''}`}
                >
                  <p className="featured-testimonial-text">"{testimonial.text}"</p>
                  <div className="featured-testimonial-author">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="featured-avatar"
                    />
                    <div className="featured-author-info">
                      <div className="featured-author-name-row">
                        <span className="featured-author-name">{testimonial.name}</span>
                        <span className="featured-grade-badge">{testimonial.grade}</span>
                      </div>
                      <span className="featured-author-details">{testimonial.major} • {testimonial.university}</span>
                      <div className="featured-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < testimonial.rating ? 'star-filled' : 'star-empty'}
                          />
                        ))}
                        <span className="featured-essay-type">{testimonial.essayType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Navigation Dots */}
            <div className="testimonial-nav-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-nav-dot ${activeTestimonial === index ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                  data-testid={`testimonial-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar - Premium Dark Design */}
        <div className="stats-bar" data-testid="stats-bar">
          <div className="stats-bar-inner">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-item" data-testid={`stat-item-${index}`}>
                  <div className="stat-icon-wrapper">
                    <Icon size={28} className="stat-icon" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-description">{stat.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Aggregators - Refined Design */}
        <div className="review-platforms" data-testid="review-platforms">
          <p className="platforms-heading">Trusted Across Major Review Platforms</p>
          <div className="platforms-grid">
            <a href="#" className="platform-badge" data-testid="trustpilot-badge">
              <img src="/images/trustpilot-icon.svg" alt="Trustpilot" className="platform-logo" />
              <div className="platform-info">
                <div className="platform-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="platform-star" />
                  ))}
                </div>
                <span className="platform-rating">4.9/5 on Trustpilot</span>
              </div>
              <ExternalLink size={14} className="platform-link-icon" />
            </a>
            <a href="#" className="platform-badge" data-testid="sitejabber-badge">
              <img src="/images/sitejabber-icon.webp" alt="Sitejabber" className="platform-logo" />
              <div className="platform-info">
                <div className="platform-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="platform-star" />
                  ))}
                </div>
                <span className="platform-rating">4.8/5 on Sitejabber</span>
              </div>
              <ExternalLink size={14} className="platform-link-icon" />
            </a>
            <a href="#" className="platform-badge" data-testid="google-badge">
              <div className="platform-logo-google">G</div>
              <div className="platform-info">
                <div className="platform-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="platform-star" />
                  ))}
                </div>
                <span className="platform-rating">4.9/5 on Google</span>
              </div>
              <ExternalLink size={14} className="platform-link-icon" />
            </a>
          </div>
        </div>

        {/* CTA Section - Premium Design */}
        <div className="social-proof-cta" data-testid="social-proof-cta">
          <div className="cta-content">
            <h3 className="cta-heading">Ready to achieve grades like these?</h3>
            <p className="cta-subtext">Join thousands of successful students. Your A+ is just a click away.</p>
          </div>
          <button
            onClick={() => navigate('/order-now')}
            className="cta-primary"
            data-testid="get-started-btn"
          >
            <span>Get Started Now</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        /* ========== CSS VARIABLES ========== */
        .social-proof-section {
          /* Primary Colors */
          --deep-navy: #0B1F42;
          --royal-blue: #1652A0;
          --light-blue: #2B6CB0;
          
          /* Accent Colors */
          --gold: #D4A853;
          --amber: #F59E0B;
          --green: #10B981;
          
          /* Neutrals */
          --white: #FFFFFF;
          --surface-light: #F8FAFC;
          --text-primary: #0B1F42;
          --text-secondary: #475569;
          --text-muted: #64748B;
          --border-light: #E2E8F0;
          
          /* Typography */
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ========== SECTION BASE ========== */
        .social-proof-section {
          background: linear-gradient(180deg, var(--white) 0%, var(--surface-light) 50%, var(--white) 100%);
          padding: 120px 0;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        .background-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(22, 82, 160, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(212, 168, 83, 0.04) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .social-proof-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* ========== SECTION HEADER ========== */
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: linear-gradient(135deg, rgba(212, 168, 83, 0.12) 0%, rgba(212, 168, 83, 0.06) 100%);
          border: 1px solid rgba(212, 168, 83, 0.3);
          border-radius: 100px;
          margin-bottom: 24px;
        }
        
        .premium-badge svg {
          color: var(--gold);
        }
        
        .premium-badge span {
          font-size: 12px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 1.5px;
        }
        
        .section-heading {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          color: var(--deep-navy);
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--light-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .section-subheading {
          font-size: 18px;
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 640px;
          margin: 0 auto;
        }

        /* ========== TRUST BADGES ROW ========== */
        .trust-badges-row {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        
        .trust-badge-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }
        
        .trust-badge-item:hover {
          border-color: var(--royal-blue);
          box-shadow: 0 4px 16px rgba(22, 82, 160, 0.1);
          transform: translateY(-2px);
        }
        
        .trust-badge-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--green);
        }
        
        .trust-badge-content {
          display: flex;
          flex-direction: column;
        }
        
        .trust-badge-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .trust-badge-sublabel {
          font-size: 12px;
          color: var(--text-muted);
        }

        /* ========== PROOF GALLERY ========== */
        .proof-gallery {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          position: relative;
          margin-bottom: 64px;
          overflow: hidden;
        }
        
        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
        }
        
        .gallery-title-wrapper {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        
        .gallery-title-icon {
          color: var(--gold);
        }
        
        .gallery-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--deep-navy);
          margin: 0;
        }
        
        .gallery-header p {
          font-size: 13px;
          color: var(--text-muted);
          margin: 4px 0 0 0;
        }
        
        .gallery-nav-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-muted);
        }

        /* Navigation Arrows */
        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--royal-blue);
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .gallery-arrow:hover {
          background: var(--royal-blue);
          color: var(--white);
          border-color: var(--royal-blue);
          transform: translateY(-50%) scale(1.05);
        }
        
        .gallery-arrow-left { left: 12px; }
        .gallery-arrow-right { right: 12px; }

        /* Gallery Viewport */
        .gallery-viewport {
          overflow: hidden;
          margin: 0 auto;
        }
        
        .gallery-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .gallery-slide {
          min-width: 100%;
          display: flex;
          justify-content: center;
          gap: 24px;
          padding: 8px;
          box-sizing: border-box;
        }

        /* Proof Card */
        .proof-card {
          flex: 1;
          min-width: 260px;
          max-width: 340px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .proof-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(11, 31, 66, 0.12);
          border-color: var(--royal-blue);
        }

        .proof-image-container {
          position: relative;
          overflow: hidden;
          background: var(--surface-light);
        }
        
        .proof-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .proof-card:hover .proof-image {
          transform: scale(1.03);
        }
        
        .proof-overlay {
          position: absolute;
          top: 12px;
          right: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .proof-card:hover .proof-overlay {
          opacity: 1;
        }
        
        .proof-verified-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(16, 185, 129, 0.95);
          color: white;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
        }

        /* Gallery Dots */
        .gallery-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
        }
        
        .gallery-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border-light);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .gallery-dot:hover {
          background: var(--light-blue);
        }
        
        .gallery-dot.active {
          width: 32px;
          border-radius: 100px;
          background: var(--royal-blue);
        }
        
        .gallery-footer {
          text-align: center;
          margin-top: 16px;
        }
        
        .proof-count {
          font-size: 13px;
          color: var(--text-muted);
        }
        
        .proof-count strong {
          color: var(--royal-blue);
          font-weight: 600;
        }

        /* ========== FEATURED TESTIMONIAL ========== */
        .featured-testimonial-section {
          margin-bottom: 64px;
        }
        
        .featured-testimonial-wrapper {
          position: relative;
          background: linear-gradient(135deg, var(--deep-navy) 0%, #132D5C 100%);
          border-radius: 24px;
          padding: 48px;
          overflow: hidden;
        }
        
        .featured-testimonial-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(212, 168, 83, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .featured-quote-mark {
          position: absolute;
          top: 32px;
          left: 40px;
          color: rgba(212, 168, 83, 0.3);
          z-index: 1;
        }
        
        .featured-testimonial-content {
          position: relative;
          z-index: 2;
          min-height: 200px;
        }
        
        .featured-testimonial-item {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
          pointer-events: none;
        }
        
        .featured-testimonial-item.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        
        .featured-testimonial-text {
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 500;
          color: var(--white);
          line-height: 1.6;
          margin-bottom: 32px;
          padding-left: 24px;
        }
        
        .featured-testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-left: 24px;
        }
        
        .featured-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(212, 168, 83, 0.4);
        }
        
        .featured-author-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .featured-author-name-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .featured-author-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
        }
        
        .featured-grade-badge {
          padding: 4px 12px;
          background: linear-gradient(135deg, var(--green) 0%, #059669 100%);
          color: white;
          font-size: 12px;
          font-weight: 700;
          border-radius: 100px;
        }
        
        .featured-author-details {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .featured-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }
        
        .featured-rating .star-filled {
          color: var(--gold);
          fill: var(--gold);
        }
        
        .featured-rating .star-empty {
          color: rgba(255, 255, 255, 0.3);
        }
        
        .featured-essay-type {
          margin-left: 12px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .testimonial-nav-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
          position: relative;
          z-index: 2;
        }
        
        .testimonial-nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .testimonial-nav-dot:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        .testimonial-nav-dot.active {
          background: var(--gold);
          width: 24px;
          border-radius: 100px;
        }

        /* ========== STATS BAR ========== */
        .stats-bar {
          background: linear-gradient(135deg, var(--deep-navy) 0%, #0D2649 100%);
          border-radius: 20px;
          padding: 4px;
          margin-bottom: 56px;
        }
        
        .stats-bar-inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 32px 24px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        
        .stat-item:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        
        .stat-icon-wrapper {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(212, 168, 83, 0.2) 0%, rgba(212, 168, 83, 0.1) 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .stat-icon {
          color: var(--gold);
        }
        
        .stat-content {
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        
        .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
          margin-top: 2px;
        }
        
        .stat-description {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
        }

        /* ========== REVIEW PLATFORMS ========== */
        .review-platforms {
          text-align: center;
          margin-bottom: 64px;
        }
        
        .platforms-heading {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .platforms-grid {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .platform-badge {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 24px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .platform-badge:hover {
          border-color: var(--royal-blue);
          box-shadow: 0 8px 24px rgba(22, 82, 160, 0.1);
          transform: translateY(-3px);
        }
        
        .platform-logo {
          width: 36px;
          height: 36px;
          object-fit: contain;
        }
        
        .platform-logo-google {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 75%, #EA4335 100%);
          color: white;
          font-size: 20px;
          font-weight: 700;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .platform-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }
        
        .platform-stars {
          display: flex;
          gap: 2px;
        }
        
        .platform-star {
          color: var(--amber);
          fill: var(--amber);
        }
        
        .platform-rating {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .platform-link-icon {
          color: var(--text-muted);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .platform-badge:hover .platform-link-icon {
          opacity: 1;
          color: var(--royal-blue);
        }

        /* ========== CTA SECTION ========== */
        .social-proof-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 40px 48px;
          background: linear-gradient(135deg, var(--surface-light) 0%, var(--white) 100%);
          border: 1px solid var(--border-light);
          border-radius: 20px;
        }
        
        .cta-content {
          flex: 1;
        }
        
        .cta-heading {
          font-size: 24px;
          font-weight: 700;
          color: var(--deep-navy);
          margin: 0 0 8px 0;
        }
        
        .cta-subtext {
          font-size: 15px;
          color: var(--text-muted);
          margin: 0;
        }
        
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 40px;
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--light-blue) 100%);
          color: var(--white);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(22, 82, 160, 0.3);
          flex-shrink: 0;
        }
        
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(22, 82, 160, 0.4);
        }
        
        .cta-primary:active {
          transform: translateY(0);
        }

        /* ========== RESPONSIVE STYLES ========== */
        @media (max-width: 1200px) {
          .stats-bar-inner {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 1024px) {
          .social-proof-section {
            padding: 80px 0;
          }
          
          .proof-card {
            min-width: 240px;
          }
          
          .featured-testimonial-wrapper {
            padding: 40px 32px;
          }
        }
        
        @media (max-width: 768px) {
          .social-proof-section {
            padding: 60px 0;
          }
          
          .social-proof-container {
            padding: 0 16px;
          }
          
          .trust-badges-row {
            gap: 16px;
          }
          
          .trust-badge-item {
            padding: 10px 16px;
          }
          
          .proof-gallery {
            padding: 24px 16px;
          }
          
          .gallery-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .gallery-arrow {
            width: 40px;
            height: 40px;
          }
          
          .gallery-arrow-left { left: 8px; }
          .gallery-arrow-right { right: 8px; }
          
          .featured-testimonial-wrapper {
            padding: 32px 24px;
          }
          
          .featured-quote-mark {
            top: 20px;
            left: 20px;
          }
          
          .featured-quote-mark svg {
            width: 32px;
            height: 32px;
          }
          
          .featured-testimonial-text {
            padding-left: 0;
          }
          
          .featured-testimonial-author {
            padding-left: 0;
          }
          
          .stats-bar-inner {
            grid-template-columns: 1fr;
          }
          
          .stat-item {
            padding: 24px 20px;
          }
          
          .platforms-grid {
            flex-direction: column;
            align-items: center;
          }
          
          .platform-badge {
            width: 100%;
            max-width: 320px;
            justify-content: flex-start;
          }
          
          .social-proof-cta {
            flex-direction: column;
            text-align: center;
            padding: 32px 24px;
          }
          
          .cta-primary {
            width: 100%;
            justify-content: center;
          }
        }
        
        @media (max-width: 640px) {
          .section-heading {
            font-size: 28px;
          }
          
          .section-subheading {
            font-size: 16px;
          }
          
          .trust-badges-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .proof-card {
            min-width: 200px;
            max-width: 300px;
          }
          
          .gallery-slide {
            gap: 16px;
          }
          
          .featured-testimonial-content {
            min-height: 240px;
          }
          
          .featured-testimonial-author {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .stat-value {
            font-size: 28px;
          }
        }
        
        @media (max-width: 480px) {
          .section-heading {
            font-size: 24px;
          }
          
          .premium-badge span {
            font-size: 10px;
          }
          
          .gallery-title-wrapper {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .gallery-header h3 {
            font-size: 18px;
          }
          
          .cta-heading {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
