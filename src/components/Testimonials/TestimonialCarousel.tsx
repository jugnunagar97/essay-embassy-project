import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../../types';
import TestimonialCard from './TestimonialCard';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  platform: 'google' | 'trustpilot' | 'sitejabber';
}

export default function TestimonialCarousel({ testimonials, platform }: TestimonialCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 340; // Card width + gap
    const newScrollLeft = scrollContainerRef.current.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [testimonials]);

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No reviews available for this platform.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      )}

      {/* Testimonials Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            platform={platform}
          />
        ))}
      </div>
    </div>
  );
}