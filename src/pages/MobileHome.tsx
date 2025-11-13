import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSectionSimple from '../components/Hero/HeroSectionSimple'; // ✅ Changed this
import { useNavigate } from 'react-router-dom';

export default function MobileHome() {
  const [activeTab, setActiveTab] = useState<'concerns' | 'solutions'>('concerns');
  const [activePlatform, setActivePlatform] = useState<'google' | 'sitejabber' | 'trustpilot'>('google');
  const [showMoreReviews, setShowMoreReviews] = useState<boolean>(false);
  const [showMoreWriters, setShowMoreWriters] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
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

  const reviewPlatforms = [
    {
      id: 'google' as const,
      label: 'Google',
      icon: (
        <svg width="16" height="16" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
          <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
          <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
          <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
          <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
        </svg>
      ),
      reviews: [
        {
          title: 'Dissertation Chapter',
          text: "I reached out three nights before my methodology chapter was due and was honestly panicking. My writer mapped out a structure during our first chat, asked smart follow-up questions, and sent updates every few hours. When the draft arrived it felt like someone had climbed inside my research brain—clean tables, clear transitions, even gentle suggestions for my presentation slides.",
          meta: 'Customer ID: 954836 • Nov 30, 2024'
        },
        {
          title: 'Term Paper',
          text: "This term paper was for an accelerated MBA course and the rubric was brutal. The Essay Embassy team helped me narrow the scope, offered journal sources I hadn’t considered, and polished the final copy so it read like something I actually had time to craft. My professor commented on the improved flow compared to my earlier submissions.",
          meta: 'Customer ID: 401493 • Nov 22, 2024'
        },
        {
          title: 'Argumentative Essay',
          text: "I’m usually skeptical of writing help, but they were transparent from the start. We talked through my stance, the counter-arguments, and even the tone my instructor prefers. The finished essay balanced evidence with my own voice, so it still felt authentic when I presented it in class.",
          meta: 'Customer ID: 523891 • Nov 10, 2024'
        }
      ],
      moreReviews: [
        {
          title: 'Research Proposal',
          text: "My advisor kept asking me to clarify the research gap, and I felt stuck. Essay Embassy paired me with a mentor who dissected the rubric, drafted an outline with measurable objectives, and rehearsed my pitch with me over Zoom. The proposal finally earned the green light and I hit submit without second-guessing myself.",
          meta: 'Customer ID: 782341 • Nov 25, 2024'
        },
        {
          title: 'Case Study Presentation',
          text: "We had mountains of raw survey data and zero time to craft a story. The writer built comparison tables, scripted my talking points, and added visuals that made our slides pop. Our professor highlighted the presentation as the benchmark for future cohorts.",
          meta: 'Customer ID: 345672 • Nov 18, 2024'
        }
      ]
    },
    {
      id: 'sitejabber' as const,
      label: 'Sitejabber',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" fill="currentColor"/>
          <path d="M8 5l1 2h2l-1.5 1.5L10.5 11 8 9.5 5.5 11l1-2.5L5 7h2L8 5z" fill="white"/>
        </svg>
      ),
      reviews: [
        {
          title: 'Research Paper',
          text: "My research methods professor is notorious for red-pen feedback, so I booked Essay Embassy for guidance. The writer built a detailed outline with bullet-proof citations, then coached me through the data interpretation. When we submitted, the professor said my literature review was the strongest in class.",
          meta: 'Customer ID: 612489 • Nov 28, 2024'
        },
        {
          title: 'Literature Review',
          text: "Balancing work and grad school was taking a toll. The team organized my scattered sources, highlighted gaps, and drafted the narrative in a way that made my arguments click. They even showed me how to update the bibliography quickly in the future.",
          meta: 'Customer ID: 556234 • Nov 4, 2024'
        },
        {
          title: 'Case Study Analysis',
          text: "I needed a case study analysis that felt boardroom-ready. The writer dug into the company background, layered in market data, and wrapped everything with actionable recommendations. My tutor said it read like something prepared by a consulting firm.",
          meta: 'Customer ID: 778921 • Nov 8, 2024'
        }
      ],
      moreReviews: [
        {
          title: 'Critical Review',
          text: "Balancing my marketing job and grad school left no room to decode journal articles. The Essay Embassy editor walked me through each source, highlighted contradictory findings, and drafted a narrative that felt like a mini masterclass in analysis. My grade jumped and I finally understood the material.",
          meta: 'Customer ID: 556234 • Nov 4, 2024'
        },
        {
          title: 'Group Project Support',
          text: "Our capstone team had ideas but zero cohesion. The consultant from Essay Embassy held a single alignment call, divided responsibilities, and even supplied a shared reference library. The final report sounded unified and we wrapped the semester on good terms.",
          meta: 'Customer ID: 117689 • Oct 25, 2024'
        }
      ]
    },
    {
      id: 'trustpilot' as const,
      label: 'TrustPilot',
      icon: (
        <svg viewBox="0 0 799.89 761" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path d="M799.89 290.83H494.44L400.09 0l-94.64 290.83L0 290.54l247.37 179.92L152.72 761l247.37-179.63L647.16 761l-94.35-290.54z" fill="#00b67a"/>
          <path d="M574.04 536.24l-21.23-65.78-152.72 110.91z" fill="#005128"/>
        </svg>
      ),
      reviews: [
        {
          title: 'Dissertation Writing',
          text: "Essay Embassy paired me with a PhD mentor who scheduled weekly check-ins. She helped refine my research questions, anticipated committee objections, and made sure every chapter linked back to my thesis statement. Defending felt less scary because I knew the groundwork was solid.",
          meta: 'Customer ID: 224789 • Nov 29, 2024'
        },
        {
          title: 'Essay Writing',
          text: "I was juggling internship applications while this essay was due. The writer kept my tone intact, strengthened weak paragraphs, and added transitions that made my argument flow. Submitting it felt like handing in the version I always hoped I’d have time to write.",
          meta: 'Customer ID: 558123 • Nov 26, 2024'
        },
        {
          title: 'Coursework Help',
          text: "Our group project stalled because no one wanted to draft the analytical section. Essay Embassy stepped in, turned our scattered notes into a cohesive analysis, and even suggested visuals for our slide deck. We ended up leading the class discussion with confidence.",
          meta: 'Customer ID: 447891 • Nov 11, 2024'
        }
      ],
      moreReviews: [
        {
          title: 'Thesis Defense Prep',
          text: "My committee is famous for grilling students on methodology. The mentor reviewed my notes, prepared flash-card style questions, and polished my slides so the statistics told a clear story. During the defense I could answer calmly, and two committee members complimented my preparedness.",
          meta: 'Customer ID: 332567 • Nov 3, 2024'
        },
        {
          title: 'Technical Assignment',
          text: "I reached out for a data structures project that had to run flawlessly. The specialist delivered commented code, explained the logic in a short Loom video, and stuck around while I deployed it. The TA said my submission looked like something that belongs in production.",
          meta: 'Customer ID: 669234 • Nov 7, 2024'
        }
      ]
    }
  ];

  useEffect(() => {
    setShowMoreReviews(false);
  }, [activePlatform]);

  const currentPlatform = reviewPlatforms.find((platform) => platform.id === activePlatform) ?? reviewPlatforms[0];
  const displayedReviews = showMoreReviews
    ? [...currentPlatform.reviews, ...(currentPlatform.moreReviews ?? [])]
    : currentPlatform.reviews;

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

