import { useNavigate } from 'react-router-dom';
import {
  Shield,
  RefreshCw,
  Clock,
  GraduationCap,
  Lock,
  Headphones,
  MessageSquare,
  BadgeDollarSign,
  ArrowRight,
  Check
} from 'lucide-react';

const benefits = [
  {
    id: 'plagiarism-free',
    icon: Shield,
    title: 'Original Work, Always',
    description: 'Every piece is crafted from scratch by subject experts. Turnitin originality report included with every order.',
    stat: '100%',
    statLabel: 'Original'
  },
  {
    id: 'money-back',
    icon: BadgeDollarSign,
    title: 'Satisfaction Guaranteed',
    description: 'If our work doesn\'t meet your expectations, we\'ll make it right or provide a full refund.',
    stat: 'Full',
    statLabel: 'Refund'
  },
  {
    id: 'on-time',
    icon: Clock,
    title: 'Always On Time',
    description: 'We build in buffer time to deliver early, giving you space to review before submission.',
    stat: '98.7%',
    statLabel: 'Early'
  },
  {
    id: 'revisions',
    icon: RefreshCw,
    title: 'Unlimited Revisions',
    description: 'Request changes until you\'re completely satisfied. No limits, no extra charges.',
    stat: '24hr',
    statLabel: 'Turnaround'
  },
  {
    id: 'experts',
    icon: GraduationCap,
    title: 'Verified Experts',
    description: 'Your work is handled by scholars with advanced degrees in your specific field.',
    stat: 'PhD+',
    statLabel: 'Writers'
  },
  {
    id: 'privacy',
    icon: Lock,
    title: 'Complete Privacy',
    description: 'Bank-level encryption protects your data. We never share your information.',
    stat: '256-bit',
    statLabel: 'Encrypted'
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Human Support',
    description: 'Real people available around the clock. Get thoughtful answers in minutes.',
    stat: '2 min',
    statLabel: 'Response'
  },
  {
    id: 'communication',
    icon: MessageSquare,
    title: 'Direct Communication',
    description: 'Stay connected with your writer throughout the process. Track progress anytime.',
    stat: 'Real-time',
    statLabel: 'Updates'
  }
];

const promises = [
  'Unlimited free revisions',
  'Guaranteed early delivery',
  'PhD & Master\'s experts',
  '24/7 human support',
  'No-questions-asked refunds'
];

