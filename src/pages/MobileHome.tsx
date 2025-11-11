import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSectionSimple from '../components/Hero/HeroSectionSimple'; // ✅ Changed this
import { useNavigate } from 'react-router-dom';

export default function MobileHome() {
  const [activeTab, setActiveTab] = useState<'concerns' | 'solutions'>('concerns');
  const navigate = useNavigate();
  const reviewsTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeReview, setActiveReview] = useState<number>(0);
  const activeReviewRef = useRef<number>(0);
  const [activePlatform, setActivePlatform] = useState<'google' | 'sitejabber' | 'trustpilot'>('google');
  const writersTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeWriter, setActiveWriter] = useState<number>(0);

  // Reviews data for Google
  const googleReviews = [
    {
      tag: 'Dissertation Chapter',
      text: 'Essay Embassy saved my academic career! The writer delivered an outstanding dissertation chapter that exceeded all my expectations. Highly professional and on-time delivery.',
      rating: 5.0,
      orderId: '954836',
      date: 'Nov 30, 2024'
    },
    {
      tag: 'Research Paper',
      text: 'Excellent research paper with proper citations. Essay Embassy understands academic writing standards. The quality was impressive and I received an A grade.',
      rating: 4.8,
      orderId: '782341',
      date: 'Nov 25, 2024'
    },
    {
      tag: 'Term Paper',
      text: 'Fast delivery and excellent quality. The writer clearly understood my requirements and delivered exactly what I needed. Great communication throughout the process.',
      rating: 4.5,
      orderId: '401493',
      date: 'Nov 22, 2024'
    },
    {
      tag: 'Case Study',
      text: 'Clear structure and strong analysis. Essay Embassy provided exactly what my professor asked for. The case study was well-researched and professionally written.',
      rating: 5.0,
      orderId: '345672',
      date: 'Nov 18, 2024'
    },
    {
      tag: 'Argumentative Essay',
      text: 'I was skeptical at first but Essay Embassy exceeded my expectations! The essay was well-argued with strong evidence. Definitely recommend their services.',
      rating: 4.8,
      orderId: '523891',
      date: 'Nov 10, 2024'
    },
    {
      tag: 'Thesis Writing',
      text: 'Professional thesis writing support from Essay Embassy. The research was comprehensive and the methodology section was perfectly structured. Thank you!',
      rating: 4.5,
      orderId: '678412',
      date: 'Nov 5, 2024'
    },
    {
      tag: 'Book Review',
      text: 'Insightful critique with proper citations. Essay Embassy helped me score an A on my book review assignment. The analysis was thorough and well-written.',
      rating: 4.2,
      orderId: '456789',
      date: 'Oct 28, 2024'
    },
    {
      tag: 'Admission Essay',
      text: 'My essay felt personal and compelling thanks to Essay Embassy. Got accepted to my first choice university! The writer captured my voice perfectly.',
      rating: 5.0,
      orderId: '901234',
      date: 'Oct 20, 2024'
    },
    {
      tag: 'Coursework',
      text: 'Friendly support and fast turnaround from Essay Embassy. The explanations were super clear and helped me understand the concepts better. Great service!',
      rating: 4.5,
      orderId: '234567',
      date: 'Oct 15, 2024'
    },
    {
      tag: 'Reflection Paper',
      text: 'Thoughtful and well-written reflection paper. Essay Embassy matched my tone perfectly and delivered exactly what I needed for my assignment.',
      rating: 4.8,
      orderId: '789012',
      date: 'Oct 10, 2024'
    }
  ];

  // Reviews data for Sitejabber
  const sitejabberReviews = [
    {
      tag: 'Research Paper',
      text: 'Outstanding service from Essay Embassy! The research paper was well-structured with credible sources. My professor was impressed with the quality and depth of analysis.',
      rating: 5.0,
      orderId: '612489',
      date: 'Nov 28, 2024'
    },
    {
      tag: 'Essay Writing',
      text: 'Essay Embassy delivered a high-quality essay that met all my requirements. The writing was clear, concise, and well-argued. Excellent customer service too!',
      rating: 4.5,
      orderId: '334521',
      date: 'Nov 24, 2024'
    },
    {
      tag: 'Assignment Help',
      text: 'Great help with my assignment. Essay Embassy provided step-by-step solutions that were easy to understand. The quality was good and delivery was on time.',
      rating: 4.2,
      orderId: '887654',
      date: 'Nov 20, 2024'
    },
    {
      tag: 'Dissertation Help',
      text: 'Essay Embassy provided excellent dissertation support. The writer was knowledgeable and responsive. The work was original and well-researched.',
      rating: 4.8,
      orderId: '445123',
      date: 'Nov 16, 2024'
    },
    {
      tag: 'Term Paper',
      text: 'Fast and reliable service. Essay Embassy understood my topic and delivered a quality term paper. The citations were properly formatted and the content was original.',
      rating: 4.5,
      orderId: '992356',
      date: 'Nov 12, 2024'
    },
    {
      tag: 'Case Study Analysis',
      text: 'Professional case study analysis from Essay Embassy. The analysis was thorough and included all the key points my professor requested. Very satisfied!',
      rating: 5.0,
      orderId: '778921',
      date: 'Nov 8, 2024'
    },
    {
      tag: 'Literature Review',
      text: 'Excellent literature review service. Essay Embassy helped me organize my research and write a comprehensive review. The quality exceeded my expectations.',
      rating: 4.8,
      orderId: '556234',
      date: 'Nov 4, 2024'
    },
    {
      tag: 'Lab Report',
      text: 'Well-written lab report with proper scientific formatting. Essay Embassy ensured all data was accurately presented and the conclusion was well-supported.',
      rating: 4.2,
      orderId: '339845',
      date: 'Oct 30, 2024'
    },
    {
      tag: 'Business Plan',
      text: 'Essay Embassy created a comprehensive business plan for my MBA project. The analysis was detailed and professional. Received excellent feedback from my professor.',
      rating: 4.5,
      orderId: '117689',
      date: 'Oct 25, 2024'
    },
    {
      tag: 'Annotated Bibliography',
      text: 'Perfect annotated bibliography from Essay Embassy. All sources were credible and annotations were well-written. Saved me a lot of time and effort.',
      rating: 4.8,
      orderId: '663452',
      date: 'Oct 22, 2024'
    }
  ];

  // Reviews data for TrustPilot
  const trustpilotReviews = [
    {
      tag: 'Dissertation Writing',
      text: 'Essay Embassy is a lifesaver! Their dissertation writing service is top-notch. The writer was professional, responsive, and delivered exceptional work on time.',
      rating: 5.0,
      orderId: '224789',
      date: 'Nov 29, 2024'
    },
    {
      tag: 'Essay Writing',
      text: 'Highly recommend Essay Embassy for academic writing. The essay was well-researched, properly formatted, and delivered ahead of schedule. Great value for money!',
      rating: 4.5,
      orderId: '558123',
      date: 'Nov 26, 2024'
    },
    {
      tag: 'Research Paper',
      text: 'Excellent research paper from Essay Embassy. The content was original, well-structured, and met all academic standards. My professor was very impressed.',
      rating: 4.8,
      orderId: '771456',
      date: 'Nov 23, 2024'
    },
    {
      tag: 'Thesis Help',
      text: 'Essay Embassy provided outstanding thesis help. The methodology section was perfectly written and the research was comprehensive. Thank you for your support!',
      rating: 4.2,
      orderId: '883267',
      date: 'Nov 19, 2024'
    },
    {
      tag: 'Assignment Writing',
      text: 'Great assignment writing service from Essay Embassy. The work was high-quality and delivered on time. The customer support team was very helpful throughout.',
      rating: 4.5,
      orderId: '995634',
      date: 'Nov 15, 2024'
    },
    {
      tag: 'Coursework Help',
      text: 'Essay Embassy helped me with my coursework and I couldn\'t be happier. The solutions were detailed and easy to understand. Excellent service overall!',
      rating: 4.8,
      orderId: '447891',
      date: 'Nov 11, 2024'
    },
    {
      tag: 'Case Study',
      text: 'Professional case study writing from Essay Embassy. The analysis was thorough and the recommendations were well-supported. Received an A grade!',
      rating: 5.0,
      orderId: '669234',
      date: 'Nov 7, 2024'
    },
    {
      tag: 'Term Paper',
      text: 'Fast and reliable term paper service from Essay Embassy. The paper was well-written with proper citations. The quality was excellent and delivery was prompt.',
      rating: 4.5,
      orderId: '332567',
      date: 'Nov 3, 2024'
    },
    {
      tag: 'Book Review',
      text: 'Essay Embassy delivered an insightful book review that helped me score high marks. The critique was balanced and well-argued. Very satisfied with the service.',
      rating: 4.2,
      orderId: '114890',
      date: 'Oct 29, 2024'
    },
    {
      tag: 'Admission Essay',
      text: 'Essay Embassy created a compelling admission essay that helped me get into my dream university. The writing was personal, authentic, and perfectly crafted.',
      rating: 4.8,
      orderId: '226345',
      date: 'Oct 26, 2024'
    }
  ];

  // Get current reviews based on active platform
  const reviews = activePlatform === 'google' 
    ? googleReviews 
    : activePlatform === 'sitejabber' 
    ? sitejabberReviews 
    : trustpilotReviews;

  // Handle platform change
  const handlePlatformChange = (platform: 'google' | 'sitejabber' | 'trustpilot') => {
    setActivePlatform(platform);
  };

  // Scroll to specific review
  const scrollToReview = (index: number) => {
    if (reviewsTrackRef.current) {
      const container = reviewsTrackRef.current;
      const containerWidth = container.clientWidth;
      const cardWidth = containerWidth * 0.88; // 88% width
      const gap = 16; // 1rem gap
      const cardTotalWidth = cardWidth + gap;
      // Calculate scroll position to center the card
      const scrollPosition = index * cardTotalWidth;
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
      activeReviewRef.current = index;
      setActiveReview(index);
    }
  };

  // Navigate to next review
  const nextReview = () => {
    if (activeReview < reviews.length - 1) {
      scrollToReview(activeReview + 1);
    }
  };

  // Navigate to previous review
  const prevReview = () => {
    if (activeReview > 0) {
      scrollToReview(activeReview - 1);
    }
  };

  // Render stars with fractional support
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasPartialStar = rating % 1 > 0;
    const totalStars = 5;

    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`full-${i}`} style={{ color: '#fbbf24', fontSize: '1.1rem' }}>⭐</span>
        ))}
        {hasPartialStar && (
          <span style={{ color: '#fbbf24', fontSize: '1.1rem', opacity: 0.7 }}>⭐</span>
        )}
        {Array.from({ length: totalStars - Math.ceil(rating) }).map((_, i) => (
          <span key={`empty-${i}`} style={{ color: '#d1d5db', fontSize: '1.1rem', opacity: 0.3 }}>⭐</span>
        ))}
      </>
    );
  };

  // Reset scroll when platform changes
  useEffect(() => {
    if (reviewsTrackRef.current) {
      setActiveReview(0);
      activeReviewRef.current = 0;
      reviewsTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activePlatform]);

  // Handle scroll events
  useEffect(() => {
    const container = reviewsTrackRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerWidth = container.clientWidth;
      const cardWidth = containerWidth * 0.88; // 88% of container
      const gap = 16; // 1rem = 16px
      const cardTotalWidth = cardWidth + gap;
      const scrollLeft = container.scrollLeft;
      
      // Calculate which card is currently centered
      // With scroll-snap, cards snap to center, so we can calculate based on scroll position
      const index = Math.round(scrollLeft / cardTotalWidth);
      const newIndex = Math.max(0, Math.min(index, reviews.length - 1));
      
      if (newIndex !== activeReviewRef.current) {
        activeReviewRef.current = newIndex;
        setActiveReview(newIndex);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check after a short delay to ensure container is rendered
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 150);
    
    return () => {
      container.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [activePlatform, reviews.length]);

  const concerns = [
    {
      text: "Facing a blank page? Get expert guidance to start your next assignment or project."
    },
    {
      text: "Are you concerned your grammar, structure, or technical accuracy aren't strong enough for top grades?"
    },
    {
      text: "No time to help with assignments? Our expert academic assistance saves you time and stress."
    }
  ];

  const solutions = [
    {
      title: "Strategic Brainstorming:",
      text: "We'll help you craft a unique approach for any academic project, including essays, research papers, and programming assignments."
    },
    {
      title: "Meticulous Editing:",
      text: "Our team provides detailed proofreading for grammar, style, and technical accuracy, ensuring your work is truly flawless."
    },
    {
      title: "Personalized Guidance:",
      text: "A dedicated mentor creates a structured roadmap for your academic journey, keeping you on track and confident."
    },
    {
      title: "Flawless Structure:",
      text: "Our experts guide you in outlining, writing, or coding assignments that flow perfectly and meet high academic standards."
    },
    {
      title: "Analytical Approach:",
      text: "Develop your own unique academic voice and strong analytical rigor for any subject or discipline."
    },
    {
      title: "Empower Your Work:",
      text: "We give you the tools and confidence to submit your best, most authentic academic work, whether it's written or technical in nature."
    }
  ];

  const styles = {
    container: {
      width: '100%',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    statsSection: {
      padding: '2rem 1rem',
      backgroundColor: '#f8f9fa'
    },
    statsGrid: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem',
      maxWidth: '500px',
      margin: '0 auto'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '2rem 1.5rem',
      borderRadius: '0.75rem',
      textAlign: 'center' as const,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: 'bold' as const,
      color: '#1a1a1a',
      marginBottom: '0.5rem',
      lineHeight: 1.2
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#666',
      fontWeight: 500
    },
    concernsSection: {
      padding: '2.5rem 1rem',
      backgroundColor: '#ffffff'
    },
    sectionInner: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    tabButtons: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      backgroundColor: '#f3f4f6',
      padding: '0.25rem',
      borderRadius: '0.75rem'
    },
    tabButton: (isActive: boolean) => ({
      flex: 1,
      padding: '0.875rem 1rem',
      fontSize: '0.875rem',
      fontWeight: 600 as const,
      border: 'none',
      borderRadius: '0.5rem',
      backgroundColor: isActive ? 'white' : 'transparent',
      color: isActive ? '#1a1a1a' : '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
    }),
    contentCard: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    concernItem: {
      display: 'flex',
      gap: '0.75rem',
      padding: '1rem',
      marginBottom: '0.75rem',
      backgroundColor: '#fef3c7',
      borderRadius: '0.5rem',
      border: '1px solid #fde68a',
      alignItems: 'flex-start'
    },
    solutionItem: {
      display: 'flex',
      gap: '0.75rem',
      padding: '1rem',
      marginBottom: '0.75rem',
      backgroundColor: '#dcfce7',
      borderRadius: '0.5rem',
      border: '1px solid #bbf7d0',
      alignItems: 'flex-start'
    },
    icon: {
      fontSize: '1.25rem',
      flexShrink: 0,
      marginTop: '0.125rem'
    },
    itemText: {
      fontSize: '0.875rem',
      lineHeight: '1.6',
      color: '#374151',
      margin: 0
    },
    solutionTitle: {
      fontWeight: 'bold' as const,
      color: '#1a1a1a',
      marginBottom: '0.25rem'
    },
    // Added Why Choose section styles
    whyChooseSection: {
      padding: '3rem 1rem',
      backgroundColor: '#f8f9fa'
    },
    whyChooseInner: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '1.75rem',
      fontWeight: 'bold' as const,
      textAlign: 'center' as const,
      marginBottom: '0.75rem',
      color: '#1a1a1a',
      lineHeight: 1.3
    },
    sectionTitleAccent: {
      color: '#268579'
    },
    sectionSubtitle: {
      fontSize: '0.95rem',
      textAlign: 'center' as const,
      color: '#666',
      marginBottom: '2.5rem',
      lineHeight: 1.6,
      padding: '0 1rem'
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '1.75rem 1.5rem',
      borderRadius: '0.875rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    },
    featureIcon: {
      fontSize: '2rem',
      marginBottom: '0.75rem',
      display: 'block'
    },
    featureTitle: {
      fontSize: '1.1rem',
      fontWeight: 'bold' as const,
      color: '#1a1a1a',
      marginBottom: '0.5rem'
    },
    featureDescription: {
      fontSize: '0.875rem',
      color: '#666',
      lineHeight: 1.6,
      margin: 0
      },

    // Added Core Benefits section styles
    coreBenefitsSection: {
        padding: '3rem 1rem',
        backgroundColor: '#ffffff'
      },
      coreBenefitsInner: {
        maxWidth: '600px',
        margin: '0 auto'
      },
      badge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: '#d1fae5',
        color: '#065f46',
        padding: '0.5rem 1rem',
        borderRadius: '2rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        margin: '0 auto 2.5rem',
        border: '1px solid #a7f3d0'
      },
      benefitCard: {
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1rem',
        border: '2px solid #e5e7eb',
        textAlign: 'center' as const,
        transition: 'all 0.3s ease'
      },
      benefitCardHighlight: {
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1rem',
        border: '2px solid #268579',
        textAlign: 'center' as const,
        boxShadow: '0 4px 12px rgba(38,133,121,0.15)',
        position: 'relative' as const
      },
      verifiedBadge: {
        position: 'absolute' as const,
        top: '-12px',
        right: '12px',
        backgroundColor: '#268579',
        color: 'white',
        padding: '0.375rem 0.75rem',
        borderRadius: '1rem',
        fontSize: '0.75rem',
        fontWeight: 'bold' as const
      },
      benefitIconWrapper: {
        width: '60px',
        height: '60px',
        margin: '0 auto 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: '#e6f7f5'
      },
      benefitIcon: {
        fontSize: '1.75rem',
        color: '#268579'
      },
      benefitTitle: {
        fontSize: '1.15rem',
        fontWeight: 'bold' as const,
        color: '#1a1a1a',
        marginBottom: '0.75rem'
      },
      benefitDescription: {
        fontSize: '0.875rem',
        color: '#666',
        lineHeight: 1.6,
        margin: 0
      }
      
  };

  return (
    <>
      <Helmet>
        <title>Essay Embassy - Professional Essay Writing Service</title>
        <meta name="description" content="Get expert help with essays, research papers, and academic writing. 5000+ satisfied students. PhD writers available 24/7." />
        <style>{`
          .reviews-scroll-container::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </Helmet>

      {/* Hero Section - Already Mobile Optimized */}
      <HeroSectionSimple /> 

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>5,000+</h2>
            <p style={styles.statLabel}>Students Helped</p>
          </div>

          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>PhD & Master's</h2>
            <p style={styles.statLabel}>Level Writers Onboard</p>
          </div>

          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>98%</h2>
            <p style={styles.statLabel}>Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Concerns & Solutions Section */}
      <section style={styles.concernsSection}>
        <div style={styles.sectionInner}>
          {/* Tab Buttons */}
          <div style={styles.tabButtons}>
            <button
              onClick={() => setActiveTab('concerns')}
              style={styles.tabButton(activeTab === 'concerns')}
            >
              Your Concerns
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              style={styles.tabButton(activeTab === 'solutions')}
            >
              How We Help
            </button>
          </div>

          {/* Tab Content */}
          <div style={styles.contentCard}>
            {activeTab === 'concerns' ? (
              <div>
                {concerns.map((concern, idx) => (
                  <div key={idx} style={styles.concernItem}>
                    <span style={{...styles.icon, color: '#f59e0b'}}>⚠️</span>
                    <p style={styles.itemText}>{concern.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {solutions.map((solution, idx) => (
                  <div key={idx} style={styles.solutionItem}>
                    <span style={{...styles.icon, color: '#10b981'}}>✓</span>
                    <div style={{flex: 1}}>
                      <p style={styles.itemText}>
                        <span style={styles.solutionTitle}>{solution.title}</span>{' '}
                        {solution.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section style={styles.whyChooseSection}>
        <div style={styles.whyChooseInner}>
          <h2 style={styles.sectionTitle}>
            Why Choose <span style={styles.sectionTitleAccent}>Essay Embassy</span>?
          </h2>
          <p style={styles.sectionSubtitle}>
            We deliver high-quality academic writing services with a focus on excellence, dependability, and your ultimate student success.
          </p>
          <div>
            <div style={styles.featureCard}>
              <span style={{...styles.featureIcon, color: '#268579'}}>🎧</span>
              <h3 style={styles.featureTitle}>24/7 Support</h3>
              <p style={styles.featureDescription}>
                Our customer service team is here for you 24/7. Get quick answers and guidance for any academic question, day or night. We're always available.
              </p>
            </div>
            <div style={styles.featureCard}>
              <span style={{...styles.featureIcon, color: '#268579'}}>🎓</span>
              <h3 style={styles.featureTitle}>Expert Writers</h3>
              <p style={styles.featureDescription}>
                Our expert writers hold advanced degrees and are specialists in various fields. Your project will be handled by a subject matter professional.
              </p>
            </div>
            <div style={styles.featureCard}>
              <span style={{...styles.featureIcon, color: '#268579'}}>🛡️</span>
              <h3 style={styles.featureTitle}>Original Content</h3>
              <p style={styles.featureDescription}>
                Every document is custom-written from a blank page. We guarantee 100% unique work and provide a detailed report to prove its originality.
              </p>
            </div>
            <div style={styles.featureCard}>
              <span style={{...styles.featureIcon, color: '#268579'}}>⏰</span>
              <h3 style={styles.featureTitle}>Always On Time</h3>
              <p style={styles.featureDescription}>
                We understand academic deadlines are crucial. Our streamlined process ensures your work is delivered on or before the agreed-upon submission time.
              </p>
            </div>
            <div style={styles.featureCard}>
              <span style={{...styles.featureIcon, color: '#268579'}}>💲</span>
              <h3 style={styles.featureTitle}>Affordable Prices</h3>
              <p style={styles.featureDescription}>
                You can get the quality help you need without high costs. Our affordable rates are fair and friendly for any student's budget.
              </p>
            </div>
            <div style={styles.featureCard}>
              <span style={{...styles.featureIcon, color: '#268579'}}>🔄</span>
              <h3 style={styles.featureTitle}>Free Unlimited Edits</h3>
              <p style={styles.featureDescription}>
                Your satisfaction is our main goal. We offer free, unlimited revisions on every project until it meets your exact requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section style={styles.coreBenefitsSection}>
        <div style={styles.coreBenefitsInner}>
          <h2 style={styles.sectionTitle}>
            Our <span style={styles.sectionTitleAccent}>Core Benefits</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Experience the advantages that make us the preferred choice for academic assistance.
          </p>

          <div style={{textAlign: 'center' as const, marginBottom: '2rem'}}>
            <span style={styles.badge}>
              <span style={{fontSize: '1rem'}}>✓</span>
              Trusted by 10,000+ students
            </span>
          </div>

          <div>
            <div style={styles.benefitCard}>
              <div style={styles.benefitIconWrapper}>
                <span style={styles.benefitIcon}>🛡️</span>
              </div>
              <h3 style={styles.benefitTitle}>Confidentiality</h3>
              <p style={styles.benefitDescription}>
                Your personal information and orders are completely secure
              </p>
            </div>

            <div style={styles.benefitCardHighlight}>
              <span style={styles.verifiedBadge}>Verified</span>
              <div style={styles.benefitIconWrapper}>
                <span style={styles.benefitIcon}>🔄</span>
              </div>
              <h3 style={styles.benefitTitle}>Free Revisions</h3>
              <p style={styles.benefitDescription}>
                Unlimited revisions within 14 days of delivery
              </p>
            </div>

            <div style={styles.benefitCard}>
              <div style={styles.benefitIconWrapper}>
                <span style={styles.benefitIcon}>🎧</span>
              </div>
              <h3 style={styles.benefitTitle}>Dedicated Support</h3>
              <p style={styles.benefitDescription}>
                Personal support manager for every order
              </p>
            </div>

            <div style={styles.benefitCard}>
              <div style={styles.benefitIconWrapper}>
                <span style={styles.benefitIcon}>✓</span>
              </div>
              <h3 style={styles.benefitTitle}>Plagiarism-Free Guarantee</h3>
              <p style={styles.benefitDescription}>
                Original content with detailed plagiarism reports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Academic Writing Services Section - COMPLETE CODE */}
<section style={{
  padding: '3rem 1rem',
  backgroundColor: '#f8f9fa'
}}>
  <div style={{
    maxWidth: '600px',
    margin: '0 auto'
  }}>
    {/* Graduation Cap Icon */}
    <div style={{
      width: '70px',
      height: '70px',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: '#d1fae5'
    }}>
      <span style={{fontSize: '2rem', color: '#268579'}}>🎓</span>
    </div>

    <h2 style={{
      fontSize: '1.75rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem',
      color: '#1a1a1a',
      lineHeight: 1.3
    }}>
      Our Academic Writing <span style={{color: '#268579'}}>Services</span>
    </h2>
    
    <p style={{
      fontSize: '0.95rem',
      textAlign: 'center',
      color: '#666',
      marginBottom: '2.5rem',
      lineHeight: 1.6,
      padding: '0 1rem'
    }}>
      Comprehensive academic support across all disciplines with expert writers, guaranteed quality, and timely delivery for your educational success.
    </p>

    <div>
      {/* Card 1: Essay Writing Services */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1.25rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.5rem',
          backgroundColor: '#e6f7f5'
        }}>
          <span style={{fontSize: '1.5rem', color: '#268579'}}>📝</span>
        </div>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem'
        }}>Essay Writing Services</h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          Professional essay writing with original content, proper citations, and guaranteed quality for all academic levels.
        </p>
        
        {/* Features List */}
        <div style={{marginBottom: '1.25rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Original Content</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Proper Citations</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>All Academic Levels</span>
          </div>
        </div>

        <button onClick={() => navigate('/services/essay-writing')} style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Order Essay <span>→</span>
        </button>
      </div>

      {/* Card 2: Assignment Help */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1.25rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.5rem',
          backgroundColor: '#e6f7f5'
        }}>
          <span style={{fontSize: '1.5rem', color: '#268579'}}>📖</span>
        </div>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem'
        }}>Assignment Help</h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          Expert assistance with assignments across all subjects, ensuring timely delivery and academic excellence.
        </p>
        
        <div style={{marginBottom: '1.25rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>All Subjects</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Timely Delivery</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Expert Writers</span>
          </div>
        </div>

        <button onClick={() => navigate('/services/assignment-help')} style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Get Help <span>→</span>
        </button>
      </div>

      {/* Card 3: Homework Help */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1.25rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.5rem',
          backgroundColor: '#e6f7f5'
        }}>
          <span style={{fontSize: '1.5rem', color: '#268579'}}>🎓</span>
        </div>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem'
        }}>Homework Help</h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          Comprehensive homework support with step-by-step solutions and detailed explanations for better understanding.
        </p>
        
        <div style={{marginBottom: '1.25rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Step-by-Step Solutions</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Detailed Explanations</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Quick Turnaround</span>
          </div>
        </div>

        <button onClick={() => navigate('/services/homework-help')} style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Start Now <span>→</span>
        </button>
      </div>

      {/* Card 4: Research Paper Help */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1.25rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.5rem',
          backgroundColor: '#e6f7f5'
        }}>
          <span style={{fontSize: '1.5rem', color: '#268579'}}>🔍</span>
        </div>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem'
        }}>Research Paper Help</h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          In-depth research papers with comprehensive analysis, credible sources, and academic formatting standards.
        </p>
        
        <div style={{marginBottom: '1.25rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Comprehensive Analysis</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Credible Sources</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Academic Formatting</span>
          </div>
        </div>

        <button onClick={() => navigate('/services/research-paper-writing')} style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Order Research <span>→</span>
        </button>
      </div>

      {/* Card 5: Thesis Writing Help */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1.25rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.5rem',
          backgroundColor: '#e6f7f5'
        }}>
          <span style={{fontSize: '1.5rem', color: '#268579'}}>📄</span>
        </div>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem'
        }}>Thesis Writing Help</h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          Professional thesis writing support with extensive research, proper methodology, and academic rigor.
        </p>
        
        <div style={{marginBottom: '1.25rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Extensive Research</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Proper Methodology</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Academic Rigor</span>
          </div>
        </div>

        <button onClick={() => navigate('/services/thesis-writing')} style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Get Started <span>→</span>
        </button>
      </div>

      {/* Card 6: Dissertation Writing Help */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1.25rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.5rem',
          backgroundColor: '#e6f7f5'
        }}>
          <span style={{fontSize: '1.5rem', color: '#268579'}}>📋</span>
        </div>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem'
        }}>Dissertation Writing Help</h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          Complete dissertation support from proposal to defense with expert guidance and comprehensive research.
        </p>
        
        <div style={{marginBottom: '1.25rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Proposal to Defense</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Expert Guidance</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{color: '#10b981', fontSize: '1rem'}}>✓</span>
            <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Comprehensive Research</span>
          </div>
        </div>

        <button onClick={() => navigate('/services/dissertation-writing')} style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Begin Dissertation <span>→</span>
        </button>
      </div>

      {/* Explore All Services Button */}
      <div style={{textAlign: 'center', marginTop: '2rem'}}>
        <button onClick={() => navigate('/services')} style={{
          padding: '1rem 2rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 12px rgba(38,133,121,0.25)'
        }}>
          Explore All Services <span>→</span>
        </button>
      </div>
    </div>
  </div>
</section>

{/* Testimonials Section - IMPROVED DYNAMIC SWIPE */}
<section style={{
  padding: '3rem 1rem',
  backgroundColor: '#f0f4f8',
  overflow: 'hidden'
}}>
  <div style={{
    maxWidth: '500px',
    margin: '0 auto',
    position: 'relative'
  }}>
    {/* Reviews Badge */}
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#d1fae5',
      color: '#065f46',
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      margin: '0 auto 1.5rem',
      border: '1px solid #a7f3d0',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)'
    }}>
      Reviews 🎖️
    </div>

    <h2 style={{
      fontSize: '1.75rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem',
      color: '#1a1a1a',
      lineHeight: 1.3
    }}>
      Honest feedback about <span style={{color: '#268579'}}>EssayEmbassy</span>
    </h2>
    
    <p style={{
      fontSize: '0.9rem',
      textAlign: 'center',
      color: '#666',
      marginBottom: '2rem',
      lineHeight: 1.6,
      padding: '0 0.5rem'
    }}>
      See what real students say about our academic writing, research, and technical assignment help. Your next top grade starts here!
    </p>

    {/* Platform Tabs */}
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    }}>
      <button 
        onClick={() => handlePlatformChange('google')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1rem',
          backgroundColor: activePlatform === 'google' ? '#268579' : 'white',
          color: activePlatform === 'google' ? 'white' : '#4b5563',
          border: activePlatform === 'google' ? 'none' : '1px solid #d1d5db',
          borderRadius: '2rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: activePlatform === 'google' ? '0 2px 6px rgba(38,133,121,0.25)' : 'none',
          transition: 'all 0.2s'
        }}
      >
        <span style={{display:'inline-flex'}}>
          <svg width="16" height="16" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
            <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
            <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
            <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
          </svg>
        </span>
        Google
      </button>

      <button 
        onClick={() => handlePlatformChange('sitejabber')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1rem',
          backgroundColor: activePlatform === 'sitejabber' ? '#268579' : 'white',
          color: activePlatform === 'sitejabber' ? 'white' : '#4b5563',
          border: activePlatform === 'sitejabber' ? 'none' : '1px solid #d1d5db',
          borderRadius: '2rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: activePlatform === 'sitejabber' ? '0 2px 6px rgba(38,133,121,0.25)' : 'none',
          transition: 'all 0.2s'
        }}
      >
        <span style={{display:'inline-flex'}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" fill="currentColor"/>
            <path d="M8 5l1 2h2l-1.5 1.5L10.5 11 8 9.5 5.5 11l1-2.5L5 7h2L8 5z" fill="white"/>
          </svg>
        </span>
        Sitejabber
      </button>

      <button 
        onClick={() => handlePlatformChange('trustpilot')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1rem',
          backgroundColor: activePlatform === 'trustpilot' ? '#268579' : 'white',
          color: activePlatform === 'trustpilot' ? 'white' : '#4b5563',
          border: activePlatform === 'trustpilot' ? 'none' : '1px solid #d1d5db',
          borderRadius: '2rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: activePlatform === 'trustpilot' ? '0 2px 6px rgba(38,133,121,0.25)' : 'none',
          transition: 'all 0.2s'
        }}
      >
        <span style={{display:'inline-flex'}}>
          <svg viewBox="0 0 799.89 761" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M799.89 290.83H494.44L400.09 0l-94.64 290.83L0 290.54l247.37 179.92L152.72 761l247.37-179.63L647.16 761l-94.35-290.54z" fill="#00b67a"/>
            <path d="M574.04 536.24l-21.23-65.78-152.72 110.91z" fill="#005128"/>
          </svg>
        </span>
        TrustPilot
      </button>
    </div>

    {/* Testimonial Cards Container with Navigation */}
    <div style={{
      position: 'relative',
      width: '100%',
      marginBottom: '2rem'
    }}>
      {/* Navigation Arrow - Left */}
      {activeReview > 0 && (
        <button
          onClick={prevReview}
          style={{
            position: 'absolute',
            left: '0.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '2px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#268579';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
          aria-label="Previous review"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#268579" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}

      {/* Cards Wrapper */}
      <div 
        ref={reviewsTrackRef} 
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
          paddingLeft: '6%',
          paddingRight: '6%',
          paddingBottom: '1rem',
          scrollPaddingLeft: '6%',
          scrollPaddingRight: '6%'
        }}
        className="reviews-scroll-container"
      >
        {reviews.map((review, index) => (
          <div 
            key={index}
            style={{
              minWidth: '88%',
              maxWidth: '88%',
              backgroundColor: 'white',
              padding: '2rem 1.5rem',
              borderRadius: '1rem',
              boxShadow: activeReview === index 
                ? '0 8px 24px rgba(38,133,121,0.2)' 
                : '0 4px 12px rgba(0,0,0,0.08)',
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always',
              border: activeReview === index 
                ? '2px solid #268579' 
                : '1px solid #e5e7eb',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              transform: activeReview === index ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            {/* Tag */}
            <div style={{
              fontSize: '0.8rem',
              color: '#268579',
              fontWeight: 600,
              marginBottom: '1rem',
              backgroundColor: '#e6f7f5',
              padding: '0.5rem 0.875rem',
              borderRadius: '0.5rem',
              display: 'inline-block'
            }}>
              {review.tag}
            </div>

            {/* Review Text */}
            <p style={{
              fontSize: '0.95rem',
              color: '#374151',
              lineHeight: 1.7,
              marginBottom: '1.25rem',
              minHeight: '70px'
            }}>
              {review.text}
            </p>

            {/* Stars */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', gap: '0.15rem', alignItems: 'center' }}>
                {renderStars(review.rating)}
              </div>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151'
              }}>
                {review.rating.toFixed(1)}
              </span>
            </div>

            {/* Order Info */}
            <div style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              marginBottom: '0.25rem'
            }}>
              Order ID: {review.orderId}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#9ca3af'
            }}>
              {review.date}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrow - Right */}
      {activeReview < reviews.length - 1 && (
        <button
          onClick={nextReview}
          style={{
            position: 'absolute',
            right: '0.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '2px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#268579';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
          aria-label="Next review"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#268579" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}
    </div>

    {/* Pagination Dots */}
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1rem'
    }}>
      {reviews.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToReview(index)}
          style={{
            width: activeReview === index ? '2rem' : '0.5rem',
            height: '0.5rem',
            backgroundColor: activeReview === index ? '#268579' : '#d1d5db',
            border: 'none',
            borderRadius: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: 0
          }}
          aria-label={`Go to review ${index + 1}`}
        />
      ))}
    </div>

    {/* Swipe Hint */}
    <div style={{
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.75rem',
      color: '#9ca3af',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    }}>
      👈 Swipe to see more reviews 👉
    </div>
  </div>
</section>

{/* How It Works Section - PROFESSIONAL & DYNAMIC - COMPLETE CODE */}
<section style={{
  padding: '3rem 1rem',
  backgroundColor: '#ffffff'
}}>
  <div style={{
    maxWidth: '600px',
    margin: '0 auto'
  }}>
    <h2 style={{
      fontSize: '1.85rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem',
      color: '#1a1a1a',
      lineHeight: 1.3
    }}>
      How It <span style={{color: '#268579'}}>Works</span>
    </h2>
    
    <p style={{
      fontSize: '0.95rem',
      textAlign: 'center',
      color: '#666',
      marginBottom: '1rem',
      lineHeight: 1.6,
      padding: '0 1rem'
    }}>
      Get your assignment completed in three simple steps.
    </p>

    {/* Fast & Secure Process Badge */}
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      margin: '0 auto 2.5rem',
      border: '1px solid #bfdbfe',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)'
    }}>
      <span style={{fontSize: '1rem'}}>🔒</span>
      Fast & Secure Process
    </div>

    {/* Steps Container */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      {/* Step 1: Fill the Form */}
      <div style={{
        position: 'relative',
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        border: '2px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        {/* Step Number Badge */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '40px',
          backgroundColor: '#268579',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(38,133,121,0.3)'
        }}>
          1
        </div>

        {/* Icon */}
        <div style={{
          width: '70px',
          height: '70px',
          margin: '1rem auto 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#e6f7f5'
        }}>
          <span style={{fontSize: '2rem', color: '#268579'}}>📝</span>
        </div>

        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem',
          textAlign: 'center'
        }}>Fill the Form</h3>
        
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          margin: 0,
          textAlign: 'center'
        }}>
          Provide your assignment details and requirements
        </p>

        {/* Arrow Down */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '2rem',
          color: '#d1d5db'
        }}>
          ↓
        </div>
      </div>

      {/* Step 2: Writer Assigned */}
      <div style={{
        position: 'relative',
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        border: '2px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        {/* Step Number Badge */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '40px',
          backgroundColor: '#268579',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(38,133,121,0.3)'
        }}>
          2
        </div>

        {/* Icon */}
        <div style={{
          width: '70px',
          height: '70px',
          margin: '1rem auto 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#e6f7f5'
        }}>
          <span style={{fontSize: '2rem', color: '#268579'}}>👥</span>
        </div>

        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem',
          textAlign: 'center'
        }}>Writer Assigned</h3>
        
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          margin: 0,
          textAlign: 'center'
        }}>
          We match you with the best expert for your subject
        </p>

        {/* Arrow Down */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '2rem',
          color: '#d1d5db'
        }}>
          ↓
        </div>
      </div>

      {/* Step 3: Download Your Work */}
      <div style={{
        position: 'relative',
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        border: '2px solid #268579',
        boxShadow: '0 4px 12px rgba(38,133,121,0.15)'
      }}>
        {/* Step Number Badge */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '40px',
          backgroundColor: '#268579',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(38,133,121,0.3)'
        }}>
          3
        </div>

        {/* Icon with Animation Effect */}
        <div style={{
          width: '70px',
          height: '70px',
          margin: '1rem auto 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#268579'
        }}>
          <span style={{fontSize: '2rem', color: 'white'}}>⬇️</span>
        </div>

        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '0.75rem',
          textAlign: 'center'
        }}>Download Your Work</h3>
        
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          lineHeight: 1.6,
          margin: 0,
          textAlign: 'center'
        }}>
          Receive your completed assignment on time
        </p>
      </div>
    </div>

    {/* CTA Button */}
    <div style={{
      textAlign: 'center',
      marginTop: '2.5rem'
    }}>
      <button 
        onClick={() => navigate('/order')}
        style={{
          padding: '1rem 2.5rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 12px rgba(38,133,121,0.25)',
          transition: 'all 0.3s'
        }}
      >
        Get Started Now <span>→</span>
      </button>
    </div>

    {/* Trust Indicators */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.75rem'
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#268579',
          marginBottom: '0.25rem'
        }}>24/7</div>
        <div style={{
          fontSize: '0.75rem',
          color: '#6b7280'
        }}>Support</div>
      </div>

      <div style={{
        width: '1px',
        backgroundColor: '#d1d5db'
      }}></div>

      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#268579',
          marginBottom: '0.25rem'
        }}>100%</div>
        <div style={{
          fontSize: '0.75rem',
          color: '#6b7280'
        }}>Original</div>
      </div>

      <div style={{
        width: '1px',
        backgroundColor: '#d1d5db'
      }}></div>

      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#268579',
          marginBottom: '0.25rem'
        }}>Safe</div>
        <div style={{
          fontSize: '0.75rem',
          color: '#6b7280'
        }}>& Secure</div>
      </div>
    </div>
  </div>
</section>

{/* Our Academic Writers Section - MOBILE-FRIENDLY STRUCTURE - COMPLETE CODE */}
<section style={{
  padding: '3rem 1rem',
  backgroundColor: '#f8f9fa'
}}>
  <div style={{
    maxWidth: '600px',
    margin: '0 auto'
  }}>
    <h2 style={{
      fontSize: '1.85rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem',
      color: '#1a1a1a',
      lineHeight: 1.3
    }}>
      Our team of <span style={{color: '#268579'}}>academic writers</span>
    </h2>
    
    <p style={{
      fontSize: '0.95rem',
      textAlign: 'center',
      color: '#666',
      marginBottom: '2.5rem',
      lineHeight: 1.6,
      padding: '0 1rem'
    }}>
      Top-rated academic writers for essays, research, programming, and more. Real experts. Real results.
    </p>

    {/* Writers Carousel - Swipeable */}
    <div style={{ position: 'relative' }}>
      <div
        ref={writersTrackRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const cardWidth = el.clientWidth * 0.9 + 12; // 90% + gap
          const idx = Math.round(el.scrollLeft / cardWidth);
          setActiveWriter(Math.max(0, Math.min(idx, 5)));
        }}
        style={{
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '0.75rem'
        }}
      >
        {[
          { name: 'Connor Beatty', degree: "Master's degree", rating: '5.0', img: '/images/writers/Connor-Beatty-Writer.jpg', tags: ['Business', 'Economics'] },
          { name: 'David Berlin', degree: 'PhD degree', rating: '4.9', img: '/images/writers/David-Berlin-Writer.jpg', tags: ['Computer Science', 'Engineering'] },
          { name: 'Brett Fuller', degree: "Master's degree", rating: '4.8', img: '/images/writers/Brett-Fuller-Writer.jpg', tags: ['Healthcare', 'Biology'] },
          { name: 'Jenifer Moralez', degree: "Master's degree", rating: '5.0', img: '/images/writers/Jenifer-Moralez-Writer.webp', tags: ['Psychology', 'Sociology'] },
          { name: 'Lauren Miller', degree: "Master's degree", rating: '4.9', img: '/images/writers/Lauren-Miller-Writer.jpg', tags: ['Literature', 'History'] },
          { name: 'Sarah Massari', degree: 'PhD degree', rating: '5.0', img: '/images/writers/Sarah-Massari-Writer.jpg', tags: ['Education', 'Research'] }
        ].map((w, i) => (
          <div
            key={i}
            style={{
              minWidth: '90%',
              maxWidth: '90%',
              height: '320px',
              borderRadius: '1rem',
              overflow: 'hidden',
              scrollSnapAlign: 'center',
              position: 'relative',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 65%), url(${w.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '1.25rem'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              backgroundColor: 'rgba(255,255,255,0.85)',
              color: '#111827',
              borderRadius: '9999px',
              padding: '0.35rem 0.7rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>
              <span style={{ color: '#f59e0b' }}>⭐</span>{w.rating}
            </div>
            <div style={{ color: 'white' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, textShadow: '0 2px 6px rgba(0,0,0,0.35)' }}>{w.name}</h3>
              <p style={{ margin: '0.35rem 0 0.85rem 0', fontSize: '0.875rem', color: 'rgba(255,255,255,0.92)' }}>{w.degree}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {w.tags.map((t, idx) => (
                  <span key={idx} style={{
                    backgroundColor: 'rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(6px)',
                    color: 'white',
                    padding: '0.4rem 0.7rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.2px'
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
        {[0,1,2,3,4,5].map((d) => (
          <div key={d} style={{
            width: activeWriter === d ? '1.25rem' : '0.45rem',
            height: '0.45rem',
            backgroundColor: activeWriter === d ? '#268579' : '#d1d5db',
            borderRadius: '9999px',
            transition: 'all 0.25s ease'
          }} />
        ))}
      </div>
    </div>

    {/* View All Writers Button */}
    <div style={{
      textAlign: 'center',
      marginTop: '2rem'
    }}>
      <button style={{
        padding: '1rem 2rem',
        backgroundColor: 'white',
        color: '#268579',
        border: '2px solid #268579',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(38,133,121,0.15)'
      }}>
        View all writers
      </button>
    </div>
  </div>
</section>

      {/* CTA Section (moved inside component for proper scope) */}
      <section style={{
        padding: '3rem 1rem',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '1.85rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '0.75rem',
            color: '#1a1a1a',
            lineHeight: 1.3
          }}>
            Ready to get started?
          </h2>

          <p style={{
            fontSize: '0.95rem',
            textAlign: 'center',
            color: '#4b5563',
            marginBottom: '2rem',
            lineHeight: 1.6,
            padding: '0 0.5rem'
          }}>
            Join thousands of successful students who trust Essay Embassy for their academic needs.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {/* Primary CTA - Place Order */}
            <button
              onClick={() => navigate('/order')}
              style={{
                width: '100%',
                padding: '1.125rem',
                backgroundColor: '#268579',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(38,133,121,0.3)',
                transition: 'transform 0.2s'
              }}
            >
              <span>➜</span> Place Your Order Now
            </button>

            {/* Secondary CTA - Contact */}
            <button
              onClick={() => navigate('/contact')}
              style={{
                width: '100%',
                padding: '1.125rem',
                backgroundColor: 'white',
                color: '#268579',
                border: '2px solid #268579',
                borderRadius: '0.75rem',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s'
              }}
            >
              Contact Us
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #d1d5db'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563', fontWeight: 500 }}>
              <span style={{ fontSize: '1.25rem' }}>🔒</span>
              Secure Payment
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563', fontWeight: 500 }}>
              <span style={{ fontSize: '1.25rem' }}>📞</span>
              24/7 Support
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563', fontWeight: 500 }}>
              <span style={{ fontSize: '1.25rem' }}>✅</span>
              Money-Back Guarantee
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
