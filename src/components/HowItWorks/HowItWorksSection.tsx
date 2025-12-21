import { useNavigate } from 'react-router-dom';
import { FileText, Target, PenTool, CheckCircle, ArrowRight, Clock, Users, Award } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: FileText,
    title: "Tell Us What You Need",
    description: "Fill out a quick 2-minute form with your essay topic, academic level, deadline, and any specific instructions. The more details you provide, the better we can help.",
    bullets: [
      "Takes less than 2 minutes",
      "No signup required to see pricing",
      "Your information stays 100% confidential"
    ]
  },
  {
    number: 2,
    icon: Target,
    title: "We Assign Your Perfect Writer",
    description: "Our system automatically matches your order with a subject-matter expert from our team of 200+ PhD and Master's level writers. We consider your topic, academic level, and deadline to ensure the perfect fit.",
    bullets: [
      "PhD experts in 50+ subjects",
      "Matched in under 5 minutes",
      "Writers with proven A+ track records"
    ]
  },
  {
    number: 3,
    icon: PenTool,
    title: "We Craft Your Custom Essay",
    description: "Your assigned expert researches, writes, and refines your essay following your exact requirements. Need updates? Our 24/7 support team keeps you informed every step of the way.",
    bullets: [
      "100% original, plagiarism-free content",
      "Real-time progress updates available",
      "Direct communication with support team"
    ]
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Receive Your Perfect Essay",
    description: "Get your polished, ready-to-submit essay before your deadline. Review it, and if anything needs adjustment, we offer unlimited free revisions until you're 100% satisfied.",
    bullets: [
      "Delivered early, never late",
      "Free unlimited revisions",
      "Formatted and referenced perfectly"
    ]
  }
];

const trustStats = [
  { icon: FileText, value: "12,847", label: "Essays This Month" },
  { icon: Clock, value: "98.7%", label: "On-Time Delivery" },
  { icon: Users, value: "14,247+", label: "Happy Students" },
  { icon: Award, value: "4.8/5", label: "Average Rating" }
];

