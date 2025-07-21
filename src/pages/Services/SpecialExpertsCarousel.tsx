import React, { useRef, useState } from 'react';

const carouselItems = [
  {
    imgSrc: '/images/verification.png',
    title: 'Verification',
    description: 'We care about your projects and pick the best specialists to help with assignments of yours. Before claiming that the person is an expert, we verify the identity of each candidate via social media.'
  },
  {
    imgSrc: '/images/skill test.png',
    title: 'Skill Test',
    description: 'We test each candidate by examining their skills and knowledge with various examinations in different academic fields. We make sure the education level and work experience that the expert describes on their profile match their real expertise and that they really are capable of providing you with high-quality online assignment help.'
  },
  {
    imgSrc: '/images/quality analysis.png',
    title: 'Quality Analysis',
    description: 'We developed an AI-based system that analyses the quality of each expert’s performance and ensures only the best continue to help our clients.'
  },
  {
    imgSrc: '/images/education level.png',
    title: 'Education Level',
    description: 'We require proof of education and degrees for all experts, ensuring you work with highly qualified professionals.'
  },
  {
    imgSrc: '/images/broad expertise.png',
    title: 'Broad Expertise',
    description: 'Our experts cover a wide range of subjects and fields, so you can always find the right specialist for your project.'
  },
  {
    imgSrc: '/images/communication skills.png',
    title: 'Communication Skills',
    description: 'We value clear and effective communication. Our experts are selected for their ability to explain concepts and keep you updated.'
  },
];

export default function SpecialExpertsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null as null | number);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardWidth = 380; // px, must match w-[380px] below
  const gap = 32; // px, must match gap-8 below

  // Show the current slide (translateX)
  const getTranslateX = () => {
    return -currentIndex * (cardWidth + gap) + dragOffset;
  };

  // Navigation
  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };
  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(carouselItems.length - 1, prev + 1));
  };

  // Mouse/touch drag handlers
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragOffset(0);
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };
  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartX);
  };
  const onDragEnd = () => {
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    }
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset < 0 && currentIndex < carouselItems.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (dragOffset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
    setDragStartX(null);
    setDragOffset(0);
  };

  return (
    <section className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {/* Left Column */}
        <div className="flex flex-col justify-between md:col-span-1">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Makes Assignment Help From Our Experts So Special?</h2>
            <p className="text-lg text-gray-500 mb-8">Essay Embassy gives you a chance to cooperate with top experts within different fields of study. Work on your projects being guided by a professional and be sure everything will be done by the deadline.</p>
          </div>
          <div className="flex gap-4 mt-8">
            <button
              aria-label="Previous"
              onClick={goToPrev}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary-100 transition-colors shadow-md"
              disabled={currentIndex === 0}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              aria-label="Next"
              onClick={goToNext}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 hover:bg-primary-700 transition-colors shadow-md text-white"
              disabled={currentIndex === carouselItems.length - 1}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        {/* Carousel Column */}
        <div className="md:col-span-2 overflow-x-hidden relative">
          <div
            ref={trackRef}
            className="flex gap-8 transition-transform duration-500"
            style={{
              transform: `translateX(${getTranslateX()}px)`
            }}
            onMouseDown={onDragStart}
            onMouseMove={dragStartX !== null ? onDragMove : undefined}
            onMouseUp={onDragEnd}
            onMouseLeave={dragStartX !== null ? onDragEnd : undefined}
            onTouchStart={onDragStart}
            onTouchMove={dragStartX !== null ? onDragMove : undefined}
            onTouchEnd={onDragEnd}
            role="list"
          >
            {carouselItems.map((item, idx) => (
              <div
                key={item.title}
                className="flex-shrink-0 w-full md:w-[380px] bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
                style={{
                  opacity: Math.abs(idx - currentIndex) > 1 ? 0.5 : 1,
                  pointerEvents: Math.abs(idx - currentIndex) > 1 ? 'none' : 'auto',
                }}
                role="listitem"
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-full aspect-video object-cover rounded-xl mb-4"
                  draggable={false}
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-base text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 