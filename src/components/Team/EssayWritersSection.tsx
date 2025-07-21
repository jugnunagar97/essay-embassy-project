import React, { useRef, useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

// Mock data for writers
const writers = [
  {
    name: 'Megan P.',
    degree: "Master's degree",
    rating: 5.0,
    imageUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=400&q=80',
    tags: ['Art', 'American History'],
    stats: [
      { label: 'Finish on time', value: '96%' },
      { label: 'Last 50 reviews', value: '5.0' },
      { label: 'Success', value: '99%' },
      { label: 'Repeat hire rate', value: '54%' },
    ],
  },
  {
    name: 'Kenji T.',
    degree: "Master's degree",
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=400&q=80',
    tags: ['Healthcare', 'Business and Finance'],
    stats: [
      { label: 'Finish on time', value: '95%' },
      { label: 'Last 50 reviews', value: '4.8' },
      { label: 'Success', value: '97%' },
      { label: 'Repeat hire rate', value: '49%' },
    ],
  },
  {
    name: 'Emily K.',
    degree: "Master's degree",
    rating: 5.0,
    imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=400&q=80',
    tags: ['Healthcare', 'Sociology'],
    stats: [
      { label: 'Finish on time', value: '96%' },
      { label: 'Last 50 reviews', value: '5.0' },
      { label: 'Success', value: '98%' },
      { label: 'Repeat hire rate', value: '52%' },
    ],
  },
  {
    name: 'Michael H.',
    degree: "Master's degree",
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&w=400&q=80',
    tags: ['Healthcare', 'Business and management'],
    stats: [
      { label: 'Finish on time', value: '97%' },
      { label: 'Last 50 reviews', value: '4.9' },
      { label: 'Success', value: '99%' },
      { label: 'Repeat hire rate', value: '51%' },
    ],
  },
  {
    name: 'Prisca E.',
    degree: "Master's degree",
    rating: 4.7,
    imageUrl: 'https://images.pexels.com/photos/1181696/pexels-photo-1181696.jpeg?auto=compress&w=400&q=80',
    tags: ['American history'],
    stats: [
      { label: 'Finish on time', value: '94%' },
      { label: 'Last 50 reviews', value: '4.7' },
      { label: 'Success', value: '96%' },
      { label: 'Repeat hire rate', value: '47%' },
    ],
  },
];

// WriterCard sub-component
function WriterCard({ writer }: { writer: typeof writers[0] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col min-w-[340px] max-w-[380px] flex-shrink-0 mr-5 last:mr-0">
      <div className="relative h-48 w-full">
        <img
          src={writer.imageUrl}
          alt={writer.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute left-0 bottom-0 p-4 w-full">
          <div className="flex items-center justify-between">
            <span className="text-white font-theme-primary font-semibold text-lg drop-shadow">
              {writer.name}
            </span>
            <span className="flex items-center text-theme-primary font-bold text-base drop-shadow">
              <FaStar className="text-theme-primary mr-1" />
              {writer.rating.toFixed(1)}
            </span>
          </div>
          <div className="text-white font-theme-primary text-xs opacity-90">
            {writer.degree}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 px-4 pt-3 pb-1">
        {writer.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 text-xs rounded-lg px-2 py-0.5 font-theme-primary"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-y-1 px-4 py-3 text-xs text-gray-700 font-theme-primary">
        {writer.stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="font-semibold text-gray-900">{stat.value}</span>
            <span className="text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Section Component
const EssayWritersSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse drag-to-scroll logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    function onMouseDown(e: MouseEvent) {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add('cursor-grabbing');
    }
    function onMouseLeave() { isDown = false; el.classList.remove('cursor-grabbing'); }
    function onMouseUp() { isDown = false; el.classList.remove('cursor-grabbing'); }
    function onMouseMove(e: MouseEvent) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    }
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Progress bar logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    }
    el.addEventListener('scroll', onScroll);
    return () => { el.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section className="w-full py-6 md:py-10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-theme-primary font-bold text-theme-primary mb-2">
            Our team of <span className="text-theme-primary">essay writers</span>
          </h2>
          <p className="text-gray-500 font-theme-primary text-base">
            No AI usage, only human essay writers. Our team is standing by to assist you.
          </p>
        </div>
      </div>
      {/* Scrollable Cards */}
      <div className="w-full overflow-x-auto hide-scrollbar scroll-smooth" ref={scrollRef} style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex gap-8 py-4 min-w-full">
          {writers.map((writer, idx) => (
            <WriterCard writer={writer} key={idx} />
          ))}
        </div>
      </div>
      {/* Progress Bar */}
      <div className="container mx-auto w-full mt-4 mb-6 px-6">
        <div className="h-1 bg-gray-200 rounded-full relative">
          <div
            className="h-1 bg-theme-primary rounded-full absolute top-0 left-0 transition-all duration-200"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
      {/* View All Writers Button */}
      <div className="flex justify-center">
        <button
          className="px-8 py-2 bg-white border border-gray-200 rounded-full text-gray-600 font-theme-primary text-base font-medium shadow-sm hover:bg-gray-50 transition"
        >
          View all writers
        </button>
      </div>
      {/* Hide scrollbar utility */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default EssayWritersSection; 