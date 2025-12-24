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
      className="relative bg-surface-light py-16 sm:py-20 lg:py-24 overflow-hidden"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal-blue/10 text-royal-blue text-sm font-semibold tracking-wide mb-4"
            data-testid="section-badge"
          >
            <Shield size={16} />
            Simple 4-Step Process
          </span>

          <h2
            id="how-it-works-heading"
            className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight mb-4 sm:mb-6"
          >
            From Stressed to Submitted
            <span className="block text-royal-blue">In 4 Easy Steps</span>
          </h2>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            No complicated signup. No endless emails. Just quality academic work
            delivered when you need it.
          </p>
        </header>

        {/* Steps - Mobile: Vertical Timeline, Desktop: Horizontal Cards */}
        <div className="relative">

          {/* Desktop Horizontal Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.number} className="relative" data-testid={`step-${step.number}`}>
                  {/* Connector Line */}
                  {!isLast && (
                    <div className="absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-royal-blue/30 to-royal-blue/10 z-0" />
                  )}

                  <article className="relative bg-white rounded-2xl p-6 xl:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-royal-blue/20 transition-all duration-300 group h-full">
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-6 xl:left-8">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-royal-blue to-deep-navy text-white text-sm font-bold shadow-lg shadow-royal-blue/25">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-royal-blue/10 flex items-center justify-center mb-5 group-hover:bg-royal-blue/15 transition-colors">
                      <Icon className="w-7 h-7 text-royal-blue" strokeWidth={1.75} />
                    </div>

                    {/* Highlight Tag */}
                    <span className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-semibold mb-3">
                      {step.highlight}
                    </span>

                    {/* Content */}
                    <h3 className="font-bold text-lg xl:text-xl text-text-primary mb-3 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed">
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
                  <div className="flex flex-col items-center">
                    {/* Step Number Circle */}
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-royal-blue to-deep-navy flex items-center justify-center shadow-lg shadow-royal-blue/25">
                      <span className="text-white font-bold text-lg sm:text-xl">{step.number}</span>
                    </div>

                    {/* Vertical Line */}
                    {!isLast && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-royal-blue/40 to-royal-blue/10 my-2" />
                    )}
                  </div>

                  {/* Card Content */}
                  <article className={`flex-1 bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm ${!isLast ? 'mb-4' : ''}`}>
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-royal-blue/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-royal-blue" strokeWidth={1.75} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Highlight Tag */}
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark text-xs font-semibold mb-2">
                          {step.highlight}
                        </span>

                        {/* Title */}
                        <h3 className="font-bold text-base sm:text-lg text-text-primary mb-2 leading-snug">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-text-secondary text-sm leading-relaxed">
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

        {/* Trust Stats Bar */}
        <div
          className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          data-testid="trust-stats"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
            {trustStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 sm:gap-4 p-5 sm:p-6 lg:p-8"
                  data-testid={`trust-stat-${index}`}
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-success" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xl sm:text-2xl text-text-primary leading-none mb-0.5">
                      {stat.value}
                    </p>
                    <p className="text-text-muted text-xs sm:text-sm font-medium truncate">
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
          <p className="text-text-secondary text-sm sm:text-base mb-6">
            Ready to get started? See your price in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/order-now')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-royal-blue to-light-blue text-white font-semibold text-base rounded-xl shadow-lg shadow-royal-blue/25 hover:shadow-xl hover:shadow-royal-blue/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              data-testid="cta-primary"
            >
              Get My Free Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-royal-blue font-semibold text-base rounded-xl border-2 border-royal-blue/20 hover:border-royal-blue/40 hover:bg-royal-blue/5 active:bg-royal-blue/10 transition-all duration-200"
              data-testid="cta-secondary"
            >
              Talk to Support
            </button>
          </div>

          {/* Trust Micro-copy */}
          <p className="mt-5 text-text-muted text-xs sm:text-sm flex items-center justify-center gap-2">
            <Shield size={14} className="text-success" />
            100% confidential. No commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}