export default function HowItWorksSection() {
  const navigate = useNavigate();

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Section Header */}
        <div className="how-it-works-header">
          <span className="section-eyebrow">SIMPLE 4-STEP PROCESS</span>
          <h2 className="section-heading">
            Get Your A+ Essay in 4 Simple Steps
          </h2>
          <p className="section-subheading">
            No complicated forms. No endless back-and-forth. Just quality essays delivered on time, every time. Here's exactly how we make your academic life easier.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="steps-container">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} className="step-wrapper">
                <div className="step-card">
                  {/* Number Badge */}
                  <div className="step-number-badge">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="step-icon">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>

                  {/* Micro-copy Bullets */}
                  <ul className="step-bullets">
                    {step.bullets.map((bullet, idx) => (
                      <li key={idx}>
                        <span className="bullet-check">✓</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow Connector (except last) */}
                {!isLast && (
                  <div className="step-arrow">
                    <div className="arrow-line"></div>
                    <ArrowRight size={20} className="arrow-icon" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust Reinforcement Bar */}
        <div className="trust-reinforcement-bar">
          {trustStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="trust-stat-item">
                <Icon size={24} className="trust-stat-icon" />
                <div className="trust-stat-content">
                  <span className="trust-stat-value">{stat.value}</span>
                  <span className="trust-stat-label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="how-it-works-cta">
          <button
            onClick={() => navigate('/order-now')}
            className="cta-primary"
          >
            Calculate My Price
            <ArrowRight size={20} className="cta-arrow" />
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="cta-secondary"
          >
            Chat with Support
          </button>
        </div>
      </div>

      <style>{`
        .how-it-works-section {
          background: #FFFFFF;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }
        
        .how-it-works-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }
        
        /* ========== SECTION HEADER ========== */
        .how-it-works-header {
          text-align: center;
          margin-bottom: 64px;
        }
        
        .section-eyebrow {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          color: #2D6BC7;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        
        .section-heading {
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: #1E293B;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        
        .section-subheading {
          font-size: 18px;
          font-weight: 400;
          color: #64748B;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* ========== STEPS CONTAINER ========== */
        .steps-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 0;
          margin-bottom: 48px;
        }
        
        .step-wrapper {
          display: flex;
          align-items: flex-start;
        }
        
        .step-card {
          width: 280px;
          padding: 32px 24px;
          background: #FFFFFF;
          border: 2px solid #E2E8F0;
          border-radius: 16px;
          text-align: center;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        
        .step-card:hover {
          border-color: #2D6BC7;
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(45, 107, 199, 0.15);
        }
        
        .step-card:hover .step-icon {
          transform: rotate(5deg);
        }
        
        .step-card:hover .step-number-badge {
          transform: scale(1.1);
        }
        
        /* Number Badge */
        .step-number-badge {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #2D6BC7 0%, #1E4F9E 100%);
          color: #FFFFFF;
          font-size: 28px;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(45, 107, 199, 0.35);
          transition: transform 0.3s ease;
        }
        
        /* Step Icon */
        .step-icon {
          width: 64px;
          height: 64px;
          margin: 24px auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D6BC7;
          transition: transform 0.3s ease;
        }
        
        /* Step Title */
        .step-title {
          font-size: 20px;
          font-weight: 600;
          color: #1E293B;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        
        /* Step Description */
        .step-description {
          font-size: 14px;
          font-weight: 400;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        /* Step Bullets */
        .step-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
        
        .step-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: #64748B;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        
        .step-bullets li:last-child {
          margin-bottom: 0;
        }
        
        .bullet-check {
          color: #22C55E;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        
        /* Arrow Connector */
        .step-arrow {
          display: flex;
          align-items: center;
          padding: 0 8px;
          margin-top: 120px;
        }
        
        .arrow-line {
          width: 24px;
          height: 2px;
          background: linear-gradient(90deg, #CBD5E1 0%, #94A3B8 50%, #CBD5E1 100%);
          border-radius: 1px;
        }
        
        .arrow-icon {
          color: #94A3B8;
          margin-left: -4px;
        }
        
        /* ========== TRUST REINFORCEMENT BAR ========== */
        .trust-reinforcement-bar {
          display: flex;
          justify-content: center;
          gap: 48px;
          padding: 32px 40px;
          background: linear-gradient(135deg, #F8FAFC 0%, #F0F7FF 100%);
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          margin-bottom: 40px;
        }
        
        .trust-stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .trust-stat-icon {
          color: #2D6BC7;
        }
        
        .trust-stat-content {
          display: flex;
          flex-direction: column;
        }
        
        .trust-stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1E293B;
          line-height: 1.2;
        }
        
        .trust-stat-label {
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
        }
        
        /* ========== CTA SECTION ========== */
        .how-it-works-cta {
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 40px;
          background: linear-gradient(135deg, #2D6BC7 0%, #1E4F9E 100%);
          color: #FFFFFF;
          font-size: 18px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(45, 107, 199, 0.3);
        }
        
        .cta-primary:hover {
          transform: scale(1.02) translateY(-2px);
          box-shadow: 0 8px 24px rgba(45, 107, 199, 0.4);
        }
        
        .cta-primary .cta-arrow {
          transition: transform 0.2s ease;
        }
        
        .cta-primary:hover .cta-arrow {
          transform: translateX(4px);
        }
        
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 18px 40px;
          background: transparent;
          color: #2D6BC7;
          font-size: 18px;
          font-weight: 600;
          border: 2px solid #2D6BC7;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .cta-secondary:hover {
          background: #2D6BC7;
          color: #FFFFFF;
        }
        
        /* ========== RESPONSIVE ========== */
        @media (max-width: 1200px) {
          .steps-container {
            gap: 0;
          }
          
          .step-card {
            width: 240px;
            padding: 28px 20px;
          }
          
          .step-description {
            font-size: 13px;
          }
          
          .trust-reinforcement-bar {
            gap: 32px;
            padding: 24px 32px;
          }
        }
        
        @media (max-width: 1024px) {
          .how-it-works-section {
            padding: 80px 0;
          }
          
          .steps-container {
            flex-wrap: wrap;
            gap: 32px;
            justify-content: center;
          }
          
          .step-wrapper {
            width: calc(50% - 16px);
            justify-content: center;
          }
          
          .step-card {
            width: 100%;
            max-width: 320px;
          }
          
          .step-arrow {
            display: none;
          }
          
          .trust-reinforcement-bar {
            flex-wrap: wrap;
            gap: 24px;
          }
          
          .trust-stat-item {
            width: calc(50% - 12px);
            justify-content: center;
          }
        }
        
        @media (max-width: 768px) {
          .how-it-works-section {
            padding: 60px 0;
          }
          
          .how-it-works-container {
            padding: 0 24px;
          }
          
          .section-heading {
            font-size: 32px;
          }
          
          .section-subheading {
            font-size: 16px;
          }
          
          .how-it-works-header {
            margin-bottom: 48px;
          }
          
          .step-wrapper {
            width: 100%;
          }
          
          .step-card {
            max-width: 400px;
            margin: 0 auto;
          }
          
          .trust-stat-item {
            width: 100%;
          }
          
          .how-it-works-cta {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-primary,
          .cta-secondary {
            width: 100%;
            max-width: 320px;
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .how-it-works-section {
            padding: 48px 0;
          }

          .how-it-works-container {
            padding: 0 16px;
          }
          
          .section-eyebrow {
            font-size: 12px;
            margin-bottom: 12px;
          }
          
          .section-heading {
            font-size: 26px;
            margin-bottom: 16px;
          }
          
          .section-subheading {
            font-size: 15px;
            text-align: left;
          }
          
          .how-it-works-header {
            margin-bottom: 40px;
            text-align: left;
          }
          
          .step-card {
            width: 100%;
            max-width: 100%;
            padding: 32px 20px 24px;
            margin-bottom: 16px;
            text-align: center;
          }
          
          .step-wrapper {
            margin-bottom: 24px;
          }
          
          .step-wrapper:last-child {
            margin-bottom: 0;
          }
          
          .step-number-badge {
            width: 48px;
            height: 48px;
            font-size: 24px;
            top: -24px;
          }
          
          .step-icon {
            margin: 16px auto 16px;
            width: 56px;
            height: 56px;
          }
          
          .step-title {
            font-size: 18px;
          }
          
          /* Show all bullets on mobile, don't hide them */
          .step-bullets li:nth-child(3) {
            display: flex;
          }
          
          .trust-reinforcement-bar {
            padding: 24px 16px;
            gap: 20px;
            margin-bottom: 32px;
          }
          
          .trust-stat-icon {
            width: 20px;
            height: 20px;
          }
          
          .trust-stat-value {
            font-size: 20px;
          }
          
          .trust-stat-label {
            font-size: 12px;
          }
          
          .how-it-works-cta {
            gap: 12px;
          }
          
          .cta-primary,
          .cta-secondary {
            width: 100%;
            max-width: 100%;
            font-size: 16px;
            padding: 16px 24px;
            justify-content: center;
          }
        }
        
        /* ========== ANIMATIONS ========== */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .step-card {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .step-wrapper:nth-child(1) .step-card { animation-delay: 0.1s; }
        .step-wrapper:nth-child(2) .step-card { animation-delay: 0.2s; }
        .step-wrapper:nth-child(3) .step-card { animation-delay: 0.3s; }
        .step-wrapper:nth-child(4) .step-card { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
}
