import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';
import TestimonialCarousel from './TestimonialCarousel';

interface TestimonialTabsProps {
  testimonials: Testimonial[];
}

export default function TestimonialTabs({ testimonials }: TestimonialTabsProps) {
  const [activeTab, setActiveTab] = useState<'google' | 'trustpilot' | 'sitejabber'>('google');

  const platforms = [
    {
      id: 'google' as const,
      name: 'Google Reviews',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
          <span>Google</span>
        </div>
      ),
      color: 'border-blue-500 text-blue-600 bg-blue-50',
      inactiveColor: 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500'
    },
    {
      id: 'trustpilot' as const,
      name: 'TrustPilot Reviews',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center">
            <Star size={14} fill="white" className="text-white" />
          </div>
          <span>Trustpilot</span>
        </div>
      ),
      color: 'border-green-500 text-green-600 bg-green-50',
      inactiveColor: 'border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-500'
    },
    {
      id: 'sitejabber' as const,
      name: 'SiteJabber Reviews',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-orange-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span>Sitejabber</span>
        </div>
      ),
      color: 'border-orange-500 text-orange-600 bg-orange-50',
      inactiveColor: 'border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500'
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
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {platforms.map((platform) => {
          const isActive = activeTab === platform.id;
          const reviewCount = getReviewCount(platform.id);
          const avgRating = getAverageRating(platform.id);

          return (
            <button
              key={platform.id}
              onClick={() => setActiveTab(platform.id)}
              className={`
                px-6 py-4 rounded-lg border-2 transition-all duration-200 font-medium
                ${isActive ? platform.color : platform.inactiveColor}
                hover:scale-105 transform
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                {platform.logo}
                <div className="text-center">
                  <div className="flex items-center space-x-1 text-sm">
                    <Star size={14} className="text-yellow-400 fill-current" />
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
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
        <TestimonialCarousel
          testimonials={getTestimonialsByPlatform(activeTab)}
          platform={activeTab}
        />
      </div>
    </div>
  );
}