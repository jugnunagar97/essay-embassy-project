import { GoogleAuthProvider, signInWithPopup, linkWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Sparkles, Pen, Target, MessageCircle, BookOpen, AlignLeft, Search, Scale, TrendingUp, Lightbulb, Microscope, Award, Trophy, Edit3, FileCheck, RefreshCw, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
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
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide leading-snug" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}>
                  What Makes Our Reflective Essay Writing Stand Out
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed mt-2 mb-10 max-w-md" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}>
                We go beyond simple descriptions to deliver deep analysis of experiences. Our writers help you explore feelings, evaluate outcomes, and plan future actions using established reflective frameworks.
              </p>

            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={handlePrev} aria-label="Previous" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary-100 transition-colors shadow focus:outline-none" disabled={currentIndex === 0}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button onClick={handleNext} aria-label="Next" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary-100 transition-colors shadow focus:outline-none" disabled={currentIndex === carouselItems.length - 1}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      id: 'EE-81247',
      rating: 5,
      text: "They mapped my clinical rotation to Gibbs' cycle and tightened my analysis—my instructor finally said this is reflective, not descriptive.",
      date: '05/09/2025',
      level: 'University',
    },
    {
      id: 'EE-82011',
      rating: 5,
      text: "I had notes everywhere. They structured with Kolb and added course citations. Clear, concise, and aligned to the rubric.",
      date: '06/01/2025',
      level: 'Masters',
    },
    {
      id: 'EE-81566',
      rating: 4,
      text: "The action plan section was exactly what my rubric wanted. Turned a pass into a distinction.",
      date: '04/22/2025',
      level: 'College',
    },
    {
      id: 'EE-81803',
      rating: 5,
      text: "Great balance of description and analysis. They linked back to theory in each section without overloading citations.",
      date: '03/28/2025',
      level: 'University',
    },
    {
      id: 'EE-82355',
      rating: 4,
      text: "They used Rolfe's model just like my lecturer wanted and added a realistic improvement plan. Smooth read.",
      date: '02/15/2025',
      level: 'College',
    },
    {
      id: 'EE-82677',
      rating: 5,
      text: "Editors caught inconsistencies and fixed referencing. Final piece felt cohesive and professional.",
      date: '06/10/2025',
      level: 'Masters',
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
        transform: `scale(0.85) translateX(${offset * 60}px) translateY(20px)`,
        opacity: 0.5,
        zIndex: 1,
        boxShadow: '0 4px 16px 0 rgba(16,30,54,0.10)',
      };
    } else {
      return {
        transform: `scale(0.7) translateX(${offset * 120}px) translateY(40px)`,
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
        <div className="relative flex items-center justify-center" style={{ minHeight: 340 }}>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#F7FAFC] transition focus:outline-none"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {/* Carousel Track */}
          <div className="flex items-center justify-center w-full overflow-hidden" style={{ minHeight: 320, minWidth: 0 }}>
            {testimonials.map((t, idx) => {
              const offset = idx - currentIndex;
              return (

                <>

                  <Helmet>

                    <title>Reflective Essay Writing Service | Expert Help</title>

                    <meta

                      name="description"

                      content="Professional reflective essay writing service. Get thoughtful, well-written reflective essays with personal insights and analysis."

                    />

                    <link rel="canonical" href="https://essayembassy.com/services/reflective-essay" />

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
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} width="22" height="22" fill={star <= t.rating ? '#FACC15' : '#E5E7EB'} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
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
                </>
              );
            })}
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#F7FAFC] transition focus:outline-none"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
        <div className="flex items-center justify-center gap-2" style={{ marginTop: '2.5rem', marginBottom: '0' }}>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="#34D399" />
              <path d="M6.5 10.2l2.1 2.1L13.5 8.2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
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

export default function ReflectiveEssayPage() {
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

  // FAQ accordion open item index; null means all collapsed
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
              Reflective Essay Writing for Personal Growth and Learning
            </h1>
            <p className="text-lg text-gray-600">
              Get expert help with reflective essays that showcase your experiences, critical thinking, and personal development. Our professional writers craft thoughtful, analytical essays for nursing, education, social work, and academic courses worldwide.
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
                  style={{ minWidth: '0' }}
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Professional Reflective Essay Writers</h2>
          <div className="text-lg md:text-xl text-gray-700 mb-1 leading-snug">
            Work with experienced writers trained in reflective writing models like Gibbs Cycle and DIEP. They understand how to balance personal narrative with academic analysis for your course requirements.
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mt-4 w-full">
            <div className="text-base text-gray-600 mb-2 md:mb-0 md:mr-6 whitespace-nowrap">
              Cooperate with those who graduated<br className="hidden md:block" />
              from the best universities and colleges
            </div>
            <div className="hidden md:block h-8 border-l border-emerald-400 mx-4"></div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 w-full md:w-auto">
              <img src="/images/univ-logos.svg" alt="Top Universities" className="h-10 md:h-12 my-2" style={{ maxWidth: '100%', height: 'auto' }} />
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
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-14 tracking-wide text-gray-900 drop-shadow-md" style={{ letterSpacing: '0.03em' }}>
            Reflection done right
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Star icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Reflective Model Expertise</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Writers use Gibbs, Kolb, DIEP, or other frameworks required by your course.</div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Report icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M9 9h6M9 13h6M9 17h6" />
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Personal Yet Academic</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Balance first-person narrative with critical analysis and theoretical connections.</div>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Refund icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M17 1l4 4-4 4" />
                  <path d="M21 5H7a4 4 0 0 0 0 8h1" />
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Original Reflections</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Every essay is custom-written based on your specific experiences and learning outcomes.</div>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Lock icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <rect x="6" y="11" width="12" height="8" rx="2" />
                  <path d="M12 11V7a4 4 0 1 1 8 0v4" />
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Theory Integration</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Link your reflections to course concepts, professional standards, or academic literature.</div>
            </div>
            {/* Card 5 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Clock icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Confidential Service</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Your personal experiences and reflective content remain completely private.</div>
            </div>
            {/* Card 6 */}
            <div className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 ring-2 ring-primary/20 shadow-sm">
                {/* Dollar icon */}
                <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M12 1v22" />
                  <path d="M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7" />
                </svg>
              </span>
              <div className="font-semibold text-lg text-gray-900 mb-2">Unlimited Revisions</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal">Free edits until your reflective essay captures your authentic voice and meets requirements.</div>
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
            Prices start at <span className="font-bold text-gray-900 relative inline-block"><span className="z-10 relative">$13.99/page</span><span className="absolute left-0 right-0 bottom-0 h-2 bg-yellow-300 rounded -z-10" style={{ height: '0.5em', bottom: '0.1em' }}></span></span> and depend on the page count, deadline, and expert's level
          </div>
          <div className="flex justify-center mb-4">
            <Link to="/refund-policy" className="flex items-center gap-2 text-primary-600 text-base font-medium hover:underline">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01" /><path d="M12 7v4" /><circle cx="12" cy="12" r="10" /></svg>
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
                    <svg key={i} width="20" height="20" fill="#FACC15" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  ))}
                </span>
              </div>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Average<br className='hidden md:block' />user rating</span>
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2 drop-shadow-sm text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            Reflective Essay Examples for Learning
          </h2>
          <div className="border-b border-gray-200/70 w-16 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-500/90 font-light text-center max-w-2xl mx-auto mb-10" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
            View professional reflective essay samples showing proper structure, critical analysis, and connections between experience and theory for various academic disciplines.
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#EF4444" /><text x="6" y="15" fontSize="9" fill="white" fontWeight="bold">PDF</text></svg>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">Order Reflective Essay in Three Steps</h2>
            <div className="flex flex-col items-center relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center mb-3 animate-fade-in-up">
                <span className="text-2xl mb-1">✍️</span>
                <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">1. Share Your Details</div>
                <div className="text-gray-400 text-sm mb-2">Share your reflective essay prompt, experience details, and reflective model requirements.</div>
                <a href="/order-now" className="inline-block px-5 py-2 rounded-full bg-primary-600 text-white text-sm font-medium shadow hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 mb-1">Get started</a>
              </div>
              {/* Arrow */}
              <div className="flex flex-col items-center mb-3">
                <svg width="18" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 0v18m0 0l-5-5m5 5l5-5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center mb-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <span className="text-2xl mb-1">💳</span>
                <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">2. Pay Securely</div>
                <div className="text-gray-400 text-sm">Pay securely to begin your custom reflective essay.</div>
              </div>
              {/* Arrow */}
              <div className="flex flex-col items-center mb-3">
                <svg width="18" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 0v18m0 0l-5-5m5 5l5-5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <span className="text-2xl mb-1">📄</span>
                <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">3. Download Your Essay</div>
                <div className="text-gray-400 text-sm">Download your completed essay with analysis, evaluation, and action planning.</div>
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
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900 text-left">Why You Need Our Reflective Essay Writing Help</h2>
          </div>
          <p className="text-base text-gray-700 text-left mb-4">
            Reflective essays differ from standard academic writing because they require personal voice, critical analysis of experiences, and demonstration of learning.
          </p>
          <p className="text-sm text-gray-600 mb-3 text-left">
            Students in nursing, education, social work, teaching, psychology, and healthcare programs in the USA, UK, Canada, Australia, New Zealand, and Europe frequently encounter reflective assignments.
          </p>
          <div className="custom-scrollbar max-h-60 overflow-y-auto pr-1 mb-3 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Understanding Reflective Essay Requirements for Students</h3>
            <p className="text-sm text-gray-700 mb-3">
              These essays assess your ability to think critically about practical experiences, connect theory to practice, and show professional development. Many students struggle with balancing personal narrative and academic rigor, which is where professional reflective essay writing help becomes valuable.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Essential Structure of Reflective Essays</h3>
            <p className="text-sm text-gray-700 mb-3">
              Reflective essays follow a clear three-part structure: introduction, body paragraphs, and conclusion. The introduction sets context by describing the experience briefly and presenting a thesis statement about what you learned.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Body paragraphs move through description, feelings, evaluation, analysis, and action planning. This is where you explain what happened, how you felt, what went well or poorly, why events unfolded as they did, and what you will do differently in future situations.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              The conclusion summarizes key insights and emphasizes how the experience shaped your thinking, skills, or professional approach. No new information should appear in conclusions, only synthesis of previous reflections.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Popular Reflective Models Used Globally</h3>
            <p className="text-sm text-gray-700 mb-3">
              The Gibbs Reflective Cycle is the most common framework, with six stages: description, feelings, evaluation, analysis, conclusion, and action plan. This model guides students through systematic reflection on clinical placements, teaching practice, or fieldwork experiences.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              The DIEP model uses four steps: Describe, Interpret, Evaluate, and Plan. This simpler framework works well for shorter reflective assignments or quick reflections on readings and lectures.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Kolb's Experiential Learning Cycle focuses on learning through doing. It moves from concrete experience to reflective observation, abstract conceptualization, and active experimentation. This model suits students analyzing skill development over time.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Our reflective essay writing service adapts to any model your instructor requires, ensuring proper structure and depth of analysis.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Critical Analysis Beyond Description</h3>
            <p className="text-sm text-gray-700 mb-3">
              Strong reflective writing goes beyond describing what happened. Academic reflection requires asking why events occurred, how your feelings changed, what assumptions you held, and how theory explains your experience.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              For nursing students, this might mean reflecting on patient interactions and linking them to therapeutic communication theories. Education students analyze classroom management situations using pedagogical frameworks. Social work students evaluate interventions against ethical guidelines and professional standards.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              We help you move from surface-level description to meaningful analysis by asking probing questions about your experiences and connecting them to course concepts.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Common Reflective Essay Topics Across Disciplines</h3>
            <p className="text-sm text-gray-700 mb-3">
              Nursing and healthcare students reflect on clinical placements, patient care situations, ethical dilemmas, teamwork experiences, and skill development. Education students write about lesson delivery, classroom management, student interactions, and teaching philosophy growth.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Social work students reflect on fieldwork placements, client relationships, professional boundaries, and application of theory to practice. Psychology students analyze case studies, counseling sessions, or research experiences.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Business students reflect on internships, group projects, leadership experiences, or professional development activities. Our writers have expertise across these disciplines and understand specific reflective requirements for each field.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Why Students Need Professional Reflective Writing Help</h3>
            <p className="text-sm text-gray-700 mb-3">
              Time constraints affect reflective writing quality. Placements and practicums leave little time for deep reflection and essay writing. Students often complete reflective journals late at night after exhausting clinical or teaching shifts.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Difficulty articulating learning is common. Many students know they learned something valuable but struggle to express insights clearly or connect experiences to theory. Professional writers help translate your thoughts into coherent academic prose.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Uncertainty about tone challenges many students. Reflective essays require first-person voice and personal feelings while maintaining academic professionalism. Finding this balance takes practice and guidance.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Quality Standards for Academic Reflection</h3>
            <p className="text-sm text-gray-700 mb-3">
              Universities expect reflective essays to demonstrate critical thinking, not just storytelling. Markers look for evidence that you questioned assumptions, considered alternative perspectives, and planned future improvements.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Proper citation matters even in reflective writing. When discussing theories, models, or research that informed your reflection, you must cite sources in APA, Harvard, or required formats. We ensure accurate referencing throughout your essay.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Originality is crucial. While reflecting on real experiences, your analysis must be genuine and avoid cliches or generic statements. Our writers create authentic reflections that sound like your voice while meeting academic standards.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Benefits for International Students</h3>
            <p className="text-sm text-gray-700 mb-3">
              Regional variations exist in reflective writing expectations. UK universities emphasize critical evaluation and theory integration more heavily than some other countries. Australian institutions focus on professional standards and competency frameworks.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              USA programs often want specific evidence of learning outcomes achievement. Canadian universities emphasize cultural competence and ethical reflection. European standards vary by country but generally require deep theoretical engagement.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Learning from Professional Examples</h3>
            <p className="text-sm text-gray-700 mb-3">
              Reading well-written reflective essays improves your own reflective writing skills. Our service provides models showing how to structure thoughts, integrate theory, and express learning effectively.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Students report improved confidence in future reflective assignments after receiving professionally written examples. Understanding how experts approach reflection helps you develop this critical professional skill independently.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Confidentiality for Sensitive Content</h3>
            <p className="text-sm text-gray-700 mb-3">
              Reflective essays often include sensitive information about patients, clients, students, or personal struggles. Our strict confidentiality policies protect your privacy and ensure your reflections remain secure.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              We never share your experiences, essays, or personal information with anyone. All communication is encrypted and your order details are kept private throughout the process.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Fast Delivery for Placement Deadlines</h3>
            <p className="text-sm text-gray-700 mb-3">
              Placements and practicums have strict submission deadlines. We offer rush services with 24-hour turnaround for urgent reflective essay needs. Standard delivery ranges from 3 to 14 days depending on length and complexity.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              All essays undergo quality checks regardless of timeline, ensuring you receive thorough reflection and analysis that meets academic standards on time.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Revision Support Throughout</h3>
            <p className="text-sm text-gray-700 mb-3">
              Reflective writing often requires multiple drafts as you refine your thoughts. We include unlimited revisions so you can request changes until the essay accurately captures your experiences and learning.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Direct communication with writers allows you to provide feedback and ensure your authentic voice shines through the final version.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Get Started with Reflective Essay Help Today</h3>
            <p className="text-sm text-gray-700 mb-1">
              Order professional reflective essay writing now. Share your experiences, learning outcomes, and course requirements. Receive thoughtful, analytical essays that demonstrate growth and meet all academic expectations for your program.
            </p>
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
                      question: 'What is a reflective essay, and how does your service help students write them?',
                      answer: 'A reflective essay analyzes personal experiences using critical thinking to demonstrate learning and growth. Our service creates custom essays following reflective models like Gibbs Cycle, DIEP, or Kolb\'s framework. Writers describe your experiences, evaluate outcomes, analyze causes, and plan future actions while connecting reflections to course theories. This approach meets academic standards for nursing, education, social work, and healthcare programs in USA, UK, Canada, Australia, New Zealand, and Europe.'
                    },
                    {
                      question: 'How do you balance personal voice with academic requirements in reflective essays?',
                      answer: 'We use first-person narrative to describe experiences and feelings while maintaining professional tone throughout. Writers integrate course concepts, cite theoretical frameworks, and provide critical analysis that goes beyond simple description. This creates authentic reflections that sound personal yet meet university standards for academic rigor, proper structure, and evidence of learning outcomes achievement.'
                    },
                    {
                      question: 'Can you write reflective essays for specific disciplines like nursing or teaching?',
                      answer: 'Yes. Our writers have expertise across healthcare, education, social work, psychology, and business disciplines. We understand field-specific requirements such as nursing competencies, teaching standards, social work ethics, and professional frameworks. Each reflective essay addresses discipline-appropriate concepts, uses relevant terminology, and connects experiences to the theories and practices valued in your program.'
                    },
                    {
                      question: 'What reflective models do you use for essays, and can you follow specific frameworks?',
                      answer: 'We work with all major reflective models including Gibbs Reflective Cycle, DIEP framework, Kolb\'s Experiential Learning Cycle, Schon\'s Reflective Practice, and Johns\' Model. If your course requires a specific framework, we structure your essay accordingly with proper stages, headings, and depth of analysis for each component. Custom models or university-specific templates are also accommodated.'
                    },
                    {
                      question: 'How do you ensure reflective essays remain confidential and protect sensitive information?',
                      answer: 'All reflective content is protected by strict confidentiality policies and encrypted systems. We never share your experiences, personal information, or essays with external parties. Writers are trained in handling sensitive material from clinical placements, teaching practice, or social work fieldwork. Your privacy and the privacy of patients, clients, or students mentioned in reflections are always protected.'
                    },
                    {
                      question: 'Can you help with reflective journals, portfolios, or single reflection pieces?',
                      answer: 'Yes. We assist with all reflective writing formats including one-time reflections, weekly journals, placement portfolios, and critical incident analyses. Whether you need a single 1,000-word reflection or ongoing journal support throughout a semester-long placement, we adapt our service to match your exact requirements and submission schedule.'
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

      <div className="container mx-auto px-4 mt-20 mb-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ESSAY WRITING SERVICES WE OFFER
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
            Find the Perfect Essay Service
          </h2>
        </div>
      </div>
      <EssayServicesGrid />
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
              <li className="flex items-center gap-3 mb-2"><span className="flex w-5 h-5 rounded-full bg-emerald-100 items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7" /><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>20,000+ papers delivered with a 98% success rate</li>
              <li className="flex items-center gap-3 mb-2"><span className="flex w-5 h-5 rounded-full bg-emerald-100 items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7" /><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Get original papers written according to your instructions</li>
              <li className="flex items-center gap-3"><span className="flex w-5 h-5 rounded-full bg-emerald-100 items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7" /><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Save time for what matters most</li>
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
  );

}

