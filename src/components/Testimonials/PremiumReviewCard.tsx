import React from 'react';

interface PremiumReviewCardProps {
  rating: number;
  reviewer: string;
  text: string;
  date: string;
}

export default function PremiumReviewCard({ rating, reviewer, text, date }: PremiumReviewCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[180px] relative">
      <div className="absolute top-4 right-6 text-gray-400 text-sm">{date}</div>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 text-xl mr-1">★</span>
        <span className="font-bold text-lg">{rating}/5</span>
      </div>
      <div className="text-blue-700 font-semibold uppercase text-sm mb-1">{reviewer}:</div>
      <div className="text-gray-700 text-base mb-2">{text}</div>
    </div>
  );
} 