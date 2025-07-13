import React, { useState } from 'react';
import PremiumReviewCard from './PremiumReviewCard';

const platforms = [
  {
    key: 'essayshark',
    label: 'EssayShark.com',
    icon: (
      <span className="inline-block w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="4" fill="#3B82F6"/><path d="M6 6h8v8H6z" fill="#fff"/></svg>
      </span>
    ),
  },
  {
    key: 'sitejabber',
    label: 'SiteJabber',
    icon: (
      <span className="inline-block w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 2l2.39 6.94H19l-5.19 3.77L15.61 19 10 14.77 4.39 19l1.8-6.29L1 8.94h6.61z" fill="#A78BFA"/></svg>
      </span>
    ),
  },
  {
    key: 'reviewsio',
    label: 'Reviews.io',
    icon: (
      <span className="inline-block w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#000"/><path d="M10 5v10M5 10h10" stroke="#fff" strokeWidth="2"/></svg>
      </span>
    ),
  },
];

const reviewsData = {
  essayshark: [
    { rating: 5, reviewer: 'ELLY', text: 'Amazing!!!! I really liked the paper I ordered. The best essay ever!', date: '1 day ago' },
    { rating: 4, reviewer: 'NEMESIS', text: 'This service is suitable if you look for someone to write your paper quickly.', date: '4 days ago' },
    { rating: 5, reviewer: 'VILHELM', text: 'I was and still am amazed at the quality of writing, incredible paper!', date: '2 days ago' },
    { rating: 5, reviewer: 'JASON', text: 'Fast delivery and great communication. Will use again!', date: '3 days ago' },
    { rating: 4, reviewer: 'MAYA', text: 'Good, but could be more detailed.', date: '5 days ago' },
  ],
  sitejabber: [
    { rating: 5, reviewer: 'SOPHIA', text: 'Outstanding work! My professor was impressed.', date: '1 day ago' },
    { rating: 5, reviewer: 'LIAM', text: 'Very professional and always on time.', date: '2 days ago' },
    { rating: 4, reviewer: 'OLIVER', text: 'Good service, but a bit pricey.', date: '3 days ago' },
    { rating: 5, reviewer: 'EMMA', text: 'Perfectly formatted and well-researched.', date: '4 days ago' },
    { rating: 4, reviewer: 'AVA', text: 'Nice experience overall.', date: '5 days ago' },
  ],
  reviewsio: [
    { rating: 5, reviewer: 'NOAH', text: 'Superb! Will recommend to friends.', date: '1 day ago' },
    { rating: 4, reviewer: 'LUCAS', text: 'Good, but had to ask for a revision.', date: '2 days ago' },
    { rating: 5, reviewer: 'MIA', text: 'Excellent communication and quality.', date: '3 days ago' },
    { rating: 5, reviewer: 'CHARLOTTE', text: 'Couldn’t be happier with the result.', date: '4 days ago' },
    { rating: 4, reviewer: 'AMELIA', text: 'Solid work, delivered on time.', date: '5 days ago' },
  ],
};

export default function PremiumReviewsSection() {
  const [activePlatform, setActivePlatform] = useState('sitejabber');
  const [startIdx, setStartIdx] = useState(0);
  const reviews = reviewsData[activePlatform];
  const visibleReviews = reviews.slice(startIdx, startIdx + 3);

  const handlePrev = () => {
    setStartIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };
  const handleNext = () => {
    setStartIdx((prev) => (prev + 1) % reviews.length);
  };

  // Ensure always 3 reviews visible, wrap around
  const getVisibleReviews = () => {
    if (visibleReviews.length === 3) return visibleReviews;
    if (visibleReviews.length === 2) return [...visibleReviews, reviews[0]];
    if (visibleReviews.length === 1) return [visibleReviews[0], reviews[1], reviews[2]];
    return reviews.slice(0, 3);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Essay writing service customer reviews</h2>
        <p className="text-gray-500 text-lg">Our term paper writing service meets customers’ needs. Clients’ reviews about our custom essay writing prove that.</p>
      </div>
      <div className="flex justify-center mb-8 gap-4">
        {platforms.map((platform) => (
          <button
            key={platform.key}
            className={`flex items-center px-6 py-2 rounded-full text-lg font-medium transition border-2 ${activePlatform === platform.key ? 'bg-blue-50 border-blue-400 text-blue-700 shadow' : 'bg-gray-100 border-transparent text-gray-500'}`}
            onClick={() => { setActivePlatform(platform.key); setStartIdx(0); }}
          >
            {platform.icon}
            {platform.label}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-200 text-gray-400"
          onClick={handlePrev}
          aria-label="Previous reviews"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M17 21l-6-7 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="flex gap-6 w-full max-w-4xl">
          {getVisibleReviews().map((review, idx) => (
            <PremiumReviewCard key={idx} {...review} />
          ))}
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-200 text-gray-400"
          onClick={handleNext}
          aria-label="Next reviews"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M11 7l6 7-6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </section>
  );
} 