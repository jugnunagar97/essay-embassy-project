import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  GraduationCap,
  PenTool,
  FileCheck,
  Layout,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  popular?: boolean;
  features: string[];
  link: string;
  cta: string;
}

const services: ServiceItem[] = [
  {
    id: 'essay-writing',
    title: 'Essay Writing Services',
    description: 'From argumentative to narrative essays, we craft compelling, original papers that strictly adhere to your academic requirements.',
    icon: PenTool,
    popular: true,
    features: ['100% Plagiarism-free', 'Any citation style', 'Free revisions', 'A+ Grade Guarantee'],
    link: '/essay-writing',
    cta: 'Explore Essay Writing'
  },
  {
    id: 'assignment-help',
    title: 'Assignment Help',
    description: 'Struggling with complex assignments? Our experts provide clear, step-by-step solutions for any subject or difficulty level.',
    icon: Layout,
    features: ['All subjects covered', 'Step-by-step logic', '24/7 expert support', 'Detailed Explanations'],
    link: '/assignment-help',
    cta: 'Get Assignment Help'
  },
  {
    id: 'homework-help',
    title: 'Homework Help',
    description: 'Daily coursework piling up? We handle your routine homework tasks efficiently so you can focus on what matters most.',
    icon: FileCheck,
    features: ['Fast turnaround', 'Accurate answers', 'Direct expert chat', 'Zero AI Involvement'],
    link: '/homework-help',
    cta: 'Do My Homework'
  },
  {
    id: 'paper-writing',
    title: 'Paper Writing Services',
    description: 'Need a term paper or research paper? We deliver well-structured, thoroughly referenced academic papers on any topic.',
    icon: FileText,
    features: ['Deep research', 'Credible sources', 'Perfect formatting', 'Original Analysis'],
    link: '/paper-writing-services',
    cta: 'Order My Paper'
  },
  {
    id: 'thesis-help',
    title: 'Thesis Writing Services',
    description: 'Secure your Master\'s degree with a meticulously researched thesis. We help you structure arguments and analyze data effectively.',
    icon: GraduationCap,
    features: ['Data analysis help', 'Strong thesis statements', 'Rigorous editing', 'Professional Formatting'],
    link: '/thesis-writing-services',
    cta: 'Write My Thesis'
  },
  {
    id: 'dissertation-help',
    title: 'Dissertation Writing Services',
    description: 'Comprehensive support for your PhD journey. We assist with proposals, individual chapters, or full dissertation writing.',
    icon: BookOpen,
    features: ['PhD-level writers', 'Chapter-by-chapter', 'Confidentiality guaranteed', 'Proposal to Defense'],
    link: '/dissertation-writing-services',
    cta: 'Get Dissertation Help'
  }
];

export default function ServicesOverviewSection() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4 border border-[#0B1F42]/10">
              OUR CORE SERVICES
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6 tracking-tight">
              Premium Academic <span className="text-[#1652A0]">Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From routine homework tasks to complex doctoral dissertations, our specialized teams deliver top-tier academic work tailored to your success.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-3xl p-8 border-2 ${service.popular ? 'border-[#1652A0] shadow-2xl scale-[1.02]' : 'border-gray-100 shadow-xl'} hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col`}
                >
                  {service.popular && (
                    <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-5 py-2 rounded-bl-2xl text-[10px] font-black tracking-widest flex items-center gap-2 uppercase z-10">
                      <Sparkles className="w-3 h-3" /> Popular Choice
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${service.popular ? 'bg-[#1652A0] text-white' : 'bg-[#1652A0]/5 text-[#1652A0]'} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-[#0B1F42] mb-4 group-hover:text-[#1652A0] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-[15px]">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3.5 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                          <CheckCircle2 className={`w-5 h-5 ${service.popular ? 'text-[#1652A0]' : 'text-green-500'} flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    to={service.link}
                    className="w-full py-4 px-6 bg-[#1652A0]/10 text-[#1652A0] hover:bg-[#1652A0] hover:text-white rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
                  >
                    {service.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout */}
          <div className="mt-20 bg-gradient-to-r from-[#0B1F42] to-[#1652A0] rounded-[32px] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A853]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Need a Custom Academic Solution?</h3>
              <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                Connect with our specialized team to discuss your unique project requirements. We cover over 200 subjects with 100% human-first expertise.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/order-now"
                  className="w-full sm:w-auto px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-black text-lg rounded-2xl transition-all shadow-xl hover:-translate-y-1"
                >
                  Order Now
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl transition-all border border-white/20 backdrop-blur-sm"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
