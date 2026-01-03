import { useNavigate } from 'react-router-dom';
import {
    DollarSign,
    Check,
    ChevronRight,
    Shield,
    Sparkles,
    Zap,
    Star,
    Clock,
    Award,
    Crown,
    GraduationCap
} from 'lucide-react';

// Pricing Tiers Data
const pricingTiers = [
    {
        id: 'high-school',
        name: 'High School',
        level: 'Basic',
        icon: GraduationCap,
        description: 'Essays, reports, and basic coursework assignments',
        startingPrice: 11,
        standardPrice: 12,
        features: [
            'Essays & Reports',
            'Book Reviews',
            'Basic Research Papers',
            'Homework Assignments',
            'Lab Reports'
        ],
        popular: false,
        badgeColor: 'silver'
    },
    {
        id: 'college',
        name: 'College',
        level: 'Standard',
        icon: Award,
        description: 'Undergraduate papers, case studies, and coursework',
        startingPrice: 13,
        standardPrice: 15,
        features: [
            'All High School services',
            'Research Papers',
            'Case Studies',
            'Annotated Bibliographies',
            'Literature Reviews',
            'APA/MLA/Chicago Formatting'
        ],
        popular: true,
        badgeColor: 'gold'
    },
    {
        id: 'university',
        name: 'University',
        level: 'Advanced',
        icon: Star,
        description: 'Upper-level papers, thesis chapters, and complex research',
        startingPrice: 16,
        standardPrice: 18,
        features: [
            'All College services',
            'Thesis Chapters',
            'Complex Research',
            'Data Analysis',
            'Critical Essays',
            'Grant Proposals'
        ],
        popular: false,
        badgeColor: 'blue'
    },
    {
        id: 'phd',
        name: 'PhD',
        level: 'Premium',
        icon: Crown,
        description: 'Dissertations, doctoral research, and scholarly publications',
        startingPrice: 22,
        standardPrice: 25,
        features: [
            'All University services',
            'Dissertations',
            'Doctoral Research',
            'Journal Articles',
            'Publication-Ready Papers',
            'Statistical Analysis'
        ],
        popular: false,
        badgeColor: 'platinum'
    }
];

// What's Included Free
const includedFree = [
    'Title Page & References',
    'Formatting (APA, MLA, Chicago, Harvard)',
    'Unlimited Revisions',
    'Plagiarism Report',
    '24/7 Support',
    'Editor Quality Check',
    'Topic Suggestions'
];

// Premium Add-ons
const premiumAddons = [
    { name: 'Grade A Guarantee', price: 'from $2.99' },
    { name: 'Early Draft Delivery', price: '+15%' },
    { name: '1-Page Abstract', price: 'from $13.99' },
    { name: 'VIP Priority Support', price: '$12.99' },
    { name: 'Detailed Outline', price: '$12.00' }
];

// Deadline Pricing Example
const deadlineExamples = [
    { deadline: '14 Days', multiplier: '1x', label: 'Best Value', color: 'success' },
    { deadline: '7 Days', multiplier: '1x', label: 'Standard', color: 'neutral' },
    { deadline: '3 Days', multiplier: '1x', label: 'Quick', color: 'neutral' },
    { deadline: '24 Hours', multiplier: '1.2x', label: 'Rush', color: 'warning' },
    { deadline: '12 Hours', multiplier: '1.4x', label: 'Urgent', color: 'warning' },
    { deadline: '3 Hours', multiplier: '1.8x', label: 'Express', color: 'urgent' }
];

