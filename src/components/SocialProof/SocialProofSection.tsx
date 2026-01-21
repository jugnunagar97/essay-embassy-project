import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Award, Clock, Users, Quote, ExternalLink, Shield, CheckCircle2, Sparkles, Calendar, Tag } from 'lucide-react';

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

// Written testimonials - Genuine, believable reviews without user photos
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    tag: "Repeat Customer",
    rating: 5,
    date: "March 14, 2024",
    text: "Submitted a 15-page research methodology paper on short notice. The writer clearly understood qualitative research frameworks — my advisor only requested minor citation adjustments. Not my first order, and the consistency is what keeps me coming back.",
    subject: "Research Methods"
  },
  {
    id: 2,
    name: "Marcus T.",
    tag: "First-Time User",
    rating: 5,
    date: "November 8, 2023",
    text: "Was honestly skeptical because I've been burned before by similar services. But this was different — the case analysis actually reflected the course material we covered. My professor commented on the 'strong analytical framework.' Worth every dollar.",
    subject: "Business Strategy"
  },
  {
    id: 3,
    name: "Jennifer K.",
    tag: "Verified Purchase",
    rating: 5,
    date: "January 22, 2025",
    text: "Third semester using this service for my capstone projects. What I appreciate most is the communication — they actually read my rubric and followed it. The turnaround on revisions is also surprisingly fast for the quality you get.",
    subject: "Healthcare Admin"
  },
  {
    id: 4,
    name: "David L.",
    tag: "Graduate Student",
    rating: 5,
    date: "August 3, 2024",
    text: "Needed a literature review for my thesis proposal. The depth of sources they found was impressive — several papers I hadn't encountered in my own research. My committee approved the proposal on the first submission.",
    subject: "Environmental Science"
  },
  {
    id: 5,
    name: "Rachel P.",
    tag: "Returning Client",
    rating: 5,
    date: "December 19, 2023",
    text: "The statistical analysis section was the main reason I reached out. They not only ran the tests correctly but explained the methodology in a way that made sense. My TA said it was one of the cleaner SPSS outputs she'd reviewed.",
    subject: "Psychology Stats"
  },
  {
    id: 6,
    name: "Anthony W.",
    tag: "Verified Purchase",
    rating: 5,
    date: "February 6, 2025",
    text: "I'll admit I was in a tough spot with overlapping deadlines. The finance paper they delivered covered DCF analysis exactly how our textbook approaches it. Clean formatting, proper Excel models attached. Lifesaver doesn't begin to describe it.",
    subject: "Corporate Finance"
  },
  {
    id: 7,
    name: "Christina B.",
    tag: "Long-term Client",
    rating: 5,
    date: "October 11, 2024",
    text: "Four orders in, and they've never missed a deadline or delivered anything below expectations. My comparative politics essay got the highest mark in my section. The argument structure was exactly what my professor looks for.",
    subject: "Political Science"
  },
  {
    id: 8,
    name: "Michael R.",
    tag: "First-Time User",
    rating: 5,
    date: "July 29, 2023",
    text: "Took a chance based on a friend's recommendation for my nursing care plan assignment. The clinical reasoning was spot-on, and the care interventions were evidence-based with recent journal citations. Exceeded my expectations.",
    subject: "Nursing Studies"
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRef = useRef(null);

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

  // Testimonial navigation
  const goToPrevTestimonial = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goToNextTestimonial = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  // Get visible testimonials (prev, current, next)
  const getVisibleTestimonials = () => {
    const prev = (activeTestimonial - 1 + testimonials.length) % testimonials.length;
    const next = (activeTestimonial + 1) % testimonials.length;
    return { prev, current: activeTestimonial, next };
  };

  const visibleTestimonials = getVisibleTestimonials();

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

  // Render a testimonial card
  const renderTestimonialCard = (testimonial: typeof testimonials[0], position: 'left' | 'center' | 'right') => {
    return (
      <div
        className={`testimonial-carousel-card ${position}`}
        key={testimonial.id}
      >
        <div className="testimonial-card-inner">
          {/* Quote Icon */}
          <div className="testimonial-quote-icon">
            <Quote size={24} />
          </div>

          {/* Review Text */}
          <p className="testimonial-review-text">"{testimonial.text}"</p>

          {/* Divider */}
          <div className="testimonial-divider" />

          {/* Author Info */}
          <div className="testimonial-author-section">
            <div className="testimonial-author-top">
              <span className="testimonial-author-name">{testimonial.name}</span>
              <span className="testimonial-tag">
                <Tag size={12} />
                {testimonial.tag}
              </span>
            </div>
            <div className="testimonial-meta">
              <span className="testimonial-subject">{testimonial.subject}</span>
              <span className="testimonial-date">
                <Calendar size={12} />
                {testimonial.date}
              </span>
            </div>
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < testimonial.rating ? 'star-filled' : 'star-empty'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
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

        {/* NEW: Featured Testimonial Carousel with 3-Card Layout */}
        <div className="testimonial-carousel-section" data-testid="testimonial-carousel">
          <div className="testimonial-carousel-header">
            <h3>What Our Clients Say</h3>
            <p>Authentic reviews from verified customers</p>
          </div>

          <div className="testimonial-carousel-wrapper">
            {/* Left Navigation Arrow */}
            <button
              className="testimonial-nav-arrow testimonial-nav-left"
              onClick={goToPrevTestimonial}
              aria-label="Previous testimonial"
              disabled={isTransitioning}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Cards Container */}
            <div className="testimonial-cards-container">
              {/* Left Card (Transparent) */}
              {renderTestimonialCard(testimonials[visibleTestimonials.prev], 'left')}

              {/* Center Card (Active) */}
              {renderTestimonialCard(testimonials[visibleTestimonials.current], 'center')}

              {/* Right Card (Transparent) */}
              {renderTestimonialCard(testimonials[visibleTestimonials.next], 'right')}
            </div>

            {/* Right Navigation Arrow */}
            <button
              className="testimonial-nav-arrow testimonial-nav-right"
              onClick={goToNextTestimonial}
              aria-label="Next testimonial"
              disabled={isTransitioning}
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="testimonial-carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${activeTestimonial === index ? 'active' : ''}`}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setActiveTestimonial(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
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

        /* ========== NEW TESTIMONIAL CAROUSEL ========== */
        .testimonial-carousel-section {
          margin-bottom: 64px;
          padding: 48px 0;
        }

        .testimonial-carousel-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .testimonial-carousel-header h3 {
          font-size: 28px;
          font-weight: 700;
          color: var(--deep-navy);
          margin: 0 0 8px 0;
        }

        .testimonial-carousel-header p {
          font-size: 15px;
          color: var(--text-muted);
          margin: 0;
        }

        .testimonial-carousel-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          position: relative;
          padding: 20px 0;
        }

        /* Navigation Arrows */
        .testimonial-nav-arrow {
          width: 56px;
          height: 56px;
          background: var(--white);
          border: 2px solid var(--border-light);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--royal-blue);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          z-index: 10;
        }

        .testimonial-nav-arrow:hover:not(:disabled) {
          background: var(--royal-blue);
          color: var(--white);
          border-color: var(--royal-blue);
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(22, 82, 160, 0.3);
        }

        .testimonial-nav-arrow:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Cards Container */
        .testimonial-cards-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          perspective: 1000px;
          width: 100%;
          max-width: 1000px;
        }

        /* Individual Testimonial Card */
        .testimonial-carousel-card {
          background: linear-gradient(145deg, #0D2449 0%, #132D5C 50%, #0B1F42 100%);
          border-radius: 20px;
          padding: 32px;
          position: relative;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(11, 31, 66, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .testimonial-carousel-card.center {
          flex: 0 0 420px;
          min-height: 340px;
          opacity: 1;
          transform: scale(1) translateZ(0);
          z-index: 3;
        }

        .testimonial-carousel-card.left,
        .testimonial-carousel-card.right {
          flex: 0 0 280px;
          min-height: 280px;
          opacity: 0.4;
          transform: scale(0.85);
          z-index: 1;
          filter: blur(1px);
        }

        .testimonial-carousel-card.left {
          transform: scale(0.85) translateX(20px);
        }

        .testimonial-carousel-card.right {
          transform: scale(0.85) translateX(-20px);
        }

        .testimonial-card-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Quote Icon */
        .testimonial-quote-icon {
          color: rgba(212, 168, 83, 0.4);
          margin-bottom: 16px;
        }

        /* Review Text */
        .testimonial-review-text {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.95);
          margin: 0 0 24px 0;
          flex-grow: 1;
          font-weight: 400;
        }

        .testimonial-carousel-card.center .testimonial-review-text {
          font-size: 17px;
        }

        .testimonial-carousel-card.left .testimonial-review-text,
        .testimonial-carousel-card.right .testimonial-review-text {
          font-size: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Divider */
        .testimonial-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212, 168, 83, 0.3) 50%, transparent 100%);
          margin-bottom: 20px;
        }

        /* Author Section */
        .testimonial-author-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .testimonial-author-top {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .testimonial-author-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
        }

        .testimonial-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: #4ADE80;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .testimonial-tag svg {
          width: 10px;
          height: 10px;
        }

        .testimonial-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .testimonial-subject {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .testimonial-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.45);
        }

        .testimonial-date svg {
          width: 12px;
          height: 12px;
        }

        .testimonial-rating {
          display: flex;
          gap: 3px;
          margin-top: 4px;
        }

        .testimonial-rating .star-filled {
          color: var(--gold);
          fill: var(--gold);
        }

        .testimonial-rating .star-empty {
          color: rgba(255, 255, 255, 0.2);
        }

        /* Carousel Dots */
        .testimonial-carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
        }

        .carousel-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-light);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-indicator:hover {
          background: var(--light-blue);
        }

        .carousel-indicator.active {
          width: 28px;
          border-radius: 100px;
          background: var(--gold);
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
          color: #FFFFFF !important;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        
        .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF !important;
          margin-top: 2px;
        }
        
        .stat-description {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7) !important;
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
          color: #0B1F42 !important;
          margin: 0 0 8px 0;
        }
        
        .cta-subtext {
          font-size: 15px;
          color: #475569 !important;
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

          .testimonial-cards-container {
            gap: 16px;
          }

          .testimonial-carousel-card.center {
            flex: 0 0 360px;
          }

          .testimonial-carousel-card.left,
          .testimonial-carousel-card.right {
            flex: 0 0 220px;
          }
        }
        
        @media (max-width: 1024px) {
          .social-proof-section {
            padding: 80px 0;
          }
          
          .proof-card {
            min-width: 240px;
          }

          .testimonial-carousel-card.left,
          .testimonial-carousel-card.right {
            display: none;
          }

          .testimonial-carousel-card.center {
            flex: 1;
            max-width: 500px;
          }

          .testimonial-nav-arrow {
            width: 48px;
            height: 48px;
          }
        }
        
        @media (max-width: 768px) {
          .social-proof-section {
            padding: 48px 0;
          }
          
          .social-proof-container {
            padding: 0 16px;
          }
          
          .trust-badges-row {
            gap: 12px;
          }
          
          .trust-badge-item {
            padding: 8px 12px;
            font-size: 13px;
          }
          
          .proof-gallery {
            padding: 20px 16px;
          }
          
          .gallery-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .gallery-arrow {
            width: 32px;
            height: 32px;
          }
          
          .gallery-arrow svg {
            width: 16px;
            height: 16px;
          }
          
          .gallery-arrow-left { left: 4px; }
          .gallery-arrow-right { right: 4px; }

          .testimonial-carousel-wrapper {
            gap: 8px;
            padding: 10px 0;
          }

          .testimonial-carousel-card.center {
            padding: 20px 16px;
            min-height: auto;
            width: 100%;
          }
          
          .testimonial-nav-arrow {
            width: 32px;
            height: 32px;
            min-width: 32px; /* Prevent shrinking */
          }

          .testimonial-nav-arrow svg {
            width: 16px;
            height: 16px;
          }

          .testimonial-review-text {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
          
          .stats-bar-inner {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .stat-item {
            padding: 20px 16px;
          }
          
          .platforms-grid {
            flex-direction: column;
            align-items: center;
          }
          
          .platform-badge {
            width: 100%;
            max-width: 100%;
            justify-content: flex-start;
          }
          
          .social-proof-cta {
            flex-direction: column;
            text-align: center;
            padding: 24px 20px;
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

          .testimonial-carousel-header h3 {
            font-size: 24px;
          }

          .testimonial-nav-arrow {
            width: 44px;
            height: 44px;
          }

          .testimonial-nav-arrow svg {
            width: 22px;
            height: 22px;
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

          .testimonial-carousel-card.center {
            padding: 20px;
          }

          .testimonial-author-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
