import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Award, Clock, Users, Quote, ExternalLink } from 'lucide-react';

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
  { value: "96%", label: "A/A+ Grades", icon: Award },
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "14,247", label: "Essays Delivered", icon: Users },
  { value: "98.7%", label: "On-Time Delivery", icon: Clock }
];

export default function SocialProofSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
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
    <section className="social-proof-section">
      <div className="social-proof-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">PROVEN RESULTS FROM REAL STUDENTS</span>
          <h2 className="section-heading">See the Grades Our Students Actually Get</h2>
          <p className="section-subheading">
            Don't just read reviews—see actual graded assignments from students who trusted us with their success. Swipe through real results from top universities.
          </p>
        </div>

        {/* Interactive Proof Gallery */}
        <div
          className="proof-gallery"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="gallery-header">
            <h3>Proof of Excellence Gallery</h3>
            <p>Swipe to see more success stories →</p>
          </div>

          {/* Navigation Arrows */}
          <button className="gallery-arrow gallery-arrow-left" onClick={handlePrev}>
            <ChevronLeft size={28} />
          </button>
          <button className="gallery-arrow gallery-arrow-right" onClick={handleNext}>
            <ChevronRight size={28} />
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
                    <div key={item.id} className="proof-card">
                      {/* Screenshot Image Only */}
                      <div className="proof-image-container">
                        <img
                          src={item.image}
                          alt="Student grade proof"
                          className="proof-image"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="gallery-dots">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                className={`gallery-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* View All Link */}
          <div className="gallery-footer">
            <span className="proof-count">Showing {Math.min((currentSlide + 1) * itemsPerView, proofItems.length)} of {proofItems.length} success stories</span>
          </div>
        </div>

        {/* Written Testimonials Grid */}
        <div className="testimonials-section">
          <h3 className="testimonials-heading">What Our Students Say</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-author">
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-info">{testimonial.major} • {testimonial.university}</span>
                  </div>
                  <div className="testimonial-grade-badge">{testimonial.grade}</div>
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
                <Quote size={24} className="quote-icon" />
                <p className="testimonial-text">{testimonial.text}</p>
                <span className="testimonial-type">{testimonial.essayType}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-item">
                <Icon size={28} className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Review Aggregators */}
        <div className="review-platforms">
          <div className="platform-badge">
            <img src="/images/trustpilot-icon.svg" alt="Trustpilot" className="platform-logo" />
            <div className="platform-info">
              <div className="platform-stars">★★★★★</div>
              <span className="platform-rating">4.9/5 on Trustpilot</span>
            </div>
            <ExternalLink size={16} className="platform-link" />
          </div>
          <div className="platform-badge">
            <img src="/images/sitejabber-icon.webp" alt="Sitejabber" className="platform-logo" />
            <div className="platform-info">
              <div className="platform-stars">★★★★★</div>
              <span className="platform-rating">4.8/5 on Sitejabber</span>
            </div>
            <ExternalLink size={16} className="platform-link" />
          </div>
          <div className="platform-badge">
            <div className="platform-logo-text">G</div>
            <div className="platform-info">
              <div className="platform-stars">★★★★★</div>
              <span className="platform-rating">4.9/5 on Google</span>
            </div>
            <ExternalLink size={16} className="platform-link" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="social-proof-cta">
          <p className="cta-text">Ready to get grades like these?</p>
          <button
            onClick={() => navigate('/order-now')}
            className="cta-primary"
          >
            Get Started Now
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .social-proof-section {
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
          padding: 100px 0;
          position: relative;
          overflow: hidden; /* Critical to prevent page scroll issues */
          width: 100%;
          max-width: 100vw;
        }
        
        .social-proof-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          width: 100%;
          box-sizing: border-box;
        }
        
        /* ========== SECTION HEADER ========== */
        .section-header {
          text-align: center;
          margin-bottom: 48px;
          padding: 0 16px;
        }
        
        .section-eyebrow {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          color: #10B981;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        
        .section-heading {
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: clamp(28px, 4vw, 42px); /* Fluid font size */
          font-weight: 700;
          color: #1E293B;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        
        .section-subheading {
          font-size: 18px;
          font-weight: 400;
          color: #64748B;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* ========== PROOF GALLERY ========== */
        .proof-gallery {
          background: linear-gradient(135deg, #F0F7FF 0%, #FFFFFF 100%);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          position: relative;
          margin-bottom: 64px;
          overflow: hidden; /* Ensure arrows don't cause overflow */
        }
        
        .gallery-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .gallery-header h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1E293B;
          margin-bottom: 8px;
        }
        
        .gallery-header p {
          font-size: 14px;
          color: #64748B;
        }
        
        /* Navigation Arrows */
        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          background: #FFFFFF;
          border: none;
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D6BC7;
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .gallery-arrow:hover {
          background: #2D6BC7;
          color: #FFFFFF;
          transform: translateY(-50%) scale(1.1);
        }
        
        .gallery-arrow-left { left: 10px; }
        .gallery-arrow-right { right: 10px; }
        
        /* Gallery Viewport */
        .gallery-viewport {
          overflow: hidden;
          margin: 0 auto;
          width: 100%;
        }
        
        .gallery-track {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }
        
        .gallery-slide {
          min-width: 100%;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          gap: 24px;
          padding: 10px 4px;
          box-sizing: border-box;
        }
        
        /* Proof Card */
        .proof-card {
          flex: 1; /* Allow flexible width */
          min-width: 260px; /* Minimum readable width */
          max-width: 340px;
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .proof-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }
        
        /* Proof Image */
        .proof-image-container {
          overflow: hidden;
          background: #F1F5F9;
        }
        
        .proof-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }
        
        .proof-card:hover .proof-image {
          transform: scale(1.02);
        }
        
        /* Gallery Dots */
        .gallery-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
        }
        
        .gallery-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #CBD5E1;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .gallery-dot:hover {
          background: #94A3B8;
        }
        
        .gallery-dot.active {
          width: 14px;
          height: 14px;
          background: #2D6BC7;
        }
        
        .gallery-footer {
          text-align: center;
          margin-top: 16px;
        }
        
        .proof-count {
          font-size: 13px;
          color: #64748B;
        }
        
        /* ========== TESTIMONIALS GRID ========== */
        .testimonials-section {
          margin-bottom: 64px;
        }
        
        .testimonials-heading {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          color: #1E293B;
          margin-bottom: 32px;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 10px;
        }
        
        .testimonial-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 24px;
          position: relative;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .testimonial-card:hover {
          border-color: #2D6BC7;
          box-shadow: 0 8px 32px rgba(45, 107, 199, 0.12);
          transform: translateY(-4px);
        }
        
        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .testimonial-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .testimonial-author {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .author-name {
          font-size: 16px;
          font-weight: 600;
          color: #1E293B;
        }
        
        .author-info {
          font-size: 12px;
          color: #64748B;
        }
        
        .testimonial-grade-badge {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          font-size: 14px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 20px;
        }
        
        .testimonial-rating {
          display: flex;
          gap: 2px;
          margin-bottom: 16px;
        }
        
        .star-filled { color: #FBBF24; fill: #FBBF24; }
        .star-empty { color: #E2E8F0; }
        
        .quote-icon {
          color: #E2E8F0;
          margin-bottom: 8px;
        }
        
        .testimonial-text {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        .testimonial-type {
          font-size: 12px;
          font-weight: 600;
          color: #2D6BC7;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* ========== STATS BAR ========== */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          padding: 40px;
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          border-radius: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap; /* Safe wrapping */
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .stat-icon { color: #10B981; }
        
        .stat-content {
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.1;
        }
        
        .stat-label {
          font-size: 14px;
          color: #94A3B8;
        }
        
        /* ========== REVIEW PLATFORMS ========== */
        .review-platforms {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        
        .platform-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 16px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .platform-badge:hover {
          border-color: #2D6BC7;
          box-shadow: 0 4px 16px rgba(45, 107, 199, 0.1);
        }
        
        .platform-logo { width: 32px; height: 32px; object-fit: contain; }
        
        .platform-logo-text {
          width: 32px; height: 32px; background: #4285F4;
          color: white; font-size: 20px; font-weight: 700;
          border-radius: 6px; display: flex; align-items: center;
          justify-content: center;
        }
        
        .platform-info { display: flex; flex-direction: column; }
        
        .platform-stars { color: #FBBF24; font-size: 14px; letter-spacing: 1px; }
        .platform-rating { font-size: 13px; color: #64748B; }
        .platform-link { color: #94A3B8; }
        
        /* ========== CTA ========== */
        .social-proof-cta { text-align: center; }
        
        .cta-text {
          font-size: 20px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 20px;
        }
        
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 48px;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFFFFF;
          font-size: 18px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
        }
        
        .cta-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
        }
        
        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
           .proof-card {
            min-width: 240px;
          }
        }
        
        @media (max-width: 768px) {
          .social-proof-section {
            padding: 60px 0;
          }
          
          .social-proof-container {
            padding: 0 20px;
          }
          
          .gallery-slide {
             gap: 16px;
          }
          
          /* Force single column for testimonials on tablet/mobile */
          .testimonials-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }
          
          /* Center stats */
          .stats-bar {
            gap: 24px;
            padding: 24px;
          }
          
          .stat-item {
             width: 100%;
             max-width: 240px;
          }
        }
        
        @media (max-width: 640px) {
           .proof-gallery {
              padding: 24px 12px;
           }
           
           /* On mobile, we use 1 item per view.
              Ensure the card takes full available width but respects padding.
           */
           .proof-card {
              min-width: 200px; /* relax min width */
              width: 100%;
              max-width: 320px;
           }
           
           .gallery-arrow {
              width: 36px;
              height: 36px;
           }
           .gallery-arrow-left { left: 4px; }
           .gallery-arrow-right { right: 4px; }
           
           .platform-badge {
              width: 100%;
              max-width: 320px;
              justify-content: center;
           }
           
           .cta-primary {
              width: 100%;
              justify-content: center;
              padding: 16px;
           }
        }
        
        @media (max-width: 480px) {
           .section-heading {
              font-size: 26px;
           }
           
           .stat-value {
             font-size: 24px;
           }
           
           .stat-item {
              max-width: 100%; /* full width stats */
           }
        }
      `}</style>
    </section>
  );
}