// ─── Essay Services Grid ──────────────────────────────────────────────────────
const EssayServicesGrid = () => {
  const services = [
    {
      emoji: '📝',
      icon: Pen,
      title: 'Personal Statement Writing',
      description: 'A polished personal statement built entirely from scratch that tells your story compellingly. Perfect for graduate programs, medical schools, law schools, and undergraduate applications worldwide.',
      features: ['Compelling story arc', 'Program-specific tailoring', 'Authentic voice preserved', 'Free Turnitin & AI detection reports'],
      cta: 'Write My Personal Statement',
      slug: '/essay-writing/personal-statement',
      popular: true,
    },
    {
      emoji: '🎯',
      icon: Target,
      title: 'Argumentative Essay Writing',
      description: 'Build powerful arguments with evidence-based reasoning. Perfect for debate-focused assignments requiring strong logical structure.',
      features: ['Strong thesis development', 'Evidence-based claims', 'Counterargument handling', 'Logical progression'],
      cta: 'Order Argumentative Essay',
      slug: '/essay-writing/argumentative',
      popular: false,
    },
    {
      emoji: '💬',
      icon: MessageCircle,
      title: 'Persuasive Essay Writing',
      description: 'Craft persuasive essays that move readers to action. Ideal for any assignment requiring compelling rhetoric and powerful appeals.',
      features: ['Ethos, pathos, logos balance', 'Audience-targeted tone', 'Strong call to action', 'Polished argumentation'],
      cta: 'Write My Persuasive Essay',
      slug: '/essay-writing/persuasive',
      popular: false,
    },
    {
      emoji: '📖',
      icon: BookOpen,
      title: 'Narrative Essay Writing',
      description: 'Engaging personal stories with vivid descriptions. Ideal for creative assignments that connect real experiences with deeper themes.',
      features: ['Compelling storytelling', 'Vivid imagery', 'Clear story arc', 'Thematic depth'],
      cta: 'Write My Narrative Essay',
      slug: '/essay-writing/narrative',
      popular: false,
    },
    {
      emoji: '✨',
      icon: Sparkles,
      title: 'Descriptive Essay Writing',
      description: 'Rich sensory details that immerse readers. Perfect for assignments requiring detailed observations and vivid imagery.',
      features: ['Sensory language mastery', 'Vivid descriptions', 'Literary devices', 'Engaging prose'],
      cta: 'Get Descriptive Help',
      slug: '/essay-writing/descriptive',
      popular: false,
    },
    {
      emoji: '📋',
      icon: AlignLeft,
      title: 'Expository Essay Writing',
      description: 'Clear, informative essays that explain topics with precision. Perfect for assignments requiring balanced facts and structured explanation.',
      features: ['Fact-based explanations', 'Logical organization', 'Clear topic sentences', 'Neutral, academic tone'],
      cta: 'Order Expository Essay',
      slug: '/essay-writing/expository',
      popular: false,
    },
    {
      emoji: '🔍',
      icon: Search,
      title: 'Analytical Essay Writing',
      description: 'Deep critical analysis that breaks down complex ideas, texts, or events into clear, structured arguments with academic rigor.',
      features: ['Critical idea breakdown', 'Strong analytical thesis', 'Evidence-based paragraphs', 'Correct academic format'],
      cta: 'Get Analytical Help',
      slug: '/essay-writing/analytical',
      popular: false,
    },
    {
      emoji: '⚖️',
      icon: Scale,
      title: 'Compare & Contrast Essay',
      description: 'Balanced comparison highlighting similarities and differences. Ideal for comparative analysis assignments across any subject.',
      features: ['Point-by-point & block method', 'Balanced analysis', 'Clear comparisons', 'Insightful synthesis'],
      cta: 'Order Comparison Essay',
      slug: '/essay-writing/compare-contrast',
      popular: false,
    },
    {
      emoji: '🔗',
      icon: TrendingUp,
      title: 'Cause & Effect Essay',
      description: 'Explore relationships between events and their outcomes. Perfect for analyzing consequences and meaningful academic connections.',
      features: ['Chain & block structure', 'Logical causal reasoning', 'Supporting evidence', 'Strong conclusions'],
      cta: 'Write Cause & Effect',
      slug: '/essay-writing/cause-effect',
      popular: false,
    },
    {
      emoji: '💡',
      icon: Lightbulb,
      title: 'Problem Solution Essay',
      description: 'Identify problems and propose practical, well-reasoned solutions. Great for assignments that require structured critical thinking.',
      features: ['Actionable thesis statements', 'Viable real-world solutions', 'Right transition words', 'Peer-reviewed sources'],
      cta: 'Get Solution Help',
      slug: '/essay-writing/problem-solution',
      popular: false,
    },
    {
      emoji: '🔬',
      icon: Microscope,
      title: 'Critical Analysis Essay',
      description: 'In-depth evaluation of texts, theories, or works. Perfect for literature, film, philosophy, and any course requiring analytical depth.',
      features: ['Evaluative framework', 'Textual evidence', 'Author intent analysis', 'Scholarly citations'],
      cta: 'Order Critical Analysis',
      slug: '/essay-writing/critical-analysis',
      popular: false,
    },
    {
      emoji: '🎓',
      icon: Award,
      title: 'Admission Essay Writing',
      description: 'Expert admission essays built to match your authentic voice. Our writers understand admissions committee expectations and craft narratives that get you accepted.',
      features: ['Authentic personal narrative', 'Admissions committee insight', 'Leadership & extracurriculars highlighted', 'Free Turnitin & AI detection reports'],
      cta: 'Write My Admission Essay',
      slug: '/essay-writing/admission',
      popular: false,
    },
    {
      emoji: '🏆',
      icon: Trophy,
      title: 'Scholarship Essay Writing',
      description: 'Compelling scholarship essays that help you win funding. We highlight your achievements and demonstrate why you deserve support — all in your authentic voice.',
      features: ['Achievement-focused narrative', 'Winning scholarship format', 'Selection committee insight', 'Free Turnitin & AI detection reports'],
      cta: 'Win My Scholarship',
      slug: '/essay-writing/scholarship',
      popular: false,
    },
    {
      emoji: '✏️',
      icon: Edit3,
      title: 'Essay Editing',
      description: 'Polish your existing work to perfection. Professional editing for grammar, structure, flow, and citation accuracy.',
      features: ['Grammar correction', 'Style improvement', 'Structure refinement', 'Citation checking'],
      cta: 'Edit My Essay',
      slug: '/essay-writing/editing',
      popular: false,
    },
    {
      emoji: '🔎',
      icon: FileCheck,
      title: 'Essay Proofreading',
      description: 'Final review to catch every error before submission. Spelling, punctuation, formatting, and citation accuracy covered.',
      features: ['Spelling & punctuation', 'Citation checking', 'Formatting compliance', 'Final accuracy check'],
      cta: 'Proofread My Essay',
      slug: '/essay-writing/proofreading',
      popular: false,
    },
    {
      emoji: '🔄',
      icon: RefreshCw,
      title: 'Essay Rewriting',
      description: 'Transform existing essays into stronger, clearer versions. Improve clarity, flow, originality, and overall academic quality.',
      features: ['Content improvement', 'Better flow', 'Enhanced clarity', 'Originality boost'],
      cta: 'Rewrite My Essay',
      slug: '/essay-writing/rewriting',
      popular: false,
    },
    {
      emoji: '🤔',
      icon: Users,
      title: 'Reflective Essay Writing',
      description: 'Connect experiences to learning. We help you articulate personal growth with academic depth, linking self-reflection to broader concepts.',
      features: ['Meaningful self-reflection', 'Personal-academic integration', 'Growth demonstration', 'Scholarly connections'],
      cta: 'Write Reflective Essay',
      slug: '/essay-writing/reflective',
      popular: false,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-6 border-2 ${service.popular ? 'border-[#1652A0] shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
        >
          {service.popular && (
            <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> POPULAR
            </div>
          )}
          <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-all text-3xl">
            {service.emoji}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1652A0] transition-colors leading-snug">{service.title}</h3>
          <p className="text-gray-600 mb-6 leading-[1.7] text-[15px]">{service.description}</p>
          <ul className="space-y-2.5 mb-6">
            {service.features.map((f, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            to={service.slug}
            className="w-full px-4 py-3 bg-[#1652A0]/10 text-[#1652A0] hover:bg-[#1652A0] hover:text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            {service.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div >
      ))
      }
    </div >
  );
};