{/* Testimonials Section - Mobile Reviews */}
<section style={{
  padding: '3rem 1rem',
  backgroundColor: '#f0f4f8'
}}>
  <div style={{
    maxWidth: '500px',
    margin: '0 auto'
  }}>
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
      Reviews
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
      See what real students say about our academic writing, research, and technical assignment help.
    </p>

    <div style={{
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    }}>
      {reviewPlatforms.map((platform) => {
        const isActive = activePlatform === platform.id;
        const iconColor =
          platform.id === 'google'
            ? undefined
            : isActive
              ? '#ffffff'
              : platform.id === 'sitejabber'
                ? '#f97316'
                : '#22c55e';

        return (
          <button
            key={platform.id}
            onClick={() => setActivePlatform(platform.id)}
            style={{
              display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1rem',
              backgroundColor: isActive ? '#268579' : 'white',
              color: isActive ? 'white' : '#4b5563',
              border: isActive ? 'none' : '1px solid #d1d5db',
        borderRadius: '2rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'pointer',
              boxShadow: isActive ? '0 2px 6px rgba(38,133,121,0.25)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <span style={{
              display: 'inline-flex',
        alignItems: 'center',
              color: iconColor
            }}>
              {platform.icon}
            </span>
            {platform.label}
      </button>
        );
      })}
    </div>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {displayedReviews.map((review, index) => (
        <div
          key={`${currentPlatform.id}-${index}`}
          style={{
          backgroundColor: 'white',
            padding: '1.75rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb'
          }}
        >
          <div style={{
            fontSize: '0.8rem',
            color: '#268579',
            fontWeight: 600,
            marginBottom: '0.75rem',
            backgroundColor: '#e6f7f5',
            padding: '0.5rem 0.875rem',
            borderRadius: '0.5rem',
            display: 'inline-block'
          }}>
            {review.title}
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: '#374151',
            lineHeight: 1.7,
            marginBottom: '1rem'
          }}>
            {review.text}
          </p>

          <div style={{
            display: 'flex',
            gap: '0.25rem',
            marginBottom: '0.75rem'
          }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} style={{color: '#fbbf24', fontSize: '1.1rem'}}>⭐</span>
            ))}
          </div>

          <div style={{fontSize: '0.8rem', color: '#9ca3af'}}>
            {review.meta}
          </div>
          </div>
            ))}
          </div>

    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <button 
          onClick={() => setShowMoreReviews((prev) => !prev)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 1.75rem',
          backgroundColor: showMoreReviews ? 'white' : '#268579',
          color: showMoreReviews ? '#268579' : 'white',
          border: showMoreReviews ? '2px solid #268579' : 'none',
          borderRadius: '0.75rem',
          fontSize: '0.95rem',
            fontWeight: 600,
          cursor: 'pointer',
          boxShadow: showMoreReviews ? 'none' : '0 4px 12px rgba(38,133,121,0.25)',
          transition: 'all 0.2s'
        }}
      >
        {showMoreReviews ? 'Show Fewer Reviews' : 'Load More Reviews'}
        <span>{showMoreReviews ? '↑' : '↓'}</span>
      </button>
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
          onClick={() => navigate('/order-now')}
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

