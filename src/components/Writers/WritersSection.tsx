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

const tierData = [
  {
    id: 'standard',
    name: 'Standard',
    label: "Master's Level",
    tagline: "Standard Writers - Master's Level Experts",
    description: "Experienced writers with Master's degrees and 5-10 years of academic writing experience. Ideal for high school, undergraduate essays, and coursework assignments.",
    startingPrice: '$12/page',
    badgeIcon: Award,
    badgeColor: 'silver',
    writers: [
      { id: 's1', name: 'Ashley Thompson', degree: 'M.A. in English Literature', institution: 'Columbia University', photo: '/images/Ashley Thompson.jpg', rating: 4.8, completedOrders: 412, experience: '7 years', specializations: ['Essays', 'Book Reviews', 'Literature Analysis'], testimonial: { text: 'Excellent work on my comparative essay!', author: 'David K.', school: 'NYU' } },
      { id: 's2', name: 'Benjamin', degree: 'M.S. in Biology', institution: 'UC Berkeley', photo: '/images/Benjamin.jpg', rating: 4.7, completedOrders: 289, experience: '5 years', specializations: ['Lab Reports', 'Research Summaries', 'Science Essays'], testimonial: { text: 'My lab report was perfectly formatted.', author: 'Sarah M.', school: 'UCLA' } },
      { id: 's3', name: 'Michael Johnson', degree: 'M.B.A.', institution: 'University of Michigan', photo: '/images/Michael Johnson.jpg', rating: 4.9, completedOrders: 356, experience: '6 years', specializations: ['Business Essays', 'Case Briefs', 'Marketing Papers'], testimonial: { text: 'Great business analysis paper!', author: 'Tom R.', school: 'USC' } },
      { id: 's4', name: 'Christina', degree: 'M.A. in Psychology', institution: 'Boston University', photo: '/images/Christina.jpg', rating: 4.8, completedOrders: 298, experience: '5 years', specializations: ['Psychology Essays', 'Research Papers', 'APA Formatting'], testimonial: { text: 'Perfect APA formatting every time.', author: 'Lisa T.', school: 'BU' } },
      { id: 's5', name: 'Dylan', degree: 'M.S. in Computer Science', institution: 'Georgia Tech', photo: '/images/Dylan.jpg', rating: 4.7, completedOrders: 245, experience: '4 years', specializations: ['Technical Writing', 'Programming Reports', 'STEM Essays'], testimonial: { text: 'Explained complex concepts clearly.', author: 'Jake P.', school: 'MIT' } },
      { id: 's6', name: 'Kelsey', degree: 'M.A. in History', institution: 'Yale University', photo: '/images/Kelsey.jpg', rating: 4.9, completedOrders: 378, experience: '8 years', specializations: ['History Essays', 'Research Papers', 'Argumentative Writing'], testimonial: { text: 'Outstanding historical analysis!', author: 'Mike D.', school: 'Princeton' } }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    label: 'Expert Level',
    tagline: 'Advanced Writers - Specialized Experts',
    description: "PhD candidates and seasoned Master's-level professionals with 10+ years experience. Perfect for complex research papers, case studies, and upper-level coursework.",
    startingPrice: '$18/page',
    badgeIcon: Star,
    badgeColor: 'gold',
    writers: [
      { id: 'a1', name: 'Jessica Miller', degree: 'PhD Candidate, Economics', institution: 'Harvard University', photo: '/images/Jessica Miller.jpg', rating: 4.9, completedOrders: 456, experience: '11 years', specializations: ['Economic Analysis', 'Policy Papers', 'Statistical Research'], testimonial: { text: 'Her economic analysis was exceptional!', author: 'Chris B.', school: 'Wharton' } },
      { id: 'a2', name: 'Daniel', degree: 'PhD Candidate, Political Science', institution: 'Georgetown University', photo: '/images/Daniel.png', rating: 4.8, completedOrders: 389, experience: '10 years', specializations: ['Policy Analysis', 'Government Studies', 'Research Methods'], testimonial: { text: 'Brilliant policy analysis paper.', author: 'Emma W.', school: 'GWU' } },
      { id: 'a3', name: 'Maeve T.', degree: 'PhD Candidate, Sociology', institution: 'University of Chicago', photo: '/images/Maeve T..jpg', rating: 4.9, completedOrders: 423, experience: '12 years', specializations: ['Social Research', 'Qualitative Analysis', 'Case Studies'], testimonial: { text: 'Deep understanding of social theory.', author: 'John L.', school: 'Northwestern' } },
      { id: 'a4', name: 'Cormac J.', degree: 'M.S., 15 years teaching', institution: 'Stanford University', photo: '/images/Cormac J..jpg', rating: 4.8, completedOrders: 512, experience: '15 years', specializations: ['Engineering Papers', 'Technical Reports', 'Thesis Chapters'], testimonial: { text: 'Technical precision was outstanding.', author: 'Alex T.', school: 'Caltech' } },
      { id: 'a5', name: 'Imogen W.', degree: 'PhD Candidate, Nursing', institution: 'Johns Hopkins University', photo: '/images/Imogen W..jpg', rating: 4.9, completedOrders: 367, experience: '10 years', specializations: ['Nursing Case Studies', 'Healthcare Research', 'Evidence-Based Papers'], testimonial: { text: 'Perfect nursing case study analysis!', author: 'Sarah K.', school: 'UPenn' } },
      { id: 'a6', name: 'Declan K.', degree: 'PhD Candidate, Law', institution: 'Yale Law School', photo: '/images/Declan K..jpg', rating: 4.8, completedOrders: 298, experience: '9 years', specializations: ['Legal Writing', 'Case Analysis', 'Constitutional Papers'], testimonial: { text: 'Exceptional legal research skills.', author: 'Amy R.', school: 'Columbia Law' } }
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
      { id: 'p1', name: 'Dr. Sarah Massari', degree: 'PhD in Clinical Psychology', institution: 'Stanford University', photo: '/images/writers/Sarah-Massari-Writer.jpg', rating: 5.0, completedOrders: 589, experience: '14 years', specializations: ['Dissertations', 'Research Papers', 'Statistical Analysis'], testimonial: { text: 'Helped me get an A+ on my thesis!', author: 'Jessica T.', school: 'UCLA' } },
      { id: 'p2', name: 'Dr. David Berlin', degree: 'PhD in Molecular Biology', institution: 'MIT', photo: '/images/writers/David-Berlin-Writer.jpg', rating: 4.9, completedOrders: 467, experience: '12 years', specializations: ['Scientific Research', 'Lab Reports', 'Grant Proposals'], testimonial: { text: 'His research methodology is impeccable.', author: 'Dr. Wang', school: 'Harvard Medical' } },
      { id: 'p3', name: 'Dr. Lauren Miller', degree: 'PhD in Business Administration', institution: 'Wharton School', photo: '/images/writers/Lauren-Miller-Writer.jpg', rating: 5.0, completedOrders: 534, experience: '16 years', specializations: ['MBA Thesis', 'Business Strategy', 'Case Studies'], testimonial: { text: 'My MBA dissertation was flawless.', author: 'Michael S.', school: 'Kellogg' } },
      { id: 'p4', name: 'Dr. Brett Fuller', degree: 'PhD in English Literature', institution: 'Oxford University', photo: '/images/writers/Brett-Fuller-Writer.jpg', rating: 4.9, completedOrders: 412, experience: '18 years', specializations: ['Literary Analysis', 'Dissertations', 'Academic Publishing'], testimonial: { text: 'Publication-quality writing.', author: 'Prof. Davis', school: 'Cambridge' } },
      { id: 'p5', name: 'Dr. Jenifer Moralez', degree: 'PhD in Public Health', institution: 'Johns Hopkins University', photo: '/images/writers/Jenifer-Moralez-Writer.webp', rating: 5.0, completedOrders: 389, experience: '11 years', specializations: ['Health Research', 'Epidemiology Papers', 'Policy Analysis'], testimonial: { text: 'Exceptional public health research.', author: 'Dr. Kim', school: 'Harvard SPH' } },
      { id: 'p6', name: 'Dr. Connor Beatty', degree: 'PhD in Economics', institution: 'Princeton University', photo: '/images/writers/Connor-Beatty-Writer.jpg', rating: 4.9, completedOrders: 445, experience: '13 years', specializations: ['Economic Research', 'Dissertations', 'Data Analysis'], testimonial: { text: 'Brilliant economic dissertation work.', author: 'Prof. Smith', school: 'Stanford' } }
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

  const currentWriter = writers[currentIndex];
  const prevWriter = writers[(currentIndex - 1 + totalWriters) % totalWriters];
  const nextWriter = writers[(currentIndex + 1) % totalWriters];
  const BadgeIcon = currentTier.badgeIcon;

  return (
    <section className="ws-section" data-testid="writers-section">
      <div className="ws-container">

        {/* Section Header */}
        <header className="ws-header">
          <div className="ws-eyebrow">
            <Users size={16} />
            <span>MEET YOUR EXPERT WRITERS</span>
          </div>
          <h2 className="ws-heading">
            Handpicked Academics Who <span className="ws-highlight">Deliver Excellence</span>
          </h2>
          <p className="ws-subheading">
            Every writer is vetted, tested, and proven. Browse our experts by expertise level and see why thousands of students trust them with their most important work.
          </p>
        </header>

        {/* Tier Tabs */}
        <div className="ws-tier-tabs" role="tablist">
          {tierData.map((tier) => (
            <button
              key={tier.id}
              role="tab"
              aria-selected={activeTier === tier.id}
              className={`ws-tier-tab ${activeTier === tier.id ? 'active' : ''}`}
              onClick={() => activeTier !== tier.id && setActiveTier(tier.id)}
            >
              {tier.name}
            </button>
          ))}
        </div>

        {/* Tier Description */}
        <div className="ws-tier-desc" key={activeTier}>
          <h3 className="ws-tier-tagline">{currentTier.tagline}</h3>
          <p className="ws-tier-info">{currentTier.description}</p>
          <span className="ws-tier-price">Starting at {currentTier.startingPrice}</span>
        </div>

        {/* Carousel */}
        <div className="ws-carousel-wrapper">
          <button className="ws-arrow ws-arrow-left" onClick={goToPrev} aria-label="Previous writer">
            <ChevronLeft size={24} />
          </button>
          <button className="ws-arrow ws-arrow-right" onClick={goToNext} aria-label="Next writer">
            <ChevronRight size={24} />
          </button>

          <div className="ws-carousel-track">
            {/* Prev Thumbnail — hidden on mobile */}
            <div className="ws-thumb ws-thumb-prev" onClick={goToPrev}>
              <img src={prevWriter.photo} alt={prevWriter.name} />
              <span>{prevWriter.name.split(' ')[0]}</span>
            </div>

            {/* Main Card */}
            <article className={`ws-card ${isAnimating ? 'animating' : ''}`} key={currentWriter.id}>
              <div className={`ws-badge ws-badge-${currentTier.badgeColor}`}>
                <BadgeIcon size={14} />
                <span>{currentTier.label}</span>
              </div>

              <div className="ws-photo-wrap">
                <img src={currentWriter.photo} alt={currentWriter.name} className="ws-photo" />
              </div>

              <h3 className="ws-writer-name">{currentWriter.name}</h3>
              <p className="ws-writer-degree">{currentWriter.degree}</p>

              <div className="ws-rating">
                <div className="ws-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(currentWriter.rating) ? 'ws-star-on' : 'ws-star-off'} />
                  ))}
                </div>
                <span className="ws-rating-val">{currentWriter.rating}/5</span>
                <span className="ws-orders">({currentWriter.completedOrders} orders)</span>
              </div>

              <div className="ws-divider" />

              <div className="ws-meta">
                <div className="ws-meta-label"><BookOpen size={13} /><span>Specializations:</span></div>
                <ul className="ws-spec-list">
                  {currentWriter.specializations.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="ws-meta">
                <div className="ws-meta-label"><GraduationCap size={13} /><span>Education: {currentWriter.institution}</span></div>
              </div>

              <div className="ws-meta">
                <div className="ws-meta-label"><Clock size={13} /><span>Experience: {currentWriter.experience}</span></div>
              </div>

              <div className="ws-divider" />

              <blockquote className="ws-testimonial">
                <p>"{currentWriter.testimonial.text}"</p>
                <cite>- {currentWriter.testimonial.author}, {currentWriter.testimonial.school}</cite>
              </blockquote>
            </article>

            {/* Next Thumbnail — hidden on mobile */}
            <div className="ws-thumb ws-thumb-next" onClick={goToNext}>
              <img src={nextWriter.photo} alt={nextWriter.name} />
              <span>{nextWriter.name.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="ws-nav">
          <div className="ws-dots">
            {writers.map((_, i) => (
              <button key={i} className={`ws-dot ${i === currentIndex ? 'active' : ''}`} onClick={() => goToIndex(i)} aria-label={`Writer ${i + 1}`} />
            ))}
          </div>
          <p className="ws-counter">Showing <strong>{currentIndex + 1}</strong> of <strong>{totalWriters}</strong> {currentTier.name} Writers</p>
        </div>

        {/* Matching Section */}
        <div className="ws-matching">
          <div className="ws-matching-icon"><Zap size={28} /></div>
          <h3 className="ws-matching-heading">Don't Worry About Choosing</h3>
          <p className="ws-matching-desc">
            While you can explore our writers, you don't need to pick one yourself. Our smart matching system automatically pairs your order with the perfect writer based on:
          </p>
          <ul className="ws-criteria">
            <li><Check size={14} /> Your subject area</li>
            <li><Check size={14} /> Your academic level</li>
            <li><Check size={14} /> Your assignment complexity</li>
            <li><Check size={14} /> Your deadline requirements</li>
          </ul>
          <p className="ws-matching-note">Every match is reviewed by our team to ensure you get the best possible expert.</p>
        </div>

        {/* CTA */}
        <div className="ws-cta">
          <h3 className="ws-cta-heading">Ready to Get Matched With Your Expert?</h3>
          <p className="ws-cta-sub">Our team will find the perfect writer for your assignment in under 5 minutes.</p>
          <button onClick={() => navigate('/order-now')} className="ws-cta-btn">
            <span>Calculate Your Price & Get Started</span>
            <ChevronRight size={18} />
          </button>
          <div className="ws-trust">
            <span><Check size={12} /> Smart matching</span>
            <span><Check size={12} /> Verified credentials</span>
            <span><Check size={12} /> 100% satisfaction</span>
          </div>
        </div>

      </div>

      <style>{`
        /* ===== VARIABLES ===== */
        .ws-section {
          --deep-navy: #0B1F42;
          --royal-blue: #1652A0;
          --light-blue: #2B6CB0;
          --gold: #D4A853;
          --gold-dark: #B8903B;
          --success: #10B981;
          --white: #FFFFFF;
          --surface-light: #F8FAFC;
          --border: #E2E8F0;
          --text-primary: #0B1F42;
          --text-secondary: #475569;
          --text-muted: #64748B;
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        }

        /* ===== SECTION ===== */
        .ws-section {
          background: linear-gradient(180deg, var(--surface-light) 0%, var(--white) 50%, var(--surface-light) 100%);
          padding: 80px 0;
          overflow: hidden;
        }

        .ws-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          box-sizing: border-box;
        }

        /* ===== HEADER ===== */
        .ws-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 40px;
        }

        .ws-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(22, 82, 160, 0.08);
          border: 1px solid rgba(22, 82, 160, 0.2);
          border-radius: 100px;
          margin-bottom: 20px;
          color: var(--royal-blue);
        }

        .ws-eyebrow span {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--royal-blue);
        }

        .ws-heading {
          font-size: clamp(24px, 5vw, 46px);
          font-weight: 800;
          color: var(--deep-navy);
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .ws-highlight { color: var(--royal-blue); }

        .ws-subheading {
          font-size: clamp(14px, 2.5vw, 17px);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 640px;
          margin: 0 auto;
        }

        /* ===== TIER TABS ===== */
        .ws-tier-tabs {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .ws-tier-tab {
          padding: 10px 20px;
          font-family: inherit;
          font-size: clamp(13px, 2vw, 17px);
          font-weight: 600;
          color: var(--text-muted);
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          opacity: 0.65;
          white-space: nowrap;
        }

        .ws-tier-tab:hover { opacity: 0.85; color: var(--text-secondary); }

        .ws-tier-tab.active {
          color: var(--deep-navy);
          border-bottom-color: var(--royal-blue);
          opacity: 1;
        }

        /* ===== TIER DESC ===== */
        .ws-tier-desc {
          max-width: 680px;
          margin: 0 auto 40px;
          padding: 24px 20px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          text-align: center;
          animation: wsFadeIn 0.35s ease;
          box-sizing: border-box;
        }

        @keyframes wsFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ws-tier-tagline {
          font-size: clamp(17px, 3vw, 23px);
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 10px;
        }

        .ws-tier-info {
          font-size: clamp(13px, 2vw, 15px);
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 12px;
        }

        .ws-tier-price {
          font-size: 16px;
          font-weight: 700;
          color: var(--royal-blue);
        }

        /* ===== CAROUSEL ===== */
        .ws-carousel-wrapper {
          position: relative;
          max-width: 700px;
          margin: 0 auto 28px;
          /* Padding reserves space for arrows: 52px each side */
          padding: 0 52px;
          box-sizing: border-box;
        }

        .ws-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--royal-blue);
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.07);
          z-index: 10;
          flex-shrink: 0;
        }

        .ws-arrow:hover {
          background: var(--royal-blue);
          color: var(--white);
          border-color: var(--royal-blue);
        }

        .ws-arrow-left { left: 0; }
        .ws-arrow-right { right: 0; }

        .ws-carousel-track {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        /* ===== THUMBNAILS ===== */
        .ws-thumb {
          width: 90px;
          flex-shrink: 0;
          opacity: 0.35;
          filter: blur(1px);
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: center;
        }

        .ws-thumb:hover { opacity: 0.55; }

        .ws-thumb img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--border);
          display: block;
          margin: 0 auto;
        }

        .ws-thumb span {
          display: block;
          margin-top: 6px;
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* ===== MAIN CARD ===== */
        .ws-card {
          /* KEY FIX: fluid width, never exceeds available space */
          width: 100%;
          max-width: 340px;
          flex-shrink: 1;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px 20px;
          text-align: center;
          position: relative;
          box-shadow: 0 4px 20px rgba(11,31,66,0.08);
          transition: opacity 0.3s ease, transform 0.3s ease;
          box-sizing: border-box;
        }

        .ws-card.animating { opacity: 0.75; transform: scale(0.97); }

        /* ===== BADGE ===== */
        .ws-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px 9px;
          border-radius: 100px;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .ws-badge-silver { background: linear-gradient(135deg,#94A3B8,#64748B); color:#fff; }
        .ws-badge-gold   { background: linear-gradient(135deg,var(--gold),var(--gold-dark)); color:#fff; }
        .ws-badge-platinum { background: linear-gradient(135deg,var(--deep-navy),#334155); color:#fff; }

        /* ===== CARD CONTENT ===== */
        .ws-photo-wrap { margin-bottom: 12px; }

        .ws-photo {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--surface-light);
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .ws-writer-name {
          font-size: clamp(15px, 3vw, 18px);
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 4px;
        }

        .ws-writer-degree {
          font-size: 12px;
          color: var(--royal-blue);
          font-weight: 500;
          margin-bottom: 10px;
        }

        .ws-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .ws-stars { display: flex; gap: 1px; }
        .ws-star-on  { color: var(--gold); fill: var(--gold); }
        .ws-star-off { color: var(--border); }

        .ws-rating-val { font-size: 12px; font-weight: 700; color: var(--text-primary); }
        .ws-orders     { font-size: 11px; color: var(--text-muted); }

        .ws-divider { height: 1px; background: var(--border); margin: 10px 0; }

        .ws-meta { text-align: left; margin-bottom: 6px; }

        .ws-meta-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .ws-meta-label svg { color: var(--royal-blue); flex-shrink: 0; }

        .ws-spec-list {
          margin: 0 0 0 18px;
          padding: 0;
          list-style: disc;
        }

        .ws-spec-list li {
          font-size: 11px;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        .ws-testimonial {
          margin-top: 10px;
          padding: 10px 12px;
          background: var(--surface-light);
          border-radius: 10px;
          text-align: left;
        }

        .ws-testimonial p {
          font-size: 11px;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: 5px;
          line-height: 1.45;
        }

        .ws-testimonial cite {
          font-size: 10px;
          color: var(--text-muted);
          font-style: normal;
          font-weight: 600;
        }

        /* ===== DOTS ===== */
        .ws-nav { text-align: center; margin-bottom: 40px; }

        .ws-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .ws-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .ws-dot:hover { background: var(--light-blue); }
        .ws-dot.active { width: 22px; border-radius: 100px; background: var(--royal-blue); }

        .ws-counter { font-size: 12px; color: var(--text-muted); }
        .ws-counter strong { color: var(--royal-blue); }

        /* ===== MATCHING ===== */
        .ws-matching {
          max-width: 600px;
          margin: 0 auto 40px;
          padding: 28px 20px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          text-align: center;
          box-shadow: 0 2px 14px rgba(11,31,66,0.04);
          box-sizing: border-box;
        }

        .ws-matching-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 14px;
          background: linear-gradient(135deg, var(--royal-blue), var(--light-blue));
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
        }

        .ws-matching-heading {
          font-size: clamp(18px, 3vw, 22px);
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 8px;
        }

        .ws-matching-desc {
          font-size: clamp(13px, 2vw, 14px);
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 18px;
        }

        .ws-criteria {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px 20px;
          list-style: none;
          padding: 0;
          margin: 0 0 14px 0;
        }

        .ws-criteria li {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .ws-criteria svg { color: var(--success); }

        .ws-matching-note {
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }

        /* ===== CTA ===== */
        .ws-cta {
          max-width: 640px;
          margin: 0 auto;
          padding: 40px 24px;
          background: linear-gradient(135deg, var(--deep-navy) 0%, #132D5C 100%);
          border-radius: 22px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .ws-cta::before {
          content:'';
          position:absolute;
          top:-50%;right:-20%;
          width:260px;height:260px;
          background:radial-gradient(circle,rgba(212,168,83,.15) 0%,transparent 60%);
          pointer-events:none;
        }

        .ws-cta-heading {
          font-size: clamp(17px, 3.5vw, 23px);
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }

        .ws-cta-sub {
          font-size: clamp(13px, 2vw, 15px);
          color: rgba(255,255,255,0.88);
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .ws-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: var(--deep-navy);
          font-family: inherit;
          font-size: clamp(14px, 2.5vw, 16px);
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(212,168,83,.4);
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
          width: auto;
          max-width: 100%;
        }

        .ws-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(212,168,83,.5);
        }

        .ws-trust {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .ws-trust span {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }

        .ws-trust svg { color: var(--success); }

        /* ===== RESPONSIVE ===== */

        /* Tablet */
        @media (max-width: 768px) {
          .ws-section { padding: 60px 0; }

          .ws-carousel-wrapper {
            padding: 0 48px;
          }

          /* Hide thumbnails on tablet */
          .ws-thumb { display: none; }

          .ws-card {
            max-width: 100%;
          }

          .ws-criteria {
            flex-direction: column;
            align-items: center;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .ws-section { padding: 48px 0; }

          .ws-container { padding: 0 12px; }

          /* Smaller arrows, tighter padding so card has more room */
          .ws-carousel-wrapper {
            padding: 0 40px;
          }

          .ws-arrow {
            width: 34px;
            height: 34px;
          }

          .ws-arrow svg {
            width: 16px;
            height: 16px;
          }

          .ws-thumb { display: none; }

          /* Card fills remaining width */
          .ws-card {
            max-width: 100%;
            padding: 20px 14px;
          }

          .ws-photo {
            width: 76px;
            height: 76px;
          }

          .ws-tier-tabs {
            gap: 0;
          }

          .ws-tier-tab {
            padding: 8px 12px;
            font-size: 13px;
          }

          .ws-cta-btn {
            width: 100%;
            padding: 13px 20px;
          }

          .ws-trust {
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }
        }

        /* Very small screens */
        @media (max-width: 360px) {
          .ws-carousel-wrapper {
            padding: 0 36px;
          }

          .ws-arrow {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </section>
  );
}