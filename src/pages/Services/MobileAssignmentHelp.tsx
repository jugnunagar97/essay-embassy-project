import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollableContentPanel from '../../components/Services/ScrollableContentPanel';
import { SERVICE_SEO_PLACEHOLDER_CARDS } from '../../components/Services/serviceSeoPlaceholderCards';

const academicLevels = ["High School", "College", "University", "PhD"] as const;
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"] as const;

type AcademicLevel = (typeof academicLevels)[number];
type Deadline = (typeof deadlines)[number];

const isAcademicLevel = (value: string): value is AcademicLevel =>
  academicLevels.includes(value as AcademicLevel);

const isDeadline = (value: string): value is Deadline =>
  deadlines.includes(value as Deadline);

const sampleCards = [
  { title: "Marketing Strategy Case Study Analysis", pages: 6, level: "College", type: "Case Study", citation: "APA" },
  { title: "Financial Accounting Problem Set", pages: 4, level: "University", type: "Problem Solving", citation: "Harvard" },
  { title: "Database Management System Project", pages: 8, level: "College", type: "Programming", citation: "IEEE" },
  { title: "Organic Chemistry Lab Report", pages: 5, level: "PhD", type: "Lab Report", citation: "ACS" },
];

export default function MobileAssignmentHelp() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const faqData = [
    { question: 'What subjects do you cover for assignment help?', answer: 'We provide expert help across 70+ subjects including Math, Science, Programming, Business, Engineering, Nursing, and Humanities. Our specialists hold advanced degrees and work with students from high school to PhD level.' },
    { question: 'How fast can you complete my assignment?', answer: 'We offer urgent assignment help starting from 3 hours. Most assignments are completed within 24-48 hours. Rush orders get priority assignment to our fastest writers without compromising quality.' },
    { question: 'Do you guarantee original work?', answer: 'Yes. Every assignment is written from scratch and checked through advanced plagiarism detection tools. We provide free originality reports with every completed assignment upon request.' },
    { question: 'What if I need revisions on my assignment?', answer: 'We offer unlimited free revisions for 14 days after delivery. If your assignment needs adjustments to match your requirements, our writers will revise it at no extra cost until you\'re satisfied.' },
  ];

  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { academicLevel: "College", pages: 1, deadline: "48 hours" },
  });

  const watchedValues = watch();
  const totalWords = (watchedValues.pages || 1) * 275;

  const priceConfig: Record<AcademicLevel, Record<Deadline, { base: number }>> = {
    "High School": {
      "3 hours": { base: 18 }, "6 hours": { base: 16 }, "12 hours": { base: 14 }, "24 hours": { base: 12 },
      "48 hours": { base: 12 }, "3 days": { base: 12 }, "5 days": { base: 12 }, "7 days": { base: 12 },
      "10 days": { base: 12 }, "14 days": { base: 12 }
    },
    "College": {
      "3 hours": { base: 25 }, "6 hours": { base: 22 }, "12 hours": { base: 18 }, "24 hours": { base: 15 },
      "48 hours": { base: 15 }, "3 days": { base: 15 }, "5 days": { base: 15 }, "7 days": { base: 15 },
      "10 days": { base: 15 }, "14 days": { base: 15 }
    },
    "University": {
      "3 hours": { base: 28 }, "6 hours": { base: 25 }, "12 hours": { base: 21 }, "24 hours": { base: 18 },
      "48 hours": { base: 18 }, "3 days": { base: 18 }, "5 days": { base: 18 }, "7 days": { base: 18 },
      "10 days": { base: 18 }, "14 days": { base: 18 }
    },
    "PhD": {
      "3 hours": { base: 38 }, "6 hours": { base: 35 }, "12 hours": { base: 31 }, "24 hours": { base: 28 },
      "48 hours": { base: 25 }, "3 days": { base: 25 }, "5 days": { base: 25 }, "7 days": { base: 25 },
      "10 days": { base: 25 }, "14 days": { base: 25 }
    }
  };

  const getBasePrice = (level: AcademicLevel, deadline: Deadline) => {
    return priceConfig[level]?.[deadline]?.base || 15;
  };

  const levelValue = isAcademicLevel(watchedValues.academicLevel) ? watchedValues.academicLevel : 'College';
  const deadlineValue = isDeadline(watchedValues.deadline) ? watchedValues.deadline : '48 hours';

  const price = getBasePrice(levelValue, deadlineValue) * (watchedValues.pages || 1);

  const onSubmit = (data: any) => {
    const params = new URLSearchParams({
      academicLevel: data.academicLevel,
      pages: data.pages.toString(),
      deadline: data.deadline,
    });
    navigate(`/order-now?${params.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Assignment Help Service | Get Expert Homework Help Online</title>
        <meta name="description" content="Professional assignment help service with 500+ experts. Get homework help across 70+ subjects. Fast delivery, original work, 24/7 support. Prices from $12/page." />
        <link rel="canonical" href="https://essayembassy.com/services/assignment-help" />
      </Helmet>

      <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7FAFC', minHeight: '100vh', paddingBottom: '2rem' }}>
        
        {/* Hero Section */}
        <section style={{ padding: '1.5rem 1rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#E5E7EB', fontSize: '0.75rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1.5rem' }}>
            <span style={{ backgroundColor: 'white', borderRadius: '9999px', height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.5rem' }}>🛡️</span>
            100% ORIGINAL WORK
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', lineHeight: '1.2', marginBottom: '1rem' }}>
            Get Assignment Help from Subject Experts Fast
          </h1>

          <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: '1.6', marginBottom: '2rem' }}>
            Expert help with homework, projects, and assignments. On-time delivery, step-by-step solutions, unlimited revisions.
          </p>

          {/* Trust Badges */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {[
              { score: '4.1/5', label: 'Google', logo: '/images/google%20logo.svg', height: 26 },
              { score: '4.4/5', label: 'Trustpilot', logo: '/images/trustpilot%20logo%202.png', height: 28 },
              { score: '4.0/5', label: 'Sitejabber', logo: '/images/Sitejabber_logo.png', height: 28 },
            ].map((badge, idx) => (
              <div key={badge.label} style={{ minWidth: '100px', backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <img src={badge.logo} alt={`${badge.label} logo`} style={{ height: `${badge.height}px`, objectFit: 'contain' }} loading={idx === 0 ? 'eager' : 'lazy'} />
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{badge.score}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{badge.label}</div>
              </div>
            ))}
          </div>

          {/* Order Form */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>Place an order</h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>Academic Level</label>
                <select {...register('academicLevel')} style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '0.5rem', fontSize: '1rem' }}>
                  {academicLevels.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>Pages</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #D1D5DB', borderRadius: '0.5rem', padding: '0.5rem' }}>
                  <button type="button" onClick={() => setValue('pages', Math.max(1, (watchedValues.pages || 1) - 1))} style={{ padding: '0.5rem 1rem', fontSize: '1.5rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>-</button>
                  <input type="number" min={1} {...register('pages', { valueAsNumber: true })} style={{ width: '60px', textAlign: 'center', border: 'none', fontSize: '1rem', fontWeight: '600' }} />
                  <button type="button" onClick={() => setValue('pages', (watchedValues.pages || 1) + 1)} style={{ padding: '0.5rem 1rem', fontSize: '1.5rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>+</button>
                  <span style={{ backgroundColor: '#F3F4F6', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>{totalWords} words</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>Deadline</label>
                <select {...register('deadline')} style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '0.5rem', fontSize: '1rem' }}>
                  {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>From</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10B981' }}>${price.toFixed(2)}</div>
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: '#10B981', color: 'white', fontWeight: 'bold', padding: '1rem', borderRadius: '0.5rem', border: 'none', fontSize: '1.125rem', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                Get assignment help now
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginTop: '1rem' }}>
              Already have an account? <a href="https://essayembassy.com/login" style={{ color: '#10B981', fontWeight: '500' }}>Log in</a>
            </p>
          </div>
        </section>

        {/* Writers Section */}
        <section style={{ padding: '2rem 1rem', backgroundColor: 'white', maxWidth: '100%', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem', lineHeight: '1.3' }}>
              Meet Your Assignment Helpers
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6', padding: '0 1rem' }}>
              500+ qualified experts across Math, Science, Programming, Business, and more. Each specialist holds advanced degrees and delivers assignment help tailored to your course requirements.
            </p>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.75rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.75rem' }}>
              Our experts graduated from top universities worldwide
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <img src="/images/univ-logos.svg" alt="Universities" style={{ height: '24px', filter: 'grayscale(100%)' }} />
            </div>
          </div>

          {(() => {
            const [showAll, setShowAll] = useState(false);
            
            const writers = [
              { name: 'Stellan G.', degree: "Master's degree", image: '/images/Stellan%20G..jpg', subjects: ['Mathematics', 'Statistics'], finishTime: '97%', reviews: '4.9', success: '99%', repeatHire: '51%' },

              { name: 'Ashley Thompson', degree: "Master's degree", image: '/images/Ashley%20Thompson.jpg', subjects: ['Programming', 'Computer Science'], finishTime: '97%', reviews: '4.9', success: '98%', repeatHire: '53%' },

              { name: 'Bellamy K.', degree: "Master's degree", image: '/images/Bellamy%20K..jpg', subjects: ['Business', 'Finance'], finishTime: '95%', reviews: '4.8', success: '97%', repeatHire: '49%' },

              { name: 'Michael Johnson', degree: "Master's degree", image: '/images/Michael%20Johnson.jpg', subjects: ['Nursing', 'Healthcare'], finishTime: '98%', reviews: '5.0', success: '99%', repeatHire: '54%' },

              { name: 'Jessica Miller', degree: "Master's degree", image: '/images/Jessica%20Miller.jpg', subjects: ['Chemistry', 'Biology'], finishTime: '96%', reviews: '4.9', success: '98%', repeatHire: '52%' },
            ];

            const displayedWriters = showAll ? writers : writers.slice(0, 3);

            return (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                  {displayedWriters.map((writer, idx) => (
                    <div key={idx} style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <img src={writer.image} alt={writer.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#F3F4F6' }} />
                          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', backgroundColor: '#10B981', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#111827' }}>{writer.name}</h3>
                          <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>{writer.degree}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        {writer.subjects.map((subject, sIdx) => (
                          <span key={sIdx} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#F3F4F6', borderRadius: '0.25rem', color: '#374151' }}>
                            {subject}
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
                          <span>Finish on time</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{writer.finishTime}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
                          <span>Last 50 reviews</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{writer.reviews}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
                          <span>Success</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{writer.success}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                          <span>Repeat hire rate</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{writer.repeatHire}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                  <button
                    onClick={() => setShowAll(!showAll)}
                    style={{
                      backgroundColor: showAll ? '#F3F4F6' : '#10B981',
                      color: showAll ? '#374151' : 'white',
                      fontWeight: '600',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      minHeight: '44px'
                    }}
                  >
                    {showAll ? 'Show Less ↑' : 'Load More Experts ↓'}
                  </button>
                </div>
              </>
            );
          })()}
        </section>

        {/* Features */}
        <section style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Why Students Choose <span style={{ color: '#10B981' }}>Our Assignment Help</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { emoji: '✅', title: 'Step-by-Step Solutions', desc: 'Get detailed explanations for every assignment. Understand the process, not just the answer.' },
              { emoji: '📝', title: 'Unlimited Free Revisions', desc: 'Request changes until your assignment meets your requirements. No extra fees, no time limits.' },
              { emoji: '💰', title: 'Money-Back Guarantee', desc: 'Not satisfied with the quality? Get a full refund if we miss deadlines or quality standards.' },
              { emoji: '🔒', title: 'Direct Expert Contact', desc: 'Message your assigned expert anytime. Get clarifications and updates throughout the process.' },
              { emoji: '⚡', title: '100% Confidential Service', desc: 'Your personal details and assignment content stay completely private and secure.' },
              { emoji: '💵', title: 'Clear Pricing Structure', desc: 'Know exactly what you pay before ordering. No hidden charges or unexpected fees.' },
            ].map((feature, idx) => (
              <div key={idx} style={{ backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '0.75rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feature.emoji}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#F7FAFC' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>Assignment help pricing</h2>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginBottom: '2rem' }}>
            Affordable rates starting at <span style={{ fontWeight: 'bold' }}>$12/page</span>
          </p>

          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Included with every order</h3>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '1rem' }}>Free services you always get</p>
            {['Plagiarism report', 'Formatting', 'Title page & references', 'Unlimited revisions'].map(item => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{item}</span>
                <span style={{ backgroundColor: '#DCFCE7', color: '#16A34A', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>Free</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="https://essayembassy.com/order-now" style={{ display: 'inline-block', backgroundColor: '#10B981', color: 'white', fontWeight: 'bold', padding: '1rem 2rem', borderRadius: '9999px', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              Get help with assignment
            </a>
          </div>
        </section>

        {/* Sample Assignments */}
        <section style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>Sample Work</h2>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginBottom: '2rem' }}>
            See examples of completed assignments from our experts
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sampleCards.map((sample, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', border: '1px solid #BFDBFE', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', flex: 1 }}>{sample.title}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{sample.pages} Pages</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>Level:</strong> {sample.level}</div>
                  <div style={{ marginBottom: '0.5rem' }}><strong>Type:</strong> {sample.type}</div>
                  <div><strong>Citation:</strong> {sample.citation}</div>
                </div>
                <button style={{ width: '100%', backgroundColor: '#10B981', color: 'white', fontWeight: '600', padding: '0.75rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
                  View sample
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#F7FAFC' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
              Student Reviews
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
              Real feedback from students who got assignment help
            </p>
          </div>

          {(() => {
            const [activeTab, setActiveTab] = useState<'google' | 'trustpilot' | 'sitejabber'>('google');
            const [hoveredTab, setHoveredTab] = useState<string | null>(null);
            const [showAll, setShowAll] = useState(false);

            const reviews = {
              google: [
                { name: 'Vera Larkspur', country: '🇺🇸', rating: 4.8, date: 'Oct 28, 2024', orderId: '#EE-4821', text: 'Excellent help with my calculus assignment! The expert showed every step and explained the process clearly. Got it done 3 hours before my deadline. Highly recommend for urgent math help!' },

                { name: 'Osric Morrow', country: '🇬🇧', rating: 4.3, date: 'Oct 15, 2024', orderId: '#EE-4709', text: 'Got an A on my programming project! The code was clean, well-commented, and exactly what my professor wanted. The expert even helped me understand how it works.' },

                { name: 'Indira Coen', country: '🇨🇦', rating: 4.1, date: 'Sep 30, 2024', orderId: '#EE-4592', text: 'Very professional service. My statistics assignment needed minor revisions but the expert fixed everything quickly. Good value and fair pricing.' },

                { name: 'Calder Wynn', country: '🇦🇺', rating: 4.9, date: 'Sep 12, 2024', orderId: '#EE-4401', text: 'Third assignment I\'ve ordered and they never disappoint. Quality stays consistent and support team responds fast. Will use again next semester!' },

                { name: 'Sable Hyland', country: '🇳🇿', rating: 4.6, date: 'Aug 25, 2024', orderId: '#EE-4287', text: 'Saved my grades! Had three assignments due the same week and they handled all perfectly. Each one was unique and met my professor\'s requirements.' },
              ],
              trustpilot: [
                { name: 'Cyril Thane', country: '🇺🇸', rating: 4.7, date: 'Nov 2, 2024', orderId: '#EE-4890', text: 'Best assignment help service I\'ve tried. Quality is excellent and pricing is reasonable. My expert had a PhD in my subject and really knew their stuff.' },

                { name: 'Elodie Bramwell', country: '🇬🇧', rating: 4.5, date: 'Oct 20, 2024', orderId: '#EE-4756', text: 'Impressed with the plagiarism report - completely original! Assignment was well-researched and met all academic standards. Support answered questions fast.' },

                { name: 'Ronan Vale', country: '🇨🇦', rating: 4.2, date: 'Oct 8, 2024', orderId: '#EE-4651', text: 'Good experience overall. Assignment needed one revision but that was free and done within 24 hours. Expert was responsive and made all requested changes.' },

                { name: 'Isolde March', country: '🇩🇪', rating: 4.9, date: 'Sep 22, 2024', orderId: '#EE-4523', text: 'Excellent work on my business case study! Expert used sources I hadn\'t found. Delivered early which gave me time to review before submission.' },

                { name: 'Leif Harcourt', country: '🇦🇺', rating: 4.4, date: 'Sep 5, 2024', orderId: '#EE-4356', text: 'Professional and reliable. Used them for multiple assignments this term and quality has been consistent. Experts understand university requirements.' },
              ],
              sitejabber: [
                { name: 'Maris Olander', country: '🇺🇸', rating: 4.6, date: 'Nov 5, 2024', orderId: '#EE-4921', text: 'Life saver during finals! Assignment was exactly what I needed. My professor commented on the quality of research. Worth every dollar!' },

                { name: 'Noemi Gall', country: '🇬🇧', rating: 4.1, date: 'Oct 25, 2024', orderId: '#EE-4803', text: 'Solid service. Assignment was good but needed minor changes to conclusion. Support team was understanding and revisions were done quickly.' },

                { name: 'Aster Mirren', country: '🇨🇦', rating: 4.9, date: 'Oct 12, 2024', orderId: '#EE-4688', text: 'Amazing experience! Expert kept me updated throughout and made sure everything was perfect. Got 92% on my chemistry lab report!' },

                { name: 'Laird Fenwick', country: '🇳🇿', rating: 4.4, date: 'Sep 28, 2024', orderId: '#EE-4579', text: 'Best decision this semester. Assignment delivered early, well-researched, and perfectly formatted. Highly recommend for tight deadlines.' },

                { name: 'Mireya Clois', country: '🇫🇷', rating: 4.7, date: 'Sep 14, 2024', orderId: '#EE-4423', text: 'Exceptional quality! Expert clearly understood the topic and provided well-argued solutions with excellent references. Customer support was very responsive.' },
              ],
            };

            const tabConfig: Record<'google' | 'trustpilot' | 'sitejabber', { label: string; logo: string; alt: string }> = {
              google: { label: 'Google', logo: '/images/google-icon.svg', alt: 'Google logo' },
              trustpilot: { label: 'Trustpilot', logo: '/images/trustpilot-icon.svg', alt: 'Trustpilot logo' },
              sitejabber: { label: 'Sitejabber', logo: '/images/sitejabber-icon.webp', alt: 'Sitejabber logo' },
            };

            const currentReviews = reviews[activeTab as keyof typeof reviews];
            const displayedReviews = showAll ? currentReviews : currentReviews.slice(0, 3);

            const renderStars = (rating: number, reviewKey: string) => {
              return Array.from({ length: 5 }).map((_, starIdx) => {
                const fillAmount = Math.max(0, Math.min(1, rating - starIdx));
                const gradientId = `half-star-${reviewKey}-${starIdx}`;

                if (fillAmount >= 1) {
                  return (
                    <svg key={`${reviewKey}-full-${starIdx}`} width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  );
                }

                if (fillAmount <= 0) {
                  return (
                    <svg key={`${reviewKey}-empty-${starIdx}`} width="18" height="18" viewBox="0 0 24 24" fill="#E5E7EB" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  );
                }

                const percent = (fillAmount * 100).toFixed(0);
                return (
                  <svg key={`${reviewKey}-half-${starIdx}`} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id={gradientId}>
                        <stop offset={`${percent}%`} stopColor="#FBBF24" />
                        <stop offset={`${percent}%`} stopColor="#E5E7EB" />
                      </linearGradient>
                    </defs>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={`url(#${gradientId})`} />
                  </svg>
                );
              });
            };

            return (
              <>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 1rem' }}>
                  {Object.entries(tabConfig).map(([key, tab]) => {
                    const isActive = activeTab === key;
                    const isHover = hoveredTab === key && !isActive;
                    return (
                      <button
                        key={tab.label}
                        onClick={() => { setActiveTab(key as typeof activeTab); setShowAll(false); }}
                        onMouseEnter={() => setHoveredTab(key)}
                        onMouseLeave={() => setHoveredTab(null)}
                        style={{
                          padding: '0.65rem 1.25rem',
                          backgroundColor: isActive ? '#10B981' : isHover ? '#ECFDF5' : 'white',
                          color: isActive ? 'white' : '#1F2937',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          border: `1px solid ${isActive ? '#10B981' : '#E5E7EB'}`,
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          minHeight: '44px',
                          boxShadow: isActive ? '0 4px 10px rgba(16,185,129,0.35)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <img src={tab.logo} alt={tab.alt} style={{ height: '18px', width: '18px', objectFit: 'contain' }} loading="lazy" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                  {displayedReviews.map((review, idx) => (
                    <div key={idx} style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem' }}>
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>{review.name} {review.country}</div>
                            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{review.date}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.15rem', alignItems: 'center' }}>
                          {renderStars(review.rating, `${review.orderId}-${idx}`)}
                          <span style={{ fontSize: '0.75rem', color: '#6B7280', marginLeft: '0.25rem' }}>{review.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        {review.text}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Order:</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', fontFamily: 'monospace' }}>{review.orderId}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#DCFCE7', color: '#16A34A', borderRadius: '0.25rem', fontWeight: '500' }}>Verified</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button
                    onClick={() => setShowAll(!showAll)}
                    style={{
                      backgroundColor: showAll ? '#F3F4F6' : '#10B981',
                      color: showAll ? '#374151' : 'white',
                      fontWeight: '600',
                      padding: '0.875rem 2rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      minHeight: '48px'
                    }}
                  >
                    {showAll ? 'Show Less ↑' : 'Load More Reviews ↓'}
                  </button>
                </div>
              </>
            );
          })()}
        </section>

        {/* How It Works */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#F7FAFC' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>How assignment help works</h2>
          
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            {[
              { emoji: '✍️', title: '1. Submit assignment details', desc: 'Upload your assignment instructions, deadline, and any files. Takes less than 2 minutes.' },
              { emoji: '💳', title: '2. Make secure payment', desc: 'Your payment is held safely until you receive and approve the completed assignment.' },
              { emoji: '📄', title: '3. Get your completed work', desc: 'Download your finished assignment on time with step-by-step solutions included.' },
            ].map((step, idx) => (
              <div key={idx} style={{ textAlign: 'center', marginBottom: idx < 2 ? '2rem' : 0 }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{step.emoji}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{step.desc}</p>
                {idx < 2 && <div style={{ margin: '1rem auto', width: '2px', height: '20px', backgroundColor: '#CBD5E1' }} />}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="https://essayembassy.com/order-now" style={{ display: 'inline-block', backgroundColor: '#10B981', color: 'white', fontWeight: 'bold', padding: '1rem 2rem', borderRadius: '0.5rem', textDecoration: 'none' }}>
              Start now
            </a>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Trusted by thousands of students
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            {[
              { value: '7+', label: 'Years helping students' },
              { value: '500+', label: 'Subject experts' },
              { value: '15,000+', label: 'Assignments completed' },
              { value: '4.4 ⭐', label: 'Average student rating' },
            ].map((stat, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981', marginBottom: '0.25rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Service SEO scroll panel (placeholder) ── */}
        <section className="bg-slate-50 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollableContentPanel
              ariaLabel="Service overview"
              cards={SERVICE_SEO_PLACEHOLDER_CARDS}
            />
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#F7FAFC' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Common questions
          </h2>

          <div style={{ backgroundColor: '#F9FAFB', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            {faqData.map((faq, idx) => {
              const isOpen = openFAQ === idx;
              return (
                <div key={idx} style={{ backgroundColor: isOpen ? '#F3F4F6' : 'white', borderRadius: '0.75rem', marginBottom: '0.75rem', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                  <button type="button" onClick={() => setOpenFAQ(isOpen ? null : idx)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', minHeight: '48px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: isOpen ? '#10B981' : '#111827', paddingRight: '0.5rem' }}>{faq.question}</span>
                    <svg width="20" height="20" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1rem 1rem 1rem', fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '3rem 1rem', backgroundColor: 'white', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Get assignment help today</h2>
          <p style={{ fontSize: '1rem', color: '#6B7280', marginBottom: '2rem' }}>Join 15,000+ students who trust us with their assignments. Expert help, on-time delivery, money-back guarantee.</p>
          <a href="https://essayembassy.com/order-now" style={{ display: 'inline-block', backgroundColor: '#10B981', color: 'white', fontWeight: 'bold', padding: '1rem 2.5rem', borderRadius: '0.75rem', textDecoration: 'none', fontSize: '1.125rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            Order assignment help
          </a>
        </section>

      </div>
    </>
  );
}
