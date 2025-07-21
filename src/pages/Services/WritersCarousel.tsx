import { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';

// Writer mock data
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

const CARD_WIDTH = 280; // px
const VISIBLE_CARDS = 3;

export default function WritersCarousel() {
  const [index, setIndex] = useState(writers.length);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right' | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create an infinite loop by duplicating the writers array
  const infiniteWriters = [
    ...writers,
    ...writers,
    ...writers,
  ];

  // Handle arrow click
  const scroll = (dir: 'left' | 'right') => {
    setIndex((prev) => {
      if (dir === 'left') return prev - 1;
      return prev + 1;
    });
    setIsAutoScrolling(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Handle auto-scroll on hover
  useEffect(() => {
    if (isAutoScrolling && scrollDirection) {
      intervalRef.current = setInterval(() => scroll(scrollDirection), 120);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoScrolling, scrollDirection]);

  // Reset index to middle if at edge (for infinite effect)
  useEffect(() => {
    if (index < writers.length) setIndex(writers.length + (index % writers.length));
    if (index >= writers.length * 2) setIndex(writers.length + (index % writers.length));
  }, [index]);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-center">
      {/* Left Arrow */}
      <button
        className="absolute left-0 z-10 bg-white rounded-full shadow p-2 top-1/2 -translate-y-1/2 hover:bg-gray-100"
        onClick={() => scroll('left')}
        onMouseEnter={() => { setIsAutoScrolling(true); setScrollDirection('left'); }}
        onMouseLeave={() => setIsAutoScrolling(false)}
        aria-label="Scroll left"
        style={{ left: '-32px' }}
      >
        <FaChevronLeft size={22} />
      </button>
      {/* Carousel */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${index * CARD_WIDTH - CARD_WIDTH * Math.floor(VISIBLE_CARDS / 2)}px)`
          }}
        >
          {infiniteWriters.map((writer, idx) => (
            <div
              key={idx}
              className="min-w-[260px] max-w-[260px] bg-white rounded-xl shadow p-6 flex flex-col items-center mx-2"
              style={{ width: CARD_WIDTH }}
            >
              <div className="relative mb-3">
                <img src={writer.imageUrl} alt={writer.name} className="w-16 h-16 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
                  <FaCheckCircle className="text-green-500" size={18} title="Verified Expert" />
                </span>
              </div>
              <div className="font-semibold text-gray-900 text-lg mb-1">{writer.name}</div>
              <div className="text-sm text-gray-500 mb-2">{writer.degree}</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {writer.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 text-xs rounded px-2 py-0.5">{tag}</span>
                ))}
              </div>
              <div className="flex flex-col gap-1 w-full mt-2">
                {writer.stats.map((stat, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-600">
                    <span>{stat.label}</span>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Arrow */}
      <button
        className="absolute right-0 z-10 bg-white rounded-full shadow p-2 top-1/2 -translate-y-1/2 hover:bg-gray-100"
        onClick={() => scroll('right')}
        onMouseEnter={() => { setIsAutoScrolling(true); setScrollDirection('right'); }}
        onMouseLeave={() => setIsAutoScrolling(false)}
        aria-label="Scroll right"
        style={{ right: '-32px' }}
      >
        <FaChevronRight size={22} />
      </button>
    </div>
  );
} 