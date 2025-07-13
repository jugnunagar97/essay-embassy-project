import React from 'react';
import { Star, Shield, CheckCircle, Verified } from 'lucide-react';
import { Review } from '../../types';

interface TestimonialCardProps {
  testimonial: Review;
  platform: 'google' | 'trustpilot' | 'sitejabber';
}

export default function TestimonialCard({ testimonial, platform }: TestimonialCardProps) {
  const platformStyles = {
    google: {
      container: 'backdrop-blur-lg bg-white/80 border border-blue-100 shadow-xl hover:shadow-2xl',
      header: 'text-gray-900',
      text: 'text-gray-700',
      name: 'text-gray-900 font-bold',
      starColor: 'text-yellow-500',
      badge: 'bg-blue-100 text-blue-700',
      badgeIcon: CheckCircle,
      font: 'font-sans',
      platformLabel: 'Google',
      platformColor: 'bg-blue-500',
    },
    trustpilot: {
      container: 'backdrop-blur-lg bg-white/80 border border-green-100 shadow-xl hover:shadow-2xl',
      header: 'text-gray-900',
      text: 'text-gray-700',
      name: 'text-gray-900 font-bold',
      starColor: 'text-green-500',
      badge: 'bg-green-100 text-green-700',
      badgeIcon: Shield,
      font: 'font-sans',
      platformLabel: 'Trustpilot',
      platformColor: 'bg-green-500',
    },
    sitejabber: {
      container: 'backdrop-blur-lg bg-white/80 border border-orange-100 shadow-xl hover:shadow-2xl',
      header: 'text-gray-900',
      text: 'text-gray-700',
      name: 'text-gray-900 font-bold',
      starColor: 'text-orange-500',
      badge: 'bg-orange-100 text-orange-700',
      badgeIcon: Verified,
      font: 'font-sans',
      platformLabel: 'Sitejabber',
      platformColor: 'bg-orange-500',
    }
  };

  const style = platformStyles[platform];
  const BadgeIcon = style.badgeIcon;
  const initials = testimonial.userName ? testimonial.userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '?';
  const date = testimonial.createdAt ? new Date(testimonial.createdAt.seconds * 1000).toLocaleDateString() : '';

  return (
    <div
      className={`relative ${style.font} rounded-2xl p-8 min-w-[320px] max-w-[400px] flex-shrink-0 animate-fade-in group transition-all duration-300
        bg-gradient-to-br from-white/80 via-gray-50/80 to-white/60
        shadow-2xl border border-gray-100 hover:shadow-3xl hover:-translate-y-1
        overflow-visible`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      {/* Accent Bar */}
      <div className={`absolute -top-2 left-6 w-24 h-2 rounded-full ${style.platformColor} opacity-80 group-hover:scale-x-110 transition-transform`}></div>
      {/* Header with Stars and Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className={`${style.starColor} fill-current animate-fade-in`} size={24} />
          ))}
        </div>
        <div className={`flex items-center gap-2`}>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-base font-semibold shadow-md ${style.badge} border border-current animate-pulse`}>
            <BadgeIcon size={18} /> Verified
          </span>
        </div>
      </div>
      {/* Review Text */}
      <p className={`${style.text} mb-6 leading-relaxed text-lg italic`}>“{testimonial.comment}”</p>
      {/* Reviewer Info */}
      <div className="flex items-center space-x-3 mt-auto">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-4 ${style.platformColor} bg-white shadow-inner`}> {initials} </div>
        <div className="flex-1">
          <h4 className={`${style.name} text-lg`}>{testimonial.userName}</h4>
          {date && <p className="text-gray-500 text-xs mt-1">{date}</p>}
        </div>
      </div>
    </div>
  );
}