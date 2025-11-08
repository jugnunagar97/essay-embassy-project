import { GoogleAuthProvider, signInWithPopup, linkWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WritersCarousel from './WritersCarousel';

// --- SpecialAssignmentHelpCarousel: React-based interactive carousel ---
import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const carouselItems = [
  {
    imgSrc: '/images/verification.jpg',
    title: 'Verification',
    description: 'We care about your projects and pick the best specialists. To ensure your safety, we verify the identity of each candidate via social media.'
  },
  {
    imgSrc: '/images/skill test.jpg',
    title: 'Skill Test',
    description: 'We test each candidate by examining their skills and knowledge with various examinations before they join our team.'
  },
  {
    imgSrc: '/images/quality analysis.jpg',
    title: 'Quality Analysis',
    description: "We developed an AI-based system that analyses the quality of each expert's performance to ensure you get the best results."
  },
  {
    imgSrc: '/images/education level.jpg',
    title: 'Education Level',
    description: 'Our experts have diverse educational backgrounds, ensuring you get help from someone who truly understands your field.'
  },
  {
    imgSrc: '/images/broad expertise.jpg',
    title: 'Broad Expertise',
    description: 'No matter how complicated your assignment is, we can find a specialist that is competent enough to provide you with a clear and effective solution to any academic problem.'
  },
  {
    imgSrc: '/images/communication skills.jpg',
    title: 'Communication Skills',
    description: 'You can chat with all the experts who can help you with your assignments, even before you hire them. Make your decision based not only on reviews and ratings but also on your own impression of the direct interaction.'
  }
];

export function SpecialAssignmentHelpCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef<number>(0);

  // Calculate card width after mount
  React.useEffect(() => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const card = trackRef.current.children[0] as HTMLElement;
      cardWidthRef.current = card.offsetWidth;
    }
    const handleResize = () => {
      if (trackRef.current && trackRef.current.children.length > 0) {
        const card = trackRef.current.children[0] as HTMLElement;
        cardWidthRef.current = card.offsetWidth;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation
  const goTo = (idx: number) => {
    if (idx < 0) idx = 0;
    if (idx > carouselItems.length - 1) idx = carouselItems.length - 1;
    setCurrentIndex(idx);
  };
  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  // Drag/Swipe handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setDragStartX(e.touches[0].pageX);
    } else {
      setDragStartX(e.pageX);
    }
    setDragDelta(0);
  };
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || dragStartX === null) return;
    let clientX = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].pageX;
    } else if ('pageX' in e) {
      clientX = (e as MouseEvent).pageX;
    }
    setDragDelta(clientX - dragStartX);
  };
  const handleDragEnd = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || dragStartX === null) return;
    let clientX = 0;
    if ('changedTouches' in e && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].pageX;
    } else if ('pageX' in e) {
      clientX = (e as MouseEvent).pageX;
    }
    const dx = clientX - dragStartX;
    setIsDragging(false);
    setDragStartX(null);
    setDragDelta(0);
    if (dx > 50 && currentIndex > 0) {
      goTo(currentIndex - 1);
    } else if (dx < -50 && currentIndex < carouselItems.length - 1) {
      goTo(currentIndex + 1);
    }
  };
  // Attach/remove global listeners for drag
  React.useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent | TouchEvent) => handleDragMove(e);
    const up = (e: MouseEvent | TouchEvent) => handleDragEnd(e);
    window.addEventListener('mousemove', move as any);
    window.addEventListener('mouseup', up as any);
    window.addEventListener('touchmove', move as any);
    window.addEventListener('touchend', up as any);
    return () => {
      window.removeEventListener('mousemove', move as any);
      window.removeEventListener('mouseup', up as any);
      window.removeEventListener('touchmove', move as any);
      window.removeEventListener('touchend', up as any);
    };
    // eslint-disable-next-line
  }, [isDragging, dragStartX, currentIndex]);

  // Calculate transform
  const gap = 32; // px, matches gap-8
  const cardWidth = cardWidthRef.current || 380; // fallback
  const offset = -currentIndex * (cardWidth + gap) + (isDragging ? dragDelta : 0);

  return (
    <section className="w-full bg-[#F7FAFC] py-10">
      <div className="max-w-6xl mx-auto px-4 bg-[#F7FAFC] shadow-none border-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* Left Column: Static Content & Navigation */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div>
              {/* Lighter, more elegant heading and description */}
              <div className="mb-4 flex items-center">
                <span className="inline-block w-1 h-7 bg-primary-400 rounded-full mr-3"></span>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide leading-snug" style={{fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em'}}>
                  Unique Features of Our Narrative Essay Service
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed mt-2 mb-10 max-w-md" style={{fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em'}}>
                We focus on creating narrative essays with strong plot, character development, and themes. Ideal for personal stories, reflective pieces, or creative assignments in English classes across universities.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={handlePrev} aria-label="Previous" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary-100 transition-colors shadow focus:outline-none" disabled={currentIndex === 0}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={handleNext} aria-label="Next" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary-100 transition-colors shadow focus:outline-none" disabled={currentIndex === carouselItems.length - 1}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          {/* Right Column: Dynamic Carousel */}
          <div className="md:col-span-2 relative overflow-x-hidden select-none">
            <div
              className="w-full overflow-x-hidden"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div
                ref={trackRef}
                className="flex gap-8 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${offset}px)`,
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(.4,0,.2,1)',
                }}
              >
                {carouselItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex-shrink-0 w-full md:w-[380px] bg-[#F7FAFC] rounded-2xl shadow-xl p-6"
                    style={{ userSelect: 'none' }}
                  >
                    <img src={item.imgSrc} alt={item.title} className="w-full aspect-video object-cover rounded-xl mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-base">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- ClientTestimonialsCarousel: 3D-style testimonial carousel ---
function ClientTestimonialsCarousel() {
  const testimonials = [
    {
      id: 'EE-74123',
      rating: 5,
      text: 'My writer turned a simple volunteering memory into a powerful story about leadership and empathy. It sounded like me—just better.',
      date: '04/28/2025',
      level: 'College',
    },
    {
      id: 'EE-75604',
      rating: 5,
      text: 'I was stuck between two topics. They coached me through a short interview and built a narrative with a strong hook that my professor praised.',
      date: '06/03/2025',
      level: 'University',
    },
    {
      id: 'EE-73391',
      rating: 4,
      text: 'They kept my tone but fixed structure and pacing. The concluding reflection tied perfectly to my course outcomes.',
      date: '05/14/2025',
      level: 'Masters',
    },
    {
      id: 'EE-74802',
      rating: 5,
      text: 'Loved how the essay showed a turning point and what I learned. It felt honest and still very polished.',
      date: '03/19/2025',
      level: 'High School',
    },
    {
      id: 'EE-75988',
      rating: 4,
      text: 'They helped me avoid clichés and built a unique angle around a small moment. Great flow and voice.',
      date: '02/07/2025',
      level: 'College',
    },
    {
      id: 'EE-76231',
      rating: 5,
      text: 'The narrative hits hook, context, pivotal moment, and reflection perfectly. My tutor said it finally “sounds like you.”',
      date: '06/18/2025',
      level: 'University',
    },
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cardCount = testimonials.length;

  // Navigation logic
  const goTo = (idx: number) => {
    if (idx < 0) idx = cardCount - 1;
    if (idx > cardCount - 1) idx = 0;
    setCurrentIndex(idx);
  };
  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  // For 3D effect: calculate transform for each card
  const getCardStyle = (idx: number): React.CSSProperties => {
    const offset = idx - currentIndex;
    if (offset === 0) {
      return {
        transform: 'scale(1) translateY(0)',
        opacity: 1,
        zIndex: 2,
        boxShadow: '0 8px 32px 0 rgba(16,30,54,0.18), 0 1.5px 6px 0 rgba(16,30,54,0.08)',
      };
    } else if (Math.abs(offset) === 1) {
      return {
        transform: `scale(0.85) translateX(${offset * 60}px) translateY(20px)` ,
        opacity: 0.5,
        zIndex: 1,
        boxShadow: '0 4px 16px 0 rgba(16,30,54,0.10)',
      };
    } else {
      return {
        transform: `scale(0.7) translateX(${offset * 120}px) translateY(40px)` ,
        opacity: 0.2,
        zIndex: 0,
        boxShadow: 'none',
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <section className="w-full py-24 bg-[#F7FAFC]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Hear What Our Clients Have To Say</h2>
        {/* Carousel Viewport */}
        <div className="relative flex items-center justify-center" style={{minHeight: 340}}>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#F7FAFC] transition focus:outline-none"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {/* Carousel Track */}
          <div className="flex items-center justify-center w-full overflow-hidden" style={{minHeight: 320, minWidth: 0}}>
            {testimonials.map((t, idx) => {
              const offset = idx - currentIndex;
                return (

                    <>

                      <Helmet>

                        <title>Narrative Essay Writing Service | Expert Help</title>

                        <meta

                          name="description"

                          content="Professional narrative essay writing service. Get engaging, well-written narrative essays with compelling storytelling."

                        />

                        <link rel="canonical" href="https://essayembassy.com/services/narrative-essay" />

                      </Helmet>

                      <div
                  key={t.id}
                  className={`bg-white rounded-2xl p-8 mx-2 shadow-xl transition-all duration-500 ease-in-out flex flex-col w-full max-w-xl absolute left-1/2 top-0" ${idx === currentIndex ? 'is-active' : ''}`}
                  style={{
                    ...getCardStyle(idx),
                    width: '90%',
                    maxWidth: 480,
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    transform: `${getCardStyle(idx).transform} translateX(-50%)`,
                    transition: 'all 0.5s cubic-bezier(.4,0,.2,1)',
                    background: '#fff',
                    boxShadow: getCardStyle(idx).boxShadow,
                    border: undefined,
                    opacity: offset === 0 ? 1 : 0.25,
                  }}
                  aria-hidden={idx !== currentIndex}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-primary-700 text-lg">Customer ID: {t.id}</div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <svg key={star} width="22" height="22" fill={star <= t.rating ? '#FACC15' : '#E5E7EB'} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      ))}
                    </div>
                  </div>
                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-base mb-8">{t.text}</p>
                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <div className="font-bold text-gray-700 text-sm">Date:</div>
                      <div className="text-gray-600 text-sm">{t.date}</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-700 text-sm">Academic Level:</div>
                      <div className="text-gray-600 text-sm">{t.level}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#F7FAFC] transition focus:outline-none"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full border-2 ${idx === currentIndex ? 'bg-primary-600 border-primary-600 scale-125' : 'bg-white border-gray-300'} transition-all`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        {/* Verified reviews UI block (simple, subtle, competitor style) */}
        <div className="flex items-center justify-center gap-2" style={{marginTop: '2.5rem', marginBottom: '0'}}>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="#34D399"/>
              <path d="M6.5 10.2l2.1 2.1L13.5 8.2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="text-gray-500 text-base font-normal">All reviews are from verified users</span>
        </div>
      </div>
    </section>
  );
}

const academicLevels = ["High School", "College", "University", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];

export default function MatlabProgrammingHelp() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm<{
    academicLevel: string;
    pages: number;
    deadline: string;
  }>({
    defaultValues: {
      academicLevel: "College",
      pages: 1,
      deadline: "48 hours",
    },
  });

  // Add state to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // FAQ state and data moved here
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const watchedValues = watch();
  const WORDS_PER_PAGE = 275;
  const totalWords = (watchedValues.pages || 1) * WORDS_PER_PAGE;

  // Price config copied from OrderNow
  const priceConfig = {
    "High School": {
      "3 hours": { base: 18, urgent: 1.8 }, "6 hours": { base: 16, urgent: 1.6 }, "12 hours": { base: 14, urgent: 1.4 },
      "24 hours": { base: 12, urgent: 1.2 }, "48 hours": { base: 12, urgent: 1.0 }, "3 days": { base: 12, urgent: 1.0 },
      "5 days": { base: 12, urgent: 1.0 }, "7 days": { base: 12, urgent: 1.0 }, "10 days": { base: 12, urgent: 1.0 }, "14 days": { base: 12, urgent: 1.0 }
    },
    "College": {
      "3 hours": { base: 25, urgent: 1.8 }, "6 hours": { base: 22, urgent: 1.6 }, "12 hours": { base: 18, urgent: 1.4 },
      "24 hours": { base: 15, urgent: 1.2 }, "48 hours": { base: 15, urgent: 1.0 }, "3 days": { base: 15, urgent: 1.0 },
      "5 days": { base: 15, urgent: 1.0 }, "7 days": { base: 15, urgent: 1.0 }, "10 days": { base: 15, urgent: 1.0 }, "14 days": { base: 15, urgent: 1.0 }
    },
    "University": {
      "3 hours": { base: 28, urgent: 1.8 }, "6 hours": { base: 25, urgent: 1.6 }, "12 hours": { base: 21, urgent: 1.4 },
      "24 hours": { base: 18, urgent: 1.2 }, "48 hours": { base: 18, urgent: 1.0 }, "3 days": { base: 18, urgent: 1.0 },
      "5 days": { base: 18, urgent: 1.0 }, "7 days": { base: 18, urgent: 1.0 }, "10 days": { base: 18, urgent: 1.0 }, "14 days": { base: 18, urgent: 1.0 }
    },
    "PhD": {
      "3 hours": { base: 38, urgent: 1.8 }, "6 hours": { base: 35, urgent: 1.6 }, "12 hours": { base: 31, urgent: 1.4 },
      "24 hours": { base: 28, urgent: 1.2 }, "48 hours": { base: 25, urgent: 1.0 }, "3 days": { base: 25, urgent: 1.0 },
      "5 days": { base: 25, urgent: 1.0 }, "7 days": { base: 25, urgent: 1.0 }, "10 days": { base: 25, urgent: 1.0 }, "14 days": { base: 25, urgent: 1.0 }
    }
  };
  function getBasePrice(academicLevel: keyof typeof priceConfig, deadline: string): number {
    const config = (priceConfig[academicLevel] as Record<string, { base: number; urgent: number }>)[deadline];
    return config ? config.base : 0;
  }
  // Update price calculation to multiply by number of pages
  const price = getBasePrice(watchedValues.academicLevel as keyof typeof priceConfig, watchedValues.deadline) * (watchedValues.pages || 1);

  const onSubmit = (data: { academicLevel: string; pages: number; deadline: string }) => {
    const params = new URLSearchParams({
      academicLevel: data.academicLevel,
      pages: data.pages.toString(),
      deadline: data.deadline,
    });
    navigate(`/order-now?${params.toString()}`);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Signed in with Google!');
      // Optionally, redirect or update UI here
    } catch (error: any) {
      // Handle account-exists-with-different-credential error for seamless linking
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = GoogleAuthProvider.credentialFromError(error);
        const email = error.customData?.email;
        if (email && pendingCred) {
          // Prompt user for password
          const password = window.prompt(
            `An account already exists with this email (${email}). Please enter your password to link your Google account:`
          );
          if (!password) {
            alert('Password is required to link accounts.');
            return;
          }
          try {
            // Sign in with email/password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Link Google credential
            await linkWithCredential(userCredential.user, pendingCred);
            alert('Your Google account has been linked! You can now sign in with either method.');
          } catch (linkError: any) {
            alert('Failed to link Google account: ' + (linkError && linkError.message ? linkError.message : linkError));
          }
        } else {
          alert('Google sign-in failed: Unable to retrieve credential or email for linking.');
        }
      } else {
        alert('Google sign-in failed: ' + (error && error.message ? error.message : error));
      }
    }
  };

  return (
    <div className="background-icons min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7FAFC' }}>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-8 md:py-10 relative">
        <main className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
              <span className="bg-white text-gray-800 rounded-full h-6 w-6 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <text x="12" y="14" fontFamily="sans-serif" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">AI</text>
                </svg>
              </span>
              PLAGIARISM & AI FREE
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Narrative Essay Writing for Engaging Stories
            </h1>
            <p className="text-lg text-gray-600">
              Craft compelling narrative essays that captivate readers. Our expert writers create original, story-driven content for students in the USA, UK, Canada, Australia, New Zealand, and Europe. Perfect for high school and college assignments.
            </p>
            {/* Ratings */}
            <div className="flex flex-row justify-start items-end gap-6 pt-4">
              {/* Google Reviews */}
              <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                  <img src="/images/google logo.svg" alt="Google Logo" className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                  4.1/5
                  <span className="ml-1 text-yellow-400 text-sm">★</span>
                </span>
                <span className="text-gray-600 text-xs mt-1 font-medium">Google</span>
              </div>
              {/* Trustpilot */}
              <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2 transition duration-200 hover:-translate-y-1 hover:scale-105">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                  <img src="/images/trustpilot logo 2.png" alt="Trustpilot Logo" className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                  4.4/5
                  <span className="ml-1 text-green-500 text-sm">★</span>
                </span>
                <span className="text-gray-600 text-xs mt-1 font-medium">Trustpilot</span>
              </div>
              {/* Sitejabber */}
              <div className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 rounded-xl shadow p-2 transition duration-200 hover:-translate-y-1 hover:scale-105">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 mb-1">
                  <img src="/images/sitejabber-logo-2.png" alt="Sitejabber Logo" className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-center text-base font-semibold text-gray-900">
                  4.0/5
                  <span className="ml-1 text-orange-400 text-sm">★</span>
                </span>
                <span className="text-gray-600 text-xs mt-1 font-medium">Sitejabber</span>
              </div>
            </div> {/* End of ratings flex-row */}
          </div> {/* End of left column content */}
          {/* Right Column: Order Form */}
          <div className="bg-white p-8 rounded-2xl max-w-md mx-auto shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-2px_rgba(0,0,0,0.04)]">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Place an order</h2>
            {/* Sign Up Buttons */}
            <div className="flex gap-4 mb-6 justify-center">
              {!isLoggedIn && (
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-6 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-primary-200 hover:shadow-md hover:scale-[1.03] active:bg-gray-100 active:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-200 hover:text-gray-900"
                  style={{minWidth: '0'}}
                >
                  <img src="/images/google logo.svg" alt="Google" className="h-5 w-5" />
                  Google
                </button>
              )}
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium text-gray-700">Academic Level</label>
                <select {...register('academicLevel')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition mt-1">
                  {academicLevels.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-1 mt-4">
                <button type="button" onClick={() => setValue('pages', Math.max(1, (watchedValues.pages || 1) - 1))} className="px-4 py-2 text-2xl font-light text-gray-600 hover:bg-gray-100 rounded-md">-</button>
                <div className="text-center">
                  <input type="number" min={1} {...register('pages', { valueAsNumber: true })} className="text-lg font-semibold text-gray-800 w-16 text-center border-none outline-none" />
                </div>
                <button type="button" onClick={() => setValue('pages', (watchedValues.pages || 1) + 1)} className="px-4 py-2 text-2xl font-light text-gray-600 hover:bg-gray-100 rounded-md">+</button>
                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-md">{totalWords} words</span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Deadline</label>
                <select {...register('deadline')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition mt-1">
                  {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {/* Price display */}
              <div className="flex flex-col items-center justify-center mt-4">
                <span className="text-xs text-gray-500">From</span>
                <span className="font-bold text-2xl text-primary-600">${price.toFixed(2)}</span>
              </div>
              <button type="submit" className="w-full mt-8 bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Place your order
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account? <Link to="/login" className="font-medium text-teal-600 hover:underline">Log in</Link>
            </p>
            <p className="text-center text-xs text-gray-400 mt-6">
              This site is protected by reCAPTCHA and the Google
              <Link to="/privacy-policy" className="text-blue-500 hover:underline ml-1">Privacy Policy</Link> and
              <Link to="/terms-and-conditions" className="text-blue-500 hover:underline ml-1">Terms of Service</Link> apply.
            </p>
          </div>
        </main>
      </section>

      {/* Writers Section Title, Description, and University Logos (Redesigned) */}
      <section className="w-full bg-[#F7FAFC] pt-8 pb-2">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Expert Narrative Essay Writers</h2>
          <div className="text-lg md:text-xl text-gray-700 mb-1 leading-snug">
            Our team of native English writers specializes in narrative essay writing, drawing from real experiences to build vivid, structured stories tailored to your academic needs.
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mt-4 w-full">
            <div className="text-base text-gray-600 mb-2 md:mb-0 md:mr-6 whitespace-nowrap">
              Cooperate with those who graduated<br className="hidden md:block" />
              from the best universities and colleges
            </div>
            <div className="hidden md:block h-8 border-l border-emerald-400 mx-4"></div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 w-full md:w-auto">
          <img src="/images/univ-logos.svg" alt="Top Universities" className="h-10 md:h-12 my-2" style={{maxWidth: '100%', height: 'auto'}} />
            </div>
          </div>
        </div>
      </section>
      <div className="mt-8"></div>
      {/* Writers Scrollable Area */}
      <div className="container mx-auto px-6 pb-6">
        <WritersCarousel />
      </div>

      {/* We go beyond assignment help services Block (glassmorphism, floating, stylish) */}
      <section className="w-full bg-[#F7FAFC] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-14 tracking-wide text-gray-900 drop-shadow-md" style={{letterSpacing: '0.03em'}}>
            Why Choose Narrative Essay Help from Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Star icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Skilled Storytellers</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Writers with strong narrative skills craft engaging essays based on your prompt and personal details.</div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Report icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <path d="M9 9h6M9 13h6M9 17h6"/>
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Custom Narratives</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Each essay is unique, built around your ideas, events, and reflections to ensure authenticity.</div>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Refund icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M17 1l4 4-4 4"/>
                  <path d="M21 5H7a4 4 0 0 0 0 8h1"/>
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Plagiarism-Free Guarantee</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Full originality checks mean your narrative essay is safe and ready for submission.</div>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Lock icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <rect x="6" y="11" width="12" height="8" rx="2"/>
                  <path d="M12 11V7a4 4 0 1 1 8 0v4"/>
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Academic Expertise</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Experience with high school and college narrative essay requirements in multiple countries.</div>
            </div>
            {/* Card 5 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Clock icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Simple Ordering</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Quick process to get your narrative essay started, with full support throughout.</div>
            </div>
            {/* Card 6 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Dollar icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M12 1v22"/>
                  <path d="M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7"/>
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Secure and Private</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Your story and details remain confidential, protected by our strict policies.</div>
            </div>
          </div>
        </div>
      </section>
      {/* What Makes Assignment Help From Our Experts So Special? Block (moved here) */}
      <section className="w-full bg-[#F7FAFC] py-10">
        <div className="max-w-6xl mx-auto px-4 bg-[#F7FAFC] shadow-none border-none">
          <SpecialAssignmentHelpCarousel />
        </div>
      </section>
      {/* Prices and Services Block (copied from AssignmentHelp) */}
      <section className="w-full bg-[#F7FAFC] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">Prices and services</h2>
          <div className="text-center text-lg text-gray-600 mb-4">
            Prices start at <span className="font-bold text-gray-900 relative inline-block"><span className="z-10 relative">$13.99/page</span><span className="absolute left-0 right-0 bottom-0 h-2 bg-yellow-300 rounded -z-10" style={{height:'0.5em', bottom:'0.1em'}}></span></span> and depend on the page count, deadline, and expert's level
          </div>
          <div className="flex justify-center mb-4">
            <Link to="/refund-policy" className="flex items-center gap-2 text-primary-600 text-base font-medium hover:underline">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01"/><path d="M12 7v4"/><circle cx="12" cy="12" r="10"/></svg>
              How we secure your payment
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mt-12 mb-10">
            {/* Included services */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Included services</h3>
              <div className="text-gray-400 text-base mb-4">You'll always get them for free</div>
              <div className="border-t border-gray-100 mb-4"></div>
              <ul className="flex-1 space-y-3">
                <li className="flex justify-between items-center font-semibold text-gray-800">Topic suggestion <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Formatting <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Title page & references <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Editor quality check <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Unlimited revisions <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span></li>
              </ul>
            </div>
            {/* Additional services */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Additional services</h3>
              <div className="text-gray-400 text-base mb-4">You can add them for an extra payment</div>
              <div className="border-t border-gray-100 mb-4"></div>
              <ul className="flex-1 space-y-3">
                <li className="flex justify-between items-center font-semibold text-gray-800">Grade A guarantee <span className="text-gray-500 font-normal">from $2.99</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Early draft <span className="text-gray-500 font-normal">+15% to the price</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">1-Page abstract <span className="text-gray-500 font-normal">from $13.99</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">VIP support <span className="text-gray-500 font-normal">$12.99</span></li>
                <li className="flex justify-between items-center font-semibold text-gray-800">Detailed outline <span className="text-gray-500 font-normal">$12.00</span></li>
              </ul>
            </div>
          </div>
          {/* Payment methods */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="text-gray-500 text-base">We accept:</div>
            <div className="flex items-center gap-4">
              <img src="/images/visa.svg" alt="Visa" className="h-10" />
              <img src="/images/mastercard.svg" alt="Mastercard" className="h-10" />
              <img src="/images/amex.svg" alt="Amex" className="h-10" />
              <img src="/images/discover.svg" alt="Discover" className="h-10" />
              <img src="/images/paypal.svg" alt="PayPal" className="h-10" />
            </div>
          </div>
          {/* Create an order button */}
          <div className="flex justify-center mt-2">
            <a
              href="/order-now"
              className="inline-block px-12 py-4 rounded-full bg-primary-600 text-white text-lg font-bold shadow-md hover:bg-primary-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              Create an order
            </a>
          </div>
        </div>
      </section>

      {/* Why Essay Embassy Stats Block (Compact, Themed) */}
      <section className="w-full bg-[#F7FAFC] py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">Why Essay Embassy</h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch md:space-x-0 gap-4 md:gap-0">
            {/* Stat 1 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">7+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Years in business</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 2 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">500+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Professional writers</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 3 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">10,262+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Successful orders completed</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 4 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-emerald-500">4.8</span>
                <span className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" fill="#FACC15" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </span>
              </div>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Average<br className='hidden md:block'/>user rating</span>
            </div>
          </div>
        </div>
      </section>
      {/* Client Testimonials Carousel */}
      <section className="w-full bg-[#F7FAFC] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <ClientTestimonialsCarousel />
        </div>
      </section>
      {/* Sample Assignments Block (centered, subtle, blended) */}
      <section className="w-full py-10 px-2 bg-[#F7FAFC]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2 drop-shadow-sm text-center" style={{fontFamily: 'Inter, sans-serif'}}>
            Narrative Essay Samples to Inspire
          </h2>
          <div className="border-b border-gray-200/70 w-16 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-500/90 font-light text-center max-w-2xl mx-auto mb-10" style={{fontFamily: 'Inter, sans-serif', lineHeight: '1.6'}}>
            View examples of successful narrative essays that demonstrate clear structure, vivid descriptions, and meaningful conclusions for various academic levels.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "MATLAB Data Analysis",
                pages: 6,
                level: "College",
                type: "Programming",
                citation: "MATLAB"
              },
              {
                title: "Machine Learning Algorithm",
                pages: 6,
                level: "Bachelor",
                type: "Code Review",
                citation: "MATLAB"
              },
              {
                title: "Web Scraping Project",
                pages: 8,
                level: "PhD",
                type: "Research Paper",
                citation: "MATLAB"
              },
              {
                title: "Basic MATLAB Functions",
                pages: 5,
                level: "High School",
                type: "Report",
                citation: "MATLAB"
              },
            ].map((sample, idx) => (
              <div key={idx} className="bg-white border border-blue-200 rounded-2xl shadow-sm p-6 flex flex-col min-h-[270px] text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-red-100 rounded-md">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#EF4444"/><text x="6" y="15" fontSize="9" fill="white" fontWeight="bold">PDF</text></svg>
                    </span>
                    <span className="font-bold text-gray-900 text-base">{sample.title}</span>
                  </div>
                  <span className="text-gray-400 text-sm font-medium">{sample.pages} Pages</span>
                </div>
                <hr className="my-3 border-gray-200" />
                <div className="flex-1 flex flex-col gap-2 text-sm">
                  <div className="flex flex-row flex-nowrap items-center"><span className="w-32 text-left text-gray-500 flex-shrink-0">Academic Level:</span> <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.level}</span></div>
                  <div className="flex flex-row flex-nowrap items-center"><span className="w-32 text-left text-gray-500 flex-shrink-0">Document Type:</span> <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.type}</span></div>
                  <div className="flex flex-row flex-nowrap items-center"><span className="w-32 text-left text-gray-500 flex-shrink-0">Language:</span> <span className="flex-1 font-bold text-gray-900 ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{sample.citation}</span></div>
                </div>
                <button className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-full shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 text-left pl-6">Read</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Assignment Help journey Block (copied from AssignmentHelp) */}
      <section className="w-full bg-[#F7FAFC] py-12">
        <div className="max-w-md mx-auto px-4 relative flex items-center justify-center">
          {/* Removed decorative circles as requested */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">Order Narrative Essay in Three Steps</h2>
            <div className="flex flex-col items-center relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center mb-3 animate-fade-in-up">
              <span className="text-2xl mb-1">✍️</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">1. Submit your prompt and details</div>
              <div className="text-gray-400 text-sm mb-2">Submit your narrative essay prompt and key details online.</div>
              <a href="/order-now" className="inline-block px-5 py-2 rounded-full bg-primary-600 text-white text-sm font-medium shadow hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 mb-1">Get started</a>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center mb-3">
              <svg width="18" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 0v18m0 0l-5-5m5 5l5-5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center mb-3 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="text-2xl mb-1">💳</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">2. Make a secure deposit</div>
              <div className="text-gray-400 text-sm">Make a secure deposit to start your custom narrative essay.</div>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center mb-3">
              <svg width="18" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 0v18m0 0l-5-5m5 5l5-5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <span className="text-2xl mb-1">📄</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">3. Approve and download</div>
              <div className="text-gray-400 text-sm">Approve the final narrative essay and release payment once satisfied.</div>
            </div>
          </div>
        </div>
        </div>
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
          }
        `}</style>
      </section>

          {/* Why You Need Our Assignment Help - Scrollable Block (Polished, Compact) */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl border border-gray-200 shadow-md relative overflow-hidden p-6 md:p-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-10 md:h-12 bg-yellow-400 rounded-full mr-4" />
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900 text-left">Why You Need Our Narrative Essay Writing Help</h2>
          </div>
          <p className="text-base text-gray-700 text-left mb-4">
            Why Narrative Essays Challenge Students in USA, UK, Canada, Australia, New Zealand, and Europe
          </p>
          <div className="custom-scrollbar max-h-60 overflow-y-auto pr-1 mb-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-700 mb-3">Narrative essay writing requires storytelling skills that many students find tough. High school and college assignments demand clear structure, engaging details, and personal reflection. Admissions or literature classes often use narrative essays to assess creativity and communication.</p>
            <p className="text-sm text-gray-700 mb-3">Our narrative essay writing service helps you succeed. We build essays around real or fictional events with beginning, middle, and end. Keywords like narrative essay examples, personal narrative topics, and reflective story ideas guide our approach for better search visibility.</p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Key Elements of Strong Narrative Essays</h3>
            <ul className="list-disc pl-5 mb-3">
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Clear Plot Structure:</span> Start with an introduction hook, develop rising action, include climax, and end with resolution. Our writers ensure logical flow without gaps.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Vivid Descriptions:</span> Use sensory details to make scenes alive. For topics like overcoming challenges or childhood memories, we add colors, sounds, and emotions.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Character Development:</span> Show growth through actions and thoughts. Whether first-person personal narratives or third-person stories, characters drive the message.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Theme and Reflection:</span> Tie events to a central idea like perseverance or change. End with lessons learned, perfect for academic narrative essay requirements.</li>
            </ul>
            <p className="text-sm text-gray-700 mb-3">Students search for narrative essay help online to avoid common errors. Generic plots or weak endings lower grades. Our service provides original content checked for plagiarism, formatted in MLA, APA, or Chicago style.</p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Benefits of Professional Narrative Essay Assistance</h3>
            <p className="text-sm text-gray-700 mb-3">Hire narrative essay writers for time-saving support. Busy schedules with exams and extracurriculars leave little room for drafting. We deliver on deadlines, from 24 hours for urgent needs.</p>
            <p className="text-sm text-gray-700 mb-3">Targeted for USA students, our essays fit Common Core standards with strong thesis and evidence. UK assignments align with A-level English specs, emphasizing literary devices. Canadian, Australian, New Zealand, and European curricula get tailored narratives focusing on cultural relevance.</p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Common Narrative Essay Topics We Cover</h3>
            <p className="text-sm text-gray-700 mb-2">Explore popular narrative essay ideas:</p>
            <ul className="list-disc pl-5 mb-3">
              <li className="mb-1 text-gray-600 text-sm">Personal growth stories, like first job experiences.</li>
              <li className="mb-1 text-gray-600 text-sm">Adventure tales, such as travel mishaps.</li>
              <li className="mb-1 text-gray-600 text-sm">Reflective pieces on family traditions.</li>
              <li className="mb-1 text-gray-600 text-sm">Overcoming obstacles, like sports failures turned successes.</li>
              <li className="mb-1 text-gray-600 text-sm">Literacy narratives about learning to read or write.</li>
              <li className="mb-1 text-gray-600 text-sm">Trending: AI in daily life, mental health journeys, social media impacts.</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">How Our Process Ensures Quality Narrative Essays</h3>
            <p className="text-sm text-gray-700 mb-3">Start with your prompt. Writers brainstorm outlines focusing on dialogue, setting, and conflict. Drafts include transitions for smooth reading.</p>
            <p className="text-sm text-gray-700 mb-3">Revision rounds refine language, cutting fluff for concise, powerful prose. Final edits check grammar and coherence. You get a narrative essay ready for submission, boosting grades in English or creative writing courses.</p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Why Originality Matters in Narrative Writing</h3>
            <p className="text-sm text-gray-700 mb-3">Universities use tools to detect copied work. Our narrative essay service guarantees 100% unique content. No recycled stories; each is custom-built from your input.</p>
            <p className="text-sm text-gray-700 mb-3">This builds trust and skill. Reading professional narratives teaches structure, inspiring your future writing. Search terms like best narrative essay writing service lead students to us for reliable help.</p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Tailored Support for International Students</h3>
            <p className="text-sm text-gray-700 mb-3">USA high schoolers need engaging personal narratives for SAT prep. UK GCSE students require descriptive pieces with metaphors. College applicants in Canada use reflective essays for portfolios.</p>
            <p className="text-sm text-gray-700 mb-3">Australian and New Zealand curricula emphasize indigenous stories or environmental themes. European programs focus on multicultural perspectives. We adapt to fit, ensuring cultural sensitivity.</p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Tips to Enhance Your Narrative Essay Skills</h3>
            <ul className="list-disc pl-5 mb-3">
              <li className="mb-1 text-gray-600 text-sm">Hook readers early with action or question.</li>
              <li className="mb-1 text-gray-600 text-sm">Use active voice for energy.</li>
              <li className="mb-1 text-gray-600 text-sm">Balance showing and telling; describe key moments.</li>
              <li className="mb-1 text-gray-600 text-sm">End strong with emotional impact.</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Real Results from Our Narrative Essay Help</h3>
            <p className="text-sm text-gray-700 mb-3">Students report higher grades and confidence. One USA college freshman got an A on a memoir-style narrative. A UK A-level student aced a descriptive travel essay.</p>
            <p className="text-sm text-gray-700 mb-3">Our keyword-optimized content ranks well for queries like narrative essay writing help and college narrative essay examples. This drives traffic and trust.</p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Get Started with Narrative Essay Writing Today</h3>
            <p className="text-sm text-gray-700 mb-1">Facing a deadline? Order now for expert narrative essay assistance. Provide details, and receive a story that captivates. Save time, score better, and focus on studies.</p>
          </div>
        </div>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
      </section>

      {/* FAQ Block */}
      <section className="w-full bg-[#F7FAFC] py-10">
        <div className="max-w-5xl mx-auto px-2 md:px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-start">
            {/* FAQ Column */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-6 text-gray-900">Frequently Asked Questions</h2>
              <div className="bg-white/80 rounded-3xl shadow-lg p-4 md:p-8">
                <div className="space-y-2">
                  {[
                    {
                      question: 'What is a narrative essay, and how does your service help with it?',
                      answer: 'A narrative essay tells a story with plot, characters, and setting to convey a message or lesson. Our narrative essay writing service crafts original stories based on your topic, ensuring engaging structure and vivid details for high school or college success in USA, UK, Canada, Australia, New Zealand, and Europe.'
                    },
                    {
                      question: 'How do you ensure my narrative essay is original and plagiarism-free?',
                      answer: 'We write every narrative essay from scratch using your input and research. Advanced plagiarism checks confirm 100% uniqueness before delivery. This protects against academic penalties and helps your personal narrative essay stand out as authentic work for any assignment.'
                    },
                    {
                      question: 'What topics do you cover for narrative essay writing?',
                      answer: 'Our experts handle diverse narrative essay topics like personal experiences, childhood memories, overcoming challenges, travel adventures, and life lessons. Tailored for 2025 trends including technology impacts and mental health stories, perfect for students seeking narrative essay examples or help online.'
                    },
                    {
                      question: 'How long does it take to get a custom narrative essay from your service?',
                      answer: 'Delivery times start at 24 hours for urgent narrative essay needs, with standard options up to two weeks. We meet deadlines while maintaining quality in structure, descriptions, and reflections, ensuring your college or high school narrative essay arrives ready for submission.'
                    },
                    {
                      question: 'Can you write narrative essays in specific styles like MLA or APA?',
                      answer: 'Yes, we format narrative essays in MLA, APA, Chicago, or other styles required by your institution. This includes proper citations for any referenced elements, making your reflective or creative narrative essay fully compliant with academic standards in the USA, UK, or Europe.'
                    },
                    {
                      question: 'What makes your narrative essay writers qualified for my assignment?',
                      answer: 'Our writers hold degrees in English, literature, or related fields with experience in narrative essay writing. They specialize in crafting compelling stories with strong hooks, development, and conclusions, ideal for students needing professional help with personal narrative topics or academic essays.'
                    },
                    {
                      question: 'Do you offer revisions for narrative essays if I need changes?',
                      answer: 'Unlimited revisions are included until you\'re satisfied. We refine plot, characters, or themes in your narrative essay based on feedback, ensuring it matches your vision and assignment guidelines for top grades in high school or university courses worldwide.'
                    }
                  ].map((faq, idx) => {
                    const isOpen = openFAQ === idx;
                    return (
                      <div
                        key={idx}
                        className={`transition-all duration-300 rounded-xl border border-gray-200 shadow-sm ${isOpen ? 'bg-gray-50' : 'bg-white'} overflow-hidden`}
                      >
                        <button
                          type="button"
                          className={`w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none transition-colors duration-300 ${isOpen ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                          style={{ background: isOpen ? '#f9fafb' : 'inherit' }}
                          onClick={() => setOpenFAQ(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-content-${idx}`}
                        >
                          <span className={`text-sm md:text-base font-medium transition-colors duration-300 ${isOpen ? 'text-emerald-600' : 'text-gray-900'}`}>{faq.question}</span>
                          <svg
                            className={`w-4 h-4 ml-2 text-emerald-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          id={`faq-content-${idx}`}
                          className={`px-4 pb-2 text-gray-600 text-sm transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100 py-1' : 'max-h-0 opacity-0 py-0 overflow-hidden'}`}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Support Widget Column */}
            <aside className="w-full md:w-80 flex-shrink-0 flex flex-col items-center md:items-start">
              <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 mt-0 md:mt-[38px] w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Have more questions?</h3>
                <img
                  src="/images/andrea head of support.avif"
                  alt="Andrea, Head of Support"
                  className="w-32 h-32 object-cover rounded-2xl shadow ring-2 ring-transparent hover:ring-emerald-200 focus:ring-emerald-300 transition-all duration-200 mb-4"
                  loading="lazy"
                  tabIndex={0}
                />
                <div className="font-medium text-gray-800 mb-1">Andrea, Head of Support</div>
                <Link
                  to="/contact"
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transform hover:scale-105 active:scale-95 hover:shadow-lg"
                  aria-label="Contact support"
                  tabIndex={0}
                >
                  Contact support
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Services Interlink Block - Tabbed Professional Version (Only Existing Services, Improved Link UI, No Duplicates) */}
      <section className="w-full py-12 rounded-2xl border-t border-gray-100 shadow-sm" style={{background: '#F7FAFC'}}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center md:items-start">
          {/* Left Side: Heading, Description, CTA */}
          <div className="flex-1 min-w-[320px] flex flex-col justify-center items-start mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight" style={{fontFamily: 'Inter, sans-serif'}}>Your #1 paper writing service</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">Our expert essay writers can tackle any academic task you entrust them with. Here are some of the services we offer.</p>
            <Link
              to="/writers"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
              style={{textAlign: 'center'}}
            >
              Find your writer <span className="ml-2">→</span>
            </Link>
          </div>
          {/* Right Side: Tabs and Service List */}
          <div className="flex-1 w-full">
            {(() => {
              // Only include services that have a corresponding file in src/pages/Services
              const allServices = [
                { name: 'Essay Writing', link: '/services/essay-writing' },
                { name: 'Book Review', link: '/services/book-review' },
                { name: 'Term Paper', link: '/services/term-paper' },
                { name: 'Research Paper Writing', link: '/services/research-paper-writing' },
                { name: 'Research Proposal', link: '/services/research-proposal' },
                { name: 'Thesis Writing', link: '/services/thesis-writing' },
                { name: 'Dissertation Writing', link: '/services/dissertation-writing' },
                { name: 'Scholarship Essay', link: '/services/scholarship-essay' },
                { name: 'Argumentative Essay', link: '/services/argumentative-essay' },
                { name: 'Admission Essay', link: '/services/admission-essay' },
                { name: 'Admission Essay Writing', link: '/services/admission-essay-writing' },
                { name: 'Case Study', link: '/services/case-study' },
                { name: 'Case Study Help', link: '/services/case-study-help' },
                { name: 'Lab Report', link: '/services/lab-report' },
                { name: 'Homework Help', link: '/services/homework-help' },
                { name: 'English Assignment Help', link: '/services/english-assignment-help' },
                { name: 'Programming Help', link: '/services/programming-help' },
                { name: 'MATLAB Programming Help', link: '/programming-help/matlab' },
                { name: 'Physics Assignment Help', link: '/services/physics-assignment-help' },
                { name: 'Assignment Help', link: '/services/assignment-help' },
                { name: 'Narrative Essay', link: '/services/narrative-essay' },
              ];
              // Remove duplicates for each tab
              const paperwork = [
                'Essay Writing', 'Book Review', 'Term Paper', 'Research Paper Writing', 'Research Proposal', 'Thesis Writing', 'Dissertation Writing', 'Scholarship Essay', 'Argumentative Essay', 'Admission Essay', 'Admission Essay Writing', 'Case Study', 'Case Study Help', 'Lab Report', 'Homework Help', 'English Assignment Help', 'Programming Help', 'MATLAB Programming Help', 'Physics Assignment Help', 'Assignment Help', 'Narrative Essay',
              ];
              const coursework = [
                'Essay Writing', 'Book Review', 'Term Paper', 'Research Paper Writing', 'Case Study', 'Lab Report', 'Homework Help', 'English Assignment Help', 'Programming Help', 'MATLAB Programming Help', 'Physics Assignment Help', 'Assignment Help',
              ];
              const other = [
                'Book Review', 'Thesis Writing', 'Dissertation Writing', 'Scholarship Essay', 'Argumentative Essay', 'Admission Essay', 'Admission Essay Writing', 'Case Study Help', 'MATLAB Programming Help',
              ];
              const tabData = [
                {
                  key: 'paperwork',
                  label: 'Paperwork',
                  services: paperwork.map(name => allServices.find(s => s.name === name)).filter(Boolean),
                },
                {
                  key: 'coursework',
                  label: 'Coursework / homework',
                  services: coursework.map(name => allServices.find(s => s.name === name)).filter(Boolean),
                },
                {
                  key: 'other',
                  label: 'Other assignments',
                  services: other.map(name => allServices.find(s => s.name === name)).filter(Boolean),
                },
              ];
              const [activeTab, setActiveTab] = React.useState('paperwork');
              const active = tabData.find(t => t.key === activeTab) || tabData[0];
              // Split services into 3 columns
              const filteredServices: { name: string; link: string }[] = (active.services.filter(Boolean) as { name: string; link: string }[]);
              const columns: { name: string; link: string }[][] = [[], [], []];
              filteredServices.forEach((s, i) => columns[i % 3].push(s));
              return (
                <div className="w-full">
                  {/* Tabs */}
                  <div className="flex gap-8 border-b border-gray-200 mb-6">
                    {tabData.map(tab => {
                      const isActive = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          className={`relative pb-2 text-lg font-semibold transition-colors duration-200 tracking-tight focus:outline-none ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-700'}`}
                          style={{background: 'none', outline: 'none'}}
                          onClick={() => setActiveTab(tab.key)}
                        >
                          <span className={isActive ? 'text-primary-600' : ''}>{tab.label}</span>
                          {isActive && (
                            <span className="absolute left-0 right-0 -bottom-1 mx-auto h-[3px] w-8 rounded-full bg-primary-600" style={{content: '""'}}></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {/* Service List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {columns.map((col, idx) => (
                      <ul key={idx} className="space-y-2">
                        {col.map(service => (
                          <li key={service.name} className="text-[15px] text-gray-800 flex items-center gap-2" >
                            <span className="inline-block w-2 h-2 rounded-full bg-primary-200"></span>
                            <Link
                              to={service.link}
                              className="transition-colors duration-150 font-normal text-gray-800 hover:text-primary-700 hover:font-medium focus:text-primary-600 focus:font-medium active:text-primary-600 active:font-medium"
                              style={{textDecoration: 'none'}}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>
      {/* Final CTA Block - Join Our Happy Clients (Larger, Balanced, Modern) */}
      <section className="pt-10 pb-0 bg-[#F7FAFC] w-full px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto py-14">
          <img
            src="/images/logo.png"
            alt="Essay Embassy Logo"
            className="w-36 h-36 object-contain mb-4 md:mb-0 md:mr-10 shadow-lg rounded-2xl bg-white/80"
            loading="lazy"
            style={{ boxShadow: '0 8px 32px 0 rgba(16, 185, 129, 0.10)' }}
          />
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">Join our 5,000+ happy clients</h2>
            <ul className="text-gray-700 text-base md:text-lg mb-6 list-disc list-inside">
              <li className="flex items-center gap-3 mb-2"><span className="flex w-5 h-5 rounded-full bg-emerald-100 items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>20,000+ papers delivered with a 98% success rate</li>
              <li className="flex items-center gap-3 mb-2"><span className="flex w-5 h-5 rounded-full bg-emerald-100 items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Get original papers written according to your instructions</li>
              <li className="flex items-center gap-3"><span className="flex w-5 h-5 rounded-full bg-emerald-100 items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Save time for what matters most</li>
            </ul>
            <Link
              to="/order-now"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
            >
              Place an order
            </Link>
          </div>
        </div>
      </section>
    </div>

        </>

      );

    } 