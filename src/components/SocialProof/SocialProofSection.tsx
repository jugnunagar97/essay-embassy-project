import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

import ProofGallery from './ProofGallery';
import TestimonialCarousel from './TestimonialCarousel';
import StatsBar from './StatsBar';
import ReviewPlatforms from './ReviewPlatforms';
import TrustBadges from './TrustBadges';

export default function SocialProofSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.02] blur-3xl" />
        <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] rounded-full bg-amber-400/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/60 rounded-full mb-5 sm:mb-6">
            <Sparkles size={14} className="text-amber-600" />
            <span className="text-[11px] sm:text-xs font-bold text-amber-700 tracking-widest uppercase">
              TRUSTED BY 14,000+ STUDENTS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-5">
            Real Results from{' '}
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Real Students
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto px-2">
            Don't just take our word for it—see actual graded assignments from students
            at top universities who trusted us with their academic success.
          </p>
        </div>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Proof Gallery */}
        <ProofGallery />

        {/* Testimonials */}
        <TestimonialCarousel />

        {/* Stats Bar */}
        <StatsBar />

        {/* Review Platforms */}
        <ReviewPlatforms />

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl">
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
              Ready to achieve grades like these?
            </h3>
            <p className="text-sm sm:text-base text-slate-500">
              Join thousands of successful students. Your A+ is just a click away.
            </p>
          </div>
          <button
            onClick={() => navigate('/order-now')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-700/25 hover:shadow-xl hover:shadow-blue-700/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex-shrink-0"
          >
            <span>Get Started Now</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}