export default function PricingSection() {
    const navigate = useNavigate();

    return (
        <section className="pricing-section" data-testid="pricing-section">
            <div className="pricing-container">

                {/* Section Header */}
                <header className="section-header">
                    <div className="section-eyebrow">
                        <DollarSign size={16} />
                        <span>TRANSPARENT PRICING</span>
                    </div>
                    <h2 className="section-heading">
                        Affordable Rates, <span className="heading-highlight">Premium Quality</span>
                    </h2>
                    <p className="section-subheading">
                        Clear, upfront pricing with no hidden fees. Choose your academic level and deadline — the earlier you order, the more you save.
                    </p>
                </header>

                {/* Pricing Tiers Grid */}
                <div className="pricing-tiers">
                    {pricingTiers.map((tier) => {
                        const TierIcon = tier.icon;
                        return (
                            <div
                                key={tier.id}
                                className={`tier-card ${tier.popular ? 'popular' : ''}`}
                            >
                                {tier.popular && (
                                    <div className="popular-badge">Most Popular</div>
                                )}

                                <div className={`tier-icon badge-${tier.badgeColor}`}>
                                    <TierIcon size={24} />
                                </div>

                                <h3 className="tier-name">{tier.name}</h3>
                                <span className="tier-level">{tier.level}</span>
                                <p className="tier-description">{tier.description}</p>

                                <div className="tier-pricing">
                                    <span className="price-from">Starting from</span>
                                    <div className="price-amount">
                                        <span className="currency">$</span>
                                        <span className="value">{tier.startingPrice}</span>
                                        <span className="per-page">/page</span>
                                    </div>
                                    <span className="standard-price">Standard: ${tier.standardPrice}/page</span>
                                </div>

                                <ul className="tier-features">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <Check size={14} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="tier-cta"
                                    onClick={() => navigate('/order-now')}
                                >
                                    Get Started
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Deadline Pricing Info */}
                <div className="deadline-pricing">
                    <h3 className="deadline-heading">
                        <Clock size={20} />
                        Deadline Pricing Guide
                    </h3>
                    <p className="deadline-subtitle">
                        Prices vary based on your deadline. Order early for the best rates.
                    </p>
                    <div className="deadline-grid">
                        {deadlineExamples.map((item, idx) => (
                            <div key={idx} className={`deadline-item ${item.color}`}>
                                <span className="deadline-time">{item.deadline}</span>
                                <span className="deadline-multiplier">{item.multiplier}</span>
                                <span className={`deadline-label label-${item.color}`}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Included Section */}
                <div className="services-section">
                    <div className="services-grid">
                        {/* Included Free */}
                        <div className="services-card included">
                            <div className="card-icon">
                                <Sparkles size={24} />
                            </div>
                            <h4>Always Included Free</h4>
                            <p className="card-subtitle">Every order comes with these essentials at no extra cost</p>
                            <ul className="services-list">
                                {includedFree.map((service, idx) => (
                                    <li key={idx}>
                                        <Check size={14} className="check-icon" />
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Premium Add-ons */}
                        <div className="services-card addons">
                            <div className="card-icon gold">
                                <Zap size={24} />
                            </div>
                            <h4>Premium Add-ons</h4>
                            <p className="card-subtitle">Enhance your order with optional premium services</p>
                            <ul className="services-list">
                                {premiumAddons.map((service, idx) => (
                                    <li key={idx}>
                                        <Star size={14} className="star-icon" />
                                        <span>{service.name}</span>
                                        <span className="addon-price">{service.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Trust Guarantee Bar */}
                <div className="trust-bar">
                    <div className="trust-item">
                        <Shield size={22} />
                        <span>100% Money-Back Guarantee</span>
                    </div>
                    <div className="trust-divider"></div>
                    <div className="trust-item">
                        <Check size={22} />
                        <span>No Hidden Fees</span>
                    </div>
                    <div className="trust-divider"></div>
                    <div className="trust-item">
                        <Sparkles size={22} />
                        <span>Free Revisions</span>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="pricing-cta">
                    <h3>Ready to Get Started?</h3>
                    <p>Calculate your exact price and place your order in minutes.</p>
                    <button onClick={() => navigate('/order-now')} className="main-cta">
                        <span>Calculate My Price</span>
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Payment Methods */}
                <div className="payment-methods">
                    <span className="payment-label">Secure Payment Options:</span>
                    <div className="payment-icons">
                        <img src="/images/visa.svg" alt="Visa" />
                        <img src="/images/mastercard.svg" alt="Mastercard" />
                        <img src="/images/amex.svg" alt="American Express" />
                        <img src="/images/discover.svg" alt="Discover" />
                        <img src="/images/paypal.svg" alt="PayPal" />
                    </div>
                </div>

            </div>

            <style>{`
        /* ========== CSS VARIABLES ========== */
        .pricing-section {
          --deep-navy: #0B1F42;
          --royal-blue: #1652A0;
          --light-blue: #2B6CB0;
          --gold: #D4A853;
          --gold-dark: #B8903B;
          --success: #10B981;
          --success-light: #D1FAE5;
          --warning: #F59E0B;
          --warning-light: #FEF3C7;
          --urgent: #EF4444;
          --white: #FFFFFF;
          --surface-light: #F8FAFC;
          --text-primary: #0B1F42;
          --text-secondary: #475569;
          --text-muted: #64748B;
          --border-light: #E2E8F0;
          --platinum: #334155;

          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        }

        /* ========== SECTION BASE ========== */
        .pricing-section {
          position: relative;
          background: linear-gradient(180deg, var(--white) 0%, var(--surface-light) 100%);
          padding: 100px 0;
          overflow: hidden;
        }

        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ========== SECTION HEADER ========== */
        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 56px;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: linear-gradient(135deg, rgba(22, 82, 160, 0.08) 0%, rgba(22, 82, 160, 0.03) 100%);
          border: 1px solid rgba(22, 82, 160, 0.15);
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .section-eyebrow svg {
          color: var(--royal-blue);
        }

        .section-eyebrow span {
          font-size: 11px;
          font-weight: 700;
          color: var(--royal-blue);
          letter-spacing: 1.2px;
        }

        .section-heading {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          color: var(--deep-navy);
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .heading-highlight {
          color: var(--royal-blue);
        }

        .section-subheading {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* ========== PRICING TIERS ========== */
        .pricing-tiers {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 56px;
        }

        .tier-card {
          position: relative;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .tier-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(11, 31, 66, 0.1);
        }

        .tier-card.popular {
          border-color: var(--royal-blue);
          box-shadow: 0 8px 24px rgba(22, 82, 160, 0.15);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 16px;
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--light-blue) 100%);
          color: var(--white);
          font-size: 11px;
          font-weight: 700;
          border-radius: 100px;
          white-space: nowrap;
        }

        .tier-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: var(--white);
        }

        .tier-icon.badge-silver {
          background: linear-gradient(135deg, #94A3B8 0%, #64748B 100%);
        }

        .tier-icon.badge-gold {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
        }

        .tier-icon.badge-blue {
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--light-blue) 100%);
        }

        .tier-icon.badge-platinum {
          background: linear-gradient(135deg, var(--deep-navy) 0%, var(--platinum) 100%);
        }

        .tier-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 4px;
        }

        .tier-level {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tier-description {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 12px 0 20px;
          line-height: 1.5;
        }

        .tier-pricing {
          padding: 20px 0;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 20px;
        }

        .price-from {
          font-size: 11px;
          color: var(--text-muted);
          display: block;
          margin-bottom: 4px;
        }

        .price-amount {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 2px;
        }

        .currency {
          font-size: 18px;
          font-weight: 600;
          color: var(--royal-blue);
        }

        .value {
          font-size: 36px;
          font-weight: 800;
          color: var(--royal-blue);
          line-height: 1;
        }

        .per-page {
          font-size: 14px;
          color: var(--text-muted);
        }

        .standard-price {
          font-size: 12px;
          color: var(--text-muted);
          display: block;
          margin-top: 6px;
        }

        .tier-features {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
          text-align: left;
        }

        .tier-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-primary);
          padding: 6px 0;
        }

        .tier-features svg {
          color: var(--success);
          flex-shrink: 0;
        }

        .tier-cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px;
          background: var(--surface-light);
          border: 1px solid var(--border-light);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: var(--deep-navy);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tier-cta:hover {
          background: var(--royal-blue);
          color: var(--white);
          border-color: var(--royal-blue);
        }

        .tier-card.popular .tier-cta {
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--light-blue) 100%);
          color: var(--white);
          border-color: var(--royal-blue);
        }

        /* ========== DEADLINE PRICING ========== */
        .deadline-pricing {
          text-align: center;
          margin-bottom: 56px;
          padding: 32px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 20px;
        }

        .deadline-heading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 8px;
        }

        .deadline-heading svg {
          color: var(--royal-blue);
        }

        .deadline-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .deadline-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }

        .deadline-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 12px;
          background: var(--surface-light);
          border-radius: 12px;
          border: 1px solid var(--border-light);
        }

        .deadline-time {
          font-size: 14px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 4px;
        }

        .deadline-multiplier {
          font-size: 18px;
          font-weight: 800;
          color: var(--royal-blue);
          margin-bottom: 6px;
        }

        .deadline-label {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 100px;
          text-transform: uppercase;
        }

        .label-success {
          background: var(--success-light);
          color: var(--success);
        }

        .label-neutral {
          background: var(--surface-light);
          color: var(--text-muted);
          border: 1px solid var(--border-light);
        }

        .label-warning {
          background: var(--warning-light);
          color: var(--warning);
        }

        .label-urgent {
          background: #FEE2E2;
          color: var(--urgent);
        }

        /* ========== SERVICES SECTION ========== */
        .services-section {
          margin-bottom: 48px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .services-card {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 28px;
        }

        .services-card.included {
          border-color: rgba(16, 185, 129, 0.3);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, var(--white) 100%);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--success-light);
          color: var(--success);
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .card-icon.gold {
          background: rgba(212, 168, 83, 0.15);
          color: var(--gold);
        }

        .services-card h4 {
          font-size: 18px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 6px;
        }

        .card-subtitle {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .services-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .services-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-light);
          font-size: 13px;
          color: var(--text-primary);
        }

        .services-list li:last-child {
          border-bottom: none;
        }

        .check-icon {
          color: var(--success);
          flex-shrink: 0;
        }

        .star-icon {
          color: var(--gold);
          flex-shrink: 0;
        }

        .services-list li span:nth-child(2) {
          flex: 1;
        }

        .addon-price {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
        }

        /* ========== TRUST BAR ========== */
        .trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          padding: 24px;
          background: linear-gradient(135deg, var(--deep-navy) 0%, #132D5C 100%);
          border-radius: 16px;
          margin-bottom: 48px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--white);
          font-size: 14px;
          font-weight: 600;
        }

        .trust-item svg {
          color: var(--gold);
        }

        .trust-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.2);
        }

        /* ========== PRICING CTA ========== */
        .pricing-cta {
          text-align: center;
          margin-bottom: 40px;
        }

        .pricing-cta h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 8px;
        }

        .pricing-cta p {
          font-size: 15px;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .main-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: var(--deep-navy);
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(212, 168, 83, 0.35);
        }

        .main-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 168, 83, 0.45);
        }

        /* ========== PAYMENT METHODS ========== */
        .payment-methods {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .payment-label {
          font-size: 13px;
          color: var(--text-muted);
        }

        .payment-icons {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .payment-icons img {
          height: 28px;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .payment-icons img:hover {
          opacity: 1;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .pricing-tiers {
            grid-template-columns: repeat(2, 1fr);
          }

          .deadline-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .pricing-section {
            padding: 80px 0;
          }

          .pricing-tiers {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }

          .deadline-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .trust-bar {
            flex-direction: column;
            gap: 16px;
          }

          .trust-divider {
            width: 60px;
            height: 1px;
          }
        }

        @media (max-width: 480px) {
          .section-heading {
            font-size: 24px;
          }

          .deadline-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .value {
            font-size: 32px;
          }

          .payment-methods {
            flex-direction: column;
          }
        }
      `}</style>
        </section>
    );
}
