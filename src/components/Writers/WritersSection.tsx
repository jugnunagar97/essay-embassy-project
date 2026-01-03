import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  GraduationCap,
  Award,
  Crown,
  Check,
  Zap,
  BookOpen,
  Users,
  Clock
} from 'lucide-react';

// Types
interface Writer {
  id: string;
  name: string;
  degree: string;
  institution: string;
  photo: string;
  rating: number;
  completedOrders: number;
  experience: string;
  specializations: string[];
  testimonial: {
    text: string;
    author: string;
    school: string;
  };
}

interface TierData {
  id: string;
  name: string;
  label: string;
  tagline: string;
  description: string;
  startingPrice: string;
  badgeIcon: React.ComponentType<any>;
  badgeColor: string;
  writers: Writer[];
}

// Writer Data by Tier
const tierData: TierData[] = [
  {
    id: 'standard',
    name: 'Standard',
    label: 'Master\'s Level',
    tagline: 'Standard Writers - Master\'s Level Experts',
    description: 'Experienced writers with Master\'s degrees and 5-10 years of academic writing experience. Ideal for high school, undergraduate essays, and coursework assignments.',
    startingPrice: '$12/page',
    badgeIcon: Award,
    badgeColor: 'silver',
    writers: [
      {
        id: 's1',
        name: 'Ashley Thompson',
        degree: 'M.A. in English Literature',
        institution: 'Columbia University',
        photo: '/images/Ashley Thompson.jpg',
        rating: 4.8,
        completedOrders: 412,
        experience: '7 years',
        specializations: ['Essays', 'Book Reviews', 'Literature Analysis'],
        testimonial: { text: 'Excellent work on my comparative essay!', author: 'David K.', school: 'NYU' }
      },
      {
        id: 's2',
        name: 'Benjamin',
        degree: 'M.S. in Biology',
        institution: 'UC Berkeley',
        photo: '/images/Benjamin.jpg',
        rating: 4.7,
        completedOrders: 289,
        experience: '5 years',
        specializations: ['Lab Reports', 'Research Summaries', 'Science Essays'],
        testimonial: { text: 'My lab report was perfectly formatted.', author: 'Sarah M.', school: 'UCLA' }
      },
      {
        id: 's3',
        name: 'Michael Johnson',
        degree: 'M.B.A.',
        institution: 'University of Michigan',
        photo: '/images/Michael Johnson.jpg',
        rating: 4.9,
        completedOrders: 356,
        experience: '6 years',
        specializations: ['Business Essays', 'Case Briefs', 'Marketing Papers'],
        testimonial: { text: 'Great business analysis paper!', author: 'Tom R.', school: 'USC' }
      },
      {
        id: 's4',
        name: 'Christina',
        degree: 'M.A. in Psychology',
        institution: 'Boston University',
        photo: '/images/Christina.jpg',
        rating: 4.8,
        completedOrders: 298,
        experience: '5 years',
        specializations: ['Psychology Essays', 'Research Papers', 'APA Formatting'],
        testimonial: { text: 'Perfect APA formatting every time.', author: 'Lisa T.', school: 'BU' }
      },
      {
        id: 's5',
        name: 'Dylan',
        degree: 'M.S. in Computer Science',
        institution: 'Georgia Tech',
        photo: '/images/Dylan.jpg',
        rating: 4.7,
        completedOrders: 245,
        experience: '4 years',
        specializations: ['Technical Writing', 'Programming Reports', 'STEM Essays'],
        testimonial: { text: 'Explained complex concepts clearly.', author: 'Jake P.', school: 'MIT' }
      },
      {
        id: 's6',
        name: 'Kelsey',
        degree: 'M.A. in History',
        institution: 'Yale University',
        photo: '/images/Kelsey.jpg',
        rating: 4.9,
        completedOrders: 378,
        experience: '8 years',
        specializations: ['History Essays', 'Research Papers', 'Argumentative Writing'],
        testimonial: { text: 'Outstanding historical analysis!', author: 'Mike D.', school: 'Princeton' }
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    label: 'Expert Level',
    tagline: 'Advanced Writers - Specialized Experts',
    description: 'PhD candidates and seasoned Master\'s-level professionals with 10+ years experience. Perfect for complex research papers, case studies, and upper-level coursework.',
    startingPrice: '$18/page',
    badgeIcon: Star,
    badgeColor: 'gold',
    writers: [
      {
        id: 'a1',
        name: 'Jessica Miller',
        degree: 'PhD Candidate, Economics',
        institution: 'Harvard University',
        photo: '/images/Jessica Miller.jpg',
        rating: 4.9,
        completedOrders: 456,
        experience: '11 years',
        specializations: ['Economic Analysis', 'Policy Papers', 'Statistical Research'],
        testimonial: { text: 'Her economic analysis was exceptional!', author: 'Chris B.', school: 'Wharton' }
      },
      {
        id: 'a2',
        name: 'Daniel',
        degree: 'PhD Candidate, Political Science',
        institution: 'Georgetown University',
        photo: '/images/Daniel.png',
        rating: 4.8,
        completedOrders: 389,
        experience: '10 years',
        specializations: ['Policy Analysis', 'Government Studies', 'Research Methods'],
        testimonial: { text: 'Brilliant policy analysis paper.', author: 'Emma W.', school: 'GWU' }
      },
      {
        id: 'a3',
        name: 'Maeve T.',
        degree: 'PhD Candidate, Sociology',
        institution: 'University of Chicago',
        photo: '/images/Maeve T..jpg',
        rating: 4.9,
        completedOrders: 423,
        experience: '12 years',
        specializations: ['Social Research', 'Qualitative Analysis', 'Case Studies'],
        testimonial: { text: 'Deep understanding of social theory.', author: 'John L.', school: 'Northwestern' }
      },
      {
        id: 'a4',
        name: 'Cormac J.',
        degree: 'M.S., 15 years teaching',
        institution: 'Stanford University',
        photo: '/images/Cormac J..jpg',
        rating: 4.8,
        completedOrders: 512,
        experience: '15 years',
        specializations: ['Engineering Papers', 'Technical Reports', 'Thesis Chapters'],
        testimonial: { text: 'Technical precision was outstanding.', author: 'Alex T.', school: 'Caltech' }
      },
      {
        id: 'a5',
        name: 'Imogen W.',
        degree: 'PhD Candidate, Nursing',
        institution: 'Johns Hopkins University',
        photo: '/images/Imogen W..jpg',
        rating: 4.9,
        completedOrders: 367,
        experience: '10 years',
        specializations: ['Nursing Case Studies', 'Healthcare Research', 'Evidence-Based Papers'],
        testimonial: { text: 'Perfect nursing case study analysis!', author: 'Sarah K.', school: 'UPenn' }
      },
      {
        id: 'a6',
        name: 'Declan K.',
        degree: 'PhD Candidate, Law',
        institution: 'Yale Law School',
        photo: '/images/Declan K..jpg',
        rating: 4.8,
        completedOrders: 298,
        experience: '9 years',
        specializations: ['Legal Writing', 'Case Analysis', 'Constitutional Papers'],
        testimonial: { text: 'Exceptional legal research skills.', author: 'Amy R.', school: 'Columbia Law' }
      }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    label: 'PhD Expert',
    tagline: 'Premium Writers - PhD Experts',
    description: 'Our most qualified writers with doctoral degrees and proven research expertise. Perfect for thesis work, dissertations, and graduate-level assignments.',
    startingPrice: '$22/page',
    badgeIcon: Crown,
    badgeColor: 'platinum',
    writers: [
      {
        id: 'p1',
        name: 'Dr. Sarah Massari',
        degree: 'PhD in Clinical Psychology',
        institution: 'Stanford University',
        photo: '/images/writers/Sarah-Massari-Writer.jpg',
        rating: 5.0,
        completedOrders: 589,
        experience: '14 years',
        specializations: ['Dissertations', 'Research Papers', 'Statistical Analysis'],
        testimonial: { text: 'Helped me get an A+ on my thesis!', author: 'Jessica T.', school: 'UCLA' }
      },
      {
        id: 'p2',
        name: 'Dr. David Berlin',
        degree: 'PhD in Molecular Biology',
        institution: 'MIT',
        photo: '/images/writers/David-Berlin-Writer.jpg',
        rating: 4.9,
        completedOrders: 467,
        experience: '12 years',
        specializations: ['Scientific Research', 'Lab Reports', 'Grant Proposals'],
        testimonial: { text: 'His research methodology is impeccable.', author: 'Dr. Wang', school: 'Harvard Medical' }
      },
      {
        id: 'p3',
        name: 'Dr. Lauren Miller',
        degree: 'PhD in Business Administration',
        institution: 'Wharton School',
        photo: '/images/writers/Lauren-Miller-Writer.jpg',
        rating: 5.0,
        completedOrders: 534,
        experience: '16 years',
        specializations: ['MBA Thesis', 'Business Strategy', 'Case Studies'],
        testimonial: { text: 'My MBA dissertation was flawless.', author: 'Michael S.', school: 'Kellogg' }
      },
      {
        id: 'p4',
        name: 'Dr. Brett Fuller',
        degree: 'PhD in English Literature',
        institution: 'Oxford University',
        photo: '/images/writers/Brett-Fuller-Writer.jpg',
        rating: 4.9,
        completedOrders: 412,
        experience: '18 years',
        specializations: ['Literary Analysis', 'Dissertations', 'Academic Publishing'],
        testimonial: { text: 'Publication-quality writing.', author: 'Prof. Davis', school: 'Cambridge' }
      },
      {
        id: 'p5',
        name: 'Dr. Jenifer Moralez',
        degree: 'PhD in Public Health',
        institution: 'Johns Hopkins University',
        photo: '/images/writers/Jenifer-Moralez-Writer.webp',
        rating: 5.0,
        completedOrders: 389,
        experience: '11 years',
        specializations: ['Health Research', 'Epidemiology Papers', 'Policy Analysis'],
        testimonial: { text: 'Exceptional public health research.', author: 'Dr. Kim', school: 'Harvard SPH' }
      },
      {
        id: 'p6',
        name: 'Dr. Connor Beatty',
        degree: 'PhD in Economics',
        institution: 'Princeton University',
        photo: '/images/writers/Connor-Beatty-Writer.jpg',
        rating: 4.9,
        completedOrders: 445,
        experience: '13 years',
        specializations: ['Economic Research', 'Dissertations', 'Data Analysis'],
        testimonial: { text: 'Brilliant economic dissertation work.', author: 'Prof. Smith', school: 'Stanford' }
      }
    ]
  }
];

export default function WritersSection() {
  const navigate = useNavigate();
  const [activeTier, setActiveTier] = useState('premium');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentTier = tierData.find(t => t.id === activeTier) || tierData[2];
  const writers = currentTier.writers;
  const totalWriters = writers.length;

  // Reset index when tier changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTier]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % totalWriters);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalWriters]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + totalWriters) % totalWriters);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalWriters]);

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleTierChange = (tierId: string) => {
    if (tierId === activeTier) return;
    setActiveTier(tierId);
  };

  const currentWriter = writers[currentIndex];
  const prevWriter = writers[(currentIndex - 1 + totalWriters) % totalWriters];
  const nextWriter = writers[(currentIndex + 1) % totalWriters];

  const BadgeIcon = currentTier.badgeIcon;

  return (
    <section className="writers-section" data-testid="writers-section">
      <div className="writers-container">

        {/* Section Header */}
        <header className="section-header">
          <div className="section-eyebrow">
            <Users size={16} />
            <span>MEET YOUR EXPERT WRITERS</span>
          </div>
          <h2 className="section-heading">
            Handpicked Academics Who <span className="heading-highlight">Deliver Excellence</span>
          </h2>
          <p className="section-subheading">
            Every writer is vetted, tested, and proven. Browse our experts by expertise level and see why thousands of students trust them with their most important work.
          </p>
        </header>

        {/* Tier Tabs */}
        <div className="tier-tabs" role="tablist">
          {tierData.map((tier) => (
            <button
              key={tier.id}
              role="tab"
              aria-selected={activeTier === tier.id}
              className={`tier-tab ${activeTier === tier.id ? 'active' : ''}`}
              onClick={() => handleTierChange(tier.id)}
            >
              {tier.name}
            </button>
          ))}
        </div>

        {/* Tier Description */}
        <div className="tier-description" key={activeTier}>
          <h3 className="tier-tagline">{currentTier.tagline}</h3>
          <p className="tier-info">{currentTier.description}</p>
          <span className="tier-price">Starting at {currentTier.startingPrice}</span>
        </div>

        {/* Carousel Container */}
        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button className="carousel-arrow arrow-left" onClick={goToPrev} aria-label="Previous writer">
            <ChevronLeft size={28} />
          </button>
          <button className="carousel-arrow arrow-right" onClick={goToNext} aria-label="Next writer">
            <ChevronRight size={28} />
          </button>

          {/* Carousel Track */}
          <div className="carousel-track">
            {/* Previous Thumbnail */}
            <div className="writer-thumbnail prev" onClick={goToPrev}>
              <img src={prevWriter.photo} alt={prevWriter.name} />
              <span className="thumb-name">{prevWriter.name.split(' ')[0]}</span>
            </div>

            {/* Main Writer Card */}
            <article className={`writer-card main-card ${isAnimating ? 'animating' : ''}`} key={currentWriter.id}>
              {/* Tier Badge */}
              <div className={`tier-badge badge-${currentTier.badgeColor}`}>
                <BadgeIcon size={16} />
                <span>{currentTier.label}</span>
              </div>

              {/* Writer Photo */}
              <div className="writer-photo-wrapper">
                <img src={currentWriter.photo} alt={currentWriter.name} className="writer-photo" />
              </div>

              {/* Writer Info */}
              <h3 className="writer-name">{currentWriter.name}</h3>
              <p className="writer-degree">{currentWriter.degree}</p>

              {/* Rating */}
              <div className="writer-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(currentWriter.rating) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
                <span className="rating-value">{currentWriter.rating}/5</span>
                <span className="completed-orders">({currentWriter.completedOrders} orders)</span>
              </div>

              <div className="writer-divider" />

              {/* Specializations */}
              <div className="writer-meta">
                <div className="meta-item">
                  <BookOpen size={16} />
                  <span>Specializations:</span>
                </div>
                <ul className="specializations-list">
                  {currentWriter.specializations.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>

              {/* Experience */}
              <div className="writer-meta">
                <div className="meta-item">
                  <GraduationCap size={16} />
                  <span>Education: {currentWriter.institution}</span>
                </div>
              </div>

              <div className="writer-meta">
                <div className="meta-item">
                  <Clock size={16} />
                  <span>Experience: {currentWriter.experience}</span>
                </div>
              </div>

              <div className="writer-divider" />

              {/* Testimonial */}
              <blockquote className="writer-testimonial">
                <p>"{currentWriter.testimonial.text}"</p>
                <cite>- {currentWriter.testimonial.author}, {currentWriter.testimonial.school}</cite>
              </blockquote>
            </article>

            {/* Next Thumbnail */}
            <div className="writer-thumbnail next" onClick={goToNext}>
              <img src={nextWriter.photo} alt={nextWriter.name} />
              <span className="thumb-name">{nextWriter.name.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="carousel-nav">
          <div className="dots-container">
            {writers.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToIndex(index)}
                aria-label={`Go to writer ${index + 1}`}
              />
            ))}
          </div>
          <p className="carousel-counter">
            Showing <strong>{currentIndex + 1}</strong> of <strong>{totalWriters}</strong> {currentTier.name} Writers
          </p>
        </div>

        {/* Matching Reassurance */}
        <div className="matching-section">
          <div className="matching-icon">
            <Zap size={40} />
          </div>
          <h3 className="matching-heading">Don't Worry About Choosing</h3>
          <p className="matching-description">
            While you can explore our writers, you don't need to pick one yourself. Our smart matching system automatically pairs your order with the perfect writer based on:
          </p>
          <ul className="matching-criteria">
            <li><Check size={16} /> Your subject area</li>
            <li><Check size={16} /> Your academic level</li>
            <li><Check size={16} /> Your assignment complexity</li>
            <li><Check size={16} /> Your deadline requirements</li>
          </ul>
          <p className="matching-note">
            Every match is reviewed by our team to ensure you get the best possible expert.
          </p>
        </div>

        {/* Final CTA */}
        <div className="writers-cta">
          <h3 className="cta-heading">Ready to Get Matched With Your Expert?</h3>
          <p className="cta-subtext">
            Our team will find the perfect writer for your assignment in under 5 minutes.
          </p>
          <button onClick={() => navigate('/order-now')} className="cta-button">
            <span>Calculate Your Price & Get Started</span>
            <ChevronRight size={20} />
          </button>
          <div className="cta-trust-badges">
            <span><Check size={14} /> Smart matching</span>
            <span><Check size={14} /> Verified credentials</span>
            <span><Check size={14} /> 100% satisfaction</span>
          </div>
        </div>

      </div>

      <style>{`
        /* ========== CSS VARIABLES ========== */
        .writers-section {
          --deep-navy: #0B1F42;
          --royal-blue: #1652A0;
          --light-blue: #2B6CB0;
          --gold: #D4A853;
          --gold-dark: #B8903B;
          --success: #10B981;
          --white: #FFFFFF;
          --surface-light: #F8FAFC;
          --surface-alt: #F0F4F8;
          --text-primary: #0B1F42;
          --text-secondary: #475569;
          --text-muted: #64748B;
          --border-light: #E2E8F0;
          --platinum: #334155;

          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        }

        /* ========== SECTION BASE ========== */
        .writers-section {
          position: relative;
          background: linear-gradient(180deg, var(--surface-light) 0%, var(--white) 50%, var(--surface-light) 100%);
          padding: 120px 0;
          overflow: hidden;
        }

        .writers-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ========== SECTION HEADER ========== */
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 48px;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          background: linear-gradient(135deg, rgba(22, 82, 160, 0.1) 0%, rgba(22, 82, 160, 0.04) 100%);
          border: 1px solid rgba(22, 82, 160, 0.2);
          border-radius: 100px;
          margin-bottom: 24px;
        }

        .section-eyebrow svg {
          color: var(--royal-blue);
        }

        .section-eyebrow span {
          font-size: 12px;
          font-weight: 700;
          color: var(--royal-blue);
          letter-spacing: 1.5px;
        }

        .section-heading {
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 800;
          color: var(--deep-navy);
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .heading-highlight {
          color: var(--royal-blue);
          position: relative;
        }

        .section-subheading {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 680px;
          margin: 0 auto;
        }

        /* ========== TIER TABS ========== */
        .tier-tabs {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-bottom: 32px;
        }

        .tier-tab {
          padding: 12px 24px;
          font-family: inherit;
          font-size: 18px;
          font-weight: 600;
          color: var(--text-muted);
          background: transparent;
          border: none;
          border-bottom: 4px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .tier-tab:hover {
          opacity: 0.85;
          color: var(--text-secondary);
          border-bottom-color: var(--border-light);
        }

        .tier-tab.active {
          color: var(--deep-navy);
          border-bottom-color: var(--royal-blue);
          opacity: 1;
        }

        /* ========== TIER DESCRIPTION ========== */
        .tier-description {
          max-width: 700px;
          margin: 0 auto 48px;
          padding: 32px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          text-align: center;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tier-tagline {
          font-size: 24px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 12px;
        }

        .tier-info {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .tier-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--royal-blue);
        }

        /* ========== CAROUSEL ========== */
        .carousel-wrapper {
          position: relative;
          max-width: 900px;
          margin: 0 auto 32px;
          padding: 0 70px;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--royal-blue);
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          z-index: 10;
        }

        .carousel-arrow:hover {
          background: var(--royal-blue);
          color: var(--white);
          border-color: var(--royal-blue);
          transform: translateY(-50%) scale(1.05);
        }

        .arrow-left { left: 0; }
        .arrow-right { right: 0; }

        .carousel-track {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        /* Thumbnails */
        .writer-thumbnail {
          width: 120px;
          flex-shrink: 0;
          opacity: 0.35;
          transform: scale(0.9);
          filter: blur(1px);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .writer-thumbnail:hover {
          opacity: 0.55;
          transform: scale(0.92);
        }

        .writer-thumbnail img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--border-light);
        }

        .thumb-name {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Main Writer Card - COMPACT VERSION */
        .writer-card.main-card {
          width: 340px;
          flex-shrink: 0;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          position: relative;
          box-shadow: 0 4px 20px rgba(11, 31, 66, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .writer-card.animating {
          opacity: 0.8;
          transform: scale(0.98);
        }

        /* Tier Badge */
        .tier-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .badge-silver {
          background: linear-gradient(135deg, #94A3B8 0%, #64748B 100%);
          color: white;
        }

        .badge-gold {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: white;
        }

        .badge-platinum {
          background: linear-gradient(135deg, var(--deep-navy) 0%, var(--platinum) 100%);
          color: white;
        }

        /* Writer Photo */
        .writer-photo-wrapper {
          margin-bottom: 14px;
        }

        .writer-photo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--surface-light);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }

        .writer-name {
          font-size: 18px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 4px;
        }

        .writer-degree {
          font-size: 13px;
          color: var(--royal-blue);
          font-weight: 500;
          margin-bottom: 12px;
        }

        /* Rating */
        .writer-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        .stars {
          display: flex;
          gap: 1px;
        }

        .stars svg {
          width: 14px;
          height: 14px;
        }

        .star-filled {
          color: var(--gold);
          fill: var(--gold);
        }

        .star-empty {
          color: var(--border-light);
        }

        .rating-value {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .completed-orders {
          font-size: 11px;
          color: var(--text-muted);
        }

        .writer-divider {
          height: 1px;
          background: var(--border-light);
          margin: 12px 0;
        }

        /* Meta */
        .writer-meta {
          text-align: left;
          margin-bottom: 8px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .meta-item svg {
          width: 14px;
          height: 14px;
          color: var(--royal-blue);
        }

        .specializations-list {
          margin: 0 0 0 20px;
          padding: 0;
          list-style: disc;
        }

        .specializations-list li {
          font-size: 11px;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        /* Testimonial */
        .writer-testimonial {
          margin-top: 12px;
          padding: 12px;
          background: var(--surface-light);
          border-radius: 10px;
          text-align: left;
        }

        .writer-testimonial p {
          font-size: 12px;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: 6px;
          line-height: 1.45;
        }

        .writer-testimonial cite {
          font-size: 10px;
          color: var(--text-muted);
          font-style: normal;
          font-weight: 600;
        }

        /* ========== NAVIGATION DOTS ========== */
        .carousel-nav {
          text-align: center;
          margin-bottom: 48px;
        }

        .dots-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-light);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-dot:hover {
          background: var(--light-blue);
          transform: scale(1.15);
        }

        .nav-dot.active {
          width: 24px;
          border-radius: 100px;
          background: var(--royal-blue);
        }

        .carousel-counter {
          font-size: 13px;
          color: var(--text-muted);
        }

        .carousel-counter strong {
          color: var(--royal-blue);
        }

        /* ========== MATCHING SECTION ========== */
        .matching-section {
          max-width: 640px;
          margin: 0 auto 48px;
          padding: 36px 32px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 2px 16px rgba(11, 31, 66, 0.04);
        }

        .matching-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--light-blue) 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
        }

        .matching-icon svg {
          width: 28px;
          height: 28px;
        }

        .matching-heading {
          font-size: 22px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 10px;
        }

        .matching-description {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .matching-criteria {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px 24px;
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
        }

        .matching-criteria li {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .matching-criteria svg {
          width: 14px;
          height: 14px;
          color: var(--success);
        }

        .matching-note {
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }

        /* ========== FINAL CTA - PREMIUM DESIGN ========== */
        .writers-cta {
          max-width: 680px;
          margin: 0 auto;
          padding: 48px 40px;
          background: linear-gradient(135deg, var(--deep-navy) 0%, #132D5C 100%);
          border-radius: 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .writers-cta::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(212, 168, 83, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .writers-cta::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(22, 82, 160, 0.2) 0%, transparent 60%);
          pointer-events: none;
        }

        .cta-heading {
          font-size: 24px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }

        .cta-subtext {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: var(--deep-navy);
          font-family: inherit;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(212, 168, 83, 0.4);
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 168, 83, 0.5);
        }

        .cta-trust-badges {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-trust-badges span {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .cta-trust-badges svg {
          width: 12px;
          height: 12px;
          color: var(--success);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .carousel-wrapper {
            padding: 0 60px;
          }

          .writer-thumbnail {
            display: none;
          }

          .writer-card.main-card {
            width: 100%;
            max-width: 340px;
          }
        }

        @media (max-width: 768px) {
          .writers-section {
            padding: 80px 0;
          }

          .tier-tabs {
            gap: 20px;
          }

          .tier-tab {
            font-size: 15px;
            padding: 10px 16px;
          }

          .tier-description {
            padding: 20px;
          }

          .carousel-wrapper {
            padding: 0 50px;
          }

          .carousel-arrow {
            width: 40px;
            height: 40px;
          }

          .writer-card.main-card {
            padding: 24px 20px;
          }

          .writer-photo {
            width: 90px;
            height: 90px;
          }

          .matching-section {
            padding: 28px 20px;
          }

          .matching-heading {
            font-size: 20px;
          }

          .matching-criteria {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .writers-cta {
            padding: 36px 24px;
            border-radius: 20px;
          }

          .cta-heading {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .section-heading {
            font-size: 24px;
          }

          .tier-tabs {
            gap: 8px;
          }

          .tier-tab {
            font-size: 13px;
            padding: 8px 12px;
          }

          .carousel-wrapper {
            padding: 0 44px;
          }

          .carousel-arrow {
            width: 36px;
            height: 36px;
          }

          .carousel-arrow svg {
            width: 18px;
            height: 18px;
          }

          .arrow-left { left: 0; }
          .arrow-right { right: 0; }

          .writer-name {
            font-size: 16px;
          }

          .writer-degree {
            font-size: 12px;
          }

          .cta-heading {
            font-size: 18px;
          }

          .cta-button {
            width: 100%;
            justify-content: center;
            padding: 14px 24px;
            font-size: 15px;
          }

          .cta-trust-badges {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
