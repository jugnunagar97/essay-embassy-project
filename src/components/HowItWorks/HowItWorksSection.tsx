import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Pencil, CheckCircle, ArrowRight, Clock, Star, Shield } from 'lucide-react';

interface Step {
  number: number;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  highlight: string;
}

interface TrustStat {
  icon: React.ComponentType<any>;
  value: string;
  label: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: FileText,
    title: "Share Your Requirements",
    description: "Tell us your topic, deadline, and academic level. Takes 2 minutes. No account needed to see your price.",
    highlight: "2-min form"
  },
  {
    number: 2,
    icon: Users,
    title: "Get Matched With an Expert",
    description: "We connect you with a verified writer who specializes in your subject. PhD & Master's level professionals only.",
    highlight: "200+ experts"
  },
  {
    number: 3,
    icon: Pencil,
    title: "Your Essay Gets Written",
    description: "Your writer researches and crafts original content following your exact guidelines. Track progress anytime.",
    highlight: "100% original"
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Download & Submit",
    description: "Receive your polished essay before the deadline. Need changes? Unlimited revisions included.",
    highlight: "Free revisions"
  }
];

const trustStats: TrustStat[] = [
  { icon: FileText, value: "12,847", label: "Essays Delivered" },
  { icon: Clock, value: "98.7%", label: "On-Time Rate" },
  { icon: Users, value: "14,247+", label: "Students Helped" },
  { icon: Star, value: "4.8/5", label: "Average Rating" }
];

export default function HowItWorksSection(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: '#F8FAFC' }}
      aria-labelledby="how-it-works-heading"
      data-testid="how-it-works-section"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1652A0 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4"
            style={{ backgroundColor: 'rgba(22,82,160,0.1)', color: '#1652A0' }}
            data-testid="section-badge"
          >
            <Shield size={16} />
            Simple 4-Step Process
          </span>

          <h2
            id="how-it-works-heading"
            className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6"
            style={{ color: '#0F172A' }}
          >
            From Stressed to Submitted
            <span className="block" style={{ color: '#1652A0' }}>In 4 Easy Steps</span>
          </h2>

          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#475569' }}>
            No complicated signup. No endless emails. Just quality academic work
            delivered when you need it.
          </p>
        </header>

        {/* Steps */}
        <div className="relative">

          {/* Desktop Horizontal Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.number} className="relative" data-testid={`step-${step.number}`}>
                  {/* FIX 1: Connector line - simplified to avoid calc overflow */}
                  {!isLast && (
                    <div
                      className="absolute z-0 h-0.5"
                      style={{
                        top: '48px',
                        left: '75%',
                        width: '50%',
                        background: 'linear-gradient(to right, rgba(22,82,160,0.3), rgba(22,82,160,0.1))'
                      }}
                    />
                  )}

                  <article
                    className="relative bg-white rounded-2xl p-6 xl:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group h-full"
                    style={{ borderColor: 'rgba(22,82,160,0)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(22,82,160,0.2)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(22,82,160,0)')}
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-6 xl:left-8">
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #1652A0, #0B1F42)' }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors"
                      style={{ backgroundColor: 'rgba(22,82,160,0.1)' }}
                    >
                      <Icon className="w-7 h-7" style={{ color: '#1652A0' }} strokeWidth={1.75} />
                    </div>

                    {/* Highlight Tag */}
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ backgroundColor: 'rgba(212,168,83,0.15)', color: '#92700A' }}
                    >
                      {step.highlight}
                    </span>

                    {/* Content */}
                    <h3 className="font-bold text-lg xl:text-xl mb-3 leading-snug" style={{ color: '#0F172A' }}>
                      {step.title}
                    </h3>

                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                      {step.description}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Mobile & Tablet Vertical Timeline */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.number}
                  className="relative flex gap-4 sm:gap-6"
                  data-testid={`step-mobile-${step.number}`}
                >
                  {/* Timeline Track */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    {/* Step Number Circle */}
                    <div
                      className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #1652A0, #0B1F42)' }}
                    >
                      <span className="text-white font-bold text-lg sm:text-xl">{step.number}</span>
                    </div>

                    {/* Vertical Line */}
                    {!isLast && (
                      <div
                        className="w-0.5 flex-1 my-2"
                        style={{ background: 'linear-gradient(to bottom, rgba(22,82,160,0.4), rgba(22,82,160,0.1))' }}
                      />
                    )}
                  </div>

                  {/* Card Content */}
                  <article className={`flex-1 min-w-0 bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm ${!isLast ? 'mb-4' : ''}`}>
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(22,82,160,0.1)' }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#1652A0' }} strokeWidth={1.75} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Highlight Tag */}
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
                          style={{ backgroundColor: 'rgba(212,168,83,0.15)', color: '#92700A' }}
                        >
                          {step.highlight}
                        </span>

                        <h3 className="font-bold text-base sm:text-lg mb-2 leading-snug" style={{ color: '#0F172A' }}>
                          {step.title}
                        </h3>

                        <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* FIX 2: Trust Stats Bar - fixed divide borders on 2-col mobile */}
        <div
          className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          data-testid="trust-stats"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {trustStats.map((stat, index) => {
              const Icon = stat.icon;
              // FIX 2: Manual border logic instead of divide-x/y combos
              const borderClasses = [
                index % 2 === 1 ? 'border-l border-gray-100' : '',           // right col on mobile
                index >= 2 ? 'border-t border-gray-100' : '',                  // bottom row on mobile
                index % 4 !== 0 ? 'lg:border-l lg:border-gray-100' : '',      // all but first on desktop
                'lg:border-t-0'                                                 // remove top border on desktop
              ].join(' ');

              return (
                <div
                  key={index}
                  className={`flex items-center justify-center gap-3 sm:gap-4 p-5 sm:p-6 lg:p-8 ${borderClasses}`}
                  data-testid={`trust-stat-${index}`}
                >
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(16,185,129,0.1)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#10B981' }} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xl sm:text-2xl leading-none mb-0.5" style={{ color: '#0F172A' }}>
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm font-medium truncate" style={{ color: '#94A3B8' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="mt-10 sm:mt-12 lg:mt-16 text-center"
          data-testid="cta-section"
        >
          <p className="text-sm sm:text-base mb-6" style={{ color: '#475569' }}>
            Ready to get started? See your price in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/order-now')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white font-semibold text-base rounded-xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              style={{ background: 'linear-gradient(to right, #1652A0, #2B6CB0)', boxShadow: '0 4px 14px rgba(22,82,160,0.25)' }}
              data-testid="cta-primary"
            >
              Get My Free Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white font-semibold text-base rounded-xl border-2 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200"
              style={{ color: '#1652A0', borderColor: 'rgba(22,82,160,0.2)' }}
              data-testid="cta-secondary"
            >
              Talk to Support
            </button>
          </div>

          {/* Trust Micro-copy */}
          <p className="mt-5 text-xs sm:text-sm flex items-center justify-center gap-2" style={{ color: '#94A3B8' }}>
            <Shield size={14} style={{ color: '#10B981' }} />
            100% confidential. No commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}