import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types';
import TestimonialCarousel from './TestimonialCarousel';

interface TestimonialTabsProps {
  testimonials: Review[];
}

export default function TestimonialTabs({ testimonials }: TestimonialTabsProps) {
  const [activeTab, setActiveTab] = useState<'google' | 'trustpilot' | 'sitejabber'>('google');

  const platforms = [
    {
      id: 'google' as const,
      name: 'Google Reviews',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-bold">G</span>
          </div>
          <span>Google</span>
        </div>
      ),
      color: 'border-blue-500 text-blue-700 bg-blue-50 shadow-lg',
      inactiveColor: 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500 bg-white/60'
    },
    {
      id: 'trustpilot' as const,
      name: 'TrustPilot Reviews',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center shadow-md">
            <Star size={14} fill="white" className="text-white" />
          </div>
          <span>Trustpilot</span>
        </div>
      ),
      color: 'border-green-500 text-green-700 bg-green-50 shadow-lg',
      inactiveColor: 'border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-500 bg-white/60'
    },
    {
      id: 'sitejabber' as const,
      name: 'SiteJabber Reviews',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-orange-500 rounded-sm flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span>Sitejabber</span>
        </div>
      ),
      color: 'border-orange-500 text-orange-700 bg-orange-50 shadow-lg',
      inactiveColor: 'border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500 bg-white/60'
    }
  ];

  const getTestimonialsByPlatform = (platform: string) => {
    return testimonials.filter(testimonial => testimonial.platform === platform);
  };

  const getAverageRating = (platform: string) => {
    const platformTestimonials = getTestimonialsByPlatform(platform);
    if (platformTestimonials.length === 0) return 0;
    const total = platformTestimonials.reduce((sum, t) => sum + t.rating, 0);
    return (total / platformTestimonials.length).toFixed(1);
  };

  const getReviewCount = (platform: string) => {
    return getTestimonialsByPlatform(platform).length;
  };

  return (
    <>
      {/* Trust Badge */}
      <div className="flex justify-center mb-4 animate-fade-in">
        <span className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200 px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          <Star className="text-yellow-400" size={16} />
          100% Verified Reviews
        </span>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 py-4 px-2">
        {platforms.map((platform) => {
          const isActive = activeTab === platform.id;
          const reviewCount = getReviewCount(platform.id);
          const avgRating = getAverageRating(platform.id);

          return (
            <button
              key={platform.id}
              onClick={() => setActiveTab(platform.id)}
              className={`
                px-7 py-4 rounded-xl border-2 font-bold text-base transition-all duration-200
                ${isActive ? platform.color + ' scale-105 ring-2 ring-primary-200 dark:ring-primary-900/40 shadow-2xl' : platform.inactiveColor + ' hover:scale-105'}
                flex flex-col items-center min-w-[120px] focus:outline-none focus:ring-2 focus:ring-primary-400
              `}
              style={{ boxShadow: isActive ? '0 4px 24px 0 rgba(0,0,0,0.08)' : undefined }}
            >
              <div className="flex flex-col items-center space-y-2">
                {platform.logo}
                <div className="text-center">
                  <div className="flex items-center space-x-1 text-sm">
                    <Star size={14} className="text-yellow-400 fill-current animate-pulse" />
                    <span className="font-semibold">{avgRating}</span>
                    <span className="text-gray-500">({reviewCount})</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {/* Tab Content */}
      <div className="w-full max-w-5xl mx-auto animate-fade-in">
        <TestimonialCarousel
          testimonials={getTestimonialsByPlatform(activeTab)}
          platform={activeTab}
        />
      </div>
    </>
  );
}