import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const academicLevels = ["High School", "College", "University", "PhD"] as const;
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"] as const;

type AcademicLevel = (typeof academicLevels)[number];
type Deadline = (typeof deadlines)[number];

const isAcademicLevel = (value: string): value is AcademicLevel =>
  academicLevels.includes(value as AcademicLevel);

const isDeadline = (value: string): value is Deadline =>
  deadlines.includes(value as Deadline);

const sampleCards = [
  { title: "Algebra Word Problems Homework Set", pages: 3, level: "High School", type: "Math Homework", citation: "N/A" },
  { title: "Chemistry Balancing Equations Practice", pages: 2, level: "College", type: "Science Homework", citation: "N/A" },
  { title: "Java Programming Exercises Solutions", pages: 5, level: "University", type: "Coding Homework", citation: "IEEE" },
  { title: "Macroeconomics Problem Set Analysis", pages: 4, level: "College", type: "Economics Homework", citation: "APA" },
];

export default function MobileHomeworkHelp() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const faqData = [
    { question: 'What homework subjects can you help with?', answer: 'We cover all major homework subjects including Math, Science, English, History, Programming, and more. Our tutors help with daily homework, practice problems, worksheets, and review assignments from elementary to college level.' },
    { question: 'How quickly can I get homework help?', answer: 'Homework help is available 24/7 with responses starting in as fast as 3 hours. Most homework assignments are completed within the same day. Urgent requests get immediate attention from our fastest tutors.' },
    { question: 'Will homework solutions be explained?', answer: 'Yes. Every homework solution includes step-by-step explanations so you understand how to solve similar problems. Our tutors break down complex concepts into simple steps you can follow.' },
    { question: 'What if my homework answer is wrong?', answer: 'We guarantee accurate solutions. If you find any mistakes, we\'ll fix them immediately at no charge. We also offer unlimited revisions within 14 days to ensure you get the correct answers.' },
  ];

  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { academicLevel: "High School", pages: 1, deadline: "24 hours" },
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
    return priceConfig[level]?.[deadline]?.base || 12;
  };

  const levelValue = isAcademicLevel(watchedValues.academicLevel) ? watchedValues.academicLevel : 'High School';
  const deadlineValue = isDeadline(watchedValues.deadline) ? watchedValues.deadline : '24 hours';

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
        <title>Homework Help Online | Get Expert Tutoring 24/7</title>
        <meta name="description" content="24/7 online homework help for Math, Science, English & more. Expert tutors provide step-by-step solutions. Fast answers from $12. Available now!" />
        <link rel="canonical" href="https://essayembassy.com/services/homework-help" />
      </Helmet>

      <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7FAFC', minHeight: '100vh', paddingBottom: '2rem' }}>
        
        {/* Hero Section */}
        <section style={{ padding: '1.5rem 1rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#E5E7EB', fontSize: '0.75rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1.5rem' }}>
            <span style={{ backgroundColor: 'white', borderRadius: '9999px', height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.5rem' }}>⚡</span>
            INSTANT HOMEWORK SOLUTIONS
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', lineHeight: '1.2', marginBottom: '1rem' }}>
            Get Online Homework Help from Expert Tutors 24/7
          </h1>

          <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: '1.6', marginBottom: '2rem' }}>
            Stuck on homework? Get step-by-step solutions to Math, Science, English problems. Fast answers, clear explanations, available anytime.
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>Get homework help now</h2>

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
                Get homework help
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
              Your Homework Tutors
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6', padding: '0 1rem' }}>
              Expert tutors ready to help with homework in Math, Science, English, History, and 70+ subjects. Get clear explanations and correct answers fast.
            </p>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.75rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.75rem' }}>
              Qualified tutors from leading universities
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <img src="/images/univ-logos.svg" alt="Universities" style={{ height: '24px', filter: 'grayscale(100%)' }} />
            </div>
          </div>

          {(() => {
            const [showAll, setShowAll] = useState(false);
            
            const writers = [
              { name: 'Stellan G.', degree: "Master's degree", image: '/images/Stellan%20G..jpg', subjects: ['Algebra', 'Calculus'], finishTime: '98%', reviews: '4.9', success: '99%', repeatHire: '56%' },

              { name: 'Ashley Thompson', degree: "Master's degree", image: '/images/Ashley%20Thompson.jpg', subjects: ['English', 'Literature'], finishTime: '97%', reviews: '5.0', success: '98%', repeatHire: '54%' },

              { name: 'Bellamy K.', degree: "Master's degree", image: '/images/Bellamy%20K..jpg', subjects: ['History', 'Social Studies'], finishTime: '96%', reviews: '4.8', success: '97%', repeatHire: '52%' },

              { name: 'Michael Johnson', degree: "Master's degree", image: '/images/Michael%20Johnson.jpg', subjects: ['Chemistry', 'Physics'], finishTime: '98%', reviews: '5.0', success: '99%', repeatHire: '58%' },

              { name: 'Jessica Miller', degree: "Master's degree", image: '/images/Jessica%20Miller.jpg', subjects: ['Biology', 'Anatomy'], finishTime: '97%', reviews: '4.9', success: '98%', repeatHire: '55%' },
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
                          <span>On-time delivery</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{writer.finishTime}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
                          <span>Student rating</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{writer.reviews}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
                          <span>Success rate</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{writer.success}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                          <span>Return rate</span>
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
                    {showAll ? 'Show Less ↑' : 'Meet More Tutors ↓'}
                  </button>
                </div>
              </>
            );
          })()}
        </section>

        {/* Features */}
        <section style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Why Choose <span style={{ color: '#10B981' }}>Our Homework Help</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { emoji: '✅', title: 'Clear Step-by-Step Answers', desc: 'Understand how to solve homework problems. Get detailed explanations, not just final answers.' },
              { emoji: '📝', title: 'Available 24/7 Anytime', desc: 'Homework help available around the clock. Submit questions day or night and get fast responses.' },
              { emoji: '💰', title: 'Affordable Student Pricing', desc: 'Budget-friendly rates starting at $12. Pay only for homework help you need, no subscriptions.' },
              { emoji: '🔒', title: 'Chat with Your Tutor', desc: 'Ask follow-up questions and get clarifications. Direct messaging with assigned homework tutor.' },
              { emoji: '⚡', title: 'Fast Homework Solutions', desc: 'Get homework done quickly without rushing quality. Most assignments completed same day.' },
              { emoji: '💵', title: 'Guaranteed Accuracy', desc: 'Wrong answer? We fix it free. All homework solutions checked for correctness before delivery.' },
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
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>Homework help pricing</h2>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginBottom: '2rem' }}>
            Simple pricing from <span style={{ fontWeight: 'bold' }}>$12/page</span> for all subjects
          </p>

          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Always included</h3>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '1rem' }}>Free with every homework order</p>
            {['Step-by-step explanations', 'Direct tutor messaging', 'Plagiarism check', 'Unlimited revisions'].map(item => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{item}</span>
                <span style={{ backgroundColor: '#DCFCE7', color: '#16A34A', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>Free</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="https://essayembassy.com/order-now" style={{ display: 'inline-block', backgroundColor: '#10B981', color: 'white', fontWeight: 'bold', padding: '1rem 2rem', borderRadius: '9999px', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              Start homework order
            </a>
          </div>
        </section>

        {/* Sample Homework */}
        <section style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>Sample Homework Solutions</h2>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginBottom: '2rem' }}>
            See examples of completed homework from our tutors
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
                  <div style={{ marginBottom: '0.5rem' }}><strong>Subject:</strong> {sample.type}</div>
                  <div><strong>Format:</strong> {sample.citation}</div>
                </div>
                <button style={{ width: '100%', backgroundColor: '#10B981', color: 'white', fontWeight: '600', padding: '0.75rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
                  View solution
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
              Real feedback from students who got homework help
            </p>
          </div>

          {(() => {
            const [activeTab, setActiveTab] = useState<'google' | 'trustpilot' | 'sitejabber'>('google');
            const [hoveredTab, setHoveredTab] = useState<string | null>(null);
            const [showAll, setShowAll] = useState(false);

            const reviews = {
              google: [
                { name: 'Quinn Baxter', country: '🇺🇸', rating: 4.7, date: 'Oct 29, 2024', orderId: '#EE-5012', text: 'Saved me on my algebra homework! The tutor explained each step clearly and I actually understand how to solve these problems now. Got my homework in 6 hours!' },

                { name: 'Thea Ashford', country: '🇬🇧', rating: 4.5, date: 'Oct 16, 2024', orderId: '#EE-4891', text: 'Great help with my chemistry homework. Solutions were accurate and well-explained. My teacher even complimented my work!' },

                { name: 'Darius Vale', country: '🇨🇦', rating: 4.2, date: 'Oct 2, 2024', orderId: '#EE-4723', text: 'Good service for math homework. Had one question about a step and the tutor explained it right away. Fair pricing too.' },

                { name: 'Freya Locke', country: '🇦🇺', rating: 4.9, date: 'Sep 18, 2024', orderId: '#EE-4578', text: 'Fourth time using them for homework help. Always reliable and answers are always right. Highly recommend for any subject!' },

                { name: 'Coen Hartley', country: '🇳🇿', rating: 4.6, date: 'Aug 30, 2024', orderId: '#EE-4401', text: 'Helped me with three different homework assignments in one week. Quality stayed consistent across all subjects. Very helpful!' },
              ],
              trustpilot: [
                { name: 'Elara Penn', country: '🇺🇸', rating: 4.8, date: 'Nov 3, 2024', orderId: '#EE-5089', text: 'Best homework help site I\'ve found. Tutors actually care about helping you understand, not just giving answers. Worth the money!' },

                { name: 'Rowan Thorne', country: '🇬🇧', rating: 4.4, date: 'Oct 22, 2024', orderId: '#EE-4934', text: 'Really impressed with my physics homework. Tutor showed multiple ways to solve each problem. Support team was friendly too.' },

                { name: 'Aria Cross', country: '🇨🇦', rating: 4.3, date: 'Oct 10, 2024', orderId: '#EE-4812', text: 'Good experience. Homework was done correctly but I asked for one clarification. Tutor responded within an hour. Professional service.' },

                { name: 'Leif Sterling', country: '🇩🇪', rating: 4.9, date: 'Sep 24, 2024', orderId: '#EE-4667', text: 'Excellent biology homework help! Used references I hadn\'t even thought of. Delivered early which gave me time to review.' },

                { name: 'Mira Langley', country: '🇦🇺', rating: 4.5, date: 'Sep 8, 2024', orderId: '#EE-4489', text: 'Reliable and consistent. Used them all semester for homework and never disappointed. Tutors know their subjects well.' },
              ],
              sitejabber: [
                { name: 'Zane Merrick', country: '🇺🇸', rating: 4.7, date: 'Nov 6, 2024', orderId: '#EE-5124', text: 'Life saver for my calculus homework! Explained everything so clearly. Even my professor noticed improvement in my work!' },

                { name: 'Lyra Finch', country: '🇬🇧', rating: 4.2, date: 'Oct 26, 2024', orderId: '#EE-4981', text: 'Solid homework help. Had to ask for one revision but tutor fixed it quickly. Good quality and reasonable price.' },

                { name: 'Knox Warden', country: '🇨🇦', rating: 4.9, date: 'Oct 14, 2024', orderId: '#EE-4856', text: 'Amazing! Tutor kept me updated and made sure I understood everything. Got 95% on my homework assignment!' },

                { name: 'Nova Crest', country: '🇳🇿', rating: 4.5, date: 'Sep 29, 2024', orderId: '#EE-4701', text: 'Best choice for homework help. Fast, accurate, and well-explained. Perfect for students with tight schedules.' },

                { name: 'Atlas Monroe', country: '🇫🇷', rating: 4.8, date: 'Sep 15, 2024', orderId: '#EE-4567', text: 'Exceptional quality! Tutor really understood the material and explained it in simple terms. Customer service was very responsive.' },
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
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>How homework help works</h2>
          
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            {[
              { emoji: '✍️', title: '1. Submit homework question', desc: 'Upload your homework problem, worksheet, or question. Include any instructions or files.' },
              { emoji: '💳', title: '2. Pay securely', desc: 'Payment is protected until you get your homework solution and approve the work.' },
              { emoji: '📄', title: '3. Download solution', desc: 'Get your completed homework with step-by-step explanations on time.' },
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
              Submit homework
            </a>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Trusted homework help
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            {[
              { value: '24/7', label: 'Available anytime' },
              { value: '500+', label: 'Expert tutors' },
              { value: '18,000+', label: 'Homework completed' },
              { value: '4.5 ⭐', label: 'Student rating' },
            ].map((stat, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981', marginBottom: '0.25rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#F7FAFC' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Homework help questions
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
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Get homework help right now</h2>
          <p style={{ fontSize: '1rem', color: '#6B7280', marginBottom: '2rem' }}>Join 18,000+ students who trust us with homework. Expert tutors, fast answers, money-back guarantee.</p>
          <a href="https://essayembassy.com/order-now" style={{ display: 'inline-block', backgroundColor: '#10B981', color: 'white', fontWeight: 'bold', padding: '1rem 2.5rem', borderRadius: '0.75rem', textDecoration: 'none', fontSize: '1.125rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            Get homework help
          </a>
        </section>

      </div>
    </>
  );
}
