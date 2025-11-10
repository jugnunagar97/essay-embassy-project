import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSectionSimple from '../components/Hero/HeroSectionSimple'; // ✅ Changed this
import { useNavigate } from 'react-router-dom';

export default function MobileHome() {
  const [activeTab, setActiveTab] = useState<'concerns' | 'solutions'>('concerns');
  const navigate = useNavigate();

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