{/* Our Academic Writers Section - FULLY FUNCTIONAL WITH LOAD MORE */}
<section style={{
  padding: '3rem 1rem',
  backgroundColor: '#f8f9fa'
}}>
  <div style={{
    maxWidth: '500px',
    margin: '0 auto'
  }}>
    <h2 style={{
      fontSize: '1.75rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem',
      color: '#1a1a1a',
      lineHeight: 1.3
    }}>
      Our team of <span style={{color: '#268579'}}>academic writers</span>
    </h2>
    
    <p style={{
      fontSize: '0.9rem',
      textAlign: 'center',
      color: '#666',
      marginBottom: '2.5rem',
      lineHeight: 1.6
    }}>
      Top-rated academic writers for essays, research, programming, and more. Real experts. Real results.
    </p>

    {/* Writers - VERTICAL STACK */}
      <div style={{
        display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {/* Writer 1 - Connor Beatty */}
        <div style={{
          height: '280px',
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 70%), url(/images/writers/Connor-Beatty-Writer.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        padding: '1.25rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(255,255,255,0.92)',
            color: '#111827',
            borderRadius: '2rem',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <span style={{color: '#f59e0b'}}>⭐</span>5.0
          </div>

          <div style={{color: 'white'}}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.25rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>Connor Beatty</h3>
            <p style={{
              margin: '0 0 0.75rem 0',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.95)'
            }}>Master's degree</p>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Business</span>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Economics</span>
            </div>
          </div>
        </div>

      {/* Writer 2 - David Berlin */}
        <div style={{
          height: '280px',
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 70%), url(/images/writers/David-Berlin-Writer.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        padding: '1.25rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(255,255,255,0.92)',
            color: '#111827',
            borderRadius: '2rem',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <span style={{color: '#f59e0b'}}>⭐</span>4.9
          </div>

          <div style={{color: 'white'}}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.25rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>David Berlin</h3>
            <p style={{
              margin: '0 0 0.75rem 0',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.95)'
            }}>PhD degree</p>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Computer Science</span>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Engineering</span>
            </div>
          </div>
        </div>

      {/* Writer 3 - Brett Fuller */}
        <div style={{
          height: '280px',
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 70%), url(/images/writers/Brett-Fuller-Writer.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        padding: '1.25rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(255,255,255,0.92)',
            color: '#111827',
            borderRadius: '2rem',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <span style={{color: '#f59e0b'}}>⭐</span>4.8
          </div>

          <div style={{color: 'white'}}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.25rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>Brett Fuller</h3>
            <p style={{
              margin: '0 0 0.75rem 0',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.95)'
            }}>Master's degree</p>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Healthcare</span>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Biology</span>
            </div>
          </div>
        </div>

      {/* EXPANDED Writers (4-6) */}
      {showMoreWriters && (
        <>
          {/* Writer 4 - Jenifer Moralez */}
        <div style={{
          height: '280px',
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 70%), url(/images/writers/Jenifer-Moralez-Writer.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
            padding: '1.25rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(255,255,255,0.92)',
            color: '#111827',
            borderRadius: '2rem',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <span style={{color: '#f59e0b'}}>⭐</span>5.0
          </div>

          <div style={{color: 'white'}}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.25rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>Jenifer Moralez</h3>
            <p style={{
              margin: '0 0 0.75rem 0',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.95)'
            }}>Master's degree</p>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Psychology</span>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Sociology</span>
            </div>
          </div>
        </div>

          {/* Writer 5 - Lauren Miller */}
        <div style={{
          height: '280px',
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 70%), url(/images/writers/Lauren-Miller-Writer.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
            padding: '1.25rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(255,255,255,0.92)',
            color: '#111827',
            borderRadius: '2rem',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <span style={{color: '#f59e0b'}}>⭐</span>4.9
          </div>

          <div style={{color: 'white'}}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.25rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>Lauren Miller</h3>
            <p style={{
              margin: '0 0 0.75rem 0',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.95)'
            }}>Master's degree</p>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Literature</span>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>History</span>
            </div>
          </div>
        </div>

          {/* Writer 6 - Sarah Massari */}
        <div style={{
          height: '280px',
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 70%), url(/images/writers/Sarah-Massari-Writer.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
            padding: '1.25rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(255,255,255,0.92)',
            color: '#111827',
            borderRadius: '2rem',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <span style={{color: '#f59e0b'}}>⭐</span>5.0
          </div>

          <div style={{color: 'white'}}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.25rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>Sarah Massari</h3>
            <p style={{
              margin: '0 0 0.75rem 0',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.95)'
            }}>PhD degree</p>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Education</span>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>Research</span>
            </div>
          </div>
        </div>
        </>
      )}
      </div>

    {/* Load More / Collapse Button */}
    <div style={{textAlign: 'center', marginTop: '2rem'}}>
      <button 
        onClick={() => setShowMoreWriters(!showMoreWriters)}
        style={{
          padding: '1rem 2rem',
          backgroundColor: showMoreWriters ? 'white' : '#268579',
          color: showMoreWriters ? '#268579' : 'white',
          border: showMoreWriters ? '2px solid #268579' : 'none',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          margin: '0 auto'
        }}
      >
        {showMoreWriters ? (
          <>Collapse Writers ↑</>
        ) : (
          <>View More Writers ↓</>
        )}
      </button>
    </div>
  </div>
</section>

{/* Transparent Pricing Section - MOBILE-PERFECT */}
<section style={{
  padding: '3rem 1rem',
  backgroundColor: '#ffffff'
}}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    {/* Header */}
    <h2 style={{
      fontSize: '1.85rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem',
      color: '#1a1a1a',
      lineHeight: 1.3
    }}>
      <span style={{color: '#268579'}}>Transparent</span> Pricing
    </h2>

    <div style={{
      width: '60px',
      height: '4px',
      backgroundColor: '#268579',
      margin: '0 auto 1rem'
    }}></div>
    
    <p style={{
      fontSize: '0.95rem',
      textAlign: 'center',
      color: '#666',
      marginBottom: '1rem',
      lineHeight: 1.6
    }}>
      Choose the plan that fits your academic level and budget.
    </p>

    {/* 100% Value Guarantee Badge */}
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#fef3c7',
      color: '#92400e',
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      margin: '0 auto 2.5rem',
      border: '1px solid #fde68a',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)'
    }}>
      <span style={{fontSize: '1rem'}}>💎</span> 100% Value Guarantee
    </div>

    {/* Pricing Cards - MOBILE STACK */}
      <div style={{
        display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      {/* High School Card */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '2px solid #e5e7eb',
        position: 'relative'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#1a1a1a'
        }}>
          High School
        </h3>

        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#268579'
          }}>$12</span>
          <span style={{
            fontSize: '0.95rem',
            color: '#6b7280',
            marginLeft: '0.25rem'
          }}>per page</span>
        </div>

        {/* Features */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Basic research</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Standard formatting</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Free revisions</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>24/7 support</span>
          </div>
        </div>

        {/* Get Started Button */}
        <button 
          onClick={() => navigate('/order-now?level=highschool&price=12')}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'white',
            color: '#268579',
            border: '2px solid #268579',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
        justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
        >
          Get Started <span>→</span>
        </button>
      </div>

      {/* College Card - MOST POPULAR */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 8px 24px rgba(38,133,121,0.2)',
        border: '3px solid #268579',
        position: 'relative'
      }}>
        {/* Most Popular Badge */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#268579',
          color: 'white',
          padding: '0.4rem 1rem',
            borderRadius: '2rem',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          boxShadow: '0 4px 12px rgba(38,133,121,0.3)'
        }}>
          <span>⭐</span> Most Popular
      </div>

        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem',
          marginTop: '0.5rem',
          color: '#1a1a1a'
        }}>
          College
        </h3>

        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#268579'
          }}>$15</span>
          <span style={{
            fontSize: '0.95rem',
            color: '#6b7280',
            marginLeft: '0.25rem'
          }}>per page</span>
    </div>

        {/* Features */}
    <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Advanced research</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Any citation style</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Free revisions</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Priority support</span>
          </div>
        </div>

        {/* Get Started Button - FILLED */}
        <button 
          onClick={() => navigate('/order-now?level=college&price=15')}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#268579',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(38,133,121,0.3)',
            transition: 'all 0.2s'
          }}
        >
          Get Started <span>→</span>
        </button>
      </div>

      {/* University Card */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '2px solid #e5e7eb',
        position: 'relative'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
      textAlign: 'center',
          marginBottom: '1rem',
          color: '#1a1a1a'
        }}>
          University
        </h3>

        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#268579'
          }}>$18</span>
          <span style={{
            fontSize: '0.95rem',
            color: '#6b7280',
            marginLeft: '0.25rem'
          }}>per page</span>
        </div>

        {/* Features */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Expert writers</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Complex topics</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Free revisions</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{color: '#268579', fontSize: '1.1rem'}}>✓</span>
            <span style={{fontSize: '0.9rem', color: '#4b5563'}}>Dedicated manager</span>
          </div>
        </div>

        {/* Get Started Button */}
        <button 
          onClick={() => navigate('/order-now?level=university&price=18')}
          style={{
            width: '100%',
            padding: '1rem',
        backgroundColor: 'white',
        color: '#268579',
        border: '2px solid #268579',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
        >
          Get Started <span>→</span>
      </button>
      </div>
    </div>
  </div>
</section>

{/* FAQ Section - SEO-OPTIMIZED & MOBILE-PERFECT */}
<section style={{
  padding: '3rem 1rem',
  backgroundColor: '#f9fafb'
}}>
  <div style={{
    maxWidth: '800px',
    margin: '0 auto'
  }}>
    {/* Header */}
    <h2 style={{
      fontSize: '1.85rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem',
      color: '#1a1a1a',
      lineHeight: 1.3
    }}>
      Frequently Asked <span style={{color: '#268579'}}>Questions</span>
    </h2>

    <div style={{
      width: '60px',
      height: '4px',
      backgroundColor: '#268579',
      margin: '0 auto 1rem'
    }}></div>
    
    <p style={{
      fontSize: '0.95rem',
      textAlign: 'center',
      color: '#666',
      marginBottom: '2.5rem',
      lineHeight: 1.6
    }}>
      Everything you need to know about our academic writing services.
    </p>

    {/* Services & Capabilities Category */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#268579',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>📝</span> Services & Capabilities
      </h3>

      {/* Question 1 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq1' ? null : 'faq1')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            What services do you offer?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq1' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq1' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            We offer a comprehensive range of academic and professional writing services, including: Essays (all types), Research Papers, Term Papers, Dissertations & Theses, Case Studies, Lab Reports, Article Reviews, Admission Essays, Editing & Proofreading, and other custom writing tasks.
          </p>
        )}
      </div>

      {/* Question 2 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq2' ? null : 'faq2')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            Can you write essays on any topic?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq2' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq2' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Yes. Our diverse team consists of experts across a vast array of academic disciplines. From the humanities to hard sciences, we can match your project with a writer who has the specific knowledge and experience required for your topic.
          </p>
        )}
      </div>

      {/* Question 3 */}
      <div style={{
        paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq3' ? null : 'faq3')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            Can you write in different formats and citation styles?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq3' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq3' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Absolutely. Our writers are proficient in all major academic citation styles, including APA, MLA, Chicago/Turabian, Harvard, and Oxford. Simply specify your required format in the order details, and we will ensure perfect compliance.
          </p>
        )}
      </div>
    </div>

    {/* Support & Trust Category */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#268579',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>🛡️</span> Support & Trust
      </h3>

      {/* Question 4 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq4' ? null : 'faq4')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            Do you have customer support available 24/7?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq4' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq4' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Yes, our customer support team is available 24/7, 365 days a year. You can reach us anytime via live chat, email, or phone. We are always here to answer your questions and provide assistance.
          </p>
        )}
      </div>

      {/* Question 5 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq5' ? null : 'faq5')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            Why should I trust Essay Embassy?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq5' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq5' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Students trust us for several key reasons: 1. Quality: Our writers produce high-quality work that meets academic standards. 2. Confidentiality: Your personal information is always kept private and secure. 3. Speed: We can handle urgent deadlines, delivering papers in as little as 3 hours. 4. Communication: Our support and writing teams are accessible 24/7.
          </p>
        )}
      </div>

      {/* Question 6 */}
      <div style={{
        paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq6' ? null : 'faq6')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            Do you provide pre-written essays?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq6' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq6' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            No, never. Every paper we deliver is written completely from scratch according to your specific requirements. We guarantee 100% original content to ensure your academic integrity and success.
          </p>
        )}
      </div>
    </div>

    {/* Ordering Process Category */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#268579',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>🚀</span> Ordering Process
      </h3>

      {/* Question 7 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq7' ? null : 'faq7')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            How can I place an order?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq7' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq7' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Placing an order is a simple 3-step process: 1. Fill out the order form: Provide all your project details, including paper type, academic level, and deadline. 2. Make a secure payment: We require a minimum 50% deposit to begin. 3. Download your paper: We'll notify you via email and text as soon as your paper is ready for download from your personal account.
          </p>
        )}
      </div>

      {/* Question 8 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq8' ? null : 'faq8')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            Can you meet tight deadlines?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq8' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq8' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Yes. We have a dedicated team of writers who specialize in handling rush orders. We can reliably deliver high-quality, original papers in as little as 3 hours.
          </p>
        )}
      </div>

      {/* Question 9 */}
      <div style={{
        paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq9' ? null : 'faq9')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            When will you deliver my paper?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq9' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq9' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            We guarantee your paper will be delivered on or before the deadline you specify. We pride ourselves on punctuality without ever compromising on quality.
          </p>
        )}
      </div>
    </div>

    {/* Pricing & Payment Category */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#268579',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>💰</span> Pricing & Payment
      </h3>

      {/* Question 10 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq10' ? null : 'faq10')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            How much will it cost to write my essay?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq10' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq10' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Our pricing is competitive, starting from $11/page. The final cost depends on three factors: the academic level, the number of pages, and the urgency of the deadline.
          </p>
        )}
      </div>

      {/* Question 11 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq11' ? null : 'faq11')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            How do I make payment for my order?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq11' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq11' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            You can pay securely using any major credit or debit card. We accept Visa, MasterCard, American Express, and Discover through our encrypted payment gateway.
          </p>
        )}
      </div>

      {/* Question 12 */}
      <div style={{
        paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq12' ? null : 'faq12')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            Are your prices affordable?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq12' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq12' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Yes, we strive to keep our prices affordable for students. Our rates are competitive and reflect the high quality of work from our expert writers. For the best price, we recommend placing your order with the longest possible deadline.
          </p>
        )}
      </div>
    </div>

    {/* Quality & Guarantees Category */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#268579',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>✨</span> Quality & Guarantees
      </h3>

      {/* Question 13 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq13' ? null : 'faq13')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            How do you ensure the quality of your essays?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq13' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq13' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            We have a multi-step Quality Assurance process. Every paper is written by a qualified expert, reviewed by a professional editor for grammar and clarity, and passed through plagiarism-detection software to ensure originality.
          </p>
        )}
      </div>

      {/* Question 14 */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq14' ? null : 'faq14')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            How do you ensure plagiarism-free work?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq14' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq14' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            We guarantee 100% plagiarism-free work by: 1. Writing every paper from scratch. 2. Citing all sources correctly. 3. Checking every paper with advanced plagiarism-detection software like Turnitin.
          </p>
        )}
      </div>

      {/* Question 15 */}
      <div style={{
        paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => setOpenFaq(openFaq === 'faq15' ? null : 'faq15')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#1a1a1a',
            flex: 1
          }}>
            Do you offer revisions and refunds?
          </span>
          <span style={{
            fontSize: '1.25rem',
            color: '#268579',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            transform: openFaq === 'faq15' ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </button>
        {openFaq === 'faq15' && (
          <p style={{
            fontSize: '0.9rem',
            color: '#4b5563',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Yes. We offer a free revision period (typically 14 days) to fine-tune your paper. We also have a clear money-back guarantee that protects you in cases of non-delivery or plagiarism.
          </p>
        )}
      </div>
    </div>

    {/* CTA at Bottom */}
    <div style={{
      textAlign: 'center',
      marginTop: '2.5rem'
    }}>
      <p style={{
        fontSize: '0.95rem',
        color: '#666',
        marginBottom: '1rem'
      }}>
        Still have questions? Our support team is here to help!
      </p>
      <button 
        onClick={() => navigate('/contact')}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#268579',
          color: 'white',
          border: 'none',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(38,133,121,0.3)'
        }}
      >
        Contact Support
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
              onClick={() => navigate('/order-now')}
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
