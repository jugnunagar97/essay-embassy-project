import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { apiEndpoint } from '../config/api';

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function MobileContact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = [
    { 
      rating: 5, 
      verified: true, 
      title: 'Double Success', 
      text: 'We used IvyWise for both of our children, who went through the college admissions process with their support. The team was incredibly knowledgeable and helped us navigate every step with confidence.', 
      author: 'UK Parent', 
      date: 'December 22, 2023',
      country: '🇬🇧'
    },
    { 
      rating: 5, 
      verified: true, 
      title: 'Great experience!', 
      text: 'Helped me so much with the college admissions process, especially Round Table! My counselor was always available to answer questions and provided excellent guidance throughout.', 
      author: 'SR', 
      date: 'November 4, 2024',
      country: '🇺🇸'
    },
    { 
      rating: 4, 
      verified: true, 
      title: 'Wonderful Dedicated Team', 
      text: 'The entire IvyWise team was fully dedicated and driven to give our daughter everything she needed for success. They were patient, thorough, and incredibly supportive.', 
      author: 'AS', 
      date: 'January 2, 2025',
      country: '🇺🇸'
    },
    { 
      rating: 5, 
      verified: true, 
      title: 'Amazing Support', 
      text: 'The support team was always there to answer my questions and guide me through the process. They made what seemed overwhelming feel manageable and achievable.', 
      author: 'Emily R.', 
      date: 'March 15, 2024',
      country: '🇨🇦'
    },
    { 
      rating: 5, 
      verified: true, 
      title: 'Exceeded Expectations', 
      text: 'My essay was delivered on time and exceeded my expectations. The writer understood exactly what I needed and produced outstanding work that helped me get into my dream school.', 
      author: 'James W.', 
      date: 'October 8, 2024',
      country: '🇦🇺'
    },
    { 
      rating: 5, 
      verified: true, 
      title: 'Professional Writers', 
      text: 'The writer assigned to me was very professional and knowledgeable. They communicated clearly and delivered exactly what was promised. Highly recommend this service!', 
      author: 'Sophie L.', 
      date: 'September 19, 2024',
      country: '🇬🇧'
    },
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await fetch(apiEndpoint('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Your message has been sent successfully!');
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Essay Embassy</title>
        <meta name="description" content="Get in touch with Essay Embassy. We're here to help with your academic writing needs. Contact us 24/7 for support and questions." />
        <link rel="canonical" href="https://essayembassy.com/contact" />
      </Helmet>

      <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
        
        {/* Header Section */}
        <div style={{ backgroundColor: '#F1F5F9', padding: '2rem 1rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '0.75rem' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: '1.5' }}>
            Have questions or ready to start an order? We're here to help, 24/7.
          </p>
        </div>

        {/* Main Content */}
        <div style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
          
          {/* Get in Touch Section */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '0.75rem' }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Use the details below to contact us directly or fill out the form and we'll get back to you as soon as possible.
            </p>

            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'start', marginBottom: '1.25rem' }}>
              <div style={{ backgroundColor: '#DBEAFE', padding: '0.75rem', borderRadius: '0.5rem', marginRight: '1rem', flexShrink: 0 }}>
                <svg width="20" height="20" fill="none" stroke="#3B82F6" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.25rem' }}>
                  Our Address
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.5' }}>
                  1309 Beacon Street, Suite 300, Brookline, MA, 02446
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'start' }}>
              <div style={{ backgroundColor: '#DBEAFE', padding: '0.75rem', borderRadius: '0.5rem', marginRight: '1rem', flexShrink: 0 }}>
                <svg width="20" height="20" fill="none" stroke="#3B82F6" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.25rem' }}>
                  Email Us
                </h3>
                <a href="mailto:essayembassy@gmail.com" style={{ fontSize: '0.875rem', color: '#3B82F6', textDecoration: 'none' }}>
                  essayembassy@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1.25rem' }}>
              Send a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Full Name */}
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #D1D5DB', 
                    borderRadius: '0.5rem', 
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #D1D5DB', 
                    borderRadius: '0.5rem', 
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Entered value does not match email format'
                    }
                  })}
                />
                {errors.email && (
                  <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g., Question about my order"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #D1D5DB', 
                    borderRadius: '0.5rem', 
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  {...register('subject', { required: 'Subject is required' })}
                />
                {errors.subject && (
                  <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your message..."
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #D1D5DB', 
                    borderRadius: '0.5rem', 
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                  {...register('message', { required: 'Message is required' })}
                ></textarea>
                {errors.message && (
                  <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#10B981',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.875rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  minHeight: '48px'
                }}
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Who We Are Section */}
        <div style={{ padding: '3rem 1rem', backgroundColor: '#F9FAFB' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            
            {/* Image Grid */}
            <div style={{ marginBottom: '2rem' }}>
              <img 
                src="/images/Who-We-Are.png" 
                alt="Who We Are - Essay Embassy Team" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '0.75rem',
                  objectFit: 'contain',
                  maxHeight: '22rem'
                }}
              />
            </div>

            {/* Content */}
            <div>
              {/* Eyebrow */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold', 
                  color: '#0EA5E9', 
                  letterSpacing: '0.1em', 
                  textTransform: 'uppercase' 
                }}>
                  WHO WE ARE
                </span>
                <div style={{ 
                  height: '2px', 
                  width: '40px', 
                  backgroundColor: '#0EA5E9', 
                  marginTop: '0.5rem', 
                  borderRadius: '2px' 
                }}></div>
              </div>

              {/* Headline */}
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '500', 
                color: '#1F2937', 
                marginBottom: '1.5rem', 
                lineHeight: '1.3',
                fontFamily: 'Playfair Display, serif'
              }}>
                Every day, we set out to change the world...together
              </h2>

              {/* Paragraph 1 */}
              <p style={{ 
                fontSize: '1rem', 
                color: '#6B7280', 
                marginBottom: '1rem', 
                lineHeight: '1.7' 
              }}>
                We are a passionate team of expert writers, editors, and support professionals dedicated to helping students achieve their academic goals. Our mission is to provide high-quality, original essays and assignments that empower learners to succeed with confidence.
              </p>

              {/* Paragraph 2 */}
              <p style={{ 
                fontSize: '1rem', 
                color: '#6B7280', 
                lineHeight: '1.7' 
              }}>
                With years of experience and a commitment to integrity, we believe in making a real difference—one paper at a time. Collaboration, trust, and excellence are at the heart of everything we do.
              </p>
            </div>

          </div>
        </div>

        {/* Testimonials Section - Trustpilot Style */}
        <div style={{ padding: '3rem 1rem', backgroundColor: '#F5F4F0' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              
              {/* Title */}
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '400', 
                color: '#20504F', 
                textAlign: 'center', 
                marginBottom: '2rem',
                fontFamily: 'Playfair Display, serif',
                lineHeight: '1.3'
              }}>
                Check out what others have to say about us:
              </h2>

              {/* Reviews with Load More */}
              {/* Review Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {displayedReviews.map((review, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      padding: '1.25rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      border: '1px solid #E5E7EB'
                    }}
                  >
                    {/* Top Row: Stars & Verified */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.125rem' }}>
                        {[...Array(5)].map((_, starIdx) => (
                          <svg
                            key={starIdx}
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill={starIdx < review.rating ? '#00B67A' : '#E5E7EB'}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/>
                          </svg>
                        ))}
                      </div>
                      {review.verified && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.25rem', 
                          backgroundColor: '#E6F7F1', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '0.25rem' 
                        }}>
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="10" fill="#00B67A"/>
                            <path d="M6 10l2.5 2.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#00B67A' }}>
                            Verified
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: '700', 
                      color: '#1F2937', 
                      marginBottom: '0.5rem' 
                    }}>
                      {review.title}
                    </h3>

                    {/* Review Text */}
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#4B5563', 
                      lineHeight: '1.6', 
                      marginBottom: '0.75rem' 
                    }}>
                      {review.text}
                    </p>

                    {/* Author & Date */}
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>{review.country}</span>
                      <span>{review.author}</span>
                      <span>·</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  style={{
                    backgroundColor: showAllReviews ? '#F3F4F6' : '#00B67A',
                    color: showAllReviews ? '#374151' : 'white',
                    fontWeight: '600',
                    padding: '0.875rem 2rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    minHeight: '48px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {showAllReviews ? 'Show Less ↑' : 'Load More Reviews ↓'}
                </button>
              </div>

              {/* Footer: Rating + Trustpilot Logo */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
                  Rated 4.7 / 5 based on 30 reviews. Showing our 5 star reviews.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <img 
                    src="/images/trustpilot logo 2.png" 
                    alt="Trustpilot" 
                    style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
              </div>

            </div>
          </div>

        {/* How It Works Section */}
        <div style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            
            {/* Section Title */}
            <h2 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              color: '#1F2937', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              How It Works:
            </h2>

            {/* Cards Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Card 1 */}
              <div style={{ 
                backgroundColor: 'white', 
                border: '2px solid #000', 
                borderRadius: '1rem', 
                padding: '1.5rem',
                position: 'relative'
              }}>
                {/* Number Badge */}
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  backgroundColor: '#22D3EE', 
                  borderRadius: '0.375rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.125rem',
                  marginBottom: '1rem'
                }}>
                  1
                </div>

                {/* Title */}
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: '#1F2937', 
                  marginBottom: '0.75rem' 
                }}>
                  Find your writer.
                </h3>

                {/* Description */}
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6B7280', 
                  lineHeight: '1.6',
                  marginBottom: '1.25rem'
                }}>
                  We'll connect you with a writer who will motivate, challenge, and inspire you.
                </p>

                {/* Image */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  padding: '1rem 0' 
                }}>
                  <img 
                    src="/images/Ashley Thompson.jpg" 
                    alt="Ashley Thompson - Essay Writer" 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '3px solid white',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div style={{ 
                backgroundColor: 'white', 
                border: '2px solid #000', 
                borderRadius: '1rem', 
                padding: '1.5rem',
                position: 'relative'
              }}>
                {/* Number Badge */}
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  backgroundColor: '#FDE047', 
                  borderRadius: '0.375rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.125rem',
                  marginBottom: '1rem'
                }}>
                  2
                </div>

                {/* Title */}
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: '#1F2937', 
                  marginBottom: '0.75rem' 
                }}>
                  Start learning.
                </h3>

                {/* Description */}
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6B7280', 
                  lineHeight: '1.6',
                  marginBottom: '1.25rem'
                }}>
                  Your tutor will guide the way through your first lesson and help you plan your next steps.
                </p>

                {/* Image */}
                <img 
                  src="/images/Start-learning.jpg" 
                  alt="Start Learning" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '0.75rem',
                    maxHeight: '200px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Card 3 */}
              <div style={{ 
                backgroundColor: 'white', 
                border: '2px solid #000', 
                borderRadius: '1rem', 
                padding: '1.5rem',
                position: 'relative'
              }}>
                {/* Number Badge */}
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  backgroundColor: '#2563EB', 
                  borderRadius: '0.375rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.125rem',
                  marginBottom: '1rem'
                }}>
                  3
                </div>

                {/* Title */}
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: '#1F2937', 
                  marginBottom: '0.75rem' 
                }}>
                  Speak. Read. Write. Repeat.
                </h3>

                {/* Description */}
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6B7280', 
                  lineHeight: '1.6',
                  marginBottom: '1.25rem'
                }}>
                  Choose how many lessons you want to take each week and get ready to reach your goals!
                </p>

                {/* Image */}
                <img 
                  src="/images/Speak-Read.jpg" 
                  alt="Speak Read Write Repeat" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '0.75rem',
                    maxHeight: '200px',
                    objectFit: 'cover'
                  }}
                />
              </div>

            </div>

            {/* CTA Button */}
            <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
              <a 
                href="https://essayembassy.com/order-now"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#10B981',
                  color: 'white',
                  fontWeight: '600',
                  padding: '1rem 2.5rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  minHeight: '48px',
                  lineHeight: '1.5'
                }}
              >
                Get Started Now
              </a>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#9CA3AF', 
                marginTop: '1rem',
                textAlign: 'center'
              }}>
                Join 15,000+ students who trust us with their success
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
