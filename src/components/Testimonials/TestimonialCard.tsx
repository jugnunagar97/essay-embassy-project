import React from 'react';
import { Star, Shield, CheckCircle, Verified } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  platform: 'google' | 'trustpilot' | 'sitejabber';
}

export default function TestimonialCard({ testimonial, platform }: TestimonialCardProps) {
  const platformStyles = {
    google: {
      container: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
      header: 'text-gray-900',
      text: 'text-gray-700',
      name: 'text-gray-900 font-medium',
      role: 'text-gray-600',
      starColor: 'text-yellow-500',
      badge: 'bg-blue-100 text-blue-700',
      badgeIcon: CheckCircle,
      font: 'font-sans'
    },
    trustpilot: {
      container: 'bg-white border border-green-200 shadow-sm hover:shadow-md',
      header: 'text-gray-900',
      text: 'text-gray-700',
      name: 'text-gray-900 font-semibold',
      role: 'text-gray-600',
      starColor: 'text-green-500',
      badge: 'bg-green-100 text-green-700',
      badgeIcon: Shield,
      font: 'font-sans'
    },
    sitejabber: {
      container: 'bg-white border border-orange-200 shadow-sm hover:shadow-md',
      header: 'text-gray-900',
      text: 'text-gray-700',
      name: 'text-gray-900 font-medium',
      role: 'text-gray-600',
      starColor: 'text-orange-500',
      badge: 'bg-orange-100 text-orange-700',
      badgeIcon: Verified,
      font: 'font-sans'
    }
  };

  const style = platformStyles[platform];
  const BadgeIcon = style.badgeIcon;

  return (
    <div className={`${style.container} ${style.font} rounded-xl p-6 transition-all duration-300 hover:scale-105 min-w-[320px] max-w-[400px] flex-shrink-0`}>
      {/* Header with Stars and Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className={`${style.starColor} fill-current`} size={18} />
          ))}
        </div>
        <div className={`${style.badge} px-2 py-1 rounded-full flex items-center space-x-1 text-xs`}>
          <BadgeIcon size={12} />
          <span>Verified</span>
        </div>
      </div>

      {/* Review Text */}
      <p className={`${style.text} mb-4 leading-relaxed text-sm`}>
        "{testimonial.content}"
      </p>

      {/* Reviewer Info */}
      <div className="flex items-center space-x-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className={`${style.name} text-sm`}>
            {testimonial.name}
          </h4>
          <p className={`${style.role} text-xs`}>
            {testimonial.role}
          </p>
          {testimonial.date && (
            <p className="text-gray-500 text-xs mt-1">
              {new Date(testimonial.date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}