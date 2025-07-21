import { useRef } from 'react';

const experts = [
  {
    avatarUrl: '/images/Sutton E..jpg',
    name: 'Sutton E.',
    reviews: 274,
    rating: 4.4,
    isOnline: true,
    specialties: ['Essay', 'Term paper', 'Dissertation', 'Coursework', 'Article'],
    completedOrders: 307
  },
  {
    avatarUrl: '/images/Tamsin R..png',
    name: 'Tamsin R.',
    reviews: 198,
    rating: 4.7,
    isOnline: false,
    specialties: ['Essay', 'Research Paper', 'Book Review'],
    completedOrders: 221
  },
  {
    avatarUrl: '/images/Theron F..jpg',
    name: 'Theron F.',
    reviews: 312,
    rating: 4.9,
    isOnline: true,
    specialties: ['Dissertation', 'Coursework', 'Article'],
    completedOrders: 410
  },
  {
    avatarUrl: '/images/Whittaker R..jpg',
    name: 'Whittaker R.',
    reviews: 156,
    rating: 4.5,
    isOnline: false,
    specialties: ['Essay', 'Term paper', 'Article'],
    completedOrders: 180
  },
  {
    avatarUrl: '/images/Orson C..jpg',
    name: 'Orson C.',
    reviews: 205,
    rating: 4.6,
    isOnline: true,
    specialties: ['Essay', 'Dissertation', 'Book Review'],
    completedOrders: 250
  },
  {
    avatarUrl: '/images/Philippa N..jpg',
    name: 'Philippa N.',
    reviews: 143,
    rating: 4.3,
    isOnline: true,
    specialties: ['Essay', 'Term paper', 'Coursework'],
    completedOrders: 170
  },
];

export default function ExpertsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320; // width of one card + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full">
      {/* Carousel */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {experts.map((expert, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl p-6 min-w-[300px] max-w-[300px] shadow-sm"
            >
              {/* Card Header */}
              <div className="flex items-center mb-4">
                {/* Avatar with status ring */}
                <span className={`relative flex items-center justify-center w-14 h-14 rounded-full ${expert.isOnline ? 'ring-2 ring-green-400' : 'ring-2 ring-gray-300'}`}>
                  <img src={expert.avatarUrl} alt={expert.name} className="w-12 h-12 rounded-full object-cover" />
                  {expert.isOnline && <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />}
                </span>
                {/* Name & Reviews */}
                <div className="ml-4 flex-1">
                  <div className="font-bold text-gray-900 text-lg">{expert.name}</div>
                  <div className="text-xs text-gray-500">{expert.reviews} reviews</div>
                </div>
                {/* Rating */}
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                  <span className="text-gray-700 font-semibold">{expert.rating}</span>
                </div>
              </div>
              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mt-2">
                {expert.specialties.map((spec, i) => (
                  <span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{spec}</span>
                ))}
              </div>
              {/* Card Footer */}
              <div className="mt-8 text-center">
                <div className="text-2xl font-bold text-gray-900">{expert.completedOrders}</div>
                <div className="text-xs text-gray-500">completed orders</div>
              </div>
            </div>
          ))}
        </div>
        {/* Carousel Controls */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
            aria-label="Scroll left"
            type="button"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
            aria-label="Scroll right"
            type="button"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
} 