export default function WhyChooseUsSection() {
  const navigate = useNavigate();

  return (
    <section className="why-choose-section" data-testid="why-choose-section">
      <div className="why-choose-container">

        {/* Section Header */}
        <header className="section-header">
          <p className="section-eyebrow">Trusted by 14,000+ Students</p>
          <h2 className="section-title">
            Why choose <span className="title-accent">EssayEmbassy</span>
          </h2>
          <p className="section-description">
            We deliver on our promises with guarantees that protect your investment and ensure your success.
          </p>
        </header>

        {/* Benefits Grid */}
        <div className="benefits-grid" data-testid="benefits-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.id}
                className="benefit-card"
                data-testid={`benefit-${benefit.id}`}
              >
                <div className="benefit-top">
                  <div className="benefit-icon">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="benefit-stat">
                    <span className="stat-value">{benefit.stat}</span>
                    <span className="stat-label">{benefit.statLabel}</span>
                  </div>
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </article>
            );
          })}
        </div>

        {/* Promise Bar */}
        <div className="promise-bar" data-testid="promise-section">
          <div className="promise-inner">
            {promises.map((promise, index) => (
              <div key={index} className="promise-item">
                <div className="promise-check">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{promise}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section" data-testid="trust-closer">
          <div className="cta-content">
            <h3 className="cta-title">Have questions?</h3>
            <p className="cta-text">Our team is ready to help you make an informed decision.</p>
          </div>
          <div className="cta-actions">
            <button
              onClick={() => navigate('/contact')}
              className="btn-primary"
              data-testid="contact-btn"
            >
              Talk to Our Team
              <ArrowRight size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => navigate('/faq')}
              className="btn-secondary"
              data-testid="faq-btn"
            >
              View Guarantees
            </button>
          </div>
        </div>

      </div>

      <style>{`
                /* ========== DESIGN TOKENS ========== */
                .why-choose-section {
                    --font-primary: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                    
                    /* Professional Brand Colors */
                    --navy: #0B1F42;
                    --navy-light: #1a3a6e;
                    --royal-blue: #1652A0;
                    --blue-soft: #E8F0FE;
                    
                    /* Gold - used sparingly */
                    --gold: #C9A227;
                    --gold-soft: #F8F3E3;
                    
                    /* Surfaces */
                    --surface: #FFFFFF;
                    --surface-secondary: #F8FAFC;
                    --surface-tertiary: #F1F5F9;
                    
                    /* Text */
                    --text-primary: #0F172A;
                    --text-secondary: #475569;
                    --text-tertiary: #64748B;
                    
                    /* Borders */
                    --border: #E2E8F0;
                    --border-hover: #CBD5E1;
                    
                    /* Success */
                    --success: #059669;
                    --success-soft: #ECFDF5;
                    
                    font-family: var(--font-primary);
                }

                /* ========== SECTION BASE ========== */
                .why-choose-section {
                    background: var(--surface);
                    padding: 100px 0 120px;
                }

                .why-choose-container {
                    max-width: 1140px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* ========== HEADER ========== */
                .section-header {
                    text-align: center;
                    margin-bottom: 64px;
                }

                .section-eyebrow {
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--royal-blue);
                    letter-spacing: 0.03em;
                    margin: 0 0 12px;
                }

                .section-title {
                    font-size: clamp(32px, 4vw, 44px);
                    font-weight: 700;
                    color: var(--text-primary);
                    line-height: 1.15;
                    margin: 0 0 16px;
                    letter-spacing: -0.02em;
                }

                .title-accent {
                    color: var(--navy);
                    position: relative;
                }

                .title-accent::after {
                    content: '';
                    position: absolute;
                    bottom: 4px;
                    left: 0;
                    right: 0;
                    height: 8px;
                    background: var(--gold);
                    opacity: 0.25;
                    z-index: -1;
                    border-radius: 2px;
                }

                .section-description {
                    font-size: 17px;
                    font-weight: 400;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin: 0 auto;
                    max-width: 520px;
                }

                /* ========== BENEFITS GRID ========== */
                .benefits-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 20px;
                    margin-bottom: 48px;
                }

                @media (min-width: 640px) {
                    .benefits-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (min-width: 1024px) {
                    .benefits-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }

                .benefit-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 28px 24px;
                    transition: all 0.25s ease;
                }

                .benefit-card:hover {
                    border-color: var(--border-hover);
                    box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
                }

                .benefit-top {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }

                .benefit-icon {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--blue-soft);
                    border-radius: 12px;
                    color: var(--royal-blue);
                    transition: all 0.25s ease;
                }

                .benefit-card:hover .benefit-icon {
                    background: var(--royal-blue);
                    color: white;
                }

                .benefit-stat {
                    text-align: right;
                }

                .stat-value {
                    display: block;
                    font-size: 22px;
                    font-weight: 700;
                    color: var(--navy);
                    line-height: 1;
                    letter-spacing: -0.02em;
                }

                .stat-label {
                    font-size: 10px;
                    font-weight: 600;
                    color: var(--text-tertiary);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }

                .benefit-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 8px;
                    line-height: 1.3;
                }

                .benefit-description {
                    font-size: 14px;
                    font-weight: 400;
                    color: var(--text-secondary);
                    line-height: 1.55;
                    margin: 0;
                }

                /* ========== PROMISE BAR ========== */
                .promise-bar {
                    background: var(--surface-secondary);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 28px 32px;
                    margin-bottom: 48px;
                }

                .promise-inner {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 12px 32px;
                }

                .promise-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--text-primary);
                }

                .promise-check {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--success);
                    border-radius: 50%;
                    color: white;
                    flex-shrink: 0;
                }

                /* ========== CTA SECTION ========== */
                .cta-section {
                    background: var(--navy);
                    border-radius: 20px;
                    padding: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 32px;
                    flex-wrap: wrap;
                }

                .cta-content {
                    flex: 1;
                    min-width: 280px;
                }

                .cta-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: white;
                    margin: 0 0 8px;
                    letter-spacing: -0.01em;
                }

                .cta-text {
                    font-size: 15px;
                    color: rgba(255, 255, 255, 0.75);
                    margin: 0;
                    line-height: 1.5;
                }

                .cta-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 24px;
                    background: var(--gold);
                    color: var(--navy);
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 600;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-primary:hover {
                    background: #d4ad2d;
                    transform: translateY(-1px);
                }

                .btn-primary svg {
                    transition: transform 0.2s ease;
                }

                .btn-primary:hover svg {
                    transform: translateX(3px);
                }

                .btn-secondary {
                    padding: 14px 24px;
                    background: transparent;
                    color: white;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 500;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.4);
                }

                /* ========== RESPONSIVE ========== */
                @media (max-width: 768px) {
                    .why-choose-section {
                        padding: 72px 0 88px;
                    }

                    .section-header {
                        margin-bottom: 48px;
                    }

                    .benefit-card {
                        padding: 24px 20px;
                    }

                    .benefits-grid {
                        gap: 16px;
                        margin-bottom: 32px;
                    }

                    .promise-bar {
                        padding: 24px 20px;
                        margin-bottom: 32px;
                    }

                    .promise-inner {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }

                    .cta-section {
                        padding: 36px 28px;
                        flex-direction: column;
                        text-align: center;
                    }

                    .cta-content {
                        text-align: center;
                    }

                    .cta-actions {
                        width: 100%;
                        flex-direction: column;
                    }

                    .btn-primary,
                    .btn-secondary {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .section-title {
                        font-size: 28px;
                    }

                    .section-description {
                        font-size: 15px;
                    }

                    .benefit-top {
                        flex-direction: column;
                        gap: 16px;
                    }

                    .benefit-stat {
                        text-align: left;
                    }

                    .stat-value {
                        font-size: 20px;
                    }

                    .cta-title {
                        font-size: 22px;
                    }
                }
            `}</style>
    </section>
  );
}
