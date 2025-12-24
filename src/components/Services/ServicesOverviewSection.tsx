import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  GraduationCap,
  PenTool,
  FileCheck,
  Layout,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: React.ComponentType<any>;
  popular?: boolean;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 'assignment-help',
    title: 'Assignment Help',
    description: 'Struggling with complex assignments? Our experts provide clear, step-by-step solutions for any subject or difficulty level.',
    price: '$12.00',
    icon: Layout,
    features: ['All subjects covered', 'Step-by-step logic', '24/7 expert support']
  },
  {
    id: 'homework-help',
    title: 'Homework Help',
    description: 'Daily coursework piling up? We handle your routine homework tasks efficiently so you can focus on what matters most.',
    price: '$11.00',
    icon: FileCheck,
    features: ['Fast turnaround', 'Accurate answers', 'Direct expert chat']
  },
  {
    id: 'essay-writing',
    title: 'Essay Writing Services',
    description: 'From argumentative to narrative essays, we craft compelling, original papers that strictly adhere to your academic requirements.',
    price: '$11.00',
    icon: PenTool,
    popular: true,
    features: ['100% Plagiarism-free', 'Any citation style', 'Free revisions']
  },
  {
    id: 'dissertation-help',
    title: 'Dissertation Writing Help',
    description: 'Comprehensive support for your PhD journey. We assist with proposals, individual chapters, or full dissertation writing.',
    price: '$16.00',
    icon: BookOpen,
    features: ['PhD-level writers', 'Chapter-by-chapter', 'Confidentiality guaranteed']
  },
  {
    id: 'thesis-help',
    title: 'Thesis Writing Help',
    description: 'Secure your Master’s degree with a meticulously researched thesis. We help you structure arguments and analyze data effectively.',
    price: '$15.00',
    icon: GraduationCap,
    features: ['Data analysis help', 'Strong thesis statements', 'Rigorous editing']
  },
  {
    id: 'paper-writing',
    title: 'Paper Writing Services',
    description: 'Need a term paper or research paper? We deliver well-structured, thoroughly referenced academic papers on any topic.',
    price: '$13.00',
    icon: FileText,
    features: ['Deep research', 'Credible sources', 'Perfect formatting']
  }
];

export default function ServicesOverviewSection() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceType: string) => {
    // Navigate to order page with pre-selected service if possible, or just general order page
    const params = new URLSearchParams({ type: serviceType });
    navigate(`/order-now?${params.toString()}`);
  };

  return (
    <section className="services-section" data-testid="services-section">
      <div className="services-container">

        {/* Header */}
        <div className="services-header">
          <div className="services-eyebrow">
            <span className="eyebrow-line"></span>
            <span className="eyebrow-text">ACADEMIC SOLUTIONS</span>
            <span className="eyebrow-line"></span>
          </div>
          <h2 className="services-heading">
            Everything You Need to <span className="highlight-text">Excel</span>
          </h2>
          <p className="services-subheading">
            From quick homework help to complex doctoral research, our specialized teams cover the entire academic spectrum.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`service-card ${service.popular ? 'popular-card' : ''}`}
                onClick={() => handleServiceClick(service.title)}
              >
                {service.popular && (
                  <div className="popular-badge">
                    <Sparkles size={12} fill="currentColor" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="service-icon-wrapper">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <div className="service-price">
                    <span className="price-label">from</span>
                    <span className="price-amount">{service.price}</span>
                    <span className="price-unit">/page</span>
                  </div>

                  <p className="service-description">{service.description}</p>

                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="feature-dot"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="service-cta">
                    <span>Order Now</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>


      </div>

      <style>{`
        .services-section {
          /* Local theme variables fallback */
          --deep-navy: #0B1F42;
          --royal-blue: #1652A0;
          --light-blue: #2B6CB0;
          --gold: #D4A853;
          --gold-dark: #B8903B;
          --surface-light: #F8FAFC;
          --white: #FFFFFF;
          --text-secondary: #475569;
          --text-muted: #64748B;
          --border-light: #E2E8F0;
          
          background-color: var(--surface-light);
          padding: 100px 0;
          position: relative;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .services-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header Styles */
        .services-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 64px;
        }

        .services-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .eyebrow-line {
          width: 40px;
          height: 1px;
          background: var(--royal-blue);
          opacity: 0.3;
        }

        .eyebrow-text {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: var(--royal-blue);
          text-transform: uppercase;
        }

        .services-heading {
          font-size: clamp(32px, 4vw, 44px);
          font-weight: 800;
          color: var(--deep-navy);
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .highlight-text {
          color: var(--royal-blue);
          position: relative;
          display: inline-block;
        }

        .highlight-text::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 12px;
          background: var(--gold);
          opacity: 0.15;
          transform: skewX(-12deg);
          z-index: -1;
        }

        .services-subheading {
          font-size: 18px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Grid Styles */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .service-card {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          overflow: hidden;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(11, 31, 66, 0.08);
          border-color: rgba(22, 82, 160, 0.2);
        }

        .popular-card {
          border-color: rgba(212, 168, 83, 0.4);
          background: linear-gradient(180deg, #FFFCF5 0%, #FFFFFF 100%);
        }

        .popular-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, var(--gold) 0%, #B8903B 100%);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(212, 168, 83, 0.3);
        }

        .service-icon-wrapper {
          width: 56px;
          height: 56px;
          background: var(--surface-light);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--royal-blue);
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon-wrapper {
          background: var(--royal-blue);
          color: white;
          transform: scale(1.05) rotate(-5deg);
        }

        .service-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .service-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--deep-navy);
          margin-bottom: 8px;
        }

        .service-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 16px;
        }

        .price-label {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .price-amount {
          font-size: 20px;
          font-weight: 800;
          color: var(--royal-blue);
        }

        .price-unit {
          font-size: 13px;
          color: var(--text-muted);
        }

        .service-description {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .service-features {
          margin: 0 0 24px 0;
          padding: 0;
          list-style: none;
        }

        .service-features li {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-dot {
          width: 4px;
          height: 4px;
          background: var(--gold);
          border-radius: 50%;
        }

        .service-cta {
          margin-top: auto;
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 1px solid var(--border-light);
          border-radius: 12px;
          color: var(--royal-blue);
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .service-card:hover .service-cta {
          background: var(--royal-blue);
          border-color: var(--royal-blue);
          color: white;
        }

        /* Footer */
        .services-footer {
          text-align: center;
          color: var(--text-secondary);
          font-size: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .services-section {
            padding: 60px 0;
          }
          
          .services-header {
            margin-bottom: 40px;
          }

          .services-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
            gap: 24px;
          }

          .service-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
