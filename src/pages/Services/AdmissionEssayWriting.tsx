import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WritersCarousel from './WritersCarousel';
import { useState } from 'react';

// --- SpecialAssignmentHelpCarousel: React-based interactive carousel ---
import React, { useRef, useState } from 'react';

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

function SpecialAssignmentHelpCarousel() {
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
    <section className="w-full bg-white py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {/* Left Column: Static Content & Navigation */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            {/* Lighter, more elegant heading and description */}
            <div className="mb-4 flex items-center">
              <span className="inline-block w-1 h-7 bg-primary-400 rounded-full mr-3"></span>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide leading-snug" style={{fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em'}}>
                What Makes Assignment Help From Our Experts So Special?
              </h2>
            </div>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mt-2 mb-10 max-w-md" style={{fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em'}}>
              Essay Embassy gives you a chance to cooperate with <span className="text-primary-500 font-medium">top experts</span> in different fields. Get your projects guided by a professional and be sure everything will be done on time.
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
                  className="flex-shrink-0 w-full md:w-[380px] bg-white rounded-2xl shadow-xl p-6"
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
    </section>
  );
}

// --- SampleWorksCarousel: Horizontally scrolling sample cards carousel ---
function SampleWorksCarousel() {
  const samples = [
    {
      title: 'Essay on The White Tiger by The White Tiger',
      type: 'Essay',
      pages: 3,
    },
    {
      title: 'Compare and Contrast Essay on Hinduism and Christianity',
      type: 'Essay',
      pages: 3,
    },
    {
      title: 'Biochemistry and Genetics Essay Assignment',
      type: 'Essay',
      pages: 7,
    },
    {
      title: 'The Impact of Social Media on Youth',
      type: 'Essay',
      pages: 5,
    },
    {
      title: 'Analysis of Shakespearean Tragedies',
      type: 'Essay',
      pages: 4,
    },
    {
      title: 'Climate Change: Causes and Effects',
      type: 'Essay',
      pages: 6,
    },
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [dragDelta, setDragDelta] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const cardWidthRef = React.useRef<number>(0);

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
  const visibleCards = 3; // Show 3 cards at a time
  const maxIndex = samples.length - visibleCards;
  const goTo = (idx: number) => {
    if (idx < 0) idx = 0;
    if (idx > maxIndex) idx = maxIndex;
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
    } else if (dx < -50 && currentIndex < maxIndex) {
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
  const cardWidth = cardWidthRef.current || 384; // fallback w-96
  const offset = -currentIndex * (cardWidth + gap) + (isDragging ? dragDelta : 0);

  return (
    <section className="w-full py-24">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Check Out Our Sample Works</h2>
      <div className="max-w-7xl mx-auto px-4">
        {/* Carousel Viewport */}
        <div className="overflow-x-hidden">
          {/* Carousel Track */}
          <div
            ref={trackRef}
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              transform: `translateX(${offset}px)`,
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(.4,0,.2,1)',
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {samples.map((sample) => (
              <div
                key={sample.title}
                className="flex-shrink-0 w-96 bg-slate-50 p-7 rounded-2xl shadow-sm flex flex-col justify-between border border-slate-100 transition hover:shadow-lg hover:border-primary-200"
                style={{ minHeight: 280, maxWidth: '100%' }}
              >
                <h3 className="font-bold text-lg text-gray-900 text-center mb-3 leading-snug">{sample.title}</h3>
                <div className="flex items-center justify-center gap-3 mt-0 mb-4">
                  <span className="flex items-center gap-1 bg-white rounded-full px-3 py-1 text-sm text-primary-600 font-medium shadow-sm border border-primary-100">
                    {/* Document icon */}
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" stroke="#10B981" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/></svg>
                    {sample.type}
                  </span>
                  <span className="flex items-center gap-1 bg-white rounded-full px-3 py-1 text-sm text-primary-600 font-medium shadow-sm border border-primary-100">
                    {/* Page icon */}
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="16" rx="2" stroke="#10B981" strokeWidth="2"/><path d="M9 8h6M9 12h6M9 16h2" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/></svg>
                    {sample.pages} pages
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button className="rounded-lg border-2 border-primary-500 bg-white text-primary-600 font-semibold py-2.5 transition hover:bg-primary-50 hover:shadow-md hover:text-primary-600 text-base">
                    View Sample
                  </button>
                  <button className="rounded-lg bg-primary-500 text-white font-semibold py-2.5 transition hover:brightness-110 hover:shadow-md text-base">
                    Order Similar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-8 mt-8">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="text-2xl text-gray-400 hover:text-gray-600 transition disabled:opacity-40">
            &#8592;
          </button>
          <button onClick={handleNext} disabled={currentIndex === maxIndex} className="text-2xl text-gray-400 hover:text-gray-600 transition disabled:opacity-40">
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}

// --- ClientTestimonialsCarousel: 3D-style testimonial carousel ---
function ClientTestimonialsCarousel() {
  const testimonials = [
    {
      id: 'EE-24467',
      rating: 4,
      text: "Didn't really trust writing services at first, but this changed my mind. Super clean, well-written essay. glad I gave them a shot.",
      date: '04/14/2025',
      level: 'Masters',
    },
    {
      id: 'EE-23901',
      rating: 5,
      text: 'Was in a total panic with my deadline. They not only delivered fast but the essay was actually solid. Big lifesaver!',
      date: '03/16/2025',
      level: 'Bachelors',
    },
    {
      id: 'EE-57281',
      rating: 4,
      text: 'Needed this essay fast and they came through big time. Everything from the structure to the points was on point. Really solid work.',
      date: '06/16/2025',
      level: 'Bachelors',
    },
    {
      id: 'EE-19822',
      rating: 5,
      text: 'I was skeptical but the writer was super communicative and the result was great. Will use again.',
      date: '02/10/2025',
      level: 'PhD',
    },
    {
      id: 'EE-33412',
      rating: 5,
      text: 'Essay Embassy made my life so much easier. The quality was top-notch and the support team was very helpful.',
      date: '01/22/2025',
      level: 'Masters',
    },
    {
      id: 'EE-11234',
      rating: 4,
      text: 'Good service, quick turnaround, and the essay passed all checks. Would recommend.',
      date: '05/05/2025',
      level: 'College',
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
    <section className="w-full py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Client Testimonials: Hear What Our Clients Have To Say</h2>
        <p className="text-center text-lg text-gray-500 mb-14">Read what some of our satisfied customers have to say about us:</p>
        {/* Carousel Viewport */}
        <div className="relative flex items-center justify-center" style={{minHeight: 340}}>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-primary-50 transition focus:outline-none"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {/* Carousel Track */}
          <div className="flex items-center justify-center w-full overflow-hidden" style={{minHeight: 320, minWidth: 0}}>
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`bg-white rounded-2xl p-8 mx-2 transition-all duration-500 ease-in-out flex flex-col w-full max-w-xl absolute left-1/2 top-0" ${idx === currentIndex ? 'is-active' : ''}`}
                style={{
                  ...getCardStyle(idx),
                  width: '90%',
                  maxWidth: 480,
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  transform: `${getCardStyle(idx).transform} translateX(-50%)`,
                  transition: 'all 0.5s cubic-bezier(.4,0,.2,1)',
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
            ))}
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-primary-50 transition focus:outline-none"
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
      </div>
    </section>
  );
}

const academicLevels = ["High School", "College", "University", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];

// Use real expert images and names from public/images


export default function AdmissionEssayWriting() {
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

  // FAQ state and data moved here
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const faqData = [
    {
      question: 'Is your essay writing service confidential and safe?',
      answer: 'Absolutely. We use end-to-end encryption and never share your personal information or order details with third parties. Your privacy and security are our top priorities.'
    },
    {
      question: 'Will my essay be written by a real expert?',
      answer: 'Yes! Every essay is written by a verified subject-matter expert who has passed our rigorous selection and verification process. No AI-generated content, ever.'
    },
    {
      question: 'How fast can I get my essay delivered?',
      answer: 'We offer deadlines starting from 3 hours. Choose your preferred deadline in the order form, and we’ll match you with a writer who can deliver on time.'
    },
    {
      question: 'What if I am not satisfied with the paper?',
      answer: 'We offer unlimited free revisions and a comprehensive refund policy. Your satisfaction is guaranteed, or you get your money back.'
    },
    {
      question: 'How do I place an order?',
      answer: 'Simply fill out the order form at the top of this page, select your requirements, and follow the prompts. Our team will take care of the rest!'
    },
  ];

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

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    { id: '24467', rating: 4, text: "Didn’t really trust writing services at first, but this changed my mind. Super clean, well-written essay. glad I gave them a shot.", date: "04/14/2025", level: "Masters" },
    { id: '24468', rating: 5, text: "Absolutely amazing! The writer was incredibly professional and delivered a top-notch essay within the deadline. Highly recommend!", date: "04/15/2025", level: "PhD" },
    { id: '24469', rating: 3, text: "Good service, but the essay could have been better. The writer was responsive and made some revisions, but overall, I was a bit disappointed.", date: "04/16/2025", level: "College" },
    { id: '24470', rating: 5, text: "Outstanding! The writer understood my requirements perfectly and delivered a fantastic essay. Very happy with the result.", date: "04/17/2025", level: "High School" },
    { id: '24471', rating: 4, text: "Very professional and reliable. The essay was delivered on time and met all my expectations. Will definitely use this service again.", date: "04/18/2025", level: "University" },
  ];

  return (
    <div className="background-icons min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7FAFC' }}>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-6 md:py-10 relative">
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
              Write My College Essay
            </h1>
            <p className="text-lg text-gray-600">
              Looking for a reliable expert to write college essays? Hire our professional writer and be done with your college essays.
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
      {/* Writers Block Section */}
      <section className="container mx-auto px-6 py-6 md:py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Meet the Verified Experts Behind Your Essays
          </h2>
          <p className="text-gray-500 text-base">
            Every applicant undergoes a rigorous multi-stage verification process, confirming their credentials, subject matter expertise, and commitment to our strict plagiarism-free and AI-free standards.
          </p>
        </div>
        {/* University Logos Bar */}
        <div className="flex items-center justify-center max-w-4xl mx-auto mt-2 mb-8 px-4">
          <p className="text-sm text-gray-600 whitespace-nowrap mr-4">Cooperate with those who graduated<br />from the best universities and colleges</p>
          <div className="h-8 w-1 bg-primary-600 mx-4 rounded" />
          <div className="flex items-center gap-4">
            <img src="/images/univ-logos.svg" alt="University Logos" className="h-8 filter grayscale" />
            <img src="/images/univ-logos-1.svg" alt="University Logos 2" className="h-8 filter grayscale" />
          </div>
        </div>
      </section>
      {/* Writers Scrollable Area */}
      <div className="container mx-auto px-6 pb-10">
        <WritersCarousel />
        <div className="flex justify-center mt-8 relative">
          <span className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <span className="pulse-radar block w-[170px] h-[56px] rounded-full bg-primary-500/20"></span>
          </span>
          <a
            href="/writers"
            className="relative inline-block px-8 py-3 rounded-full bg-primary-600 text-white text-lg font-semibold shadow-md hover:bg-primary-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            aria-label="View our Writers"
            style={{ willChange: 'transform' }}
          >
            View our Writers
          </a>
        </div>
        <style>{`
          @keyframes pulseRadar {
            0% { opacity: 0.8; transform: scale(1); }
            70% { opacity: 0.18; transform: scale(1.7); }
            100% { opacity: 0; transform: scale(1.7); }
          }
          .pulse-radar {
            animation: pulseRadar 1.4s cubic-bezier(0.4,0,0.2,1) infinite;
          }
        `}</style>
      </div>
      {/* Next-Gen Features Grid Block */}
      <section className="w-full bg-[#F7FAFC] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-light tracking-wider text-center mb-20 animate-fade-in-up">
            We go beyond <span className="bg-gradient-to-r from-primary-500 via-blue-400 to-primary-600 bg-clip-text text-transparent animate-gradient-x font-semibold">essay writing services</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-3 py-4 transition-all duration-300 animate-fade-in-up hover:scale-105 hover:shadow-xl">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-3 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Star icon */}
                <svg width="40" height="40" fill="none" stroke="url(#star-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="star-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Human-written content only</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Whenever you ask us for essay help and hire a professional writer, your paper will contain zero AI content.</div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Report icon */}
                <svg width="40" height="40" fill="none" stroke="url(#report-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="report-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <path d="M9 9h6M9 13h6M9 17h6"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Originality report included</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">We're ready to prove that our papers are written from scratch with free reports for all "write my essay" requests.</div>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Refund icon */}
                <svg width="40" height="40" fill="none" stroke="url(#refund-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="refund-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <path d="M17 1l4 4-4 4"/>
                  <path d="M21 5H7a4 4 0 0 0 0 8h1"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Comprehensive refund policy</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Have peace of mind knowing your money is protected by our fair refund policy that covers a variety of scenarios.</div>
            </div>
            {/* Divider */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 my-2">
              <div className="border-t border-white/30 w-full"></div>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Lock icon */}
                <svg width="40" height="40" fill="none" stroke="url(#lock-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="lock-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <rect x="6" y="11" width="12" height="8" rx="2"/>
                  <path d="M12 11V7a4 4 0 1 1 8 0v4"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Robust data protections</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">EssayHub secures your data according to the strictest standards, from PCI DSS compliance for payment processing to end-to-end platform encryption.</div>
            </div>
            {/* Card 5 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Clock icon */}
                <svg width="40" height="40" fill="none" stroke="url(#clock-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="clock-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Prompt delivery without quality risks</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Our essay writers online leverage their experience to deliver well-researched and carefully put-together papers with deadlines starting from three hours.</div>
            </div>
            {/* Card 6 */}
            <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-4 py-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur border border-white/40 shadow mb-5 transition-all duration-300 hover:scale-110 hover:shadow-primary-200">
                {/* Dollar icon */}
                <svg width="40" height="40" fill="none" stroke="url(#dollar-gradient)" strokeWidth="2" viewBox="0 0 24 24">
                  <defs><linearGradient id="dollar-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
                  <path d="M12 1v22"/>
                  <path d="M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7"/>
                </svg>
              </span>
              <div className="font-normal text-base text-gray-700 mb-1 tracking-wide">Pocket-friendly rates</div>
              <div className="text-gray-500 text-base leading-relaxed font-normal max-w-xs mx-auto">Prices for our writing services start at $10.80/page. You get all the essentials and even enjoy some freebies.</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 animate-fade-in-up">
          <a
            href="/order-now"
            className="inline-block px-10 py-4 rounded-full bg-primary-600 text-white text-lg font-semibold shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          >
            Get Started
          </a>
        </div>
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease-in-out infinite;
          }
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </section>
      {/* Prices and Services Block */}
      <section className="w-full bg-white py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">Prices and services</h2>
          <div className="text-center text-lg text-gray-600 mb-4">
            Prices start at <span className="font-bold text-gray-900 relative inline-block"><span className="z-10 relative">$13.99/page</span><span className="absolute left-0 right-0 bottom-0 h-2 bg-yellow-300 rounded -z-10" style={{height:'0.5em', bottom:'0.1em'}}></span></span> and depend on the page count, deadline, and writer's level
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
      {/* How It Works Journey Block */}
      <section className="w-full bg-white py-24">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">Your Essay Embassy journey</h2>
            <div className="flex flex-col items-center relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center mb-3 animate-fade-in-up">
              <span className="text-2xl mb-1">✍️</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">1. Create your order <span className="text-primary-600">(it's free)</span></div>
              <div className="text-gray-400 text-sm mb-2">Fill out our order form to be matched with the best writers</div>
              <a href="/order-now" className="inline-block px-5 py-2 rounded-full bg-primary-600 text-white text-sm font-medium shadow hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 mb-1">Get started</a>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center mb-3">
              <svg width="18" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 0v18m0 0l-5-5m5 5l5-5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center mb-3 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="text-2xl mb-1">💳</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">3. Make a payment</div>
              <div className="text-gray-400 text-sm">The deposit will stay on your balance until the order is ready</div>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center mb-3">
              <svg width="18" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 0v18m0 0l-5-5m5 5l5-5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <span className="text-2xl mb-1">📄</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-0.5">4. Get your paper</div>
              <div className="text-gray-400 text-sm">Your money stays in your account until you approve the result</div>
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
      {/* Why Essay Embassy Stats Block (Compact, Themed) */}
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">Why Essay Embassy</h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch md:space-x-0 gap-4 md:gap-0">
            {/* Stat 1 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">12+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Years helping students<br className='hidden md:block'/>in their studies</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 2 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">5K+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Highly qualified<br className='hidden md:block'/>and trusted experts</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 3 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <span className="text-3xl md:text-4xl font-bold text-emerald-500">400K+</span>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Successfully<br className='hidden md:block'/>completed orders</span>
            </div>
            {/* Divider */}
            <div className="hidden md:flex items-center"><div className="h-12 border-l border-gray-200 mx-2"></div></div>
            {/* Stat 4 */}
            <div className="flex-1 flex flex-col items-center text-center px-2 md:px-4 max-w-xs mx-auto bg-white/80 rounded-xl shadow-md py-4">
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-emerald-500">4.8</span>
                <span className="flex items-center">
                  {[...Array(5)].map((_, i) => (
<<<<<<< HEAD:src/pages/Services/AddmissionEssayWriting.tsx
                    <svg key={i} width="28" height="28" fill="#FACC15" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
=======
                    <svg key={i} width="20" height="20" fill="#FACC15" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
>>>>>>> 8d1411805b70071023b5241fd5d0430f81091a94:src/pages/Services/AdmissionEssayWriting.tsx
                </span>
              </div>
              <span className="text-sm md:text-base font-medium text-gray-500 mt-1">Average<br className='hidden md:block'/>user rating</span>
            </div>
          </div>
        </div>
      </section>
<<<<<<< HEAD:src/pages/Services/AddmissionEssayWriting.tsx
      {/* What Makes Assignment Help From Our Experts So Special? - Interactive Carousel Section */}
      <SpecialAssignmentHelpCarousel />
      <SampleWorksCarousel />
      <ClientTestimonialsCarousel />
=======
      {/* Client Testimonials: 3D Carousel */}
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900">Client Testimonials: Hear What Our Clients Have To Say</h2>
          <p className="text-center text-lg text-gray-500 mb-12">Read what some of our satisfied customers have to say about us:</p>
          {/* Carousel Viewport */}
          <div className="relative flex justify-center items-center w-full" style={{ minHeight: '340px' }}>
            {/* Left Arrow */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-blue-50 transition"
              onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
              type="button"
            >
              <svg width="28" height="28" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Carousel Track */}
            <div className="overflow-hidden w-[700px] max-w-full mx-auto">
              <div
                className="flex items-center transition-transform duration-500 pl-[150px] pr-[150px]"
                style={{
                  width: `${testimonials.length * 400}px`,
                  transform: `translateX(calc(${350 - testimonialIndex * 400}px))`,
                }}
              >
                {testimonials.map((t, idx) => {
                  const isActive = idx === testimonialIndex;
                  return (
                    <div
                      key={t.id}
                      className={`testimonial-card relative flex-shrink-0 w-[400px] bg-white p-8 rounded-2xl shadow-2xl transition-all duration-500 mx-4${isActive ? ' is-active' : ''}`}
                      style={{
                        boxShadow: isActive ? '0 8px 40px 0 rgba(16, 24, 40, 0.18)' : '0 2px 12px 0 rgba(16, 24, 40, 0.08)',
                        pointerEvents: isActive ? 'auto' : 'none',
                      }}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-lg text-blue-700">Customer ID: EE-{t.id}</span>
                        <span className="flex items-center">
                          {[1,2,3,4,5].map((star) => (
                            <svg key={star} width="22" height="22" fill={star <= t.rating ? '#FACC15' : '#E5E7EB'} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                          ))}
                        </span>
                      </div>
                      <hr className="mb-4" />
                      <p className="text-gray-700 text-base mb-8">{t.text}</p>
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div><span className="font-bold">Date:</span> <span className="ml-1">{t.date}</span></div>
                        <div><span className="font-bold">Academic Level:</span> <span className="ml-1">{t.level}</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Right Arrow */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-blue-50 transition"
              onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              aria-label="Next testimonial"
              type="button"
            >
              <svg width="28" height="28" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 ${testimonialIndex === idx ? 'bg-blue-600 border-blue-600 scale-110' : 'bg-gray-200 border-gray-300'} transition-all`}
                style={{ outline: 'none' }}
                onClick={() => setTestimonialIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
        <style>{`
          .testimonial-card {
            z-index: 1;
            opacity: 0.5;
            transform: scale(0.85);
          }
          .testimonial-card.is-active {
            z-index: 10;
            opacity: 1;
            transform: scale(1);
          }
        `}</style>
      </section>
      {/* FAQ Block */}
      <section className="w-full bg-[#F7FAFC] py-16">
        <div className="max-w-5xl mx-auto px-2 md:px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-start">
            {/* FAQ Column */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-6 text-gray-900">Frequently Asked Questions</h2>
              <div className="bg-white/80 rounded-3xl shadow-lg p-4 md:p-8">
                <div className="space-y-2">
                  {faqData.map((faq, idx) => {
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
      {/* Services Interlink Block - Compact Accordion Version */}
      <section className="w-full bg-white py-12 mt-10">
        <div className="max-w-2xl mx-auto px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">Explore All Our Services</h2>
          {(() => {
            const categories = [
              {
                name: 'Essay Services',
                key: 'essay',
                services: [
                  { name: 'Essay Writing', link: '/services/essay-writing' },
                  { name: 'Argumentative Essay', link: '/services/argumentative-essay' },
                  { name: 'Narrative Essay', link: '/services/narrative-essay' },
                  { name: 'Admission Essay', link: '/services/admission-essay' },
                  { name: 'College Admission Essay', link: '/services/admission-essay-writing' },
                  { name: 'Scholarship Essay', link: '/services/scholarship-essay' },
                  { name: 'Book Review', link: '/services/book-review' },
                ],
              },
              {
                name: 'Assignment Services',
                key: 'assignment',
                services: [
                  { name: 'Assignment Help', link: '/services/assignment-help' },
                  { name: 'Assignment Help (Fixed)', link: '/services/assignment-help-fixed' },
                  { name: 'English Assignment Help', link: '/services/english-assignment-help' },
                  { name: 'Case Study', link: '/services/case-study' },
                  { name: 'Case Study Help', link: '/services/case-study-help' },
                  { name: 'Lab Report', link: '/services/lab-report' },
                  { name: 'Term Paper', link: '/services/term-paper' },
                  { name: 'Thesis Writing', link: '/services/thesis-writing' },
                  { name: 'Dissertation Writing', link: '/services/dissertation-writing' },
                  { name: 'Research Proposal', link: '/services/research-proposal' },
                  { name: 'Research Paper Writing', link: '/services/research-paper-writing' },
                ],
              },
              {
                name: 'STEM & Technical',
                key: 'stem',
                services: [
                  { name: 'Programming Help', link: '/services/programming-help' },
                  { name: 'Homework Help', link: '/services/homework-help' },
                  { name: 'Physics Assignment Help', link: '/services/physics-assignment-help' },
                ],
              },
            ];
            return (
              <div className="space-y-2">
                {categories.map(cat => (
                  <div key={cat.key} className="rounded-lg border border-gray-100 bg-gray-50 shadow-sm overflow-hidden">
                    <button
                      type="button"
                      className={`w-full flex justify-between items-center px-4 py-2 text-left font-medium text-base focus:outline-none transition-colors duration-200 ${openCategory === cat.key ? 'bg-yellow-400 text-gray-900' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                      style={openCategory === cat.key ? { background: '#FACC15', color: '#232323' } : { color: '#232323' }}
                      onClick={() => setOpenCategory(openCategory === cat.key ? null : cat.key)}
                      aria-expanded={openCategory === cat.key}
                      aria-controls={`services-cat-${cat.key}`}
                    >
                      <span>{cat.name}</span>
                      <svg className={`w-5 h-5 text-emerald-500 transform transition-transform duration-300 ${openCategory === cat.key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      id={`services-cat-${cat.key}`}
                      className={`transition-all duration-300 ease-in-out bg-white ${openCategory === cat.key ? 'max-h-60 opacity-100 py-1' : 'max-h-0 opacity-0 py-0 overflow-hidden'}`}
                    >
                      <ul className="space-y-0.5 px-4">
                        {cat.services.map(service => (
                          <li key={service.link}>
                            <Link
                              to={service.link}
                              className="block py-2 px-2 rounded-md text-gray-800 hover:bg-gray-100 hover:text-emerald-700 active:bg-emerald-50 active:text-emerald-600 transition-all text-sm font-normal"
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
          <div className="flex justify-center mt-8">
            <Link to="/order-now" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-md transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transform hover:scale-105 active:scale-95">
              Place an order
            </Link>
          </div>
        </div>
      </section>
      {/* Why You Need Our Argumentative Essay Writing Help - Scrollable Block (Polished, Compact) */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl border border-gray-200 shadow-md relative overflow-hidden p-6 md:p-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-10 md:h-12 bg-yellow-400 rounded-full mr-4" />
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900 text-left">Why You Need Our Argumentative Essay Writing Help</h2>
          </div>
          <p className="text-base text-gray-700 text-left mb-4">
            Crafting a powerful argumentative essay requires more than just an opinion—it demands in-depth research, flawless structure, and a persuasive, logical flow. For many students, balancing these elements with a busy schedule is a significant challenge. That's where our expert writing help makes the difference.
          </p>
          <p className="text-sm text-gray-600 mb-3 text-left">
            We understand the hurdles you face, which is why students consistently turn to Essay Embassy for support. Common challenges include:
          </p>
          <div className="custom-scrollbar max-h-60 overflow-y-auto pr-1 mb-3 bg-gray-50 rounded-lg border border-gray-100">
            <ul className="list-disc pl-5 mb-3">
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Time Constraints:</span> Juggling exams, jobs, and multiple assignments leaves little time for deep work.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Thesis & Structure:</span> Developing a strong, clear thesis and maintaining a coherent argument can be difficult.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Source Vetting:</span> Finding and citing credible, authoritative evidence is a skill that takes time to develop.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Formatting Hurdles:</span> Inexperience with specific citation styles like APA, MLA, or Chicago can lead to lost marks.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Performance Pressure:</span> The high stakes of academic performance can be incredibly stressful without the right support.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Originality Concerns:</span> The fear of accidentally submitting low-quality or plagiarized content is real.</li>
            </ul>
            <p className="text-sm text-gray-700 mb-3">
              These obstacles can impact your grades and confidence. Our service exists to provide a reliable solution, ensuring you submit work that is not only on time but also clear, well-argued, and 100% original.
            </p>
            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Argumentative Essay Types We Handle</h3>
            <ul className="list-disc pl-5 mb-3">
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Classical/Aristotelian:</span> Building a straightforward, evidence-based case for a strong thesis.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Rogerian:</span> Finding common ground and fostering understanding between opposing views.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Toulmin:</span> A deep analytical approach that dissects arguments, warrants, and backing.</li>
              <li className="mb-1 text-gray-600 text-sm"><span className="font-semibold">Analytical & Persuasive:</span> Evaluating complex issues or persuading readers through evidence-based reasoning and critical thinking.</li>
            </ul>
            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">The Essay Embassy Guarantee: What Sets Us Apart</h3>
            <ul className="list-none pl-0 mb-3">
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Verified Academic Professionals, Not AI:</span> Your essay will be crafted by a real human expert with an advanced degree in a relevant field. We rigorously verify every writer's credentials and expertise.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Guaranteed 100% Original, AI-Free Content:</span> We build every essay from the ground up. You'll receive a comprehensive plagiarism report with your order to prove its authenticity.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Transparent and Fair Pricing:</span> No hidden fees, ever. Our pricing is clearly laid out based on your academic level, page count, and deadline, so you know the exact cost upfront.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Real Reviews and Quality Samples:</span> We believe in transparency. We encourage you to read authentic client testimonials and review our sample work to see the high standard of quality we deliver.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Free Revisions & Money-Back Guarantee:</span> Your satisfaction is our priority. We offer unlimited free revisions to ensure the final paper meets your requirements. If we miss a confirmed deadline, you are covered by our money-back guarantee.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Ironclad Security & Confidentiality:</span> We use end-to-end encryption to protect your personal and payment information. Your privacy is absolute, and your data will never be shared.</span></li>
              <li className="mb-1 flex items-start text-gray-700 text-sm"><span className="mr-2 text-emerald-500">✅</span> <span><span className="font-semibold">Punctuality is Non-Negotiable:</span> We respect your deadlines. Our writers have a proven track record of on-time delivery, and you can track your order’s progress every step of the way.</span></li>
            </ul>
            <h3 className="text-base font-semibold text-gray-900 mb-1 mt-4">Get Your Expertly-Written Argumentative Essay Today</h3>
            <p className="text-sm text-gray-700 mb-1">
              Stop wondering, "Who can write my argumentative essay with quality and integrity?" The answer is right here.
            </p>
            <p className="text-sm text-gray-700 mb-1">
              At Essay Embassy, we deliver high-quality, custom-written argumentative essays that are guaranteed to be 100% original and AI-free. Our affordable service is designed to help you succeed while protecting your privacy.
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Place your order now and let a true subject matter expert handle the hard work for you.
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
      {/* Final CTA Block - Join Our Happy Clients (Integrated, Subtle, Modern) */}
      <section className="pt-8 pb-0 bg-gray-100 w-full px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full max-w-5xl mx-auto py-6">
          <img
            src="/images/logo.png"
            alt="Essay Embassy Logo"
            className="w-28 h-28 object-contain mb-2 md:mb-0 md:mr-6 shadow-md rounded-xl bg-white/80"
            loading="lazy"
            style={{ boxShadow: '0 4px 16px 0 rgba(16, 185, 129, 0.08)' }}
          />
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">Join our 5,000+ happy clients</h2>
            <ul className="text-gray-700 text-sm mb-4 list-disc list-inside">
              <li className="flex items-center gap-2 mb-1"><span className="inline-block w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>20,000+ papers delivered with a 98% success rate</li>
              <li className="flex items-center gap-2 mb-1"><span className="inline-block w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Get original papers written according to your instructions</li>
              <li className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6ee7b7"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Save time for what matters most</li>
            </ul>
            <Link
              to="/order-now"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg shadow-sm transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
            >
              Place an order
            </Link>
          </div>
        </div>
      </section>
>>>>>>> 8d1411805b70071023b5241fd5d0430f81091a94:src/pages/Services/AdmissionEssayWriting.tsx
    </div>
  );
}
